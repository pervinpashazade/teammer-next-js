import React, { useState } from 'react';
import Link from 'next/link';
import BreadCrumb from '../../src/components/Lib/BreadCrumb';
import Banner from '../../src/components/Lib/Banner';
import { MdModeEdit, MdOutlineWorkOutline } from 'react-icons/md';
import { RiSettingsLine } from 'react-icons/ri';
import { FaRegTimesCircle } from 'react-icons/fa';
import { Avatar, Button, Form, Toggle } from 'rsuite';
import ActionLink from '../../src/components/Lib/ActionLink';
import Image from 'next/image';
import { Cookie, withCookie } from 'next-cookie';
import config from '../../src/configuration';

const Subscription = (props) => {

    const [isActiveAnnualy, setIsActiveAnnualy] = useState(false);

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
                        <li className='active'>
                            <Link href="/profile-teammer/subscription">
                                <a>
                                    <MdOutlineWorkOutline />
                                    <span>Manage Subscription</span>
                                </a>
                            </Link>
                        </li>
                        <li>
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
                                src={props.userData?.detail?.photo ? props.userData.detail.photo : "/img/avatar2.png"}
                                alt="username surname"
                            />
                            <div className="profile-title-content">
                                <h4>Margaret Brown</h4>
                                <span>Manage  Subscription</span>
                            </div>
                        </div>
                    </div>
                    <div className="user-info-wrapper">
                        <div className="user-info-form-wrapper pb-0">
                            <div className="subscription-active-plan-card">
                                <div className="_card-top">
                                    <p className="_plan">
                                        Your active plan:
                                        <span>Monthly</span>
                                        <Image
                                            src={'/icons/emoji3.svg'}
                                            alt='img'
                                            layout={'fixed'}
                                            width={40}
                                            height={40}
                                        />
                                    </p>
                                    <Button
                                        color="blue"
                                        appearance="primary"
                                        className="btn-custom-outline unsubcribe-btn"
                                    >
                                        Unsubscribe
                                    </Button>
                                </div>
                                <div className="_card-content">
                                    <div>
                                        <p>View purchase history</p>
                                        <span>See your previous purchases and transactions</span>
                                    </div>
                                    <ActionLink
                                        size="lg"
                                        href="/profile-teammer/purchase-history"
                                        classNames='bg-transparent'
                                        padding="7px"
                                        margin="0px 0px 0px 0.5rem"
                                    >
                                        <Image
                                            src={'/icons/arrow-right.svg'}
                                            alt='img'
                                            layout={'fixed'}
                                            width={8}
                                            height={14}
                                        />
                                    </ActionLink>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className='change-plan-title'>
                        🙈 You can change your plan:
                    </p>
                    <div className="subscribe-wrapper">
                        <div className="_top">
                            <div className="_top-left">
                                <Image
                                    src={'/img/Monthly.png'}
                                    alt='img'
                                    layout={'fixed'}
                                    className={`${!isActiveAnnualy ? 'visible' : 'invisible'}`}
                                    width={48}
                                    height={48}
                                />
                                <div className="gradient-wrapper">
                                    <div className="_text-container">
                                        <h4 className={`plan-title ${!isActiveAnnualy ? '_text-monthly active' : ''}`}>Monthly</h4>
                                    </div>
                                </div>
                            </div>
                            <Toggle
                                className={`custom-switch ${isActiveAnnualy ? 'active' : ''}`}
                                size="lg"
                                onChange={(e) => setIsActiveAnnualy(e)}
                            />
                            <div className="_top-right">
                                <div className="gradient-wrapper">
                                    <div className="_text-container">
                                        <h4 className={`plan-title ${isActiveAnnualy ? '_text-annualy active' : ''}`}>Annualy</h4>
                                    </div>
                                </div>
                                <Image
                                    src={'/img/Annualy.png'}
                                    alt='img'
                                    layout={'fixed'}
                                    className={`${isActiveAnnualy ? 'visible' : 'invisible'}`}
                                    width={48}
                                    height={48}
                                />
                            </div>
                        </div>
                        <div className="_body">
                            <p className="title">You will have:</p>
                            <ul className="plan-list">
                                <li>
                                    <Avatar
                                        size="sm"
                                        circle
                                        src="/img/plan-item1.png"
                                        alt="plan item"
                                    />
                                    <span>Apply to any startup with only one click️</span>
                                </li>
                                <li>
                                    <Avatar
                                        size="sm"
                                        circle
                                        src="/img/plan-item2.png"
                                        alt="plan item"
                                    />
                                    <span>Become a team member at a startup company</span>
                                </li>
                                <li>
                                    <Avatar
                                        size="sm"
                                        circle
                                        src="/img/plan-item3.png"
                                        alt="plan item"
                                    />
                                    <span>Get updated when your position is needed in a startup team</span>
                                </li>
                                <li>
                                    <Avatar
                                        size="sm"
                                        circle
                                        src="/img/plan-item4.png"
                                        alt="plan item"
                                    />
                                    <span>Chat with startup owners</span>
                                </li>
                            </ul>
                        </div>
                        <div className="_bottom">
                            <div className='price'>
                                {
                                    isActiveAnnualy ?
                                        <Image
                                            src={'/img/price2.png'}
                                            alt='img'
                                            layout={'fixed'}
                                            width={89}
                                            height={43}
                                        />
                                        :
                                        <Image
                                            src={'/img/price1.png'}
                                            alt='img'
                                            layout={'fixed'}
                                            width={52}
                                            height={43}
                                        />
                                }
                            </div>
                            {
                                isActiveAnnualy ?
                                    <Button
                                        color="blue"
                                        appearance="primary"
                                        className='btn-choose-plan'
                                    >
                                        <Image
                                            src={'/icons/emoji1.svg'}
                                            alt='img'
                                            layout={'fixed'}
                                            width={16}
                                            height={17}
                                        />
                                        Choose
                                    </Button>
                                    :
                                    <Button
                                        color="blue"
                                        appearance="primary"
                                        className="btn-custom-outline btn-active-plan"
                                    >
                                        <Image
                                            src={'/icons/emoji1.svg'}
                                            alt='img'
                                            layout={'fixed'}
                                            width={16}
                                            height={17}
                                        />
                                        Your active plan
                                    </Button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscription;

export const getServerSideProps = async (context) => {

    const { params, req, res } = context;
    const cookie = Cookie.fromApiRoute(req, res);
    let accessToken = cookie.get('teammers-access-token');

    const fetchUserInfo = await fetch(config.BASE_URL + "auth/user?include=skills,positions", {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const userData = await fetchUserInfo.json();

    return {
        props: {
            userData: userData?.data,
        }
    }
};  