import config from "../src/configuration";

export const postData = async (data, link, token) => {
    if (!token) {
        try {
            const response = await fetch(config.BASE_URL + link, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            return response.json();
        } catch (error) {
            return error.response;
        }
    } else {
        try {
            const response = await fetch(config.BASE_URL + link, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Autharization': 'Bearer ' + token
                },
                body: data
            })
            return response.json();
        } catch (error) {
            return error.response;
        }
    }
}