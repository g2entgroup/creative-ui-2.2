import { useState, useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";

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

export const MintProfile = ({ refetch }: MintProfileProps) => {
  const [handle, setHandle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const { account } = useEthers();

  const [createProfile, { data, loading }] = useMutation(CREATE_PROFILE, {
    variables: {
      request: { handle: handle },
    },
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

  if (!account) return <p>Please connect to Metamask to Log into Lens</p>;
  if (loading || isCreating) return <Button isLoading />;

  const handleCreateProfile = async () => {
    setIsCreating(true);
    await createProfile();
  };

  return (
    <Box bg="" color="black" p={4} h={60}>
      <h1>Mint New Profile</h1>
      <Box p={4} h={16}>
        <Input
          placeholder="handle"
          size="md"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
        />
      </Box>
      <Box p={4} h={16}>
        <Button onClick={() => handleCreateProfile()}>create profile</Button>
      </Box>
      {submitError && (
        <Box bg="red" color="white" borderRadius="lg" m={4} p={4} h={12}>
          {submitError}
        </Box>
      )}
    </Box>
  );
};
