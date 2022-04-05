import {useEffect, useState} from "react";
import axios from "axios";
import config from "../configuration";

const Notifications = () => {
    const [notifications, setNotifications] = useState([])
    useEffect(() => {
        axios.get(config.BASE_URL + "users/notifications?per_page=4")
            .then(res => {
                if (res.data.success) {
                    if (res.data.data?.items) setNotificaitons(res.data.data.items)
                }
            })
    }, [])
    return <div></div>
}

export default Notifications;