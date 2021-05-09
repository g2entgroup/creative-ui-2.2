import { InjectedConnector } from '@web3-react/injected-connector';


export const Networks = {
  MainNet: 1,
  Ropsten: 3,
  Rinkeby: 4,
  Goerli: 5,
  Kovan: 42,
  Matic: 137,
  Mumbai: 8001
}


  export const injectedConnector = new InjectedConnector({
    supportedChainIds: [
      Networks.MainNet, // Mainet
      Networks.Ropsten, // Ropsten
      Networks.Rinkeby, // Rinkeby
      Networks.Goerli, // Goerli
      Networks.Kovan, // Kovan
      Networks.Matic, // Matic
      Networks.Mumbai, // Mumbai
    ]
  })
  