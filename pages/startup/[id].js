import React, { useState } from 'react';
import { Button, Panel } from 'rsuite';
import BreadCrumb from '../../src/components/Lib/BreadCrumb';
import Banner from '../../src/components/Lib/Banner';
import { getFetchData } from '../../lib/fetchData';
import { getToken } from "../../lib/session";
import CardStartupProfile from '../../src/components/Startup/CardStartupProfile';
import CardJobList from '../../src/components/Startup/CardJobList';

function Startup(props) {

    const {
        startupData,
        startupJobList,
    } = props;

    React.useEffect(() => {
        console.clear();
        console.log('startup page props', props);
    }, [props])

    return (
        <div className='profile-startup'>
            <BreadCrumb />
            <Banner />
            <div className="profile-wrapper">
                <div className="content">
                    <div className="startup-title">
                        <h1>About this project</h1>
                    </div>
                    <div className='startup-description'>
                        {startupData?.description}
                    </div>
                    {/* <button
                        className='btn btn-link p-0'
                    >
                        Show more
                    </button> */}
                </div>
                <div className="right-side">
                    <CardStartupProfile
                        classNames="mb-3"
                        logo={startupData?.logo}
                        title={startupData?.title}
                        owner_fullname={startupData?.owner?.full_name}
                        owner_image_url={startupData?.owner?.photo}
                    />
                    <CardJobList
                        classNames="mb-3"
                        title="Requirements"
                        jobList={startupJobList}
                    />
                </div>
            </div>
        </div>
    )
}

Startup.layout = true;

export default Startup;

export const getServerSideProps = async (context) => {

    const startupData = await getFetchData(`projects/${context.params.id}?include=owner`, getToken(context));
    const startupJobList = await getFetchData(
        `projects/${context.params.id}/jobs?include=position,project.owner`,
        getToken(context)
    );

    return {
        props: {
            startupData: startupData?.data,
            startupJobList: startupJobList?.data.items
        }
    }
}