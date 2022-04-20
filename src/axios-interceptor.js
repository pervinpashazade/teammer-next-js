import axios from 'axios';
import { clearCookie, getCookie } from "./helpers/cookie";
import { logoutService } from './services/Auth/logoutService';
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    let accessToken = getCookie('teammers-access-token');
    config.headers['Authorization'] = "Bearer " + accessToken;
    return config;
}, function (error) {
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    const status = error.response ? error.response.status : 401;
    switch (status) {
        case 401:
            clearCookie();
            //  bug loop reload
            // // document.location.replace('/')
            // // logoutService();
            break;
        case 422:
            //do something
            return Promise.reject(error);
            break;
        case 429:
            // do something
            break;
        default:
            return Promise.reject(error);
    }
});
