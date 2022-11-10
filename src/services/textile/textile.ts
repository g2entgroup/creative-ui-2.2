import { CoreAPI } from '@textile/eth-storage';
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
  DBInfo,
  PublicKey,
} from '@textile/hub'
import { BigNumber } from 'ethers';
import { CampaignMetadata, CampaignSettings, DecryptedMessage, NFTMetadata, PoolMetadata, TokenMetadata, UserModel } from "./types";

export class TextileInstance {
  private readonly ipfsGateway = 'https://dweb.link'
  private names = {
    t: 'UserNFTThread',
    n: 'UserNFTList',
    u: 'UserData',
    c: 'Collections',
    p: 'Pools',
  }

  private keyInfo: KeyInfo
  private bucketInfo: {
    bucket?: Buckets
    bucketKey?: string
  }

  private static identity: PrivateKey

  private client: Client
  private users: Users

  private user: UserModel

  private threadID: ThreadID
  private mailboxId: string

  private static singletonInstance: TextileInstance

  private async init() {
    this.keyInfo = {
      key: process.env.NEXT_PUBLIC_TEXTILE_API_KEY,
    }
    this.client = await Client.withKeyInfo(this.keyInfo)
    this.users = await Users.withKeyInfo(this.keyInfo)
  }

  private async initWithSig(newUser?: UserModel) {
    const { payload, user } = await TextileInstance.loginWithChallenge(newUser)

    this.user = user;

    this.users = Users.withUserAuth(payload)
    const token = await this.users.getToken(TextileInstance.identity)

    this.client = Client.withUserAuth(payload)
    await this.client.getToken(TextileInstance.identity)
    
    let buckets = Buckets.withUserAuth(payload)
    await buckets.setToken(token)
    await buckets.getToken(TextileInstance.identity)

    localStorage.setItem("user-private-identity" , TextileInstance.identity.toString())

    this.mailboxId = await this.users.setupMailbox()

    const buck = await buckets.getOrCreate('creativebucket')
    if (!buck) {
      throw new Error('Failed to get or create bucket')
    }
    this.bucketInfo = {
      bucket: buckets,
      bucketKey: buck.root.key
    }
    await this.initCollections(true, payload)
  }

  private async initCollections(asAdmin?: boolean, userAuth?: UserAuth): Promise<void> {
    await this.client.getToken(TextileInstance.identity);
    
    const threadList: Array<GetThreadResponse> = await this.client.listThreads()

    const thread = threadList.find((obj) => obj.name === this.names.t)

    if (!thread) {
      this.threadID = await this.client.newDB(ThreadID.fromRandom())
      await this.client.newCollection(this.threadID, {
        name: this.names.u,
      })
      await this.client.newCollection(this.threadID, {
        name: this.names.n,
      })
      await this.client.newCollection(this.threadID, {
        name: this.names.c,
      })
      await this.client.newCollection(this.threadID, {
        name: this.names.p,
      })
    } else {
      this.threadID = ThreadID.fromString(thread.id)
      console.log({ threadID: this.threadID })
    }
  }

  private static async loginWithChallenge(newUser?: UserModel) {
          return new Promise<{ payload: UserAuth, user: UserModel }>((resolve, reject) => {
              const socketUrl = `wss://little-frost-1633.fly.dev/`;
              const socket = new WebSocket(socketUrl);
              
              socket.onopen = () => {
                  console.log("CHALLENGE_OPEN", newUser)
                  const publicKey = TextileInstance.identity.public.toString();
                  socket.send( 
                      JSON.stringify({
                          newUser ,
                          pubkey: publicKey,
                          type: "token",
                      })
                  );
                  
                  socket.onmessage = async (event) => {
                      console.log("CHALLENGE_MESSAGE", event)
                      const data = JSON.parse(event.data);
                      switch (data.type) {
                          case "error": {
                              // throw new Error(data.value)
                              console.log("CHALLENGE_ERROR: ", data)
                              reject(data.value);
                              break;
                          }
                          case "challenge": {
                              console.log("CHALLENGE_SIG_BEGIN: ")
                              const buf = Buffer.from(data.value);
                              
                              const signed = await TextileInstance.identity.sign(buf);

                              console.log("CHALLENGE_SIG: ", data)
                              socket.send(
                                  JSON.stringify({
                                      type: "challenge",
                                      sig: Buffer.from(signed).toJSON(),
                                  })
                              );
                              console.log("CHALLENGE_SIG")
                              break;
                          }
                          case "token": {
                              console.log("CHALLENGE_RESOLVE: ", data)
                              resolve(data.value);
                              break;
                          }
                      }
                  };
              };
          });
      // };
  };

