import React, { useState } from 'react';
import { Panel } from 'rsuite';
import BreadCrumb from '../../src/components/Lib/BreadCrumb';
import Banner from '../../src/components/Lib/Banner';
import CardTeammerProfile from '../../src/components/Profile/CardTeammerProfile';
import CardTeammerWorkExperience from '../../src/components/Profile/CardTeammerWorkExperience';
import CardStartUp from '../../src/components/Cards/CardStartUp';
import CardTeammerPortfolio from '../../src/components/Profile/CardTeammerPortfolio';
import config from '../../src/configuration';
import { getFetchData } from '../../lib/fetchData';
import { getToken } from "../../lib/session";

const ProfileTeammer = (props) => {

    // const {
    //     fullname,
    // } = props;

    React.useEffect(() => {
        // console.clear();
        console.log('view teammer props', props);
    }, [props]);

    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

    const toggleCreateModal = () => {
        setIsOpenCreateModal(!isOpenCreateModal);
    };

    return (
        <div className='profile-teammer'>
            <BreadCrumb />
            <Banner />
            <div className="profile-wrapper">
                <div className="left-side">
                    <CardTeammerProfile
                        props={
                            {
                                isProfile: false,
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
                        // editMode={true}
                        createModal={{
                            isOpen: isOpenCreateModal,
                            toggleFunc: toggleCreateModal,
                            title: "Add Work Experience"
                        }}
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
                </div>
            </div>
        </div>
    )
}

ProfileTeammer.layout = true;

export default ProfileTeammer;

export const getServerSideProps = async (context) => {

    const fetchUserInfo = await getFetchData(`users/${context.params.id}/show?include=detail.experience_level,experiences.location,skills,positions,detail.location`, getToken(context));

    const joinedProjectList = await getFetchData("users/projects?include=jobs", getToken(context));

    return {
        props: {
            userData: fetchUserInfo?.data,
            joinedProjectList: joinedProjectList,
        }
    }
}
