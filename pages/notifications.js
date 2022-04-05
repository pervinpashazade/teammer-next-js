import React, {useEffect, useState} from "react";
import axios from "axios";
import config from '../src/configuration'
import {Avatar} from "rsuite";

const Notifications = () => {
    const [notifications, setNotifications] = useState([])
    useEffect(() => {
        axios.get(config.BASE_URL + "users/notifications?per_page=4")
            .then(res => {
                if (res.data.success) {
                    if (res.data.data?.items) setNotifications(res.data.data.items)
                }
            })
    }, []);
    return <div className="notifications">
        <table>
            <thead>
            <tr>
                <th>id</th>
                <th>Notification</th>
                <th>Date</th>
                <th>Pinned to top</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td><span className="active deactive"></span></td>
                <td><Avatar circle
                            src="https://www.w3schools.com/howto/img_avatar.png"/> <p>Denis Delton wants to add you to
                    their Netflix team.</p></td>
            </tr>
            </tbody>
        </table>
    </div>
}
Notifications.layout = true
export default Notifications;