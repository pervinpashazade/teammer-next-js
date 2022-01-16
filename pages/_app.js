import 'rsuite/dist/rsuite.min.css';
import 'react-quill/dist/quill.snow.css'; // ES6
import '../styles/style.scss';
import '../styles/bootstrap/bootstrap.scss';
import Layout from "../src/components/common/Layout";
import {useRouter} from "next/router";
import {wrapper} from "../src/store/redux-store";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

function MyApp({Component, pageProps}, {props}) {
    const router = useRouter();
    const store = useSelector(state => state)
    const dispatch = useDispatch();
    console.log(Component)
    if (router.pathname === "/login" ||
        router.pathname === "/forgot" ||
        router.pathname === "/verification" ||
        router.pathname === "/setpassword" ||
        router.pathname === "/signup" ||
        router.pathname === "/payment" ||
        router.pathname === "/signup/steps") {
        return <Component {...pageProps} />
    } else return <Layout>
        <Component {...pageProps} />
    </Layout>
}


export default wrapper.withRedux(MyApp);

