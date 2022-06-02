import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Image,
  SimpleGrid,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  useEditableControls,
  ButtonGroup,
  IconButton,
  Flex,
  Input,
  chakra,
} from "@chakra-ui/react";
import CreativeCard from "../../components/common/Cards/CreativeCard";
import { useEthers, shortenAddress } from "@usedapp/core";
import { FaTwitter, FaInstagram, FaStar } from "react-icons/fa";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

const Profile = () => {
  const { account } = useEthers();
  const [twitter, setTwitter] = React.useState("@username");
  const [instagram, setInstagram] = React.useState("@username");
  const [balance, setBalance] = React.useState(10000);
  const [brandData] = React.useState([
    {
      id: 1,
      image: "https://bit.ly/dan-abramov",
      brand: "TESLA Brand Campaign",
      prize: 500,
      active: true,
      stage: "Voting Stage",
      claim: false,
    },
    {
      id: 2,
      image: "https://bit.ly/dan-abramov",
      brand: "TESLA Brand Campaign",
      prize: 500,
      active: true,
      stage: "Decision Stage",
      claim: false,
    },
    {
      id: 3,
      image: "https://bit.ly/dan-abramov",
      brand: "TESLA Brand Campaign",
      prize: 500,
      active: true,
      stage: "Submission Stage",
      claim: false,
    },
    {
      id: 4,
      image: "https://bit.ly/dan-abramov",
      brand: "Coca-Cola Brand Campaign",
      prize: 500,
      active: false,
      stage: "Ended",
      claim: false,
    },
    {
      id: 5,
      image: "https://bit.ly/dan-abramov",
      brand: "TESLA Brand Campaign",
      prize: 500,
      active: true,
      stage: "Voting Stage",
      claim: false,
    },
    {
      id: 6,
      image: "https://bit.ly/dan-abramov",
      brand: "TESLA Brand Campaign",
      prize: 500,
      active: false,
      stage: "Ended",
      claim: false,
    },
  ]);
  const [bio] = React.useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu convallis sapien. Etiam aliquet semper justo nec posuere. Aliquam molestie efficitur quam quis bibendum. Aliquam sodales nisi consequat metus egestas eleifend. Morbi tincidunt ex a volutpat congue."
  );

  /* Here's a custom control */
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="left" size="sm">
        <IconButton
          aria-label="check icon"
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label="close icon"
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="left">
        <IconButton
          aria-label="edit icon"
          size="sm"
          icon={<EditIcon />}
          {...getEditButtonProps()}
        />
      </Flex>
    );
  }

  return (
    <Box
      margin={"auto"}
      marginBottom={100}
      maxW={["100%", "100%", "100%", "60%"]}
      display="flex"
      padding={5}
      overflowX="hidden"
      justifyContent={["center", "center", "center", "space-evenly"]}
      flexDir={["column", "column", "column", "row"]}
    >
      <Box
        display="flex"
        flexDir={"column"}
        marginTop={30}
        marginRight={[0, 0, 0, 20]}
        marginBottom={[10, 10, 10, 0]}
        alignItems="center"
        maxW={["100%", "100%", "100%", "20%"]}
        cursor={"pointer"}
      >
        <Image
          borderRadius="full"
          boxSize="80px"
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov"
          marginBottom={[10, 10, 10, 5]}
        />
        <Button background="#e50168">+ Follow</Button>
      </Box>
      <Box maxW={["100%", "100%", "100%", "80%"]}>
        <Box
          margin="auto"
          display="flex"
          justifyContent="space-between"
          flexDir={["column", "column", "row", "row"]}
          marginBottom={20}
          cursor={"pointer"}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            flexDir={["column", "column", "row", "row"]}
          >
            <Box marginBottom={[10, 10, 0, 0]}>
              <Box display={["flex", "flex", "flex", "flex"]}>
                {account && (
                  <chakra.h2 color="white" fontSize="md" fontWeight="medium">
                    {shortenAddress(account)}
                  </chakra.h2>
                )}
              </Box>
              <Box display="flex" alignContent={"left"} padding={2}>
                <FaTwitter />
                <Editable
                  marginLeft={2}
                  textAlign="left"
                  defaultValue={twitter}
                  fontSize={"sm"}
                >
                  <EditablePreview />
                  <Input as={EditableInput} />
                </Editable>
              </Box>
              <Box display="flex" alignContent={"left"} padding={2}>
                <FaInstagram />
                <Editable
                  marginLeft={2}
                  textAlign="left"
                  defaultValue={instagram}
                  fontSize={"sm"}
                >
                  <EditablePreview />
                  <Input as={EditableInput} />
                </Editable>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box marginBottom={5}>
              <Heading>Total Winnings</Heading>
            </Box>
            <Box>
              <Heading color="red">{balance} USDC</Heading>
            </Box>
          </Box>
        </Box>

        <Box
          margin="auto"
          display="flex"
          justifyContent="space-between"
          flexDir={["column", "column", "row", "row"]}
          marginBottom={20}
          cursor={"pointer"}
        >
          <Editable
            textAlign="left"
            defaultValue={bio}
            fontSize={"lg"}
            isPreviewFocusable={true}
          >
            <Heading>Biography</Heading>
            <EditableControls />
            <EditablePreview />
            <Input as={EditableTextarea} />
          </Editable>
        </Box>

        <Box
          margin="auto"
          display="flex"
          justifyContent="space-between"
          flexDir={["column", "column", "column", "column"]}
          marginBottom={20}
          cursor={"pointer"}
        >
          <Box marginBottom={5}>
            <Heading>Star Power</Heading>
          </Box>
          <Box display="flex" alignItems="center" marginBottom={5}>
            <FaStar fontSize={35} color="yellow" />
            <Heading marginLeft={5} color="#e50168">
              600
            </Heading>
          </Box>
          <Box>
            <Button background="#e50168">unlock NFT</Button>
          </Box>
        </Box>

        <Box
          margin="auto"
          display="flex"
          justifyContent="space-between"
          flexDir={["column", "column", "column", "column"]}
          marginBottom={20}
          cursor={"pointer"}
        >
          <Box marginBottom={5}>
            <Heading>Listed NFTs</Heading>
          </Box>
          <Box
            display="flex"
            flexDir="row"
            maxW={["100%", "100%", "100%", "100%"]}
            cursor={"pointer"}
          >
            <Box display="flex" flexDir="row" overflowX="scroll">
              <CreativeCard />
              <CreativeCard />
              <CreativeCard />
              <CreativeCard />
            </Box>
          </Box>
        </Box>

        <Box
          margin="auto"
          display="flex"
          justifyContent="space-between"
          flexDir={["column", "column", "column", "column"]}
          marginBottom={20}
          cursor={"pointer"}
        >
          <Box marginBottom={5}>
            <Heading>Submitted Campaign Details</Heading>
          </Box>
          <SimpleGrid marginBottom={5} columns={[4, 4, 4, 6]}>
            <Box maxW="10%" h="10" />
            <Box h="10">
              <Heading as="h4" size="md">
                Brand
              </Heading>
            </Box>
            <Box h="10" display={["none", "none", "none", "flex"]}>
              <Heading as="h4" size="md">
                Prize
              </Heading>
            </Box>
            <Box h="10" display={["none", "none", "none", "flex"]}>
              <Heading as="h4" size="md">
                Status
              </Heading>
            </Box>
            <Box h="10">
              <Heading as="h4" size="md">
                Stage
              </Heading>
            </Box>
            <Box h="10">
              <Heading as="h4" size="md">
                Claim
              </Heading>
            </Box>
          </SimpleGrid>
          <Box background="gray" width="100%">
            {brandData.map((data) => {
              return (
                <SimpleGrid key={data.id} columns={[4, 4, 4, 6]} padding={2}>
                  <Box
                    h="10"
                    display={"flex"}
                    alignItems="center"
                    justifyContent={"center"}
                  >
                    <Image boxSize="30px" src={data.image} alt="Dan Abramov" />
                  </Box>
                  <Box
                    h="10"
                    display={"flex"}
                    alignItems="center"
                    justifyContent={"flex-start"}
                  >
                    <Text color="black" fontSize="sm">
                      {data.brand}
                    </Text>
                  </Box>
                  <Box
                    h="10"
                    display={["none", "none", "none", "flex"]}
                    alignItems="center"
                    justifyContent={"flex-start"}
                  >
                    <Text color="black" fontSize="sm">
                      {data.prize} USDC reward
                    </Text>
                  </Box>
                  <Box
                    h="10"
                    display={"flex"}
                    alignItems="center"
                    justifyContent={"flex-start"}
                  >
                    <Box
                      background={data.active ? "green" : "red"}
                      minWidth={5}
                      minHeight={5}
                      maxWidth={5}
                      maxHeight={5}
                      borderWidth={2}
                      marginRight={2}
                      borderRadius={"50%"}
                    />
                    <Text color="black" fontSize="sm">
                      {data.active ? "Active" : "Inactive"}
                    </Text>
                  </Box>
                  <Box
                    h="10"
                    display={["none", "none", "none", "flex"]}
                    alignItems="center"
                    justifyContent={"flex-start"}
                  >
                    <Text color="black" fontSize="sm">
                      {data.stage}
                    </Text>
                  </Box>
                  <Box
                    h="10"
                    display={"flex"}
                    alignItems="center"
                    justifyContent={"flex-start"}
                  >
                    {data.active ? null : (
                      <Button background="#e50168">POAP</Button>
                    )}
                  </Box>
                </SimpleGrid>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
