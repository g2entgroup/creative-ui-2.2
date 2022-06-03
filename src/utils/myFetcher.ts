// import { Web3Provider } from "@ethersproject/providers";
import { Contract } from '@ethersproject/contracts'
import { isAddress } from '@ethersproject/address'

export const fetcher =
  (library: any, abi?: any) =>
  (...args: [any, any, ...any[]]) => {
    const [arg1, arg2, ...params] = args
    // it's a contract
    if (isAddress(arg1)) {
      const address = arg1
      const method = arg2
      const contract = new Contract(address, abi, library.getSigner())

      // console.log(method)
      return contract[method](...params)
    }
    // it's a eth call
    const method = arg1

    return library[method](arg2, ...params)
  }
