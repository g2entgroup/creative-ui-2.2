import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { providers, Contract } from "ethers";
import { useEthers } from "@usedapp/core";
import {
  omit,
  splitSignature,
  uploadIpfsProfile,
} from "../../services/apollo/helpers";

import { LENS_PERIPHERY_CONTRACT } from "../../services/apollo/constants";
import LENS_PERIPHERY_ABI from "../../abis/LensProxyABI.json";

import { useForm } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  FormErrorMessage,
  FormControl,
  FormLabel,
  InputGroup,
  Textarea,
  Button,
  Input,
} from "@chakra-ui/react";

type WindowInstanceWithEthereum = Window &
  typeof globalThis & { ethereum?: providers.ExternalProvider };

export const UPDATE_PROFILE = gql`
  mutation ($request: CreatePublicSetProfileMetadataURIRequest!) {
    createSetProfileMetadataTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          SetProfileMetadataURIWithSig {
            name
            type
          }
        }
        domain {
          name
          chainId
          version
          verifyingContract
        }
        value {
          nonce
          deadline
          profileId
          metadata
        }
      }
    }
  }
`;

interface FormValues {
  name: string;
  location: string;
  bio: string;
  website: string;
  twitter: string;
}

interface EditProfileProps {
  profile: any;
  refetch: () => void;
}

export const EditProfile = ({ profile, refetch }: EditProfileProps) => {
  const { account } = useEthers();
  const [isUpdating, setIsUpdating] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const [createSetProfileMetadataTypedData, {}] = useMutation(UPDATE_PROFILE, {
    onCompleted({ createSetProfileMetadataTypedData }: any) {
      if (!createSetProfileMetadataTypedData)
        console.log("createSetProfileMetadataTypedData is null");

      const provider = new providers.Web3Provider(
        (window as WindowInstanceWithEthereum).ethereum
      );
      const signer = provider.getSigner();
      const lensHub = new Contract(
        LENS_PERIPHERY_CONTRACT,
        LENS_PERIPHERY_ABI,
        signer
      );

      const { typedData } = createSetProfileMetadataTypedData;
      const { profileId, metadata } = typedData?.value;

      signer
        ._signTypedData(
          omit(typedData?.domain, "__typename"),
          omit(typedData?.types, "__typename"),
          omit(typedData?.value, "__typename")
        )
        .then((res) => {
          const { v, r, s } = splitSignature(res);
          const postARGS = {
            user: account,
            profileId,
            metadata,
            sig: {
              v,
              r,
              s,
              deadline: typedData.value.deadline,
            },
          };
          const excuteContract = async () => {
            const tx = await lensHub.setProfileMetadataURIWithSig(postARGS);
            tx.wait(1).then(() => {
              refetch();
              setIsUpdating(false);
              onClose();
            });
          };
          return excuteContract();
        });
    },
    onError(error) {
      console.log(error);
      setIsUpdating(false);
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsUpdating(true);
    const payload = {
      name: values.name,
      bio: values.bio,
      location: values.location,
      cover_picture: null,
      social: [
        {
          traitType: "string",
          value: values.website,
          key: "website",
        },
        {
          traitType: "string",
          value: values.twitter,
          key: "twitter",
        },
      ],
    };
    const result = await uploadIpfsProfile({ payload });

    createSetProfileMetadataTypedData({
      variables: {
        request: {
          profileId: profile.id,
          metadata: "https://ipfs.infura.io/ipfs/" + result.path,
        },
      },
    });
  };
  return (
    <>
      <Button background="#e50168" onClick={onOpen}>
        Edit Profile
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.name}>
                  <FormLabel>Name</FormLabel>
                  <InputGroup>
                    {/* <InputLeftElement children={<BsPerson />} /> */}
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      value={profile.name}
                      placeholder="Name"
                      {...register("name")}
                    />
                  </InputGroup>

                  <FormLabel>Location</FormLabel>
                  <InputGroup>
                    {/* <InputLeftElement children={<MdOutlineEmail />} /> */}
                    <Input
                      id="location"
                      type="text"
                      name="location"
                      value={profile.location}
                      placeholder="Location"
                      {...register("location")}
                    />
                  </InputGroup>

                  <FormLabel>Twitter Handle</FormLabel>
                  <InputGroup>
                    {/* <InputLeftElement children={<MdOutlineEmail />} /> */}
                    <Input
                      type="text"
                      name="twitter"
                      value={profile.twitter}
                      placeholder="Twitter Handle"
                      {...register("twitter")}
                    />
                  </InputGroup>

                  <FormLabel>Website</FormLabel>
                  <InputGroup>
                    {/* <InputLeftElement children={<MdOutlineEmail />} /> */}
                    <Input
                      type="text"
                      name="website"
                      value={profile.website}
                      placeholder="Website"
                      {...register("website")}
                    />
                  </InputGroup>

                  <FormLabel>Bio</FormLabel>
                  <Textarea
                    name="bio"
                    value={profile.bio}
                    placeholder="Bio"
                    rows={6}
                    resize="none"
                    {...register("bio")}
                  />

                  {isUpdating ? (
                    <>
                      <Button isLoading></Button>
                    </>
                  ) : (
                    <Box>
                      <Button mr={8} variant="ghost" onClick={onClose}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme="blue"
                        type="submit"
                        isLoading={isSubmitting}
                      >
                        Save
                      </Button>
                    </Box>
                  )}

                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>
              </form>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
