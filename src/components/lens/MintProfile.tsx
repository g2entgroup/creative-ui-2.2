import { useState, useEffect, Suspense } from "react";
import { useEthers } from "@usedapp/core";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { useForm, SubmitHandler } from "react-hook-form";

import { Box, Input, Button } from "@chakra-ui/react";

const CREATE_PROFILE = gql`
  mutation ($request: CreateProfileRequest!) {
    createProfile(request: $request) {
      ... on RelayerResult {
        txHash
      }
      ... on RelayError {
        reason
      }
      __typename
    }
  }
`;

interface MintProfileProps {
  refetch: () => void;
}

interface IFormInputs {
  handle: string;
}

export const MintProfile = ({ refetch }: MintProfileProps) => {
  const [handle, setHandle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const { account } = useEthers();

  const [createProfile, { data, loading }] = useMutation(CREATE_PROFILE, {
    onCompleted: () => {
      setHandle("");
      setIsCreating(false);
      refetch();
    },
  });
  useEffect(() => {
    if (
      data?.createProfile &&
      data?.createProfile.__typename === "RelayError"
    ) {
      setSubmitError("Handle already taken");
    }
  }, [data]);

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    setIsCreating(true);
    setSubmitError("");

    await createProfile({
      variables: {
        request: {
          handle: data.handle.toLowerCase(),
        },
      },
    });
  };

  if (!account) return <p>Please connect to Metamask to Log into Lens</p>;
  if (loading || isCreating) return <Button isLoading />;

  return (
    <Suspense>
      <Box bg="" color="black" p={4} h={80}>
        <h1>Mint New Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box p={4} h={16}>
            <Input
              placeholder="handle"
              size="md"
              {...register("handle", {
                required: true,
                minLength: 5,
                maxLength: 31,
              })}
            />
          </Box>
          <Box p={4} h={16}>
            <Button type="submit">create profile</Button>
          </Box>
          {errors.handle && (
            <Box bg="red" color="white" borderRadius="lg" m={4} p={4}>
              <p>{errors.handle?.type === "required" && "Handle is required"}</p>
              <p>
                {(errors.handle?.type === "minLength" || "maxLength") &&
                  "Handle must be at least 5 characters and less than 31 characters"}
              </p>
              <p>{submitError}</p>
            </Box>
          )}
          {submitError && (
            <Box bg="red" color="white" borderRadius="lg" m={4} p={4}>
              <p>{submitError}</p>
            </Box>
          )}
        </form>
      </Box>
    </Suspense>
  );
};
