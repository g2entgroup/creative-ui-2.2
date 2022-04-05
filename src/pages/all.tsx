import { useState } from 'react';
import { SimpleGrid } from "@chakra-ui/react"
import { Flex, Center} from "@chakra-ui/react"
import BucketCard from '../components/common/Cards/BucketCard'
import { Button } from "@chakra-ui/react"
import { TextileInstance } from "../services/textile/textile";

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
            cid.push({'cid' : element.cid, 'name': element.name, 'description': element.description})
            
    });
   console.log(photos)
   console.log(cid)
   setCids(cid)
    }
    // TODO: Be able to delete entry
    const deleteMedia = async (photos) => {
        const textileInstance = await TextileInstance.getInstance();
        await textileInstance.deleteNFTFromBucket(photos);
    }

    return(
        <>
            <Flex alignContent="center">
                <Center>    
                    <Button colorScheme="blue" onClick={fetchGallery} hidden={displayPix}> Fetch my photos </Button>
                </Center>
                <SimpleGrid columns={{sm: 1, md: 4}} marginBottom={20} spacing={20} hidden={!displayPix}>

                    {   
                        cids.map((id) => (
                            <BucketCard imagelink={"https://hub.textile.io/ipfs/"+ id.cid } key={id.cid} creator={id.creator} name={id.name} description={id.description} deleteMedia={deleteMedia}></BucketCard>
                        )) 
                    }
            
                </SimpleGrid>
            </Flex>
            
        </>
    )
}
