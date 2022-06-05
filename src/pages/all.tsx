import { useState } from 'react'
import { Box } from '@chakra-ui/react'
import BucketCard from '../components/common/Cards/BucketCard'
import { Button } from '@chakra-ui/react'
import { TextileInstance } from '../services/textile/textile'
import BatchStorage from '../components/common/Button/batchStorage'
import { providers } from 'ethers'
import { init } from '@textile/eth-storage'

type WindowInstanceWithEthereum = Window &
  typeof globalThis & { ethereum?: providers.ExternalProvider }
class StrongType<Definition, Type> {
  // @ts-ignore
  private _type: Definition
  constructor(public value?: Type) {}
}

export default function All() {
  const [displayPix, setDisplayPix] = useState(false)
  const [cids, setCids] = useState([])
  let photos = []
  let cid = []

  const fetchGallery = async () => {
    const textileInstance = await TextileInstance.getInstance()
    photos = await textileInstance.getAllUserNFTs()
    setDisplayPix(true)
    // console.log(photos);
    photos.map((element) => {
      cid.push({
        cid: element.cid,
        name: element.name,
        description: element.description,
      })
    })
    // console.log(photos);
    // console.log(cid);
    setCids(cid)
  }
  // TODO: Be able to delete NFT item
  const deleteMedia = async (photos) => {
    const textileInstance = await TextileInstance.getInstance()
    await textileInstance.deleteNFTFromBucket(photos)
  }

  const batchStorage = async () => {
    const provider = new providers.Web3Provider(
      (window as WindowInstanceWithEthereum).ethereum
    )
    const storage = await init(provider.getSigner())
    const textileInstance = await TextileInstance.getInstance()

    if ((await storage.hasDeposit()) && cids.length > 0) {
      for (let nftMetadata of cids) {
        await textileInstance.uploadTokenMetadata(storage, nftMetadata)
      }
    } else if (cids.length > 0) {
      await storage.addDeposit()
      for (let nftMetadata of cids) {
        await textileInstance.uploadTokenMetadata(storage, nftMetadata)
      }
    }
  }

  const OneItemStorage = async (nftMetadata) => {
    const provider = new providers.Web3Provider(
      (window as WindowInstanceWithEthereum).ethereum
    )
    const storage = await init(provider.getSigner())
    const textileInstance = await TextileInstance.getInstance()

    if (await storage.hasDeposit()) {
      await textileInstance.uploadTokenMetadata(storage, nftMetadata)
    } else {
      await storage.addDeposit()
      await textileInstance.uploadTokenMetadata(storage, nftMetadata)
    }
  }

  const releaseFund = async () => {
    const provider = new providers.Web3Provider(
      (window as WindowInstanceWithEthereum).ethereum
    )
    const storage = await init(provider.getSigner())
    await storage.releaseDeposits()
  }

  return (
    <Box
      display="flex"
      flexDir={['column', 'column', 'column', 'column']}
      flexWrap={['wrap', 'wrap', 'wrap', 'wrap']}
    >
      <Box
        display="flex"
        flexDir={['column', 'column', 'row', 'row']}
        alignItems={['center', 'center', 'flex-start', 'flex-start']}
        justifyContent={[
          'space-evenly',
          'space-evenly',
          'space-evenly',
          'space-evenly',
        ]}
        flexWrap={['nowrap', 'nowrap', 'wrap', 'wrap']}
      >
        <Button colorScheme="blue" onClick={fetchGallery} hidden={displayPix}>
          {' '}
          Fetch my photos{' '}
        </Button>
        <BatchStorage onClick={batchStorage}></BatchStorage>
      </Box>
      <Box
        display="flex"
        minWidth="100vw"
        flexDir={['column', 'column', 'row', 'row']}
        padding={[2, 2, 2, 10]}
        alignItems={['center', 'center', 'flex-start', 'flex-start']}
        justifyContent={['center', 'center', 'center', 'center']}
        flexWrap={['nowrap', 'nowrap', 'wrap', 'wrap']}
      >
        {cids.map((id, index) => (
          <BucketCard
            key={index}
            imagelink={`https://dweb.link/ipfs/${id.cid}`}
            creator={id.creator}
            name={id.name}
            description={id.description}
            deleteMedia={deleteMedia}
          ></BucketCard>
        ))}
      </Box>
    </Box>
  )
}
