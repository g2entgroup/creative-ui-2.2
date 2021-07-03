import { Buckets, PrivateKey, KeyInfo } from '@textile/hub'
import { NFTMetadata, TokenMetadata } from './types'

export class TextileInstance {
  private keyInfo: KeyInfo;
  private bucketInfo: {
    bucket?: Buckets,
    bucketKey?: string
  };

  private apiKey = "bu5jbif4lu5tn4xmilwaxen3zjm";

  private ipfsGateway = 'https://hub.textile.io';

  private static singletonInstace: TextileInstance;
  private static identity: PrivateKey;

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

  }

  public async uploadNFT(file: File, name: string = "", description: string = ""): Promise<NFTMetadata> {
    if (!this.bucketInfo.bucket || !this.bucketInfo.bucketKey) {
      throw new Error('No bucket client or root key');
    }

    const now = new Date().getTime();
    const fileName = `${file.name}`;
    const uploadName = `${now}_${fileName}`;
    const location = `nfts/${uploadName}`;

    const buf = await file.arrayBuffer();
    const raw = await this.bucketInfo.bucket.pushPath(this.bucketInfo.bucketKey, location, buf);

    console.log(raw);
    return {
      cid: raw.path.cid.toString(),
      name: name != "" ? name : uploadName,
      description: description,
      path: location,
      date: now.toString()
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

    console.log(raw);
  }
}
