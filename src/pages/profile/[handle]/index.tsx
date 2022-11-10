import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import {
  Box,
  Heading,
  Text,
  Button,
  Image,
  SimpleGrid,
  chakra,
} from '@chakra-ui/react'
import CreativeCard from '../../../components/common/Cards/CreativeCard'
import { useEthers } from '@usedapp/core'
import { FaStar } from 'react-icons/fa'

import { ProfileHeader } from '../../../components/profile/ProfileHeader'
import { ProfileFragment } from '../../../services/apollo/lens-graphql/ProfileFragment'
import { CustomTooltip } from 'src/components/common/CustomTooltip'

const GET_PROFILES = gql`
  query ($request: ProfileQueryRequest!) {
    profiles(request: $request) {
      items {
        ...ProfileFragment
      }
    }
  }
  ${ProfileFragment}
`

const ProfilePage: NextPage = () => {
  const router = useRouter()
  const { handle } = router.query
  const { account } = useEthers()

  const [balance, setBalance] = React.useState(10000)
  const [brandData] = React.useState([
    // {
    //   id: 1,
    //   image: "https://bit.ly/dan-abramov",
    //   brand: "TESLA Brand Campaign",
    //   prize: 500,
    //   active: true,
    //   stage: "Voting Stage",
    //   claim: false,
    // },
    // {
    //   id: 2,
    //   image: "https://bit.ly/dan-abramov",
    //   brand: "TESLA Brand Campaign",
    //   prize: 500,
    //   active: true,
    //   stage: "Decision Stage",
    //   claim: false,
    // },
    // {
    //   id: 3,
    //   image: "https://bit.ly/dan-abramov",
    //   brand: "TESLA Brand Campaign",
    //   prize: 500,
    //   active: true,
    //   stage: "Submission Stage",
    //   claim: false,
    // },
    // {
    //   id: 4,
    //   image: "https://bit.ly/dan-abramov",
    //   brand: "Coca-Cola Brand Campaign",
    //   prize: 500,
    //   active: false,
    //   stage: "Ended",
    //   claim: false,
    // },
    // {
    //   id: 5,
    //   image: "https://bit.ly/dan-abramov",
    //   brand: "TESLA Brand Campaign",
    //   prize: 500,
    //   active: true,
    //   stage: "Voting Stage",
    //   claim: false,
    // },
    // {
    //   id: 6,
    //   image: "https://bit.ly/dan-abramov",
    //   brand: "TESLA Brand Campaign",
    //   prize: 500,
    //   active: false,
    //   stage: "Ended",
    //   claim: false,
    // },
  ])
  const [bio] = React.useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu convallis sapien. Etiam aliquet semper justo nec posuere. Aliquam molestie efficitur quam quis bibendum. Aliquam sodales nisi consequat metus egestas eleifend. Morbi tincidunt ex a volutpat congue.'
  )

  // Lens Profile Query

  const {
    data: profileData,
    loading,
    error,
    refetch,
  } = useQuery(GET_PROFILES, {
    variables: {
      request: { handles: [handle] },
    },
  })

  if (loading) return <p>loading...</p>
  if (error) return <p>Error :(</p>
  // console.log(profileData);

  if (!profileData.profiles.items[0])
    return (
      <Box
        margin={'auto'}
        maxW={['100%', '100%', '100%', '60%']}
        display="flex"
        overflowX="hidden"
        justifyContent={['center', 'center', 'center', 'space-evenly']}
        flexDir={['column', 'column', 'column', 'row']}
      >
        <chakra.h2 color="black" fontSize="3xl" fontWeight="bold">
          No user with this handle
        </chakra.h2>
      </Box>
    )

  return (
    <Box>
      <ProfileHeader
        profile={profileData.profiles.items[0]}
        balance={balance}
        refetch={refetch}
      />

      <Box
        margin={'auto'}
        marginBottom={100}
        maxW={['100%', '100%', '100%', '60%']}
        display="flex"
        padding={5}
        overflowX="hidden"
        justifyContent={['center', 'center', 'center', 'space-evenly']}
        flexDir={['column', 'column', 'column', 'row']}
      >
        <Box
          display="flex"
          flexDir={'column'}
          marginTop={30}
          marginRight={[0, 0, 0, 20]}
          marginBottom={[10, 10, 10, 0]}
          alignItems="center"
          maxW={['100%', '100%', '100%', '20%']}
          cursor={'pointer'}
        ></Box>
        <Box maxW={['100%', '100%', '100%', '80%']}>
          <Box
            margin="auto"
            display="flex"
            justifyContent="space-between"
            flexDir={['column', 'column', 'row', 'row']}
            marginBottom={20}
            cursor={'pointer'}
          ></Box>

          <Box
            margin="auto"
            display="flex"
            justifyContent="space-between"
            flexDir={['column', 'column', 'column', 'column']}
            marginBottom={20}
            cursor={'pointer'}
          >
            <Box marginBottom={5}>
              <Heading>
                <CustomTooltip label="lorem ipsum">Star Power!</CustomTooltip>
              </Heading>
            </Box>
            <Box display="flex" alignItems="center" marginBottom={5}>
              <FaStar fontSize={35} color="yellow" />
              <Heading marginLeft={5} color="#e50168">
                600
              </Heading>
            </Box>
            <Box>
              <Button background="#e50168">unlock NFT</Button>
            </Box>
          </Box>

          <Box
            margin="auto"
            display="flex"
            justifyContent="space-between"
            flexDir={['column', 'column', 'column', 'column']}
            marginBottom={20}
            cursor={'pointer'}
          >
            <Box marginBottom={5}>
              <Heading>
                <CustomTooltip label="lorem ipsum">Listed NFTs</CustomTooltip>
              </Heading>
            </Box>
            <Box
              display="flex"
              flexDir="row"
              maxW={['100%', '100%', '100%', '100%']}
              cursor={'pointer'}
            >
              {/* <Box display="flex" flexDir="row" overflowX="scroll">
              <CreativeCard />
              <CreativeCard />
              <CreativeCard />
              <CreativeCard />
            </Box> */}
            </Box>
          </Box>

          <Box
            margin="auto"
            display="flex"
            justifyContent="space-between"
            flexDir={['column', 'column', 'column', 'column']}
            marginBottom={20}
            cursor={'pointer'}
          >
            <Box marginBottom={5}>
              <Heading>
                <CustomTooltip label="lorem ipsum">
                  Submitted Campaign Details
                </CustomTooltip>
              </Heading>
            </Box>
            <SimpleGrid marginBottom={5} columns={[4, 4, 4, 6]}>
              <Box maxW="10%" h="10" />
              <Box h="10">
                <Heading as="h4" size="md">
                  Brand
                </Heading>
              </Box>
              <Box h="10" display={['none', 'none', 'none', 'flex']}>
                <Heading as="h4" size="md">
                  Prize
                </Heading>
              </Box>
              <Box h="10" display={['none', 'none', 'none', 'flex']}>
                <Heading as="h4" size="md">
                  Status
                </Heading>
              </Box>
              <Box h="10">
                <Heading as="h4" size="md">
                  Stage
                </Heading>
              </Box>
              <Box h="10">
                <Heading as="h4" size="md">
                  Claim
                </Heading>
              </Box>
            </SimpleGrid>
            <Box background="gray" width="100%">
              {brandData.map((data) => {
                return (
                  <SimpleGrid key={data.id} columns={[4, 4, 4, 6]} padding={2}>
                    <Box
                      h="10"
                      display={'flex'}
                      alignItems="center"
                      justifyContent={'center'}
                    >
                      <Image
                        boxSize="30px"
                        src={data.image}
                        alt="Dan Abramov"
                      />
                    </Box>
                    <Box
                      h="10"
                      display={'flex'}
                      alignItems="center"
                      justifyContent={'flex-start'}
                    >
                      <Text color="black" fontSize="sm">
                        {data.brand}
                      </Text>
                    </Box>
                    <Box
                      h="10"
                      display={['none', 'none', 'none', 'flex']}
                      alignItems="center"
                      justifyContent={'flex-start'}
                    >
                      <Text color="black" fontSize="sm">
                        {data.prize} USDC reward
                      </Text>
                    </Box>
                    <Box
                      h="10"
                      display={'flex'}
                      alignItems="center"
                      justifyContent={'flex-start'}
                    >
                      <Box
                        background={data.active ? 'green' : 'red'}
                        minWidth={5}
                        minHeight={5}
                        maxWidth={5}
                        maxHeight={5}
                        borderWidth={2}
                        marginRight={2}
                        borderRadius={'50%'}
                      />
                      <Text color="black" fontSize="sm">
                        {data.active ? 'Active' : 'Inactive'}
                      </Text>
                    </Box>
                    <Box
                      h="10"
                      display={['none', 'none', 'none', 'flex']}
                      alignItems="center"
                      justifyContent={'flex-start'}
                    >
                      <Text color="black" fontSize="sm">
                        {data.stage}
                      </Text>
                    </Box>
                    <Box
                      h="10"
                      display={'flex'}
                      alignItems="center"
                      justifyContent={'flex-start'}
                    >
                      {data.active ? null : (
                        <Button background="#e50168">POAP</Button>
                      )}
                    </Box>
                  </SimpleGrid>
                )
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage
