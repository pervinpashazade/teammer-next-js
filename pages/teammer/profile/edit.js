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

const EditComponent = (props) => {

    //
    const authContext = useAuth();

    const [validationErrors, setValidationErrors] = useState([]);

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
    }, []);

    //

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const photoRef = useRef();

    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);

    const toggleCreateModal = () => {
        setIsOpenCreateModal(!isOpenCreateModal);
    };

    const toggleEditModal = () => {
        setIsOpenEditModal(!isOpenEditModal);
    };

    // const toggleEditModal = async () => {
    //     if (formData.position
    //         && formData.company
    //         && formData.location
    //         && formData.start_month
    //         && formData.start_year) {
    //         let data = {
    //             location_id: formData.location,
    //             position_id: formData.position,
    //             company: formData.company,
    //             start_date: `${formData.start_month < 10 ? '0' + formData.start_month : formData.start_month}-${formData.start_year}`,
    //             // end_date: `${formData.end_month < 10 ? '0' + formData.end_month : formData.end_month}-${formData.end_year}`
    //             // current: formData.current
    //         }
    //         if (formData.current) {
    //             data.end_date = ""
    //             // data.current = true;
    //         } else {
    //             data.end_date = `${formData.end_month < 10 ? '0' + formData.end_month : formData.end_month}-${formData.end_year}`
    //         }
    //         let response = await fetch(config.BASE_URL + "experiences/" + formData.id, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Bearer ' + getCookie('teammers-access-token')
    //             },
    //             body: JSON.stringify(data)
    //         })
    //         let res = await response.json();
    //         console.log(res)
    //         if (res.success) {
    //             getData();
    //             setFormData({
    //                 id: '',
    //                 position: '',
    //                 company: '',
    //                 location: '',
    //                 start_month: '',
    //                 start_year: '',
    //                 end_month: '',
    //                 end_year: '',
    //                 current: false
    //             })
    //             toaster.push(
    //                 <Notification type={"success"} header="Success!" closable>
    //                     Work experience updated!
    //                 </Notification>, 'topEnd'
    //             );
    //             setIsOpenCreateModal(!isOpenCreateModal);
    //         }
    //     } else {
    //         toaster.push(
    //             <Notification type={"error"} header="Success!" closable>
    //                 Some fields are empty!
    //             </Notification>, 'topEnd'
    //         );
    //     };
    // };

    // const toggleCreateModal = async () => {
    //     if (formData.position
    //         && formData.company
    //         && formData.location
    //         && formData.start_month
    //         && formData.start_year) {
    //         let data = {
    //             location_id: formData.location,
    //             position_id: formData.position,
    //             company: formData.company,
    //             start_date: `${formData.start_month < 10 ? '0' + formData.start_month : formData.start_month}-${formData.start_year}`,
    //             end_date: `${formData.end_month < 10 ? '0' + formData.end_month : formData.end_month}-${formData.end_year}`
    //             // current: formData.current
    //         }
    //         // if (formData.current) {
    //         //     data.end_date = ""
    //         //     data.current = true;
    //         // } else {
    //         //     data.end_date = `${formData.end_month < 10 ? '0' + formData.end_month : formData.end_month}-${formData.end_year}`
    //         // }
    //         let response = await fetch(config.BASE_URL + "experiences", {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Bearer ' + props.token
    //             },
    //             body: JSON.stringify(data)
    //         })
    //         let res = await response.json()
    //         if (res.success) {
    //             getData();
    //             setFormData({
    //                 position: '',
    //                 company: '',
    //                 location: '',
    //                 start_month: '',
    //                 start_year: '',
    //                 end_month: '',
    //                 end_year: '',
    //                 current: false
    //             })
    //             toaster.push(
    //                 <Notification type={"success"} header="Success!" closable>
    //                     New work experience added!
    //                 </Notification>, 'topEnd'
    //             );
    //             setIsOpenCreateModal(!isOpenCreateModal);
    //         }
    //     } else {
    //         toaster.push(
    //             <Notification type={"error"} header="Success!" closable>
    //                 Some fields are empty!
    //             </Notification>, 'topEnd'
    //         );
    //     }
    // };

    const handleChangeInput = (type, value) => {
        setTeammer(prevState => {
            return {
                ...prevState,
                [type]: value
            };
        });
    };

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

    const validateForm = () => {
        if (!teammer) return false;

        let validationErrors = [];

        if (!teammer.full_name || !teammer.full_name.trim()) {
            validationErrors.push({
                key: 'full_name',
                message: 'Fullname field is required'
            });
        } else if (teammer.full_name.length < 3) {
            validationErrors.push({
                key: 'full_name',
                message: 'Fullname must be at least 3 characters'
            });
        };
        if (!teammer.positions || !teammer.positions.length) {
            validationErrors.push({
                key: 'positions',
                message: 'You must add at least 1 position'
            });
        };
        if (!teammer.experience) {
            validationErrors.push({
                key: 'experience',
                message: 'Years of experience field is required'
            });
        } else if (teammer.experience < 0 || teammer.experience > 50) {
            validationErrors.push({
                key: 'experience',
                message: 'Years of experience is not valid'
            });
        };
        if (!teammer.skillList || !teammer.skillList.length) {
            validationErrors.push({
                key: 'skillList',
                message: 'You must add at least 1 skill'
            });
        };
        if (!teammer.experienceLevel?.id) {
            validationErrors.push({
                key: 'experienceLevel',
                message: 'Experience level field is required'
            });
        };
        if (!teammer.location?.id) {
            validationErrors.push({
                key: 'location',
                message: 'Location field is required'
            });
        };

        setValidationErrors(validationErrors);

        if (validationErrors.length) {
            return false;
        } else {
            return true;
        };
    };

    const saveChanges = async () => {

        const isValid = validateForm();

        if (!isValid) return;

        let body = {
            full_name: teammer.full_name,
            detail: {
                experience_level_id: teammer.experienceLevel?.id,
                location_id: teammer.location?.id,
                about: teammer.about,
                years_of_experience: teammer.experience,
                portfolio: teammer.portfolioList,
            },
            positions: teammer.positions.map(item => item.id),
            skills: teammer.skillList.map(item => item.id),
            experiences: teammer.workExperienceList.map(item => {
                return {
                    company: item.company,
                    start_date: item.start_date,
                    end_date: item.end_date,
                    location_id: item.location_id,
                    position_id: item.position_id,
                }
            }),
        };

        if (teammer.avatarFile) {
            body.photo = teammer.avatarFile
        };

        if (teammer.avatarFile) {
            body.photo = teammer.avatarFile;
        };
        // if (teammer.cvFile) {
        //     body.cv = teammer.cvFile;
        // };

        // console.log('EDIT BODY', body);

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

        if (teammer.avatarFile || teammer.cvFile) {
            body['_method'] = 'PUT';
            let formdata = new FormData();
            let data = buildFormData(formdata, body);
            axios.post(config.BASE_URL + 'users', data, {
                headers: {
                    'Authorization': 'Bearer ' + getCookie('teammers-access-token')
                }
            }).then(res => {
                console.log('edit res', res);
                if (res.data.success) {
                    setShowSuccessAlert(true);
                };
            });
        } else {
            axios.put(config.BASE_URL + 'users', body, {
                headers: {
                    'Authorization': 'Bearer ' + getCookie('teammers-access-token')
                }
            }).then(res => {
                console.log('edit res', res);
                if (res.data.success) {
                    setShowSuccessAlert(true);
                };
            });
        };
    };

    const setTeammerPortfolio = (list) => {
        setTeammer(prevState => {
            return {
                ...prevState,
                portfolioList: list
            }
        });
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

        axios.post(config.BASE_URL + "experiences", body, {
            headers: {
                'Authorization': 'Bearer ' + getCookie('teammers-access-token')
            }
        }).then(res => {
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
                                    {
                                        authContext?.currentUser &&
                                        <h4>{authContext.currentUser?.full_name}</h4>
                                    }
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
                        {
                            showSuccessAlert &&
                            <div className="w-100">
                                <div className="alert alert-success">
                                    User information successfully edited.
                                </div>
                            </div>
                        }
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
                                            <div className="validation-errors">
                                                {
                                                    validationErrors.map((item, index) => {
                                                        if (item.key === "full_name") {
                                                            return <span key={index}>{item.message}</span>
                                                        };
                                                    })
                                                }
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-8">
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
                                    <div className="col-md-4">
                                        <Form.Group controlId="experience">
                                            <Form.ControlLabel>Years of experience</Form.ControlLabel>
                                            <Form.Control
                                                type="number"
                                                min={0}
                                                max={50}
                                                name="experience"
                                                placeholder="Year"
                                                value={teammer.experience}
                                                onChange={(e) => handleChangeInput('experience', e)}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <div className="validation-errors">
                                            {
                                                validationErrors.map((item, index) => {
                                                    if (item.key === "positions") {
                                                        return <span key={index}>{item.message}</span>
                                                    };
                                                })
                                            }
                                            {
                                                validationErrors.map((item, index) => {
                                                    if (item.key === "experience") {
                                                        return <span key={index}>{item.message}</span>
                                                    };
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <Form.Group controlId="Skills">
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
                                            <div className="validation-errors">
                                                {
                                                    validationErrors.map((item, index) => {
                                                        if (item.key === "skillList") {
                                                            return <span key={index}>{item.message}</span>
                                                        };
                                                    })
                                                }
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <Form.Group controlId="experienceLevel">
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
                                            <div className="validation-errors">
                                                {
                                                    validationErrors.map((item, index) => {
                                                        if (item.key === "experienceLevel") {
                                                            return <span key={index}>{item.message}</span>
                                                        };
                                                    })
                                                }
                                            </div>
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
                                            <div className="validation-errors">
                                                {
                                                    validationErrors.map((item, index) => {
                                                        if (item.key === "location") {
                                                            return <span key={index}>{item.message}</span>
                                                        };
                                                    })
                                                }
                                            </div>
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
                                            <div className="validation-errors">
                                                {
                                                    validationErrors.map((item, index) => {
                                                        if (item.key === "about") {
                                                            return <span key={index}>{item.message}</span>
                                                        };
                                                    })
                                                }
                                            </div>
                                        </Form.Group>
                                    </div>
                                </Form>
                            </div>
                        </div>
                        <CardTeammerPortfolio
                            title="CV"
                            editMode={true}
                            classNames="mb-3"
                            cvUrl={teammer.cvUrl}
                            full_name={teammer.full_name}
                            portfolioUrlList={teammer.portfolioList}
                            setPortfolioUrlList={setTeammerPortfolio}
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
            </div >
        </div >
    )
};

EditComponent.layout = true;

export default EditComponent;

// export const getServerSideProps = async (context) => {
//     // const auth = getAuth(context);
//     // if (auth !== "2") {
//     //     return {
//     //         redirect: {
//     //             destination: "/",
//     //             permanent: false,
//     //         },
//     //     };
//     // }

//     // const fetchUserInfo = await getFetchData(
//     //     "auth/user?include=skills,positions,experiences,detail.location",
//     //     getToken(context)
//     // );

//     // return {
//     //     props: {
//     //         userData: fetchUserInfo?.data,
//     //     }
//     // }
// };