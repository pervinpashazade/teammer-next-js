import React, { useState } from 'react';
import { Avatar, Button, Panel, Tag } from 'rsuite';
import BreadCrumb from '../../src/components/Lib/BreadCrumb';
import Banner from '../../src/components/Lib/Banner';
import { getFetchData } from '../../lib/fetchData';
import { getToken } from "../../lib/session";
import CardStartupProfile from '../../src/components/Startup/CardStartupProfile';
import CardJobList from '../../src/components/Startup/CardJobList';
import Image from 'next/image';
import axios from 'axios';
import config, { NEXT_URL } from '../../src/configuration';

function Startup(props) {

    const {
        jobData,
        logo,
        startupJobList,
        similarJobList,
    } = props;

    const [token, setToken] = useState('');

    React.useEffect(async () => {
        const fetchUser = await fetch(NEXT_URL + 'api/auth');
        const resObj = await fetchUser.json();
        setToken(resObj?.user?.token)
        console.log('token ', resObj.user.token);
    }, [])

    React.useEffect(() => {
        console.log('props job', props);
    }, [props])

    const applyToJob = () => {
        if (!jobData) return;
        axios.post(config.BASE_URL + `jobs/${jobData.id}/apply`, null, {
            headers: {
                "Authorization": token
            }
        }).then(res => {
            console.log('apply res', res)
        });
    }

    return (
        <div className='profile-job'>
            <BreadCrumb />
            <Banner />
            <div className="profile-wrapper">
                <div className="content">
                    <div className="row">
                        <div className="col-md-12 col-lg-6 mb-4">
                            <div className="_top-title">
                                <Avatar
                                    size="md"
                                    circle
                                    src={jobData?.project?.logo ? jobData.project.logo : "https://www.w3schools.com/howto/img_avatar.png"}
                                    alt="startup profile img"
                                />
                                <h2 className='startup-title'>
                                    {jobData?.project?.title}
                                </h2>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6 mb-4">
                            <div className="_top-actions">
                                <ul>
                                    <li className='create-date'>
                                        {jobData?.created_at}
                                    </li>
                                    {/* <li className='create-date'>link</li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="job-details_top">
                        <h1 className="_title">
                            {jobData?.position?.name}
                        </h1>
                        <div className="tag-wrapper">
                            {
                                jobData?.type?.name &&
                                <Tag size="lg" className="custom-tag mb-4">Motion</Tag>
                            }
                        </div>
                        <ul>
                            {
                                jobData?.location?.name &&
                                <li>
                                    <Image
                                        src={'/icons/location.svg'}
                                        alt='icon'
                                        width={16}
                                        height={16}
                                    />
                                    <span className="item">{jobData.location.name}</span>
                                </li>
                            }
                            {
                                jobData?.type?.name &&
                                <li>
                                    <Image
                                        src={'/icons/location.svg'}
                                        alt='icon'
                                        width={16}
                                        height={16}
                                    />
                                    <span className="item">{jobData.type.name}</span>
                                </li>
                            }
                            {
                                jobData?.salary &&
                                <li>
                                    <Image
                                        src={'/icons/location.svg'}
                                        alt='icon'
                                        width={16}
                                        height={16}
                                    />
                                    <span className="item">{jobData.salary}</span>
                                </li>
                            }
                            {
                                jobData?.years_of_experience &&
                                <li>
                                    <Image
                                        src={'/icons/location.svg'}
                                        alt='icon'
                                        width={16}
                                        height={16}
                                    />
                                    <span className="item">
                                        {jobData.years_of_experience} years of experience
                                    </span>
                                </li>
                            }
                        </ul>
                        <div className="btn-wrapper">
                            <Button
                                appearance="primary"
                                onClick={applyToJob}
                            >
                                Apply
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
                        {jobData?.description}
                    </div>
                </div>
                <div className="right-side">
                    <CardJobList
                        classNames="mb-3"
                        title={`Other requirements ${jobData?.project?.title}`}
                        jobList={startupJobList}
                    />
                    <CardJobList
                        classNames="mb-3"
                        title="Similar requirements"
                        jobList={similarJobList}
                        showStartupDetails
                    />
                </div>
            </div>
        </div>
    )
}

Startup.layout = true;

export default Startup;

export const getServerSideProps = async (context) => {
    // main datas
    const jobData = await getFetchData(`jobs/${context.params.id}?include=project,position,location,type`, getToken(context));
    let similarJobs = [];
    let startupJobs = [];

    // startup other jobs start
    const startupJobList = await getFetchData(
        `projects/${jobData?.data?.project?.id}/jobs?include=position,project.type,project.owner`,
        getToken(context)
    );
    if (jobData?.data?.project?.id) {
        startupJobs = startupJobList.data.items.filter(x => x.id !== jobData.data.id)
    };
    // startup other jobs end

    // similar job list start
    let postion_id = '';
    if (jobData?.data?.position?.id) {
        postion_id = jobData.data.position.id;
    };
    const filteredSimilarJobList = await getFetchData(`jobs?filter[position_id]=${postion_id}&include=project,project.type,position&per_page=5`);
    if (jobData?.data?.id && filteredSimilarJobList?.data?.items) {
        similarJobs = filteredSimilarJobList.data.items.filter(x => x.id !== jobData.data.id)
    };
    // similar job list end

    return {
        props: {
            jobData: jobData?.data,
            startupJobList: startupJobs,
            similarJobList: similarJobs,
        }
    }
}