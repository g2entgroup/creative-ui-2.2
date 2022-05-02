import React from "react";
import { Box, Heading, Text, Button, Image } from "@chakra-ui/react";
import CreativeCard from '../components/common/Cards/CreativeCard';
import { useEthers, shortenAddress, useLookupAddress, } from '@usedapp/core';
import Icon from "@chakra-ui/icon";
import { FaTwitter, FaInstagram } from 'react-icons/fa';
import {  } from '@chakra-ui/react'

const Profile = () => {
  const ens = useLookupAddress();
  const { account } = useEthers();
  const [twitter, setTwitter] = React.useState('@SopieCat');
  const [instagram, setInstagram] = React.useState('@SopieCat');
  const [balance, setBalance] = React.useState(10000);
  const [brandData] = React.useState(
    [
      {
        image:'https://bit.ly/dan-abramov', brand: 'TESLA Brand Campaign', prize: 500, active: true, stage: 'Voting Stage', claim: false
      },
      {
        image:'https://bit.ly/dan-abramov', brand: 'TESLA Brand Campaign', prize: 500, active: true, stage: 'Decision Stage',  claim: false
      },
      {
        image:'https://bit.ly/dan-abramov', brand: 'TESLA Brand Campaign', prize: 500, active: true, stage: 'Submission Stage',  claim: false
      },
      {
        image:'https://bit.ly/dan-abramov', brand: 'Coca-Cola Brand Campaign', prize: 500, active: false, stage: 'Ended',  claim: false
      },
      {
        image:'https://bit.ly/dan-abramov', brand: 'TESLA Brand Campaign', prize: 500, active: true, stage: 'Voting Stage',  claim: false
      },
      {
        image:'https://bit.ly/dan-abramov', brand: 'TESLA Brand Campaign', prize: 500, active: false, stage: 'Ended',  claim: false
      },
    ]
  );
  const [bio] = React.useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu convallis sapien. Etiam aliquet semper justo nec posuere. Aliquam molestie efficitur quam quis bibendum. Aliquam sodales nisi consequat metus egestas eleifend. Morbi tincidunt ex a volutpat congue.')
  const StarIcon = ({ color }) => <Icon name="star" color={color} /> 

  return(
    <Box
      margin={'auto'}
      marginBottom={100}
      maxW={['100%', '100%', '100%', '60%']}
      display='flex'
      padding={5}
      overflowX='hidden'
      justifyContent={['center', 'center', 'center', 'space-evenly']}
      flexDir={['column','column','column','row']}>  
      <Box
        display='flex'
        flexDir={'column'}
        marginTop={30}
        marginRight={[0, 0, 0, 20]}
        marginBottom={[10, 10, 10, 0]}
        alignItems='center'
        maxW={['100%', '100%', '100%', '20%']}
        cursor={'pointer'}>
        <Image
          borderRadius='full'
          boxSize='80px' 
          src='https://bit.ly/dan-abramov'
                alt='Dan Abramov'
                marginBottom={[10,10,10,5]}
              />
        <Button
          background='#e50168'>
          + Follow
        </Button>
      </Box>
      <Box
        maxW={['100%', '100%', '100%', '80%']}>
        <Box
          margin='auto'
          display='flex'
          justifyContent='space-between'
          flexDir={['column','column','row','row']}
          marginBottom={20}
          cursor={'pointer'}>
          <Box
            display='flex'
            justifyContent='space-between'
            flexDir={['column','column','row','row']}
            >
            <Box
              marginBottom={[10,10,0,0]}>
              <Box
                display='flex'
                justifyContent={'center'}
                marginBottom={5}>
                <Heading>wallet address</Heading>
              </Box>
              <Box  
                display='flex'
                alignContent={'center'}>
                <FaTwitter />
                <Text
                  marginLeft={2}>
                  {twitter}
                </Text>
              </Box>
              <Box
                display='flex'
                alignContent={'center'}>
                <FaInstagram />
                <Text
                  marginLeft={2}>
                  {instagram}
                </Text>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box
              marginBottom={5}>
              <Heading>Total Winnings</Heading>
            </Box>
            <Box>
              <Heading
                color='red'>{balance} USDC</Heading>
            </Box>
          </Box>
        </Box>

        <Box
          margin='auto'
          display='flex'
          justifyContent='space-between'
          flexDir={['column','column','row','row']}
          marginBottom={20}
          cursor={'pointer'}>
            <Text>
              BIO: {bio}
            </Text>
        </Box>

        <Box
          margin='auto'
          display='flex'
          justifyContent='space-between'
          flexDir={['column','column','column','column']}
          marginBottom={20}
          cursor={'pointer'}>
            <Box
              marginBottom={5}>
              <Heading>
                Star Power
              </Heading>
            </Box>
            <Box
              display='flex'
              alignItems='center'
              marginBottom={5}>
              <StarIcon
                color="yellow"
              />
              <Heading
                marginLeft={5}
                color='#e50168'>
                600
              </Heading>
            </Box>
            <Box>
              <Button
                background='#e50168'>
                  unlock NFT
              </Button>
            </Box>
        </Box>

        <Box
          margin='auto'
          display='flex'
          justifyContent='space-between'
          flexDir={['column','column','column','column']}
          marginBottom={20}
          cursor={'pointer'}>
            <Box
              marginBottom={5}>
              <Heading>
                Listed NFTs
              </Heading>
            </Box>
            <Box
              display='flex'
              flexDir='row'
              maxW={['100%', '100%', '100%', '100%']}
              cursor={'pointer'}>
                <Box 
                  display='flex'
                  flexDir='row'
                  overflowX='scroll'>
                  <CreativeCard />
                  <CreativeCard />
                  <CreativeCard />
                  <CreativeCard />
                </Box>
            </Box>
        </Box>

        <Box
          margin='auto'
          display='flex'
          justifyContent='space-between'
          flexDir={['column','column','column','column']}
          marginBottom={20}
          cursor={'pointer'}>
          <Box
            marginBottom={5}>
            <Heading>
              Submitted Campaign Details
            </Heading>
          </Box>
          <Box
            marginBottom={5}
            display='flex'
            flexDir='row'
            padding={2}>
            <Box 
              maxW='10%'
              minW='10%'
              display={['none','none','none','flex']}
              h='10' />
            <Box 
              w='100%' 
              h='10'
              padding={5}>
              <Heading
                as='h4' 
                size='md'>
                Brand
              </Heading>
            </Box>
            <Box 
              w='100%' 
              h='10'
              padding={5}
              display={['none','none','none','flex']}>
              <Heading
                as='h4' 
                size='md'>
                Prize
              </Heading>
            </Box>
            <Box 
              w='100%' 
              h='10'
              padding={5}
              display={['none','none','none','flex']}>
              <Heading
                as='h4' 
                size='md'>
                Status
              </Heading>
            </Box>
            <Box 
              w='100%' 
              h='10'
              padding={5}>
              <Heading
                as='h4' 
                size='md'>
                Stage
              </Heading>
            </Box>
            <Box 
              w='100%' 
              h='10'
              padding={5}>
              <Heading
                as='h4' 
                size='md'>
                Claim
              </Heading>
            </Box>
        </Box>
        <Box
            background='gray'
            width='100%'
            display={['flex','flex','flex','flex']}
            flexDir={['column','column','column','column']}>
            {
              brandData.map((data) => {
                return(
                  <Box 
                    padding={2}
                    display='flex'
                    flexDir='row'>
                    <Box 
                      maxW='10%'
                      minW='10%'
                      h='10'
                      display={['none','none','none','flex']}
                      alignItems='center'
                      justifyContent={'center'}
                      >
                        <Image
                          boxSize='30px'
                          src={data.image}
                          alt='Dan Abramov'
                        />
                    </Box>
                    <Box 
                      h='10'
                      padding={5}
                      display={'flex'}
                      alignItems='center'
                      justifyContent={'flex-start'}>
                      <Text
                        color='black'
                        fontSize='sm'>
                        {data.brand}
                      </Text>
                    </Box>
                    <Box 
                      h='10'
                      padding={5}
                      display={['none','none','none','flex']}
                      alignItems='center'
                      justifyContent={'flex-start'}>
                      <Text
                        color='black'
                        fontSize='sm'>
                        {data.prize} USDC reward
                      </Text>
                    </Box>
                    <Box 
                      h='10'
                      display={'flex'}
                      alignItems='center'
                      padding={5}
                      justifyContent={'flex-start'}>
                      <Box
                        background={data.active ? "green": "red"} 
                        minWidth={5}
                        minHeight={5}
                        maxWidth={5}
                        maxHeight={5}
                        borderWidth={2}
                        marginRight={2}
                        borderRadius={"50%"}
                        />
                      <Text
                        color='black'
                        fontSize='sm'>
                        {data.active ? "Active": "Inactive"}
                      </Text>
                    </Box>
                    <Box 
                      h='10'
                      padding={5}
                      display={['none','none','none','flex']}
                      alignItems='center'
                      justifyContent={'flex-start'}>
                      <Text
                        color='black'
                        fontSize='sm'>
                        {data.stage}
                      </Text>
                    </Box>
                    <Box 
                      h='10'
                      padding={5}
                      display={'flex'}
                      alignItems='center'
                      justifyContent={'flex-start'}>
                      {data.active ? 
                        null
                        :
                        <Button
                          background='#e50168'>
                          POAP
                        </Button>
                      }
                    </Box>
                  </Box>
                )
              })
            }
            
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Profile;