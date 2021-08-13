import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY;
const PROVIDER_MUMBAI = process.env.NEXT_PUBLIC_PROVIDER_MUMBAI;
const PROVIDER_MATIC = process.env.NEXT_PUBLIC_PROVIDER_MATIC;
const POLLING_INTERVAL = 12000;

const RPC_URLS: { [chainId: number]: string } = {
  1: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  4: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
  80001: `${PROVIDER_MUMBAI}`,
  137: `${PROVIDER_MATIC}`  

};

// export const network = new NetworkConnector({
//   urls: { 1: RPC_URLS[1], 4: RPC_URLS[4], 8001: RPC_URLS[80001], 137: RPC_URLS[137] },
//   defaultChainId: 4,
// });

// export const injected = new InjectedConnector({
//   supportedChainIds: [1, 4, 80001, 137]
// });

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1], 4: RPC_URLS[4], 8001: RPC_URLS[80001], 137: RPC_URLS[137] },
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});
