import {useCookie} from "next-cookie";

export default function getAuth(context) {
    const cookie = useCookie(context);
    return cookie.get('teammers-type');
}
export function getToken(context){
    const cookie = useCookie(context);
    return cookie.get('teammers-access-token');
}
export function getId(context){
    const cookie = useCookie(context);
    return cookie.get('teammers-id');
}