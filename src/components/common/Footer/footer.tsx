import React from "react";
import {
  Grid,
  Flex,
  Box,
  Heading,
  Text,
  Input,
  Link
} from "@chakra-ui/react";
import { AiOutlineMail } from "react-icons/ai";
import { FiTwitter, FiInstagram } from "react-icons/fi";
import { SiDiscord } from "react-icons/si";
import Image from "next/image";

const myLoader = ({ src, width, quality }) => {
  return `https://res.cloudinary.com/${src}?w=${width}&q=${quality || 75}`
}

const Footer = () => {
  return (
    <Box mx="4rem" bgColor="#161d2f">
      {/* logo  */}
      <Box textAlign="center" mb="3rem">
        <Image
          loader={myLoader}
          src="dyangxc7h/image/upload/v1623552244/creative/Creative_logo.png"
          alt="Creative logo"
          width={90}
          height={80}
        />
        <Heading fontSize="2rem">CREATIVE</Heading>
      </Box>
      {/* 4 sliders  */}
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap={4}
        justifyItems="center"
        justifyContent="center"
      >
        <Box w="90%">
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
          <Text is="custom">
          A creative blockchain platform for independent creators, fans, and brands to exchange services directly and earn incentives through DeFi.
          </Text>
        </Box>
        <Box w="90%">
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
          <Text >
            Have a seat at the table and join our governance DAO, where our creative community helps decide the future of the Creative platform.
          </Text>
          <Box
            as="button"
            bgColor="#e50168"
            textAlign="center"
            w="12rem"
            p="0.5rem"
            borderRadius="2rem"
            mt="1rem"
            cursor="pointer"
          >
            <Link href="https://app.daohaus.club/dao/0x89/0xc48996a569911fd6eba1b97b6419731eed32041e/" isExternal target="_blank">Creative Organization</Link>
          </Box>
        </Box>
        <Box w="90%">
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
          <Text>
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
            bgColor="#e50168"
            textAlign="center"
            w="9rem"
            p="0.5rem"
            borderRadius="2rem"
            mt="1rem"
          >
            Sign Me Up
          </Box>
        </Box>
        <Box w="100%">
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
          <Flex alignItems="center">
            <Box
              mr="1rem"
              bgGradient="linear(to-b, #2b5fa8, #e6006b)"
              px="0.6rem"
              py="0.5rem"
              borderRadius="0.4rem"
            >
              <SiDiscord />
            </Box>
            <Box>
              <Box>Discord with us:</Box>
              <Box>
                <Link href="https://discord.gg/8B4p7ztWTp" isExternal>Creative</Link>
              </Box>
            </Box>
          </Flex>
          {/* email  */}
          <Flex mt="1rem" alignItems="center">
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
            <Box>
              <Box>Email us:</Box>
              <Box>
                <Link href="mailto:creatives@creativeplatform.io">
                  creatives@creativeplatform.io
                </Link>
                </Box>
            </Box>
          </Flex>

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
            <Box>Follow us:</Box>
            {/* <Box
              mx="1rem"
              w="1.8rem"
              bgGradient="linear(to-b, #2b5fa8, #e6006b)"
              px="0.4rem"
              py="0.25rem"
              borderRadius="0.4rem"
              cursor="pointer"
            >
              <FiFacebook />
            </Box>
            <Box
              mr="1rem"
              w="1.8rem"
              bgGradient="linear(to-b, #2b5fa8, #e6006b)"
              px="0.4rem"
              py="0.25rem"
              borderRadius="0.4rem"
              cursor="pointer"
            >
              <FiLinkedin />
            </Box> */}

            <Box
              mx="1rem"
              w="1.8rem"
              bgGradient="linear(to-b, #2b5fa8, #e6006b)"
              px="0.4rem"
              py="0.25rem"
              borderRadius="0.4rem"
              cursor="pointer"
            >
              <Link href="https://www.twitter.com/creativecrtv" isExternal target="_blank">
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
            >
              <Link href="https://www.instagram.com/creativecrtv" isExternal target="_blank">
                <FiInstagram />
              </Link>
            </Box>
          </Flex>
        </Box>
      </Grid>

      {/* copmpany  */}

      <Box m="2rem" mb="1rem">
        {/* line  */}
        <Box
          m="1rem auto"
          h="2px"
          w="300px"
          background="linear-gradient(to right, rgba(22, 29, 47, 0),#e50168,rgba(22,29,47,0));"
        />
        {/* Copyright */}
        <Box textAlign="center">
          Copyright © 2021{" "}
          <Box as="text" color="#e50168">
            <Link href="https://app.daohaus.club/dao/0x89/0xc48996a569911fd6eba1b97b6419731eed32041e/">
            Creative Organization, LLC
            </Link>
          </Box>
          . All Rights Reserved.
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
