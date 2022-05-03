import React, { CSSProperties, useEffect, useState } from "react";
import {
    chakra,
    Box,
    Checkbox,
    Flex,
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
    InputLeftElement,
    FormHelperText,
    Textarea,
    Button,
    Select,
    Radio,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { ContractFactory, ethers } from "ethers";
import { setup, isSupported } from "@loomhq/record-sdk";
import { oembed } from "@loomhq/loom-embed";
import { TextileInstance } from "src/services/textile/textile";
import { Avatar, Icon, useColorModeValue } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { useEthers } from "@usedapp/core";
import {
    CampaignMetadata,
    CampaignSettings,
    PoolMetadata,
} from "src/services/textile/types";

const abi = require("../contracts/Pool.abi");
const bytecode = require("../contracts/Pool.bytecode");

const API_KEY = process.env.NEXT_PUBLIC_LOOM;
const BUTTON_ID = "loom-sdk-button";

export default function Component(props) {
    const [videoHTML, setVideoHTML] = useState("");
    const [textile, setTextile] = useState(null);

    const { account, library } = useEthers();

    const campaignForm = useFormik({
        initialValues: {
            _id: "",
            name: "",
            brandName: "",
            brandWebsite: "",
            twitterAccount: "",
            campaignBrief: "",
            campaignImageURI: "",
            record: "0",
            image: "",
            activePoolId: "",
            previousPools: [""],
            ownerAddress: "",
        },
        onSubmit: (values: CampaignMetadata) => {
            handleSaveCampaignDetails(values);
        },
    });
    const poolForm = useFormik({
        initialValues: {
            _id: "",
            poolAddress: "",
            filename: "",
            updatedAt: "",
            poolName: "",
            capital: 0,
            capitalAddress: "",
            email: "",
            country: "",
            nftAddress: "",
            votingLength: 0,
            decisionLength: 0,
            submissionLength: 0,
        },
        onSubmit: (values: PoolMetadata) => {
            handleSavePoolDetails(values);
        },
    });
    const preferencesForm = useFormik({
        initialValues: {
            _id: "",
            campaignName: "",
            updatedAt: "",
            filename: "",
            email: [],
            push: "0",
        },
        onSubmit: (values: CampaignSettings) => {
            handleSaveNotificationPreferences(values);
        },
    });

    const [files, setFiles] = useState([]);

    const imgUploadContainer: CSSProperties = {
        marginLeft: "0.25rem",
    };

    const dropzoneContainer: CSSProperties = {
        width: "450px",
        height: "107px",
        display: "flex",
        justifyItems: "start",
        alignItems: "start",
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='grey' stroke-width='3' stroke-dasharray='2%2c 6' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
    };

    const dropzone: CSSProperties = {
        marginTop: "2px",
        padding: "auto",
        display: "flex",
        justifyContent: "start",
        alignContent: "start",
        alignItems: "center",
        justifyItems: "center",
        background: "#FAFAFA",
        width: "446px",
        height: "103px",
        marginLeft: "2px",
        paddingLeft: "1rem",
    };

    const thumbsContainer: CSSProperties = {
        width: "450px",
        marginBottom: "0.5rem",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
    };

    const thumbLabel: CSSProperties = {
        marginLeft: "0.75rem",
        marginRight: "1.25rem",
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
    });

    useEffect(() => {
        async function setupLoom() {
            const { supported, error } = await isSupported();
            if (!supported) {
                console.warn(`Error setting up Loom: ${error}`);
                return;
            }
            const button = document.getElementById(BUTTON_ID);
            if (!button) {
                return;
            }
            const { configureButton } = await setup({
                apiKey: API_KEY,
            });
            const sdkButton = configureButton({ element: button });
            sdkButton.on("insert-click", async (video) => {
                const { html } = await oembed(video.sharedUrl, { width: 400 });
                setVideoHTML(html);
            });
        }
        setupLoom();
        setTextile(TextileInstance.getInstance());
    }, []);

    useEffect(() => {
        const fetchCampaignAndPool = async () => {
            const textileInstance = await TextileInstance.getInstance();
            const userCampaign: CampaignMetadata | any =
                await textileInstance.getActiveUserCampaign();
            console.log(userCampaign);
            if (userCampaign) {
                campaignForm.setValues(userCampaign);
                const campaignPreferences: CampaignSettings | any =
                    await textileInstance.getCampaignPreferences(
                        userCampaign._id
                    );
                const activePool: PoolMetadata | any =
                    await textileInstance.getActiveCampaignPool(
                        userCampaign._id
                    );
                if (campaignPreferences) {
                    preferencesForm.setValues(campaignPreferences);
                }
                if (activePool) {
                    poolForm.setValues(activePool);
                }
                console.log({
                    campaignPreferences,
                    activePool,
                });
            }
        };
        fetchCampaignAndPool();
    }, []);

    const handleSaveCampaignDetails = async (values: CampaignMetadata) => {
        const textileInstance = await TextileInstance.getInstance();

        const campaignMetadata = await textileInstance.uploadCampaignMetadata(
            {
                ...values,
                record: values.record === "0" ? false : true,
            },
            files[0]
        );

        console.log(campaignMetadata);

        await textileInstance.addCampaign(campaignMetadata, account);

        campaignForm.setValues(campaignMetadata);
    };

    const handleSavePoolDetails = async (values: PoolMetadata) => {
        const signer = await library.getSigner();

        const pool = {
            ...values,
        };

        const poolFactory = new ContractFactory(abi, bytecode, signer);

        console.log({ pool, poolFactory });

        const contract = await poolFactory.deploy(
            pool.poolName,
            campaignForm.values.name,
            ethers.BigNumber.from(pool.capital),
            ethers.utils.getAddress(pool.capitalAddress),
            ethers.utils.getAddress(pool.nftAddress),
            ethers.utils.getAddress(account),
            ethers.utils.getAddress(
                "0xa6047358BE012197C2876cF82127e050b6639cF2"
            ),
            ethers.BigNumber.from(1209600000),
            ethers.BigNumber.from(pool.votingLength),
            ethers.BigNumber.from(pool.decisionLength),
            ethers.BigNumber.from(pool.submissionLength)
        );

        const poolMetadata = await textile.uploadPoolMetadata({
            poolAddress: contract.address,
            ...pool,
        });

        const textileInstance = await TextileInstance.getInstance();

        await textileInstance.uploadAndSetCampaignPool(
            campaignForm.values._id,
            poolMetadata
        );

        poolForm.setValues(poolMetadata);
    };

    const handleSaveNotificationPreferences = async (
        values: CampaignSettings
    ) => {
        const textileInstance = await TextileInstance.getInstance();

        const preferenceMetadata =
            await textileInstance.uploadCampaignPreferences({
                ...values,
            });

        await textileInstance.setCampaignPreferences(
            campaignForm.values._id,
            preferenceMetadata
        );

        preferencesForm.setValues(preferenceMetadata);
    };

    return (
        <Box bg={useColorModeValue("gray.50", "inherit")} p={10}>
            <Text
                as="h1"
                fontSize="4xl"
                fontStyle="bold"
                mb={10}
                color={useColorModeValue("gray.600", "gray.400")}
            >
                Create Campaign
            </Text>

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
                                color={useColorModeValue(
                                    "gray.600",
                                    "gray.400"
                                )}
                            >
                                Create A New Campaign
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
                        <form
                            //ONSUBMIT CHECKPOINT
                            method="POST"
                            // shadow="base"
                            // rounded={[null, "md"]}
                            // overflow={{ sm: "hidden" }}
                            onSubmit={campaignForm.handleSubmit}
                        >
                            <Stack
                                px={4}
                                py={5}
                                bg={useColorModeValue("white", "gray.700")}
                                spacing={6}
                                p={{ sm: 6 }}
                            >
                                <SimpleGrid columns={3} spacing={6}>
                                    <FormControl as={GridItem} colSpan={[3, 2]}>
                                        <FormLabel
                                            fontSize="sm"
                                            fontWeight="md"
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                            htmlFor="brandName"
                                        >
                                            Brand Name
                                        </FormLabel>
                                        <Input
                                            value={
                                                campaignForm.values.brandName
                                            }
                                            onChange={campaignForm.handleChange}
                                            type="text"
                                            placeholder="Company Name"
                                            id="brandName"
                                            name="brandName"
                                            focusBorderColor="brand.400"
                                            rounded="md"
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                        />
                                    </FormControl>
                                </SimpleGrid>
                                <SimpleGrid columns={3} spacing={6}>
                                    <FormControl as={GridItem} colSpan={[3, 2]}>
                                        <FormLabel
                                            fontSize="sm"
                                            fontWeight="md"
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                        >
                                            Brand Website
                                        </FormLabel>
                                        <InputGroup size="sm">
                                            <InputLeftAddon
                                                children="https://"
                                                bg={useColorModeValue(
                                                    "gray.50",
                                                    "gray.800"
                                                )}
                                                color={useColorModeValue(
                                                    "gray.500",
                                                    "gay.50"
                                                )}
                                                rounded="md"
                                            />
                                            <Input
                                                value={
                                                    campaignForm.values
                                                        .brandWebsite
                                                }
                                                onChange={
                                                    campaignForm.handleChange
                                                }
                                                type="text"
                                                placeholder="www.example.com"
                                                id="brandWebsite"
                                                name="brandWebsite"
                                                focusBorderColor="brand.400"
                                                rounded="md"
                                                color={useColorModeValue(
                                                    "gray.700",
                                                    "gray.50"
                                                )}
                                            />
                                        </InputGroup>
                                    </FormControl>
                                </SimpleGrid>

                                <SimpleGrid columns={3} spacing={6}>
                                    <FormControl as={GridItem} colSpan={[3, 2]}>
                                        <FormLabel
                                            fontSize="sm"
                                            fontWeight="md"
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                        >
                                            Twitter Username
                                        </FormLabel>
                                        <InputGroup size="sm">
                                            <InputLeftAddon
                                                children="@"
                                                bg={useColorModeValue(
                                                    "gray.50",
                                                    "gray.800"
                                                )}
                                                color={useColorModeValue(
                                                    "gray.500",
                                                    "gay.50"
                                                )}
                                                rounded="md"
                                            />
                                            <Input
                                                value={
                                                    campaignForm.values
                                                        .twitterAccount
                                                }
                                                onChange={
                                                    campaignForm.handleChange
                                                }
                                                id="twitterAccount"
                                                name="twitterAccount"
                                                placeholder="creativecrtv"
                                                focusBorderColor="brand.400"
                                                rounded="md"
                                                color={useColorModeValue(
                                                    "gray.700",
                                                    "gray.50"
                                                )}
                                            />
                                        </InputGroup>
                                        <FormHelperText>
                                            Verify your account via Twitter (0.1
                                            LINK).
                                        </FormHelperText>
                                    </FormControl>
                                </SimpleGrid>

                                <div>
                                    <FormControl id="email" mt={1}>
                                        <FormLabel
                                            fontSize="sm"
                                            fontWeight="md"
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                        >
                                            Campaign Brief
                                        </FormLabel>
                                        <Textarea
                                            value={
                                                campaignForm.values
                                                    .campaignBrief
                                            }
                                            onChange={campaignForm.handleChange}
                                            id="campaignBrief"
                                            name="campaignBrief"
                                            placeholder="Additional information about your campaign"
                                            mt={1}
                                            rows={3}
                                            shadow="sm"
                                            focusBorderColor="brand.400"
                                            fontSize={{
                                                sm: "sm",
                                            }}
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                        />
                                        <FormHelperText>
                                            Brief description for your
                                            requirements. URLs are hyperlinked.
                                        </FormHelperText>
                                    </FormControl>
                                </div>

                                <FormControl>
                                    <FormLabel
                                        fontSize="sm"
                                        fontWeight="md"
                                        color={useColorModeValue(
                                            "gray.700",
                                            "gray.50"
                                        )}
                                    >
                                        Photo / Logo
                                    </FormLabel>
                                    <div
                                        style={
                                            imgUploadContainer as CSSProperties
                                        }
                                    >
                                        <aside
                                            style={
                                                thumbsContainer as CSSProperties
                                            }
                                        >
                                            {files.map((f) => (
                                                <>
                                                    <Avatar
                                                        size="md"
                                                        ml={5}
                                                        src={f.preview}
                                                    />
                                                    <p
                                                        style={
                                                            thumbLabel as CSSProperties
                                                        }
                                                    >
                                                        {f.name} -{" "}
                                                        {Math.floor(
                                                            Math.log(f.size) /
                                                                Math.log(1024)
                                                        )}
                                                        mb
                                                    </p>
                                                </>
                                            ))}
                                        </aside>

                                        <div style={dropzoneContainer}>
                                            <div
                                                {...getRootProps({
                                                    className: "dropzone",
                                                })}
                                                style={dropzone}
                                            >
                                                <input {...getInputProps()} />
                                                <p>
                                                    Drag 'n' drop some files
                                                    here, or click to select
                                                    files
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </FormControl>

                                <FormControl>
                                    <FormLabel
                                        fontSize="sm"
                                        fontWeight="md"
                                        color={useColorModeValue(
                                            "gray.700",
                                            "gray.50"
                                        )}
                                    >
                                        Record Campaign Details
                                    </FormLabel>
                                    <label>Record</label>
                                    <input
                                        id="record"
                                        name="record"
                                        type="radio"
                                        value="1"
                                        checked={
                                            campaignForm.values.record !== "0"
                                        }
                                        onClick={() => {
                                            campaignForm.setFieldValue(
                                                "record",
                                                campaignForm.values.record ===
                                                    "0"
                                                    ? "1"
                                                    : "0"
                                            );
                                        }}
                                        style={{
                                            paddingBottom: "0.05rem",
                                            marginLeft: "0.5rem",
                                        }}
                                        color={useColorModeValue(
                                            "gray.700",
                                            "gray.700"
                                        )}
                                    ></input>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: videoHTML,
                                        }}
                                    />
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
                                    colorScheme="brand"
                                    _focus={{ shadow: "" }}
                                    fontWeight="md"
                                    color={useColorModeValue(
                                        "gray.700",
                                        "gray.50"
                                    )}
                                    // onClick={handleSaveCampaignDetails}
                                >
                                    Save
                                </Button>
                            </Box>
                        </form>
                    </GridItem>
                </SimpleGrid>
            </Box>
            <Box
                visibility={{ base: "hidden", sm: "visible" }}
                aria-hidden="true"
            >
                <Box py={5}>
                    <Box
                        borderTop="solid 1px"
                        borderTopColor={useColorModeValue(
                            "gray.200",
                            "whiteAlpha.200"
                        )}
                    ></Box>
                </Box>
            </Box>

            <Box mt={[10, 0]}>
                <SimpleGrid
                    display={{ base: "initial", md: "grid" }}
                    columns={{ md: 3 }}
                    spacing={{ md: 6 }}
                >
                    <GridItem colSpan={{ md: 1 }}>
                        <Box px={[4, 0]}>
                            <Heading
                                fontSize="lg"
                                fontWeight="medium"
                                lineHeight="6"
                                color={useColorModeValue(
                                    "gray.600",
                                    "gray.400"
                                )}
                            >
                                Pool Information
                            </Heading>
                            <Text
                                mt={1}
                                fontSize="sm"
                                color={useColorModeValue(
                                    "gray.600",
                                    "gray.400"
                                )}
                            >
                                Details and Contact info for the pool.
                            </Text>
                        </Box>
                    </GridItem>
                    <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                        <form
                            method="POST"
                            // shadow="base"
                            // rounded={[null, "md"]}
                            // overflow={{ sm: "hidden" }}
                        >
                            <Stack
                                px={4}
                                py={5}
                                p={[null, 6]}
                                bg={useColorModeValue("white", "gray.700")}
                                spacing={6}
                            >
                                <SimpleGrid columns={6} spacing={6}>
                                    <FormControl as={GridItem} colSpan={[6, 3]}>
                                        <FormLabel
                                            fontSize="sm"
                                            fontWeight="md"
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                        >
                                            Pool name
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            value={poolForm.values.poolName}
                                            onChange={poolForm.handleChange}
                                            name="poolName"
                                            id="poolName"
                                            autoComplete="given-name"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                        />
                                    </FormControl>
                                    <FormControl as={GridItem} colSpan={[6, 3]}>
                                        <FormLabel
                                            fontSize="sm"
                                            fontWeight="md"
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                        >
                                            Capital
                                        </FormLabel>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                                color="gray.300"
                                                fontSize="1.2em"
                                                children="$"
                                            />
                                            <Input
                                                type="text"
                                                value={poolForm.values.capital}
                                                onChange={poolForm.handleChange}
                                                name="capital"
                                                id="capital"
                                                autoComplete="given-name"
                                                mt={1}
                                                focusBorderColor="brand.400"
                                                shadow="sm"
                                                size="sm"
                                                w="full"
                                                rounded="md"
                                                color={useColorModeValue(
                                                    "gray.700",
                                                    "gray.50"
                                                )}
                                            />
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl as={GridItem} colSpan={[6, 4]}>
                                        <FormLabel
                                            fontSize="sm"
                                            fontWeight="md"
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                        >
                                            Capital Address
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            value={
                                                poolForm.values.capitalAddress
                                            }
                                            onChange={poolForm.handleChange}
                                            name="capitalAddress"
                                            id="capitalAddress"
                                            autoComplete="given-name"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                        />
                                    </FormControl>
                                    <FormControl as={GridItem} colSpan={[6, 4]}>
                                        <FormLabel
                                            htmlFor="emailAddress"
                                            fontSize="sm"
                                            fontWeight="md"
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                        >
                                            Email address
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            value={poolForm.values.email}
                                            onChange={poolForm.handleChange}
                                            name="emailAddress"
                                            id="emailAddress"
                                            autoComplete="email"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                        />
                                    </FormControl>
                                    <FormControl as={GridItem} colSpan={[6, 3]}>
                                        <FormLabel
                                            htmlFor="country"
                                            fontSize="sm"
                                            fontWeight="md"
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                        >
                                            Country / Region
                                        </FormLabel>
                                        <Select
                                            id="country"
                                            name="country"
                                            autoComplete="country"
                                            value={poolForm.values.country}
                                            placeholder="Select option"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                        >
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>Mexico</option>
                                            <option>India</option>
                                        </Select>
                                    </FormControl>
                                    <FormControl as={GridItem} colSpan={6}>
                                        <FormLabel
                                            htmlFor="nftAddress"
                                            fontSize="sm"
                                            fontWeight="md"
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                        >
                                            NFT address
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            value={poolForm.values.nftAddress}
                                            name="nftAddress"
                                            id="nftAddress"
                                            autoComplete="nft-address"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                        />
                                    </FormControl>
                                    <FormControl
                                        as={GridItem}
                                        colSpan={[6, 6, null, 2]}
                                    >
                                        <FormLabel
                                            htmlFor="votingLength"
                                            fontSize="sm"
                                            fontWeight="md"
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                        >
                                            Voting Length
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            value={poolForm.values.votingLength}
                                            name="votingLength"
                                            id="votingLength"
                                            autoComplete="number"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                        />
                                    </FormControl>
                                    <FormControl
                                        as={GridItem}
                                        colSpan={[6, 3, null, 2]}
                                    >
                                        <FormLabel
                                            htmlFor="decisionLength"
                                            fontSize="sm"
                                            fontWeight="md"
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                        >
                                            Decision Length
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            value={
                                                poolForm.values.decisionLength
                                            }
                                            name="decisionLength"
                                            id="decisionLength"
                                            autoComplete="decisionLength"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                        />
                                    </FormControl>
                                    <FormControl
                                        as={GridItem}
                                        colSpan={[6, 3, null, 2]}
                                    >
                                        <FormLabel
                                            htmlFor="submissionLength"
                                            fontSize="sm"
                                            fontWeight="md"
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                        >
                                            Submission Length
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            value={
                                                poolForm.values.submissionLength
                                            }
                                            name="submissionLength"
                                            id="submissionLength"
                                            autoComplete="submissionLength"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            color={useColorModeValue(
                                                "gray.700",
                                                "gray.50"
                                            )}
                                        />
                                    </FormControl>
                                </SimpleGrid>
                            </Stack>
                            <Box
                                px={{ base: 4, sm: 6 }}
                                py={3}
                                bg={useColorModeValue("gray.50", "gray.900")}
                                textAlign="right"
                            >
                                <Button
                                    type="submit"
                                    colorScheme="brand"
                                    _focus={{ shadow: "" }}
                                    fontWeight="md"
                                    color={useColorModeValue(
                                        "gray.700",
                                        "gray.50"
                                    )}
                                >
                                    Save
                                </Button>
                            </Box>
                        </form>
                    </GridItem>
                </SimpleGrid>
            </Box>

            <Box
                visibility={{ base: "hidden", sm: "visible" }}
                aria-hidden="true"
            >
                <Box py={5}>
                    <Box
                        borderTop="solid 1px"
                        borderTopColor={useColorModeValue(
                            "gray.200",
                            "whiteAlpha.200"
                        )}
                    ></Box>
                </Box>
            </Box>

            <Box mt={[10, 0]}>
                <SimpleGrid
                    display={{ base: "initial", md: "grid" }}
                    columns={{ md: 3 }}
                    spacing={{ md: 6 }}
                >
                    <GridItem colSpan={{ md: 1 }}>
                        <Box px={[4, 0]}>
                            <Heading
                                fontSize="lg"
                                fontWeight="medium"
                                lineHeight="6"
                                color={useColorModeValue(
                                    "gray.600",
                                    "gray.400"
                                )}
                            >
                                Notifications
                            </Heading>
                            <Text
                                mt={1}
                                fontSize="sm"
                                color={useColorModeValue(
                                    "gray.600",
                                    "gray.400"
                                )}
                            >
                                Decide which communications you'd like to
                                receive and how.
                            </Text>
                        </Box>
                    </GridItem>
                    <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                        <form
                            method="POST"
                            // shadow="base"
                            // rounded={[null, "md"]}
                            // overflow={{ sm: "hidden" }}
                            onSubmit={preferencesForm.handleSubmit}
                        >
                            <Stack
                                px={4}
                                py={5}
                                p={[null, 6]}
                                bg={useColorModeValue("white", "gray.700")}
                                spacing={6}
                            >
                                <Box
                                    as="legend"
                                    fontSize="md"
                                    color={useColorModeValue(
                                        "gray.900",
                                        "gray.50"
                                    )}
                                >
                                    By Email
                                </Box>
                                <Stack mt={4} spacing={4}>
                                    <Flex alignItems="start">
                                        <Flex alignItems="center" h={5}>
                                            <input
                                                type="checkbox"
                                                name="email"
                                                value="comments"
                                                onChange={
                                                    preferencesForm.handleChange
                                                }
                                            ></input>
                                        </Flex>
                                        <Box ml={3} fontSize="sm">
                                            <chakra.label
                                                fontWeight="md"
                                                color={useColorModeValue(
                                                    "gray.700",
                                                    "gray.50"
                                                )}
                                            >
                                                Comments
                                            </chakra.label>
                                            <Text
                                                color={useColorModeValue(
                                                    "gray.500",
                                                    "gray.400"
                                                )}
                                            >
                                                Get notified when someones posts
                                                a comment on a posting.
                                            </Text>
                                        </Box>
                                    </Flex>
                                    <Flex alignItems="start">
                                        <Flex alignItems="center" h={5}>
                                            <input
                                                type="checkbox"
                                                name="email"
                                                value="candidates"
                                            ></input>
                                        </Flex>
                                        <Box ml={3} fontSize="sm">
                                            <chakra.label
                                                htmlFor="candidates"
                                                fontWeight="md"
                                                color={useColorModeValue(
                                                    "gray.700",
                                                    "gray.50"
                                                )}
                                            >
                                                Creatives
                                            </chakra.label>
                                            <Text
                                                color={useColorModeValue(
                                                    "gray.500",
                                                    "gray.400"
                                                )}
                                            >
                                                Get notified when a creative
                                                applies for your campaign.
                                            </Text>
                                        </Box>
                                    </Flex>
                                    <Flex alignItems="start">
                                        <Flex alignItems="center" h={5}>
                                            <input
                                                type="checkbox"
                                                name="email"
                                                value="offers"
                                            ></input>
                                        </Flex>
                                        <Box ml={3} fontSize="sm">
                                            <chakra.label
                                                htmlFor="offers"
                                                fontWeight="md"
                                                color={useColorModeValue(
                                                    "gray.700",
                                                    "gray.50"
                                                )}
                                            >
                                                Votes
                                            </chakra.label>
                                            <Text
                                                color={useColorModeValue(
                                                    "gray.500",
                                                    "gray.400"
                                                )}
                                            >
                                                Get notified when a creative
                                                recieves a vote.
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Stack>
                                <FormControl>
                                    <Box
                                        as="legend"
                                        fontSize="md"
                                        color={useColorModeValue(
                                            "gray.900",
                                            "gray.50"
                                        )}
                                    >
                                        Push Notifications
                                        <Text
                                            fontSize="sm"
                                            color={useColorModeValue(
                                                "gray.500",
                                                "gray.400"
                                            )}
                                        >
                                            These are delivered via SMS to your
                                            mobile phone.
                                        </Text>
                                    </Box>
                                    <Stack spacing={4}>
                                        <label>
                                            <input
                                                type="radio"
                                                name="push"
                                                checked={
                                                    preferencesForm.values
                                                        .push === "0"
                                                }
                                                onClick={() => {
                                                    preferencesForm.setFieldValue(
                                                        "push",
                                                        "0"
                                                    );
                                                }}
                                                value="0"
                                            ></input>
                                            Everything
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="push"
                                                checked={
                                                    preferencesForm.values
                                                        .push === "1"
                                                }
                                                onClick={() => {
                                                    preferencesForm.setFieldValue(
                                                        "push",
                                                        "1"
                                                    );
                                                }}
                                                value="1"
                                            ></input>
                                            Same as email
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="push"
                                                checked={
                                                    preferencesForm.values
                                                        .push === "2"
                                                }
                                                onClick={() => {
                                                    preferencesForm.setFieldValue(
                                                        "push",
                                                        "2"
                                                    );
                                                }}
                                                value="2"
                                            ></input>
                                            No push notifications
                                        </label>
                                    </Stack>
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
                                    colorScheme={useColorModeValue(
                                        "brand",
                                        "brand"
                                    )}
                                    _focus={{ shadow: "" }}
                                    fontWeight="md"
                                    color={useColorModeValue(
                                        "gray.700",
                                        "gray.50"
                                    )}
                                >
                                    Save
                                </Button>
                            </Box>
                        </form>
                    </GridItem>
                </SimpleGrid>
            </Box>
        </Box>
    );
}
