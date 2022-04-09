import React, { useState } from 'react';
import { Panel } from 'rsuite';
import BreadCrumb from '../../src/components/Lib/BreadCrumb';
import Banner from '../../src/components/Lib/Banner';
import CardTeammerProfile from '../../src/components/Profile/CardTeammerProfile';
import CardTeammerWorkExperience from '../../src/components/Profile/CardTeammerWorkExperience';
import CardStartUp from '../../src/components/Cards/CardStartUp';
import CardTeammerPortfolio from '../../src/components/Profile/CardTeammerPortfolio';
import config from '../../src/configuration';
import ProPanel from '../../src/components/ProPanel';
// import { useAuth } from '../../Auth';
import axios from 'axios';

const ProfileTeammer = (props) => {

    // const authContext = useAuth();

    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);

    // const [user, setUser] = useState();

    const [joinedProjectList, setJoinedProjectList] = useState([]);

    React.useEffect(() => {
        getPublicDatas();
        axios.get(config.BASE_URL + 'auth/user?include=skills,positions,experiences,detail.location').then(res => {
            console.log('res data', res.data.data);
            if (res.data.success) {
                setTeammer({
                    avatarUrl: res.data.data.detail.photo,
                    cvUrl: res.data.data.detail.cv,
                    username: res.data.data.username,
                    full_name: res.data.data.full_name,
                    location: res.data.data.detail.location,
                    positions: res.data.data.positions,
                    experienceLevel: res.data.data.detail.experience_level,
                    skillList: res.data.data.skills,
                    socialDatas: res.data.data.detail.social_accounts,
                    portfolioList: res.data.data.detail.portfolio,
                    about: res.data.data.detail.about,
                    experience: res.data.data.detail.years_of_experience,
                    workExperienceList: res.data.data.experiences,
                });
            };
        });
        axios.get(config.BASE_URL + 'users/joined-jobs').then(res => {
            console.log('res data', res.data.data);
            if (res.data.success) {
                setJoinedProjectList(res.data.data.items);
            };
        });
    }, []);

    // React.useEffect(() => {
    //     setUser(authContext.currentUser);
    // }, [authContext.currentUser]);

    const [teammer, setTeammer] = useState({
        avatarFile: null,
        avatarUrl: null,
        cvFile: null,
        cvUrl: null,
        username: null,
        full_name: null,
        location: null,
        positions: [],
        experience: '',
        experienceLevel: null,
        skillList: [],
        socialDatas: {},
        portfolioList: [],
        about: '',
        workExperienceList: [],
    });

    const [publicDatas, setPublicDatas] = useState({
        positionList: [],
        roleList: [],
        projectTypeList: [],
        locationList: [],
        jobTypeList: [],
        paymentTypeList: [],
        skillList: [],
        experienceLevelList: [],
        years: [],
    });

    const getPublicDatas = async () => {
        let positionList = [];
        let roleList = [];
        let projectTypeList = [];
        let locationList = [];
        let jobTypeList = [];
        let paymentTypeList = [];
        let skillList = [];
        let experienceLevelList = [];

        await axios.get(config.BASE_URL + 'positions?noPagination=1').then(res => {
            if (res.data.success) {
                positionList = res.data.data.items;
            };
        });
        await axios.get(config.BASE_URL + 'project/roles?noPagination=1').then(res => {
            if (res.data.success) {
                roleList = res.data.data;
            };
        });
        await axios.get(config.BASE_URL + 'project/types?noPagination=1').then(res => {
            if (res.data.success) {
                projectTypeList = res.data.data;
            };
        });
        await axios.get(config.BASE_URL + 'locations?noPagination=1').then(res => {
            if (res.data.success) {
                locationList = res.data.data.items;
            };
        });
        await axios.get(config.BASE_URL + 'job/types?noPagination=1').then(res => {
            if (res.data.success) {
                jobTypeList = res.data.data;
            };
        });
        await axios.get(config.BASE_URL + 'job/payment_types?noPagination=1').then(res => {
            if (res.data.success) {
                paymentTypeList = res.data.data;
            };
        });
        await axios.get(config.BASE_URL + 'skills?noPagination=1').then(res => {
            if (res.data.success) {
                skillList = res.data.data.items;
            };
        });
        await axios.get(config.BASE_URL + 'experience-levels?noPagination=1').then(res => {
            if (res.data.success) {
                experienceLevelList = res.data.data;
            };
        });

        setPublicDatas({
            positionList: positionList,
            roleList: roleList,
            projectTypeList: projectTypeList,
            locationList: locationList,
            jobTypeList: jobTypeList,
            paymentTypeList: paymentTypeList,
            skillList: skillList,
            experienceLevelList: experienceLevelList,
        });
    };

    const toggleCreateModal = () => {
        setIsOpenCreateModal(!isOpenCreateModal);
    };

    const toggleEditModal = () => {
        setIsOpenEditModal(!isOpenEditModal);
    };

    const addWorkExperience = data => {
        if (!data) return;

        let body = {
            company: data.companyName,
            position_id: data.position.id,
            location_id: data.position.id,
            start_date: `${data.start_month?.id < 10 ? '0' + data.start_month?.id : data.start_month?.id}-${data.start_year?.id}`,
        }

        if (data.end_month?.id && data.end_year?.id) {
            body.start_date = `${data.start_month?.id < 10 ? '0' + data.start_month?.id : data.start_month?.id}-${data.start_year?.id}`;
        };

        axios.post(config.BASE_URL + "experiences", body).then(res => {
            if (res.data.success) {
                delete data.isCurrnet;
                setTeammer(prevState => {
                    return {
                        ...prevState,
                        workExperienceList: [...prevState.workExperienceList, data]
                    }
                });
                setIsOpenCreateModal(false);
            };
        });

        // console.log('SUBMIT DATA', data);
    };

    const editWorkExperience = data => {
        alert('edit work exp');
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
                                isProfile: true,
                                full_name: teammer.full_name,
                                photo: teammer.avatarUrl,
                                location: teammer.location,
                                skills: teammer.skillList,
                                positions: teammer.positions,
                                year_of_experience: teammer.experience,
                                about: teammer.about,
                            }
                        }
                    />
                    <CardTeammerWorkExperience
                        workExperienceList={teammer.workExperienceList}
                        editMode={true}
                        positionList={publicDatas.positionList}
                        locationList={publicDatas.locationList}
                        createModal={{
                            isOpen: isOpenCreateModal,
                            title: "Add Work Experience",
                            toggle: toggleCreateModal,
                            submitFunc: addWorkExperience,
                        }}
                        editModal={{
                            isOpen: isOpenEditModal,
                            title: "Edit Work Experience",
                            toggle: toggleEditModal,
                            submitFunc: editWorkExperience,
                        }}
                    />
                </div>
                <div className="content">
                    <div className="portfolio-wrapper">
                        <h5>CV and Portfolio</h5>
                        <CardTeammerPortfolio
                            portfolioUrlList={teammer.portfolioList}
                        />
                    </div>
                    <div className="custom-devider"></div>
                    <ProPanel
                        title="Projects joined"
                        noDataMessage="You have not yet joined any project"
                        dataList={joinedProjectList?.length ? joinedProjectList : []}
                    />
                    {/* <ProPanel
                        title="Saved projects"
                        noDataMessage="You have not yet saved any project"
                        dataList={joinedProjectList?.length ? joinedProjectList : []}
                    /> */}
                    <Panel
                        bordered
                        collapsible
                        defaultExpanded
                        className='panel-joined'
                        header="Saved projects"
                    >
                        <div className="w-100">
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <CardStartUp />
                                </div>
                                <div className="col-md-6 mb-4">
                                    <CardStartUp />
                                </div>
                                <div className="col-md-6 mb-4">
                                    <CardStartUp />
                                </div>
                                <div className="col-md-6 mb-4">
                                    <CardStartUp />
                                </div>
                            </div>
                        </div>
                    </Panel>
                </div>
            </div>
        </div>
    )
}

ProfileTeammer.layout = true;

export default ProfileTeammer;

// export const getServerSideProps = async (context) => {
//     const auth = getAuth(context);
//     if (auth !== "2") {
//         return {
//             redirect: {
//                 destination: "/login",
//                 permanent: false,
//             },
//         };
//     }
//     const fetchUserInfo =
//         await getFetchData("auth/user?include=skills,positions,experiences,experiences.location,detail.location", getToken(context));


//     return {
//         props: {
//             userData: fetchUserInfo?.data,
//         }
//     }
// }
