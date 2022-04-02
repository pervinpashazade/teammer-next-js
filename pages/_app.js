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
import "../src/axios-interceptor";
function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}) {

    // React.useEffect(() => {
    //     useless
    //     initializeFirebase();
    // }, []);

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