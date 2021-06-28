import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Center,
    Button,
    Heading,
    Text,
    useColorModeValue,
    HStack,
    VStack,
    Select
  } from '@chakra-ui/react';
  
  export default function SimpleCard() {
    return (
      <Flex
        minH={'80vh'}
        align={'center'}
        justify={'center'}
        >
        <Center>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} color={useColorModeValue('gray.50' , 'gray.100')}>Upload your NFT Info</Heading>
            
          </Stack>
          <Box
          width={"800px"}
            rounded={'lg'}
            alignSelf={"center"}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            textColor={useColorModeValue('black', 'white')}
            p={8}>
            <Stack spacing={10} >
                <HStack spacing={8}>
                <FormControl id="nfttitle">
                <FormLabel>NFT Title</FormLabel>
                <Input type="test" />
              </FormControl>
              <FormControl id="creatorname" >
                <FormLabel>Creator name</FormLabel>
                <Input type="test" />
              </FormControl>
                </HStack>
                <HStack spacing={8}>
                <FormControl id="album">
                <FormLabel>Select Album</FormLabel>
                <Select placeholder="Select Album">
                    <option>Album 1</option>
                    <option>Album 2</option>
                </Select>
                </FormControl>
                <FormControl id="privacy">
                <FormLabel>Privacy</FormLabel>
                <Select placeholder="Select privacy">
                    <option>Public</option>
                    <option>Protected</option>
                    <option>Private</option>

                </Select>
                </FormControl>
              
                </HStack>
                <Center>

              <HStack  spacing={10}>
                
              <Button colorScheme="pink" size="sm" width={125}>
                    Upload now
                </Button>
                <Button colorScheme="pink" size="sm" width={125} >
                    Cancel
                </Button>
              
              </HStack>
              </Center>
            </Stack>
          </Box>
        </Stack>
        </Center>
      </Flex>
    );
  }