import React, { useState } from 'react';
import { Notification, Panel, toaster } from 'rsuite';
import BreadCrumb from '../../src/components/Lib/BreadCrumb';
import Banner from '../../src/components/Lib/Banner';
import CardTeammerProfile from '../../src/components/Profile/CardTeammerProfile';
import CardTeammerWorkExperience from '../../src/components/Profile/CardTeammerWorkExperience';
import CardStartUp from '../../src/components/Cards/CardStartUp';
import CardTeammerPortfolio from '../../src/components/Profile/CardTeammerPortfolio';
import config from '../../src/configuration';
import { getFetchData } from '../../lib/fetchData';
import getAuth, { getToken } from "../../lib/session";

const ProfileTeammer = (props) => {

    const {
        joinedProjectList,
    } = props;

    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
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
    const getData = async () => {
        const fetchUserInfo = await getFetchData("auth/user?include=skills,positions,experiences,detail.location", props.token);
        // console.log(fetchUserInfo)
        setUserInfo({
            ...userInfo,
            experiences: fetchUserInfo.data.experiences
        })
    }
    const toggle = () => {
        setIsOpenCreateModal(!isOpenCreateModal)
    }
    const editModal = (id) => {
        // console.log(userInfo.experiences.find(item => item.id === id));
        let element = userInfo.experiences.find(item => item.id === id);
        setFormData({
            id: id,
            position: element.position.id,
            company: element.company,
            location: element.location_id,
            current: element.current,
            start_month: element.start_date ? Number(element.start_date.split("-")[0]) : "",
            start_year: element.start_date ? Number(element.start_date.split("-")[1]) : "",
            end_month: element.end_date ? Number(element.end_date.split("-")[0]) : "",
            end_year: element.end_date ? Number(element.end_date.split("-")[1]) : "",
        });
        setIsOpenCreateModal(!isOpenCreateModal);
    };
    const toggleEditModal = async () => {
        // console.log(formData);
        if (formData.position
            && formData.company
            && formData.location
            && formData.start_month
            && formData.start_year) {
            let data = {
                location_id: formData.location,
                position_id: formData.position,
                company: formData.company,
                start_date: `${formData.start_month < 10 ? '0' + formData.start_month : formData.start_month}-${formData.start_year}`,
                // end_date: `${formData.end_month < 10 ? '0' + formData.end_month : formData.end_month}-${formData.end_year}`
                // current: formData.current
            }
            if (formData.current) {
                data.end_date = ""
                // data.current = true;
            } else {
                data.end_date = `${formData.end_month < 10 ? '0' + formData.end_month : formData.end_month}-${formData.end_year}`
            }
            let response = await fetch(config.BASE_URL + "experiences/" + formData.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
                },
                body: JSON.stringify(data)
            })
            let res = await response.json();
            // console.log(res)
            if (res.success) {
                getData();
                setFormData({
                    id: '',
                    position: '',
                    company: '',
                    location: '',
                    start_month: '',
                    start_year: '',
                    end_month: '',
                    end_year: '',
                    current: false
                })
                toaster.push(
                    <Notification type={"success"} header="Success!" closable>
                        Work experience updated!
                    </Notification>, 'topEnd'
                );
            }
        }
        else {
            toaster.push(
                <Notification type={"error"} header="Success!" closable>
                    Some fields are empty!
                </Notification>, 'topEnd'
            );
        }
    };
    const toggleCreateModal = async () => {
        // console.log(formData);
        if (formData.position
            && formData.company
            && formData.location
            && formData.start_month
            && formData.start_year) {
            let data = {
                location_id: formData.location,
                position_id: formData.position,
                company: formData.company,
                start_date: `${formData.start_month < 10 ? '0' + formData.start_month : formData.start_month}-${formData.start_year}`,
                end_date: `${formData.end_month < 10 ? '0' + formData.end_month : formData.end_month}-${formData.end_year}`
                // current: formData.current
            }
            // if (formData.current) {
            //     data.end_date = ""
            //     data.current = true;
            // } else {
            //     data.end_date = `${formData.end_month < 10 ? '0' + formData.end_month : formData.end_month}-${formData.end_year}`
            // }
            let response = await fetch(config.BASE_URL + "experiences", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
                },
                body: JSON.stringify(data)
            })
            let res = await response.json()
            if (res.success) {
                getData();
                setFormData({
                    id: '',
                    position: '',
                    company: '',
                    location: '',
                    start_month: '',
                    start_year: '',
                    end_month: '',
                    end_year: '',
                    current: false
                })
                toaster.push(
                    <Notification type={"success"} header="Success!" closable>
                        New work experience added!
                    </Notification>, 'topEnd'
                );
                setIsOpenCreateModal(!isOpenCreateModal);
            }
        }
        else {
            toaster.push(
                <Notification type={"error"} header="Success!" closable>
                    Some fields are empty!
                </Notification>, 'topEnd'
            );
        };
    };

    React.useEffect(() => {
        console.log('teammer profile page props', props);
    }, [props])

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
                            toggle: toggle,
                            toggleFunc: toggleCreateModal,
                            toggleEdit: editModal,
                            toggleEditFunc: toggleEditModal,
                            title: formData.id ? "Edit Work Experience" : "Add Work Experience",
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
                        defaultExpanded={joinedProjectList?.length ? true : false}
                        className='panel-joined'
                        header="Projects joined"
                    >
                        {
                            joinedProjectList?.length ?
                                ''
                                :
                                'You have not yet joined any project'
                        }
                        {
                            joinedProjectList?.map((item, index) => {
                                return <span key={index}>test</span>
                            })
                        }
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

    const joinedProjectList = await getFetchData("users/joined-jobs", getToken(context));
    const fetchPositions = await fetch(config.BASE_URL + "positions");
    const positionsData = await fetchPositions.json();

    const fetchSkills = await fetch(config.BASE_URL + "skills");
    const skillsData = await fetchSkills.json();

    const fetchLocations = await fetch(config.BASE_URL + "locations");
    const locationData = await fetchLocations.json();
    return {
        props: {
            userData: fetchUserInfo?.data,
            joinedProjectList: joinedProjectList.data?.items,
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
