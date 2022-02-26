import React, {useState} from 'react';
import {Panel} from 'rsuite';
import BreadCrumb from '../../src/components/Lib/BreadCrumb';
import Banner from '../../src/components/Lib/Banner';
import CardTeammerProfile from '../../src/components/Profile/CardTeammerProfile';
import CardTeammerWorkExperience from '../../src/components/Profile/CardTeammerWorkExperience';
import CardStartUp from '../../src/components/Cards/CardStartUp';
import CardTeammerPortfolio from '../../src/components/Profile/CardTeammerPortfolio';
import config from '../../src/configuration';
import {getFetchData} from '../../lib/fetchData';
import getAuth, {getToken} from "../../lib/session";

const ProfileTeammer = (props) => {

    // const {
    //     fullname,
    // } = props;

    React.useEffect(() => {
        // console.clear();
        console.log('profile props', props);
    }, [props])
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const [formData, setFormData] = useState({
        position: '',
        company: '',
        location: '',
        start_month: '',
        start_year: '',
        end_month: '',
        end_year: '',
        current: false
    });
    const [userInfo, setUserInfo] = useState({
        experiences: props.userData.experiences && props.userData.experiences
    });
    const toggleCreateModal = () => {
        setIsOpenCreateModal(!isOpenCreateModal);
    };

    return (
        <div className='profile-teammer'>
            <BreadCrumb/>
            <Banner/>
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
                        workExperienceList={userInfo.experiences}
                        editMode={true}
                        createModal={{
                            isOpen: isOpenCreateModal,
                            toggleFunc: toggleCreateModal,
                            title: "Add Work Experience",
                            formData: formData,
                            setFormData: setFormData,
                            positionsList: props.positionList,
                            locationList: props.locationList,
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
                        <CardStartUp/>
                        <CardStartUp/>
                        <CardStartUp/>
                        <CardStartUp/>
                    </Panel>
                    <Panel
                        bordered
                        collapsible
                        defaultExpanded
                        className='panel-joined'
                        header="Saved projects"
                    >
                        <CardStartUp/>
                        <CardStartUp/>
                        <CardStartUp/>
                        <CardStartUp/>
                    </Panel>
                </div>
            </div>
        </div>
    )
}

ProfileTeammer.layout = true;

export default ProfileTeammer;

export const getServerSideProps = async (context) => {
    const auth = getAuth(context);
    if (auth !== "2") {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
    const fetchUserInfo =
        await getFetchData("auth/user?include=skills,positions,experiences,experiences.location,detail.location", getToken(context));

    const joinedProjectList = await getFetchData("users/projects?include=jobs", getToken(context));
    const fetchPositions = await fetch(config.BASE_URL + "positions");
    const positionsData = await fetchPositions.json();

    const fetchSkills = await fetch(config.BASE_URL + "skills");
    const skillsData = await fetchSkills.json();

    const fetchLocations = await fetch(config.BASE_URL + "locations");
    const locationData = await fetchLocations.json();
    return {
        props: {
            userData: fetchUserInfo?.data,
            joinedProjectList: joinedProjectList,
            positionList: positionsData.data.items.map(item => {
                return {
                    value: item.id,
                    label: item.name
                }
            }),
            skillList: skillsData.data.items.map(item => {
                return {
                    value: item.id,
                    label: item.name ? item.name : ''
                }
            }),
            locationList: locationData.data.items.map(item => {
                return {
                    value: item.id,
                    label: item.name ? item.name : ''
                }
            }),
            token: getToken(context)
        }
    }
}
