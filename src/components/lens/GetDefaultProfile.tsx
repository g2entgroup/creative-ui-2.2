import { useEthers } from "@usedapp/core";
import { gql, useQuery } from "@apollo/client";

import { ProfileFragment } from "../../services/apollo/lens-graphql/ProfileFragment";

const GET_DEFAULT_PROFILES = gql`
  query ($request: DefaultProfileRequest!) {
    defaultProfile(request: $request) {
      ...ProfileFragment
      metadata
      isDefault
    }
  }
  ${ProfileFragment}
`;

export const GetDefaultProfile = () => {
  const { account } = useEthers();
  if (!account) return <p>Please connect to Metamask to Log into Lens</p>;
  const {
    data: defaultProfileData,
    loading,
    error,
  } = useQuery(GET_DEFAULT_PROFILES, {
    variables: {
      request: {
        ethereumAddress: account,
      },
    },
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(defaultProfileData);

  return (
    <div>
      <h1>Get Default Profile</h1>
    </div>
  );
};
