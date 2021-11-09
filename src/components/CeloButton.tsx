import { newKit } from '@celo/contractkit'
import { WalletConnectWallet, WalletConnectWalletOptions } from '@celo/wallet-walletconnect'
import { Button, ButtonGroup } from "@chakra-ui/react"
const walletOptions : WalletConnectWalletOptions = {
    connect: {
        metadata: {
          name: 'The name of your awesome DApp',
          description: 'Your DApp description',
          url: 'https://example.com',
          icons: ['https://example.com/favicon.ico'],
        },
      },
}


async function connect() {
  const wallet = new WalletConnectWallet(walletOptions)

  const uri = await wallet.getUri()
  // display this uri as a QR code to the user
  await wallet.init()

  const [from] = await wallet.getAccounts()
  const kit = newKit('https://alfajores-forno.celo-testnet.org', wallet)

  const gold = await kit.contracts.getGoldToken()
  await gold.transfer('0x...', '1').sendAndWaitForReceipt({ from })
}

// export default function CeloButton () {
//     return(
//         <Button onClick={await connect()}>Celo Connect</Button>
//     )
// }

connect()