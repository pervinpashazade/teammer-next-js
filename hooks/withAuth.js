import {getCookie} from "../src/helpers/cookie";
import {useRouter} from "next/router";

const withAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();
        if (typeof window !== "undefined") {
            const accessToken = getCookie('teammers-access-token');
            const roleType = getCookie('teammers-type'); // null , 1 or 2
            console.log(router.pathname);
            if (!accessToken && (router.pathname.includes("owner") || router.pathname.includes("teammer") ||
                router.pathname.includes("steps"))) {
                router.push('/login');
                return null;
            } else if (accessToken && !roleType &&
                (router.pathname.includes("owner") ||
                    router.pathname.includes("teammer") ||
                    router.pathname.includes("login"))) {
                router.push("/signup/steps");
                return null;
            } else if (accessToken && roleType === "1" && !router.pathname.includes("owner")) {
                router.push("/owner/home");
                return null;
            } else if (accessToken && roleType === "2" && !router.pathname.includes("teammer")){
                router.push("/teammer/home");
                return null;
            }
            return <WrappedComponent {...props}/>
        }
        return null;
    }
}
export default withAuth;