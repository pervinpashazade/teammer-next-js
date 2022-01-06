import axios from "axios";
import config from "../../../src/configuration";

export default async function handler(request , response){

        console.log(request)
      axios.post(config.BASE_URL+"auth/login",{
            email : "rustemovv96@gmail.com",
            password : "samir96.S"
        })
            .then(res => {
                console.log(res)
                return response.status(200).json(res);

            })


}