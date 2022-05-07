// MY INFURA_ID
export const INFURA_ID = "ff5a5c50d1e649bdb777f80813747e3d";

// CREATIVE MATICVIGIL MATICVIGIL_KEY
export const MATICVIGIL_KEY = "0555d91f079e6e531a60015e62d2578b1a4698dd";

// MY ETHERSCAN_ID, SWAP IN YOURS FROM https://etherscan.io/myapikey
export const ETHERSCAN_KEY = "PSW8C433Q667DVEX5BCRMGNAH9FSGFZ7Q8";

// BLOCKNATIVE ID FOR Notify.js:
export const BLOCKNATIVE_DAPPID = "0b58206a-f3c0-4701-a62f-73c7243e8c77";

export const RARIBLE_EXCHANGE_RINKEBY =
  "0x33Aef288C093Bf7b36fBe15c3190e616a993b0AD";

// LENS PROTOCOL CONSTANTS (MUMBAI NETWORK ONLY) - not used here because of export errors when calling this file - refer to /services/apollo/constants.ts
// export const LENS_HUB_PROXY_ADDRESS =
//   "0x4BF0c7AD32Fd2d32089790a54485e23f5C7736C0";
// export const LENS_PERIPHERY_CONTRACT =
//   "0x702C22BFCD705c42B46Df8512b51311a2B5e6036";
// export const LENS_API_URL = "https://api-mumbai.lens.dev/";

export const NETWORKS = {
  // localhost: {
  //   name: "localhost",
  //   color: "#666666",
  //   chainId: 31337,
  //   blockExplorer: "",
  //   rpcUrl: "http://localhost" + ":8545",
  // },
  mainnet: {
    name: "mainnet",
    color: "#ff8b9e",
    chainId: 1,
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
    blockExplorer: "https://etherscan.io/",
  },
  kovan: {
    name: "kovan",
    color: "#7003DD",
    chainId: 42,
    rpcUrl: `https://kovan.infura.io/v3/${INFURA_ID}`,
    blockExplorer: "https://kovan.etherscan.io/",
    faucet: "https://gitter.im/kovan-testnet/faucet", // https://faucet.kovan.network/
  },
  rinkeby: {
    name: "rinkeby",
    color: "#e0d068",
    chainId: 4,
    rpcUrl: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
    faucet: "https://faucet.rinkeby.io/",
    blockExplorer: "https://rinkeby.etherscan.io/",
  },
  ropsten: {
    name: "ropsten",
    color: "#F60D09",
    chainId: 3,
    faucet: "https://faucet.ropsten.be/",
    blockExplorer: "https://ropsten.etherscan.io/",
    rpcUrl: `https://ropsten.infura.io/v3/${INFURA_ID}`,
  },
  goerli: {
    name: "goerli",
    color: "#0975F6",
    chainId: 5,
    faucet: "https://goerli-faucet.slock.it/",
    blockExplorer: "https://goerli.etherscan.io/",
    rpcUrl: `https://goerli.infura.io/v3/${INFURA_ID}`,
  },
  xdai: {
    name: "xdai",
    color: "#48a9a6",
    chainId: 100,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: "https://dai.poa.network",
    faucet: "https://xdai-faucet.top/",
    blockExplorer: "https://blockscout.com/poa/xdai/",
  },
  bsc: {
    name: "BSC",
    color: "yellow",
    chainId: 56,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: "https://bsc-dataseed.binance.org/",
    blockExplorer: "https://bscscan.com/",
  },
  bsc_Testnet: {
    name: "BSC Testnet",
    color: "yellow",
    chainId: 97,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    blockExplorer: "https://bscscan.com/",
  },
  matic: {
    name: "matic",
    color: "#2bbdf7",
    chainId: 137,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl:
      "https://polygon-mainnet.g.alchemy.com/v2/NDsioMXTwci91lMdODnh3iBbcJoxCgy8",
    faucet: "https://faucet.matic.network/",
    blockExplorer: "https://explorer-mainnet.maticvigil.com/",
  },
  mumbai: {
    name: "mumbai",
    color: "#92D9FA",
    chainId: 80001,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl:
      "https://polygon-mumbai.g.alchemy.com/v2/4QdGUP8BOp3_NdNJAN1c2sWs12LtsfDF",
    faucet: "https://faucet.matic.network/",
    blockExplorer: "https://mumbai-explorer.matic.today/",
  },
  localArbitrum: {
    name: "localArbitrum",
    color: "#50a0ea",
    chainId: 153869338190755,
    blockExplorer: "",
    rpcUrl: `http://localhost:8547`,
  },
  localArbitrumL1: {
    name: "localArbitrumL1",
    color: "#50a0ea",
    chainId: 44010,
    blockExplorer: "",
    rpcUrl: `http://localhost:7545`,
  },
  kovanArbitrum: {
    name: "kovanArbitrum",
    color: "#50a0ea",
    chainId: 144545313136048,
    blockExplorer: "https://explorer5.arbitrum.io/#/",
    rpcUrl: `https://kovan5.arbitrum.io/rpc`,
  },
  rinkebyArbitrum: {
    name: "Arbitrum Testnet",
    color: "#50a0ea",
    chainId: 421611,
    blockExplorer: "https://rinkeby-explorer.arbitrum.io/#/",
    rpcUrl: `https://rinkeby.arbitrum.io/rpc`,
  },
  localOptimismL1: {
    name: "localOptimismL1",
    color: "#f01a37",
    chainId: 31337,
    blockExplorer: "",
    rpcUrl: "http://localhost" + ":9545",
  },
  localOptimism: {
    name: "localOptimism",
    color: "#f01a37",
    chainId: 420,
    blockExplorer: "",
    rpcUrl: "http://localhost" + ":8545",
  },
  kovanOptimism: {
    name: "kovanOptimism",
    color: "#f01a37",
    chainId: 69,
    blockExplorer: "https://kovan-optimistic.etherscan.io/",
    rpcUrl: `https://kovan.optimism.io`,
  },
  optimism: {
    name: "optimism",
    color: "#f01a37",
    chainId: 10,
    blockExplorer: "https://optimistic.etherscan.io/",
    rpcUrl: `https://mainnet.optimism.io`,
  },
};

export const DEFAULT_SUPPORTED_CHAINS = [
  Localhost,
  Hardhat,
  Avalanche,
  AvalancheTestnet,
  Arbitrum,
  ArbitrumRinkeby,
  Aurora,
  AuroraTestnet,
  Mainnet,
  Ropsten,
  Rinkeby,
  Goerli,
  Kovan,
  BSC,
  BSCTestnet,
  Cronos,
  CronosTestnet,
  Fantom,
  FantomTestnet,
  Gnosis,
  Harmony,
  Andromeda,
  Stardust,
  Moonriver,
  MoonbaseAlpha,
  Moonbeam,
  Palm,
  PalmTestnet,
  Polygon,
  Mumbai,
  OasisEmerald,
  OasisEmeraldTestnet,
  Songbird,
  Theta,
  ThetaTestnet,
  ThunderCore,
  ThunderCoreTestnet,
  OptimismKovan,
  Optimism,
  Velas,
  VelasTestnet,
  ZkSyncTestnet,
];

export const NETWORK = (chainId) => {
  for (const n in NETWORKS) {
    if (NETWORKS[n].chainId === chainId) {
      return NETWORKS[n];
    }
  }
};
