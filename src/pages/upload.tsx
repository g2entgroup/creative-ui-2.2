import React, { useState, useEffect } from "react";
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
    VStack,
    FormControl,
    FormLabel,
    Input,
    ButtonGroup,
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
    useToast,
    Spinner,
    AspectRatio,
    useDisclosure,
} from "@chakra-ui/react";
import { Contract, ethers, providers } from "ethers";
import { FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { TextileInstance } from "../services/textile/textile";
import AddAttributes from "../components/Attributes/AddAttributes";
import AttributesList from "../components/Attributes/AttributesList";
import { init } from "@textile/eth-storage";
import { BigNumber } from "ethers";
import { useEthers } from "@usedapp/core";
import { NFTMetadata } from "../services/textile/types";
import abi from "../contracts/YourCollectible.abi";
import address from "../contracts/YourCollectible.address";
import mime from "mime"

type WindowInstanceWithEthereum = Window &
    typeof globalThis & { ethereum?: providers.ExternalProvider };
class StrongType<Definition, Type> {
    // @ts-ignore
    private _type: Definition;
    constructor(public value?: Type) {}
}
export class EthereumAddress extends StrongType<"ethereum_address", string> {}

export default function Component() {
    const [nftUploaded, setNftUploaded] = useState(false);
    const [submitEnabled, setSubmitEnabled] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File>();
    const [extension, setExtension] = useState("");
    const [fileName, setFileName] = useState("");
    const [preview, setPreview] = useState("");
    const [spin, setSpin] = useState(false);

    const { account, library } = useEthers();

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log("submit handle func");
        // if (!(window as WindowInstanceWithEthereum).ethereum) {
        //     throw new Error(
        //         "Ethereum is not connected. Please download Metamask from https://metamask.io/download.html"
        //     );
        // }

        console.debug("Initializing web3 provider...");
        // @ts-ignore
        // const accounts = await (
        //     window as WindowInstanceWithEthereum
        // ).ethereum.request({ method: "eth_requestAccounts" });
        // if (accounts.length === 0) {
        //     throw new Error(
        //         "No account is provided. Please provide an account to this application."
        //     );
        // }
    };

    const { isOpen, onOpen, onClose } = useDisclosure();

    const toast = useToast();

    async function onFileUpload(values) {
        setSubmitEnabled(false);
        setSpin(true);
        console.log(JSON.stringify(values));

        const textileInstance = await TextileInstance.getInstance();

        console.log({ library, account })
        
        const contract = new Contract(address, abi, library.getSigner());

        console.log({contract})

        const nftMetadata: NFTMetadata = await textileInstance.uploadNFT(
            selectedFile,
            values.name,
            values.description,
            values.attributes,
        );

        await textileInstance.addNFTToUserCollection(nftMetadata);

        const all: NFTMetadata[] = await textileInstance.getAllUserNFTs();

        if (nftMetadata != undefined) {
            setNftUploaded(true);
            setSpin(false);
            toast({
                title: "Submitted!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }

        const tokenId = await contract.mintItem(
            library.getSigner().getAddress(),
            `https://ipfs.io/ipfs/${nftMetadata.cid}`
        );

        console.log("tokenID: " + tokenId);
        console.log("NFTMetadata : " + nftMetadata);
        console.log("NFTMetadata[]: " + all);
    }

    async function saveOnFileCoin(values) {
        setSubmitEnabled(false);
        setSpin(true);

        const provider = new providers.Web3Provider(
            (window as WindowInstanceWithEthereum).ethereum
        );

        const storage = await init(provider.getSigner());
        const textileInstance = await TextileInstance.getInstance();
        const nftMetadata = await textileInstance.uploadNFT(
            selectedFile,
            values.name,
            values.description,
            values.addAttributes
        );

        let metadataRes;

        if (await storage.hasDeposit()) {
            metadataRes = await textileInstance.uploadTokenMetadata(
                storage,
                nftMetadata
            );
        } else {
            await storage.addDeposit();
            metadataRes = await textileInstance.uploadTokenMetadata(
                storage,
                nftMetadata
            );
        }

        console.log(metadataRes);

        await textileInstance.addNFTToUserCollection(nftMetadata);

        setSpin(false);

        return nftMetadata;
    }

    const attributesList = [];

    const [attributes, setAttributes] = useState(attributesList);

    function deleteAttribute(id) {
        const newAttributes = attributes.filter((item) => {
            return item.id !== id;
        });
        setAttributes(newAttributes);
        console.log(newAttributes);
    }

    function addAttribute(newAttribute) {
        setAttributes([...attributes, newAttribute]);
    }

    const onFileChange = async (event) => {
        const file = ((event.target as HTMLInputElement).files as FileList)[0];
        const sFileName = file.name;
        const sFileExtension = sFileName
            .split(".")
            [sFileName.split(".").length - 1].toLowerCase();

        if (
            !(
                sFileExtension === "jpg" ||
                sFileExtension === "mp4" ||
                sFileExtension === "gif" ||
                sFileExtension === "png" ||
                sFileExtension === "gltf" ||
                sFileExtension === "glb" ||
                sFileExtension === "mov"
            ) ||
            file.size > 5368709120
        ) {
            alert("Please upload an image that has a max size of 5 GB");
            return;
        }

        setSelectedFile(file);
        setFileName(sFileName);
        setExtension(sFileExtension);
        setSubmitEnabled(true);
    };
    // TODO: Use this to list your threadDB collections
    const list = async (client: TextileInstance["client"]) => {
        const threads = await client.listThreads();
        return threads;
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
                            <Heading
                                fontSize="lg"
                                fontWeight="md"
                                lineHeight="6"
                                color={useColorModeValue("gray.700", "gray.50")}
                            >
                                Upload NFT
                            </Heading>
                            <Text
                                mt={1}
                                fontSize="sm"
                                color={useColorModeValue(
                                    "gray.600",
                                    "gray.400"
                                )}
                            >
                                This information will be displayed publicly so
                                be careful what you share.
                            </Text>
                        </Box>
                    </GridItem>
                    <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                        <chakra.form
                            onSubmit={handleSubmit(onFileUpload)}
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
                                <SimpleGrid columns={2} spacing={6}>
                                    <FormControl
                                        id="creator"
                                        as={GridItem}
                                        colSpan={[3, 2]}
                                    >
                                        <FormLabel
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                        >
                                            Creator
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                            placeholder="thecreative.eth"
                                            {...register("creator")}
                                        />
                                    </FormControl>
                                    <FormControl
                                        id="name"
                                        as={GridItem}
                                        colSpan={[3, 2]}
                                    >
                                        <FormLabel
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                        >
                                            NFT Title
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                            placeholder="NFT Creature"
                                            {...register("name")}
                                        />
                                    </FormControl>
                                    <FormControl
                                        id="description"
                                        as={GridItem}
                                        colSpan={[3, 2]}
                                    >
                                        <FormLabel
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                        >
                                            NFT Description
                                        </FormLabel>
                                        <Textarea
                                            placeholder="Friendly NFT Creature that enjoys long swims in the ocean."
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                            {...register("description")}
                                        />
                                    </FormControl>
                                    <Box
                                        id="attributes"
                                        as={GridItem}
                                        colSpan={[3, 2]}
                                    >
                                        <AttributesList
                                            attributes={attributes}
                                            deleteAttribute={deleteAttribute}
                                            {...register("attributes")}
                                        />
                                        <AddAttributes
                                            addAttributes={addAttribute}
                                        />
                                    </Box>

                                    <FormControl
                                        id="album"
                                        as={GridItem}
                                        colSpan={[3, 2]}
                                    >
                                        <FormLabel
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                        >
                                            Select Collection
                                        </FormLabel>
                                        <Select
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                            placeholder="Select Album"
                                        >
                                            <option>Album 1</option>
                                            <option>Album 2</option>
                                        </Select>
                                    </FormControl>
                                    {/*<FormControl id="privacy" as={GridItem} colSpan={[3, 2]}>
                <FormLabel>Privacy</FormLabel>
                <Select placeholder="Select privacy">
                    <option>Public</option>
                    <option>Protected</option>
                    <option>Private</option>
                </Select>
                </FormControl> */}
                                </SimpleGrid>

                                <FormControl>
                                    <FormLabel
                                        fontSize="sm"
                                        fontWeight="md"
                                        color={useColorModeValue(
                                            "gray.700",
                                            "gray.50"
                                        )}
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
                                        borderColor={useColorModeValue(
                                            "gray.300",
                                            "gray.500"
                                        )}
                                        borderStyle="dashed"
                                        rounded="md"
                                    >
                                        <VStack spacing={1} textAlign="center">
                                            <Icon
                                                mx="auto"
                                                boxSize={12}
                                                color={useColorModeValue(
                                                    "gray.400",
                                                    "gray.500"
                                                )}
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
                                                color={useColorModeValue(
                                                    "gray.600",
                                                    "gray.400"
                                                )}
                                                alignItems="baseline"
                                            >
                                                <chakra.label
                                                    htmlFor="file-upload"
                                                    cursor="pointer"
                                                    rounded="md"
                                                    fontSize="md"
                                                    color={useColorModeValue(
                                                        "brand.600",
                                                        "brand.200"
                                                    )}
                                                    pos="relative"
                                                    _hover={{
                                                        color: useColorModeValue(
                                                            "brand.400",
                                                            "brand.300"
                                                        ),
                                                    }}
                                                >
                                                    <span>Upload a file</span>
                                                    <VisuallyHidden>
                                                        <input
                                                            id="file-upload"
                                                            name="file-upload"
                                                            type="file"
                                                            onChange={
                                                                onFileChange
                                                            }
                                                        />
                                                    </VisuallyHidden>
                                                </chakra.label>
                                                <Text pl={1}>
                                                    or drag and drop
                                                </Text>
                                            </Flex>
                                            <Text
                                                fontSize="xs"
                                                color={useColorModeValue(
                                                    "gray.500",
                                                    "gray.50"
                                                )}
                                            >
                                                PNG, JPG, GIF, GLTF, GLB, MP4,
                                                MOV, 5 GB max
                                            </Text>
                                        </VStack>
                                    </Flex>
                                    <Flex
                                        mt={1}
                                        justify="center"
                                        px={6}
                                        pt={5}
                                        pb={6}
                                    >
                                        {(selectedFile &&
                                            extension === "png") ||
                                        extension === "jpg" ||
                                        extension === "gif" ? (
                                            <img src={preview} />
                                        ) : (selectedFile &&
                                              extension === "mov") ||
                                          extension === "mp4" ? (
                                            <video controls width="50%">
                                                <source
                                                    src={preview}
                                                    type={`video/${extension}`}
                                                />
                                                Sorry, your browser doesn't
                                                support embedded videos.
                                            </video>
                                        ) : (
                                            ""
                                        )}
                                    </Flex>
                                </FormControl>
                            </Stack>
                            <Box
                                px={{ base: 4, sm: 6 }}
                                py={3}
                                bg={useColorModeValue("gray.50", "gray.900")}
                                textAlign="right"
                            >
                                {spin ? (
                                    <Button
                                        isLoading
                                        color={useColorModeValue(
                                            "gray.700",
                                            "white"
                                        )}
                                        fontWeight="md"
                                        loadingText="Loading"
                                        spinnerPlacement="end"
                                    >
                                        Create
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        disabled={!submitEnabled}
                                        color={useColorModeValue(
                                            "gray.700",
                                            "white"
                                        )}
                                        fontWeight="md"
                                    >
                                        Create
                                    </Button>
                                )}
                            </Box>
                        </chakra.form>
                    </GridItem>
                </SimpleGrid>
            </Box>
        </Box>
    );
}
