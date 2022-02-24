import React, { useState } from 'react';
import { Avatar, Button, Panel, Tag } from 'rsuite';
import BreadCrumb from '../../src/components/Lib/BreadCrumb';
import Banner from '../../src/components/Lib/Banner';
import { getFetchData } from '../../lib/fetchData';
import { getToken } from "../../lib/session";
import CardStartupProfile from '../../src/components/Startup/CardStartupProfile';
import CardJobList from '../../src/components/Startup/CardJobList';
import Image from 'next/image';

function Startup(props) {

    const {
        startupData,
        logo,
        startupJobList,
        similarJobList,
    } = props;

    React.useEffect(() => {
        console.log('props', props);
    }, [props])

    return (
        <div className='profile-job'>
            <BreadCrumb />
            <Banner />
            <div className="profile-wrapper">
                <div className="content">
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="_top-title">
                                <Avatar
                                    size="md"
                                    circle
                                    src={logo ? logo : "https://www.w3schools.com/howto/img_avatar.png"}
                                    alt="startup profile img"
                                />
                                <h2 className='startup-title'>Netflix</h2>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="_top-actions">
                                <ul>
                                    <li className='create-date'>Posted 17 hours ago</li>
                                    {/* <li className='create-date'>link</li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="job-details_top">
                        <h1 className="_title">Motion designer</h1>
                        <div className="tag-wrapper">
                            {/* {
                                skills?.map((item, index) => {
                                    return <Tag key={index} size="lg" className="custom-tag">{item.name}</Tag>
                                })
                            } */}
                            <Tag size="lg" className="custom-tag mb-4">Graphic designer</Tag>
                            <Tag size="lg" className="custom-tag mb-4">Motion</Tag>
                        </div>
                        <ul>
                            <li>
                                <Image
                                    src={'/icons/location.svg'}
                                    alt='icon'
                                    width={16}
                                    height={16}
                                />
                                <span className="item">San Francisco, CA / Boston, MA</span>
                            </li>
                            <li>
                                <Image
                                    src={'/icons/location.svg'}
                                    alt='icon'
                                    width={16}
                                    height={16}
                                />
                                <span className="item">Full time</span>
                            </li>
                            <li>
                                <Image
                                    src={'/icons/location.svg'}
                                    alt='icon'
                                    width={16}
                                    height={16}
                                />
                                <span className="item">100 $ per month</span>
                            </li>
                            <li>
                                <Image
                                    src={'/icons/location.svg'}
                                    alt='icon'
                                    width={16}
                                    height={16}
                                />
                                <span className="item">7 years of experience</span>
                            </li>
                        </ul>
                        <div className="btn-wrapper">
                            <Button
                                appearance="primary"
                            >
                                Respond
                            </Button>
                            <Button
                                appearance="primary"
                            >
                                <Image
                                    src={'/icons/envelope_white.svg'}
                                    alt='icon'
                                    width={24}
                                    height={24}
                                />
                            </Button>
                        </div>
                    </div>
                    <div className='startup-description'>
                        <h4 className='_title'>About this requirement</h4>
                        {startupData?.description}
                        Hey! We are an effective, extraordinary marketing agency that works out of the box, breaking stereotypical thinking and approach to work. We think in terms of the scale of a flight to the moon, so we are growing rapidly and looking for a team of skilled craftsmen who are eager to fulfill their dreams and are ready to develop with us.
                        Now we are actively looking for a DESIGNER
                        What will you do:
                        Create photo and video creatives for Facebook advertising campaigns
                        We offer you:
                        Convenient work schedule from 9:00 to 18:00, Mon - Fri;
                        Decent salary (we value our specialists very much);
                        Professional growth and self-realization;
                        The ability to realize your ideas not in theory, but in practice
                        What do we expect from you:
                        Proficiency in Adobe Photoshop, After Effects, Premiere Pro;
                        The ability to create unique, vivid videos and photos;
                        Personal qualities: creativity, desire to grow and develop with us.
                        Do you feel like your skills are up to the mark? Do you want to become part of our team? Rather send your resume
                    </div>
                </div>
                <div className="right-side">
                    <CardJobList
                        classNames="mb-3"
                        title={`Other requirements ${'Netflix'}`}
                        jobList={startupJobList}
                    />
                    <CardJobList
                        classNames="mb-3"
                        showStartupDetails
                        title="Similar requirements"
                        jobList={similarJobList}
                    />
                </div>
            </div>
        </div>
    )
}

Startup.layout = true;

export default Startup;

export const getServerSideProps = async (context) => {

    const startupData = await getFetchData(`projects/${context.params.id}`, getToken(context));

    // STATIC !!!!!!

    const startupJobList = await getFetchData(
        `projects/5/jobs`,
        getToken(context)
    );

    const similarJobList = await getFetchData(`jobs?include=project,project.owner,position&per_page=4`);

    // const similarJobList = await fetch(config.BASE_URL + "jobs?include=project,project.owner,position&per_page=6");

    return {
        props: {
            startupData: startupData?.data,
            startupJobList: startupJobList?.data.items,
            similarJobList: similarJobList?.data.items,
        }
    }
}