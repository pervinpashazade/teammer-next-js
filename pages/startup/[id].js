import React, { useState } from 'react';
import { Button, Panel } from 'rsuite';
import BreadCrumb from '../../src/components/Lib/BreadCrumb';
import Banner from '../../src/components/Lib/Banner';
import CardTeammerProfile from '../../src/components/Profile/CardTeammerProfile';
import CardTeammerWorkExperience from '../../src/components/Profile/CardTeammerWorkExperience';
import CardStartUp from '../../src/components/Cards/CardStartUp';
import CardTeammerPortfolio from '../../src/components/Profile/CardTeammerPortfolio';
import config from '../../src/configuration';
import { getFetchData } from '../../lib/fetchData';
import { getToken } from "../../lib/session";
import CardStartupProfile from '../../src/components/Startup/CardStartupProfile';
import CardJobList from '../../src/components/Startup/CardJobList';

function Startup(props) {

    const {
        startupData,
        startupJobList,
    } = props;

    // React.useEffect(() => {
    //     console.clear();
    //     console.log('props', props);
    // }, [props])

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

    const startupData = await getFetchData(`projects/${context.params.id}`, getToken(context));
    const startupJobList = await getFetchData(
        `projects/${context.params.id}/jobs`,
        getToken(context)
    );

    return {
        props: {
            startupData: startupData?.data,
            startupJobList: startupJobList?.data.items
        }
    }
}