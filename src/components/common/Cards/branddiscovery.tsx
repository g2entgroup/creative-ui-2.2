import { providers } from 'ethers';
import {
    Box,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    SimpleGrid,
    HStack,
    Button,
    Badge,
    ButtonGroup,
    Flex,
    IconButton,
    useEditableControls,
  } from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
  createLazyMint, 
  generateTokenId
} from '../../../rarible/createLazyMint';
import Buy from "../Button/Buy/buy";
import Image from 'next/image';
  
const myLoader = ({ src, width }) => {
  return `${src}?w=${width}&q=${75}`
}

type WindowInstanceWithEthereum = Window & typeof globalThis & { ethereum?: providers.ExternalProvider };
  class StrongType<Definition, Type> {
    // @ts-ignore
    private _type: Definition;
    constructor(public value?: Type) {}
  }

  export class EthereumAddress extends StrongType<'ethereum_address', string> {}
  
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

  export default function BrandDiscovery({imagelink, name, description, creator} ) {
    return (
      <>
          <Box
            role={'group'}
            maxW='sm'
            minW='sm'
            margin={5}
            overflow="hidden"
            width='full'
            height='auto'
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            borderWidth="1px"
            rounded="lg"
            pos={'relative'}
            zIndex={0}
            display='flex'
            flexDir='column'
            alignItems='center'
            >
            <Box
              rounded={'lg'}
              mt={-12}
              pos={'relative'}
              height={'230px'}
              _after={{
                transition: 'all .3s ease',
                content: '""',
                w: 'full',
                h: 'full',
                pos: 'absolute',
                top: 5,
                left: 0,
                backgroundImage: `url(${imagelink})`,
                filter: 'blur(15px)',
                zIndex: -1,
              }}
              _groupHover={{
                _after: {
                  filter: 'blur(20px)',
                },
              }}>
              <Image
                loader={myLoader}
                height={230}
                width={282}
                objectFit={'cover'}
                src={imagelink}
              />
            </Box>
            <Stack pt={10} align={'center'} color={useColorModeValue("gray.500" , "white")}>
              <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'} defaultValue={creator}>{creator}
              </Text>
              <Text fontSize={'2xl'} fontFamily={'body'} fontWeight={500} defaultValue={name}>{name}
              </Text>
              <Stack direction={'row'} align={'center'}>
                <Text fontWeight={800} fontSize={'sm'} defaultValue={description}>{description}
                </Text>
              </Stack>
            </Stack>

          <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'black')}
              fontWeight={'400'}>
              #art
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'black')}
              fontWeight={'400'}>
              #photography
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'black')}
              fontWeight={'400'}>
              #music
            </Badge>
          </Stack>
         
          <Stack m={4} mb={4} spacing={1}>
              <Buy />
          </Stack>
        </Box>
      </>
    );
  }