import React from "react";
import { AppProps } from "next/app";
import { Mumbai, Config, DAppProvider } from "@usedapp/core";
import { ChakraProvider, Box, HStack, Icon, Stack, Text } from "@chakra-ui/react";
// import theme from "../styles/theme";
import theme from "../utils/theme";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "../utils/utils";
import Header from "../components/common/Navbar/header";
import Footer from "../components/common/Footer/footer";
import { BannerLink } from '../components/common/BannerLink';
import { BellIcon } from '@chakra-ui/icons';
import { StoreContainer } from "../utils/store";
import { getDefaultProvider } from "ethers";

const config: Config = {
  readOnlyChainId: Mumbai.chainId,
  readOnlyUrls: {
    [Mumbai.chainId]: getDefaultProvider(`https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_MUMBAI}`),
  },
  notifications: 
  {
    checkInterval: 1500,
    expirationPeriod: 5000
  }
};

// Extend the theme to include custom colors, fonts, etc
// const colors = {
//   brand: {
//     200: "#FFCC80",
//     300: "#FF8A65",
//     400: "#EC407A",
//     500: "#E5395",
//     600: "#D32F2F",
//     700: "#FBC02D",
//    },
//  }

//  const theme = extendTheme({ colors })

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <DAppProvider config={config}>
    <ChakraProvider resetCSS theme={theme}>
      <Web3ReactProvider getLibrary={getLibrary}>
      <StoreContainer.Provider>
        <Box 
          minH="100vh" 
          minW="100vw">
        <Header
          children
         />
          <Box as="section" pt="8" pb="12">
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              justifyContent="center"
              alignItems="center"
              py="3"
              px={{ base: '3', md: '6', lg: '8' }}
              color="white"
              bgGradient="linear(to-l, #FFCC80, #D32F2F, #EC407A)"
            >
              <HStack spacing="3">
                <Icon as={BellIcon} fontSize="2xl" h="10" />
                <Text fontWeight="medium" marginEnd="2" is="custom">
                  Confirm your email. Check your email. We&apos;ve send a message to <b>sample@gmail.com</b>
                </Text>
              </HStack>
              <BannerLink w={{ base: 'full', sm: 'auto' }} flexShrink={0}>
                Resend email
              </BannerLink>
            </Stack>
          </Box>
          <Component {...pageProps} />
          <Footer />
        </Box>
        </StoreContainer.Provider>
      </Web3ReactProvider>
    </ChakraProvider>
    </DAppProvider>
  );
};

export default MyApp;
