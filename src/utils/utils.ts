import { Contract } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import { isAddress } from 'ethers/lib/utils'

// check it is the contract call or eth call
export const fetcher =
  (library, abi) =>
  (...args) => {
    const [arg1, arg2, ...params] = args
    // it's a contract
    if (isAddress(arg1)) {
      const address = arg1
      const method = arg2
      const contract = new Contract(address, abi, library.getSigner())
      return contract[method](...params)
    }
    // it's a eth call
    const method = arg1
    return library[method](arg2, ...params)
  }

// formatAddress
export const formatAddress = (address) => {
  return address
    ? address.substring(0, 6) +
        '...' +
        address.substring(address.length - 4, address.length)
    : 'connect wallet'
}

// use Web3Provider from Ether.js
export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}
