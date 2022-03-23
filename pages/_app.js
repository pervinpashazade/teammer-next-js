import React from "react";
import { AuthProvider } from '../Auth';
import { wrapper } from "../src/store/redux-store";
import Layout from "../src/components/common/Layout";
import 'rsuite/dist/rsuite.min.css';
import '../styles/bootstrap/bootstrap.scss';
import '../styles/style.scss';
import "../firebase.js";

function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}) {

    // React.useEffect(() => {
    //     initializeFirebase();
    // }, []);

    return (
        <AuthProvider>
            {
                Component.layout ?
                    <Layout>
                        <Component {...pageProps} />
                    </Layout> : <Component {...pageProps} />
            }
        </AuthProvider>
    )
};

export default wrapper.withRedux(MyApp);