import NextLink from "next/link";
import { Suspense, useState } from "react";
import { useEthers } from "@usedapp/core";
import { gql, useQuery } from "@apollo/client";
import { MintProfile } from "./";
import { Flex, Box } from "@chakra-ui/react";

import { ProfileFragment } from "../../services/apollo/lens-graphql/ProfileFragment";

const GET_PROFILES = gql`
  query ($request: ProfileQueryRequest!) {
    profiles(request: $request) {
      items {
        ...ProfileFragment
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }
  ${ProfileFragment}
`;

export const GetProfiles = () => {
  const { account } = useEthers();
  const [profiles, setProfiles] = useState([]);

  const {
    data: userProfilesData,
    loading,
    error,
    refetch,
  } = useQuery(GET_PROFILES, {
    variables: {
      request: { ownedBy: account },
    },
    onCompleted: (data) => {
      setProfiles(data.profiles.items);
    },
  });

  if (!account) return <p>Please connect to Metamask to Log into Lens</p>;
  if (loading) return <p>loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleRefetch = async () => {
    await refetch();
  };

  return (
    <Suspense>
      <Box m={4} p={4}>
        <h1>Account's Profiles</h1>
        <Flex>
          {profiles.map((profile, index) => (
            <ProfileCard key={index} profile={profile} />
          ))}
        </Flex>
        <MintProfile refetch={handleRefetch} />
      </Box>
    </Suspense>
  );
};

const ProfileCard = ({ profile }) => {
  return (
    <NextLink href={`/profile/${profile.handle}`} passHref>
      <Box
        cursor={"pointer"}
        bg="gray"
        color="black"
        borderRadius="lg"
        m={4}
        p={4}
        h={48}
        w={48}
      >
        <h1>{profile.handle}</h1>
        <p>{profile.id}</p>
        <p>{profile.name}</p>
        <p>{profile.bio}</p>
      </Box>
    </NextLink>
  );
};
