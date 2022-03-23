import axios from "axios";
import { NEXT_URL } from "../../configuration";

export const getLocalUser = async () => {
    const fetchUser = await fetch(NEXT_URL + 'api/auth');
    const resObj = await fetchUser.json();

    return resObj;
};