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
} from '@chakra-ui/react';
import { useEthers } from '@usedapp/core';
import React from 'react';
import { walletconnect, arkaneConnect } from '../../../utils/connectors';
import Image from 'next/image';
import NextLink from 'next/link'
import WertWidget from '@wert-io/widget-initializer';

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const options = {
  "containerId": "wert-widget",
  "partner_id": "01FGKYK638SV618KZHAVEY7P79",
  "origin": "https://sandbox.wert.io",
  "currency": "USD, EUR",
  "autosize": true,
  "commodities": "ETH",
}

const wertWidget = new WertWidget(options);

const redirectUrl = wertWidget.getRedirectUrl();

function ConnectWallet(): JSX.Element {
  const { activate, activateBrowserWallet } = useEthers()

  const { onOpen, isOpen, onClose } = useDisclosure()

  const onError = (error: Error) => {
    console.log(error.message)
  }

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
                  loader={myLoader}
                  height={20}
                  width={20}
                  src="/images/logo-metamask.png"
                  alt="MetaMask"
                />
              }
              onClick={() => {
                activateBrowserWallet(onError)
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
                  loader={myLoader}
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
                  loader={myLoader}
                  height={20}
                  width={20}
                  src="/images/venly_logo.png"
                  alt="WalletConnect"
                />
              }
              onClick={() => {
                arkaneConnect
              }}
            >
              Venly
            </Button>
            <NextLink href={redirectUrl}>
              <Button
                justifyContent="space-between"
                width="100%"
                mb="4"
                size="lg"
                colorScheme= "pink"
                variant="solid"
                rightIcon={
                  <Image
                    loader={myLoader}
                    height={20}
                    width={20}
                    src="/images/wert.svg"
                    alt="Wert"
                  />
                }
              >
                Wert
              </Button>
            </NextLink> 
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ConnectWallet
