import axios from "axios";
import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import config from "./src/configuration";

// export const initializeFirebase = () => {

initializeApp({
    apiKey: "AIzaSyBhlCe8xclwZnrhesLlGiUOOWNtc7gnXVQ",
    authDomain: "firstapp-5cfcd.firebaseapp.com",
    projectId: "firstapp-5cfcd",
    storageBucket: "firstapp-5cfcd.appspot.com",
    messagingSenderId: "153910205936",
    appId: "1:153910205936:web:5104d95f9122462045d135",
    databaseURL: 'https://firstapp-5cfcd-default-rtdb.firebaseio.com',
});

// };

export const firebaseMessaging = () => {

    try {
        const messaging = getMessaging();

        getToken(messaging, {
            vapidKey:
                "BLFoBoj6-1D3tYG1LIC_nq-KGic2oeUzhNOWnilb9sxawuASQ8wIhUcdOrtMn2HfUR7TF64d-2V_jT9-fk19k-Q",
        })
            .then((currentToken) => {
                if (currentToken) {
                    const storeToken = localStorage.getItem("pus_token");
                    if (!storeToken || storeToken !== currentToken) {

                        // console.log('FIREBASE TOKEN !', currentToken)

                        console.log('firebase connected!');
                        
                        // "1 - push token, 2-email",
                        axios.post(config.BASE_URL + 'notification/subscribe', {
                            "type": "1",
                            "value": currentToken
                        }).then(res => {
                            // console.log('firebsae connect res', res);
                            // if (res.data.success) {

                            // };
                        });
                    }
                } else {
                    console.log(
                        "No registration token available. Request permission to generate one."
                    );
                }
            })
            .catch((err) => {
                console.log("An error occurred while retrieving token. ", err);
            });

        onMessage(messaging, ({ notification, data }) => {
            alert('Noification');

            // console.clear();

            // console.log('NOTIFICATION messaging => ', messaging);
            // console.log('notification notification => ', notification);
            // console.log('notification data => ', data);

            if (data?.event === "message") {
                // console.log('TEAMMERS message notification', JSON.parse(data.message));
            };

            if (data?.event === "push") {
                console.log('TEST => 1', data);
                console.log('TEST => 1', JSON.parse(data.data));
            };

            // console.log(data, notification);
        });
    } catch (error) {
        console.log('error', error);
    };
};