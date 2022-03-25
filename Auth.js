import { useState, useEffect, useContext, createContext } from "react";
import "./firebase";

import { getAuth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, signInWithPopup } from 'firebase/auth';

import { getApps } from "firebase/app";
import axios from "axios";
import config, { NEXT_URL } from "./src/configuration";
import { setAuthCookies } from "./src/helpers/cookie";
import { useRouter } from "next/router";
import { getLocalUser } from "./src/services/Auth/getLocalUser";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const router = useRouter();

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        // console.log('log', getApps());

        if (!getApps().length) return;

        // axios.get(NEXT_URL + 'api/auth').then(res => {
        //     console.log('1 - local api test', res);
        //     if (res?.data.success) {

        //         setAuthCookies(
        //             res.data.token,
        //             res.data.user.full_name,
        //             res.data.user.type,
        //             res.data.user.id
        //         );

        //         setCurrentUser(res.data.user);
        //     };
        //     return;
        // });

        return getAuth().onIdTokenChanged(async (user) => {

            if (!user) {
                // console.log('no user');
                setCurrentUser(null);
                setLoading(false);
                return;
            };

            // console.log('Auth User', user);

            // const localData = await getLocalUser();

            // console.log('localData', localData);

            // if (!localData.success) {
            axios.post(config.BASE_URL + 'auth/login-via-firebase', {
                accessToken: user.accessToken
            }).then(res => {
                if (res?.data.success) {
                    // console.log('LOG auth/login-via-firebase :', res.data);

                    setAuthCookies(
                        res.data.data.token,
                        res.data.data.user.full_name,
                        res.data.data.user.type,
                        res.data.data.user.id
                    );

                    setCurrentUser(res.data.data.user);
                };
            });
            // };

            return;

            // const token = await user.getIdToken();

            // console.log('AuthProvider user user :', user);

            // setCurrentUser(user);
            // setLoading(false);
        });
    }, []);

    useEffect(() => {

        // console.log('UPDATE current user : ', currentUser);

        if (currentUser) {

            // if (!currentUser.type) return router.push("/signup/steps");

            if (currentUser.type === 1) {
                router.push("/owner/home");
            } else if (currentUser.type === 2) {
                router.push("/teammer/home");
            } else {
                // router.push("/signup/steps");
            };
        } else {
            // console.log('AuthComponent js Not Auth');
        };
    }, [currentUser]);

    return <AuthContext.Provider
        value={{
            currentUser,
            setCurrentUser,
            loading,
            setLoading
        }}
    >
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);