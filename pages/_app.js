import React from "react";
import { AuthProvider } from '../Auth';
import { wrapper } from "../src/store/redux-store";
import Layout from "../src/components/common/Layout";
import 'rsuite/dist/rsuite.min.css';
import '../styles/bootstrap/bootstrap.scss';
import '../styles/style.scss';
import "../firebase.js";
import CheckAuthentication from "../src/containers/CheckAuthentication";
import withAuth from "../hooks/withAuth";
import { useRouter } from "next/router";

function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}) {

    const router = useRouter();

    React.useEffect(() => {
        document.body.classList.toggle('overflow-hidden', router.pathname === "/signup/steps");
    }, [router.pathname]);

    return (
        <AuthProvider>
            <CheckAuthentication>
                {
                    Component.layout ?
                        <Layout>
                            <Component {...pageProps} />
                        </Layout> : <Component {...pageProps} />
                }
            </CheckAuthentication>
        </AuthProvider>
    )
};

export default withAuth(MyApp);