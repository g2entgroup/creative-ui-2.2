import React from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import { fetcher } from "../../../utils/myFetcher";
import { formatEther } from "@ethersproject/units";

const Balance = () => {
  const { account, library } = useWeb3React<Web3Provider>();
  const { data: balance } = useSWR(["getBalance", account, "latest"], {
    fetcher: fetcher(library),
  });

  if (!balance) {
    return <div></div>;
  }
  return <div>Ξ {parseFloat(formatEther(balance)).toPrecision(4)}</div>;
};

export default Balance;
