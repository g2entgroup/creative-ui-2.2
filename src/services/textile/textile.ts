import {
    CampaignMetadata,
    CampaignSettings,
    DecryptedMessage,
    NFTMetadata,
    PoolMetadata,
    TokenMetadata,
    UserModel,
} from "./types";
import {
    Where,
    WriteTransaction,
    Buckets,
    PrivateKey,
    KeyInfo,
    Client,
    ThreadID,
    GetThreadResponse,
    Users,
    UserMessage,
    MailboxEvent,
    Query,
    UserAuth,
} from "@textile/hub";
import { CoreAPI } from "@textile/eth-storage";
import { BigNumber } from "ethers";

export class TextileInstance {

    private readonly ipfsGateway = "https://dweb.link";
    private readonly names = {
        t: "UserNFTThread",
        n: "UserNFTList",
        u: "UserData",
        c: "Collections",
        p: "Pools"
    };

    private keyInfo: KeyInfo;
    private bucketInfo: {
        bucket?: Buckets;
        bucketKey?: string;
    };

    private static identity: PrivateKey;
    
    private client: Client;
    private userClient: Users;

    private user: UserModel;

    private threadID: ThreadID;
    private mailboxId: string;

    private static singletonInstance: TextileInstance;

    private async init() {
        console.log({ identity: TextileInstance.identity })
        await this.initializeClients();
        await this.initializeMailbox();
        await this.initializeBuckets();
        await this.initializeCollection();
    }

    private async initializeClients() {
        this.keyInfo = {
            key: process.env.NEXT_PUBLIC_TEXTILE_API_KEY
        };

        this.client = await Client.withKeyInfo(this.keyInfo);
        this.userClient = await Users.withKeyInfo(this.keyInfo);
        await this.userClient.getToken(TextileInstance.identity);
    }

    private async initializeMailbox() {
        this.mailboxId = await this.userClient.setupMailbox();
    }

    private async initializeBuckets() {
        if (!this.keyInfo) {
            throw new Error("No bucket client or root key or tokenID");
        }

        let buckets = await Buckets.withKeyInfo(this.keyInfo);

        await buckets.getToken(TextileInstance.identity);

        const buck = await buckets.getOrCreate("creativebucket");

        if (!buck.root) {
            throw new Error("Failed to get or create bucket");
        }

        this.bucketInfo = {
            bucket: buckets,
            bucketKey: buck.root.key,
        };
    }

    private async initializeCollection(): Promise<void> {
        await this.client.getToken(TextileInstance.identity);

        const threadList: Array<GetThreadResponse> =
            await this.client.listThreads();
        const thread = threadList.find((obj) => obj.name === this.names.t);
        if (!thread) {
            this.threadID = await this.client.newDB(
                ThreadID.fromRandom(),
                this.names.t
            );
            await this.client.newCollection(this.threadID, {
                name: this.names.u
            });
            await this.client.newCollection(this.threadID, {
                name: this.names.n,
            });
            await this.client.newCollection(this.threadID, {
                name: this.names.c,
            });
            await this.client.newCollection(this.threadID, {
                name: this.names.p,
            });
        } else {
            this.threadID = ThreadID.fromString(thread.id);
        }
    }

    public static async setPrivateKey(privateKey: PrivateKey) {
        TextileInstance.identity = privateKey;
    }
    
    public static async getInstance(
        // identity?: PrivateKey
    ): Promise<TextileInstance> {
        if (!TextileInstance.singletonInstance) {
            // TextileInstance.identity = identity;
            TextileInstance.singletonInstance = new TextileInstance();
            await TextileInstance.singletonInstance.init();
        }
        return TextileInstance.singletonInstance;
    }

    public static async signUp(privateKey: PrivateKey) {
        const keyInfo: KeyInfo = {
            key: process.env.NEXT_PUBLIC_TEXTILE_API_KEY
        };

        const userClient = await Users.withKeyInfo(keyInfo);

        await userClient.setToken(privateKey.toString());
    }

    public async uploadUserData(newUser: UserModel): Promise<void> {
        if (!this.bucketInfo.bucket || !this.bucketInfo.bucketKey ) {
            throw new Error("No bucket client or root key or tokenID");
        }

        const buf = Buffer.from(JSON.stringify(newUser, null, 2));

        await this.bucketInfo.bucket.pushPath(
            this.bucketInfo.bucketKey,
            `users/${new Date().getTime()}_${newUser.username}`,
            buf
        );

        await this.client.create(this.threadID, this.names.u, [{
            ...newUser,
            publicKey: TextileInstance.identity.public.toString()
        }]);
    }

