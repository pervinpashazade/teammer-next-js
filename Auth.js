import React, { useState, useEffect, useContext, createContext } from "react";
import "./firebase";
import { useRouter } from "next/router";
import { getAuth } from 'firebase/auth';
import { getApps } from "firebase/app";
import { getCookie, setAuthCookies } from "./src/helpers/cookie";
import axios from "axios";
import config from "./src/configuration";
import { getFetchData } from "./lib/fetchData";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const router = useRouter();
    // const jwtgetCookie = getCookie('teammers-access-token');
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {

        const jwtgetCookie = getCookie('teammers-access-token');

        if (jwtgetCookie) {
            const fetchUserInfo = await getFetchData(
                "auth/user?include=skills,positions,experiences,experiences.location,detail.location",
                jwtgetCookie
            );

            if (fetchUserInfo.success) {
                setCurrentUser(fetchUserInfo.data);
            };

            return;
        };

        if (!getApps().length) return;

        return getAuth().onIdTokenChanged(async (user) => {

            if (!user) {
                // console.log('no user');
                setCurrentUser(null);
                setLoading(false);
                return;
            };

            axios.post(config.BASE_URL + 'auth/login-via-firebase', {
                accessToken: user.accessToken
            }).then(res => {

                console.log('AUTH FIREBASE ', res);

                if (res?.data.success) {
                    // console.log('LOG auth/login-via-firebase :', res.data);

                    setAuthCookies(
                        res.data.data.token,
                        res.data.data.user.full_name,
                        res.data.data.user.type,
                        res.data.data.user.id
                    );

                    setCurrentUser(res.data.data.user);

                    console.log('google login res', res.data);

                    if (res.data.data.user.is_complete_registration) {
                        if (res.data.data.user.type === 1) {
                            router.push('/owner/home')
                        } else {
                            router.push('/teammer/home')
                        }
                    } else {
                        router.push("/signup/steps");
                    };
                };
            }).catch(error => {
                console.log('login-via-firebase error', error);
            });

            return;
        });

    }, []);

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