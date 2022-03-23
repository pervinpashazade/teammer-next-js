import axios from 'axios';

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // let teammers-access-token = localStorage.getItem('teammers-access-token')
    console.log('interceptor config request', config)
    return config;
}, function (error) {
    // Do something with request error
    console.log('interceptor error', error.response)
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('interceptor response', response);
    return response;
}, function (error) {
    
    console.log('interceptor error', error.response)
    
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // if (error.response.code === 403) {
    //     router.push("/login")
    // }
});
