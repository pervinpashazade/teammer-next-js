import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import BreadCrumb from '../../../src/components/Lib/BreadCrumb';
import Banner from '../../../src/components/Lib/Banner';
import {MdModeEdit, MdOutlineWorkOutline} from 'react-icons/md';
import {RiSettingsLine} from 'react-icons/ri';
import {FaRegTimesCircle} from 'react-icons/fa';
import {Avatar, Button, Form, Panel, Toggle} from 'rsuite';
import ActionLink from '../../../src/components/Lib/ActionLink';
import Image from 'next/image';
import {Cookie, withCookie} from 'next-cookie';
import config from '../../../src/configuration';
import {getFetchData} from '../../../lib/fetchData';
import {getToken} from '../../../lib/session';
import axios from "axios";
import {getCookie} from "../../../src/helpers/cookie";

const Subscription = (props) => {
    const [owner, setOwner] = useState({
        full_name: '',
        location: '',
        photo: ''
    });
    const [companies, setCompanies] = useState([])
    useEffect(async () => {

        axios.get(config.BASE_URL + "auth/user?include=project,skills,positions,experiences,detail.location", {
            headers: {
                Authorization: "Bearer " + getCookie('teammers-access-token')
            }
        })
            .then(res => {
                setOwner({
                    full_name: res.data?.data?.full_name,
                    location: res.data?.data?.detail?.location?.id,
                    photo: res.data?.data?.detail?.photo
                })
            })
        axios.get(config.BASE_URL + "users/projects" , {
            headers: {
                Authorization: "Bearer " + getCookie('teammers-access-token')
            }
        })
            .then(res => {
               setCompanies(res.data.data.items)
            })
    }, [])
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
                        <li className='active'>
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
                                src={owner.photo ? owner.photo : ""}
                                alt="username surname"
                            />
                            <div className="profile-title-content">
                                <h4>{owner.full_name}</h4>
                                <span>Edit Profile</span>
                            </div>
                        </div>
                    </div>
                    {
                            companies.length > 0 && companies.map(item => <div className="div-box-shadow mb-4">
                                <h4>{item.title}</h4>
                                <p>{item.description}</p>
                            </div>)
                    }
                    {/*<div className="user-info-wrapper">*/}
                    {/*    <div className="user-info-form-wrapper pb-0">*/}
                    {/*        <div className="subscription-active-plan-card">*/}
                    {/*            <div className="_card-top">*/}
                    {/*                <p className="_plan">*/}
                    {/*                    Your active plan:*/}
                    {/*                    <span>Monthly</span>*/}
                    {/*                    <Image*/}
                    {/*                        src={'/icons/emoji3.svg'}*/}
                    {/*                        alt='img'*/}
                    {/*                        layout={'fixed'}*/}
                    {/*                        width={40}*/}
                    {/*                        height={40}*/}
                    {/*                    />*/}
                    {/*                </p>*/}
                    {/*                <Button*/}
                    {/*                    color="blue"*/}
                    {/*                    appearance="primary"*/}
                    {/*                    className="btn-custom-outline unsubcribe-btn"*/}
                    {/*                >*/}
                    {/*                    Unsubscribe*/}
                    {/*                </Button>*/}
                    {/*            </div>*/}
                    {/*            <div className="_card-content">*/}
                    {/*                <div>*/}
                    {/*                    <p>View purchase history</p>*/}
                    {/*                    <span>See your previous purchases and transactions</span>*/}
                    {/*                </div>*/}
                    {/*                <ActionLink*/}
                    {/*                    size="lg"*/}
                    {/*                    href="/teammer/profile/purchase-history"*/}
                    {/*                    classNames='bg-transparent'*/}
                    {/*                    padding="7px"*/}
                    {/*                    margin="0px 0px 0px 0.5rem"*/}
                    {/*                >*/}
                    {/*                    <Image*/}
                    {/*                        src={'/icons/arrow-right.svg'}*/}
                    {/*                        alt='img'*/}
                    {/*                        layout={'fixed'}*/}
                    {/*                        width={8}*/}
                    {/*                        height={14}*/}
                    {/*                    />*/}
                    {/*                </ActionLink>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<p className='change-plan-title'>*/}
                    {/*    🙈 You can change your plan:*/}
                    {/*</p>*/}
                    {/*<div className="subscribe-wrapper">*/}
                    {/*    <div className="_top">*/}
                    {/*        <div className="_top-left">*/}
                    {/*            <Image*/}
                    {/*                src={'/img/Monthly.png'}*/}
                    {/*                alt='img'*/}
                    {/*                layout={'fixed'}*/}
                    {/*                className={`${!isActiveAnnualy ? 'visible' : 'invisible'}`}*/}
                    {/*                width={48}*/}
                    {/*                height={48}*/}
                    {/*            />*/}
                    {/*            <div className="gradient-wrapper">*/}
                    {/*                <div className="_text-container">*/}
                    {/*                    <h4 className={`plan-title ${!isActiveAnnualy ? '_text-monthly active' : ''}`}>Monthly</h4>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <Toggle*/}
                    {/*            className={`custom-switch ${isActiveAnnualy ? 'active' : ''}`}*/}
                    {/*            size="lg"*/}
                    {/*            onChange={(e) => setIsActiveAnnualy(e)}*/}
                    {/*        />*/}
                    {/*        <div className="_top-right">*/}
                    {/*            <div className="gradient-wrapper">*/}
                    {/*                <div className="_text-container">*/}
                    {/*                    <h4 className={`plan-title ${isActiveAnnualy ? '_text-annualy active' : ''}`}>Annualy</h4>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <Image*/}
                    {/*                src={'/img/Annualy.png'}*/}
                    {/*                alt='img'*/}
                    {/*                layout={'fixed'}*/}
                    {/*                className={`${isActiveAnnualy ? 'visible' : 'invisible'}`}*/}
                    {/*                width={48}*/}
                    {/*                height={48}*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="_body">*/}
                    {/*        <p className="title">You will have:</p>*/}
                    {/*        <ul className="plan-list">*/}
                    {/*            <li>*/}
                    {/*                <Avatar*/}
                    {/*                    size="sm"*/}
                    {/*                    circle*/}
                    {/*                    src="/img/plan-item1.png"*/}
                    {/*                    alt="plan item"*/}
                    {/*                />*/}
                    {/*                <span>Apply to any startup with only one click️</span>*/}
                    {/*            </li>*/}
                    {/*            <li>*/}
                    {/*                <Avatar*/}
                    {/*                    size="sm"*/}
                    {/*                    circle*/}
                    {/*                    src="/img/plan-item2.png"*/}
                    {/*                    alt="plan item"*/}
                    {/*                />*/}
                    {/*                <span>Become a team member at a startup company</span>*/}
                    {/*            </li>*/}
                    {/*            <li>*/}
                    {/*                <Avatar*/}
                    {/*                    size="sm"*/}
                    {/*                    circle*/}
                    {/*                    src="/img/plan-item3.png"*/}
                    {/*                    alt="plan item"*/}
                    {/*                />*/}
                    {/*                <span>Get updated when your position is needed in a startup team</span>*/}
                    {/*            </li>*/}
                    {/*            <li>*/}
                    {/*                <Avatar*/}
                    {/*                    size="sm"*/}
                    {/*                    circle*/}
                    {/*                    src="/img/plan-item4.png"*/}
                    {/*                    alt="plan item"*/}
                    {/*                />*/}
                    {/*                <span>Chat with startup owners</span>*/}
                    {/*            </li>*/}
                    {/*        </ul>*/}
                    {/*    </div>*/}
                    {/*    <div className="_bottom">*/}
                    {/*        <div className='price'>*/}
                    {/*            {*/}
                    {/*                isActiveAnnualy ?*/}
                    {/*                    <Image*/}
                    {/*                        src={'/img/price2.png'}*/}
                    {/*                        alt='img'*/}
                    {/*                        layout={'fixed'}*/}
                    {/*                        width={89}*/}
                    {/*                        height={43}*/}
                    {/*                    />*/}
                    {/*                    :*/}
                    {/*                    <Image*/}
                    {/*                        src={'/img/price1.png'}*/}
                    {/*                        alt='img'*/}
                    {/*                        layout={'fixed'}*/}
                    {/*                        width={52}*/}
                    {/*                        height={43}*/}
                    {/*                    />*/}
                    {/*            }*/}
                    {/*        </div>*/}
                    {/*        {*/}
                    {/*            isActiveAnnualy ?*/}
                    {/*                <Button*/}
                    {/*                    color="blue"*/}
                    {/*                    appearance="primary"*/}
                    {/*                    className='btn-choose-plan'*/}
                    {/*                >*/}
                    {/*                    <Image*/}
                    {/*                        src={'/icons/emoji1.svg'}*/}
                    {/*                        alt='img'*/}
                    {/*                        layout={'fixed'}*/}
                    {/*                        width={16}*/}
                    {/*                        height={17}*/}
                    {/*                    />*/}
                    {/*                    Choose*/}
                    {/*                </Button>*/}
                    {/*                :*/}
                    {/*                <Button*/}
                    {/*                    color="blue"*/}
                    {/*                    appearance="primary"*/}
                    {/*                    className="btn-custom-outline btn-active-plan"*/}
                    {/*                >*/}
                    {/*                    <Image*/}
                    {/*                        src={'/icons/emoji1.svg'}*/}
                    {/*                        alt='img'*/}
                    {/*                        layout={'fixed'}*/}
                    {/*                        width={16}*/}
                    {/*                        height={17}*/}
                    {/*                    />*/}
                    {/*                    Your active plan*/}
                    {/*                </Button>*/}
                    {/*        }*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
}
Subscription.layout = true;
export default Subscription;

export const getServerSideProps = async (context) => {

    const fetchUserInfo = await getFetchData("auth/user?include=skills,positions,experiences,detail.location", getToken(context));

    return {
        props: {
            userData: fetchUserInfo?.data,
        }
    }
};