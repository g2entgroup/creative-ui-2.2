import { Text } from '@chakra-ui/react'
import { useEtherBalance, useEthers } from '@usedapp/core'
import { utils } from 'ethers'

/**
 * Component
 */
function Balance(): JSX.Element {
  let floatBalance = parseFloat("0.00");

  const { account } = useEthers()
  const etherBalance = useEtherBalance(account);
  const finalBalance = etherBalance ? utils.formatEther(etherBalance) : ''

  return <Text>{finalBalance} ETH</Text>
}

export default Balance