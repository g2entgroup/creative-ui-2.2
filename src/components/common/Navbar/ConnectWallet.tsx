import {
  Box
} from '@chakra-ui/react';
import React from 'react';
import { Web3ModalButton } from './Account/Web3ModalButton';

function ConnectWallet(): JSX.Element {

  return (
    <>
      <Box
        order={[null, null, null, null]}
        textAlign={[null, null, null, null]}
      >
        <Web3ModalButton />
      </Box>
    </>
  )
}

export default ConnectWallet
