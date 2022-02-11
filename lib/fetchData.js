import config from "../src/configuration";

export const getFetchData = async (link , token) => {

    const data = await fetch(config.BASE_URL + link,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
        },
    });
    const datas = data.json();
    return datas;
}