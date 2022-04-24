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
import ProPanel from '../../src/components/ProPanel';

const ProfileTeammer = (props) => {

    const {
        joinedProjectList,
    } = props;


    const [teammer, setTeammer] = useState({

    })

    React.useEffect(() => {
        // console.clear();
        console.log('view teammer props', props.userData);
    }, [props]);

    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const [portfolioUrlList, setPortfolioUrlList] = useState([])

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
                        editMode={false}
                        createModal={{
                            isOpen: isOpenCreateModal,
                            toggleFunc: toggleCreateModal,
                            title: "Add Work Experience",
                            locationlist: []
                        }}
                    />
                </div>
                <div className="content">
                    <div className="portfolio-wrapper">
                        <h5>CV and Portfolio</h5>
                        <CardTeammerPortfolio
                            // cvUrl={teammer.cvUrl}
                            // full_name={teammer.full_name}
                            // portfolioUrlList={teammer.portfolioList}
                            portfolioUrlList={portfolioUrlList}
                        // setPortfolioUrlList={setPortfolioUrlList}
                        />
                    </div>
                    <div className="custom-devider"></div>
                    <ProPanel
                        title="Projects joined"
                        noDataMessage="User has not yet joined any project"
                        dataList={joinedProjectList?.length ? joinedProjectList : []}
                    />
                </div>
            </div>
        </div>
    )
}

ProfileTeammer.layout = true;

export default ProfileTeammer;

export const getServerSideProps = async (context) => {

    const fetchUserInfo = await getFetchData(`users/${context.params.id}/show?include=detail.experience_level,experiences.location,skills,positions,detail.location`, getToken(context));

    // const joinedProjectList = await getFetchData("users/projects?include=jobs", getToken(context));

    return {
        props: {
            userData: fetchUserInfo?.data,
            // joinedProjectList: joinedProjectList,
        }
    }
}
