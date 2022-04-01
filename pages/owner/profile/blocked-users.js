import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import BreadCrumb from '../../../src/components/Lib/BreadCrumb';
import Banner from '../../../src/components/Lib/Banner';
import {MdModeEdit, MdOutlineWorkOutline} from 'react-icons/md';
import {RiSettingsLine} from 'react-icons/ri';
import {FaRegTimesCircle} from 'react-icons/fa';
import {Avatar, Button, Form} from 'rsuite';
import {Cookie, withCookie} from 'next-cookie';
import config from '../../../src/configuration';
import {getFetchData} from '../../../lib/fetchData';
import {getToken} from '../../../lib/session';
import axios from "axios";
import {getCookie} from "../../../src/helpers/cookie";

function BlockedUsers(props) {
    const [blockUser, setBlockUsers] = useState([]);
    const [owner, setOwner] = useState({
        full_name: '',
        location: '',
        photo: ''
    })
    const getUnBlockUsers = () => {
        axios.get(config.BASE_URL + "users/blocks",
            {
                headers: {
                    Authorization: "Bearer " + getCookie('teammers-access-token')
                }
            }
        )
            .then(res => {
                res.data && setBlockUsers(res.data.data.map(item => {
                    return {
                        photo: item.detail.photo,
                        name: item.full_name,
                        id: item.id
                    }
                }))
            })
    }
    useEffect(() => {
        axios.get(config.BASE_URL + "auth/user?include=project,skills,positions,experiences,detail.location", {
            headers: {
                Authorization: "Bearer " + getCookie('teammers-access-token')
            }
        })
            .then(res => {
                console.log(res);
                setOwner({
                    full_name: res.data?.data?.full_name,
                    location: res.data?.data?.detail?.location?.id,
                    photo: res.data?.data?.detail?.photo
                })
            })
        getUnBlockUsers();
    }, []);
    const unBlockUser = (id) => {
        axios.post(config.BASE_URL + "users/unblock", {
            id: id
        }, {
            headers: {
                Authorization: "Bearer " + getCookie('teammers-access-token')
            }
        })
            .then((res)=>{
                    console.log(res);
                    getUnBlockUsers();
            })
    }
    return (
        <div className='teammer-profile-edit'>
            <BreadCrumb/>
            <Banner
                styles={{marginBottom: '2.5rem'}}
            />
            <div className="profile-wrapper">
                <div className="left-side">
                    <ul className="profile-edit-nav">
                        <li>
                            <Link href="/owner/profile/edit">
                                <a>
                                    <MdModeEdit/>
                                    <span>Edit Profile</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/owner/profile/settings">
                                <a>
                                    <RiSettingsLine/>
                                    <span>Account Settings</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/owner/profile/company">
                                <a>
                                    <MdOutlineWorkOutline/>
                                    <span>Company</span>
                                </a>
                            </Link>
                        </li>
                        <li className='active'>
                            <Link href="/owner/profile/blocked-users">
                                <a>
                                    <FaRegTimesCircle/>
                                    <span>Blocked Users</span>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="content">
                    <div className="page-header">
                        <div className="profile-title">
                            <Avatar
                                size="lg"
                                circle
                                src={owner.photo ? owner.photo : "https://www.w3schools.com/howto/img_avatar.png"}
                                alt="username surname"
                            />
                            <div className="profile-title-content">
                                <h4>{owner.full_name}</h4>
                                <span>Edit Profile</span>
                            </div>
                        </div>
                    </div>
                    <div className="user-info-wrapper">
                        <div className="user-info-form-wrapper pb-0">
                            <p className='form-title pl-0'>Blocked Users</p>
                            <p>See and manage the accounts you have blocked.</p>
                            <ul className="blocked-users-list">
                                {
                                    blockUser.length > 0 && blockUser.map(item => {
                                        return <li>
                                            <div className="_user-info">
                                                <Avatar
                                                    circle
                                                    src={item.photo ? item.photo : ""}
                                                    alt="User"
                                                />
                                                <span>{item.name}</span>
                                            </div>
                                            <Button
                                                color="blue"
                                                appearance="primary"
                                                className="btn-custom-outline unblock-btn"
                                                onClick={() => unBlockUser(item.id)}
                                            >
                                                Unblock
                                            </Button>
                                        </li>
                                    })
                                }
                                {/*<li>*/}
                                {/*    <div className="_user-info">*/}
                                {/*        <Avatar*/}
                                {/*            circle*/}
                                {/*            src="/img/avatar1.png"*/}
                                {/*            alt="@SevenOutman"*/}
                                {/*        />*/}
                                {/*        <span>Denis Delton</span>*/}
                                {/*    </div>*/}
                                {/*    <Button*/}
                                {/*        color="blue"*/}
                                {/*        appearance="primary"*/}
                                {/*        className="btn-custom-outline unblock-btn"*/}
                                {/*    >*/}
                                {/*        Unblock*/}
                                {/*    </Button>*/}
                                {/*</li>*/}
                                {/*<li>*/}
                                {/*    <div className="_user-info">*/}
                                {/*        <Avatar*/}
                                {/*            circle*/}
                                {/*            src="/img/avatar1.png"*/}
                                {/*            alt="@SevenOutman"*/}
                                {/*        />*/}
                                {/*        <span>Denis Delton</span>*/}
                                {/*    </div>*/}
                                {/*    <Button*/}
                                {/*        color="blue"*/}
                                {/*        appearance="primary"*/}
                                {/*        className="btn-custom-outline unblock-btn"*/}
                                {/*    >*/}
                                {/*        Unblock*/}
                                {/*    </Button>*/}
                                {/*</li>*/}
                                {/*<li>*/}
                                {/*    <div className="_user-info">*/}
                                {/*        <Avatar*/}
                                {/*            circle*/}
                                {/*            src="/img/avatar1.png"*/}
                                {/*            alt="@SevenOutman"*/}
                                {/*        />*/}
                                {/*        <span>Denis Delton</span>*/}
                                {/*    </div>*/}
                                {/*    <Button*/}
                                {/*        color="blue"*/}
                                {/*        appearance="primary"*/}
                                {/*        className="btn-custom-outline unblock-btn"*/}
                                {/*    >*/}
                                {/*        Unblock*/}
                                {/*    </Button>*/}
                                {/*</li>*/}
                                {/*<li>*/}
                                {/*    <div className="_user-info">*/}
                                {/*        <Avatar*/}
                                {/*            circle*/}
                                {/*            src="/img/avatar1.png"*/}
                                {/*            alt="@SevenOutman"*/}
                                {/*        />*/}
                                {/*        <span>Denis Delton</span>*/}
                                {/*    </div>*/}
                                {/*    <Button*/}
                                {/*        color="blue"*/}
                                {/*        appearance="primary"*/}
                                {/*        className="btn-custom-outline unblock-btn"*/}
                                {/*    >*/}
                                {/*        Unblock*/}
                                {/*    </Button>*/}
                                {/*</li>*/}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

BlockedUsers.layout = true
export default BlockedUsers;
