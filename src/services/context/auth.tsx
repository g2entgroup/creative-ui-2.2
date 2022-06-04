import { createContext, ReactElement, useContext, useEffect, useState } from "react";
import { TextileInstance } from "../textile/textile";
import { useEthers } from "@usedapp/core";
import { PrivateKey } from "@textile/hub";
import { getIdentity } from '../../utils/fetchTextileIdentity';
import { UserModel, DecryptedMessage } from "../textile/types";
import { providers } from "ethers";

// type AuthContextProps = {
//     children?: ReactElement,
//     userModel: UserModel,
//     inboxMessages: DecryptedMessage[]
// }

type AuthContext = {
    isLoggedIn?: boolean,
    user?: UserModel,
    role?: string,
    idenity?: PrivateKey,
    textileInstance?: TextileInstance,
    account?: string,
    library?: providers.JsonRpcProvider | providers.Web3Provider,
    inbox?: DecryptedMessage[],
    signUp?: (newUser: UserModel) => Promise<void>,
    logIn?: () => Promise<void>,
    logOut?: () => Promise<void>
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

    const signUp = async (newUser: UserModel) => {
        const instance = await TextileInstance.getInstance();
    
        const user: UserModel = await instance.uploadUserData(newUser);

        setUser(user);
        setRole(user?.role);

        setInbox(await instance.getInbox()); 

        setIsLoggedIn(true);
    }

    const logIn = async () => {

        const instance = await TextileInstance.getInstance();

        const user: UserModel = await instance.setCurrentUser();

        setUser(user);
        setRole(user?.role);

        setInbox(await instance.getInbox()); 

        setIsLoggedIn(true);
    }

    const logOut = async () => {
        setUser(undefined)
        setRole(undefined);
        setInbox(undefined);
        deactivate();
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                user,
                role,
                account,
                library,
                inbox,
                signUp,
                logIn,
                logOut
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