  public static async setPrivateKey(privateKey: PrivateKey) {
    TextileInstance.identity = privateKey
  }

  public static async getInstance(withSig: boolean = false): Promise<TextileInstance> {
    if (!TextileInstance.singletonInstance) {
      TextileInstance.singletonInstance = new TextileInstance()
      if (withSig === false) {
        await TextileInstance.singletonInstance.init()
        const instance = TextileInstance.singletonInstance;
        return instance;
      } else {
        await TextileInstance.singletonInstance.initWithSig()
        const instance = TextileInstance.singletonInstance;
        return instance
      }
    }
  }

  public static async signUp(newUser?: UserModel) {
    console.log("SIGNUP_BEGIN")
    TextileInstance.setPrivateKey(newUser.identity)
    TextileInstance.singletonInstance = new TextileInstance()
    await TextileInstance.singletonInstance.initWithSig(newUser)
    return TextileInstance.singletonInstance
  }

  public async uploadUserData(newUser: UserModel): Promise<UserModel> {
    if (!this.client) {
      throw new Error('No client')
    }
    return newUser
  }

  public async setCurrentUser(): Promise<UserModel> {
    if (!this.client) {
      throw new Error('No client')
    }

    const query: Query = new Where('publicKey').eq(
      TextileInstance.identity.public.toString()
    )
    const users = await this.client.find<UserModel>(
      this.threadID,
      this.names.u,
      query
    )
    this.user = users[0]
    return this.user
  }

  public async getCurrentUser(identity?: PrivateKey): Promise<UserModel> {
    return this.user
  }

  public async getUser(username?: string): Promise<UserModel> {
    if (!this.client) {
      throw new Error('No client')
    }

    const query: Query = new Where('username').eq(username)

    return await this.client.find<UserModel>(
      this.threadID,
      this.names.u,
      query
    )[0]
  }

  public async getBrands(): Promise<UserModel[]> {
    if (!this.client) {
      throw new Error('No client')
    }

    const query = new Where('role').eq('brand')

    return await this.client.find<UserModel>(this.threadID, this.names.u, query)
  }

  public async getPros(): Promise<UserModel[]> {
    if (!this.client) {
      throw new Error('No client')
    }

    const query = new Where('role').eq('pro')

    return await this.client.find<UserModel>(this.threadID, this.names.u, query)
  }

  public async getInbox(): Promise<DecryptedMessage[]> {
    if (!this.users) return

    const messages = await this.users.listInboxMessages()

    const inbox: DecryptedMessage[] = []
    for (const message of messages) {
      inbox.push(await this.messageDecoder(message))
    }

    return inbox
  }

  public async getMailboxListener(): Promise<any> {
    if (!this.users) return

    return this.users.watchInbox(this.mailboxId, this.handleNewMessage)
  }

  public async sendMessage(
    newMessage: string,
    address: string
  ): Promise<UserMessage> {
    if (!this.users) return
    if (newMessage === '' || !this.users) return

    const encoded = new TextEncoder().encode(newMessage)

    return await this.users.sendMessage(
      TextileInstance.identity,
      PublicKey.fromString(address),
      encoded
    )
  }

  public async sendUserInvite(address: string): Promise<UserMessage> {
    if (!this.users) return

    const dbInfo: DBInfo = await this.client.getDBInfo(this.threadID)

    const message = `
            You have been invite to join a new user group!
            \n\n
            <**>
            <Button 
                onClick={() => {
                    const textileInstance = await TextileInstance.getInstance();
                    await textileInstance.acceptUserInvite(${JSON.stringify(
                      dbInfo
                    )})
                }}  
            >
                Accept Invite
            </Button>
        `

    return await this.sendMessage(message, address)
  }

  public async acceptUserInvite(info: string): Promise<ThreadID> {
    if (!this.users) return

    const dbInfo = JSON.parse(info)

    return await this.client.joinFromInfo(dbInfo)
  }

  public async deleteMessage(id: string): Promise<void> {
    if (!this.users) return

    return await this.users.deleteInboxMessage(id)
  }

