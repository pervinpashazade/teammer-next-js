// import axios from "axios";
import config from "../../../src/configuration";

export default async function handleGetJobList(request, response) {

    console.log('request', request);
    console.log('response', response);

    // axios.post(config.BASE_URL + "auth/login", {
    //     email: "rustemovv96@gmail.com",
    //     password: "samir96.S"
    // })
    //     .then(res => {
    //         console.log(res)
    //         return response.status(200).json(res);

    //     })

    const fetchJobList = await fetch(config.BASE_URL + "jobs?include=project&per_page=6");
    const jobListData = await fetchJobList.json();

    return jobListData?.data?.items;
}