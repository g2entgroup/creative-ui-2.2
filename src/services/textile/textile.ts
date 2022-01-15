import { Buckets, PrivateKey, KeyInfo, Client, ThreadID, GetThreadResponse } from '@textile/hub'
import { NFTMetadata, TokenMetadata } from './types'

export class TextileInstance {
  private keyInfo: KeyInfo;
  private bucketInfo: {
    bucket?: Buckets,
    bucketKey?: string
  };
  private client: Client;
  private threadID: ThreadID;

  private readonly apiKey = process.env.NEXT_PUBLIC_TEXTILE_API_KEY;

  private ipfsGateway = 'https://hub.textile.io';

  private static singletonInstace: TextileInstance;
  private static identity: PrivateKey;

  private readonly threadName = "UserNFTThread";
  private readonly collectionName = "UserNFTList"

  public static async getInstance(): Promise<TextileInstance> {
    if (!TextileInstance.singletonInstace) {
      TextileInstance.singletonInstace = new TextileInstance();
      await TextileInstance.singletonInstace.init();
    }

    return TextileInstance.singletonInstace;
  }

  public static setPrivateKey(key: PrivateKey) {
    TextileInstance.identity = key;
  }

  private async init() {
    console.log(this.apiKey);

    this.keyInfo = {
      key: this.apiKey
    };

    let buckets = await Buckets.withKeyInfo(this.keyInfo);

    await buckets.getToken(TextileInstance.identity);
    const buck = await buckets.getOrCreate('creativebucket');

    if (!buck.root) {
      throw new Error('Failed to get or create bucket');
    }

    this.bucketInfo = {
      bucket: buckets,
      bucketKey: buck.root.key
    };

    await this.initializeCollection();
  }

  private async initializeCollection(): Promise<void> {
    this.client = await Client.withKeyInfo(this.keyInfo);
    await this.client.getToken(TextileInstance.identity);

    const threadList: Array<GetThreadResponse> = await this.client.listThreads();
    const thread = threadList.find((obj) => obj.name === this.threadName);
    if (!thread) {
      this.threadID = await this.client.newDB(undefined, this.threadName);
      await this.client.newCollection(this.threadID, { name: this.collectionName });
    } else {
      this.threadID = ThreadID.fromString(thread.id);
    }
  }

  public async uploadNFT(file: File, name: string = "", description: string = "", attributes: string = '{"": any; }'): Promise<NFTMetadata> {
    if (!this.bucketInfo.bucket || !this.bucketInfo.bucketKey) {
      throw new Error('No bucket client or root key');
    }

    const now = new Date().getTime();
    const fileName = `${file.name}`;
    const uploadName = `${now}_${fileName}`;
    const location = `nfts/${uploadName}`;
    const buf = await file.arrayBuffer();
    const raw = await this.bucketInfo.bucket.pushPath(this.bucketInfo.bucketKey, location, buf);
    console.log("uploadnft func ")
    console.log(raw);
    return {
      cid: raw.path.cid.toString(),
      name: name != "" ? name : uploadName,
      description: description,
      path: location,
      date: now.toString(),
      attributes: {attributes}
    };
  }


  public async deleteNFTFromBucket(nft: NFTMetadata) {
    if (!this.bucketInfo.bucket || !this.bucketInfo.bucketKey) {
      throw new Error('No bucket client or root key');
    }

    await this.bucketInfo.bucket.removePath(this.bucketInfo.bucketKey, nft.path);

    if (nft.tokenMetadataPath) {
      await this.bucketInfo.bucket.removePath(this.bucketInfo.bucketKey, nft.tokenMetadataPath);
    }
  }

  public async uploadTokenMetadata(nft: NFTMetadata) {
    if (!this.bucketInfo.bucket || !this.bucketInfo.bucketKey || !nft.cid) {
      throw new Error('No bucket client or root key or tokenID');
    }

    const tokenMeta: TokenMetadata = {
      name: nft.name,
      description: nft.description,
      image: `${this.ipfsGateway}/ipfs/${nft.cid}`
    };

    const uploadName = `${nft.name}.json`;
    const location = `tokenmetadata/${uploadName}`;

    const buf = Buffer.from(JSON.stringify(tokenMeta, null, 2))
    const raw = await this.bucketInfo.bucket.pushPath(this.bucketInfo.bucketKey, location, buf);

    nft.tokenMetadataPath = location;
    nft.tokenMetadataURL = `/ipfs/${raw.path.cid.toString()}`;
    console.log("uploadnftmetadata func ")
    console.log(raw);
  }

  public async addNFTToUserCollection(nft: NFTMetadata) {
    if (!this.client) {
      throw new Error('No client');
    }
    console.log("adding nft to user collection...")
    await this.client.create(this.threadID, this.collectionName, [nft]);
  }

  public async getAllUserNFTs(): Promise<Array<NFTMetadata>> {
    if (!this.client) {
      throw new Error('No client');
    }

    // TODO: Implement a pagination logic to query only limited data.
    const memeList = await this.client.find<NFTMetadata>(this.threadID, this.collectionName, {});
    console.log("All user memes:", memeList)
    return memeList;
  }
}
