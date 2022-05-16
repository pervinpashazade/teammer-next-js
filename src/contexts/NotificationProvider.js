import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { getCookie } from '../helpers/cookie';
import config from '../configuration';

const NotificationContext = React.createContext();

export const useNotification = () => useContext(NotificationContext);

const NotificationProvider = ({ children }) => {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        const currentUserId = Number(getCookie("teammers-id"))

        // // last 5 conversation
        let last_notifications = notifications.slice(Math.max(notifications.length - 5, 0));

    }, [notifications]);

    // // mount
    useEffect(() => {
        if (getCookie("teammers-access-token") && getCookie("teammers-type")) {
            // axios.get(config.BASE_URL + 'conversations?include=messages,members,unreadMessages').then(res => {
            //     if (res.data.success) {
            //         setNotifications(res.data.data.items);
            //     }
            // });
            axios.get(config.BASE_URL + "users/notifications?per_page=5")
                .then(res => {
                    if (res.data.success) {
                        if (res.data.data?.items) {
                            setNotifications(res.data.data.items)
                        }
                    }
                })
        };
    }, [getCookie("teammers-access-token"), getCookie("teammers-type")]);

    return (
        <NotificationContext.Provider
            value={{
                notifications,
            }}
        >
            {children}
        </NotificationContext.Provider>
    )
}

export default NotificationProvider