  private async messageDecoder(
    encryptedMessage: UserMessage
  ): Promise<DecryptedMessage> {
    const bytes = await TextileInstance.identity.decrypt(encryptedMessage.body)

    const body = new TextDecoder().decode(bytes)
    const { from, readAt, createdAt, id } = encryptedMessage

    return {
      _id: id,
      body,
      from,
      readAt,
      sent: createdAt,
    }
  }

  private async handleNewMessage(
    reply?: MailboxEvent,
    err?: Error
  ): Promise<DecryptedMessage> {
    if (err) return
    if (!this.client) return
    if (!reply || !reply.message) return

    return await this.messageDecoder(reply.message)
  }

  public async uploadNFT(
    file: File,
    name = '',
    description = '',
    attributes = '{"": any; }'
  ): Promise<NFTMetadata> {
    if (!this.bucketInfo.bucket || !this.bucketInfo.bucketKey) {
      throw new Error('No bucket client or root key')
    }

    const now = new Date().getTime()
    const fileName = `${file.name}`
    const uploadName = `${now}_${fileName}`
    const location = `nfts/${uploadName}`
    const buf = await file.arrayBuffer()
    const raw = await this.bucketInfo.bucket.pushPath(
      this.bucketInfo.bucketKey,
      location,
      buf
    )
    console.log('uploadnft func ')
    console.log(raw)
    return {
      cid: raw.path.cid.toString(),
      name: name != '' ? name : uploadName,
      description: description,
      path: location,
      date: now.toString(),
      attributes: { attributes },
    }
  }

  public async deleteNFTFromBucket(nft: NFTMetadata) {
    if (!this.bucketInfo.bucket || !this.bucketInfo.bucketKey) {
      throw new Error('No bucket client or root key')
    }

    await this.bucketInfo.bucket.removePath(this.bucketInfo.bucketKey, nft.path)

    if (nft.tokenMetadataPath) {
      await this.bucketInfo.bucket.removePath(
        this.bucketInfo.bucketKey,
        nft.tokenMetadataPath
      )
    }
  }

  public async uploadTokenMetadata(
    storage: CoreAPI<BigNumber>,
    nft: NFTMetadata
  ) {
    if (!this.bucketInfo.bucket || !this.bucketInfo.bucketKey || !nft.cid) {
      throw new Error('No bucket client or root key or tokenID')
    }

    const tokenMeta: TokenMetadata = {
      name: nft.name,
      description: nft.description,
      image: `${this.ipfsGateway}/ipfs/${nft.cid}`,
    }

    const uploadName = `${nft.name}.json`
    const location = `tokenmetadata/${uploadName}`

    const buf = Buffer.from(JSON.stringify(tokenMeta, null, 2))
    const raw = await this.bucketInfo.bucket.pushPath(
      this.bucketInfo.bucketKey,
      location,
      buf
    )

    nft.tokenMetadataPath = location
    nft.tokenMetadataURL = `/ipfs/${raw.path.cid.toString()}`
    console.log('uploadnftmetadata func ')
    this.uploadnftmetadata(storage, tokenMeta)
    console.log(raw)
    return {
      tokenMetadataPath: location,
      tokenMetadataURL: `/ipfs/${raw.path.cid.toString()}`,
    }
  }

  private async uploadnftmetadata(
    storage: CoreAPI<BigNumber>,
    tokenMeta: TokenMetadata
  ) {
    const blob = new Blob([JSON.stringify(tokenMeta)], {
      type: 'application/json',
    })
    const file = new File([blob], 'metadata.json', {
      type: 'application/json',
      lastModified: new Date().getTime(),
    })
    const { id, cid } = await storage.store(file)
    console.log(JSON.stringify(tokenMeta))
    console.log('textile cid', cid)
  }

  public async addNFTToUserCollection(nft: NFTMetadata) {
    if (!this.client) {
      throw new Error('No client')
    }
    console.log('adding nft to user collection...')
    await this.client.create(this.threadID, this.names.n, [nft])
  }

  public async getAllUserNFTs(): Promise<Array<NFTMetadata>> {
    if (!this.client) {
      throw new Error('No client')
    }

    // TODO: Implement a pagination logic to query only limited data.
    const memeList = await this.client.find<NFTMetadata>(
      this.threadID,
      this.names.n,
      {}
    )
    console.log('All user memes:', memeList)
    return memeList
  }

