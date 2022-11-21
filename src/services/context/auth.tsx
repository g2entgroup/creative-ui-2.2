import { createContext, ReactElement, useContext, useEffect, useState } from "react";
import { TextileInstance } from "../textile/textile";
import { useEthers } from "@usedapp/core";
import { Private, PrivateKey } from "@textile/hub";
import { UserModel, DecryptedMessage } from "../textile/types";
import { BigNumber, providers, utils } from "ethers";
import bcryptjs from "bcryptjs";
import { EthereumAddress } from "src/components/common/Navbar/SignIn";

type AuthContext = {
    isLoggedIn?: boolean,
    user?: UserModel,
    role?: string,
    identity?: PrivateKey,
    textileInstance?: TextileInstance,
    account?: string,
    library?: providers.JsonRpcProvider | providers.Web3Provider,
    inbox?: DecryptedMessage[],
    signup: (newUser: UserModel, identity?: PrivateKey) => Promise<void>,
    login: (identity?: PrivateKey) => Promise<void>,
    logOut: () => Promise<void>,
    createIdentity: (secret?: string) => Promise<PrivateKey>,
    getIdentity: (secret?: string) => Promise<PrivateKey>
};
  
const AuthContext = createContext<AuthContext | undefined>(undefined);

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<UserModel>();
    const [role, setRole] = useState<string>();
    const [inbox, setInbox] = useState<DecryptedMessage[]>();
    const [identity, setIdentity] = useState<PrivateKey>(null);

    const { account, deactivate, library } = useEthers();

    useEffect(() => {
        async () => setIdentity(await getIdentity());
    }, [isLoggedIn]);

    const signup = async (newUser: UserModel) => {
        const instance = await TextileInstance.signUp(newUser)
        setUser(newUser)
        setRole(newUser?.role)
        setIsLoggedIn(true)
        setInbox(await instance.getInbox())
    }

    const login = async (identity?: PrivateKey) => {
        await TextileInstance.setPrivateKey(identity)
        const instance = await TextileInstance.getInstance(true)
        const user: UserModel = await instance.getCurrentUser()
        setUser(user)
        setRole(user?.role)
        setInbox(await instance.getInbox())
        setIsLoggedIn(true)
    }

    const logOut = async () => {
        setUser(undefined)
        setRole(undefined);
        setInbox(undefined);
        deactivate();
        setIsLoggedIn(false);
    }

    const getIdentity = async (secret?: string): Promise<PrivateKey> => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        try {
          if (urlParams.get('force')) {
            window.history.replaceState({}, document.title, "/");
            throw new Error('Forced new identity')
          }
          const storedIdent = localStorage.getItem("identity")
          if (storedIdent === null) {
            throw new Error('No identity')
          }
          const restored = PrivateKey.fromString(storedIdent)
          TextileInstance.setPrivateKey(restored);
          setIdentity(restored)
          console.log("GET_RESTORED: ", restored)
          return restored
        }
        catch (e) {
          try {
            const identity = await createIdentity(secret);
            TextileInstance.setPrivateKey(identity)
            setIdentity(identity)
            const identityString = identity.toString()
            localStorage.setItem("identity", identityString)
            console.log("GET_IDENTITY: ", identity)
            return identity
          } catch (err) {
            return err.message
          }
        }
    };      

    const generateMessageForEntropy = (
      ethereum_address: EthereumAddress,
      application_name: string,
      secret: string
    ): string => {
      return (
        "******************************************************************************** \n" +
        "READ THIS MESSAGE CAREFULLY. \n" +
        "DO NOT SHARE THIS SIGNED MESSAGE WITH ANYONE OR THEY WILL HAVE READ AND WRITE \n" +
        "ACCESS TO THIS APPLICATION. \n" +
        "DO NOT SIGN THIS MESSAGE IF THE FOLLOWING IS NOT TRUE OR YOU DO NOT CONSENT \n" +
        "TO THE CURRENT APPLICATION HAVING ACCESS TO THE FOLLOWING APPLICATION. \n" +
        "******************************************************************************** \n" +
        "The Ethereum address used by this application is: \n" +
        "\n" +
        ethereum_address.value +
        "\n" +
        "\n" +
        "\n" +
        "By signing this message, you authorize the current application to use the \n" +
        "following app associated with the above address: \n" +
        "\n" +
        application_name +
        "\n" +
        "\n" +
        "\n" +
        "The hash of your non-recoverable, private, non-persisted password or secret \n" +
        "phrase is: \n" +
        "\n" +
        secret +
        "\n" +
        "\n" +
        "\n" +
        "******************************************************************************** \n" +
        "ONLY SIGN THIS MESSAGE IF YOU CONSENT TO THE CURRENT PAGE ACCESSING THE TEXTILE KEYS \n" +
        "ASSOCIATED WITH THE ABOVE ADDRESS AND APPLICATION. \n" +
        "NOTE THIS DOES NOT ALLOW ACCESS TO YOUR WALLET FOR BLOCKCHAIN TX. \n" +
        "AGAIN, DO NOT SHARE THIS SIGNED MESSAGE WITH ANYONE OR THEY WILL HAVE READ AND \n" +
        "WRITE ACCESS TO THIS APPLICATION. \n" +
        "******************************************************************************** \n"
      );
    };
  
    const createIdentity = async (secret?: string): Promise<PrivateKey> => {
      const signer = (library as providers.Web3Provider).getSigner();
      const salt: string = "$2a$10$3vx4QH1vSj9.URynBqkbae";
      // avoid sending the raw secret by hashing it first
      const hashSecret = bcryptjs.hashSync(secret, salt);
      const message = generateMessageForEntropy(
        new EthereumAddress(account),
        "Creative",
        hashSecret
      );
      const signedText = await signer.signMessage(message);
      const hash = utils.keccak256(signedText);
      if (hash === null) {
        throw new Error(
          "No account is provided. Please provide an account to this application."
        );
      }
      // The following line converts the hash in hex to an array of 32 integers.
      // @ts-ignore
      const array = hash
        // @ts-ignore
        .replace("0x", "")
        // @ts-ignore
        .match(/.{2}/g)
        .map((hexNoPrefix) => BigNumber.from("0x" + hexNoPrefix).toNumber());
  
      if (array.length !== 32) {
        throw new Error(
          "Hash of signature is not the correct size! Something went wrong!"
        );
      }
      const identity = PrivateKey.fromRawEd25519Seed(Uint8Array.from(array));
      console.log(`Your VIP Key: ${identity.public.toString()}`);
      setIdentity(identity);
      const identityString = identity.toString();
      localStorage.setItem("identity", identityString);
      return identity;
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                user,
                role,
                identity,
                account,
                library: library as providers.Web3Provider,
                inbox,
                signup,
                login,
                logOut,
                createIdentity,
                getIdentity
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useOnboard must be used within a OnboardProvider');
    }
    return context;
};

export { AuthProvider, useAuth };