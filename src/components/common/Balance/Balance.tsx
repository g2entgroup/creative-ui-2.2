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
  return <div> { balance && parseFloat(formatEther(balance)).toFixed(3) }</div>;
};
// need help , the fix decimal points dont seem to have an effect. It should display 2 decimal points but displays all
//balance && parseFloat(formatEther(balance)).toFixed(3)
export default Balance;
