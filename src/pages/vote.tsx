import React from "react";
import { Box } from '@chakra-ui/react';
import snapshot from '@snapshot-labs/snapshot.js';

const hub = 'https://testnet.snapshot.org'; // or https://testnet.snapshot.org for testnet
const client = new snapshot.Client712(hub);
const network = '137';
const provider = snapshot.utils.getProvider(network);
const space = snapshot.utils.getUrl("https://snapshot.org/#/thecreative.eth", "thecreative.eth")


const Vote = () => {
    return (
        <> 
    <Box>
        {client.space(provider,'0x1Fde40a4046Eda0cA0539Dd6c77ABF8933B94260', space)}
    </Box>
    </>
    )
    
}

export default Vote;