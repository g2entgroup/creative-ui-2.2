import React, {useEffect, useState} from "react";
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
  InputLeftElement,
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
import { FaUser } from "react-icons/fa";
import { setup, isSupported } from "@loomhq/record-sdk";
import { oembed } from "@loomhq/loom-embed";

const API_KEY = process.env.NEXT_PUBLIC_LOOM;
const BUTTON_ID = "loom-sdk-button";

export default function Component() {
  const [videoHTML, setVideoHTML] = useState("");

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
        apiKey: API_KEY      
      });
      const sdkButton = configureButton({ element: button });
      sdkButton.on("insert-click", async video => {        
        const { html } = await oembed(video.sharedUrl, { width: 400 });        
        setVideoHTML(html);      
      });    
    }
    setupLoom();  
  }, []);

  return (

    <Box bg={useColorModeValue("gray.50", "inherit")} p={10} >
      <Text as="h1" fontSize="4xl" fontStyle="bold" mb={10} color={useColorModeValue("gray.600", "gray.400")} >Create Campaign</Text>

      <Box>
        <SimpleGrid
          display={{ base: "initial", md: "grid" }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}
        >
          <GridItem colSpan={{ md: 1 }}>
            <Box px={[4, 0]}>
              <Heading fontSize="lg" fontWeight="md" lineHeight="6" color={useColorModeValue("gray.600", "gray.400")}>
                Create A New Campaign
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
             //ONSUBMIT CHECKPOINT
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
                  <FormControl as={GridItem} colSpan={[3, 2]}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                       Brand Company 
                    </FormLabel>
                      <Input
                        type="text"
                        placeholder="Company Name"
                        focusBorderColor="brand.400"
                        rounded="md"
                        color={useColorModeValue("gray.700", "gray.50")}
                      />
                  </FormControl>
                </SimpleGrid>
                <SimpleGrid columns={3} spacing={6}>
                  <FormControl as={GridItem} colSpan={[3, 2]}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                       Brand Website 
                    </FormLabel>
                    <InputGroup size="sm">
                      <InputLeftAddon
                        children="https://"
                        bg={useColorModeValue("gray.50", "gray.800")}
                        color={useColorModeValue("gray.500", "gay.50")}
                        rounded="md"
                      />
                      <Input
                        type="text"
                        placeholder="www.example.com"
                        focusBorderColor="brand.400"
                        rounded="md"
                        color={useColorModeValue("gray.700", "gray.50")}
                      />
                    </InputGroup>
                  </FormControl>
                </SimpleGrid>

                <SimpleGrid columns={3} spacing={6}>
                  <FormControl as={GridItem} colSpan={[3, 2]}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                       Twitter Username 
                    </FormLabel>
                    <InputGroup size="sm">
                      <InputLeftAddon
                        children="@"
                        bg={useColorModeValue("gray.50", "gray.800")}
                        color={useColorModeValue("gray.500", "gay.50")}
                        rounded="md"
                      />
                      <Input
                        placeholder="creativecrtv"
                        focusBorderColor="brand.400"
                        rounded="md"
                        color={useColorModeValue("gray.700", "gray.50")}
                      />
                    </InputGroup>
                    <FormHelperText>
                      Verify your account via Twitter (0.1 LINK).
                    </FormHelperText>
                  </FormControl>
                </SimpleGrid>

                <div>
                  <FormControl id="email" mt={1}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Campaign Brief
                    </FormLabel>
                    <Textarea
                      placeholder="Additional information about your campaign"
                      mt={1}
                      rows={3}
                      shadow="sm"
                      focusBorderColor="brand.400"
                      fontSize={{ sm: "sm" }}
                      color={useColorModeValue("gray.700", "gray.50")}
                    />
                    <FormHelperText>
                      Brief description for your requirements. URLs are hyperlinked.
                    </FormHelperText>
                  </FormControl>
                </div>

                <FormControl>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    Photo / Logo
                  </FormLabel>
                  <Flex alignItems="center" mt={1}>
                    <Avatar
                      boxSize={20}
                      bg={useColorModeValue("gray.100", "gray.800")}
                      icon={
                        <Icon
                          as={FaUser}
                          boxSize={15}
                          mt={3}
                          rounded="full"
                          color={useColorModeValue("gray.300", "gray.700")}
                        />
                      }
                    />
                    <Button
                      type="button"
                      ml={5}
                      variant="outline"
                      size="sm"
                      fontWeight="medium"
                      _focus={{ shadow: "none" }}
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Change
                    </Button>
                  </Flex>
                </FormControl>

                <FormControl>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    Record Campaign Details
                  </FormLabel>
                  <Button id={BUTTON_ID} color={useColorModeValue("gray.700", "gray.700")}>Record</Button>
                  <div dangerouslySetInnerHTML={{ __html: videoHTML }} />
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
                  color={useColorModeValue("gray.700", "gray.50")}
                >
                  Save
                </Button>
              </Box>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
      </Box>
      <Box visibility={{ base: "hidden", sm: "visible" }} aria-hidden="true">
        <Box py={5}>
          <Box
            borderTop="solid 1px"
            borderTopColor={useColorModeValue("gray.200", "whiteAlpha.200")}
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
              <Heading fontSize="lg" fontWeight="medium" lineHeight="6" color={useColorModeValue("gray.600", "gray.400")}>
                Pool Information
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                
                Details and Contact info for the pool.
              </Text>
            </Box>
          </GridItem>
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            <chakra.form
             
              method="POST"
              shadow="base"
              rounded={[null, "md"]}
              overflow={{ sm: "hidden" }}
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
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Pool name
                    </FormLabel>
                    <Input
                      type="text"
                      name="pool_name"
                      id="pool_name"
                      autoComplete="given-name"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    />
                  </FormControl>
                  <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
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
                      name="capital"
                      id="capital"
                      autoComplete="given-name"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    />
                    </InputGroup>
                  </FormControl>
                  <FormControl as={GridItem} colSpan={[6, 4]}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Capital Address
                    </FormLabel>
                    <Input
                      type="text"
                      name="capital_address"
                      id="capital_address"
                      autoComplete="given-name"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 4]}>
                    <FormLabel
                      htmlFor="email_address"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Email address
                    </FormLabel>
                    <Input
                      type="text"
                      name="email_address"
                      id="email_address"
                      autoComplete="email"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                      htmlFor="country"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Country / Region
                    </FormLabel>
                    <Select
                      id="country"
                      name="country"
                      autoComplete="country"
                      placeholder="Select option"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                      <option>India</option>

                    </Select>
                  </FormControl>

                  <FormControl as={GridItem} colSpan={6}>
                    <FormLabel
                      htmlFor="nft_address"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      NFT address
                    </FormLabel>
                    <Input
                      type="text"
                      name="nft_address"
                      id="nft_address"
                      autoComplete="nft-address"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                    <FormLabel
                      htmlFor="voting_length"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Voting Length
                    </FormLabel>
                    <Input
                      type="text"
                      name="voting_length"
                      id="voting_length"
                      autoComplete="number"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                    <FormLabel
                      htmlFor="decision_length"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Decision Length
                    </FormLabel>
                    <Input
                      type="text"
                      name="decision_length"
                      id="decision_length"
                      autoComplete="decision_length"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                    <FormLabel
                      htmlFor="submission_length"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Submission Length
                    </FormLabel>
                    <Input
                      type="text"
                      name="submission_length"
                      id="submission_length"
                      autoComplete="submission_length"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      color={useColorModeValue("gray.700", "gray.50")}
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
                  color={useColorModeValue("gray.700", "gray.50")}
                >
                  Save
                </Button>
              </Box>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
      </Box>

      <Box visibility={{ base: "hidden", sm: "visible" }} aria-hidden="true">
        <Box py={5}>
          <Box
            borderTop="solid 1px"
            borderTopColor={useColorModeValue("gray.200", "whiteAlpha.200")}
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
              <Heading fontSize="lg" fontWeight="medium" lineHeight="6" color={useColorModeValue("gray.600", "gray.400")}>
                Notifications
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                Decide which communications you'd like to receive and how.
              </Text>
            </Box>
          </GridItem>
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            <chakra.form
             
              method="POST"
              shadow="base"
              rounded={[null, "md"]}
              overflow={{ sm: "hidden" }}
            >
              <Stack
                px={4}
                py={5}
                p={[null, 6]}
                bg={useColorModeValue("white",'gray.700')}
                spacing={6}
              >
                <chakra.fieldset>
                  <Box
                    as="legend"
                    fontSize="md"
                    color={useColorModeValue("gray.900", "gray.50")}
                  >
                    By Email
                  </Box>
                  <Stack mt={4} spacing={4}>
                    <Flex alignItems="start">
                      <Flex alignItems="center" h={5}>
                        <Checkbox
                          colorScheme="brand"
                          id="comments"
                          rounded="md"
                        />
                      </Flex>
                      <Box ml={3} fontSize="sm">
                        <chakra.label
                          htmlFor="comments"
                          fontWeight="md"
                          color={useColorModeValue("gray.700", "gray.50")}
                        >
                          Comments
                        </chakra.label>
                        <Text color={useColorModeValue("gray.500", "gray.400")}>
                          Get notified when someones posts a comment on a
                          posting.
                        </Text>
                      </Box>
                    </Flex>
                    <Flex alignItems="start">
                      <Flex alignItems="center" h={5}>
                        <Checkbox
                          colorScheme="brand"
                          id="candidates"
                          rounded="md"
                        />
                      </Flex>
                      <Box ml={3} fontSize="sm">
                        <chakra.label
                          htmlFor="candidates"
                          fontWeight="md"
                          color={useColorModeValue("gray.700", "gray.50")}
                        >
                          Creatives
                        </chakra.label>
                        <Text color={useColorModeValue("gray.500", "gray.400")}>
                        Get notified when a creative applies for your campaign.
                        </Text>
                      </Box>
                    </Flex>
                    <Flex alignItems="start">
                      <Flex alignItems="center" h={5}>
                        <Checkbox
                          colorScheme="brand"
                          id="offers"
                          rounded="md"
                        />
                      </Flex>
                      <Box ml={3} fontSize="sm">
                        <chakra.label
                          htmlFor="offers"
                          fontWeight="md"
                          color={useColorModeValue("gray.700", "gray.50")}
                        >
                          Votes
                        </chakra.label>
                        <Text color={useColorModeValue("gray.500", "gray.400")}>
                          Get notified when a creative recieves a vote.
                        </Text>
                      </Box>
                    </Flex>
                  </Stack>
                </chakra.fieldset>
                <chakra.fieldset>
                  <Box
                    as="legend"
                    fontSize="md"
                    color={useColorModeValue("gray.900", "gray.50")}
                  >
                    Push Notifications
                    <Text
                      fontSize="sm"
                      color={useColorModeValue("gray.500", "gray.400")}
                    >
                      These are delivered via SMS to your mobile phone.
                    </Text>
                    </Box>
                  <RadioGroup
                    fontSize="sm"
                    color={useColorModeValue("gray.700", "gray.50")}
                    colorScheme="brand"
                    mt={4}
                    defaultValue="1"
                  >
                    <Stack spacing={4}>
                      <Radio spacing={3} value="1">
                        Everything
                      </Radio>
                      <Radio spacing={3} value="2">
                        Same as email
                      </Radio>
                      <Radio spacing={3} value="3">
                        No push notifications
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </chakra.fieldset>
              </Stack>
              <Box
                px={{ base: 4, sm: 6 }}
                py={3}
                bg={useColorModeValue("gray.50", "gray.900")}
                textAlign="right"
              >
                <Button
                  type="submit"
                  colorScheme={useColorModeValue("brand", "brand")}
                  _focus={{ shadow: "" }}
                  fontWeight="md"
                  color={useColorModeValue("gray.700", "gray.50")}
                >
                  Save
                </Button>
              </Box>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Box>
  );
}