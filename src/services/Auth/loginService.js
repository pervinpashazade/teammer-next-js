import axios from "axios";
import config from "../../configuration";

export const loginService = async (data) => {
    // try {
    //     axios.post(config.BASE_URL + 'auth/login', data).then(res => {
    //         console.log('login res service', res);
    //     });
    // } catch (error) {
    //     console.log('error', error);
    // };

    try {
        const response = await fetch(config.BASE_URL + 'auth/login', {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json',
            //     'Autharization': token
            // },
            body: data
        })
        return response.json();
    } catch (error) {
        return error.response;
    };

    // try {
    //     const response = await fetch(config.BASE_URL + link, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     })
    //     return response.json();
    // } catch (error) {
    //     return error.response;
    // }
};