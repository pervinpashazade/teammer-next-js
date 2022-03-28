import config from "../../configuration";

export const loginService = async (data) => {
    try {
        const response = await fetch(config.BASE_URL + 'auth/login', {
            method: 'POST',
            body: data
        })
        return response.json();
    } catch (error) {
        return error.response;
    };
};