import omitDeep from 'omit-deep'
import { utils } from 'ethers'
import { create } from 'ipfs-http-client'
import { v4 as uuidv4 } from 'uuid'

export const prettyJSON = (message: string, obj: string) => {
  console.log(message, JSON.stringify(obj, null, 2))
}

export const sleep = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export const omit = (object: any, name: string) => {
  return omitDeep(object, name)
}

export const splitSignature = (signature: any) => {
  return utils.splitSignature(signature)
}

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
})

type uploadIpfsProfileProps = {
  payload: {
    name: string
    bio: string
    cover_picture: string
    attributes: any[]
  }
}

export const uploadIpfsProfile = async ({
  payload,
}: uploadIpfsProfileProps) => {
  const { name, bio, cover_picture, attributes } = payload
  const result = await client.add(
    JSON.stringify({
      version: '1.0.0',
      metadata_id: uuidv4(),
      appId: 'creative',
      name: name,
      bio: bio,
      cover_picture: cover_picture,
      attributes: attributes,
    })
  )

  return result
}
