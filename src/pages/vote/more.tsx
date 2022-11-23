import React from "react";
import {
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { Voting } from "../../components/voting";
import PoapPlugin from "../../components/poap-plugin"
import { useAuth } from "../../services/context/auth";

export default function More() {
  const router = useRouter()
  const { isLoggedIn, account } = useAuth()

  const {
    end,
    start,
    title,
    body,
    choices,
    snapshot,
    creator,
    score,
    scores,
    identifier,
  } = router.query

  const convertDate = (date: any) => {
    date = new Date(date * 1000);
    return date.toUTCString();
  }

  const goTo = (id) => {
    let url = `https://polygonscan.com/block/${id}`
    window.open(url, '_blank');
  }


  return (
    <Box
      display='flex'
      flexDirection='row'
      flexWrap={'wrap'}
      alignItems='flex-start'
      justifyContent='center'>
      <Box
        maxW={['100vw', '100vw', '100vw', '40vw']}>
          <Box
            padding={5}>
            <Box>
            </Box>
          <Box>
            <Heading>{title}</Heading>
          </Box>
        </Box>
          <Box
            padding={5}>
          <Box>
            <Text>{body}</Text>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box
          padding={5}
          marginBottom={5}
          minW={['100vw', '100vw', '100vw', '400px']}
          cursor='pointer'>
          <Box
            background='brand.400'
            padding={2}
            display='flex'
            borderTopLeftRadius={10}
            borderTopRightRadius={10}
            flexDirection='row'
          >
            <Heading
              size={'md'}
              color="white">Details</Heading>
          </Box>
          <Box
            border={'2px solid #ec407a'}
            borderBottomRadius={10}
            padding={10}>
            <Box
              padding={2}>
              <Text>{`Creator:  ${creator}`}</Text>
              <Text onClick={() => goTo(snapshot)}>{`Snapshot:  ${snapshot}`}</Text>
        </Box>
        <Box
              background={'black'}
            padding={2}
              borderRadius={10}>
              <Box  
                display='flex'
                flexDirection='row'>
                <Text
                  color='white'>{`start date: ${convertDate(start)}`}</Text>
          </Box>
          <Box
                display='flex'
                flexDirection='row'>
                <Text
                  color='white'>{`end date: ${convertDate(end)}`}</Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          padding={5}
          marginBottom={5}
          cursor='pointer'
          minW={['100vw', '100vw', '100vw', '20px']}>
          <Box
            background='brand.400'
            padding={2}
            display='flex'
            borderTopLeftRadius={10}
            borderTopRightRadius={10}
            flexDirection='row'>
            <Heading
              size={'md'}
              color="white">I voted POAP</Heading>
          </Box>
          <Box
            border={'2px solid #ec407a'}
            borderBottomRadius={10}
            padding={10}
          >
            <Voting
              choices={choices}
              score={score}
              scores={scores} />
          </Box>
        </Box>
        {isLoggedIn && (
          <Box
            padding={5}
            marginBottom={5}
            cursor='pointer'
            minW={['100vw', '100vw', '100vw', '20px']}>
            <Box
              background='brand.400'
              padding={2}
              display='flex'
              borderTopLeftRadius={10}
              borderTopRightRadius={10}
              flexDirection='row'>
              <Heading
                size={'md'}
                color="white">Current results</Heading>
            </Box>
            <Box
              border={'2px solid #ec407a'}
              borderBottomRadius={10}
              padding={10}
            >
              <PoapPlugin
                address={account}
                proposalId={identifier as string}
                snapshot={snapshot as string}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}
