import Uploadnftinfo from "../components/forms/uploadnftinfo"
import { Box, Flex, Center, useColorModeValue, Text, Stack, chakra, VisuallyHidden, Icon, Button } from "@chakra-ui/react"
import React, { useState } from "react"
import { TextileInstance } from "../services/textile/textile"

export default function UploadNFT() {

  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();

  const onFileChange = async event => {
    const file = ((event.target as HTMLInputElement).files as FileList)[0];
    if (file.size > 10240000) {
      alert("Please upload an image that has a max size of 10 MB");
      return;
    }

    this.setSelectedFile(file);
    setSubmitEnabled(true);
  };

  const onFileUpload = async event => {
    event.preventDefault();
    setSubmitEnabled(false);

    const textileInstance = await TextileInstance.getInstance();
    const nftMetadata = await textileInstance.uploadNFT(this.selectedFile);
    // TODO: add the above nft metadata to a database to manage the NFTs uploaded for this user in case we need to delete this later.
    // TODO: pass the cid in the nftMetadata to the minting function in uploadnftinfo.
  }

  return (
    <>
      <Center py={4}>
        <Box
          maxW={'545px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'2xl'}
          rounded={'md'}
          alignContent={"center"}
          p={100}
          overflow={'hidden'}>

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
                strokeLinecap="round"
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
                textAlign="center"
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
                  <Button colorScheme='pink' variant="solid" size="sm" width={125} disabled={!submitEnabled} onClick={onFileUpload}>
                    Submit File
                  </Button>
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
        </Box>
      </Center>
      <Uploadnftinfo />
    </>
  )
}