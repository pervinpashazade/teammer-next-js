import React from 'react';
import Link from 'next/link';
import { Panel } from 'rsuite';
import BreadCrumb from '../../src/components/Lib/BreadCrumb';
import Banner from '../../src/components/Lib/Banner';
import CardTeammerProfile from '../../src/components/Profile/CardTeammerProfile';
import CardTeammerWorkExperience from '../../src/components/Profile/CardTeammerWorkExperience';
import CardStartUp from '../../src/components/Cards/CardStartUp';
import CardTeammerPortfolio from '../../src/components/Profile/CardTeammerPortfolio';
import config from '../../src/configuration';
import { Cookie, withCookie } from 'next-cookie';
import { getFetchData } from '../../lib/fetchData';
import getAuth, { getToken } from "../../lib/session";

const ProfileTeammer = (props) => {

    const {
        // fullname,
    } = props;

    React.useEffect(() => {
        // console.clear();
        console.log('profile props', props);
    }, [props])

    return (
        <div className='profile'>
            <BreadCrumb />
            <Banner />
            <div className="profile-wrapper">
                <div className="left-side">
                    <CardTeammerProfile
                        props={
                            {
                                isProfile: true,
                                full_name: props.userData?.full_name,
                                photo: props.userData.detail?.photo,
                                location: props.userData.detail?.location,
                                skills: props.userData?.skills,
                                positions: props.userData.positions,
                                year_of_experience: props.userData.detail?.years_of_experience,
                                about: props.userData?.detail?.about,
                            }
                        }
                    />
                    <CardTeammerWorkExperience
                        workExperienceList={props.userData?.experiences}
                    />
                </div>
                <div className="content">
                    <div className="portfolio-wrapper">
                        <h5>CV and Portfolio</h5>
                        <CardTeammerPortfolio
                            portfolioUrlList={props.userData?.detail?.portfolio}
                        />
                    </div>
                    <div className="custom-devider"></div>
                    <Panel
                        bordered
                        collapsible
                        defaultExpanded
                        className='panel-joined'
                        header="Projects joined"
                    >
                        <CardStartUp />
                        <CardStartUp />
                        <CardStartUp />
                        <CardStartUp />
                    </Panel>
                    <Panel
                        bordered
                        collapsible
                        defaultExpanded
                        className='panel-joined'
                        header="Saved projects"
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

ProfileTeammer.layout = true;
export default ProfileTeammer;

export const getServerSideProps = async (context) => {

    const fetchPositions = await fetch(config.BASE_URL + "positions");
    const positionsData = await fetchPositions.json();

    const fetchUserInfo = await getFetchData("auth/user?include=skills,positions,experiences,detail.location", getToken(context));

    const fetchRoles = await fetch(config.BASE_URL + "project/roles");
    const rolesData = await fetchRoles.json();

    const fetchLocations = await fetch(config.BASE_URL + "locations");
    const locationData = await fetchLocations.json();

    const joinedProjectList = await getFetchData("users/projects?include=jobs", getToken(context));

    return {
        props: {
            positionList: positionsData.data.items,
            userData: fetchUserInfo?.data,
            roleList: rolesData.data,
            locationList: locationData.data.items,
            joinedProjectList: joinedProjectList,
        }
    }
}
