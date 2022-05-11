import { createContext, ReactElement, useContext, useEffect, useState } from "react";
import { TextileInstance } from "../textile/textile";
import { UserModel, DecryptedMessage } from "../textile/types";
import { JsonRpcProvider } from "@ethersproject/providers";
import { useEthers } from "@usedapp/core";
import { PrivateKey } from "@textile/hub";

// type UsersContextProps = {
//     children?: ReactElement,
//     userModel: UserModel,
//     inboxMessages: DecryptedMessage[]
// }

type UserContext = {
    isLoggedIn?: boolean,
    user?: UserModel,
    role?: string,
    textileInstance?: TextileInstance,
    account?: string,
    library?: JsonRpcProvider,
    inbox?: DecryptedMessage[],
    signUp?: (newUser: UserModel) => Promise<void>,
    logIn?: () => Promise<void>,
    logOut?: () => Promise<void>
};
  
const UsersContext = createContext<UserContext | undefined>(undefined);

const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<UserModel>();
    const [role, setRole] = useState<string>();
    const [inbox, setInbox] = useState<DecryptedMessage[]>();

    const { account, deactivate, library } = useEthers();

    const signUp = async (newUser: UserModel) => {
        const instance = await TextileInstance.getInstance();
    
        const user = await instance.uploadUserData(newUser);

        setUser(user);
        setRole(user?.role);

        setInbox(await instance.getInbox()); 

        setIsLoggedIn(true);
    }

    const logIn = async () => {

        const instance = await TextileInstance.getInstance();

        const user: UserModel = await instance.setCurrentUser();

        console.log({ user, msg: "logIn"})
        
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
        <UsersContext.Provider
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
        </UsersContext.Provider>
    );
}

const useUsersContext = () => {
    const context = useContext(UsersContext);
    if (context === undefined) {
      throw new Error('useOnboard must be used within a OnboardProvider');
    }
    return context;
};

export { UserProvider, useUsersContext };