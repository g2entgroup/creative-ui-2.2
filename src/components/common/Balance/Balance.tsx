import { useState, useEffect } from "react";
import { Text } from '@chakra-ui/react';
import { useEtherBalance, useEthers} from '@usedapp/core';
import useSWR from "swr";
//import { fetcher } from "../utils/myFetcher";
import { formatEther } from "ethers/lib/utils";



/**
 * Component
 */
function Balance(): JSX.Element {
  const [fiatValue, setFiatValue] = useState(0);
  const { account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  const finalBalance = etherBalance ? formatEther(etherBalance) : '';
  const addBalance = fiatValue * parseFloat(finalBalance);
  let currency;
  
  return (
    account && chainId === 80001 ?
    (currency = <Text><>{etherBalance} MATIC</></Text>) :
    (currency = <Text><>{finalBalance.slice(0,4)} ETH ${(addBalance).toFixed(2)}</></Text>)
  )
}

export default Balance;