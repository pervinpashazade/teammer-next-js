import axios from 'axios';
import {useRouter} from "next/router";
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // let accessToken = localStorage.getItem('accessToken')
    console.log(config)
    return config;
}, function (error) {
    // Do something with request error
    console.log(error)
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    const router = useRouter();
    console.log(error.response , 'interceptor')
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if(error.response.code === 403){
        router.push("/login")
    }
});
