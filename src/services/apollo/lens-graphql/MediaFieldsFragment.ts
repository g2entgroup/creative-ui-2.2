import { gql } from "@apollo/client";

export const MediaFieldsFragment = gql`
  fragment MediaFieldsFragment on Media {
    url
    width
    height
    size
    mimeType
  }
`;