    public async setCurrentUser(): Promise<UserModel> {
        if (!this.client) {
            throw new Error("No client");
        }

        const query: Query = new Where("publicKey").eq(TextileInstance.identity.public.toString());

        return await this.client.find<UserModel>(
            this.threadID,
            this.names.u,
            query
        )[0];
    }

    public async getCurrentUser(): Promise<UserModel> {
        if (!this.user) {
            throw new Error("No current user has been set");
        }
        
        return this.user;
    }

    public async getUser(username?: string): Promise<UserModel> {
        if (!this.client) {
            throw new Error("No client");
        }

        const query: Query = new Where("username").eq(username);

        return await this.client.find<UserModel>(
            this.threadID,
            this.names.u,
            query
        )[0];
    }

    public async getBrands(): Promise<UserModel[]> {
        if (!this.client) {
            throw new Error("No client");
        }

        const query = new Where("role").eq("brand");

        return await this.client.find<UserModel>(
            this.threadID,
            this.names.u,
            query
        );
    }

    public async getPros(): Promise<UserModel[]> {
        if (!this.client) {
            throw new Error("No client");
        }

        const query = new Where("role").eq("pro");

        return await this.client.find<UserModel>(
            this.threadID,
            this.names.u,
            query
        );
    }

    public async getInbox(): Promise<DecryptedMessage[]> {
        if (!this.userClient) return;

        const messages = await this.userClient.listInboxMessages()

        const inbox: DecryptedMessage[] = []
        for (const message of messages) {
            inbox.push(await this.messageDecoder(message));
        }

        return inbox;
    }

    public async getMailboxListener(): Promise<any> {
        if (!this.userClient) return;

        return this.userClient.watchInbox(this.mailboxId, this.handleNewMessage);
    }

    public async sendMessage(newMessage: string): Promise<UserMessage> {
        if (!this.userClient) return;
        if (newMessage === '' || !this.userClient) return;

        const encoded = new TextEncoder().encode(newMessage)

        return await this.userClient.sendMessage(
            TextileInstance.identity, 
            TextileInstance.identity.public, 
            encoded
        );
    }

    public async sendUserInvite(address: string): Promise<void> {
        if (!this.userClient) return;
        

    }

    public async acceptUserInvite(adress: string): Promise<void> {
        if (!this.userClient) return;

        
    }

    public async deleteMessage(id: string): Promise<void> {
        if (!this.userClient) return;

        return await this.userClient.deleteInboxMessage(id);
      }

    private async messageDecoder(
        encryptedMessage: UserMessage
    ): Promise<DecryptedMessage> {
        const bytes = await TextileInstance.identity.decrypt(encryptedMessage.body);

        const body = new TextDecoder().decode(bytes);
        const { 
            from, 
            readAt, 
            createdAt, 
            id
        } = encryptedMessage;
        
        return {
            _id: id,
            body, 
            from, 
            readAt, 
            sent: createdAt, 
        };
    }

    private async handleNewMessage(
        reply?: MailboxEvent, 
        err?: Error
    ): Promise<DecryptedMessage> {
        if (err) return;
        if (!this.client) return;
        if (!reply || !reply.message) return;

        return await this.messageDecoder(reply.message);
    }

    public async uploadNFT(
        file: File,
        name: string = "",
        description: string = "",
        attributes: string = '{"": any; }'
    ): Promise<NFTMetadata> {
        if (!this.bucketInfo.bucket || !this.bucketInfo.bucketKey) {
            throw new Error("No bucket client or root key");
        }

        const now = new Date().getTime();
        const fileName = `${file.name}`;
        const uploadName = `${now}_${fileName}`;
        const location = `nfts/${uploadName}`;
        const buf = await file.arrayBuffer();
        const raw = await this.bucketInfo.bucket.pushPath(
            this.bucketInfo.bucketKey,
            location,
            buf
        );
        console.log("uploadnft func ");
        console.log(raw);
        return {
            cid: raw.path.cid.toString(),
            name: name != "" ? name : uploadName,
            description: description,
            path: location,
            date: now.toString(),
            attributes: { attributes },
        };
    }

