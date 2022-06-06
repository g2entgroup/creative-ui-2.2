import React, { useEffect, useState } from 'react'
// import styled from 'styled-components'
import { chakra } from '@chakra-ui/system';
import { useEthers, useEtherBalance, getExplorerAddressLink } from '@usedapp/core';
import { TransactionsList } from '../Transactions/History';
import { formatEther } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';
// import { Colors, Shadows, Transitions } from '../../../../styles/styles';
import { LinkIcon } from '@chakra-ui/icons';
import { motion, isValidMotionProp } from 'framer-motion';
import  Link from 'next/link';
import { Box, Button } from '@chakra-ui/react';
import { noSSR } from 'next/dynamic';

const formatter = new Intl.NumberFormat('en-us', {
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
})

const formatBalance = (balance: BigNumber | undefined) =>
  formatter.format(parseFloat(formatEther(balance ?? BigNumber.from('0'))))

export type AccountModalProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const AccountModal = ({ setShowModal }: AccountModalProps) => {
  
  const { account, chainId } = useEthers();
  const balance = useEtherBalance(account);

  if (account && chainId) {
    return (
      <ModalBackground onClick={() => setShowModal(false)}>
        <Modal
          onClick={(e) => e.stopPropagation()}
          layout
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <TitleRow>
            Account info
            <ClosingButton onClick={() => setShowModal(false)}>+</ClosingButton>
          </TitleRow>
          <AccountInfo>
            <AccountAddress>Address: {account}</AccountAddress>
            {typeof window !== 'undefined' && (
              <>
                <LinkWrapper>
                  <Link href={getExplorerAddressLink(account, chainId)}>
                    Show on etherscan
                    <LinkIconWrapper>
                      <LinkIcon />
                    </LinkIconWrapper>
                  </Link>
                  {window.isSecureContext && (
                    <Button onClick={() => console.log(navigator.clipboard.writeText(account))}>Copy to clipboard</Button>
                  )}
                </LinkWrapper>
                <BalanceWrapper>ETH: {balance && formatBalance(balance)}</BalanceWrapper>
                </>
              )}
          </AccountInfo>
          <HistoryWrapper>
            <TransactionsList />
          </HistoryWrapper>
        </Modal>
      </ModalBackground>
    )
  } else {
    setShowModal(false)
    return null;
  }
}

const LinkWrapper = chakra(Box, {
    baseStyle: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "20px",
    }
})
  

const LinkIconWrapper = chakra(Box, {
    baseStyle: {
        width: "12px",
        height: "12px",
    } 
}) 

const BalanceWrapper = chakra(Box, {
    baseStyle: {
        marginTop: "12px",
    }
})

const HistoryWrapper = chakra(Box)

const AccountAddress = chakra(Box, {
    baseStyle: {
        fontWeight: "700",
        marginBottom: "10px",
    }
})

const ClosingButton = chakra(Button, {
    baseStyle: {
        display: "flex",
        position: "absolute",
        top: "8px",
        right: "8px",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        lineHeight: "1",
        width: "24px",
        height: "24px",
        transform: "rotate(45deg)",
        transition: 'all 0.25s ease',
        hover: {
            color: "yellow.500",
        }
    }
})

const TitleRow = chakra(Box, {
    baseStyle: {
        display: "flex",
        alignItems: "center",
        position: "relative",
        padding: "16px",
        width: "100%",
        fontSize: "20px",
    }
})

const AccountInfo = chakra(Box, {
    baseStyle: {
        display: "block",
        margin: "16px",
        padding: "16px",
        borderRadius: "10px",
        boxShadow: '10px 4px 28px rgba(136, 169, 200, 0.15)',
        backgroundColor: "white",

    }
})
  

const Modal = chakra(Box , {
    baseStyle: {
        position: "fixed",
        width: "600px",
        left: "calc(50% - 300px)",
        top: "100px",
        backgroundColor: "white",
        boxShadow: '10px 4px 28px rgba(136, 169, 200, 0.15)',
        borderRadius: "10px",
        zIndex: "3",
    }
})

const ModalBackground = chakra(motion.div, {
    shouldForwardProp: isValidMotionProp,
    baseStyle: {
        top: "0",
        left: "0",
        position: "fixed",
        width: "100%",
        height: "100%",
        margin: "0px",
        zIndex: "2",
        backgroundColor: "rgba(235, 232, 223, 0.5)",
    }
})
