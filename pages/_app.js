import React, { useEffect } from "react";
import { AuthProvider } from '../Auth';
import Layout from "../src/components/common/Layout";
import 'rsuite/dist/rsuite.min.css';
import '../styles/bootstrap/bootstrap.scss';
import '../styles/style.scss';
import "../firebase.js";
import withAuth from "../hooks/withAuth";
import "../src/axios-interceptor";
import { useRouter } from "next/router";
import ChatProvider from "../src/contexts/ChatProvider";

function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}) {

    const router = useRouter();

    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', router.pathname === "/signup/steps");
    }, [router.pathname]);

    return (
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
    )
};

export default withAuth(MyApp);