import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useEthers } from "@usedapp/core";
import { FollowButton, UnFollowButton } from "./";

const DOES_FOLLOW = gql`
  query ($request: DoesFollowRequest!) {
    doesFollow(request: $request) {
      profileId
      follows
    }
  }
`;

export const CheckFollow = ({ profileId }: { profileId: string }) => {
  const { account } = useEthers();
  if (!account) return null;

  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const {
    data: doesFollowData,
    loading,
    refetch,
  } = useQuery(DOES_FOLLOW, {
    variables: {
      request: {
        followInfos: [
          {
            followerAddress: account,
            profileId,
          },
        ],
      },
    },
    onCompleted: (data) => {
      const { doesFollow } = data;
      const { follows } = doesFollow[0];
      setIsFollowing(follows);
    },
  });

  // return null if loading
  if (loading) return null;
  // return null if no data
  if (!doesFollowData.doesFollow[0]) return null;

  const handleRefetch = async () => {
    await refetch();
  };
  return (
    <div>
      {isFollowing ? (
        <UnFollowButton profileId={profileId} refetch={handleRefetch} />
      ) : (
        <FollowButton profileId={profileId} refetch={handleRefetch} />
      )}
    </div>
  );
};
