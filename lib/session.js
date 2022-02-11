import {useCookie} from "next-cookie";

export default function getAuth(context) {
    const cookie = useCookie(context);
    return cookie.get('teammers-type');
}