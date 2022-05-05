import React, {useEffect, useState} from "react";
import {AuthProvider} from '../Auth';
import Layout from "../src/components/common/Layout";
import 'rsuite/dist/rsuite.min.css';
import '../styles/bootstrap/bootstrap.scss';
import '../styles/style.scss';
import "../firebase.js";
import withAuth from "../hooks/withAuth";
import "../src/axios-interceptor";
import {useRouter} from "next/router";
import ChatProvider from "../src/contexts/ChatProvider";
import {firebaseMessaging} from "../firebase.js";

function MyApp({
                   Component,
                   pageProps: {session, ...pageProps},
               }) {
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const startLoading = () => {
        setLoading(true)
    }
    const stopLoading = () => {
        setLoading(false)
    }
    useEffect(() => {
        firebaseMessaging();
        router.events.on('routeChangeStart', startLoading);
        router.events.on('routeChangeComplete', stopLoading);
        return () => {
            router.events.off('routeChangeStart', startLoading);
            router.events.off('routeChangeComplete', stopLoading);
        }
    }, []);

    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', router.pathname === "/signup/steps");
    }, [router.pathname]);
    // if (loading) {
    //     return <div>salam</div>
    // } else
    return (
        <div className={loading && "startLoading"}>
            <AuthProvider>
                <ChatProvider>
                    {
                        Component.layout ?
                            <Layout>
                                <Component {...pageProps} />
                            </Layout> : <Component {...pageProps} />
                    }
                </ChatProvider>
            </AuthProvider>
        </div>
    )
};

export default withAuth(MyApp);