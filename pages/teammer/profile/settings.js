import React, { useState } from 'react';
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
import axios from 'axios';

function Setting(props) {

    const [teammer, setTeammer] = useState({
        email: '',
        username: '',
        avatarUrl: '',
    });

    React.useEffect(() => {
        axios.get(config.BASE_URL + 'auth/user?include=skills,positions,experiences,detail.location').then(res => {
            console.log('res data', res.data.data);
            if (res.data.success) {
                setTeammer({
                    email: res.data.data.email,
                    username: res.data.data.username,
                    avatarUrl: res.data.data.detail.photo,
                });
            };
        });
    }, []);

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
                            <Link href="/teammer/profile/edit">
                                <a>
                                    <MdModeEdit />
                                    <span>Edit Profile</span>
                                </a>
                            </Link>
                        </li>
                        <li className='active'>
                            <Link href="/teammer/profile/settings">
                                <a>
                                    <RiSettingsLine />
                                    <span>Account Settings</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/teammer/profile/subscription">
                                <a>
                                    <MdOutlineWorkOutline />
                                    <span>Manage Subscription</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/teammer/profile/blocked-users">
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
                                src={teammer.avatarUrl ? teammer.avatarUrl : "https://www.w3schools.com/howto/img_avatar.png"}
                                alt="username surname"
                            />
                            <div className="profile-title-content">
                                <h4>{teammer.full_name}</h4>
                                <span>Edit Profile</span>
                            </div>
                        </div>
                        <Button
                            color="blue"
                            appearance="primary"
                            className='save-btn'
                        >
                            Save Changes
                        </Button>
                    </div>
                    <div className="user-info-wrapper mb-3">
                        <div className="user-info-form-wrapper">
                            <Form className="row">
                                <p className='form-title'>User Information</p>
                                <div className="col-md-12 mb-4">
                                    <Form.Group controlId="name">
                                        <Form.ControlLabel>Username</Form.ControlLabel>
                                        <Form.Control
                                            name="name"
                                            placeholder="Enter your username"
                                            value={teammer.username}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-12 mb-0">
                                    <Form.Group controlId="email">
                                        <Form.ControlLabel>Email</Form.ControlLabel>
                                        <Form.Control
                                            type='email'
                                            value={teammer.email}
                                            disabled={true}
                                            placeholder="Enter your email"
                                        />
                                    </Form.Group>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="user-info-wrapper">
                        <div className="user-info-form-wrapper">
                            <Form className="row">
                                <p className='form-title'>Password</p>
                                <div className="col-md-12 mb-4">
                                    <Form.Group controlId="current_password">
                                        <Form.ControlLabel>Current Password</Form.ControlLabel>
                                        <Form.Control name="current_password" placeholder="Enter your current password" />
                                    </Form.Group>
                                </div>
                                <div className="col-md-12 mb-4">
                                    <Form.Group controlId="new_password">
                                        <Form.ControlLabel>New Password</Form.ControlLabel>
                                        <Form.Control name="new_password" placeholder="Enter your new password" />
                                    </Form.Group>
                                </div>
                                <div className="col-md-12">
                                    <Form.Group controlId="confirm_password">
                                        <Form.ControlLabel>Confirm Password</Form.ControlLabel>
                                        <Form.Control name="confirm_password" placeholder="Enter your confirm password" />
                                    </Form.Group>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
Setting.layout = true;
export default Setting;

// export const getServerSideProps = async (context) => {

//     const fetchUserInfo = await getFetchData("auth/user?include=skills,positions,experiences,detail.location", getToken(context));

//     return {
//         props: {
//             userData: fetchUserInfo?.data,
//         }
//     }
// };