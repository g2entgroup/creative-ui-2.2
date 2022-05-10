import { HStack, VStack, Stack, Text, Flex, Badge } from '@chakra-ui/react'
import { DeleteIcon} from '@chakra-ui/icons'
import React from 'react'


function AttributeList({ attributes, deleteAttribute }) {

    return (
       !attributes.length ? 
       <Badge 
       colorScheme="pink" 
       variant="outline"
       borderRadius="4"
       p='4' m='5'
       >No attributes for this NFT!!</Badge> 
       : (
        <Stack direction={["column", "row"]} spacing="24px">
        {attributes.map((attribute) => (
            <HStack spacing="auto" w="sm">
                <Flex>
                    <Badge
                        key={attribute.id} 
                        colorScheme="purple" 
                        variant="outline"
                        borderRadius="sm" 
                    >
                        {attribute.property}: {attribute.text}
                    </Badge>

                    <Flex w="10px" >
                
                        <DeleteIcon color="red.500" mr="2" onClick={()=>deleteAttribute(attribute.id)}/>
                 
                    </Flex>
                </Flex> 
  
            </HStack>  
            
            ))}   
        </Stack>
        ) 
        ) 
    
    }   
export default AttributeList