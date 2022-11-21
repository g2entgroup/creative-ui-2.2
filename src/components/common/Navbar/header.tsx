import { useRouter } from 'next/router'
import {
  ChainId,
  useEthers,
  shortenAddress,
  useNotifications,
  useEtherBalance,
} from '@usedapp/core'
import ConnectWallet from '../Navbar/ConnectWallet'
import { useToast } from '@chakra-ui/react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  chakra,
  HStack,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorModeValue,
  useDisclosure,
  CloseButton,
  VStack,
  Button,
  useColorMode,
  SimpleGrid,
  Stack,
  Heading,
  Divider,
  Center,
  Text,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'
import transakSDK from '@transak/transak-sdk'
import NextLink from 'next/link'
import NotificationDrawer from '../Notification/NotificationDrawer'
import { useViewportScroll } from 'framer-motion'
//import Head, { MetaProps } from '../layout/Head';
import { IoIosArrowDown } from 'react-icons/io'
import { AiOutlineMenu } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa'
import { InfoIcon } from '@chakra-ui/icons'
// import Balance from "../Balance/Balance";
import Logo from '../Navbar/Logo'
import SignIn from './SignIn'
import SignUp from './SignUp'
import InviteUser from './InviteUser'
import Image from 'next/image'
import { formatEther } from 'ethers/lib/utils'
import { useAuth } from '../../../services/context/auth'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { ST } from 'next/dist/shared/lib/utils'

/**
 * Constants & Helpers
 */

// Title text for the various transaction notifications.
const TRANSACTION_TITLES = {
  transactionStarted: 'Local Transaction Started',
  transactionSucceed: 'Local Transaction Completed',
}

// Takes a long hash string and truncates it.
function truncateHash(hash: string, length = 38): string {
  return hash.replace(hash.substring(6, length), '...')
}

/**
 * Prop Types
 */
interface HeaderProps {
  children: ReactNode
}

