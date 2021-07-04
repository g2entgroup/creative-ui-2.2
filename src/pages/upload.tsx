import React, {useState} from "react";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Heading,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  FormHelperText,
  Textarea,
  Avatar,
  Icon,
  Button,
  VisuallyHidden,
  Select,
  Checkbox,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { providers } from 'ethers'
import { FaUser } from "react-icons/fa";
import { TextileInstance } from "../services/textile/textile";
type WindowInstanceWithEthereum = Window & typeof globalThis & { ethereum?: providers.ExternalProvider };
  class StrongType<Definition, Type> {
    // @ts-ignore
    private _type: Definition;
    constructor(public value?: Type) {}
  }
  export class EthereumAddress extends StrongType<'ethereum_address', string> {}
export default function Component() {
    

    const [nftUploaded , setNftUploaded] = useState(false)
    const [submitEnabled, setSubmitEnabled] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File>();

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log("submit handle func")
        if (!(window as WindowInstanceWithEthereum).ethereum) {
          throw new Error(
            'Ethereum is not connected. Please download Metamask from https://metamask.io/download.html'
          );
        }
    
        console.debug('Initializing web3 provider...');
        // @ts-ignore
        const provider = new providers.Web3Provider((window as WindowInstanceWithEthereum).ethereum);
  
        const accounts = await (window as WindowInstanceWithEthereum).ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length === 0) {
          throw new Error('No account is provided. Please provide an account to this application.');
        }
    }

    let nftMetadata
    const onFileUpload = async event => {
        event.preventDefault();
        setSubmitEnabled(false);

        const textileInstance = await TextileInstance.getInstance();
        nftMetadata = await textileInstance.uploadNFT(selectedFile);
        await textileInstance.uploadTokenMetadata(nftMetadata);
        await textileInstance.addNFTToUserCollection(nftMetadata);

      if (nftMetadata != undefined) { setNftUploaded(true) }
      console.log(nftMetadata);
    }

    const onFileChange = async event => {
        const file = ((event.target as HTMLInputElement).files as FileList)[0];
        if (file.size > 20460000) {
          alert("Please upload an image that has a max size of 20 MB");
          return;
        }
    
        setSelectedFile(file);
        setSubmitEnabled(true);
      };

  return (
    <Box bg={useColorModeValue("gray.200", "inherit")} p={10}>
      <Box>
        <SimpleGrid
          display={{ base: "initial", md: "grid" }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}
        >
          <GridItem colSpan={{ md: 1 }}>
            <Box px={[4, 0]}>
              <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                Upload NFT
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                This information will be displayed publicly so be careful what
                you share.
              </Text>
            </Box>
          </GridItem>
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            <chakra.form
                onSubmit={onFileUpload}
              method="POST"
              shadow="base"
              rounded={[null, "md"]}
              overflow={{ sm: "hidden" }}
            >
              <Stack
                px={4}
                py={5}
                bg={useColorModeValue("white", "gray.700")}
                spacing={6}
                p={{ sm: 6 }}
              >
                <SimpleGrid columns={3} spacing={6}>
                  
                  <FormControl id="nfttitle" as={GridItem} colSpan={[3, 2]}>
                <FormLabel>NFT Title</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="creatorname" as={GridItem} colSpan={[3, 2]} >
                <FormLabel>Creator name</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="album" as={GridItem} colSpan={[3, 2]}>
                <FormLabel>Select Collection</FormLabel>
                <Select placeholder="Select Album">
                    <option>Album 1</option>
                    <option>Album 2</option>
                </Select>
                </FormControl>
                <FormControl id="privacy" as={GridItem} colSpan={[3, 2]}>
                <FormLabel>Privacy</FormLabel>
                <Select placeholder="Select privacy">
                    <option>Public</option>
                    <option>Protected</option>
                    <option>Private</option>
                </Select>
                </FormControl>
                </SimpleGrid>

                
                <FormControl>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    Cover photo
                  </FormLabel>
                  <Flex
                    mt={1}
                    justify="center"
                    px={6}
                    pt={5}
                    pb={6}
                    borderWidth={2}
                    borderColor={useColorModeValue("gray.300", "gray.500")}
                    borderStyle="dashed"
                    rounded="md"
                  >
                    <Stack spacing={1} textAlign="center">
                      <Icon
                        mx="auto"
                        boxSize={12}
                        color={useColorModeValue("gray.400", "gray.500")}
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                      </Icon>
                      <Flex
                        fontSize="sm"
                        color={useColorModeValue("gray.600", "gray.400")}
                        alignItems="baseline"
                      >
                        <chakra.label
                          for="file-upload"
                          cursor="pointer"
                          rounded="md"
                          fontSize="md"
                          color={useColorModeValue("brand.600", "brand.200")}
                          pos="relative"
                          _hover={{
                            color: useColorModeValue("brand.400", "brand.300"),
                          }}
                        >
                          <span>Upload a file</span>
                          <VisuallyHidden>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              onChange={onFileChange}
                            />
                          </VisuallyHidden>
                        </chakra.label>
                        <Text pl={1}>or drag and drop</Text>
                      </Flex>
                      <Text
                        fontSize="xs"
                        color={useColorModeValue("gray.500", "gray.50")}
                      >
                        PNG, JPG, GIF up to 10MB
                      </Text>
                    </Stack>
                  </Flex>
                </FormControl>
              </Stack>
              <Box
                px={{ base: 4, sm: 6 }}
                py={3}
                bg={useColorModeValue("gray.50", "gray.900")}
                textAlign="right"
              >
                <Button
                  type="submit"
                  disabled={!submitEnabled}
                  colorScheme="brand"
                  fontWeight="md"
                >
                  Create
                </Button>
              </Box>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
      </Box>

    </Box>
  );
}