  public async uploadCampaignMetadata(
    campaign: CampaignMetadata,
    img?: File
  ): Promise<CampaignMetadata | any> {
    console.log('uploadCampaignMetadata func ')
    if (!this.bucketInfo.bucket || !this.bucketInfo.bucketKey) {
      if (this.keyInfo) {
        console.log('CATCH CONFIG BUCKETS!!!!')
        // this.initBuckets()
      } else {
        throw new Error('No bucket client or root key')
      }
    }

    const now = new Date().getTime()
    campaign.name = `${now}_${campaign.brandName}`
    const metadataLocation = `campaigns/${campaign.name}`
    const imgLocation = `campaigns/${campaign.name}/images/${img.name}`

    const imgBuf = await img.arrayBuffer()
    const imgRes = await this.bucketInfo.bucket.pushPath(
      this.bucketInfo.bucketKey,
      imgLocation,
      imgBuf
    )

    console.log(imgRes)

    const blob = new Blob([JSON.stringify(campaign)], {
      type: 'application/json',
    })
    const file = new File([blob], campaign.name)
    const metadataBuf = await file.arrayBuffer()
    const metadataRes = await this.bucketInfo.bucket.pushPath(
      this.bucketInfo.bucketKey,
      metadataLocation,
      metadataBuf
    )

    console.log(metadataRes)

    return {
      ...campaign,
      updatedAt: now.toString(),
      filename: campaign.name,
      cid: metadataRes.path.cid,
    }
  }

  public async addCampaign(
    campaign: CampaignMetadata,
    ownerAddress: string
  ): Promise<string[]> {
    if (!this.client) {
      throw new Error('No client')
    }

    console.log('adding campaign to user library...')

    campaign.ownerAddress = ownerAddress

    let campaignCid

    try {
      campaignCid = await this.client.create(this.threadID, this.names.c, [
        campaign,
      ])
    } catch (err) {
      console.log(err)
      await this.client.newCollection(this.threadID, {
        name: this.names.c,
      })
      campaignCid = await this.client.create(this.threadID, this.names.c, [
        campaign,
      ])
    }
    return campaignCid
  }

  public async removeCampaign(campaignId: string) {
    await this.client.delete(this.threadID, this.names.c, [campaignId])
  }

  public async getActiveUserCampaign(): Promise<CampaignMetadata> {
    if (!this.client) {
      throw new Error('No client')
    }

    let campaign: CampaignMetadata

    try {
      const campaigns = await this.client.find(this.threadID, this.names.c, {})
      campaign = campaigns[0]
    } catch (err) {
      console.log(err)
    }

    return campaign
  }

  public async getAllUserCampaigns(
    ownerAddress: string
  ): Promise<CampaignMetadata[]> {
    if (!this.client) {
      throw new Error('No client')
    }

    console.log('getting all campaigns in user library...')

    const query = new Where('ownerAddress').eq(ownerAddress)

    let userCampaigns: CampaignMetadata[]

    try {
      userCampaigns = await this.client.find(this.threadID, this.names.c, query)
    } catch (err) {
      userCampaigns = []
    }

    return userCampaigns
  }

  public async getCampaignsByBrandName(
    brandName: string
  ): Promise<CampaignMetadata[]> {
    if (!this.client) {
      throw new Error('No client')
    }

    console.log('getting all campaigns for provided brand name...')

    const query = new Where('brandName').eq(brandName)

    let brandCampaigns: CampaignMetadata[]

    try {
      brandCampaigns = await this.client.find(
        this.threadID,
        this.names.c,
        query
      )
    } catch (err) {
      brandCampaigns = []
    }

    return brandCampaigns
  }

  public async getCampaignByID(campaignId: string): Promise<CampaignMetadata> {
    if (!this.client) {
      throw new Error('No client')
    }

    console.log('getting campaign...')

    let campaign: CampaignMetadata

    try {
      campaign = await this.client.findByID(
        this.threadID,
        this.names.c,
        campaignId
      )
    } catch (err) {
      console.log(err)
    }

    return campaign
  }

