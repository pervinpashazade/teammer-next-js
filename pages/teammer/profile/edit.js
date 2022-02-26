import React, {useState} from 'react';
import Link from 'next/link';
import BreadCrumb from '../../../src/components/Lib/BreadCrumb';
import Banner from '../../../src/components/Lib/Banner';
import {MdModeEdit, MdOutlineWorkOutline} from 'react-icons/md';
import {RiSettingsLine} from 'react-icons/ri';
import {FaRegTimesCircle} from 'react-icons/fa';
import {Avatar, Button, Form, Input, InputPicker, Notification, Tag, toaster} from 'rsuite';
import CardTeammerPortfolio from '../../../src/components/Profile/CardTeammerPortfolio';
import CardTeammerWorkExperience from '../../../src/components/Profile/CardTeammerWorkExperience';
import Image from 'next/image';
import {Cookie, withCookie} from 'next-cookie';
import config from '../../../src/configuration';
import {getFetchData} from '../../../lib/fetchData';
import getAuth, {getToken} from '../../../lib/session';
import {buildFormData} from "../../signup/steps";

// const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const EditComponent = (props) => {
    console.log(props)
    const [userData, setUserData] = useState(props.userData)
    console.log(userData);
    const [userInfo, setUserInfo] = useState({
        full_name: userData.full_name && userData.full_name,
        positions: userData.positions && userData.positions,
        year_of_experience: userData.detail.years_of_experience && userData.detail.years_of_experience,
        skills: userData.skills && userData.skills,
        location: userData.detail.location && userData.detail.location.id,
        description: userData.detail.about && userData.detail.about,
        cv: userData.detail.cv && userData.detail.cv,
        portfolio: userData.detail.portfolio && userData.detail.portfolio,
        photo: userData.detail.photo && userData.detail.photo,
        experiences: userData.experiences && userData.experiences
    });
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
    })
    const [selectedPositions, setSelectedPositions] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [portfolioUrlList, setPortfolioUrlList] = useState({
        cvFileName: props.userData?.detail.cv,
        cv: '',
        portfolio: props.userData?.detail.portfolio
    })

    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);

    const getData = async () => {
        const fetchUserInfo = await getFetchData("auth/user?include=skills,positions,experiences,detail.location", props.token);
        setUserInfo({
            ...userInfo,
            experiences: fetchUserInfo.data.experiences
        })
    }
    const editModal = (id) => {
        console.log(userInfo.experiences.find(item => item.id === id));
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
        })
        setIsOpenCreateModal(!isOpenCreateModal);
    }
    const toggle = () => {
        setIsOpenCreateModal(!isOpenCreateModal)
    }
    const toggleEditModal = async () => {
        console.log(formData);
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
            console.log(res)
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
                setIsOpenCreateModal(!isOpenCreateModal);
            }
        } else {
            toaster.push(
                <Notification type={"error"} header="Success!" closable>
                    Some fields are empty!
                </Notification>, 'topEnd'
            );
        }
    };
    const toggleCreateModal = async () => {
        console.log(formData);
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
        } else {
            toaster.push(
                <Notification type={"error"} header="Success!" closable>
                    Some fields are empty!
                </Notification>, 'topEnd'
            );
        }
    };

    const changeHandle = (type, data) => {
        setUserInfo({
            ...userInfo,
            [type]: data
        })
    }
    const saveChanges = () => {
        let body = {
            detail: {}
        }

        let formdata = new FormData();
        let data = buildFormData(formdata, body);

    }
    return (
        <div>
            <div className='teammer-profile-edit'>
                <BreadCrumb/>
                <Banner
                    styles={{marginBottom: '2.5rem'}}
                />
                <div className="profile-wrapper">
                    <div className="left-side">
                        <ul className="profile-edit-nav">
                            <li className='active'>
                                <Link href="/teammer/profile/edit">
                                    <a>
                                        <MdModeEdit/>
                                        <span>Edit Profile</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/teammer/profile/settings">
                                    <a>
                                        <RiSettingsLine/>
                                        <span>Account Settings</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/teammer/profile/subscription">
                                    <a>
                                        <MdOutlineWorkOutline/>
                                        <span>Manage Subscription</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/teammer/profile/blocked-users">
                                    <a>
                                        <FaRegTimesCircle/>
                                        <span>Blocked Users</span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="content">
                        <div className="page-header">
                            <div className="profile-title">
                                <Avatar
                                    size="lg"
                                    circle
                                    src={props.userData?.detail?.photo ? props.userData.detail.photo : "https://www.w3schools.com/howto/img_avatar.png"}
                                    alt="username surname"
                                />
                                <div className="profile-title-content">
                                    <h4>{props.userData?.full_name}</h4>
                                    <span>Edit Profile</span>
                                </div>
                            </div>
                            <Button
                                color="blue"
                                appearance="primary"
                                className='save-btn'
                                onClick={saveChanges}
                            >
                                Save Changes
                            </Button>
                        </div>
                        <div className="user-info-wrapper">
                            <div className="change-avatar-side">
                                <div className="side_title">
                                    <span>User Information</span>
                                </div>
                                <div className="user-avatar-wrapper">
                                    <Avatar
                                        size="lg"
                                        circle
                                        src={userInfo.photo ? userInfo.photo : "https://www.w3schools.com/howto/img_avatar.png"}
                                        alt="username surname"
                                    />
                                </div>
                                <Button
                                    color="blue"
                                    appearance="primary"
                                    className="btn-custom-outline change-avatar-btn"
                                >
                                    Upload New Photo
                                </Button>
                            </div>
                            <div className="user-info-form-wrapper">
                                <Form className="row">
                                    <div className="col-md-12 mb-4">
                                        <Form.Group controlId="name">
                                            <Form.ControlLabel>Fullname</Form.ControlLabel>
                                            <Form.Control
                                                name="name"
                                                placeholder="Enter your fullname"
                                                value={props.userData?.full_name}
                                                onChange={(e) => {
                                                    changeHandle('full_name', e)
                                                }}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-8 mb-4">
                                        <Form.Group controlId="position">
                                            <Form.ControlLabel>Position</Form.ControlLabel>
                                            <InputPicker
                                                size="md"
                                                className="w-100"
                                                placeholder="Position"
                                                data={props.positionList}
                                                onChange={(e) => {
                                                    if (e && !userInfo.positions.some(i => i.id === e)) {
                                                        let element = props.positionList.find(item => item.value === e);
                                                        let newElement = {
                                                            id: element.value,
                                                            name: element.label
                                                        }
                                                        setUserInfo({
                                                            ...userInfo,
                                                            positions: [...userInfo.positions, newElement]
                                                        })
                                                    }
                                                }}
                                            />
                                            {
                                                userInfo.positions.length > 0 && userInfo.positions.map((item, index) => {
                                                    return <Tag
                                                        key={index}
                                                        closable
                                                        className="custom-tag mt-2"
                                                        onClose={() => {
                                                            let data = userInfo.positions.filter(i => i.id !== item.id);
                                                            setUserInfo({...userInfo, positions: data});
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Tag>
                                                })
                                            }
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-4 mb-4">
                                        <Form.Group controlId="experience">
                                            <Form.ControlLabel>Years of experience</Form.ControlLabel>
                                            <Form.Control name="experience" placeholder="Year"
                                                          onChange={(e) => {
                                                              changeHandle('year_of_experience', e)
                                                          }}
                                                          value={userInfo.year_of_experience} type="number"/>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <Form.Group controlId="position">
                                            <Form.ControlLabel>Skills</Form.ControlLabel>
                                            <InputPicker
                                                size="md"
                                                className="w-100"
                                                placeholder="Skills"
                                                data={props.skillList}
                                                onChange={(e) => {
                                                    if (e && !userInfo.skills.some(i => i.id === e)) {
                                                        let element = props.skillList.find(item => item.value === e);
                                                        let newElement = {
                                                            id: element.value,
                                                            name: element.label
                                                        }
                                                        setUserInfo({
                                                            ...userInfo,
                                                            skills: [...userInfo.skills, newElement]
                                                        })
                                                    }
                                                }}
                                            />
                                            {
                                                userInfo.skills.length > 0 && userInfo.skills.map((item, index) => {
                                                    return <Tag
                                                        key={index}
                                                        closable
                                                        className="custom-tag mt-2"
                                                        onClose={() => {
                                                            let data = userInfo.skills.filter(i => i.id !== item.id);
                                                            setUserInfo({...userInfo, skills: data});
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Tag>
                                                })
                                            }
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <Form.Group controlId="location">
                                            <Form.ControlLabel>Location</Form.ControlLabel>
                                            <InputPicker
                                                size="md"
                                                className="w-100"
                                                placeholder="Location"
                                                value={userInfo.location}
                                                data={props.locationList}
                                                onChange={(e) => {
                                                    changeHandle('location', e)
                                                }}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <Form.Group controlId="about">
                                            <Form.ControlLabel>Textarea</Form.ControlLabel>
                                            {/* <Form.Control rows={5} name="about" accepter={Textarea} /> */}
                                            <Input onChange={(e) => {
                                                console.log(e)
                                                changeHandle('description', e)
                                            }} as="textarea" rows={3} value={userInfo.description}
                                                   placeholder="Textarea"/>
                                        </Form.Group>
                                    </div>
                                </Form>
                            </div>
                        </div>
                        <CardTeammerPortfolio
                            title="CV"
                            editMode={true}
                            classNames="mb-3"
                            portfolioUrlList={portfolioUrlList}
                            setPortfolioUrlList={setPortfolioUrlList}
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
                                title: "Add Work Experience",
                                formData: formData,
                                setFormData: setFormData,
                                positionsList: props.positionList,
                                locationList: props.locationList,
                            }}
                        />
                        <div className="delete-account-wrapper">
                            <Button
                                color="blue"
                                appearance="primary"
                                className="btn-custom-outline btn-danger delete-account-btn"
                            >
                                <div>
                                    <Image
                                        src={'/icons/trash_red.svg'}
                                        alt='alt'
                                        layout={'fixed'}
                                        width={16}
                                        height={16}
                                    />
                                    Delete Account
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

EditComponent.layout = true;

export default EditComponent;

export const getServerSideProps = async (context) => {
    const auth = getAuth(context);
    if (auth !== "2") {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    const fetchPositions = await fetch(config.BASE_URL + "positions");
    const positionsData = await fetchPositions.json();

    const fetchUserInfo = await getFetchData("auth/user?include=skills,positions,experiences,detail.location", getToken(context));

    const fetchSkills = await fetch(config.BASE_URL + "skills");
    const skillsData = await fetchSkills.json();

    const fetchLocations = await fetch(config.BASE_URL + "locations");
    const locationData = await fetchLocations.json();

    return {
        props: {
            userData: fetchUserInfo?.data,
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
};