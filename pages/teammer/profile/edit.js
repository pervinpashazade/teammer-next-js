import React, { useRef, useState } from 'react';
import Link from 'next/link';
import BreadCrumb from '../../../src/components/Lib/BreadCrumb';
import Banner from '../../../src/components/Lib/Banner';
import { MdModeEdit, MdOutlineWorkOutline } from 'react-icons/md';
import { RiSettingsLine } from 'react-icons/ri';
import { FaRegTimesCircle } from 'react-icons/fa';
import { Avatar, Button, Form, Input, InputPicker, Notification, Tag, toaster } from 'rsuite';
import CardTeammerPortfolio from '../../../src/components/Profile/CardTeammerPortfolio';
import CardTeammerWorkExperience from '../../../src/components/Profile/CardTeammerWorkExperience';
import Image from 'next/image';
import { Cookie, withCookie } from 'next-cookie';
import { buildFormData } from '../../../src/helpers/buildFormData';
import config from '../../../src/configuration';
import { getFetchData } from '../../../lib/fetchData';
import getAuth, { getToken } from '../../../lib/session';
import { useAuth } from "../../../Auth";
import axios from 'axios';
import { getCookie } from '../../../src/helpers/cookie';

// const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const EditComponent = (props) => {

    //
    const authContext = useAuth();

    console.log(authContext?.currentUser);

    const [teammer, setTeammer] = useState({
        avatarFile: null,
        avatarUrl: null,
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

        await axios.get(config.BASE_URL + 'positions').then(res => {
            if (res.data.success) {
                positionList = res.data.data.items;
            };
        });
        await axios.get(config.BASE_URL + 'project/roles').then(res => {
            if (res.data.success) {
                roleList = res.data.data;
            };
        });
        await axios.get(config.BASE_URL + 'project/types').then(res => {
            if (res.data.success) {
                projectTypeList = res.data.data;
            };
        });
        await axios.get(config.BASE_URL + 'locations').then(res => {
            if (res.data.success) {
                locationList = res.data.data.items;
            };
        });
        await axios.get(config.BASE_URL + 'job/types').then(res => {
            if (res.data.success) {
                jobTypeList = res.data.data;
            };
        });
        await axios.get(config.BASE_URL + 'job/payment_types').then(res => {
            if (res.data.success) {
                paymentTypeList = res.data.data;
            };
        });
        await axios.get(config.BASE_URL + 'skills').then(res => {
            if (res.data.success) {
                skillList = res.data.data.items;
            };
        });
        await axios.get(config.BASE_URL + 'experience-levels').then(res => {
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

    React.useEffect(() => {
        getPublicDatas();
    }, []);

    React.useEffect(() => {
        if (authContext.currentUser) {
            setTeammer({
                avatarUrl: authContext.currentUser.detail.photo,
                username: authContext.currentUser.username,
                full_name: authContext.currentUser.full_name,
                location: authContext.currentUser.detail.location,
                positions: authContext.currentUser.positions,
                experienceLevel: authContext.currentUser.detail.experience_level,
                skillList: authContext.currentUser.skills,
                socialDatas: authContext.currentUser.detail.social_accounts,
                portfolioList: authContext.currentUser.detail.portfolio,
                about: authContext.currentUser.detail.about,
                experience: authContext.currentUser.detail.years_of_experience,
                workExperienceList: authContext.currentUser.experiences,
            });
        };
    }, [authContext.currentUser]);

    React.useEffect(() => {
        console.log('EDIT V2 TEAMMER =>', teammer);
    }, [teammer]);

    //

    const [userData, setUserData] = useState(props.userData);

    const [userInfo, setUserInfo] = useState({
        full_name: userData?.full_name && userData?.full_name,
        positions: userData?.positions && userData?.positions,
        year_of_experience: userData?.detail?.years_of_experience && userData?.detail?.years_of_experience,
        skills: userData?.skills && userData?.skills,
        location: userData?.detail?.location && userData?.detail?.location.id,
        description: userData?.detail?.about && userData?.detail?.about,
        cv: userData?.detail?.cv && userData?.detail?.cv,
        portfolio: userData?.detail?.portfolio && userData?.detail?.portfolio,
        photo: userData?.detail?.photo && userData?.detail?.photo,
        experiences: userData?.experiences && userData?.experiences,
        experience_level: userData?.detail?.experience_level.id && userData?.detail?.experience_level.id
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
    });

    const [selectedPositions, setSelectedPositions] = useState([]);

    const [selectedSkills, setSelectedSkills] = useState([]);

    const [portfolioUrlList, setPortfolioUrlList] = useState({
        cvFileName: props.userData?.detail?.cv,
        cv: '',
        portfolio: props.userData?.detail?.portfolio
    });

    const [image, setImage] = useState({});
    const photoRef = useRef();
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);

    const getData = async () => {
        const fetchUserInfo = await getFetchData("auth/user?include=skills,positions,experiences,detail.location", props.token);
        setUserInfo({
            ...userInfo,
            experiences: fetchUserInfo.data.experiences
        });
    };

    const editModal = (id) => {
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

    const toggle = () => {
        setIsOpenCreateModal(!isOpenCreateModal);
    };

    const toggleEditModal = async () => {
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
        };
    };

    const toggleCreateModal = async () => {
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

    const handleChangeInput = (type, value) => {
        // setUserInfo({
        //     ...userInfo,
        //     [type]: data
        // });

        setTeammer(prevState => {
            return {
                ...prevState,
                [type]: value
            };
        });
    };

    // const uploadFile = (event) => {
    //     console.log(event)
    //     if (event.target.files) {
    //         let file_extension = event.target.files[0].type.split("/").pop();
    //         if (file_extension === "png" || file_extension === "jpg") {
    //             setUserInfo({
    //                 ...userInfo,
    //                 photo: URL.createObjectURL(event.target.files[0])
    //             });
    //             setImage(event.target.files[0])
    //         } else {
    //             toaster.push(
    //                 <Notification type={"error"} header="Success!" closable>
    //                     You did'nt upload photo , please select only .jpg and .png images
    //                 </Notification>, 'topEnd'
    //             );
    //         }
    //     }
    // };

    const uploadFile = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            if (i.type === "image/jpeg" || i.type === "image/png") {
                setTeammer(prevState => {
                    return {
                        ...prevState,
                        avatarFile: i,
                        avatarUrl: URL.createObjectURL(i)
                    };
                });
            } else {
                alert('Please select only .jpg and .png images');
            };
        };
    };

    const saveChanges = async () => {
        let body = {
            full_name: teammer.full_name,
            detail: {
                experience_level_id: teammer.experienceLevel?.id,
                location_id: teammer.location?.id,
                about: teammer.about,
                years_of_experience: teammer.experience,
            },
            positions: teammer.positions.map(item => item.id),
            skills: teammer.skillList.map(item => item.id),
            experiences: teammer.workExperienceList.map(item => {
                return {
                    company: item.company,
                    start_date: item.start_date,
                    end_date: item.end_date
                }
            }),
        };

        console.log('EDIT BODY', body);

        // if (userInfo.cv !== portfolioUrlList.cvFileName) {
        //     body['cv'] = portfolioUrlList.cv;
        //     body.photo = image;
        //     let formdata = new FormData();
        //     let data = buildFormData(formdata, body);
        //     let response = await fetch(config.BASE_URL + "users",
        //         {
        //             method: 'PUT',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Authorization': 'Bearer ' + props.token
        //             },
        //             body: JSON.stringify(data)
        //         })
        //     let res = await response.json();
        //     console.log(res)
        // } else {
        //     body['cv'] = userInfo.cv;
        //     body.photo = userInfo.photo;
        //     let formdata = new FormData();
        //     let data = buildFormData(formdata, body);
        //     let response = await fetch(config.BASE_URL + "users",
        //         {
        //             method: 'PUT',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Authorization': 'Bearer ' + props.token
        //             },
        //             body: JSON.stringify(data)
        //         })
        //     let res = await response.json();
        //     console.log(res)

        // }

            let formdata = new FormData();
            let data = buildFormData(formdata, body);

        axios.put(config.BASE_URL + 'users', data, {
            headers: {
                'Authorization': 'Bearer ' + getCookie('teammers-access-token')
            }
        }).then(res => {
            console.log('edit res', res);
        });
    };

    return (
        <div>
            <div className='teammer-profile-edit'>
                <BreadCrumb />
                <Banner
                    styles={{ marginBottom: '2.5rem' }}
                />
                <div className="profile-wrapper">
                    <div className="left-side">
                        <ul className="profile-edit-nav">
                            <li className='active'>
                                <Link href="/teammer/profile/edit">
                                    <a>
                                        <MdModeEdit />
                                        <span>Edit Profile</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/teammer/profile/settings">
                                    <a>
                                        <RiSettingsLine />
                                        <span>Account Settings</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/teammer/profile/subscription">
                                    <a>
                                        <MdOutlineWorkOutline />
                                        <span>Manage Subscription</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/teammer/profile/blocked-users">
                                    <a>
                                        <FaRegTimesCircle />
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
                                    circle
                                    size="lg"
                                    src={teammer.avatarUrl ? teammer.avatarUrl : "/img/upload_image.png"}
                                    alt={teammer.username}
                                />
                                <div className="profile-title-content">
                                    <h4>{teammer.full_name}</h4>
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
                                        circle
                                        size="lg"
                                        src={teammer.avatarUrl ? teammer.avatarUrl : "/img/upload_image.png"}
                                        alt={teammer.username}
                                    />
                                </div>
                                <input
                                    type="file"
                                    onChange={uploadFile}
                                    ref={photoRef}
                                    className="d-none"
                                />
                                <Button
                                    color="blue"
                                    appearance="primary"
                                    className="btn-custom-outline change-avatar-btn"
                                    onClick={() => photoRef.current.click()}
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
                                                value={teammer.full_name}
                                                onChange={(e) => {
                                                    handleChangeInput('full_name', e)
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
                                                data={publicDatas.positionList}
                                                valueKey="id"
                                                labelKey='name'
                                                onSelect={(e, obj) => {
                                                    if (e && !teammer.positions.some(item => item.id === e)) {
                                                        setTeammer(prevState => {
                                                            return {
                                                                ...prevState,
                                                                positions: [
                                                                    ...prevState.positions,
                                                                    obj
                                                                ]
                                                            };
                                                        });
                                                    };
                                                }}
                                            />
                                            {
                                                teammer.positions?.length > 0 && teammer.positions.map((item, index) => {
                                                    return <Tag
                                                        closable
                                                        key={index}
                                                        className="close-tag my-2"
                                                        onClose={() => {
                                                            let data = teammer.positions.filter(x => x.id !== item.id);
                                                            setTeammer(prevState => {
                                                                return {
                                                                    ...prevState,
                                                                    positions: data
                                                                };
                                                            });
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
                                            <Form.Control
                                                type="number"
                                                name="experience"
                                                placeholder="Year"
                                                value={teammer.experience}
                                                onChange={(e) => handleChangeInput('experience', e)}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <Form.Group controlId="position">
                                            <Form.ControlLabel>Skills</Form.ControlLabel>
                                            <InputPicker
                                                size="md"
                                                className="w-100"
                                                placeholder="Skills"
                                                data={publicDatas.skillList}
                                                valueKey="id"
                                                labelKey='name'
                                                onSelect={(e, obj) => {
                                                    if (e && !teammer.skillList.some(item => item.id === e)) {
                                                        setTeammer(prevState => {
                                                            return {
                                                                ...prevState,
                                                                skillList: [
                                                                    ...prevState.skillList,
                                                                    obj
                                                                ]
                                                            };
                                                        });
                                                    };
                                                }}
                                            />
                                            {
                                                teammer.skillList?.length > 0 && teammer.skillList.map((item, index) => {
                                                    return <Tag
                                                        closable
                                                        key={index}
                                                        className="close-tag my-2"
                                                        onClose={() => {
                                                            let data = teammer.skillList.filter(x => x.id !== item.id);
                                                            setTeammer(prevState => {
                                                                return {
                                                                    ...prevState,
                                                                    skillList: data
                                                                };
                                                            });
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
                                            <Form.ControlLabel>Experience</Form.ControlLabel>
                                            <InputPicker
                                                size="md"
                                                className="w-100"
                                                placeholder="Experience"
                                                value={teammer.experienceLevel?.id}
                                                data={publicDatas.experienceLevelList}
                                                valueKey="id"
                                                labelKey='name'
                                                onSelect={(id, obj) => {
                                                    handleChangeInput('experienceLevel', obj)
                                                }}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <Form.Group controlId="location">
                                            <Form.ControlLabel>Location</Form.ControlLabel>
                                            <InputPicker
                                                size="md"
                                                className="w-100"
                                                placeholder="Location"
                                                value={teammer.location?.id}
                                                data={publicDatas.locationList}
                                                valueKey="id"
                                                labelKey='name'
                                                onSelect={(id, obj) => {
                                                    handleChangeInput('location', obj)
                                                }}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <Form.Group controlId="about">
                                            <Form.ControlLabel>Textarea</Form.ControlLabel>
                                            <Input
                                                as="textarea"
                                                rows={3}
                                                placeholder="Textarea"
                                                value={teammer.about}
                                                onChange={(e) => {
                                                    handleChangeInput('about', e)
                                                }}
                                            />
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
    // if (auth !== "2") {
    //     return {
    //         redirect: {
    //             destination: "/",
    //             permanent: false,
    //         },
    //     };
    // }

    const fetchUserInfo = await getFetchData("auth/user?include=skills,positions,experiences,detail.location", getToken(context));

    return {
        props: {
            userData: fetchUserInfo?.data,
        }
    }
};