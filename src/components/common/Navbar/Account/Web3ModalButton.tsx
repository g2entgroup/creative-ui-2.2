import React, { useEffect, useState } from 'react'
import { useEthers, shortenAddress, useLookupAddress } from '@usedapp/core'
import { Button, chakra, Box } from '@chakra-ui/react';
import Web3Modal from 'web3modal';

import { AccountModal } from './AccountModal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Venly } from '@venly/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import Portis from "@portis/web3";
import Authereum from "authereum";
import Fortmatic from "fortmatic";

export const Web3ModalButton = () => {
  const { account, activate, deactivate } = useEthers()
  const ens = useLookupAddress()
  const [showModal, setShowModal] = useState(false)
  const [activateError, setActivateError] = useState('')
  const { error } = useEthers()
  useEffect(() => {
    if (error) {
      setActivateError(error.message)
    }
  }, [error])

  // Example for Polygon/Matic:
  const customNetworkOptions = {
    rpcUrl: 'https://rpc-mumbai.maticvigil.com',
    chainId: 80001,
  }

  const activateProvider = async () => {
    const providerOptions = {
      injected: {
        display: {
          name: 'Metamask',
          description: 'Connect with the provider in your Browser',
        },
        package: null,
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          bridge: 'https://bridge.walletconnect.org',
          infuraId: process.env.NEXT_PUBLIC_INFURA_KEY,
        }
      },
      venly: {
        package: Venly,
        options: {
          clientId: process.env.NEXT_PUBLIC_VENLY_WIDGET_CLIENT_ID,
          environment: 'staging',
          signMethod: 'POPUP', //optional, REDIRECT by default
          //bearerTokenProvider: () => 'obtained_bearer_token', //optional, default undefined
          //optional: you can set an identity provider to be used when authenticating
          authenticationOptions: {
            idpHint: 'google'
          },
        secretType: 'MATIC' //optional, ETHEREUM by default
        }
      },
      coinbasewallet: {
        package: CoinbaseWalletSDK, // Required
        options: {
          appName: "Creative Platform", // Required
          infuraId: process.env.NEXT_PUBLIC_INFURA_KEY, // Required
          rpc: "", // Optional if `infuraId` is provided; otherwise it's required
          chainId: 80001, // Optional. It defaults to 1 if not provided
          darkMode: false // Optional. Use dark theme, defaults to false
        }
      },
      portis: {
        package: Portis, // required
        options: {
          id: process.env.NEXT_PUBLIC_PORTIS_ID // required
        }
      },
      authereum: {
        package: Authereum // required
      },
      fortmatic: {
        package: Fortmatic, // required
        options: {
          key: process.env.NEXT_PUBLIC_FORTMATIC, // required
          network: customNetworkOptions // if we don't pass it, it will default to localhost:8454
        }
      }
    }

    const web3Modal = new Web3Modal({
      providerOptions,
    })
    try {
      const provider = await web3Modal.connect()
      await activate(provider)
      setActivateError('')
    } catch (error: any) {
      setActivateError(error.message)
    }
  }

  return (
    <Account>
      <ErrorWrapper>{activateError}</ErrorWrapper>
      {showModal && <AccountModal setShowModal={setShowModal} />}
      {account ? (
        <>
          <AccountLabel onClick={() => setShowModal(!showModal)}>{ens ?? shortenAddress(account)}</AccountLabel>
          <LoginButton onClick={() => deactivate()}>Disconnect</LoginButton>
        </>
      ) : (
        <LoginButton onClick={activateProvider}>Wallet Connect</LoginButton>
      )}
    </Account>
  )
}

const ErrorWrapper = chakra(Box, {
    baseStyle: {
        color: "#ff3960",
        marginLeft: "40px",
        marginRight: "40px",
        overflow: "auto",
    }
})

const Account = chakra(Box, {
    baseStyle: {
        display: "flex",
        alignItems: "center",
    }
})

const LoginButton = chakra(Button, {
    baseStyle: {
      backgroundColor: "#e50168",
    }
})
const AccountLabel = chakra(Button, {
    baseStyle: {
        height: "32px",
        marginRight: "-40px",
        paddingRight: "40px",
        paddingLeft: "8px",
        backgroundColor: "#e50168",
        fontSize: "12px",
    }
})
