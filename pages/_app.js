import 'rsuite/dist/rsuite.min.css';
import 'react-quill/dist/quill.snow.css'; // ES6
import '../styles/bootstrap/bootstrap.scss';
import Layout from "../src/components/common/Layout";
import {useRouter} from "next/router";
import {wrapper} from "../src/store/redux-store";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import '../styles/style.scss';
import {SessionProvider} from "next-auth/react"

function MyApp({Component, pageProps: {session, ...pageProps}}) {
    const router = useRouter();
    const store = useSelector(state => state)
    const dispatch = useDispatch();
    // if (router.pathname === "/login" ||
    //     router.pathname === "/forgot" ||
    //     router.pathname === "/verification" ||
    //     router.pathname === "/setpassword" ||
    //     router.pathname === "/signup" ||
    //     router.pathname === "/payment" ||
    //     router.pathname === "/signup/steps") {
    //     return <SessionProvider session={session}>
    //         <Component {...pageProps} />
    //     </SessionProvider>
    // } else
    console.log(Component)
    return <SessionProvider session={session}>
        {
            Component.layout ?
                <Layout>
                    <Component {...pageProps} />
                </Layout> : <Component {...pageProps} />
        }
    </SessionProvider>
}


export default wrapper.withRedux(MyApp);

