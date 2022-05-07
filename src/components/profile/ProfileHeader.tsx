import { useState, useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { CheckFollow } from "../../components/lens";
import { EditProfile } from "../lens";
import { Box, Heading, Text, Image, chakra } from "@chakra-ui/react";
import { FaTwitter, FaConnectdevelop, FaUserAlt } from "react-icons/fa";

interface ProfileHeaderProps {
  profile: any;
  balance: number;
  refetch: () => void;
}

export const ProfileHeader = ({
  profile,
  balance,
  refetch,
}: ProfileHeaderProps) => {
  const { account } = useEthers();
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    if (profile.picture) {
      if (profile.picture.__typename === "NftImage") {
        setProfilePic(profile.picture.uri);
      }
      if (profile.picture.__typename === "MediaSet") {
        setProfilePic(profile.picture.original.url);
      }
    }
  }, [profile]);

  return (
    <Box
      margin={"auto"}
      maxW={["100%", "100%", "100%", "60%"]}
      display="flex"
      overflowX="hidden"
      justifyContent={["center", "center", "center", "space-evenly"]}
      flexDir={["column", "column", "column", "row"]}
    >
      <Box
        display="flex"
        flexDir={"column"}
        marginTop={30}
        marginRight={[0, 0, 0, 0]}
        marginBottom={[10, 10, 10, 0]}
        alignItems="center"
        maxW={["100%", "100%", "100%", "20%"]}
        cursor={"cursor"}
      >
        {profilePic ? (
          <Image
            borderRadius="full"
            boxSize="80px"
            src={profilePic}
            alt={profile.handle}
            marginBottom={[10, 10, 10, 5]}
          />
        ) : (
          <Box marginBottom={[10, 10, 10, 5]}>
            <FaUserAlt size={80} />
          </Box>
        )}
        <chakra.h2
          color="black"
          fontSize="md"
          fontWeight="medium"
          marginBottom={[10, 10, 10, 5]}
        >
          @{profile.handle}
        </chakra.h2>
        {account === profile.ownedBy ? (
          // <Button background="#e50168">Edit Profile</Button>
          <EditProfile profile={profile} refetch={refetch} />
        ) : (
          <CheckFollow profileId={profile.id} />
        )}
      </Box>
      <Box maxW={["100%", "100%", "100%", "80%"]}>
        <Box
          margin="auto"
          display="flex"
          justifyContent="space-between"
          flexDir={["column", "column", "row", "row"]}
          marginBottom={20}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            flexDir={["column", "column", "row", "row"]}
          >
            <Box marginBottom={[10, 10, 0, 0]}>
              <Box display={["flex", "flex", "flex", "flex"]}>
                <chakra.h2 color="black" fontSize="xl" fontWeight="medium">
                  {profile.name}
                </chakra.h2>
              </Box>
              {profile.twitter && (
                <Box
                  display="flex"
                  fontSize="sm"
                  alignContent={"left"}
                  padding={2}
                >
                  <a
                    href={`https://twitter.com/${profile.twitter}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{ display: "flex" }}
                  >
                    <FaTwitter />
                    <Text marginLeft={4}>{profile.twitter}</Text>
                  </a>
                </Box>
              )}
              {profile.website && (
                <Box
                  display="flex"
                  fontSize="sm"
                  alignContent={"left"}
                  padding={2}
                >
                  <a
                    href={`${profile.website}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{ display: "flex" }}
                  >
                    <FaConnectdevelop />
                    <Text marginLeft={4}>{profile.website}</Text>
                  </a>
                </Box>
              )}
            </Box>
          </Box>
          <Box>
            <Box marginBottom={5}>
              <Heading>Total Winnings</Heading>
            </Box>
            <Box>
              <Heading color="red">{balance} USDC</Heading>{" "}
            </Box>
          </Box>
        </Box>

        <Box
          margin="auto"
          flexDir={["column", "column", "row", "row"]}
          marginBottom={20}
        >
          <Heading>Biography</Heading>
          <Text textAlign="left" fontSize={"lg"}>
            {profile.bio}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
