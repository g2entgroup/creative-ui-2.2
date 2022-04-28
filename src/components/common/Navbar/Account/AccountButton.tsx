import React, { useEffect, useState } from 'react'
import { useEthers, shortenAddress, useLookupAddress } from '@usedapp/core'
import { Box, Button, chakra } from "@chakra-ui/react";

import { AccountModal } from './AccountModal'

export const AccountButton = () => {
  const { account, deactivate, activateBrowserWallet } = useEthers()
  const ens = useLookupAddress()
  const [showModal, setShowModal] = useState(false)

  const [activateError, setActivateError] = useState('')
  const { error } = useEthers()
  useEffect(() => {
    if (error) {
      setActivateError(error.message)
    }
  }, [error])

  const activate = async () => {
    setActivateError('')
    activateBrowserWallet()
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
        <LoginButton onClick={activate}>Connect</LoginButton>
      )}
    </Account>
  )
}

const ErrorWrapper = chakra(Box, {
    baseStyle: {
        color: "#ff3960",
        marginRight: "40px",
        marginLeft: "40px",
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