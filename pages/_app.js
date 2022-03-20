import React from "react";
import 'rsuite/dist/rsuite.min.css';
import 'react-quill/dist/quill.snow.css'; // ES6
import '../styles/bootstrap/bootstrap.scss';
import Layout from "../src/components/common/Layout";
import { wrapper } from "../src/store/redux-store";
import '../styles/style.scss';
import { AuthProvider } from '../Auth';
import "../firebase.js"
import { initializeFirebase } from "../firebase.js";

function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}) {

    React.useEffect(() => {
        initializeFirebase();
    }, [])

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
}


export default wrapper.withRedux(MyApp);

