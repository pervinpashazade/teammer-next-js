import { doc, setDoc } from "firebase/firestore";
import { useState, useEffect, useContext, createContext } from "react";
import  "./firebase";


import {getAuth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, signInWithPopup} from 'firebase/auth'

import Login from "./pages/login";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        // console.log('test');

        return getAuth().onIdTokenChanged(async (user) => {
            if (!user) {
                console.log('no user');
                setCurrentUser(null);
                setLoading(false);
                return;
            };

            const token = await user.getIdToken();


    
        
            // console.log('user user', user);

            setCurrentUser(user);
            setLoading(false);
        })
    }, [])

    // if (!currentUser) {
    //     return <Login />
    // } else {
    //     return <AuthContext.Provider
    //         value={{
    //             currentUser
    //         }}
    //     >
    //         {children}
    //     </AuthContext.Provider>
    // }

    return <AuthContext.Provider
        value={{
            currentUser
        }}
    >
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);