    public async deleteNFTFromBucket(nft: NFTMetadata) {
        if (!this.bucketInfo.bucket || !this.bucketInfo.bucketKey) {
            throw new Error("No bucket client or root key");
        }

        await this.bucketInfo.bucket.removePath(
            this.bucketInfo.bucketKey,
            nft.path
        );

        if (nft.tokenMetadataPath) {
            await this.bucketInfo.bucket.removePath(
                this.bucketInfo.bucketKey,
                nft.tokenMetadataPath
            );
        }
    }

    public async uploadTokenMetadata(
        storage: CoreAPI<BigNumber>,
        nft: NFTMetadata
    ) {
        if (!this.bucketInfo.bucket || !this.bucketInfo.bucketKey || !nft.cid) {
            throw new Error("No bucket client or root key or tokenID");
        }

        const tokenMeta: TokenMetadata = {
            name: nft.name,
            description: nft.description,
            image: `${this.ipfsGateway}/ipfs/${nft.cid}`,
        };

        const uploadName = `${nft.name}.json`;
        const location = `tokenmetadata/${uploadName}`;

        const buf = Buffer.from(JSON.stringify(tokenMeta, null, 2));
        const raw = await this.bucketInfo.bucket.pushPath(
            this.bucketInfo.bucketKey,
            location,
            buf
        );

        nft.tokenMetadataPath = location;
        nft.tokenMetadataURL = `/ipfs/${raw.path.cid.toString()}`;
        console.log("uploadnftmetadata func ");
        this.uploadnftmetadata(storage, tokenMeta);
        console.log(raw);
        return {
          tokenMetadataPath: location,
          tokenMetadataURL: `/ipfs/${raw.path.cid.toString()}`
        }
    }

    private async uploadnftmetadata(
        storage: CoreAPI<BigNumber>,
        tokenMeta: TokenMetadata
    ) {
        const blob = new Blob([JSON.stringify(tokenMeta)], {
            type: "application/json",
        });
        const file = new File([blob], "metadata.json", {
            type: "application/json",
            lastModified: new Date().getTime(),
        });
        const { id, cid } = await storage.store(file);
        console.log(JSON.stringify(tokenMeta));
        console.log("textile cid", cid);
    }

    public async addNFTToUserCollection(nft: NFTMetadata) {
        if (!this.client) {
            throw new Error("No client");
        }
        console.log("adding nft to user collection...");
        await this.client.create(this.threadID, this.names.t, [nft]);
    }

    public async getAllUserNFTs(): Promise<Array<NFTMetadata>> {
        if (!this.client) {
            throw new Error("No client");
        }

        // TODO: Implement a pagination logic to query only limited data.
        const memeList = await this.client.find<NFTMetadata>(
            this.threadID,
            this.names.t,
            {}
        );
        console.log("All user memes:", memeList);
        return memeList;
    }

    public async uploadCampaignMetadata(
        campaign: CampaignMetadata,
        img?: File
    ): Promise<CampaignMetadata | any> {
        console.log("uploadCampaignMetadata func ");
        if (!this.bucketInfo.bucket || !this.bucketInfo.bucketKey) {
            if (this.keyInfo) {
                console.log("CATCH CONFIG BUCKETS!!!!");
                this.initializeBuckets();
            } else {
                throw new Error("No bucket client or root key");
            }
        }

        const now = new Date().getTime();
        campaign.name = `${now}_${campaign.brandName}`;
        const metadataLocation = `campaigns/${campaign.name}`;
        const imgLocation = `campaigns/${campaign.name}/images/${img.name}`;

        const imgBuf = await img.arrayBuffer();
        const imgRes = await this.bucketInfo.bucket.pushPath(
            this.bucketInfo.bucketKey,
            imgLocation,
            imgBuf
        );

        console.log(imgRes);

        const blob = new Blob([JSON.stringify(campaign)], {
            type: "application/json",
        });
        const file = new File([blob], campaign.name);
        const metadataBuf = await file.arrayBuffer();
        const metadataRes = await this.bucketInfo.bucket.pushPath(
            this.bucketInfo.bucketKey,
            metadataLocation,
            metadataBuf
        );

        console.log(metadataRes);

        return {
            ...campaign,
            updatedAt: now.toString(),
            filename: campaign.name,
            cid: metadataRes.path.cid,
        };
    }

