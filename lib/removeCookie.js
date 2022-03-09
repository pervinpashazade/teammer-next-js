import setCookie from "./setCookie";

const clearCookie = ()=>{
    setCookie('teammers-access-token' , '' ,'');
    setCookie('user' , '' ,'');
    setCookie('teammers-type' , '' ,'');
    setCookie('teammers-id' , '' ,'');
}

export default clearCookie;