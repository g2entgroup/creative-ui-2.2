import { useState, useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { CheckFollow } from "../../components/lens";
import { EditProfile } from "../lens";
import { Box, Heading, Text, Image, chakra } from "@chakra-ui/react";
import { FaTwitter, FaConnectdevelop, FaUserAlt } from "react-icons/fa";

const filterAttributes = (attributes: any, key: string) => {
  return attributes.filter((attribute: any) => attribute.key === key);
};

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
    if (profile && profile.picture) {
      if (profile.picture.__typename === "NftImage") {
        setProfilePic(profile.picture.uri);
      }
      if (profile.picture.__typename === "MediaSet") {
        setProfilePic(profile.picture.original.url);
      }
    }
  }, [profile]);

  const checkLocation = () => {
    const location = filterAttributes(profile.attributes, "location");
    if (location[0]) return location[0].value;
  };

  const checkTwitter = () => {
    const twitter = filterAttributes(profile.attributes, "twitter");
    if (twitter[0]) return twitter[0].value;
  };

  const checkWebsite = () => {
    const website = filterAttributes(profile.attributes, "website");
    if (website[0]) return website[0].value;
  };

  if (!profile)
    return (
      <Box
        margin={"auto"}
        maxW={["100%", "100%", "100%", "60%"]}
        display="flex"
        overflowX="hidden"
        justifyContent={["center", "center", "center", "space-evenly"]}
        flexDir={["column", "column", "column", "row"]}
      >
        <chakra.h2 color="black" fontSize="3xl" fontWeight="bold">
          No user with this handle
        </chakra.h2>
      </Box>
    );

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
        <chakra.h2 color="black" fontSize="md" fontWeight="medium">
          @{profile.handle}
        </chakra.h2>
        {profile.attributes && checkLocation() && (
          <Box
            display="flex"
            fontSize="sm"
            alignContent={"left"}
            padding={2}
            marginBottom={[10, 10, 10, 5]}
          >
            <span style={{ display: "flex" }}>
              <FaConnectdevelop />
              <Text marginLeft={4}>{checkLocation()}</Text>
            </span>
          </Box>
        )}
        {account === profile.ownedBy ? (
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
              {profile.attributes && checkTwitter() && (
                <Box
                  display="flex"
                  fontSize="sm"
                  alignContent={"left"}
                  padding={2}
                >
                  <a
                    href={`https://twitter.com/${checkTwitter()}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{ display: "flex" }}
                  >
                    <FaTwitter />
                    <Text marginLeft={4}>{checkTwitter()}</Text>
                  </a>
                </Box>
              )}
              {profile.attributes && checkWebsite() && (
                <Box
                  display="flex"
                  fontSize="sm"
                  alignContent={"left"}
                  padding={2}
                >
                  <a
                    href={`${checkWebsite()}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{ display: "flex" }}
                  >
                    <FaConnectdevelop />
                    <Text marginLeft={4}>{checkWebsite()}</Text>
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
