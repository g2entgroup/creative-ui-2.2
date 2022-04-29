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
} from "@chakra-ui/react";
import { Form, Field, Formik } from "formik";
import { ethers } from "ethers";
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

    const [provider, setProvider] = useState(props.provider);

    const { account, library } = useEthers();

    const [campaign, setCampaign] = useState({
        _id: "",
        name: "",
        brandName: "",
        brandWebsite: "",
        twitterAccount: "",
        campaignBrief: "",
        campaignImageURI: "",
        image: "",
        activePoolId: "",
        previousPools: "",
        notificationPreferences: "",
        ownerAddress: "",
    });
    const [files, setFiles] = useState([]);
    const [pool, setPool] = useState({
        _id: "",
        poolAddress: "",
        filename: "",
        updatedAt: "",
        poolName: "",
        capital: "",
        capitalAddress: "",
        email: "",
        country: "",
        nftAddress: "",
        votingLength: "",
        decisionLength: "",
        submissionLength: "",
    });
    const [campaignPreferences, setCampaignPreferences] = useState({
        _id: "",
        campaignName: "",
        updatedAt: "",
        filename: "",
        email: "",
        push: "",
    });

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
        accept: "image/*",
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
            const campaignPreferences: CampaignSettings | any =
                await textileInstance.getCampaignPreferences(campaign._id);
            const activePool: PoolMetadata | any =
                await textileInstance.getActiveCampaignPool(campaign._id);
            // console.log({
            //     campaign,
            //     campaignPreferences,
            //     activePool,
            // });
            setCampaign(userCampaign);
            setCampaignPreferences(campaignPreferences);
            setPool(activePool);
        };
        fetchCampaignAndPool();
    }, []);

    const handleSaveCampaignDetails = async (values) => {
        const textileInstance = await TextileInstance.getInstance();

        const campaignMetadata = await textileInstance.uploadCampaignMetadata({
            ...values,
            record: values.record === "0" ? false : true,
            files,
        });

        await textileInstance.addCampaign(campaignMetadata, account);

        setCampaign(campaignMetadata);
    };

    const handleSavePoolDetails = async (values) => {
        const signer = library.getSigner();

        const pool = {
            ...values,
        };

        const poolFactory = new ethers.ContractFactory(abi, bytecode, signer);

        console.log(poolFactory);

        const contract = await poolFactory.deploy(
            pool.poolName,
            campaign.name,
            pool.capital,
            pool.capitalAddress,
            pool.nftAddress,
            signer._address,
            "0xa6047358BE012197C2876cF82127e050b6639cF2",
            1209600000,
            pool.votingLength,
            pool.decisionLength,
            pool.submissionLength
        );

        const poolMetadata = await textile.uploadPoolMetadata({
            poolAddress: contract.address,
            ...pool,
        });

        await textile.uploadAndSetCampaignPool(campaign._id, poolMetadata);

        setPool(poolMetadata);
    };

    const handleSaveNotificationPreferences = async (values) => {
        const preferenceMetadata = await textile.uploadCampaignPreferences({
            ...values,
        });

        await textile.setCampaignPreferences(campaign._id, preferenceMetadata);

        setCampaignPreferences(preferenceMetadata);
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
                        <Formik
                            initialValues={{
                                brandName: "",
                                brandWebsite: "",
                                twitterAccount: "",
                                campaignBrief: "",
                                logo: "",
                                record: "0",
                            }}
                            onSubmit={(values, actions) => {
                                handleSaveCampaignDetails(values);
                            }}
                        >
                            {(props) => (
                                <Form
                                    //ONSUBMIT CHECKPOINT
                                    method="POST"
                                    shadow="base"
                                    rounded={[null, "md"]}
                                    overflow={{ sm: "hidden" }}
                                >
                                    <Stack
                                        px={4}
                                        py={5}
                                        bg={useColorModeValue(
                                            "white",
                                            "gray.700"
                                        )}
                                        spacing={6}
                                        p={{ sm: 6 }}
                                    >
                                        <SimpleGrid columns={3} spacing={6}>
                                            <Field>
                                                {({ field, form }) => (
                                                    <FormControl
                                                        as={GridItem}
                                                        colSpan={[3, 2]}
                                                    >
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
                                                            {...field}
                                                            value={
                                                                form.values
                                                                    .brandName
                                                            }
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
                                                )}
                                            </Field>
                                        </SimpleGrid>
                                        <SimpleGrid columns={3} spacing={6}>
                                            <Field>
                                                {({ field, form }) => (
                                                    <FormControl
                                                        as={GridItem}
                                                        colSpan={[3, 2]}
                                                    >
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
                                                                {...field}
                                                                value={
                                                                    form.values
                                                                        .brandWebsite
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
                                                )}
                                            </Field>
                                        </SimpleGrid>

                                        <SimpleGrid columns={3} spacing={6}>
                                            <Field>
                                                {({ field, form }) => (
                                                    <FormControl
                                                        as={GridItem}
                                                        colSpan={[3, 2]}
                                                    >
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
                                                                {...field}
                                                                value={
                                                                    form.values
                                                                        .twitterAccount
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
                                                            Verify your account
                                                            via Twitter (0.1
                                                            LINK).
                                                        </FormHelperText>
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </SimpleGrid>

                                        <div>
                                            <Field>
                                                {({ field, form }) => (
                                                    <FormControl
                                                        id="email"
                                                        mt={1}
                                                    >
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
                                                            {...field}
                                                            value={
                                                                form.values
                                                                    .campaignBrief
                                                            }
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
                                                            Brief description
                                                            for your
                                                            requirements. URLs
                                                            are hyperlinked.
                                                        </FormHelperText>
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </div>

                                        <Field>
                                            {({ field, form }) => (
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
                                                                        src={
                                                                            f.preview
                                                                        }
                                                                    />
                                                                    <p
                                                                        style={
                                                                            thumbLabel as CSSProperties
                                                                        }
                                                                    >
                                                                        {f.name}{" "}
                                                                        -{" "}
                                                                        {Math.floor(
                                                                            Math.log(
                                                                                f.size
                                                                            ) /
                                                                                Math.log(
                                                                                    1024
                                                                                )
                                                                        )}
                                                                        mb
                                                                    </p>
                                                                </>
                                                            ))}
                                                        </aside>

                                                        <div
                                                            style={
                                                                dropzoneContainer
                                                            }
                                                        >
                                                            <div
                                                                {...getRootProps(
                                                                    {
                                                                        className:
                                                                            "dropzone",
                                                                    }
                                                                )}
                                                                style={dropzone}
                                                            >
                                                                <input
                                                                    {...getInputProps()}
                                                                />
                                                                <p>
                                                                    Drag 'n'
                                                                    drop some
                                                                    files here,
                                                                    or click to
                                                                    select files
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </FormControl>
                                            )}
                                        </Field>

                                        <Field>
                                            {({ field, form }) => (
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
                                                    <Field
                                                        id="record"
                                                        name="record"
                                                        type="radio"
                                                        value="1"
                                                        style={{
                                                            paddingBottom:
                                                                "0.05rem",
                                                            marginLeft:
                                                                "0.5rem",
                                                        }}
                                                        color={useColorModeValue(
                                                            "gray.700",
                                                            "gray.700"
                                                        )}
                                                    ></Field>
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: videoHTML,
                                                        }}
                                                    />
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Stack>
                                    <Box
                                        px={{ base: 4, sm: 6 }}
                                        py={3}
                                        bg={useColorModeValue(
                                            "gray.50",
                                            "gray.900"
                                        )}
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
                                            onClick={handleSaveCampaignDetails}
                                        >
                                            Save
                                        </Button>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
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
                        <Formik
                            initialValues={{
                                pool_address: "",
                                poolName: "",
                                capital_amount: 0,
                                capitalAddress: "",
                                email_address: "",
                                country: "",
                                nftAddress: "",
                                votingLength: "",
                                decisionLength: "",
                                submissionLength: "",
                            }}
                            onSubmit={(values, actions) => {
                                handleSavePoolDetails(values);
                            }}
                        >
                            {() => (
                                <Form
                                    method="POST"
                                    shadow="base"
                                    rounded={[null, "md"]}
                                    overflow={{ sm: "hidden" }}
                                >
                                    <Stack
                                        px={4}
                                        py={5}
                                        p={[null, 6]}
                                        bg={useColorModeValue(
                                            "white",
                                            "gray.700"
                                        )}
                                        spacing={6}
                                    >
                                        <SimpleGrid columns={6} spacing={6}>
                                            <Field>
                                                {({ field, form }) => (
                                                    <FormControl
                                                        as={GridItem}
                                                        colSpan={[6, 3]}
                                                    >
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
                                                            {...field}
                                                            value={
                                                                form.values
                                                                    .poolName
                                                            }
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
                                                )}
                                            </Field>

                                            <Field>
                                                {({ field, form }) => (
                                                    <FormControl
                                                        as={GridItem}
                                                        colSpan={[6, 3]}
                                                    >
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
                                                                {...field}
                                                                value={
                                                                    form.values
                                                                        .capital
                                                                }
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
                                                )}
                                            </Field>
                                            <Field>
                                                {({ field, form }) => (
                                                    <FormControl
                                                        as={GridItem}
                                                        colSpan={[6, 4]}
                                                    >
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
                                                            {...field}
                                                            value={
                                                                form.values
                                                                    .capitalAddress
                                                            }
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
                                                )}
                                            </Field>

                                            <Field>
                                                {({ field, form }) => (
                                                    <FormControl
                                                        as={GridItem}
                                                        colSpan={[6, 4]}
                                                    >
                                                        <FormLabel
                                                            htmlFor="email_address"
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
                                                            {...field}
                                                            value={
                                                                form.values
                                                                    .email_address
                                                            }
                                                            name="email_address"
                                                            id="email_address"
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
                                                )}
                                            </Field>

                                            <Field>
                                                {({ field, form }) => (
                                                    <FormControl
                                                        as={GridItem}
                                                        colSpan={[6, 3]}
                                                    >
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
                                                            {...field}
                                                            value={
                                                                form.values
                                                                    .country
                                                            }
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
                                                            <option>
                                                                United States
                                                            </option>
                                                            <option>
                                                                Canada
                                                            </option>
                                                            <option>
                                                                Mexico
                                                            </option>
                                                            <option>
                                                                India
                                                            </option>
                                                        </Select>
                                                    </FormControl>
                                                )}
                                            </Field>

                                            <Field>
                                                {({ field, form }) => (
                                                    <FormControl
                                                        as={GridItem}
                                                        colSpan={6}
                                                    >
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
                                                            {...field}
                                                            value={
                                                                form.values
                                                                    .nftAddresss
                                                            }
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
                                                )}
                                            </Field>

                                            <Field>
                                                {({ field, form }) => (
                                                    <FormControl
                                                        as={GridItem}
                                                        colSpan={[
                                                            6,
                                                            6,
                                                            null,
                                                            2,
                                                        ]}
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
                                                            {...field}
                                                            value={
                                                                form.values
                                                                    .votingLength
                                                            }
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
                                                )}
                                            </Field>

                                            <Field>
                                                {({ field, form }) => (
                                                    <FormControl
                                                        as={GridItem}
                                                        colSpan={[
                                                            6,
                                                            3,
                                                            null,
                                                            2,
                                                        ]}
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
                                                            {...field}
                                                            value={
                                                                form.values
                                                                    .decisionLength
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
                                                )}
                                            </Field>

                                            <Field>
                                                {({ field, form }) => (
                                                    <FormControl
                                                        as={GridItem}
                                                        colSpan={[
                                                            6,
                                                            3,
                                                            null,
                                                            2,
                                                        ]}
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
                                                            {...field}
                                                            value={
                                                                form.values
                                                                    .submissionLength
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
                                                )}
                                            </Field>
                                        </SimpleGrid>
                                    </Stack>
                                    <Box
                                        px={{ base: 4, sm: 6 }}
                                        py={3}
                                        bg={useColorModeValue(
                                            "gray.50",
                                            "gray.900"
                                        )}
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
                                            onClick={handleSavePoolDetails}
                                        >
                                            Save
                                        </Button>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
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
                        <Formik
                            initialValues={{
                                email: [],
                                push: "0",
                            }}
                            onSubmit={(values, actions) => {
                                handleSaveNotificationPreferences(values);
                            }}
                        >
                            {({ values }) => (
                                <Form
                                    method="POST"
                                    shadow="base"
                                    rounded={[null, "md"]}
                                    overflow={{ sm: "hidden" }}
                                >
                                    <Stack
                                        px={4}
                                        py={5}
                                        p={[null, 6]}
                                        bg={useColorModeValue(
                                            "white",
                                            "gray.700"
                                        )}
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
                                                    <Field
                                                        colorScheme="brand"
                                                        type="checkbox"
                                                        name="email"
                                                        value="comments"
                                                        rounded="md"
                                                    ></Field>
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
                                                        Get notified when
                                                        someones posts a comment
                                                        on a posting.
                                                    </Text>
                                                </Box>
                                            </Flex>
                                            <Flex alignItems="start">
                                                <Flex alignItems="center" h={5}>
                                                    <Field
                                                        colorScheme="brand"
                                                        type="checkbox"
                                                        name="email"
                                                        value="candidates"
                                                        rounded="md"
                                                    ></Field>
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
                                                        Get notified when a
                                                        creative applies for
                                                        your campaign.
                                                    </Text>
                                                </Box>
                                            </Flex>
                                            <Flex alignItems="start">
                                                <Flex alignItems="center" h={5}>
                                                    <Field
                                                        colorScheme="brand"
                                                        type="checkbox"
                                                        name="email"
                                                        value="offers"
                                                        rounded="md"
                                                    ></Field>
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
                                                        Get notified when a
                                                        creative recieves a
                                                        vote.
                                                    </Text>
                                                </Box>
                                            </Flex>
                                        </Stack>
                                        <Field>
                                            {({ field, form }) => (
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
                                                            These are delivered
                                                            via SMS to your
                                                            mobile phone.
                                                        </Text>
                                                    </Box>
                                                    <Stack spacing={4}>
                                                        <label>
                                                            <Field
                                                                spacing={3}
                                                                type="radio"
                                                                name="push"
                                                                value="0"
                                                            ></Field>
                                                            Everything
                                                        </label>
                                                        <label>
                                                            <Field
                                                                spacing={3}
                                                                type="radio"
                                                                name="push"
                                                                value="1"
                                                            ></Field>
                                                            Same as email
                                                        </label>
                                                        <label>
                                                            <Field
                                                                spacing={3}
                                                                type="radio"
                                                                name="push"
                                                                value="2"
                                                            ></Field>
                                                            No push
                                                            notifications
                                                        </label>
                                                    </Stack>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Stack>
                                    <Box
                                        px={{ base: 4, sm: 6 }}
                                        py={3}
                                        bg={useColorModeValue(
                                            "gray.50",
                                            "gray.900"
                                        )}
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
                                </Form>
                            )}
                        </Formik>
                    </GridItem>
                </SimpleGrid>
            </Box>
        </Box>
    );
}
