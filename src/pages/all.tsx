import { providers } from 'ethers'
import { useState } from 'react';
import { SimpleGrid, Text } from "@chakra-ui/react"
import BrandDiscovery from '../components/common/Cards/branddiscovery'
import { Button, ButtonGroup } from "@chakra-ui/react"
import { TextileInstance } from "../services/textile/textile";
import { getIdentity } from "../utils/fetchTextileIdentity"
import { canBeRendered } from 'react-toastify/dist/utils';
export default function All () {
    const [displayPix , setDisplayPix ] = useState(false)
    let photos ;
    let cid = [];

    const fetchGallery = async ()=> {
    
     const textileInstance = await TextileInstance.getInstance();
     photos = await textileInstance.getAllUserNFTs();
     setDisplayPix(true)
     console.log(photos)
    photos = photos.map((element) => {
            cid.push("https://ipfs.io/ipfs/"+element.cid)
    });
   console.log(photos)
   console.log(typeof(cid[0]))
    }
  

    return(
    <>
    <Button colorScheme="blue" onClick={fetchGallery}> Fetch my photos </Button>
    <SimpleGrid columns={{sm: 1, md: 4}} marginBottom={"10"} hidden={!displayPix}>
    <BrandDiscovery imagelink= "https://picsum.photos/200/300.webp?random=1" name="@creator" bio="awesome creative NFT"/>
    <BrandDiscovery imagelink={cid[1]} bio="user item" name="your name"></BrandDiscovery>
    <BrandDiscovery imagelink={cid[0]} bio="user item" name="your name"></BrandDiscovery>

    {   
         cid.map((e) => (
            <BrandDiscovery imagelink={e} bio="user item" name="your name"></BrandDiscovery>
            )) 
     }
 
    </SimpleGrid>
        
    </>)
}
