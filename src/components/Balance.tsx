import { Text } from '@chakra-ui/react'
import { useEtherBalance, useEthers } from '@usedapp/core'
import { utils } from 'ethers'

/**
 * Component
 */
function Balance(): JSX.Element {

  const { account } = useEthers()
  const etherBalance = useEtherBalance(account)
  const finalBalance = etherBalance ? utils.formatEther(etherBalance) : ''

  return <Text>{finalBalance.slice(0,4)} ETH</Text>
}

export default Balance