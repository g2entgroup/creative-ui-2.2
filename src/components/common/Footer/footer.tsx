import React from "react";
import {
  Grid,
  Flex,
  Box,
  Heading,
  Text,
  Input,
} from "@chakra-ui/react";
import { AiOutlineMail } from "react-icons/ai";
import { FiTwitter, FiInstagram } from "react-icons/fi";
import { SiDiscord } from "react-icons/si";
import Image from "next/image";

const myLoader = ({ src, width, quality }) => {
  return `https://www.creativeplatform.io/${src}?w=${width}&q=${quality || 75}`
}

const Footer = (props) => {
  return (
    <Box mx="4rem" bgColor="#161d2f">
      {/* logo  */}
      <Box textAlign="center" mb="3rem">
        <Image
          loader={myLoader}
          src="/img/Creative_logo.png"
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
            <a href="https://community.xyz/#YN7VDKn_JjziC4tTL92K9pO_iMcnMSjk6kgSBr1EPjI" target="_blank">Creative Organization</a>
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
                <a href="https://discord.gg/8B4p7ztWTp">Creative</a>
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
                <a href="mailto:creatives@creativeplatform.io">
                  creatives@creativeplatform.io
                </a>
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
              <a href="https://www.twitter.com/creativecrtv" target="_blank">
                <FiTwitter />
              </a>
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
              <a href="https://www.instagram.com/creativecrtv" target="_blank">
                <FiInstagram />
              </a>
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
            <a href="https://community.xyz/#YN7VDKn_JjziC4tTL92K9pO_iMcnMSjk6kgSBr1EPjI">
            Creative Organization, LLC
            </a>
          </Box>
          . All Rights Reserved.
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
