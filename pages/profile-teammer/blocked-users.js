import React from 'react';
import Link from 'next/link';
import BreadCrumb from '../../src/components/Lib/BreadCrumb';
import Banner from '../../src/components/Lib/Banner';
import { MdModeEdit, MdOutlineWorkOutline } from 'react-icons/md';
import { RiSettingsLine } from 'react-icons/ri';
import { FaRegTimesCircle } from 'react-icons/fa';
import { Avatar, Button, Form } from 'rsuite';

function blockedUsers() {
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
                            <Link href="/profile-teammer/edit">
                                <a>
                                    <MdModeEdit />
                                    <span>Edit Profile</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/profile-teammer/settings">
                                <a>
                                    <RiSettingsLine />
                                    <span>Account Settings</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/profile-teammer/subscription">
                                <a>
                                    <MdOutlineWorkOutline />
                                    <span>Manage Subscription</span>
                                </a>
                            </Link>
                        </li>
                        <li className='active'>
                            <Link href="/profile-teammer/blocked-users">
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
                                src="/img/avatar2.png"
                                alt="username surname"
                            />
                            <div className="profile-title-content">
                                <h4>Margaret Brown</h4>
                                <span>Blocked Users</span>
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

export default blockedUsers
