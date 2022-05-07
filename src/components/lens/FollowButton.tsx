import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { providers, Contract } from "ethers";
import { Button } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { omit, splitSignature } from "../../services/apollo/helpers";

import { LENS_HUB_PROXY_ADDRESS } from "../../services/apollo/constants";
import LENS_ABI from "../../abis/LensHubABI.json";

type WindowInstanceWithEthereum = Window &
  typeof globalThis & { ethereum?: providers.ExternalProvider };

const CREATE_FOLLOW_TYPED_DATA = gql`
  mutation ($request: FollowRequest!) {
    createFollowTypedData(request: $request) {
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
          FollowWithSig {
            name
            type
          }
        }
        value {
          nonce
          deadline
          profileIds
          datas
        }
      }
    }
  }
`;

interface FollowType {
  profileId: string;
  refetch: () => void;
}

export const FollowButton = ({ profileId, refetch }: FollowType) => {
  const { account } = useEthers();
  const [isUpdating, setIsUpdating] = useState(false);

  const [createFollowTypedData, {}] = useMutation(CREATE_FOLLOW_TYPED_DATA, {
    onCompleted({ createFollowTypedData }: any) {
      if (!createFollowTypedData) console.log("createFollow is null");

      const provider = new providers.Web3Provider(
        (window as WindowInstanceWithEthereum).ethereum
      );
      const signer = provider.getSigner();
      const lensHub = new Contract(LENS_HUB_PROXY_ADDRESS, LENS_ABI, signer);
      const { typedData } = createFollowTypedData;
      const { profileIds, datas } = typedData?.value;

      signer
        ._signTypedData(
          omit(typedData?.domain, "__typename"),
          omit(typedData?.types, "__typename"),
          omit(typedData?.value, "__typename")
        )
        .then((res) => {
          const { v, r, s } = splitSignature(res);
          const postARGS = {
            follower: account,
            profileIds,
            datas,
            sig: {
              v,
              r,
              s,
              deadline: typedData.value.deadline,
            },
          };
          const excuteContract = async () => {
            const tx = await lensHub.followWithSig(postARGS);
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
  });

  const handleFollow = () => {
    setIsUpdating(true);
    createFollowTypedData({
      variables: {
        request: {
          follow: { profile: profileId },
        },
      },
    });
  };

  if (isUpdating) {
    return <Button isLoading />;
  }

  return (
    <Button onClick={() => handleFollow()} background="#e50168">
      + Follow
    </Button>
  );
};
