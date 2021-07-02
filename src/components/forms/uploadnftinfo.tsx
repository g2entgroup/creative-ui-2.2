import React from "react";
import { providers } from 'ethers'
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
    Select,
    useToken
  } from '@chakra-ui/react';
  import { createLazyMint, generateTokenId } from "../../rarible/createLazyMint";

  type WindowInstanceWithEthereum = Window & typeof globalThis & { ethereum?: providers.ExternalProvider };
  class StrongType<Definition, Type> {
    // @ts-ignore
    private _type: Definition;
    constructor(public value?: Type) {}
  }
  export class EthereumAddress extends StrongType<'ethereum_address', string> {}

  export default function SimpleCard(props) {

    console.log(props.nftinfo)
    const [brand400, brand200] = useToken(
      // the key within the theme, in this case `theme.colors`
      "colors",
      // the subkey(s), resolving to `theme.colors.red.100`
      ["brand.400", "brand.200"],
      // a single fallback or fallback array matching the length of the previous arg
    )
    //const useGenerateTokenId = generateTokenId();

    const submitHandler = async () => {
      if (!(window as WindowInstanceWithEthereum).ethereum) {
        throw new Error(
          'Ethereum is not connected. Please download Metamask from https://metamask.io/download.html'
        );
      }
  
      console.debug('Initializing web3 provider...');
      // @ts-ignore
      const provider = new providers.Web3Provider((window as WindowInstanceWithEthereum).ethereum);

      const accounts = await (window as WindowInstanceWithEthereum).ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length === 0) {
        throw new Error('No account is provided. Please provide an account to this application.');
      }

    const address = new EthereumAddress(accounts[0]);
      const contract = "0xB0EA149212Eb707a1E5FC1D2d3fD318a8d94cf05";
      const minter = address;
      const ipfsHash = "QmW5kGG6JPDv7oSVEfP8KTY9rsfQXCHpYJxvdRJrkkzbge";
      const tokenId = await generateTokenId(contract, minter)
      //console.log("Chain ID", chainId);
      const useCreateLazyMint = createLazyMint(tokenId, provider, contract, address.value, ipfsHash );
      console.log(await useCreateLazyMint);
    }
    return (
      <Flex
        minH={'80vh'}
        align={'center'}
        justify={'center'}
        >
        <Center>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} color={useColorModeValue('gray.50' , 'gray.100')}>Upload Your NFT</Heading>
            
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
                <FormLabel>Select Collection</FormLabel>
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
                
              <Button colorScheme='pink' variant="solid" size="sm" width={125} onClick={submitHandler}>
                    Upload now
                </Button>
                <Button colorScheme='pink' variant="solid" size="sm" width={125} >
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