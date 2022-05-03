// const { useEthers } = require('@usedapp/core');

// const contractAddress = '0xD55cf33d0648837032c4396c72a44CE3C1C7c1b1'
// //contract abi
// const contractAbi = require("../contracts/CreativeNFT.json");

// If your contract constructor requires parameters, the ABI
// must include the constructor
const abi = [
    "constructor(string memory _poolName, string memory _brandName, uint256 _capital, address _capitalAddress, address _nftAddress, address _poolOwner, address _rng, uint256 _campaignLength, uint256 _votingLength, uint256 _decisionLength, uint256 _submissionLength)",
    "function value() view returns (uint)",
];

// The factory we use for deploying contracts
factory = new ContractFactory(abi, bytecode, signer);

// Deploy an instance of the contract
contract = await factory.deploy(
    "Christmas Flavors",
    "Starbucks",
    7042,
    "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
    "0xbd119CD9de78fAc6da57bA30506F02Ce854e3FE9",
    "0x1Fde40a4046Eda0cA0539Dd6c77ABF8933B94260",
    "I think you deployed this one",
    1209600000,
    432000000,
    172800000,
    432000000
);

// The address is available immediately, but the contract
// is NOT deployed yet
contract.address;
// '0x999Bbd8F4b550924eFCc1DD27B4B6eca5458B050'

// The transaction that the signer sent to deploy
contract.deployTransaction;
// {
//   chainId: 1337,
//   confirmations: 0,
//   data: '0x608060405234801561001057600080fd5b5060405161012e38038061012e8339818101604052604081101561003357600080fd5b81019080805190602001909291908051906020019092919050505081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060008190555050506088806100a66000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80633fa4f24514602d575b600080fd5b60336049565b6040518082815260200191505060405180910390f35b6000805490509056fea2646970667358221220926465385af0e8706644e1ff3db7161af699dc063beaadd55405f2ccd6478d7564736f6c634300070400330000000000000000000000005555763613a12d8f3e73be831dff8598089d3dca000000000000000000000000000000000000000000000000000000000000002a',
//   from: '0x77C44C0D1D37050e9250415Ee96401B5ac270856',
//   gasLimit: { BigNumber: "129862" },
//   gasPrice: { BigNumber: "1" },
//   hash: '0x5fa8dfad5cdf50823444feaaa286c2b7473e326e7888e39bd291d8f4b1ca0a8e',
//   nonce: 0,
//   r: '0x8bd033a3d9a9e7808e48c5ab531c3589b8e672fef67905eff54358e56cadbd2d',
//   s: '0x38234d91a5a667680144bb844571140d25a7e691842c592e68accf44922816f6',
//   to: null,
//   type: null,
//   v: 2710,
//   value: { BigNumber: "0" },
//   wait: [Function]
// }

// Wait until the transaction is mined (i.e. contract is deployed)
//  - returns the receipt
//  - throws on failure (the reciept is on the error)
await contract.deployTransaction.wait();
// {
//   blockHash: '0xc034914ab040a8a68fb89e293a49ac7d165ad5e8d9fa35141e5e003385d4ed76',
//   blockNumber: 2,
//   byzantium: true,
//   confirmations: 1,
//   contractAddress: '0x999Bbd8F4b550924eFCc1DD27B4B6eca5458B050',
//   cumulativeGasUsed: { BigNumber: "129862" },
//   events: [],
//   from: '0x77C44C0D1D37050e9250415Ee96401B5ac270856',
//   gasUsed: { BigNumber: "129862" },
//   logs: [],
//   logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
//   status: 1,
//   to: null,
//   transactionHash: '0x5fa8dfad5cdf50823444feaaa286c2b7473e326e7888e39bd291d8f4b1ca0a8e',
//   transactionIndex: 0,
//   type: 0
// }

// Now the contract is safe to interact with
await contract.value();
// { BigNumber: "42" }
