import { gql } from "@apollo/client";

import { MediaFieldsFragment } from "./MediaFieldsFragment";

export const ProfileFragment = gql`
  fragment ProfileFragment on Profile {
    id
    ownedBy
    handle
    name
    bio
    location
    website
    twitter
    picture {
      ... on MediaSet {
        original {
          ...MediaFieldsFragment
        }
      }
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
    }
    followModule {
      __typename
    }
    stats {
      totalFollowers
      totalFollowing
    }
  }
  ${MediaFieldsFragment}
`;
