import { useState } from 'react';
import { list, SimpleGrid, Text } from "@chakra-ui/react"
import { Flex, Spacer , Center} from "@chakra-ui/react"
import BrandDiscovery from '../components/common/Cards/branddiscovery'
import { Button, ButtonGroup } from "@chakra-ui/react"
import { TextileInstance } from "../services/textile/textile";
import { getIdentity } from "../utils/fetchTextileIdentity"
import Image from 'next/image';
import { object } from 'prop-types';

export default function All () {
    const [displayPix , setDisplayPix ] = useState(false);
    const [cids ,setCids] = useState([]);
    let photos ;
    let cid = [] ;

    const fetchGallery = async ()=> {
    
     const textileInstance = await TextileInstance.getInstance();
     photos = await textileInstance.getAllUserNFTs();
     setDisplayPix(true)
     console.log(photos)
    photos.map((element) => {
            cid.push({'cid' : element.cid, 'name': element.name, 'creator':element.description})
            
    });
   console.log(photos)
   console.log(cid)
   setCids(cid)
    }
  

    return(
    <>
    <Flex alignContent="center">
        <Center>    
                <Button colorScheme="blue" onClick={fetchGallery} hidden={displayPix}> Fetch my photos </Button>
        </Center>
    <SimpleGrid columns={{sm: 1, md: 4}} marginBottom={"10"} hidden={!displayPix}>

    {   
         cids.map((id) => (
            <BrandDiscovery imagelink={"https://hub.textile.io/ipfs/"+ id.cid } key={id.cid} bio={id.creator} name={id.name}></BrandDiscovery>
            )) 
    }
 
    </SimpleGrid>
    </Flex>
        
    </>)
}
