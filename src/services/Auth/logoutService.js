import clearCookie from "../../../lib/removeCookie";
import { getAuth, signOut } from "firebase/auth";

export const logoutService = (authContext, router) => {

    if (authContext) {
        authContext.setCurrentUser(null);
    };

    clearCookie();
    signOut(getAuth());

    router.push("/");
};