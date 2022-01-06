import React from 'react';
import Link from 'next/link';
import { Panel } from 'rsuite';
import BreadCrumb from '../src/components/Lib/BreadCrumb';
import Banner from '../src/components/Lib/Banner';
import CardTeammerProfile from '../src/components/Profile/CardTeammerProfile';
import CardTeammerWorkExperience from '../src/components/Profile/CardTeammerWorkExperience';
import CardStartUp from '../src/components/Cards/CardStartUp';
import CardTeammerPortfolio from '../src/components/Profile/CardTeammerPortfolio';

const profileTeammer = () => {
    return (
        <div className='profile'>
            <BreadCrumb />
            <Banner />
            <div className="profile-wrapper">
                <div className="left-side">
                    <CardTeammerProfile />
                    <CardTeammerWorkExperience />
                </div>
                <div className="content">
                    <div className="portfolio-wrapper">
                        <h5>CV and Portfolio</h5>
                        <CardTeammerPortfolio />
                    </div>
                    <div className="custom-devider"></div>
                    <Panel
                        bordered
                        collapsible
                        className='panel-joined'
                        header="Projects joined"
                    >
                        <CardStartUp />
                        <CardStartUp />
                        <CardStartUp />
                        <CardStartUp />
                    </Panel>
                </div>
            </div>
        </div>
    )
}

export default profileTeammer