const Header = ({ children }: HeaderProps): JSX.Element => {
  const router = useRouter()
  const toast = useToast()

  const { isLoggedIn, account, role, logOut } = useAuth()

  const { deactivate, chainId } = useEthers()

  const ethersBalance = useEtherBalance(account)

  const { notifications } = useNotifications()

  let chainName: string

  if (chainId === ChainId.Rinkeby) {
    chainName = 'Rinkeby'
  } else if (chainId === ChainId.Mumbai) {
    chainName = 'Mumbai'
  } else if (chainId === ChainId.Mainnet) {
    chainName = 'Mainnet'
  } else if (chainId === ChainId.Polygon) {
    chainName = 'Polygon'
  } else {
    ;('')
  }

  const { toggleColorMode: toggleMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')

  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  const bg = useColorModeValue('#F0F0F0', 'gray.900')

  const ref = useRef(null)

  const [y, setY] = useState(0)
  const { height } = ref.current
    ? ref.current.getBoundingClientRect()
    : { height: 0 }

  function loadInit() {
    const transak = new transakSDK({
      apiKey: '07d4475a-4b8c-49d6-ba88-61075d649c6f', // Your API Key
      environment: 'STAGING', // STAGING/PRODUCTION
      hostURL: window.location.href,
      widgetHeight: '625px',
      widgetWidth: '500px',
      // Examples of some of the customization parameters you can pass
      defaultCryptoCurrency: 'MATIC', // Example 'ETH'
      walletAddress: account, // Your customer's wallet address
      //themeColor: '[COLOR_HEX]', // App theme color
      fiatCurrency: 'USD', // If you want to limit fiat selection eg 'USD'
      //email: '', // Your customer's email address
      redirectURL: 'localhost:3000',
    })

    transak.init()

    // To get all the events
    transak.on(transak.ALL_EVENTS, (/*data*/) => {
      // console.log(data)
    })

    // This will trigger when the user marks payment is made.
    transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (/*orderData*/) => {
      // console.log(orderData);
      transak.close()
    })
    return () => {
      transak.cleanup()
    }
  }

  const myLoader = ({ src, width }) => {
    return `${src}?w=${width}&q=${75}`
  }

  const { scrollY } = useViewportScroll()

  useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()))
  }, [scrollY])

  const cl = useColorModeValue('gray.800', 'white')

  const mobileNav = useDisclosure()

  const Section = (props) => {
    const ic = useColorModeValue('brand.600', 'brand.200')
    const hbg = useColorModeValue('gray.100', 'brand.400')
    const tcl = useColorModeValue('gray.900', 'brand.100')
    const dcl = useColorModeValue('gray.500', 'gray.100')
    return (
      <Box
        display="flex"
        alignItems="start"
        rounded="lg"
        _hover={{ bg: hbg, cursor: 'pointer' }}
      >
        <chakra.svg
          flexShrink={0}
          h={6}
          w={6}
          color={ic}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          {props.icon}
        </chakra.svg>
        <Box pl={4}>
          <Text size="sm" fontWeight="700" color={tcl}>
            {props.title}
          </Text>
          <chakra.div mt={1} fontSize="sm" color={dcl}>
            {props.children}
          </chakra.div>
        </Box>
      </Box>
    )
  }

  const Features = (props) => {
    const hbg = useColorModeValue('gray.50', 'brand.400')
    const hbgh = useColorModeValue('gray.400', 'pink.800')
    const tcl = useColorModeValue('gray.900', 'gray.50')
    return (
      <>
        <SimpleGrid
          columns={props.h ? { base: 1, md: 3, lg: 5 } : 1}
          pos="relative"
          gap={{ base: 6, sm: 8 }}
          px={5}
          py={6}
          p={{ sm: 8 }}
        >
          <LinkBox color={tcl}>
            <NextLink
              href="https://creativeplatform.xyz/docs/intro"
              target={"_blank"}
              passHref={true}
            >
              <LinkOverlay>
                <Section 
                  title="How It Works"
                  icon={
                    <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1}
                    d="M8.627,7.885C8.499,8.388,7.873,8.101,8.13,8.177L4.12,7.143c-0.218-0.057-0.351-0.28-0.293-0.498c0.057-0.218,0.279-0.351,0.497-0.294l4.011,1.037C8.552,7.444,8.685,7.667,8.627,7.885 M8.334,10.123L4.323,9.086C4.105,9.031,3.883,9.162,3.826,9.38C3.769,9.598,3.901,9.82,4.12,9.877l4.01,1.037c-0.262-0.062,0.373,0.192,0.497-0.294C8.685,10.401,8.552,10.18,8.334,10.123 M7.131,12.507L4.323,11.78c-0.218-0.057-0.44,0.076-0.497,0.295c-0.057,0.218,0.075,0.439,0.293,0.495l2.809,0.726c-0.265-0.062,0.37,0.193,0.495-0.293C7.48,12.784,7.35,12.562,7.131,12.507M18.159,3.677v10.701c0,0.186-0.126,0.348-0.306,0.393l-7.755,1.948c-0.07,0.016-0.134,0.016-0.204,0l-7.748-1.948c-0.179-0.045-0.306-0.207-0.306-0.393V3.677c0-0.267,0.249-0.461,0.509-0.396l7.646,1.921l7.654-1.921C17.91,3.216,18.159,3.41,18.159,3.677 M9.589,5.939L2.656,4.203v9.857l6.933,1.737V5.939z M17.344,4.203l-6.939,1.736v9.859l6.939-1.737V4.203z M16.168,6.645c-0.058-0.218-0.279-0.351-0.498-0.294l-4.011,1.037c-0.218,0.057-0.351,0.28-0.293,0.498c0.128,0.503,0.755,0.216,0.498,0.292l4.009-1.034C16.092,7.085,16.225,6.863,16.168,6.645 M16.168,9.38c-0.058-0.218-0.279-0.349-0.498-0.294l-4.011,1.036c-0.218,0.057-0.351,0.279-0.293,0.498c0.124,0.486,0.759,0.232,0.498,0.294l4.009-1.037C16.092,9.82,16.225,9.598,16.168,9.38 M14.963,12.385c-0.055-0.219-0.276-0.35-0.495-0.294l-2.809,0.726c-0.218,0.056-0.351,0.279-0.293,0.496c0.127,0.506,0.755,0.218,0.498,0.293l2.807-0.723C14.89,12.825,15.021,12.603,14.963,12.385"
                    />
                  }
                >
                  <Text>Documentation on how the Creative platform works</Text>
                </Section>
              </LinkOverlay>
            </NextLink>
          </LinkBox>
          <Section
            title="CREATIVE TV"
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M17.919,4.633l-3.833,2.48V6.371c0-1-0.815-1.815-1.816-1.815H3.191c-1.001,0-1.816,0.814-1.816,1.815v7.261c0,1.001,0.815,1.815,1.816,1.815h9.079c1.001,0,1.816-0.814,1.816-1.815v-0.739l3.833,2.478c0.428,0.226,0.706-0.157,0.706-0.377V5.01C18.625,4.787,18.374,4.378,17.919,4.633 M13.178,13.632c0,0.501-0.406,0.907-0.908,0.907H3.191c-0.501,0-0.908-0.406-0.908-0.907V6.371c0-0.501,0.407-0.907,0.908-0.907h9.079c0.502,0,0.908,0.406,0.908,0.907V13.632zM17.717,14.158l-3.631-2.348V8.193l3.631-2.348V14.158z"              />
            }
          >
            <Text>
              Creatives want the ability to create great content and profits when they want without having to shell out 💰 to do it. So we built our own solution.
            </Text>
          </Section>
          <LinkBox color={tcl}>
            <NextLink
              href="https://alpha.stageverse.com/#/space/63291415ea801e00094ebbd0/1014-26"
              target={"_blank"}
              passHref={true}
            >
              <LinkOverlay>
                <Section
                  title="CREATIVE Stageverse"
                  icon={
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                    />
                  }
                >
                  <Text>
                    Our metaverse playground for interacting with all of our digital collectibles. 
                  </Text>
                </Section>
              </LinkOverlay>
            </NextLink>
          </LinkBox>
          <LinkBox color={tcl}>
            <NextLink
              href="https://boardroom.io/creativeorg/overview"
              target={"_blank"}
              passHref={true}
            >
              <LinkOverlay>
                <Section
                  title="DAO Proposals"
                  icon={
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  }
                >
                  <Text>
                    Looking for a way to help liven up our community?
                    Introducing DAO Proposals! Our community is managed via a
                    DAO and all that action happens here. From exciting new
                    features to heated debates on the best way to run things,
                    it’s all happening on DAO Proposals. So come join us and see
                    what all the fuss is about!
                  </Text>
                </Section>
              </LinkOverlay>
            </NextLink>
          </LinkBox>

          <LinkBox color={tcl}>
            <NextLink 
            href="https://feedback.creativeplatform.xyz"
            target={"_blank"} 
            passHref={true}>
              <LinkOverlay>
                <Section
                  title="Feature Suggestions"
                  icon={
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  }
                >
                  <Text>
                    Suggest a feature to the Creative community for the good of
                    the platform.
                  </Text>
                </Section>
              </LinkOverlay>
            </NextLink>
          </LinkBox>
        </SimpleGrid>
        <Box px={{ base: 5, sm: 8 }} py={5} bg={hbg} display={{ sm: 'flex' }}>
          <Stack direction={{ base: 'row' }} spacing={{ base: 6, sm: 10 }}>
            <Box display="flow-root">
              <LinkBox
                m={-3}
                p={3}
                display="flex"
                alignItems="center"
                rounded="md"
                fontSize="md"
                color={tcl}
                _hover={{ bg: hbgh }}
              >
                <chakra.svg
                  flexShrink={0}
                  h={6}
                  w={6}
                  color="inherit"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </chakra.svg>
                <chakra.span ml={3}>Watch Demo</chakra.span>
              </LinkBox>
            </Box>

            <Box display="flow-root">
              <LinkBox
                m={-3}
                p={3}
                display="flex"
                alignItems="center"
                rounded="md"
                fontSize="md"
                color={tcl}
                _hover={{ bg: hbgh }}
              >
                <chakra.svg
                  flexShrink={0}
                  h={6}
                  w={6}
                  color="inherit"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </chakra.svg>
                <chakra.span ml={3}>Contact Sales</chakra.span>
              </LinkBox>
            </Box>
          </Stack>
        </Box>
      </>
    )
  }
  const MobileNavContent = (
    <VStack
      pos="absolute"
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? 'flex' : 'none'}
      flexDirection="column"
      p={2}
      pb={4}
      m={2}
      bg={bg}
      spacing={3}
      rounded="sm"
      shadow="sm"
    >
      <CloseButton
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={mobileNav.onClose}
      />
    </VStack>
  )
  return (
    <>
      <chakra.header
        ref={ref}
        shadow={y > height ? 'sm' : undefined}
        transition="box-shadow 0.2s"
        bg={bg}
        borderTop="6px solid"
        borderTopColor="brand.400"
        w="full"
        overflowY="hidden"
      >
        <chakra.div h="4.5rem" mx="auto" maxW="1200px">
          <Flex
            w="full"
            h="full"
            px="6"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex align="flex-start">
              <Button
                bg={bg}
                color="gray.500"
                display="inline-flex"
                alignItems="center"
                fontSize="md"
                _hover={{ color: 'black' }}
                _focus={{ boxShadow: 'none', color: 'gray.500' }}
                onClick={() => router.push('/')}
              >
                <HStack>
                  <Logo />
                  <Heading
                    color={useColorModeValue('gray.500', 'white')}
                    as="h1"
                    size="md"
                  >
                    {' '}
                    CREATIVE
                  </Heading>
                </HStack>
              </Button>
            </Flex>
            <Flex>
              <HStack spacing="5" display={{ base: 'none', md: 'flex' }}>
                <Button
                  bg={bg}
                  color="gray.500"
                  display="inline-flex"
                  alignItems="center"
                  fontSize="md"
                  _hover={{ color: cl }}
                  _focus={{ boxShadow: 'none' }}
                  onClick={() => router.push('/discover')}
                >
                  Discover
                </Button>
                <Button
                  bg={bg}
                  color="gray.500"
                  display="inline-flex"
                  alignItems="center"
                  fontSize="md"
                  _hover={{ color: cl }}
                  _focus={{ boxShadow: 'none' }}
                >
                  Activity
                </Button>
                <Button
                  bg={bg}
                  color="gray.500"
                  display="inline-flex"
                  alignItems="center"
                  fontSize="md"
                  _hover={{ color: cl }}
                  _focus={{ boxShadow: 'none' }}
                  onClick={() => router.push('/vote')}
                >
                  Vote
                </Button>
                <Center height="50px">
                  <Divider orientation="vertical" />
                </Center>
                <Popover>
                  <PopoverTrigger>
                    <Button
                      bg={bg}
                      color="gray.500"
                      display="inline-flex"
                      alignItems="center"
                      fontSize="md"
                      _hover={{ color: cl }}
                      _focus={{ boxShadow: 'none' }}
                      rightIcon={<IoIosArrowDown />}
                    >
                      Community
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    w="100vw"
                    maxW="md"
                    _focus={{ boxShadow: 'md' }}
                  >
                    <Features />
                  </PopoverContent>
                </Popover>
              </HStack>
            </Flex>
            {account ? (
              <Box
                display={['flex', 'flex', 'flex', 'flex']}
                alignItems="center"
                background="gray.700"
                borderRadius="xl"
                py="0"
              >
                <Box display={['none', 'none', 'none', 'flex']} px="1.5">
                  <chakra.h1 color="white" fontSize="xs">
                    <Text>Balance:</Text>
                    {ethersBalance && (
                      <Text>{formatEther(ethersBalance).slice(0, 6)} ETH</Text>
                    )}
                  </chakra.h1>
                </Box>
                {chainId === 80001 ? (
                  <Box
                    display={['none', 'none', 'flex', 'flex']}
                    px="3"
                    bg="purple.300"
                  >
                    <chakra.h1 color="white" fontSize="md">
                      <Text size="sm">{chainName}</Text>
                    </chakra.h1>
                  </Box>
                ) : chainId === 137 ? (
                  <Box
                    display={['none', 'none', 'none', 'flex']}
                    px="3"
                    bg="purple.600"
                  >
                    <chakra.h1 color="white" fontSize="md">
                      <Text size="sm">{chainName}</Text>
                      {/* 15.02&nbsp;ETH */}
                    </chakra.h1>
                  </Box>
                ) : (
                  <Box display={['none', 'none', 'none', 'flex']} px="3">
                    <chakra.h1 color="white" fontSize="md">
                      <Text size="sm">{chainName}</Text>
                      {/* 15.02&nbsp;ETH */}
                    </chakra.h1>
                  </Box>
                )}
                <Menu>
                  <MenuButton
                    bg="transparent"
                    border="1px solid transparent"
                    _hover={{
                      border: '1px',
                      borderStyle: 'solid',
                      borderColor: 'brand.900',
                    }}
                    borderRadius="xl"
                    m="1px"
                    ml="4px"
                    px={3}
                    height="38px"
                  >
                    <Box display={['none', 'none', 'flex', 'flex']}>
                      <chakra.h2
                        color="white"
                        fontSize="md"
                        fontWeight="medium"
                      >
                        {shortenAddress(account)}
                      </chakra.h2>
                    </Box>
                    <Box display={['flex', 'flex', 'none', 'none']}>
                      <AiOutlineMenu />
                    </Box>
                  </MenuButton>
                  <MenuList
                    zIndex="100"
                    maxH={'400px'}
                    overflowY={['scroll', 'scroll', 'hidden', 'hidden']}
                  >
                    {!isLoggedIn && (
                      <MenuItem color="pink.500">
                        <SignIn />
                      </MenuItem>
                    )}
                    {!isLoggedIn && (
                      <MenuItem color="blue.500">
                        <SignUp />
                      </MenuItem>
                    )}
                    {isLoggedIn && role === 'brand' && (
                      <MenuItem color="yellow.500">
                        <InviteUser />
                      </MenuItem>
                    )}
                    {isLoggedIn && (
                      <MenuItem
                      as={Button}
                      color="white"
                      colorScheme="pink"
                      variant="solid"
                      size="md"
                      mt={2}
                      mb={4}
                      onClick={loadInit}
                      rightIcon={
                        <Image
                          loader={myLoader}
                          height={40}
                          width={40}
                          src="/images/visa.svg"
                          alt="Transak"
                        />
                      }
                    >
                      💰 Add Funds
                    </MenuItem>
                    )}
                    <MenuItem
                      display={['flex', 'flex', 'none', 'none']}
                      as={Link}
                      onClick={() => router.push('/discover')}
                      color="orange.500"
                    >
                      Discover
                    </MenuItem>
                    <MenuItem
                      display={['flex', 'flex', 'none', 'none']}
                      as={Link}
                      onClick={() => router.push('/community')}
                      color="orange.500"
                    >
                      Activity
                    </MenuItem>
                    <MenuItem
                      display={['flex', 'flex', 'none', 'none']}
                      as={Link}
                      onClick={() => router.push('/vote')}
                      color="orange.500"
                    >
                      Vote
                    </MenuItem>
                    <MenuItem
                      display={['flex', 'flex', 'none', 'none']}
                      as={Link}
                      onClick={() => router.push('/community')}
                      color="orange.500"
                    >
                      Community
                    </MenuItem>
                    {isLoggedIn && role === 'pro' && (
                      <MenuItem
                        as={Link}
                        color="red"
                        onClick={() => router.push('/upload')}
                      >
                        Upload
                      </MenuItem>
                    )}
                    {isLoggedIn && role === 'brand' && (
                      
                      <MenuItem
                        as={Link}
                        onClick={() => router.push('/createcampaign')}
                        color="red"
                      >
                            Create Campaign
                      </MenuItem>
                    )}
                    {isLoggedIn && role === 'pro' && (
                      <MenuItem
                        as={Link}
                        onClick={() => router.push('/all')}
                        color="red"
                      >
                        View My Library
                      </MenuItem>
                    )}
                    {!isLoggedIn && (
                      <MenuItem
                        as={Button}
                        color="white"
                        colorScheme={'red'}
                        variant="solid"
                        onClick={() => {
                          deactivate()
                          toast({
                            title: 'Wallet Disconnected',
                            status: 'success',
                            duration: 2000,
                            isClosable: true,
                          })
                        }}
                      >
                        Disconnect
                      </MenuItem>
                    )}
                    {isLoggedIn && (
                      <MenuItem
                        as={Button}
                        colorScheme={'red'}
                        color={'white'}
                        variant="solid"
                        onClick={() => {
                          logOut()
                        }}
                      >
                        Log Out
                      </MenuItem>
                    )}
                  </MenuList>
                </Menu>
              </Box>
            ) : (
              <ConnectWallet />
            )}
            {children}
            {notifications.map((notification) => {
              if (notification.type === 'walletConnected') {
                return null
              }
              return (
                <Alert
                  key={notification.id}
                  status="success"
                  position="fixed"
                  bottom="8"
                  right="8"
                  width="400px"
                >
                  <AlertIcon />
                  <Box>
                    <AlertTitle>
                      {TRANSACTION_TITLES[notification.type]}
                    </AlertTitle>
                    <AlertDescription overflow="hidden">
                      Transaction Hash:{' '}
                      {truncateHash(notification.transaction.hash, 61)}
                    </AlertDescription>
                  </Box>
                </Alert>
              )
            })}
            <HStack spacing="5" display={{ base: 'none', md: 'flex' }}>
              <NotificationDrawer />
              <IconButton
                size="md"
                fontSize="lg"
                aria-label={`Switch to ${text} mode`}
                variant="ghost"
                color="brand.700"
                ml={{ base: '0', md: '3' }}
                onClick={toggleMode}
                icon={<SwitchIcon />}
              />
              <IconButton
                display={{ base: 'flex', md: 'none' }}
                variant="outline"
                aria-label="Open menu"
                fontSize="20px"
                colorScheme="white"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />
            </HStack>
          </Flex>
          {MobileNavContent}
        </chakra.div>
      </chakra.header>
    </>
  )
}
export default Header
