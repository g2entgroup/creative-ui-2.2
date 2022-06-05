import { providers } from 'ethers';
import {
    Box,
    useColorModeValue,
    Badge,
    useToken,
  } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { StarIcon } from '@chakra-ui/icons';
  
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

  // const address = new EthereumAddress(accounts[0]);
  //   const contract = "0xB0EA149212Eb707a1E5FC1D2d3fD318a8d94cf05";
  //   const minter = address;
  //   const ipfsHash = "QmW5kGG6JPDv7oSVEfP8KTY9rsfQXCHpYJxvdRJrkkzbge";
  //   const tokenId = await generateTokenId(contract, minter)
  //   //console.log("Chain ID", chainId);
  //   const useCreateLazyMint = createLazyMint(tokenId, provider, contract, address.value, ipfsHash );
  //   console.log(await useCreateLazyMint);
  }

  


  export default function BrandDiscovery({imagelink}) {
    const router = useRouter()

    const property = {
      imageAlt: "Sample Campaign",
      crtv: 40,
      apr: 70.00,
      brand: "Brand Name",
      product: "Product Name",
      formattedPrice: "$20,000.00",
      reviewCount: 25,
      rating: 5
    };

    const [brand400, brand200] = useToken(
      // the key within the theme, in this case `theme.colors`
      "colors",
      // the subkey(s), resolving to `theme.colors.red.100`
      ["brand.400", "brand.200"],
      // a single fallback or fallback array matching the length of the previous arg
    )
  
    const goTo = () => {
      router.push('/details/1')
    };

    return (
          <Box
            role={'group'}
            maxW='sm'
            margin={5}
            overflow="hidden"
            width='full'
            height='auto'
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={`inset 0 4px 0 ${brand400}, 0 0 8px ${brand200}`}
            borderWidth="1px"
            rounded="lg"
            pos={'relative'}
            zIndex={0}
            cursor='pointer'
            display='flex'
            flexDir='column'
            alignItems='center'
            onClick={() => goTo()}
            >
            <Box
              rounded={'lg'}
              mt={4}
              pos={'relative'}
              height={'200px'}
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
                height={200}
                width={250}
                objectFit={'cover'}
                src={imagelink}
              />
            </Box>
            <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge rounded="full" px="2" color={brand400}>
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {property.crtv} CRTV &bull; {property.apr} % APR
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h2"
          lineHeight="tight"
          color={useColorModeValue("black", "white")}
          noOfLines={1}
        >
          {property.brand} - {property.product}
        </Box>

        <Box color={useColorModeValue("black", "white")}>
          {property.formattedPrice}
          <Box as="span" 
            bgGradient="linear(to-l, #7928CA, #e50168)"
            bgClip="text"
            fontSize="lg"
            fontWeight="extrabold" 
          >
            &nbsp;/ Prize Reward
          </Box>
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < property.rating ? "pink.500" : "gray.300"}
              />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {property.reviewCount} reviews
          </Box>
        </Box>
      </Box>
        </Box>
    );
  }