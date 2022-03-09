import {NEXT_URL} from "../configuration";

const checkAuth = async () =>{
    const fetchData = await fetch(NEXT_URL + 'api/auth');
    const fetchResponse = await fetchData.json();
    const another = await fetchResponse;
    return another;
}
export default checkAuth;