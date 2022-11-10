import React from 'react'
import {
  Grid,
  Flex,
  Box,
  Heading,
  Text,
  Input,
  Link,
  useColorModeValue,
  chakra,
} from '@chakra-ui/react'
import { AiOutlineMail } from 'react-icons/ai'
import { FiTwitter, FiInstagram } from 'react-icons/fi'
import { SiDiscord } from 'react-icons/si'
import Image from 'next/image'

const myLoader = ({ src, width }) => {
  return `https://res.cloudinary.com/${src}?w=${width}&q=${75}`
}

const Footer = () => {
  return (
    <Box
      paddingBottom={10}
      flexDir={['column', 'column', 'column', 'row']} 
      bgColor="#161d2f">
      {/* logo  */}
      <Box textAlign="center" mb="3rem" padding={10}>
        <Image
          loader={myLoader}
          src="dyangxc7h/image/upload/v1623552244/creative/Creative_logo.png"
          alt="Creative logo"
          width={90}
          height={80}
        />
        <Heading fontSize="2rem" color={'white'}>
          CREATIVE
        </Heading>
      </Box>
      {/* 4 sliders  */}
      <Box
        width="100%"
        display="flex"
        flexDir={['column', 'column', 'row', 'row']}
        flexWrap={['nowrap', 'nowrap', 'wrap', 'wrap']}
      >
        <Box maxWidth={['100%', '50%', '50%', '25%']} padding={5}>
          <Box as="h3" fontWeight="500" fontSize="xl" color="#e50168">
            Creative Platform
          </Box>
          <Box
            mt="0.3rem"
            mb="1rem"
            h="1.5px"
            w="50px"
            background="linear-gradient(to right, rgba(22, 29, 47, 0),#e50168,rgba(22,29,47,0));"
          />
          <Text color={'white'}>
            A creative blockchain platform for independent creators, fans, and
            brands to exchange services directly and earn incentives through
            DeFi.
          </Text>
        </Box>
        <Box maxWidth={['100%', '550%', '50%', '25%']} padding={5}>
          <Box as="h3" fontWeight="500" fontSize="xl" color="#e50168">
            Join Our Community DAO
          </Box>
          <Box
            mt="0.3rem"
            mb="1rem"
            h="1.5px"
            w="50px"
            background="linear-gradient(to right, rgba(22, 29, 47, 0),#e50168,rgba(22,29,47,0));"
          />
          <Text textOverflow={'wrap'} color={'white'}>
            Have a seat at the table and join our governance DAO, where our
            creative community helps decide the future of the Creative platform.
          </Text>
          <Link
            w="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            px={{ base: 8, md: 10 }}
            py={{ base: 3, md: 4 }}
            my={4}
            border="solid 1px transparent"
            fontSize={{ base: 'md', md: 'lg' }}
            rounded="md"
            color={'white'}
            bg="brand.400"
            _hover={{ bg: 'pink.800' }}
            href="https://app.daohaus.club/dao/0x89/0xc48996a569911fd6eba1b97b6419731eed32041e"
          >
            Creative Organization DAO
          </Link>
        </Box>
        <Box width={['100%', '50%', '50%', '25%']} padding={5}>
          <Box as="h3" fontWeight="500" fontSize="xl" color="#e50168">
            Subscribe
          </Box>
          <Box
            mt="0.3rem"
            mb="1rem"
            h="1.5px"
            w="50px"
            background="linear-gradient(to right, rgba(22, 29, 47, 0),#e50168,rgba(22,29,47,0));"
          />
          <Text color={'white'}>
            Subscribe to our newsletter and get latest updates and offers.
          </Text>

          {/* Input */}
          <Input
            focusBorderColor="#e50168"
            placeholder="Enter Your Name"
            mt="1rem"
          />
          <Input
            focusBorderColor="#e50168"
            placeholder="Enter Your Email"
            mt="1rem"
          />
          <Box
            as="button"
            bgColor="brand.400"
            textAlign="center"
            w="9rem"
            p="0.5rem"
            borderRadius="2rem"
            mt="1rem"
          >
            Sign Me Up
          </Box>
        </Box>
        <Box width={['100%', '50%', '50%', '25%']} padding={4}>
          <Box as="h3" fontWeight="500" fontSize="xl" color="#e50168">
            Contact Us
          </Box>
          <Box
            mt="0.3rem"
            mb="1rem"
            h="1.5px"
            w="50px"
            background="linear-gradient(to right, rgba(22, 29, 47, 0),#e50168,rgba(22,29,47,0));"
          />
          {/* phone  */}
          <Box display="flex" flexDir="row" flexWrap="wrap" alignItems="center">
            <Box
              mr="1rem"
              bgGradient="linear(to-b, #2b5fa8, #e6006b)"
              px="0.6rem"
              py="0.5rem"
              borderRadius="0.4rem"
              color="white"
            >
              <SiDiscord />
            </Box>
            <Box padding={4}>
              <Box>
                <Link
                  href="https://discord.gg/8B4p7ztWTp"
                  color={'white'}
                  isExternal
                >
                  Discord
                </Link>
              </Box>
            </Box>
          </Box>
          {/* email  */}
          <Box
            display="flex"
            flexDir="row"
            flexWrap="wrap"
            alignItems="center"
            maxWidth={'80%'}
            overflowY={'hidden'}
          >
            <Box
              mr="1rem"
              bgGradient="linear(to-b, #2b5fa8, #e6006b)"
              px="0.6rem"
              py="0.5rem"
              borderRadius="0.4rem"
              color="white"
            >
              <AiOutlineMail />
            </Box>
            <Box overflow="wrap" textOverflow={'wrap'} padding={4}>
              <Box>
                <Link
                  color={'white'}
                  textOverflow={'wrap'}
                  href="mailto:creatives@creativeplatform.xyz"
                >
                  Email Us
                </Link>
              </Box>
            </Box>
          </Box>

          {/* address  
          <Flex mt="1rem" alignItems="center">
            <Box
              mr="1rem"
              bgGradient="linear(to-b, #2b5fa8, #e6006b)"
              px="0.6rem"
              py="0.5rem"
              borderRadius="0.4rem"
            >
              <GoLocation />
            </Box>
            <Box>
              <Box>Walk in:</Box>
              <Box>598 Old House Drive, London</Box>
            </Box>
          </Flex>
          */}

          <Flex mt="1rem">
            <Box color={'white'}>Follow us:</Box>
            <Box
              mx="1rem"
              w="1.8rem"
              bgGradient="linear(to-b, #2b5fa8, #e6006b)"
              px="0.4rem"
              py="0.25rem"
              borderRadius="0.4rem"
              cursor="pointer"
              color={'white'}
            >
              <Link
                href="https://www.twitter.com/creativecrtv"
                isExternal
                target="_blank"
              >
                <FiTwitter />
              </Link>
            </Box>
            <Box
              mr="1rem"
              w="1.8rem"
              bgGradient="linear(to-b, #2b5fa8, #e6006b)"
              px="0.4rem"
              py="0.25rem"
              borderRadius="0.4rem"
              cursor="pointer"
              color={'white'}
            >
              <Link
                href="https://www.instagram.com/creativecrtv"
                isExternal
                target="_blank"
              >
                <FiInstagram />
              </Link>
            </Box>
          </Flex>
        </Box>
      </Box>

      {/* copmpany  */}

      <Box m="2rem" mb="1rem">
        {/* line  */}
        <Box
          m="1rem auto"
          h="2px"
          maxW="300px"
          background="linear-gradient(to right, rgba(22, 29, 47, 0),#e50168,rgba(22,29,47,0));"
        />
        {/* Copyright */}
        <Box w="100%" textAlign="center">
          <Text color={'white'}>
            Copyright © 2021{' '}
            <Link
              color={'white'}
              href="https://app.daohaus.club/dao/0x89/0xc48996a569911fd6eba1b97b6419731eed32041e/"
              isExternal
            >
              Creative Organization DAO, LLC
            </Link>
            . All Rights Reserved.
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
