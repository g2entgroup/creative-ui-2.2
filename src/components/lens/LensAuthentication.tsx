import { useEthers } from "@usedapp/core";
import { providers } from "ethers";
import { gql, useQuery, useMutation } from "@apollo/client";
import { setAuthenticationToken } from "../../services/apollo/token";
import { Box, Button } from "@chakra-ui/react";

type WindowInstanceWithEthereum = Window &
  typeof globalThis & { ethereum?: providers.ExternalProvider };
class StrongType<Definition, Type> {
  // @ts-ignore
  private _type: Definition;
  constructor(public value?: Type) {}
}
export class EthereumAddress extends StrongType<"ethereum_address", string> {}

const GET_CHALLENGE = gql`
  query ($request: ChallengeRequest!) {
    challenge(request: $request) {
      text
    }
  }
`;

const AUTHENTICATION = gql`
  mutation ($request: SignedAuthChallenge!) {
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
  }
`;

export const LensAuthentication = () => {
  const { account } = useEthers();

  const getChallenge = useQuery(GET_CHALLENGE, {
    variables: {
      request: {
        address: account,
      },
    },
  });

  const [
    getAuthentication,
    { error: errorAuthenticate, loading: authLoading },
  ] = useMutation(AUTHENTICATION);

  const handleSignIn = async () => {
    const provider = new providers.Web3Provider(
      (window as WindowInstanceWithEthereum).ethereum
    );
    const signer = provider.getSigner();
    // console.log("sign in");
    getChallenge.refetch().then((res) => {
      const signAuthentication = async () => {
        await signer.signMessage(res.data.challenge.text).then((signature) => {
          getAuthentication({
            variables: {
              request: {
                address: account,
                signature,
              },
            },
          }).then((res) => {
            setAuthenticationToken({ token: res.data.authenticate });
          });
        });
      };
      signAuthentication();
    });
  };

  if (!account) return <p>Please connect to Metamask to Log into Lens</p>;

  return (
    <Box bg="" color="black" p={4} h={48}>
      <h1>Lens Authentication</h1>
      <Box p={4} h={12}>
        <Button onClick={() => handleSignIn()}>Sign Into Lens</Button>
      </Box>
    </Box>
  );
};
