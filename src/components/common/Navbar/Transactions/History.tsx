import type { TransactionResponse } from '@ethersproject/providers';
import {
  getExplorerTransactionLink,
  Notification,
  useNotifications,
  useTransactions,
  getStoredTransactionState,
  StoredTransaction,
  shortenTransactionHash,
} from '@usedapp/core';
import React, { ReactElement, ReactNode, Suspense } from 'react';
//import { TextBold } from '../../typography/Text'
//import { ContentBlock } from '../base/base'
import { TimeIcon, CheckIcon, WarningTwoIcon, LinkIcon, LockIcon, UnlockIcon, InfoIcon, SpinnerIcon  } from '@chakra-ui/icons'
import { Box, chakra, Text } from '@chakra-ui/react';
//import { Colors, Shadows } from '../../global/styles'
import { AnimatePresence, motion, isValidMotionProp } from 'framer-motion';
import { formatEther } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';
import Link from "next/link";

interface TableWrapperProps {
  children: ReactNode
  title: string
}

const formatter = new Intl.NumberFormat('en-us', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 3,
})

const formatBalance = (balance: BigNumber | undefined) =>
  formatter.format(parseFloat(formatEther(balance ?? BigNumber.from('0'))))

const TableWrapper = ({ children, title }: TableWrapperProps) => (
  <SmallContentBlock>
    <TitleRow>{title}</TitleRow>
    <Table>{children}</Table>
  </SmallContentBlock>
)

interface DateProps {
  date: number
  className?: string
}

const DateCell = ({ date, className }: DateProps) => {
  const dateObject = new Date(date)
  const formattedDate = dateObject.toLocaleDateString()
  const formattedTime = dateObject.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })

  return (
    <DateRow className={className}>
      <DateDisplay>{formattedDate}</DateDisplay>
      <HourDisplay>{formattedTime}</HourDisplay>
    </DateRow>
  )
}

interface TransactionLinkProps {
  transaction: TransactionResponse | undefined
}

const TransactionLink = ({ transaction }: TransactionLinkProps) => (
  <>
    {transaction && (
      <Link
        href={getExplorerTransactionLink(transaction.hash, transaction.chainId)}
      >
        View on Etherscan
        <LinkIconWrapper>
          <LinkIcon />
        </LinkIconWrapper>
      </Link>
    )}
  </>
)

const notificationContent: { [key in Notification['type']]: { title: string; icon: ReactElement } } = {
  transactionFailed: { title: 'Transaction failed', icon: <WarningTwoIcon /> },
  transactionStarted: { title: 'Transaction started', icon: <TimeIcon /> },
  transactionSucceed: { title: 'Transaction succeed', icon: <CheckIcon /> },
  walletConnected: { title: 'Wallet connected', icon: <InfoIcon /> },
}

interface ListElementProps {
  icon: ReactElement
  title: string | undefined
  transaction?: TransactionResponse
  date: number
}

const ListElement = ({ transaction, icon, title, date }: ListElementProps) => {
  return (
    <ListElementWrapper layout initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <ListIconContainer>{icon}</ListIconContainer>
      <ListDetailsWrapper>
        <Text fontSize={"lg"}>{title}</Text>
        <TransactionLink transaction={transaction} />
      </ListDetailsWrapper>
      <NotificationDate date={date} />
    </ListElementWrapper>
  )
}

function TransactionIcon(transaction: StoredTransaction) {
  if (getStoredTransactionState(transaction) === 'Mining') {
    return <SpinnerIcon />
  } else if (getStoredTransactionState(transaction) === 'Fail') {
    return <WarningTwoIcon />
  } else if (transaction.transactionName === 'Unwrap') {
    return <UnlockIcon />
  } else if (transaction.transactionName === 'Wrap') {
    return <LockIcon />
  } else {
    return <CheckIcon />
  }
}

export const TransactionsList = () => {
  const { transactions } = useTransactions()
  return (
    <Suspense>
      <TableWrapper title="Transactions history">
        <AnimatePresence initial={false}>
          {transactions.map((transaction) => (
            <ListElement
              transaction={transaction.transaction}
              title={transaction.transactionName}
              icon={TransactionIcon(transaction)}
              key={transaction.transaction.hash}
              date={transaction.submittedAt}
            />
          ))}
        </AnimatePresence>
      </TableWrapper>
    </Suspense>
  )
}

