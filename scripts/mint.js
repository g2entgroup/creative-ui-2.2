/* eslint no-use-before-define: "warn" */
//const { config, ethers } = require("hardhat");


const { useEthers } = require('@usedapp/core');
const contractAddress = '0xD55cf33d0648837032c4396c72a44CE3C1C7c1b1'
//contract abi
const contractAbi = require("../contracts/CreativeNFT.json");

//initializing web3
//Metamask
const { library } = useEthers();
//const provider = new ethers.providers.Web3Provider(window.ethereum)
await library.send("eth_requestAccounts", []);
const signer = library.getSigner()
const contractSend = new ethers.Contract(contractAddress, contractAbi, signer);

//initializing contract

//minting function if metamask or a similar wallet is used:

const mintNFT = async () => {
  try{
  const overrides = {
    value: ethers.utils.parseEther("0.01"),
  }
  const tx = await contractSend.mint(overrides);

  // wait for the transaction to be mined
  const receipt = await tx.wait();
  console.log(receipt);
  } 
  catch(error){
    console.log(error.message);
  }
}