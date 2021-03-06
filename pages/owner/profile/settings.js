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
import validation_422 from "../../../src/validation/validation_422";

function Setting(props) {
    const [owner, setOwner] = useState({
        username: '',
        email: '',
        password: '',
        new_password: ''
    })
    const [photo, setPhoto] = useState('')
    const [validation, setValidation] = useState(false);
    const [validaiton422, setValidation422] = useState({})
    useEffect(() => {
        axios.get(config.BASE_URL + "auth/user?include=project,skills,positions,experiences,detail.location")
            .then(res => {
                setOwner({
                    ...owner,
                    username: res.data?.data?.username,
                    email: res.data?.data?.email,
                });
                setPhoto(res.data?.data?.detail?.photo)
            })

    }, []);
    const setData = (key, data) => {
        setOwner({
            ...owner,
            [key]: data
        })
    }
    const saveChanges = () => {
        let data = {};

        if (owner.username.length > 0) {
            
        }


        if (owner.password.trim() !== owner.new_password.trim() && (owner.password.length > 0 || owner.new_password.length > 0)) {
            setValidation(true);
            data['password'] = owner.password;
        } else if (owner.username.length > 0) {

            // if(owner.password.length > 0) {
            // data['password'] = owner.password;
            // data['email'] = owner.email;
            data['username'] = owner.username;
            setValidation(false)
            // }
        } else if (owner.username.length === 0) setValidation(true)
        axios.put(config.BASE_URL + "users", data)
            .then(res => {
                console.log(res);
                setValidation422({})
            })
            .catch((error) => {
                setValidation422(validation_422(error));
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
                        <li className='active'>
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
                        <li>
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
                                src={photo ? photo : "https://www.w3schools.com/howto/img_avatar.png"}
                                alt="username surname"
                            />
                            <div className="profile-title-content">
                                <h4>{owner.full_name}</h4>
                                <span>Edit Profile</span>
                            </div>
                        </div>
                        <Button
                            color="blue"
                            appearance="primary"
                            className='save-btn'
                            onClick={saveChanges}
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
                                            className={(owner.username.length === 0 && validation) ? 'login-border-color' : ''}
                                            placeholder="Enter your username"
                                            value={owner.username}
                                            onChange={(e) => setData('username', e)}
                                        />
                                    </Form.Group>
                                    {validaiton422.username &&
                                    <p className="login-validation mt-3">{validaiton422.username}</p>}
                                </div>
                                <div className="col-md-12 mb-0">
                                    <Form.Group controlId="email">
                                        <Form.ControlLabel>Email</Form.ControlLabel>
                                        <Form.Control
                                            name="email"
                                            type='email'
                                            disabled={true}
                                            placeholder="Enter your email"
                                            value={owner.email}
                                            onChange={(e) => setData('email', e)}
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
                                    <Form.Group controlId="new_password">
                                        <Form.ControlLabel>New Password</Form.ControlLabel>
                                        <Form.Control
                                            className={validation ? 'login-border-color' : ''}
                                            name="new_password"
                                            type="password"
                                            value={owner.password} onChange={e => {
                                            setData('password', e)
                                        }} placeholder="Enter your new password"/>
                                    </Form.Group>
                                </div>
                                <div className="col-md-12">
                                    <Form.Group controlId="confirm_password">
                                        <Form.ControlLabel>Confirm Password</Form.ControlLabel>
                                        <Form.Control className={validation ? 'login-border-color' : ''}
                                                      name="confirm_password"
                                                      onChange={(e) => {
                                                          setData('new_password', e);
                                                      }}
                                                      type="password"
                                                      value={owner.new_password}
                                                      placeholder="Enter your confirm password"/>
                                    </Form.Group>
                                </div>
                                {validaiton422.password &&
                                <p className="login-validation mt-3">{validaiton422.password}</p>}
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