const NotificationElement = ({ transaction, icon, title }: ListElementProps) => {
  return (
    <NotificationWrapper layout initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <NotificationIconContainer>{icon}</NotificationIconContainer>
      <NotificationDetailsWrapper>
        <NotificationText>{title}</NotificationText>
        <TransactionLink transaction={transaction} />
        <TransactionDetails>
          {transaction && `${shortenTransactionHash(transaction?.hash)} #${transaction.nonce}`}
        </TransactionDetails>
      </NotificationDetailsWrapper>
      {transaction && <div style={{ marginLeft: 'auto' }}>- {formatBalance(transaction.value)} ETH</div>}
    </NotificationWrapper>
  )
}

export const NotificationsList = () => {
  const { notifications } = useNotifications()
  return (
    <Suspense>
      <NotificationsWrapper>
        <AnimatePresence initial={false}>
          {notifications.map((notification) => {
            if ('transaction' in notification)
              return (
                <NotificationElement
                  key={notification.id}
                  icon={notificationContent[notification.type].icon}
                  title={notificationContent[notification.type].title}
                  transaction={notification.transaction}
                  date={Date.now()}
                />
              )
            else
              return (
                <NotificationElement
                  key={notification.id}
                  icon={notificationContent[notification.type].icon}
                  title={notificationContent[notification.type].title}
                  date={Date.now()}
                />
              )
          })}
        </AnimatePresence>
      </NotificationsWrapper>
    </Suspense>
  )
}

const NotificationText = chakra(Text, {
    baseStyle: {
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "5px",
    }
})

const TransactionDetails = chakra(Box, {
    baseStyle: {
        fontSize: "14px",
    }
})

const NotificationWrapper = chakra(motion.div, {
    shouldForwardProp: isValidMotionProp,
    baseStyle: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        boxShadow: '0px 4px 14px rgba(136, 169, 200, 0.3)',
        width: '395px',
        borderRadius: "10px",
        margin: "15px",
        padding: "10px 20px 10px 20px",
    }
})
  

const NotificationsWrapper = chakra(Box, {
    position: "fixed",
    right: "24px",
    bottom: "24px",
})

const NotificationIconContainer = chakra(Box, {
    baseStyle: {
        width: "60px",
        height: "60px",
        padding: "0px",
        marginRight: "20px",
    }
})

const ListIconContainer = chakra(Box, {
    baseStyle: {
        width: "48px",
        height: "48px",
        padding: "14px 16px 14px 12px",
    }
})

const ListElementWrapper = chakra(motion.div, {
    baseStyle: {
        display: "flex",
        justifyContent: "space-between"
    }
})

const NotificationDetailsWrapper = chakra(Box, {
    baseStyle: {
        display: "flex",
        flexDirection: "column",
        padding: "4px 0",
    }
})


const ListDetailsWrapper = chakra(Box, {
    baseStyle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        padding: "4px 0",
    }
})

const Table = chakra(Box, {
    baseStyle: {
        height: "300px",
        overflow: "scroll",
        padding: "12px",
    }
})

const LinkIconWrapper = chakra(Box, {
    baseStyle: {
        width: "12px",
        height: "12px",
        marginLeft: "8px",
    }
})
const SmallContentBlock = chakra(Box, {
    baseStyle: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        borderRadius: '8px',
        boxShadow: '10px 4px 28px rgba(136, 169, 200, 0.15)',
        padding: "0",
    }
})

const TitleRow = chakra(Text, {
    baseStyle: {
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        borderBottom: "Gray.300 1px solid",
        padding: "16px",
        fontSize: "18px",
        fontWeight: "bold",
    }
})

const DateRow = chakra(Box, {
    baseStyle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textAlign: "end",
        padding: "8px",
    }
})

const NotificationDate = chakra(DateCell, {
    baseStyle: {
        marginLeft: "auto",
    }
})

const DateDisplay = chakra(Box, {
    baseStyle: {
        fontSize: "14px",
    }
})

const HourDisplay = chakra(Box, {
    baseStyle: {
        fontSize: "12px",
        color: "gray.600",
    }
})