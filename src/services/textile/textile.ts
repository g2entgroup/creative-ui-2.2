import { Buckets, PrivateKey, KeyInfo } from '@textile/hub'
import { NFTMetadata, TokenMetadata } from './types'

export class TextileInstance {
  private identity: PrivateKey;
  private keyInfo: KeyInfo;
  private bucketInfo: {
    bucket?: Buckets,
    bucketKey?: string
  };

  private ipfsGateway = 'https://hub.textile.io';

  private static singletonInstace: TextileInstance;

  public static async getInstance(key: PrivateKey): Promise<TextileInstance> {
    if (!TextileInstance.singletonInstace) {
      TextileInstance.singletonInstace = new TextileInstance();
      await TextileInstance.singletonInstace.init(key);
    }

    return TextileInstance.singletonInstace;
  }

  private async init(key: PrivateKey) {
    this.keyInfo = {
      key: process.env.REACT_APP_TEXTILE_HUB_KEY as string
    };

    this.identity = key;
    let buckets = await Buckets.withKeyInfo(this.keyInfo);

    await buckets.getToken(this.identity);
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

    return {
      cid: raw.path.cid.toString(),
      name: name,
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
    if (!this.bucketInfo.bucket || !this.bucketInfo.bucketKey || !nft.tokenID || !nft.cid) {
      throw new Error('No bucket client or root key or tokenID');
    }

    const tokenMeta: TokenMetadata = {
      name: nft.name,
      description: nft.description,
      image: `${this.ipfsGateway}/ipfs/${nft.cid}`
    };

    const uploadName = `${nft.tokenID}.json`;
    const location = `tokenmetadata/${uploadName}`;

    const buf = Buffer.from(JSON.stringify(tokenMeta, null, 2))
    const raw = await this.bucketInfo.bucket.pushPath(this.bucketInfo.bucketKey, location, buf);

    nft.tokenMetadataPath = location;
    nft.tokenMetadataURL = `${this.ipfsGateway}/ipfs/${raw.path.cid.toString()}`;
  }
}
