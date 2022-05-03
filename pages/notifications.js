import React, { useEffect, useState } from "react";
import axios from "axios";
import config from '../src/configuration'
import { Avatar, IconButton, Notification, Pagination, toaster } from "rsuite";
import Image from 'next/image';
import { HiArrowLeft } from "react-icons/hi";
import { AiOutlineRight } from "react-icons/ai";
import Link from 'next/link';
import { useRouter } from "next/router";

const Notifications = () => {

    const router = useRouter();

    const [notifications, setNotifications] = useState([]);
    const [total, setTotal] = useState(0);
    const [firstRender, setFirstRender] = useState(false);
    const [activePage, setActivePage] = useState(1);
    const getData = () => {
        axios.get(config.BASE_URL + "users/notifications?page=" + activePage)
            .then(res => {
                if (res.data.success) {
                    if (res.data.data?.items) setNotifications(res.data.data.items);
                    setTotal(res.data.data.total);
                }
            })
    }

    useEffect(() => {
        getData();
    }, []);

    const deleteNotification = (id) => {
        axios.delete(config.BASE_URL + "users/notifications/" + id)
            .then(() => {
                getData();
                toaster.push(
                    <Notification type={"success"} header="Success!" closable>
                        This message deleted successfly!
                    </Notification>, 'topEnd'
                );
            })
    }

    const readNotification = (id) => {
        axios.put(config.BASE_URL + "users/notifications/" + id + "/read")
            .then(() => {
                getData();
                toaster.push(
                    <Notification type={"success"} header="Success!" closable>
                        This message has been read!
                    </Notification>, 'topEnd'
                );
            })
    }
    useEffect(async () => {
        if (firstRender) {
            getData();
        }
        setFirstRender(true)
    }, [activePage]);

    return <div className="notifications">
        <div className="breadcrumb-wrapper">
            <Link href="/teammer/home" passHref>
                <div className="goback-btn">
                    <IconButton
                        size="lg"
                        icon={<HiArrowLeft />}
                        className="goback-btn"
                        onClick={() => router.back()}
                    />
                    <span>Go back</span>
                </div>
            </Link>
            <div className="custom-breadcrumb">
                <span>Home</span>
                <span className='breadcrumb-icon'>
                    <AiOutlineRight />
                </span>
                <span className='active'>
                    Notifications
                </span>
            </div>
        </div>
        <h4>Notifications</h4>
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Notification</th>
                    <th>Date</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    notifications.length > 0 ? notifications.map((item, index) => {
                        return <tr key={index}>
                            <td><span className={item.read_at ? "deactive" : "active"}
                                onClick={() => readNotification(item.id)}></span></td>
                            <td><p className="d-flex justify-content-start align-items-center"><Avatar circle
                                src="https://www.w3schools.com/howto/img_avatar.png" />
                                <span className="ml-2 message">{
                                    item.data?.message
                                }</span></p></td>
                            <td><span>{item.created_at}</span></td>
                            <td><span onClick={() => deleteNotification(item.id)}><IconButton
                                size="sm"
                                className='bg-transparent ml-2'
                                icon={
                                    <Image
                                        src={'/icons/trash.svg'}
                                        alt='img'
                                        width={16}
                                        height={16}
                                        layout='fixed'
                                    />
                                }
                            /></span></td>
                        </tr>
                    }) : <p className="text-center">You have no yet any notification</p>
                }
            </tbody>
        </table>
        <div className="d-flex justify-content-end mt-3">
            <Pagination
                prev
                last
                next
                first
                size="xs"
                total={48}
                limit={10}
                activePage={activePage}
                onChangePage={setActivePage}
            />
        </div>
    </div>
}
Notifications.layout = true
export default Notifications;