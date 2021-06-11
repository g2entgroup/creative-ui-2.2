/**
  Retrieves a new provider specific to read.  The reason we separate the read and the writes is that the
  web3 providers on mobile dapps are extremely buggy; it's better to read the network through an INFURA
  JsonRpc endpoint.

  This function will first check to see if there is an injected web3.  If web3 is being injected, then a
  Ethers Web3Provider is instantiated to check the network.  Once the network is determined the Ethers
  getDefaultProvider function is used to create a provider pointing to the same network using an Infura node.
*/
import { ethers } from 'ethers'
import { NETWORK, NETWORKS } from "../constants";

const providerCache = {NETWORK}

export const readProvider = async function (NETWORK) {
  let provider

  try {
    if (NETWORK) {
      // TODO: Update this to use the rpc values in networks.js
      if (/local/.test(NETWORK)) {
        provider = new ethers.providers.JsonRpcProvider()
      } else if (/kovan/.test(NETWORK)) {
        provider = new ethers.providers.JsonRpcProvider(NETWORKS.kovan.rpcUrl)
      } else if (/goerli/.test(NETWORK)) {
        provider = new ethers.providers.JsonRpcProvider(NETWORKS.goerli.rpcUrl)
      } else if (/rinkeby/.test(NETWORK)) {
        provider = new ethers.providers.JsonRpcProvider(NETWORKS.rinkeby.rpcUrl)
      } else if (/optimism/.test(NETWORK)) {
        provider = new ethers.providers.JsonRpcProvider(NETWORKS.optimism.rpcUrl)
      } else if (/kovanOptimism/.test(NETWORK)) {
        provider = new ethers.providers.JsonRpcProvider(NETWORKS.kovanOptimism.rpcUrl)
      } else if (/localOptimism/.test(NETWORK)) {
        provider = new ethers.providers.JsonRpcProvider(NETWORKS.localOptimism.rpcUrl)
      } else if (/localOptimismL1/.test(NETWORK)) {
        provider = new ethers.providers.JsonRpcProvider(NETWORKS.localOptimismL1.rpcUrl) 
      } else if (/xdai/.test(NETWORK)) {
        provider = new ethers.providers.JsonRpcProvider(NETWORKS.xdai.rpcUrl)
      } else if (/matic/.test(NETWORK)) {
        provider = new ethers.providers.JsonRpcProvider(NETWORKS.matic.rpcUrl)
      } else if (/mumbai/.test(NETWORK)) {
        provider = new ethers.providers.JsonRpcProvider(NETWORKS.mumbai.rpcUrl)
      } else if (/bsc/.test(NETWORK)) {
        provider = new ethers.providers.JsonRpcProvider(NETWORKS.bsc.rpcUrl)
      } else if (/bsc_Testnet/.test(NETWORK)) {
        provider = new ethers.providers.JsonRpcProvider(NETWORKS.bsc_Testnet.rpcUrl)
      } else {
        provider = ethers.getDefaultProvider(networkName === 'mainnet' ? 'homestead' : networkName)
      }

      const net = await provider.getNetwork()

      // If we're running against a known network
      if (net && net.name !== 'unknown') {
        if (!providerCache[net.name]) {
          providerCache[net.name] = new ethers.providers.InfuraProvider(
            net.name,
            process.env.NEXT_JS_INFURA_KEY
          )
        }

        // use a separate Infura-based provider for consistent read api
        provider = providerCache[net.name]
      }
    }
  } catch (e) {
    console.error(e)
  }

  return provider
}
