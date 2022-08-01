import React from "react";
import { Button, Input, Tooltip, HStack } from "@chakra-ui/react";
import { createSellOrder} from "../../../../rarible/createOrders";
import { RARIBLE_EXCHANGE_RINKEBY } from "../../../../constants";
import { utils } from 'ethers';

function handleMenuClick(e) {
  console.log("click", e);
}

export default function Buy(props) {
  const [sellState, setSellState] = React.useState({});
  const [sellForEthValue, setSellForEthValue] = React.useState();
  const [salt, setSalt] = React.useState({});
  
  const buttons = (
    <Tooltip placement="right" title="* 10 ** 18">
    </Tooltip>
  );
  return (
    <HStack>
      <Button
      flex={1}
      fontSize={'md'}
      bg={'blue.400'}
      color={'white'}
      boxShadow={
        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
      }
      _hover={{
        bg: 'blue.500',
      }}
      _focus={{
        bg: 'blue.500',
      }} 
      onClick={() => setSellState("MATIC")}>Buy with MATIC</Button>
    </HStack>
  );
}
