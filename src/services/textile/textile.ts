import {
    CampaignMetadata,
    CampaignSettings,
    NFTMetadata,
    PoolMetadata,
    TokenMetadata,
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
} from "@textile/hub";
import { CoreAPI } from "@textile/eth-storage";
import { BigNumber } from "ethers";

export class TextileInstance {
    private keyInfo: KeyInfo;
    private bucketInfo: {
        bucket?: Buckets;
        bucketKey?: string;
    };
    private client: Client;
    private threadID: ThreadID;

    private readonly apiKey = process.env.NEXT_PUBLIC_TEXTILE_API_KEY;

    private ipfsGateway = "https://dweb.link";

    private static singletonInstance: TextileInstance;
    private static identity: PrivateKey;

    private readonly threadName = "UserNFTThread";
    private readonly collectionName = "UserNFTList";

    public static async getInstance(
        identity?: PrivateKey
    ): Promise<TextileInstance> {
        if (!TextileInstance.singletonInstance) {
            TextileInstance.singletonInstance = new TextileInstance();
            await TextileInstance.singletonInstance.init(identity);
        }
        console.log(TextileInstance);
        return TextileInstance.singletonInstance;
    }

    public static setPrivateKey(key: PrivateKey) {
        TextileInstance.identity = key;
    }

    private async init(identity) {
        console.log(this.apiKey);

        this.keyInfo = {
            key: this.apiKey,
        };

        this.configBuckets(identity);

        await this.initializeCollection();
    }

    private async initializeCollection(): Promise<void> {
        this.client = await Client.withKeyInfo(this.keyInfo);
        await this.client.getToken(TextileInstance.identity);

        const threadList: Array<GetThreadResponse> =
            await this.client.listThreads();
        const thread = threadList.find((obj) => obj.name === this.threadName);
        if (!thread) {
            console.log("CREATE_DB");
            this.threadID = await this.client.newDB(
                ThreadID.fromRandom(),
                this.threadName
            );
            await this.client.newCollection(this.threadID, {
                name: this.collectionName,
            });
            await this.client.newCollection(this.threadID, {
                name: "collections",
            });
            await this.client.newCollection(this.threadID, {
                name: "campaigns",
            });
            await this.client.newCollection(this.threadID, {
                name: "pools",
            });
            await this.client.newCollection(this.threadID, {
                name: "settings",
            });
            console.log("COLLECTIONS_CREATED");
        } else {
            this.threadID = ThreadID.fromString(thread.id);
            console.log("RETRIEVED_DB");
        }
    }

    private async configBuckets(identity?: PrivateKey) {
        if (!this.keyInfo) {
            throw new Error("No bucket client or root key or tokenID");
        }

        let buckets = await Buckets.withKeyInfo(this.keyInfo);

        await buckets.getToken(identity ? identity : TextileInstance.identity);

        const buck = await buckets.getOrCreate("creativebucket");

        if (!buck.root) {
            throw new Error("Failed to get or create bucket");
        }

        this.bucketInfo = {
            bucket: buckets,
            bucketKey: buck.root.key,
        };
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
        await this.client.create(this.threadID, this.collectionName, [nft]);
    }

    public async getAllUserNFTs(): Promise<Array<NFTMetadata>> {
        if (!this.client) {
            throw new Error("No client");
        }

        // TODO: Implement a pagination logic to query only limited data.
        const memeList = await this.client.find<NFTMetadata>(
            this.threadID,
            this.collectionName,
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
                this.configBuckets();
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
            campaignCid = await this.client.create(this.threadID, "campaigns", [
                campaign,
            ]);
        } catch (err) {
            console.log(err);
            await this.client.newCollection(this.threadID, {
                name: "campaigns",
            });
            campaignCid = await this.client.create(this.threadID, "campaigns", [
                campaign,
            ]);
        }
        return campaignCid;
    }

    public async removeCampaign(campaignId: string) {
        await this.client.delete(this.threadID, "campaigns", [campaignId]);
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
                "campaigns",
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
                "campaigns",
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
                "campaigns",
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
                "campaigns",
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
            "pools",
            [pool]
        )[0];

        console.log("updating active pool ID in campaign metadata...");

        const tx: WriteTransaction = this.client.writeTransaction(
            this.threadID,
            "campaigns"
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
            "pools",
            campaignId
        );

        const tx = this.client.readTransaction(this.threadID, "pools");

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
                "pools",
                campaignId
            );
        } catch (err) {
            console.log(err);
        }

        let pool: PoolMetadata;

        try {
            pool = await this.client.findByID(
                this.threadID,
                "pools",
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
            pool = await this.client.findByID(this.threadID, "pools", poolId);
        } catch (err) {
            console.log(err);
        }

        return pool;
    }

    public async uploadCampaignPreferences(
        settings: CampaignSettings
    ): Promise<CampaignSettings | any> {
        if (!this.bucketInfo.bucket || !this.bucketInfo.bucketKey) {
            throw new Error("No bucket client or root key");
        }

        const now = new Date().getTime();
        const preferencesName = `${now}_${settings.campaignName}_settings`;
        const location = `settings/${preferencesName}`;

        const blob = new Blob([JSON.stringify(settings)], {
            type: "application/json",
        });
        const file = new File([blob], preferencesName);

        const buf = await file.arrayBuffer();
        const raw = await this.bucketInfo.bucket.pushPath(
            this.bucketInfo.bucketKey,
            location,
            buf
        );

        console.log("uploadCampaignPreferences func ");
        console.log(raw);
        return {
            ...settings,
            updatedAt: now.toString(),
            filename: preferencesName,
            cid: raw.path.cid,
        };
    }

    public async setCampaignPreferences(
        campaignId: string,
        preferences: CampaignSettings
    ): Promise<string> {
        if (!this.client) {
            throw new Error("No client");
        }

        console.log("setting campaign notification preferences...");

        const tx = this.client.writeTransaction(this.threadID, "campaigns");

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

    public async getPreferencesById(
        preferencesId: string
    ): Promise<CampaignSettings> {
        if (!this.client) {
            throw new Error("No client");
        }

        console.log("fetching campaign notification settings...");

        let preferences: CampaignSettings;

        try {
            preferences = await this.client.findByID(
                this.threadID,
                "settings",
                preferencesId
            );
        } catch (err) {
            console.log(err);
        }

        return preferences;
    }
}
