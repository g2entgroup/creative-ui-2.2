import React from "react";
import { useEthers } from "@usedapp/core";
import useSWR from "swr";
import { fetcher } from "../../../utils/myFetcher";
import { formatEther } from "@ethersproject/units";

const Balance = () => {
  const { account, library } = useEthers();
  const { data: balance } = useSWR(["getBalance", account, "latest"], {
    fetcher: fetcher(library),
  });


  if (!balance) {
    return <div></div>;
  }
  return <div> { balance && parseFloat(formatEther(balance)).toFixed(3) }</div>;
};

export default Balance;
