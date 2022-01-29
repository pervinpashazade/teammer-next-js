import React from 'react';
import Link from 'next/link';
import { Panel } from 'rsuite';
import BreadCrumb from '../src/components/Lib/BreadCrumb';
import Banner from '../src/components/Lib/Banner';
import CardTeammerProfile from '../src/components/Profile/CardTeammerProfile';
import CardTeammerWorkExperience from '../src/components/Profile/CardTeammerWorkExperience';
import CardStartUp from '../src/components/Cards/CardStartUp';
import CardTeammerPortfolio from '../src/components/Profile/CardTeammerPortfolio';
import config from '../src/configuration';

const profileTeammer = (props) => {

    const {
        fullname,
    } = props;

    React.useEffect(() => {
        console.log('use effect', props.userData);
    }, [props.userData])

    return (
        <div className='profile'>
            <BreadCrumb />
            <Banner />
            <div className="profile-wrapper">
                <div className="left-side">
                    <CardTeammerProfile
                        isProfile
                        fullname={props.userData?.full_name}
                        about={props.userData.detail.about}
                        position={props.positionList.find(x => x.id === props.userData.position_id)?.name}
                        experienceYear={props.userData.detail.years_of_experience}
                        role={props.roleList.find(x => x.id === props.userData.detail.project_role_id)?.name}
                        location={props.locationList.find(x => x.id === props.userData.detail.location_id)?.name}
                    />
                    {/* <h1>year {props.userData.detail.years_of_experience}</h1> */}
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

export default profileTeammer;

export const getServerSideProps = async () => {
    const fetchPositions = await fetch(config.BASE_URL + "positions");
    const positionsData = await fetchPositions.json();

    const fetchUserInfo = await fetch(config.BASE_URL + "auth/user?include=skills,positions", {
        headers: {
            'Authorization': 'Bearer 63|rIwVpWOu69CTXYRSEluQb1qPsaIEFWytF9HdgsK6'
        }
    });
    const userData = await fetchUserInfo.json();

    const fetchRoles = await fetch(config.BASE_URL + "project/roles");
    const rolesData = await fetchRoles.json();

    const fetchLocations = await fetch(config.BASE_URL + "locations");
    const locationData = await fetchLocations.json();

    return {
        props: {
            positionList: positionsData.data.items,
            userData: userData?.data,
            roleList: rolesData.data,
            locationList: locationData.data.items,
        }
    }
}
