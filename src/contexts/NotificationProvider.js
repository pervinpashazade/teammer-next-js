import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { getCookie } from '../helpers/cookie';
import config from '../configuration';

const NotificationContext = React.createContext();

export const useNotification = () => useContext(NotificationContext);

const NotificationProvider = ({ children }) => {

    const [unReadNotifications, setUnReadNotifications] = useState([]);
    const [unReadCount, setUnReadCount] = useState(null);

    // useEffect(() => {

    //     const currentUserId = Number(getCookie("teammers-id"))

    //     // // last 5 conversation
    //     let last_notifications = unReadNotifications.slice(Math.max(unReadNotifications.length - 5, 0));

    // }, [unReadNotifications]);

    // // mount
    useEffect(() => {
        if (getCookie("teammers-access-token") && getCookie("teammers-type")) {
            // axios.get(config.BASE_URL + 'conversations?include=messages,members,unreadMessages').then(res => {
            //     if (res.data.success) {
            //         setUnReadNotifications(res.data.data.items);
            //     }
            // });
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