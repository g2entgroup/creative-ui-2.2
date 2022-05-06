import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { providers, Contract } from "ethers";
import { Button } from "@chakra-ui/react";
import { omit, splitSignature } from "../../services/apollo/helpers";

import LENS_FOLLOW_NFT_ABI from "../../abis/LensFollowABI";

type WindowInstanceWithEthereum = Window &
  typeof globalThis & { ethereum?: providers.ExternalProvider };

const CREATE_UNFOLLOW_TYPED_DATA = gql`
  mutation ($request: UnfollowRequest!) {
    createUnfollowTypedData(request: $request) {
      id
      expiresAt
      typedData {
        domain {
          name
          chainId
          version
          verifyingContract
        }
        types {
          BurnWithSig {
            name
            type
          }
        }
        value {
          nonce
          deadline
          tokenId
        }
      }
    }
  }
`;

interface FollowType {
  profileId: string;
  refetch: () => void;
}

export const UnFollowButton = ({ profileId, refetch }: FollowType) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [createUnfollowTypedData, {}] = useMutation(
    CREATE_UNFOLLOW_TYPED_DATA,
    {
      onCompleted({ createUnfollowTypedData }: any) {
        if (!createUnfollowTypedData) console.log("createUnFollow is null");

        const provider = new providers.Web3Provider(
          (window as WindowInstanceWithEthereum).ethereum
        );
        const signer = provider.getSigner();

        const { typedData } = createUnfollowTypedData;
        const { tokenId } = typedData?.value;
        const { verifyingContract } = typedData?.domain;

        signer
          ._signTypedData(
            omit(typedData?.domain, "__typename"),
            omit(typedData?.types, "__typename"),
            omit(typedData?.value, "__typename")
          )
          .then((res) => {
            const { v, r, s } = splitSignature(res);
            const followContract = new Contract(
              verifyingContract,
              LENS_FOLLOW_NFT_ABI,
              signer
            );
            const sig = {
              v,
              r,
              s,
              deadline: typedData.value.deadline,
            };
            const excuteContract = async () => {
              const tx = await followContract.burnWithSig(tokenId, sig);
              tx.wait(1).then(() => {
                refetch();
                setIsUpdating(false);
              });
            };
            return excuteContract();
          })
          .catch((err) => {
            console.log(err);
            setIsUpdating(false);
          });
      },
    }
  );

  const handleUnfollow = () => {
    setIsUpdating(true);
    createUnfollowTypedData({
      variables: {
        request: {
          profile: profileId,
        },
      },
    });
  };

  if (isUpdating) {
    return <Button isLoading />;
  }

  return (
    <Button onClick={() => handleUnfollow()} background="#e50168">
      - Unfollow
    </Button>
  );
};
