import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { getCookie } from '../helpers/cookie';
import config from '../configuration';
import { getMessaging, onMessage } from 'firebase/messaging';
// import sound from "../../public/sound/notification_sound.wav";

const NotificationContext = React.createContext();

export const useNotification = () => useContext(NotificationContext);

const NotificationProvider = ({ children }) => {

    const [unReadNotifications, setUnReadNotifications] = useState([]);
    const [unReadCount, setUnReadCount] = useState(null);

    const messaging = getMessaging();

    const audio = new Audio("/sound/notification_sound.wav");

    onMessage(messaging, ({ data }) => {

        audio.play();

        if (data?.event === "push" && data.data) {
            receiveNotification(JSON.parse(data.data));
        };

    });

    const receiveNotification = data => {
        if (!data) return;

        let arr = [];
        arr = [data, ...unReadNotifications];

        if (arr.length > 5) {
            arr.pop();
        }

        console.log("TEST ARRRR 1", arr);

        // let reversedArr = arr.pop();

        setUnReadNotifications(arr);

        setUnReadCount(prevState => prevState + 1)
    };

    console.log('unReadNotifications !!!!!! =>', unReadNotifications);

    // // mount
    useEffect(() => {
        if (getCookie("teammers-access-token") && getCookie("teammers-type")) {
            axios.get(config.BASE_URL + "users/notifications?filter[is_read]=false&per_page=5")
                .then(res => {
                    if (res.data.success) {
                        if (res.data.data?.items) {
                            setUnReadNotifications(res.data.data.items.map(item => item.data))
                            setUnReadCount(res.data.data.total)
                        }
                    }
                })
        };
    }, [getCookie("teammers-access-token"), getCookie("teammers-type")]);

    return (
        <NotificationContext.Provider
            value={{
                unReadCount,
                unReadNotifications,
            }}
        >
            {children}
        </NotificationContext.Provider>
    )
}

export default NotificationProvider