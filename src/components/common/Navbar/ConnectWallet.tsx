import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import React from 'react'
import { walletconnect, arkaneConnect } from '../../../utils/connectors'
import Image from 'next/image'

function ConnectWallet(): JSX.Element {
  const { activate, activateBrowserWallet } = useEthers()

  const { onOpen, isOpen, onClose } = useDisclosure()

  return (
    <>
      <Box
        order={[null, null, null, null]}
        textAlign={[null, null, null, null]}
      >
        <Button colorScheme="brand" variant="outline" onClick={onOpen}>
          Connect to a wallet
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} colorScheme="blue">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="gray.700">Connect to a wallet</ModalHeader>
          <ModalCloseButton color="gray.700" />
          <ModalBody>
            <Button
              justifyContent="space-between"
              width="100%"
              mb="4"
              size="lg"
              colorScheme="pink"
              variant="solid"
              rightIcon={
                <Image
                  height={20}
                  width={20}
                  src="/images/logo-metamask.png"
                  alt="MetaMask"
                />
              }
              onClick={() => {
                activateBrowserWallet()
              }}
            >
              MetaMask
            </Button>
            <Button
              justifyContent="space-between"
              width="100%"
              mb="4"
              size="lg"
              colorScheme= "pink"
              variant="solid"
              rightIcon={
                <Image
                  height={20}
                  width={20}
                  src="/images/logo-walletconnect.svg"
                  alt="WalletConnect"
                />
              }
              onClick={() => {
                activate(walletconnect)
              }}
            >
              WalletConnect
            </Button>
            <Button
              justifyContent="space-between"
              width="100%"
              mb="4"
              size="lg"
              colorScheme= "pink"
              variant="solid"
              rightIcon={
                <Image
                  height={20}
                  width={20}
                  src="/images/logo-walletconnect.svg"
                  alt="WalletConnect"
                />
              }
              onClick={() => {
                arkaneConnect
              }}
            >
              Arkane
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ConnectWallet
