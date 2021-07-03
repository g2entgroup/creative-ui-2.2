import React, { useState } from "react";
// @ts-ignore
import { PrivateKey } from '@textile/hub'
import { BigNumber, providers, utils } from 'ethers'
import { hashSync } from 'bcryptjs'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Input,
  InputGroup,
  InputRightElement,
  Container,
  Stack,
  createStandaloneToast
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { TextileInstance } from "../../../services/textile/textile";

type WindowInstanceWithEthereum = Window & typeof globalThis & { ethereum?: providers.ExternalProvider };
class StrongType<Definition, Type> {
  // @ts-ignore
  private _type: Definition;
  constructor(public value?: Type) {}
}
export class EthereumAddress extends StrongType<'ethereum_address', string> {}

const SignIn = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [secret, setSecret] = useState<String>();

  const handleChange = (e: any) => setSecret(e.target.value);

  const generateMessageForEntropy = (ethereum_address: EthereumAddress, application_name: string, secret: string): string => {
    return (
      '******************************************************************************** \n' +
      'READ THIS MESSAGE CAREFULLY. \n' +
      'DO NOT SHARE THIS SIGNED MESSAGE WITH ANYONE OR THEY WILL HAVE READ AND WRITE \n' +
      'ACCESS TO THIS APPLICATION. \n' +
      'DO NOT SIGN THIS MESSAGE IF THE FOLLOWING IS NOT TRUE OR YOU DO NOT CONSENT \n' +
      'TO THE CURRENT APPLICATION HAVING ACCESS TO THE FOLLOWING APPLICATION. \n' +
      '******************************************************************************** \n' +
      'The Ethereum address used by this application is: \n' +
      '\n' +
      ethereum_address.value +
      '\n' +
      '\n' +
      '\n' +
      'By signing this message, you authorize the current application to use the \n' +
      'following app associated with the above address: \n' +
      '\n' +
      application_name +
      '\n' +
      '\n' +
      '\n' +
      'The hash of your non-recoverable, private, non-persisted password or secret \n' +
      'phrase is: \n' +
      '\n' +
      secret +
      '\n' +
      '\n' +
      '\n' +
      '******************************************************************************** \n' +
      'ONLY SIGN THIS MESSAGE IF YOU CONSENT TO THE CURRENT PAGE ACCESSING THE TEXTILE KEYS \n' +
      'ASSOCIATED WITH THE ABOVE ADDRESS AND APPLICATION. \n' +
      'NOTE THIS DOES NOT ALLOW ACCESS TO YOUR WALLET FOR BLOCKCHAIN TX. \n' +
      'AGAIN, DO NOT SHARE THIS SIGNED MESSAGE WITH ANYONE OR THEY WILL HAVE READ AND \n' +
      'WRITE ACCESS TO THIS APPLICATION. \n' +
      '******************************************************************************** \n'
    );
  }

  const getSigner = async () => {
    if (!(window as WindowInstanceWithEthereum).ethereum) {
      throw new Error(
        'Ethereum is not connected. Please download Metamask from https://metamask.io/download.html'
      );
    }

    console.debug('Initializing web3 provider...');
    // @ts-ignore
    const provider = new providers.Web3Provider((window as WindowInstanceWithEthereum).ethereum);
    const signer = provider.getSigner();
    return signer
  }

  const getAddressAndSigner = async (): Promise<{address: EthereumAddress, signer: any}> => {
    const signer = await getSigner()
    // @ts-ignore
    const accounts = await (window as WindowInstanceWithEthereum).ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts.length === 0) {
      throw new Error('No account is provided. Please provide an account to this application.');
    }

    const address = new EthereumAddress(accounts[0]);

    return {address, signer}
  }
  const generatePrivateKey = async (): Promise<PrivateKey> => {
    const metamask = await getAddressAndSigner()
    const salt = "$2a$10$3vx4QH1vSj9.URynBqkbae";
    // avoid sending the raw secret by hashing it first
    const hashSecret = hashSync(secret, salt);
    const message = generateMessageForEntropy(metamask.address, 'Creative', hashSecret)
    const signedText = await metamask.signer.signMessage(message);
    const hash = utils.keccak256(signedText);
    if (hash === null) {
      throw new Error('No account is provided. Please provide an account to this application.');
    }
    // The following line converts the hash in hex to an array of 32 integers.
      // @ts-ignore
    const array = hash
      // @ts-ignore
      .replace('0x', '')
      // @ts-ignore
      .match(/.{2}/g)
      .map((hexNoPrefix) => BigNumber.from('0x' + hexNoPrefix).toNumber())
    
    if (array.length !== 32) {
      throw new Error('Hash of signature is not the correct size! Something went wrong!');
    }
    const identity = PrivateKey.fromRawEd25519Seed(Uint8Array.from(array))
    console.log(`Your VIP Key: ${identity.toString()}`)

    createNotification(identity);

    // Create a textile instance which will create or get the bucket assoicated with this user.
    // TODO: Store this instance in the global app state which will be used while minting NFTs.
    TextileInstance.setPrivateKey(identity);

    // Your app can now use this identity for generating a user Mailbox, Threads, Buckets, etc
    return identity
  }

  const createNotification = (identity: PrivateKey) => {
    const dispatchCustomEvent = createStandaloneToast();
    dispatchCustomEvent({ title: "Secret Key",
      status: "success",
      description: `Public Key: ${identity.public.toString()} Your app can now generate and reuse this users PrivateKey for creating user Mailboxes, Threads, and Buckets.`,
      duration: 9000,
      isClosable: true,
    });
  }

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <Button colorScheme="brand" variant="ghost" size="sm" onClick={onOpen}>
        Sign In
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="10px" h="400px">
          <ModalCloseButton />
          <ModalBody
            borderRadius="10px"
            bgGradient="linear(to-r, rgb(40, 92, 163), rgb(229, 1, 105))"
            h="800px"
          >
            <Flex alignItems="center" pt="2%" justifyContent="space-between">
              <Stack spacing={1}>
              <Image
                src="https://res.cloudinary.com/dyangxc7h/image/upload/v1623552244/creative/Creative_logo.png"
                alt="Creative Logo"
                width={100}
                height={100}
              />
              <Heading fontSize="2rem">CREATIVE</Heading>
              </Stack>
              <Container>
              <Stack spacing={6}>
                <Heading as="h6" size="md">Sign In</Heading>
                {/* name */}
                  <FormControl id="login" isRequired>
                  <FormLabel>Secret</FormLabel>
                    <InputGroup>
                      <Input
                        name="password"
                        placeholder="Password"
                        type={show ? "text" : "password"}
                        
                        onChange={handleChange}
                      />
                      <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                    </InputGroup>
                    <FormHelperText>Enter a VIP key. View console.</FormHelperText>
                    <Button onClick={generatePrivateKey}>Login with Metamask</Button>
                  </FormControl>
                </Stack>
                <Box>Don't Have An Account?
                  <Link href="#"> Sign Up Here</Link>
                </Box>
              </Container>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignIn;
