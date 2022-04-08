import { getAuth, signOut } from "firebase/auth";
import axios from "axios";
import config from "../../configuration";
import { clearCookie, getCookie } from "../../helpers/cookie";

export const logoutService = (authContext, router) => {
    if (getCookie('teammers-access-token')) {
        axios.post(config.BASE_URL + 'auth/logout').then(res => {
            if (res.data.success) {
                clearCookie();
                if (authContext, router) {
                    if (authContext) {
                        authContext.setCurrentUser(null);
                    };
                    signOut(getAuth());
                    router.push("/");
                } else {
                    window.location.replace("/login")
                };
            };
        });
    };
};