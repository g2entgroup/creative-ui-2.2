import { useState, useEffect } from "react";
import { Text } from '@chakra-ui/react';
import { useEtherBalance, useEthers} from '@usedapp/core';
import useSWR from "swr";
import { fetcher } from "../utils/myFetcher";
import { utils } from 'ethers';
import { formatEther } from "@ethersproject/units";
import { useFetchPairPrice } from '../services/coingecko/useServices'



/**
 * Component
 */
function Balance(): JSX.Element {
  const [fiatValue, setFiatValue] = useState(0);
  const { account, chainId, library } = useEthers()
  const etherBalance = useEtherBalance(account)
  const finalBalance = etherBalance ? formatEther(etherBalance) : ''
  const addBalance = fiatValue * parseFloat(finalBalance);
  let chain = chainId;
  let currency;
  

  const {
    data: priceData,
    loading: priceLoading,
    error: priceError,
  } = useFetchPairPrice("matic-network", "usd");

  const { data: balance } = useSWR(["getBalance", account, "latest"], {
    fetcher: fetcher(library),
  });

  useEffect(() => {
    priceData; 
    setFiatValue(priceData?.["matic-network"]?.usd);
  })
  
  return (
    account && chain === 80001 || 137 ?
    (currency = <Text>{finalBalance.slice(0,4)} MATIC ${(addBalance).toFixed(2)}</Text>) :
    (currency = <Text>{finalBalance.slice(0,4)} ETH ${(addBalance).toFixed(2)}</Text>)
  )
}

export default Balance;