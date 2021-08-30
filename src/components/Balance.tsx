import { Text } from '@chakra-ui/react'
import { useLookupAddress, useEtherBalance, useEthers } from '@usedapp/core'
import { utils } from 'ethers'

/**
 * Component
 */
function Balance(): JSX.Element {

  const { account } = useEthers()
  const ens = useLookupAddress()
  const etherBalance = ens ? useEtherBalance(ens) : useEtherBalance(account);
  const finalBalance = etherBalance ? utils.formatEther(etherBalance) : ''

  return <Text>{finalBalance.slice(0,5)} ETH</Text>
}

export default Balance