  public async uploadPoolMetadata(
    pool: PoolMetadata
  ): Promise<PoolMetadata | any> {
    if (!this.bucketInfo.bucket || !this.bucketInfo.bucketKey) {
      throw new Error('No bucket client or root key')
    }

    const now = new Date().getTime()
    const _poolName = `${now}_${pool.poolName}`
    const location = `pools/${_poolName}`

    const blob = new Blob([JSON.stringify(pool)], {
      type: 'application/json',
    })
    const file = new File([blob], _poolName)

    const buf = await file.arrayBuffer()
    const metadataRes = await this.bucketInfo.bucket.pushPath(
      this.bucketInfo.bucketKey,
      location,
      buf
    )

    console.log('uploadPoolMetadata func ')
    console.log(metadataRes)
    return {
      ...pool,
      updatedAt: now.toString(),
      filename: _poolName,
      cid: metadataRes.path.cid,
    }
  }

  public async setCampaignPool(
    campaignId: string,
    pool: PoolMetadata
  ): Promise<string> {
    if (!this.client) {
      throw new Error('No client')
    }

    console.log('uploading pool metadata...')

    const poolId: string = await this.client.create(
      this.threadID,
      this.names.p,
      [pool]
    )[0]

    console.log('updating active pool ID in campaign metadata...')

    const tx: WriteTransaction = this.client.writeTransaction(
      this.threadID,
      this.names.c
    )

    await tx.start()

    const campaign: CampaignMetadata = await tx.findByID(campaignId)
    campaign.previousPools.push(campaign.activePoolId)
    campaign.activePoolId = poolId

    await tx.save([campaign])
    await tx.end()

    return poolId
  }

  public async uploadAndSetCampaignPool(
    campaignId: string,
    pool: PoolMetadata
  ): Promise<string> {
    const metadata: PoolMetadata = await this.uploadPoolMetadata(pool)
    return await this.setCampaignPool(campaignId, metadata)
  }

  public async getAllPreviousCampaignPools(
    campaignId: string
  ): Promise<PoolMetadata[]> {
    if (!this.client) {
      throw new Error('No client')
    }

    let pools: PoolMetadata[]

    const campaign: CampaignMetadata = await this.client.findByID(
      this.threadID,
      this.names.p,
      campaignId
    )

    const tx = this.client.readTransaction(this.threadID, this.names.p)

    await tx.start()
    if (campaign.previousPools) {
      campaign.previousPools.map(async (e) => pools.push(await tx.findByID(e)))
    }
    await tx.end()

    return pools
  }

  public async getActiveCampaignPool(
    campaignId: string
  ): Promise<PoolMetadata> {
    if (!this.client) {
      throw new Error('No client')
    }

    let campaign: CampaignMetadata

    try {
      campaign = await this.client.findByID(
        this.threadID,
        this.names.p,
        campaignId
      )
    } catch (err) {
      console.log(err)
    }

    let pool: PoolMetadata

    try {
      pool = await this.client.findByID(
        this.threadID,
        this.names.p,
        campaign.activePoolId
      )
    } catch (err) {
      console.log(err)
    }

    return pool
  }

  public async getPoolById(poolId: string): Promise<PoolMetadata> {
    if (!this.client) {
      throw new Error('No client')
    }

    let pool: PoolMetadata

    try {
      pool = await this.client.findByID(this.threadID, this.names.p, poolId)
    } catch (err) {
      console.log(err)
    }

    return pool
  }

  public async setCampaignPreferences(
    campaignId: string,
    preferences: CampaignSettings
  ): Promise<string> {
    if (!this.client) {
      throw new Error('No client')
    }

    console.log('setting campaign notification preferences...')

    const tx = this.client.writeTransaction(this.threadID, this.names.c)

    await tx.start()

    const campaign: CampaignMetadata = await tx.findByID(campaignId)
    campaign.notificationPreferences = preferences

    await tx.save([campaign])
    await tx.end()

    console.log(campaign)

    return campaign._id
  }

  public async getCampaignPreferences(
    campaignId: string
  ): Promise<CampaignSettings> {
    if (!this.client) {
      throw new Error('No client')
    }

    // console.log('fetching campaign notification settings...')

    let preferences: CampaignSettings

    try {
      const campaign: CampaignMetadata = await this.client.findByID(
        this.threadID,
        'campaigns',
        campaignId
      )
      preferences = campaign.notificationPreferences
    } catch (err) {
      console.log(err)
    }

    return preferences
  }

}
