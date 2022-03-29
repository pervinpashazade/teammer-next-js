import clearCookie from "../../../lib/removeCookie";
import { getAuth, signOut } from "firebase/auth";

export const logoutService = (authContext, router) => {

    clearCookie();

    if (authContext) {
        authContext.setCurrentUser(null);
    };

    signOut(getAuth());

    router.push("/");
};