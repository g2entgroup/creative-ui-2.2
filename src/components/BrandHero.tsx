import React from 'react'
import { chakra, Box, useColorModeValue, Icon, Heading } from '@chakra-ui/react'
import Hero from '../components/Hero'

const imgSrc = 'brands.jpg'

const BrandHero = () => {
  const bg = useColorModeValue('white', 'gray.800')
  return (
    <Box pos="relative" overflow="hidden" bg={bg} mt={7.5}>
      <Box maxW="7xl" mx="auto">
        <Box
          pos="relative"
          pb={{ base: 8, sm: 16, md: 20, lg: 28, xl: 32 }}
          maxW={{ lg: '2xl' }}
          w={{ lg: 'full' }}
          zIndex={1}
          bg={bg}
          border="solid 1px transparent"
        >
          <Icon
            display={{ base: 'none', lg: 'block' }}
            position="absolute"
            right={0}
            top={0}
            bottom={0}
            h="full"
            w={48}
            color={bg}
            transform="translateX(50%)"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </Icon>
          <Box
            mx="auto"
            maxW={{ base: '7xl' }}
            px={{ base: 4, sm: 6, lg: 8 }}
            mt={{ base: 10, sm: 12, md: 16, lg: 20, xl: 28 }}
          >
            <Box
              w="full"
              textAlign={{ sm: 'center', lg: 'left' }}
              justifyContent="center"
              alignItems="center"
            >
              <chakra.h1
                fontSize={{ base: '5xl', sm: '5xl', md: '6xl' }}
                letterSpacing="tight"
                lineHeight="short"
                fontWeight="extrabold"
                color={useColorModeValue('gray.900', 'white')}
              >
                <chakra.span display={{ base: 'block', xl: 'inline' }}>
                  We've Set The Stage <br />
                </chakra.span>
                <Heading as='h1'
                  display={{ base: 'block', xl: 'inline' }}
                  color={'brand.600'}
                  fontSize={{base: '4xl', sm: '4xl', md: '5xl'}}
                >
                  For You...
                </Heading>
              </chakra.h1>
              <chakra.p
                mt={{ base: 3, sm: 5, md: 5 }}
                fontSize={{ sm: 'lg', md: 'xl' }}
                maxW={{ sm: 'xl' }}
                mx={{ sm: 'auto', lg: 0 }}
                color="gray.400"
              >
                We take the very best creators and brands to create valuable
                commercial NFTs that both earn royalties and fans will love.
              </chakra.p>
              <Box
                mt={{ base: 5, sm: 8 }}
                display={{ sm: 'flex' }}
                justifyContent={{ sm: 'center', lg: 'start' }}
                fontWeight="extrabold"
              >
                <Box mt={[3, 0]} ml={[null, 3]}>
                  <chakra.a
                    w="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    px={{ base: 8, md: 10 }}
                    py={{ base: 3, md: 4 }}
                    border="solid 1px transparent"
                    fontSize={{ base: 'md', md: 'lg' }}
                    rounded="md"
                    color={'white'}
                    bg="brand.600"
                    _hover={{ bg: 'red.800' }}
                  >
                    Get Started
                  </chakra.a>
                </Box>
                <Box mt={[3, 0]} ml={[null, 3]}>
                  <chakra.a
                    w="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    px={{ base: 8, md: 10 }}
                    py={{ base: 3, md: 4 }}
                    border="solid 1px transparent"
                    fontSize={{ base: 'md', md: 'lg' }}
                    rounded="md"
                    color={'white'}
                    bg="brand.600"
                    _hover={{ bg: 'red.800' }}
                    href="https://app.clarity.so/g2sbase/pages/adf6ba33-a3cf-411e-a89e-2b464b0c46b8"
                  >
                    Learn More
                  </chakra.a>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        position={{ lg: 'absolute' }}
        top={{ lg: 0 }}
        bottom={{ lg: 0 }}
        right={{ lg: 0 }}
        w={{ lg: '50%' }}
      >
        <Hero />
      </Box>
    </Box>
  )
}

export default BrandHero
