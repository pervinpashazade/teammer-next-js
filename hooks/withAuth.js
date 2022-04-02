import {getCookie} from "../src/helpers/cookie";
import {useRouter} from "next/router";

const withAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();
        if (typeof window !== "undefined") {
            // get token and roleType from the cookie

            const accessToken = getCookie('teammers-access-token');
            const roleType = getCookie('teammers-type');
            //check a user loged in
            if (!accessToken && (router.pathname.includes("owner") || router.pathname.includes("teammer") ||
                router.pathname.includes("steps"))) {
                router.push('/login');
                return null;
            }
            //check a user isCompleted registr
            else if (accessToken && !roleType &&
                (router.pathname.includes("owner") ||
                    router.pathname.includes("teammer") ||
                    router.pathname.includes("login"))) {
                router.push("/signup/steps");
                return null;
            }
            //check the user as a owner
            else if (accessToken && roleType === "1" && !router.pathname.includes("owner")) {
                router.push("/owner/home");
                return null;
            }
            //check the user as a teammer
            else if (accessToken && roleType === "2" && router.pathname.includes("teammer")) {
                router.push("/teammer/home");
                return null;
            }
            return <WrappedComponent {...props}/>
        }
        return null;
    }
}
export default withAuth;