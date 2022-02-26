import React from 'react';
import Link from 'next/link';
import BreadCrumb from '../../../src/components/Lib/BreadCrumb';
import Banner from '../../../src/components/Lib/Banner';
import { MdModeEdit, MdOutlineWorkOutline } from 'react-icons/md';
import { RiSettingsLine } from 'react-icons/ri';
import { FaRegTimesCircle } from 'react-icons/fa';
import { Avatar, Button, Form } from 'rsuite';
import { Cookie, withCookie } from 'next-cookie';
import config from '../../../src/configuration';
import { getFetchData } from '../../../lib/fetchData';
import { getToken } from '../../../lib/session';

function BlockedUsers(props) {

    return (
        <div className='teammer-profile-edit'>
            <BreadCrumb />
            <Banner
                styles={{ marginBottom: '2.5rem' }}
            />
            <div className="profile-wrapper">
                <div className="left-side">
                    <ul className="profile-edit-nav">
                        <li>
                            <Link href="/owner/profile/edit">
                                <a>
                                    <MdModeEdit />
                                    <span>Edit Profile</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/owner/profile/settings">
                                <a>
                                    <RiSettingsLine />
                                    <span>Account Settings</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/owner/profile/company">
                                <a>
                                    <MdOutlineWorkOutline />
                                    <span>Company</span>
                                </a>
                            </Link>
                        </li>
                        <li className='active'>
                            <Link href="/owner/profile/blocked-users">
                                <a>
                                    <FaRegTimesCircle />
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
                                src={props.userData?.detail?.photo ? props.userData.detail.photo : "https://www.w3schools.com/howto/img_avatar.png"}
                                alt="username surname"
                            />
                            <div className="profile-title-content">
                                <h4>{props.userData?.full_name}</h4>
                                <span>Edit Profile</span>
                            </div>
                        </div>
                    </div>
                    <div className="user-info-wrapper">
                        <div className="user-info-form-wrapper pb-0">
                            <p className='form-title pl-0'>Blocked Users</p>
                            <p>See and manage the accounts you have blocked.</p>
                            <ul className="blocked-users-list">
                                <li>
                                    <div className="_user-info">
                                        <Avatar
                                            circle
                                            src="/img/avatar1.png"
                                            alt="@SevenOutman"
                                        />
                                        <span>Denis Delton</span>
                                    </div>
                                    <Button
                                        color="blue"
                                        appearance="primary"
                                        className="btn-custom-outline unblock-btn"
                                    >
                                        Unblock
                                    </Button>
                                </li>
                                <li>
                                    <div className="_user-info">
                                        <Avatar
                                            circle
                                            src="/img/avatar1.png"
                                            alt="@SevenOutman"
                                        />
                                        <span>Denis Delton</span>
                                    </div>
                                    <Button
                                        color="blue"
                                        appearance="primary"
                                        className="btn-custom-outline unblock-btn"
                                    >
                                        Unblock
                                    </Button>
                                </li>
                                <li>
                                    <div className="_user-info">
                                        <Avatar
                                            circle
                                            src="/img/avatar1.png"
                                            alt="@SevenOutman"
                                        />
                                        <span>Denis Delton</span>
                                    </div>
                                    <Button
                                        color="blue"
                                        appearance="primary"
                                        className="btn-custom-outline unblock-btn"
                                    >
                                        Unblock
                                    </Button>
                                </li>
                                <li>
                                    <div className="_user-info">
                                        <Avatar
                                            circle
                                            src="/img/avatar1.png"
                                            alt="@SevenOutman"
                                        />
                                        <span>Denis Delton</span>
                                    </div>
                                    <Button
                                        color="blue"
                                        appearance="primary"
                                        className="btn-custom-outline unblock-btn"
                                    >
                                        Unblock
                                    </Button>
                                </li>
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

export const getServerSideProps = async (context) => {

    const fetchUserInfo = await getFetchData("auth/user?include=skills,positions,experiences,detail.location", getToken(context));

    return {
        props: {
            userData: fetchUserInfo?.data,
        }
    }
};