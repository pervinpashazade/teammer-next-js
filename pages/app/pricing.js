import React, { useState } from 'react';
import { Avatar, Button, Toggle } from 'rsuite';
import BreadCrumb from '../../src/components/Lib/BreadCrumb';
import Image from 'next/image';

function BannerTop() {
    return (
        <div className='banner-top'>
            <div className="content">
                <div className="title-wrapper">
                    {/* <img src='/icons/emoji1.svg' alt='img' /> */}
                    <Image
                        src={'/icons/emoji1.svg'}
                        alt='startup image'
                        layout={'fixed'}
                        width={16}
                        height={17}
                    />
                    <h5>Join your dream startup team in Minutes</h5>
                </div>
            </div>
        </div>
    )
}


function pricing() {

    const [isActiveAnnualy, setIsActiveAnnualy] = useState(false);

    return (
        <div className='app-pricing'>
            <BreadCrumb />
            <BannerTop />
            <h4 className='page-title'>What will you have with Teammers:</h4>
            <div className="services">
                <div className="service-item">
                    <Avatar
                        size="lg"
                        circle
                        src="/img/service1.png"
                        alt="service"
                    />
                    <p>Apply to any startup with only one click️</p>
                </div>
                <div className="service-item">
                    <Avatar
                        size="lg"
                        circle
                        src="/img/service2.png"
                        alt="service"
                    />
                    <p>Become a team member at a startup company</p>
                </div>
                <div className="service-item">
                    <Avatar
                        size="lg"
                        circle
                        src="/img/service3.png"
                        alt="service"
                    />
                    <p>Get updated when your position is needed in a startup team</p>
                </div>
                <div className="service-item">
                    <Avatar
                        size="lg"
                        circle
                        src="/img/service4.png"
                        alt="service"
                    />
                    <p>Chat with startup owners</p>
                </div>
            </div>
            <div className="app-plan-container">
                <div className="app-plan">
                    <div className="app-plan_top">
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
                    <div className="app-plan_body">
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
    )
}

export default pricing