    public async addCampaign(
        campaign: CampaignMetadata,
        ownerAddress: string
    ): Promise<string[]> {
        if (!this.client) {
            throw new Error("No client");
        }

        console.log("adding campaign to user library...");

        campaign.ownerAddress = ownerAddress;

        let campaignCid;

        try {
            campaignCid = await this.client.create(this.threadID, this.names.c, [
                campaign,
            ]);
        } catch (err) {
            console.log(err);
            await this.client.newCollection(this.threadID, {
                name: this.names.c,
            });
            campaignCid = await this.client.create(this.threadID, this.names.c, [
                campaign,
            ]);
        }
        return campaignCid;
    }

    public async removeCampaign(campaignId: string) {
        await this.client.delete(this.threadID, this.names.c, [campaignId]);
    }

    // public async uplodLoomVideo(loomHtml: string) {

    // }

    public async getActiveUserCampaign(): Promise<CampaignMetadata> {
        if (!this.client) {
            throw new Error("No client");
        }

        let campaign: CampaignMetadata;

        try {
            const campaigns = await this.client.find(
                this.threadID,
                this.names.c,
                {}
            );
            campaign = campaigns[0];
        } catch (err) {
            console.log(err);
        }
        return campaign;
    }

    public async getAllUserCampaigns(
        ownerAddress: string
    ): Promise<CampaignMetadata[]> {
        if (!this.client) {
            throw new Error("No client");
        }

        console.log("getting all campaigns in user library...");

        const query = new Where("ownerAddress").eq(ownerAddress);

        let userCampaigns: CampaignMetadata[];

        try {
            userCampaigns = await this.client.find(
                this.threadID,
                this.names.c,
                query
            );
        } catch (err) {
            userCampaigns = [];
        }

        return userCampaigns;
    }

    public async getCampaignsByBrandName(
        brandName: string
    ): Promise<CampaignMetadata[]> {
        if (!this.client) {
            throw new Error("No client");
        }

        console.log("getting all campaigns for provided brand name...");

        const query = new Where("brandName").eq(brandName);

        let brandCampaigns: CampaignMetadata[];

        try {
            brandCampaigns = await this.client.find(
                this.threadID,
                this.names.c,
                query
            );
        } catch (err) {
            brandCampaigns = [];
        }

        return brandCampaigns;
    }

    public async getCampaignByID(
        campaignId: string
    ): Promise<CampaignMetadata> {
        if (!this.client) {
            throw new Error("No client");
        }

        console.log("getting campaign...");

        let campaign: CampaignMetadata;

        try {
            campaign = await this.client.findByID(
                this.threadID,
                this.names.c,
                campaignId
            );
        } catch (err) {
            console.log(err);
        }

        return campaign;
    }

    public async uploadPoolMetadata(
        pool: PoolMetadata
    ): Promise<PoolMetadata | any> {
        if (!this.bucketInfo.bucket || !this.bucketInfo.bucketKey) {
            throw new Error("No bucket client or root key");
        }

        const now = new Date().getTime();
        const _poolName = `${now}_${pool.poolName}`;
        const location = `pools/${_poolName}`;

        const blob = new Blob([JSON.stringify(pool)], {
            type: "application/json",
        });
        const file = new File([blob], _poolName);

        const buf = await file.arrayBuffer();
        const metadataRes = await this.bucketInfo.bucket.pushPath(
            this.bucketInfo.bucketKey,
            location,
            buf
        );

        console.log("uploadPoolMetadata func ");
        console.log(metadataRes);
        return {
            ...pool,
            updatedAt: now.toString(),
            filename: _poolName,
            cid: metadataRes.path.cid,
        };
    }

    public async setCampaignPool(
        campaignId: string,
        pool: PoolMetadata
    ): Promise<string> {
        if (!this.client) {
            throw new Error("No client");
        }

        console.log("uploading pool metadata...");

        const poolId: string = await this.client.create(
            this.threadID,
            this.names.p,
            [pool]
        )[0];

        console.log("updating active pool ID in campaign metadata...");

        const tx: WriteTransaction = this.client.writeTransaction(
            this.threadID,
            this.names.c
        );

        await tx.start();

        const campaign: CampaignMetadata = await tx.findByID(campaignId);
        campaign.previousPools.push(campaign.activePoolId);
        campaign.activePoolId = poolId;

        await tx.save([campaign]);
        await tx.end();

        return poolId;
    }

