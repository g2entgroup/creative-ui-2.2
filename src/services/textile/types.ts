import { PrivateKey } from '@textile/crypto'

export interface UserModel {
  _id?: string
  publicKey?: string
  name?: string
  username?: string
  email?: string
  role?: string
  identity: PrivateKey
  lastSeen?: Date
}

export interface DecryptedMessage {
  _id?: string
  body?: string
  from?: string
  sent?: number
  readAt?: number
}

export interface NFTMetadata {
  _id?: string
  _mod?: number
  tokenID?: string // NFT tokenID
  cid: string // IPFS CID
  path: string // Bucket path
  tokenMetadataURL?: string
  tokenMetadataPath?: string
  name: string // meme Name
  txHash?: string // blockchain tx hash
  date: string // created date
  ownerWalletAddress?: string // account address
  user?: string // public key
  description?: string
  attributes?: {
    [k: string]: string | number
  }
}

export interface TokenMetadata {
  /**
   * Identifies the asset to which this token represents
   */
  name?: string
  /**
   * The number of decimal places that the token amount should display - e.g. 18, means to divide the token amount by 1000000000000000000 to get its user representation.
   */
  decimals?: number
  /**
   * Describes the asset to which this token represents
   */
  description?: string
  /**
   * A URI pointing to a resource with mime type image/* representing the asset to which this token represents. Consider making any images at a width between 320 and 1080 pixels and aspect ratio between 1.91:1 and 4:5 inclusive.
   */
  image?: string
  /**
   * Arbitrary properties. Values may be strings, numbers, object or arrays.
   */
  properties?: {
    [k: string]: unknown
  }
  localization?: {
    /**
     * The URI pattern to fetch localized data from. This URI should contain the substring `{locale}` which will be replaced with the appropriate locale value before sending the request.
     */
    uri: string
    /**
     * The locale of the default data within the base JSON
     */
    default: string
    /**
     * The list of locales for which data is available. These locales should conform to those defined in the Unicode Common Locale Data Repository (http://cldr.unicode.org/).
     */
    locales: unknown[]
    [k: string]: unknown
  }
  [k: string]: unknown
}

export interface UserData {
  _id?: string
  user_id: number
}

export interface PoolMetadata {
  _id: string
  poolAddress: string
  filename: string
  updatedAt: string
  poolName: string
  capital: number
  capitalAddress: string
  poolOwner: string
  rngAddress: string
  nftAddress: string
  campaignLength: number
  votingLength: number
  decisionLength: number
  submissionLength: number
}

export interface CampaignMetadata {
  _id?: string
  name?: string
  brandName?: string
  brandWebsite?: string
  twitterAccount?: string
  campaignBrief?: string
  campaignImageURI?: string
  email?: string
  country?: string
  record?: boolean | string
  videoCid?: string
  videoUrl?: string
  image?: string
  activePoolId?: string
  previousPools?: string[]
  notificationPreferences?: CampaignSettings
  ownerAddress?: string
}

export interface CampaignSettings {
  _id?: string
  campaignName?: string
  updatedAt?: string
  filename?: string
  email?: string[]
  push?: string
}

export enum PushNotifications {
  All,
  SameAsEmail,
  None,
}
