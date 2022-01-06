import Image from 'next/image';
import React from 'react';
import { Avatar } from 'rsuite';
import BreadCrumb from '../../src/components/Lib/BreadCrumb';

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
            <div className="app-plan">
                test
            </div>
        </div>
    )
}

export default pricing
