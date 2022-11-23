import React, { useEffect, useState } from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
import {
  API_BASE_URL,
  APP_BASE_URL,
  CLAIMED,
  LOADING,
  NO_POAP,
  STATES,
  UNCLAIMED,
} from './constants'

const PoapPlugin = (props: {
  address: string
  proposalId: string
  snapshot: string
}) => {
  const [poapImg, setPoapImg] = useState('')
  const [currentState, setCurrentState] = useState(NO_POAP)
  const [loadButton, setLoadButton] = useState(false)

  useEffect(() => {
    (async () => {
      const { image_url, currentState } = await getCurrentState(
        props.snapshot,
        props.address
      )
      image_url && setPoapImg(image_url)
      setCurrentState(currentState)
    })()
  }, [])

  const action = async () => {
    switch (currentState) {
      case CLAIMED:
        openScanPage(props.address)
        break
      case UNCLAIMED:
        setLoadButton(true)
        setCurrentState(await claim(props.proposalId, props.address))
        setLoadButton(false)
        break
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <img src={STATES[currentState].headerImage} alt="" />
      <Text marginBottom={2} fontWeight="semibold">
        {STATES[currentState].header}
      </Text>
      <div>
        <img
          src={poapImg ? poapImg : STATES[currentState].mainImage}
          alt=""
          style={{
            verticalAlign: 'middle',
            width: 'auto',
            height: 'auto',
            maxWidth: 125,
          }}
        />
        {currentState !== NO_POAP && (
          <Button
            isLoading={currentState === LOADING || loadButton}
            onClick={action}
          >
            {STATES[currentState].buttonText}
          </Button>
        )}
      </div>
    </Box>
  )
}

export default PoapPlugin

function openScanPage(address) {
  window.open(`${APP_BASE_URL}/scan/${address}`, '_blank')
}

async function getCurrentState(snapshot, address) {
  // Fetch the event
  const eventResponse = await fetch(
    `${API_BASE_URL}/snapshot/proposal/${snapshot}`
  )
  // If the fetch fails: the event doesn't exists for this poap yet
  if (!eventResponse.ok) {
    return { image_url: '', currentState: 'NO_POAP' }
  }
  // Get the image from the event
  const { image_url } = await eventResponse.json()

  // Check that the address is not empty
  if (!address) {
    return { image_url, currentState: 'NOT_VOTED' }
  }

  // Fetch the vote
  // const votes = await getProposalVotes(snapshot, { voter: address })
  const votes = []
  const voted = votes.length > 0
  if (!voted) {
    // Address did not vote proposal
    return { image_url, currentState: 'NOT_VOTED' }
  }

  // Fetch the claim info for the address
  const addressResponse = await fetch(
    `${API_BASE_URL}/snapshot/proposal/${snapshot}/${address}`
  )

  // If the fetch failed return the NOT_VOTED state
  if (!addressResponse.ok) {
    return { image_url, currentState: 'NOT_VOTED' }
  }
  const { claimed, status } = await addressResponse.json()

  if (claimed) {
    // If the address claimed the token but the status is not passed
    // it means that the token is being minted
    if (claimed && status !== 'passed') {
      return { image_url, currentState: 'LOADING' }
    }
    // If the status is passed: the token was claimed
    return { image_url, currentState: 'CLAIMED' }
  } else if (voted) {
    // The token is not claimed but the address voted
    return { image_url, currentState: 'UNCLAIMED' }
  }

  return { image_url, currentState: 'NOT_VOTED' }
}

async function claim(snapshot, address) {
  const body = {
    snapshotProposalHash: snapshot,
    address: address,
  }
  const response = await fetch(`${API_BASE_URL}/claim/snapshot-proposal`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    // If the response is not ok: return the UNCLAIMED state
    console.log(response.json())
    return 'UNCLAIMED'
  }
  return 'LOADING'
}