    public async uploadAndSetCampaignPool(
        campaignId: string,
        pool: PoolMetadata
    ): Promise<string> {
        const metadata: PoolMetadata = await this.uploadPoolMetadata(pool);
        return await this.setCampaignPool(campaignId, metadata);
    }

    public async getAllPreviousCampaignPools(
        campaignId: string
    ): Promise<PoolMetadata[]> {
        if (!this.client) {
            throw new Error("No client");
        }

        let pools: PoolMetadata[];

        const campaign: CampaignMetadata = await this.client.findByID(
            this.threadID,
            this.names.p,
            campaignId
        );

        const tx = this.client.readTransaction(this.threadID, this.names.p);

        await tx.start();
        if (campaign.previousPools) {
            campaign.previousPools.map(async (e) =>
                pools.push(await tx.findByID(e))
            );
        }
        await tx.end();

        return pools;
    }

    public async getActiveCampaignPool(
        campaignId: string
    ): Promise<PoolMetadata> {
        if (!this.client) {
            throw new Error("No client");
        }

        let campaign: CampaignMetadata;

        try {
            campaign = await this.client.findByID(
                this.threadID,
                this.names.p,
                campaignId
            );
        } catch (err) {
            console.log(err);
        }

        let pool: PoolMetadata;

        try {
            pool = await this.client.findByID(
                this.threadID,
                this.names.p,
                campaign.activePoolId
            );
        } catch (err) {
            console.log(err);
        }

        return pool;
    }

    public async getPoolById(poolId: string): Promise<PoolMetadata> {
        if (!this.client) {
            throw new Error("No client");
        }

        let pool: PoolMetadata;

        try {
            pool = await this.client.findByID(this.threadID, this.names.p, poolId);
        } catch (err) {
            console.log(err);
        }

        return pool;
    }

    // public async uploadCampaignPreferences(
    //     settings: CampaignSettings
    // ): Promise<CampaignSettings | any> {
    //     if (!this.bucketInfo.bucket || !this.bucketInfo.bucketKey) {
    //         throw new Error("No bucket client or root key");
    //     }

    //     const now = new Date().getTime();
    //     const preferencesName = `${now}_${settings.campaignName}_settings`;
    //     const location = `settings/${preferencesName}`;

    //     const blob = new Blob([JSON.stringify(settings)], {
    //         type: "application/json",
    //     });
    //     const file = new File([blob], preferencesName);

    //     const buf = await file.arrayBuffer();
    //     const raw = await this.bucketInfo.bucket.pushPath(
    //         this.bucketInfo.bucketKey,
    //         location,
    //         buf
    //     );

    //     console.log("uploadCampaignPreferences func ");
    //     console.log(raw);
    //     return {
    //         ...settings,
    //         updatedAt: now.toString(),
    //         filename: preferencesName,
    //         cid: raw.path.cid,
    //     };
    // }

    public async setCampaignPreferences(
        campaignId: string,
        preferences: CampaignSettings
    ): Promise<string> {
        if (!this.client) {
            throw new Error("No client");
        }

        console.log("setting campaign notification preferences...");

        const tx = this.client.writeTransaction(this.threadID, this.names.c);

        await tx.start();

        const campaign: CampaignMetadata = await tx.findByID(campaignId);
        campaign.notificationPreferences = preferences;

        await tx.save([campaign]);
        await tx.end();

        return campaign._id;
    }

    public async getCampaignPreferences(
        campaignId: string
    ): Promise<CampaignSettings> {
        if (!this.client) {
            throw new Error("No client");
        }

        console.log("fetching campaign notification settings...");

        let preferences: CampaignSettings;

        try {
            const campaign: CampaignMetadata = await this.client.findByID(
                this.threadID,
                "campaigns",
                campaignId
            );
            preferences = campaign.notificationPreferences;
        } catch (err) {
            console.log(err);
        }

        return preferences;
    }

    // public async getPreferencesById(
    //     preferencesId: string
    // ): Promise<CampaignSettings> {
    //     if (!this.client) {
    //         throw new Error("No client");
    //     }

    //     console.log("fetching campaign notification settings...");

    //     let preferences: CampaignSettings;

    //     try {
    //         preferences = await this.client.findByID(
    //             this.threadID,
    //             "settings",
    //             preferencesId
    //         );
    //     } catch (err) {
    //         console.log(err);
    //     }

    //     return preferences;
    // }
}
