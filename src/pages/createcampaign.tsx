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
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  useEditableControls,
  ButtonGroup,
  IconButton,
  InputRightElement,
  InputRightAddon,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { setup, isSupported } from "@loomhq/record-sdk";
import { oembed } from "@loomhq/loom-embed";
import { CheckIcon, CloseIcon, EditIcon, EmailIcon } from "@chakra-ui/icons";
import { useEthers } from "@usedapp/core";

const API_KEY = process.env.NEXT_PUBLIC_LOOM;
const BUTTON_ID = "loom-sdk-button";

export default function Component() {
  const [videoHTML, setVideoHTML] = useState("");
  const { account } = useEthers();

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

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton aria-label="check" icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton aria-label="close" icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='left'>
        <IconButton aria-label="edit" size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    )
  }

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
                <FormControl as={GridItem} colSpan={[6, 4]}>
                    <FormLabel
                      htmlFor="email_address"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Email address
                    </FormLabel>
                    <InputGroup size={"sm"}>
                      <InputLeftAddon children={<EmailIcon />} 
                        bg={useColorModeValue("gray.50", "gray.800")}
                        color={useColorModeValue("gray.500", "gay.50")}
                        rounded="md" 
                      />
                      <Input
                        type="text"
                        name="email_address"
                        id="email_address"
                        autoComplete="email"
                        focusBorderColor="brand.400"
                        w="full"
                        rounded="md"
                        color={useColorModeValue("gray.700", "gray.50")}
                      />
                    </InputGroup>
                    
                  </FormControl>
                </SimpleGrid>
                <SimpleGrid columns={3} spacing={6}>
                <FormControl>
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
                      placeholder="select country"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      <option value="Afganistan">Afghanistan</option>
                      <option value="Albania">Albania</option>
                      <option value="Algeria">Algeria</option>
                      <option value="American Samoa">American Samoa</option>
                      <option value="Andorra">Andorra</option>
                      <option value="Angola">Angola</option>
                      <option value="Anguilla">Anguilla</option>
                      <option value="Antigua &amp; Barbuda">Antigua &amp; Barbuda</option>
                      <option value="Argentina">Argentina</option>
                      <option value="Armenia">Armenia</option>
                      <option value="Aruba">Aruba</option>
                      <option value="Australia">Australia</option>
                      <option value="Austria">Austria</option>
                      <option value="Azerbaijan">Azerbaijan</option>
                      <option value="Bahamas">Bahamas</option>
                      <option value="Bahrain">Bahrain</option>
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="Barbados">Barbados</option>
                      <option value="Belarus">Belarus</option>
                      <option value="Belgium">Belgium</option>
                      <option value="Belize">Belize</option>
                      <option value="Benin">Benin</option>
                      <option value="Bermuda">Bermuda</option>
                      <option value="Bhutan">Bhutan</option>
                      <option value="Bolivia">Bolivia</option>
                      <option value="Bonaire">Bonaire</option>
                      <option value="Bosnia &amp; Herzegovina">Bosnia &amp; Herzegovina</option>
                      <option value="Botswana">Botswana</option>
                      <option value="Brazil">Brazil</option>
                      <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                      <option value="Brunei">Brunei</option>
                      <option value="Bulgaria">Bulgaria</option>
                      <option value="Burkina Faso">Burkina Faso</option>
                      <option value="Burundi">Burundi</option>
                      <option value="Cambodia">Cambodia</option>
                      <option value="Cameroon">Cameroon</option>
                      <option value="Canada">Canada</option>
                      <option value="Canary Islands">Canary Islands</option>
                      <option value="Cape Verde">Cape Verde</option>
                      <option value="Cayman Islands">Cayman Islands</option>
                      <option value="Central African Republic">Central African Republic</option>
                      <option value="Chad">Chad</option>
                      <option value="Channel Islands">Channel Islands</option>
                      <option value="Chile">Chile</option>
                      <option value="China">China</option>
                      <option value="Christmas Island">Christmas Island</option>
                      <option value="Cocos Island">Cocos Island</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Comoros">Comoros</option>
                      <option value="Congo">Congo</option>
                      <option value="Cook Islands">Cook Islands</option>
                      <option value="Costa Rica">Costa Rica</option>
                      <option value="Cote DIvoire">Cote DIvoire</option>
                      <option value="Croatia">Croatia</option>
                      <option value="Cuba">Cuba</option>
                      <option value="Curaco">Curacao</option>
                      <option value="Cyprus">Cyprus</option>
                      <option value="Czech Republic">Czech Republic</option>
                      <option value="Denmark">Denmark</option>
                      <option value="Djibouti">Djibouti</option>
                      <option value="Dominica">Dominica</option>
                      <option value="Dominican Republic">Dominican Republic</option>
                      <option value="East Timor">East Timor</option>
                      <option value="Ecuador">Ecuador</option>
                      <option value="Egypt">Egypt</option>
                      <option value="El Salvador">El Salvador</option>
                      <option value="Equatorial Guinea">Equatorial Guinea</option>
                      <option value="Eritrea">Eritrea</option>
                      <option value="Estonia">Estonia</option>
                      <option value="Ethiopia">Ethiopia</option>
                      <option value="Falkland Islands">Falkland Islands</option>
                      <option value="Faroe Islands">Faroe Islands</option>
                      <option value="Fiji">Fiji</option>
                      <option value="Finland">Finland</option>
                      <option value="France">France</option>
                      <option value="French Guiana">French Guiana</option>
                      <option value="French Polynesia">French Polynesia</option>
                      <option value="French Southern Ter">French Southern Ter</option>
                      <option value="Gabon">Gabon</option>
                      <option value="Gambia">Gambia</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Germany">Germany</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Gibraltar">Gibraltar</option>
                      <option value="Great Britain">Great Britain</option>
                      <option value="Greece">Greece</option>
                      <option value="Greenland">Greenland</option>
                      <option value="Grenada">Grenada</option>
                      <option value="Guadeloupe">Guadeloupe</option>
                      <option value="Guam">Guam</option>
                      <option value="Guatemala">Guatemala</option>
                      <option value="Guinea">Guinea</option>
                      <option value="Guyana">Guyana</option>
                      <option value="Haiti">Haiti</option>
                      <option value="Hawaii">Hawaii</option>
                      <option value="Honduras">Honduras</option>
                      <option value="Hong Kong">Hong Kong</option>
                      <option value="Hungary">Hungary</option>
                      <option value="Iceland">Iceland</option>
                      <option value="Indonesia">Indonesia</option>
                      <option value="India">India</option>
                      <option value="Iran">Iran</option>
                      <option value="Iraq">Iraq</option>
                      <option value="Ireland">Ireland</option>
                      <option value="Isle of Man">Isle of Man</option>
                      <option value="Israel">Israel</option>
                      <option value="Italy">Italy</option>
                      <option value="Jamaica">Jamaica</option>
                      <option value="Japan">Japan</option>
                      <option value="Jordan">Jordan</option>
                      <option value="Kazakhstan">Kazakhstan</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Kiribati">Kiribati</option>
                      <option value="Korea North">Korea North</option>
                      <option value="Korea Sout">Korea South</option>
                      <option value="Kuwait">Kuwait</option>
                      <option value="Kyrgyzstan">Kyrgyzstan</option>
                      <option value="Laos">Laos</option>
                      <option value="Latvia">Latvia</option>
                      <option value="Lebanon">Lebanon</option>
                      <option value="Lesotho">Lesotho</option>
                      <option value="Liberia">Liberia</option>
                      <option value="Libya">Libya</option>
                      <option value="Liechtenstein">Liechtenstein</option>
                      <option value="Lithuania">Lithuania</option>
                      <option value="Luxembourg">Luxembourg</option>
                      <option value="Macau">Macau</option>
                      <option value="Macedonia">Macedonia</option>
                      <option value="Madagascar">Madagascar</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Malawi">Malawi</option>
                      <option value="Maldives">Maldives</option>
                      <option value="Mali">Mali</option>
                      <option value="Malta">Malta</option>
                      <option value="Marshall Islands">Marshall Islands</option>
                      <option value="Martinique">Martinique</option>
                      <option value="Mauritania">Mauritania</option>
                      <option value="Mauritius">Mauritius</option>
                      <option value="Mayotte">Mayotte</option>
                      <option value="Mexico">Mexico</option>
                      <option value="Midway Islands">Midway Islands</option>
                      <option value="Moldova">Moldova</option>
                      <option value="Monaco">Monaco</option>
                      <option value="Mongolia">Mongolia</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Morocco">Morocco</option>
                      <option value="Mozambique">Mozambique</option>
                      <option value="Myanmar">Myanmar</option>
                      <option value="Nambia">Nambia</option>
                      <option value="Nauru">Nauru</option>
                      <option value="Nepal">Nepal</option>
                      <option value="Netherland Antilles">Netherland Antilles</option>
                      <option value="Netherlands">Netherlands (Holland, Europe)</option>
                      <option value="Nevis">Nevis</option>
                      <option value="New Caledonia">New Caledonia</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="Nicaragua">Nicaragua</option>
                      <option value="Niger">Niger</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Niue">Niue</option>
                      <option value="Norfolk Island">Norfolk Island</option>
                      <option value="Norway">Norway</option>
                      <option value="Oman">Oman</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="Palau Island">Palau Island</option>
                      <option value="Palestine">Palestine</option>
                      <option value="Panama">Panama</option>
                      <option value="Papua New Guinea">Papua New Guinea</option>
                      <option value="Paraguay">Paraguay</option>
                      <option value="Peru">Peru</option>
                      <option value="Phillipines">Philippines</option>
                      <option value="Pitcairn Island">Pitcairn Island</option>
                      <option value="Poland">Poland</option>
                      <option value="Portugal">Portugal</option>
                      <option value="Puerto Rico">Puerto Rico</option>
                      <option value="Qatar">Qatar</option>
                      <option value="Republic of Montenegro">Republic of Montenegro</option>
                      <option value="Republic of Serbia">Republic of Serbia</option>
                      <option value="Reunion">Reunion</option>
                      <option value="Romania">Romania</option>
                      <option value="Russia">Russia</option>
                      <option value="Rwanda">Rwanda</option>
                      <option value="St Barthelemy">St Barthelemy</option>
                      <option value="St Eustatius">St Eustatius</option>
                      <option value="St Helena">St Helena</option>
                      <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                      <option value="St Lucia">St Lucia</option>
                      <option value="St Maarten">St Maarten</option>
                      <option value="St Pierre &amp; Miquelon">St Pierre &amp; Miquelon</option>
                      <option value="St Vincent &amp; Grenadines">St Vincent &amp; Grenadines</option>
                      <option value="Saipan">Saipan</option>
                      <option value="Samoa">Samoa</option>
                      <option value="Samoa American">Samoa American</option>
                      <option value="San Marino">San Marino</option>
                      <option value="Sao Tome &amp; Principe">Sao Tome &amp; Principe</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Senegal">Senegal</option>
                      <option value="Seychelles">Seychelles</option>
                      <option value="Sierra Leone">Sierra Leone</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Slovakia">Slovakia</option>
                      <option value="Slovenia">Slovenia</option>
                      <option value="Solomon Islands">Solomon Islands</option>
                      <option value="Somalia">Somalia</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Spain">Spain</option>
                      <option value="Sri Lanka">Sri Lanka</option>
                      <option value="Sudan">Sudan</option>
                      <option value="Suriname">Suriname</option>
                      <option value="Swaziland">Swaziland</option>
                      <option value="Sweden">Sweden</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="Syria">Syria</option>
                      <option value="Tahiti">Tahiti</option>
                      <option value="Taiwan">Taiwan</option>
                      <option value="Tajikistan">Tajikistan</option>
                      <option value="Tanzania">Tanzania</option>
                      <option value="Thailand">Thailand</option>
                      <option value="Togo">Togo</option>
                      <option value="Tokelau">Tokelau</option>
                      <option value="Tonga">Tonga</option>
                      <option value="Trinidad &amp; Tobago">Trinidad &amp; Tobago</option>
                      <option value="Tunisia">Tunisia</option>
                      <option value="Turkey">Turkey</option>
                      <option value="Turkmenistan">Turkmenistan</option>
                      <option value="Turks &amp; Caicos Is">Turks &amp; Caicos Is</option>
                      <option value="Tuvalu">Tuvalu</option>
                      <option value="Uganda">Uganda</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Ukraine">Ukraine</option>
                      <option value="United Arab Erimates">United Arab Emirates</option>
                      <option value="United States of America">United States of America</option>
                      <option value="Uraguay">Uruguay</option>
                      <option value="Uzbekistan">Uzbekistan</option>
                      <option value="Vanuatu">Vanuatu</option>
                      <option value="Vatican City State">Vatican City State</option>
                      <option value="Venezuela">Venezuela</option>
                      <option value="Vietnam">Vietnam</option>
                      <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
                      <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
                      <option value="Wake Island">Wake Island</option>
                      <option value="Wallis &amp; Futana Is">Wallis &amp; Futana Is</option>
                      <option value="Yemen">Yemen</option>
                      <option value="Zaire">Zaire</option>
                      <option value="Zambia">Zambia</option>
                      <option value="Zimbabwe">Zimbabwe</option>

                    </Select>
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
                    Record Campaign Video
                  </FormLabel>
                  <Button id={BUTTON_ID} color={useColorModeValue("red.700", "red.700")}>Record</Button>
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
                  colorScheme={"red"}
                  _focus={{ shadow: "" }}
                  fontWeight="md"
                  color={useColorModeValue("gray.700", "gray.800")}
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
                    <Editable defaultValue="Your Product Name" isPreviewFocusable={true}>
                      <EditablePreview />
                      <Input
                      as={EditableInput}
                      type="text"
                      name="pool_name"
                      id="pool_name"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      color={useColorModeValue("gray.700", "gray.50")} 
                      />
                      <EditableControls />
                    </Editable>
                  </FormControl>
                  <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Capital
                    </FormLabel>
                    <Editable defaultValue={"7500"} isPreviewFocusable={true}>
                    <InputGroup>
                      <InputLeftAddon
                        pointerEvents="none"
                        color="gray.300"
                        fontSize="1.2em"
                        children="$"
                      />
                    <EditablePreview />
                      <Input
                      as={EditableInput}
                      type="number"
                      name="pool_name"
                      id="pool_name"
                      focusBorderColor="brand.400"
                      w="full"
                      rounded="md"
                      color={useColorModeValue("gray.700", "gray.50")} 
                      />
                      <InputRightAddon children={<EditableControls />} />
                    </InputGroup>
                    </Editable>
                  </FormControl>
                  <FormControl as={GridItem} colSpan={[6, 4]}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Capital Token Address
                    </FormLabel>
                    <Editable defaultValue="0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889" isPreviewFocusable={true}>
                      <EditablePreview />
                      <Input
                      as={EditableInput}
                      type="text"
                      name="capital_address"
                      id="capital_address"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                      />
                      <EditableControls />
                    </Editable>
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 4]}>
                    <FormLabel
                      htmlFor="nft_address"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      NFT address
                    </FormLabel>
                    <Editable defaultValue="0xbd119CD9de78fAc6da57bA30506F02Ce854e3FE9" isPreviewFocusable={true}>
                      <EditablePreview />
                      <Input
                      as={EditableInput}
                      type="text"
                      name="capital_address"
                      id="capital_address"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                      />
                      <EditableControls />
                    </Editable>
                  </FormControl>

                  <FormControl as={GridItem} colSpan={6}>
                    <FormLabel
                      htmlFor="poolOwner"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Pool Owner address
                    </FormLabel>
                    <Editable defaultValue={account} isPreviewFocusable={true}>
                      <EditablePreview />
                      <Input
                      as={EditableInput}
                      type="text"
                      name="poolOwner"
                      id="poolOwner"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                      />
                      <EditableControls />
                    </Editable>
                  </FormControl>
                  
                  <FormControl as={GridItem} colSpan={6}>
                    <FormLabel
                      htmlFor="nft_address"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      RNG address
                    </FormLabel>
                    <Editable defaultValue={"0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889"} isPreviewFocusable={false}>
                      <EditablePreview />
                      <Input
                      as={EditableInput}
                      isReadOnly
                      type="text"
                      name="poolOwner"
                      id="poolOwner"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                      />
                    </Editable>
                  </FormControl>

                  <FormControl as={GridItem} colSpan={6}>
                    <FormLabel
                      htmlFor="nft_address"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Campaign Length
                    </FormLabel>
                    <Editable defaultValue={"1209600000"} isPreviewFocusable={true}>
                      <EditablePreview />
                      <Input
                      as={EditableInput}
                      type="number"
                      name="_campaignLength"
                      id="_campaignLength"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                      />
                      <EditableControls />
                    </Editable>
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                    <FormLabel
                      htmlFor="voting_length"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Voting Length
                    </FormLabel>
                    <Editable defaultValue={"1209600000"} isPreviewFocusable={true}>
                      <EditablePreview />
                      <Input
                      as={EditableInput}
                      type="number"
                      name="voting_length"
                      id="voting_length"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                      />
                      <EditableControls />
                    </Editable>
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
                    <Editable defaultValue={"432000000"} isPreviewFocusable={true}>
                      <EditablePreview />
                      <Input
                      as={EditableInput}
                      type="number"
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
                      <EditableControls />
                    </Editable>
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
                    <Editable defaultValue={"432000000"} isPreviewFocusable={true}>
                      <EditablePreview />
                      <Input
                      as={EditableInput}
                      type="number"
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
                      <EditableControls />
                    </Editable>
                  </FormControl>
                </SimpleGrid>
              </Stack>
              <Box
                px={{ base: 4, sm: 6 }}
                py={3}
                bg={useColorModeValue("gray.50", "gray.900")}
                textAlign="right"
              >
                <ButtonGroup>
                  <Button
                    type="submit"
                    colorScheme={"red"}
                    _focus={{ shadow: "" }}
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.800")}
                  >
                    Save
                  </Button>
                  <Button
                    type="submit"
                    isDisabled
                    colorScheme={"red"}
                    _focus={{ shadow: "" }}
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.800")}>
                      Deploy Campaign
                  </Button>
                </ButtonGroup>
                
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
                  colorScheme={"red"}
                  _focus={{ shadow: "" }}
                  fontWeight="md"
                  color={useColorModeValue("gray.700", "gray.800")}
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