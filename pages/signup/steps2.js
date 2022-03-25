import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../src/components/consts/NotAuth/Header';
import {
    Button,
    ButtonToolbar,
    Divider,
    Form,
    Input,
    InputPicker,
    Notification,
    Radio,
    RadioGroup,
    Steps,
    Tag,
    toaster,
    Uploader
} from 'rsuite';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdModeEditOutline } from 'react-icons/md';
import { BsPlusLg } from 'react-icons/bs';
import { FaRegTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import config, { months } from '../../src/configuration';

const steps2 = (props) => {

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

    const editorRef = useRef();
    const [isEditorLoaded, setIsEditorLoaded] = useState(false);
    const { CKEditor, ClassicEditor } = editorRef.current || {};

    // const handleChangeEditor = (data) => {
    //     setEditorText(data);
    // };

    // mount
    useEffect(() => {
        getPublicDatas();

        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
        };
        setIsEditorLoaded(true);

        // window.onbeforeunload = function (e) {
        //     // if (true) {
        //     //     return;
        //     // }
        //     var dialogText = 'Dialog text here';
        //     e.returnValue = dialogText;
        //     return dialogText;
        // };
    }, []);

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

        let yearArr = [];
        let nowDate = (new Date()).getFullYear();
        for (let i = 2000; i <= nowDate; i++) {
            yearArr.push({
                label: `${i}`,
                value: i
            });
        }

        setPublicDatas({
            positionList: positionList,
            roleList: roleList,
            projectTypeList: projectTypeList,
            locationList: locationList,
            jobTypeList: jobTypeList,
            paymentTypeList: paymentTypeList,
            skillList: skillList,
            experienceLevelList: experienceLevelList,
            years: yearArr,
        });
    };

    const [currentStep, setCurrentStep] = useState(4);

    const [selectedUserType, setSelectedUserType] = useState("2");

    const [owner, setOwner] = useState({
        avatarFile: null,
        avatarUrl: null,
        full_name: null,
        username: null,
        role: null,
    });

    const [startup, setStartup] = useState({
        avatarFile: null,
        avatarUrl: null,
        title: null,
        description: null,
        type: null,
        jobList: []
    });

    const [selectedJob, setSelectedJob] = useState({
        uid: null,
        position: null,
        location: null,
        type: null,
        payment: null,
        salary: null,
        period: null,
        experienceLevel: null,
        skillList: [],
        description: null,
    });

    const ownerImgRef = useRef();
    const startupLogoRef = useRef();

    const [teammer, setTeammer] = useState({
        avatarFile: null,
        avatarUrl: null,
        username: null,
        full_name: null,
        location: null,
        positions: [],
        experienceLevel: null,
        skillList: [],
        socialDatas: {},
    });

    const [workExperienceList, setWorkExperienceList] = useState([]);
    const [selectedWorkExp, setSelectedWorkExp] = useState({
        uid: null,
        position: null,
        companyName: '',
        location: null,
        start_month: null,
        start_year: null,
        end_month: null,
        endt_year: null,
    });

    const addMoreExperience = () => {
        alert('add')
    };

    // not working use ref
    const resetUserDatas = () => {
        setOwner({
            avatarFile: null,
            avatarUrl: null,
            full_name: null,
            username: null,
            role: null,
        });
        setTeammer({
            avatarFile: null,
            avatarUrl: null,
            username: null,
            full_name: null,
            location: null,
        });
    };

    const [teammerStepValidations, setTeammerStepValidations] = useState({
        step_1: [],
    });
    const [ownerStepValidations, setOwnerStepValidations] = useState({
        step_1: [],
    });

    const handleChangeStep = () => {
        if (!selectedUserType) setCurrentStep(0);

        // owner
        if (selectedUserType === "1") {
            switch (currentStep) {
                case 0:
                    if (currentStep >= 0 && currentStep <= 4) {

                    };
                    break;

                default:
                    break;
            }
        };
        // teammer
        if (selectedUserType === "2") {

        };

        return true // false;
    };

    const goNextStep = () => {

        const isValid = handleChangeStep();

        // 6 => max step count !!!
        if (isValid && currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const editStep = step => {
        setCurrentStep(step);
    };

    const renderFirstStep = () => {
        return (
            <div>
                <RadioGroup name="list" value={selectedUserType}>
                    <Radio
                        value="1"
                        onChange={value => {
                            resetUserDatas();
                            setSelectedUserType(value);
                        }}
                    >
                        I want to find teammates
                    </Radio>
                    <Radio
                        value="2"
                        onChange={value => {
                            resetUserDatas();
                            setSelectedUserType(value);
                        }}
                    >
                        I want to find startup team
                    </Radio>
                </RadioGroup>
                <div className="navigation-btn-wrapper">
                    <Button
                        className="btn-next-step"
                        disabled={!selectedUserType}
                        onClick={() => {
                            if (selectedUserType) {
                                setCurrentStep(1);
                            };
                        }}
                    >
                        Next
                    </Button>
                </div>
            </div>
        )
    };

    const uploadFile = (event, type) => {
        // console.log(event.target.files)
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            // setImage({
            //     ...image,
            //     [type]: i
            // });

            if (type === 'owner-avatar') {
                setOwner(prevState => {
                    return {
                        ...prevState,
                        avatarFile: i,
                        avatarUrl: URL.createObjectURL(i)
                    };
                });
            };
            if (type === 'startup-logo') {
                setStartup(prevState => {
                    return {
                        ...prevState,
                        avatarFile: i,
                        avatarUrl: URL.createObjectURL(i)
                    };
                });
            };
            if (type === 'teammer-avatar') {
                setTeammer(prevState => {
                    return {
                        ...prevState,
                        avatarFile: i,
                        avatarUrl: URL.createObjectURL(i)
                    };
                });
            };

            // setCreateObjectURL({
            //     ...createObjectURL,
            //     [type]: URL.createObjectURL(i)
            // });
        }
    };

    const getSocialDatas = (e) => {
        let formData = new FormData(e.target);

        let data = {};

        for (let [key, value] of formData.entries()) {
            data[key] = value;
        };

        return data;
    };

    const confirm_step_3 = (socialDatas) => {
        const socialData = getSocialDatas(socialDatas);

        setTeammer(prevState => {
            return {
                ...prevState,
                socialDatas: socialData
            };
        });

        setCurrentStep(3);
    };

    useEffect(() => {
        // console.clear();

        console.log('TEAMMER STATE DATAS log : ', teammer);
    }, [teammer]);

    return (
        <div className="container">
            <div className="not-auth-layout steps">
                <Header />
                <div className="row">
                    <div className="col-md-6">
                        <div className="left">
                            <div className="bg-wrapper">
                                <div className="bg-icon-wrapper"></div>
                                <div className="title">
                                    <h2>Join your dream team in Minutes.</h2>
                                    <p>
                                        Connect with your future teammates from all over the world.
                                    </p>
                                </div>
                                <div className="bg-icon-wrapper"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="right">
                            <div className="inner">
                                <div className="wrapper">
                                    <div className="signup-steps-wrapper">
                                        <Steps
                                            current={currentStep}
                                            vertical
                                        >
                                            {/* STEP 1 */}
                                            <Steps.Item
                                                className='_step-item'
                                                title={
                                                    <>
                                                        Which one defines you?
                                                        {currentStep > 0 &&
                                                            <Button
                                                                className="btn-edit-step"
                                                                onClick={() => editStep(0)}
                                                            >
                                                                <AiOutlineEdit />
                                                            </Button>
                                                        }
                                                    </>
                                                }
                                                description={
                                                    selectedUserType && currentStep !== 0 ?
                                                        <div>
                                                            {
                                                                selectedUserType === "1" ?
                                                                    <p>I want to find teammates</p>
                                                                    :
                                                                    <p>I want to find startup team</p>
                                                            }
                                                        </div>
                                                        :
                                                        renderFirstStep()
                                                }
                                            />
                                            {/* STEP 2 */}
                                            <Steps.Item
                                                className='_step-item'
                                                title={
                                                    <>
                                                        Contact Information
                                                        {currentStep > 1 &&
                                                            <Button
                                                                className="btn-edit-step"
                                                                onClick={() => editStep(1)
                                                                }
                                                            >
                                                                <AiOutlineEdit />
                                                            </Button>
                                                        }
                                                    </>
                                                }
                                                description={
                                                    <div className="step-form">
                                                        {
                                                            (currentStep !== 0 && currentStep !== 1) ?
                                                                <div className='step-form-item-summary'>
                                                                    {
                                                                        selectedUserType === "1" &&
                                                                        <>
                                                                            <p>
                                                                                <span>Username</span>
                                                                                <span>{owner.username}</span>
                                                                            </p>
                                                                            <p>
                                                                                <span>Full Name</span>
                                                                                <span>{owner.full_name}</span>
                                                                            </p>
                                                                            <p>
                                                                                <span>Role in Startup</span>
                                                                                <span>
                                                                                    {
                                                                                        owner.role?.name
                                                                                    }
                                                                                </span>
                                                                            </p>
                                                                        </>
                                                                    }
                                                                    {
                                                                        selectedUserType === "2" &&
                                                                        <>
                                                                            <p>
                                                                                <span>Username</span>
                                                                                <span>{teammer.username}</span>
                                                                            </p>
                                                                            <p>
                                                                                <span>Full Name</span>
                                                                                <span>{teammer.full_name}</span>
                                                                            </p>
                                                                            <p>
                                                                                <span>Location</span>
                                                                                <span>
                                                                                    {
                                                                                        teammer.location?.name
                                                                                    }
                                                                                </span>
                                                                            </p>
                                                                        </>
                                                                    }
                                                                </div>
                                                                :
                                                                <Form>
                                                                    <Form.Group controlId="username">
                                                                        {
                                                                            selectedUserType === "1" &&
                                                                            <div className="upload-avatar-wrapper mb-4">
                                                                                <input
                                                                                    type="file"
                                                                                    name="myImage"
                                                                                    className="d-none"
                                                                                    ref={ownerImgRef}
                                                                                    onChange={(e) => uploadFile(e, 'owner-avatar')}
                                                                                />
                                                                                <div>
                                                                                    <Image
                                                                                        src={owner.avatarUrl ? owner.avatarUrl : '/img/upload_image.png'}
                                                                                        alt='icon'
                                                                                        width={64}
                                                                                        height={64}
                                                                                    />
                                                                                    <button
                                                                                        onClick={() => {
                                                                                            ownerImgRef.current.click()
                                                                                        }}
                                                                                    >
                                                                                        Upload New Photo
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        }
                                                                        <Form.ControlLabel>Username</Form.ControlLabel>
                                                                        <Form.Control
                                                                            type="text"
                                                                            name="username"
                                                                            placeholder="Username"
                                                                            value={
                                                                                selectedUserType === "2" ?
                                                                                    teammer.username
                                                                                    :
                                                                                    owner.username
                                                                            }
                                                                            onChange={(e) => {
                                                                                if (selectedUserType === "2") {
                                                                                    setTeammer(prevState => {
                                                                                        return {
                                                                                            ...prevState,
                                                                                            username: e
                                                                                        }
                                                                                    });
                                                                                } else {
                                                                                    setOwner(prevState => {
                                                                                        return {
                                                                                            ...prevState,
                                                                                            username: e
                                                                                        }
                                                                                    });
                                                                                };
                                                                            }}
                                                                        />
                                                                    </Form.Group>
                                                                    <Form.Group controlId="full_name">
                                                                        <Form.ControlLabel>Full Name</Form.ControlLabel>
                                                                        <Form.Control
                                                                            type="text"
                                                                            name="full_name"
                                                                            placeholder="Full Name"
                                                                            value={
                                                                                selectedUserType === "2" ?
                                                                                    teammer.full_name
                                                                                    :
                                                                                    owner.full_name
                                                                            }
                                                                            onChange={(e) => {
                                                                                if (selectedUserType === "2") {
                                                                                    setTeammer(prevState => {
                                                                                        return {
                                                                                            ...prevState,
                                                                                            full_name: e
                                                                                        }
                                                                                    });
                                                                                } else {
                                                                                    setOwner(prevState => {
                                                                                        return {
                                                                                            ...prevState,
                                                                                            full_name: e
                                                                                        }
                                                                                    });
                                                                                };
                                                                            }}
                                                                        />
                                                                    </Form.Group>
                                                                    {
                                                                        selectedUserType === "1" ?
                                                                            <Form.Group>
                                                                                <Form.ControlLabel>Roles in Startup</Form.ControlLabel>
                                                                                <InputPicker
                                                                                    size="lg"
                                                                                    name="role"
                                                                                    className="w-100 mb-2"
                                                                                    placeholder="Roles in Startup"
                                                                                    value={owner.role?.id}
                                                                                    valueKey="id"
                                                                                    labelKey="name"
                                                                                    data={publicDatas.roleList}
                                                                                    onSelect={(id, obj) => {
                                                                                        setOwner(prevState => {
                                                                                            return {
                                                                                                ...prevState,
                                                                                                role: obj
                                                                                            }
                                                                                        });
                                                                                    }}
                                                                                />
                                                                            </Form.Group>
                                                                            :
                                                                            <Form.Group>
                                                                                <Form.ControlLabel>Location</Form.ControlLabel>
                                                                                <InputPicker
                                                                                    size="lg"
                                                                                    name="location"
                                                                                    className="w-100 mb-2"
                                                                                    placeholder="Location"
                                                                                    value={teammer.location?.id}
                                                                                    valueKey="id"
                                                                                    labelKey="name"
                                                                                    data={publicDatas.locationList}
                                                                                    onSelect={(id, obj) => {
                                                                                        setTeammer(prevState => {
                                                                                            return {
                                                                                                ...prevState,
                                                                                                location: obj
                                                                                            }
                                                                                        });
                                                                                    }}
                                                                                />
                                                                            </Form.Group>
                                                                    }
                                                                    <div className="d-flex justify-content-end routing-button">
                                                                        <Button
                                                                            type="button"
                                                                            className="previous-button"
                                                                            onClick={() => setCurrentStep(0)}
                                                                        >
                                                                            Previous
                                                                        </Button>
                                                                        <Form.Group>
                                                                            <ButtonToolbar>
                                                                                <Button
                                                                                    type="button"
                                                                                    className="next-button"
                                                                                    onClick={() => {
                                                                                        if (selectedUserType === '1') {
                                                                                            if (owner.username && owner.full_name && owner.role && owner.avatarFile) {
                                                                                                setCurrentStep(2)
                                                                                            } else {
                                                                                                toaster.push(
                                                                                                    <Notification
                                                                                                        type={"error"}
                                                                                                        header="Failed confirmation!"
                                                                                                        closable
                                                                                                    >
                                                                                                        <p className="text-danger">
                                                                                                            An error occurred while filling in the
                                                                                                            information.
                                                                                                            All boxes must be filled correctly
                                                                                                        </p>
                                                                                                    </Notification>, 'topEnd'
                                                                                                )
                                                                                            }
                                                                                        }
                                                                                        if (selectedUserType === '2') {
                                                                                            if (teammer.username && teammer.full_name && teammer.location) {
                                                                                                setCurrentStep(2)
                                                                                            } else {
                                                                                                toaster.push(
                                                                                                    <Notification
                                                                                                        type={"error"}
                                                                                                        header="Failed confirmation!"
                                                                                                        closable
                                                                                                    >
                                                                                                        <p className="text-danger">
                                                                                                            An error occurred while filling in the
                                                                                                            information.
                                                                                                            All boxes must be filled correctly
                                                                                                        </p>
                                                                                                    </Notification>, 'topEnd'
                                                                                                )
                                                                                            }
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    Next
                                                                                </Button>
                                                                            </ButtonToolbar>
                                                                        </Form.Group>
                                                                    </div>
                                                                </Form>
                                                        }
                                                    </div>
                                                }
                                            />
                                            {/* STEP 3 */}
                                            {
                                                selectedUserType === "1" ?
                                                    <Steps.Item
                                                        className='_step-item'
                                                        title={
                                                            <>
                                                                Startup information
                                                                {
                                                                    currentStep > 2 &&
                                                                    <Button
                                                                        className="btn-edit-step"
                                                                        onClick={() => editStep(2)}
                                                                    >
                                                                        <AiOutlineEdit />
                                                                    </Button>
                                                                }
                                                            </>
                                                        }
                                                        description={
                                                            <div className="step-form">
                                                                {
                                                                    currentStep !== 0 && currentStep !== 1 && currentStep !== 2 ?
                                                                        (
                                                                            selectedUserType === "1" ?
                                                                                <div className='step-form-item-summary'>
                                                                                    <p>
                                                                                        <span>Startup Title</span>
                                                                                        <span>{startup.title}</span>
                                                                                    </p>
                                                                                    <p>
                                                                                        <span>Startup Type</span>
                                                                                        <span>
                                                                                            {
                                                                                                startup.type?.name
                                                                                            }
                                                                                        </span>
                                                                                    </p>
                                                                                    <p>
                                                                                        <span>Description</span>
                                                                                        <div dangerouslySetInnerHTML={
                                                                                            {
                                                                                                __html: startup.description?.length > 10 ?
                                                                                                    startup.description.slice(0, 20) + "..." : startup.description
                                                                                            }
                                                                                        }></div>
                                                                                    </p>
                                                                                </div>
                                                                                :
                                                                                <div>
                                                                                    <p><span>Position</span>
                                                                                        <span>{selectedJob.position?.name}</span>
                                                                                    </p>
                                                                                    <p>
                                                                                        <span>Experience level</span>
                                                                                        <span>{selectedJob.experienceLevel?.name}</span>
                                                                                    </p>
                                                                                    <p>
                                                                                        <span>Skills</span>
                                                                                        <span>
                                                                                            {
                                                                                                selectedJob.skillList.map(item => item.name)
                                                                                            }
                                                                                        </span>
                                                                                    </p>
                                                                                    <p>
                                                                                        <span>Work experience</span>
                                                                                        <span>....</span>
                                                                                    </p>
                                                                                    <p>
                                                                                        <span>Portfolio</span>
                                                                                        <span>....</span>
                                                                                    </p>
                                                                                    <p>
                                                                                        <span>Social media accounts</span>
                                                                                        <span>....</span>
                                                                                    </p>
                                                                                </div>
                                                                        )
                                                                        :
                                                                        <div>
                                                                            <Form>
                                                                                <div className="upload-avatar-wrapper mb-4">
                                                                                    <input
                                                                                        type="file"
                                                                                        className="d-none"
                                                                                        ref={startupLogoRef}
                                                                                        onChange={(e) => uploadFile(e, 'startup-logo')}
                                                                                    />
                                                                                    <div>
                                                                                        <Image
                                                                                            src={startup.avatarUrl ? startup.avatarUrl : '/img/upload_image.png'}
                                                                                            alt='icon'
                                                                                            width={64}
                                                                                            height={64}
                                                                                        />
                                                                                        <button
                                                                                            onClick={() => {
                                                                                                startupLogoRef.current.click()
                                                                                            }}
                                                                                        >
                                                                                            Upload Logo
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                                <Form.Group controlId="title">
                                                                                    <Form.ControlLabel>Startup Title</Form.ControlLabel>
                                                                                    <Form.Control
                                                                                        type="text"
                                                                                        name="title"
                                                                                        placeholder="Startup Title"
                                                                                        value={startup.title}
                                                                                        onChange={(e) => {
                                                                                            setStartup(prevState => {
                                                                                                return {
                                                                                                    ...prevState,
                                                                                                    title: e
                                                                                                };
                                                                                            });
                                                                                        }}
                                                                                    />
                                                                                </Form.Group>
                                                                                <Form className="Group">
                                                                                    <Form.ControlLabel>Startup type</Form.ControlLabel>
                                                                                    <InputPicker
                                                                                        size="lg"
                                                                                        name="type"
                                                                                        className="w-100 mb-2"
                                                                                        placeholder="Startup type"
                                                                                        data={publicDatas.projectTypeList}
                                                                                        valueKey="id"
                                                                                        labelKey="name"
                                                                                        value={startup.type?.id}
                                                                                        onSelect={(id, obj) => {
                                                                                            setStartup(prevState => {
                                                                                                return {
                                                                                                    ...prevState,
                                                                                                    type: obj
                                                                                                };
                                                                                            });
                                                                                        }}
                                                                                    />
                                                                                </Form>
                                                                                <Form.Group className="mt-2">
                                                                                    <Form.ControlLabel>Description about startup</Form.ControlLabel>
                                                                                    {
                                                                                        isEditorLoaded ?
                                                                                            <CKEditor
                                                                                                name={"name"}
                                                                                                editor={ClassicEditor}
                                                                                                style={{ maxWidth: "400px" }}
                                                                                                data={startup.description}
                                                                                                onChange={(event, editor) => {
                                                                                                    const data = editor.getData();
                                                                                                    setStartup(prevState => {
                                                                                                        return {
                                                                                                            ...prevState,
                                                                                                            description: data
                                                                                                        };
                                                                                                    });
                                                                                                }}
                                                                                            />
                                                                                            :
                                                                                            ''
                                                                                    }
                                                                                </Form.Group>
                                                                            </Form>
                                                                            <div className="navigation-btn-wrapper">
                                                                                <Button
                                                                                    type="button"
                                                                                    className="btn-next-step"
                                                                                    onClick={() => setCurrentStep(1)}
                                                                                >
                                                                                    Previous
                                                                                </Button>
                                                                                <Form.Group>
                                                                                    <ButtonToolbar>
                                                                                        <Button
                                                                                            onClick={() => {
                                                                                                if (startup.title && startup.type) {
                                                                                                    setCurrentStep(3)
                                                                                                } else {
                                                                                                    toaster.push(
                                                                                                        <Notification
                                                                                                            type={"error"}
                                                                                                            header="Failed confirmation!"
                                                                                                            closable
                                                                                                        >
                                                                                                            <p className="text-danger">
                                                                                                                An error occurred while
                                                                                                                filling in the
                                                                                                                information.
                                                                                                                All boxes must be filled
                                                                                                                correctly
                                                                                                            </p>
                                                                                                        </Notification>, 'topEnd'
                                                                                                    )
                                                                                                }
                                                                                            }}
                                                                                            className="next-button"
                                                                                            type="submit">Next</Button>
                                                                                    </ButtonToolbar>
                                                                                </Form.Group>
                                                                            </div>
                                                                        </div>
                                                                }
                                                            </div>
                                                        }
                                                    />
                                                    :
                                                    <Steps.Item
                                                        className='_step-item'
                                                        title={
                                                            <>
                                                                Position details
                                                                {currentStep > 2 &&
                                                                    <Button
                                                                        className="btn-edit-step"
                                                                        onClick={() => editStep(2)}
                                                                    >
                                                                        <AiOutlineEdit />
                                                                    </Button>
                                                                }
                                                            </>
                                                        }
                                                        description={
                                                            <div className="step-form">
                                                                {
                                                                    currentStep !== 0 && currentStep !== 1 && currentStep !== 2 ?
                                                                        <div className='step-form-item-summary'>
                                                                            <p>
                                                                                <span>Position</span>
                                                                                {/* <span>{positionDetails.map(item => props.positions.find(i => i.value === item)?.label)}</span> */}
                                                                            </p>
                                                                            <p>
                                                                                <span>Experience level</span>
                                                                                {/* <span>{props.experience_levels.find(i => i.value === experienceLevel)?.label}</span> */}
                                                                            </p>
                                                                            <p>
                                                                                <span>Skills</span>
                                                                                {/* <span>{skills.map(item => props.skills.find(i => i.value === item)?.label)}</span> */}
                                                                            </p>
                                                                            <p>
                                                                                <span>Work experience</span>
                                                                                <span>....</span>
                                                                            </p>
                                                                            <p>
                                                                                <span>Portfolio</span>
                                                                                <span>....</span>
                                                                            </p>
                                                                            <p>
                                                                                <span>Social media accounts</span>
                                                                                <span>....</span>
                                                                            </p>
                                                                        </div>
                                                                        :
                                                                        <div className="inner-form">
                                                                            <InputPicker
                                                                                size="lg"
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
                                                                            <InputPicker size="lg"
                                                                                className="w-100 my-2"
                                                                                placeholder="Experience Level"
                                                                                data={publicDatas.experienceLevelList}
                                                                                valueKey="id"
                                                                                labelKey='name'
                                                                                onSelect={(id, obj) => {
                                                                                    setTeammer(prevState => {
                                                                                        return {
                                                                                            ...prevState,
                                                                                            experienceLevel: obj
                                                                                        };
                                                                                    });
                                                                                }}
                                                                            />
                                                                            <InputPicker
                                                                                size="lg"
                                                                                placeholder="Skills"
                                                                                className="w-100 my-2"
                                                                                data={publicDatas.skillList}
                                                                                valueKey="id"
                                                                                labelKey='name'
                                                                                onSelect={(id, obj) => {
                                                                                    if (id && !teammer.skillList.some(item => item.id === id)) {
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
                                                                            <h3>Work Experience</h3>
                                                                            <div
                                                                                className="work-experience-summary">
                                                                                {
                                                                                    workExperienceList.map((item, index) =>
                                                                                        <div key={index}>
                                                                                            <p>
                                                                                                <span className="from-date">
                                                                                                    {item.start_date.month && months.find((el) => el.value === item.start_date.month)?.label} {item.start_date.year}
                                                                                                </span>
                                                                                                <span className="to-date"> -{item.end_date.month && months.find((el) => el.value === item.end_date.month)?.label} {item.end_date.year}
                                                                                                </span>
                                                                                            </p>
                                                                                            <div className="edit-header">
                                                                                                <div className="job-title">
                                                                                                    <h3>{props.positions.find(i => i.value === item.position)?.label}</h3>
                                                                                                    <p>{item.company} / {props.locations.find(i => i.value === item.location)?.label}</p>
                                                                                                </div>
                                                                                                <button onClick={() => editWorkExperience(index)}>
                                                                                                    <MdModeEditOutline />
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                                <hr className="mt-0" />
                                                                                <div className="job-section">
                                                                                    <div className="job-divs">
                                                                                        <h4>Position</h4>
                                                                                        <InputPicker
                                                                                            size="lg"
                                                                                            className="w-100"
                                                                                            placeholder="Type your position"
                                                                                            data={publicDatas.positionList}
                                                                                            value={selectedWorkExp.position?.id}
                                                                                            valueKey="id"
                                                                                            labelKey="name"
                                                                                            onSelect={(id, obj) => {
                                                                                                setSelectedWorkExp(prevState => {
                                                                                                    return {
                                                                                                        ...prevState,
                                                                                                        position: obj
                                                                                                    };
                                                                                                });
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="job-divs">
                                                                                        <h4>Company</h4>
                                                                                        <Input
                                                                                            placeholder="Enter Company name"
                                                                                            value={selectedWorkExp.companyName}
                                                                                            onChange={(e) => {
                                                                                                setSelectedWorkExp(prevState => {
                                                                                                    return {
                                                                                                        ...prevState,
                                                                                                        companyName: e
                                                                                                    };
                                                                                                });
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="job-divs">
                                                                                        <h4>Location</h4>
                                                                                        <InputPicker
                                                                                            size="lg"
                                                                                            className="w-100"
                                                                                            placeholder="Your location"
                                                                                            data={publicDatas.locationList}
                                                                                            value={selectedWorkExp.location?.id}
                                                                                            valueKey="id"
                                                                                            labelKey='name'
                                                                                            onSelect={(id, obj) => {
                                                                                                setSelectedWorkExp(prevState => {
                                                                                                    return {
                                                                                                        ...prevState,
                                                                                                        location: obj
                                                                                                    };
                                                                                                });
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="job-divs">
                                                                                        <h4>Start date</h4>
                                                                                        <div className="d-flex justify-content-between">
                                                                                            <InputPicker
                                                                                                size="lg"
                                                                                                style={{
                                                                                                    width: "232px"
                                                                                                }}
                                                                                                className="w-100 my-2 mr-2"
                                                                                                placeholder="Months"
                                                                                                data={months}
                                                                                                valueKey="id"
                                                                                                labelKey='name'
                                                                                                value={selectedWorkExp.start_month?.id}
                                                                                                onSelect={(id, obj) => {
                                                                                                    setSelectedWorkExp(prevState => {
                                                                                                        return {
                                                                                                            ...prevState,
                                                                                                            start_month: obj
                                                                                                        };
                                                                                                    });
                                                                                                }}
                                                                                            />
                                                                                            <InputPicker
                                                                                                size="lg"
                                                                                                style={{
                                                                                                    maxWidth: "130px"
                                                                                                }}
                                                                                                className="w-100 my-2"
                                                                                                placeholder="Years"
                                                                                                data={publicDatas.years}
                                                                                                value={selectedWorkExp.start_year?.id}
                                                                                                onSelect={(id, obj) => {
                                                                                                    setSelectedWorkExp(prevState => {
                                                                                                        return {
                                                                                                            ...prevState,
                                                                                                            start_year: obj
                                                                                                        };
                                                                                                    });
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="job-divs">
                                                                                        <h4>End date</h4>
                                                                                        <div className="d-flex justify-content-between">
                                                                                            <InputPicker
                                                                                                size="lg"
                                                                                                style={{
                                                                                                    width: "232px"
                                                                                                }}
                                                                                                className="w-100 my-2 mr-2"
                                                                                                placeholder="Months"
                                                                                                data={months}
                                                                                                valueKey="id"
                                                                                                labelKey='name'
                                                                                                value={selectedWorkExp.end_month?.id}
                                                                                                onSelect={(id, obj) => {
                                                                                                    setSelectedWorkExp(prevState => {
                                                                                                        return {
                                                                                                            ...prevState,
                                                                                                            end_month: obj
                                                                                                        };
                                                                                                    });
                                                                                                }}
                                                                                            />
                                                                                            <InputPicker
                                                                                                size="lg"
                                                                                                style={{
                                                                                                    maxWidth: "130px"
                                                                                                }}
                                                                                                className="w-100 my-2"
                                                                                                placeholder="Years"
                                                                                                data={publicDatas.years}
                                                                                                value={selectedWorkExp.endt_year?.id}
                                                                                                onSelect={(id, obj) => {
                                                                                                    setSelectedWorkExp(prevState => {
                                                                                                        return {
                                                                                                            ...prevState,
                                                                                                            endt_year: obj
                                                                                                        };
                                                                                                    });
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <button
                                                                                    className="add-more-experience"
                                                                                    onClick={addMoreExperience}
                                                                                >
                                                                                    <BsPlusLg className="mr-2" />
                                                                                    Add More Experience
                                                                                </button>
                                                                            </div>
                                                                            <hr />
                                                                            {/* <div className="portfolio">
                                                                                <h3>Portfolio</h3>
                                                                                {
                                                                                    portfolios.length > 0 && portfolios.map((item, index) =>
                                                                                        <div
                                                                                            key={index}
                                                                                            className="portfolio-links">
                                                                                            <a>{item}</a>
                                                                                            <button
                                                                                                onClick={() => {
                                                                                                    portoflioAdd('remove', item);
                                                                                                }}><FaRegTrashAlt />
                                                                                            </button>
                                                                                        </div>)
                                                                                }
                                                                                <div className="portfolio-add">
                                                                                    <Input
                                                                                        placeholder="Enter link"
                                                                                        onChange={(e) => setPortfolio(e)}
                                                                                        className="w-100 mr-2"
                                                                                        value={portfolio} />
                                                                                    <Button
                                                                                        onClick={() => portoflioAdd('add')}
                                                                                    >
                                                                                        <BsPlusLg
                                                                                            className="mr-2 " />
                                                                                    </Button>
                                                                                </div>
                                                                                <hr />
                                                                            </div> */}
                                                                            <div className="step_form">
                                                                                <h3>Social media accounts</h3>
                                                                                <Form
                                                                                    onSubmit={(e, data) => confirm_step_3(data)}
                                                                                    className="mt-3">
                                                                                    <Form.Group
                                                                                        controlId="twitter">
                                                                                        <Form.ControlLabel>Twitter</Form.ControlLabel>
                                                                                        <Form.Control
                                                                                            name="twitter"
                                                                                            type="text"
                                                                                            placeholder="https://www.twitter.com/margaretbrown" />
                                                                                    </Form.Group>
                                                                                    <Form.Group
                                                                                        controlId="facebook">
                                                                                        <Form.ControlLabel>Facebook</Form.ControlLabel>
                                                                                        <Form.Control
                                                                                            name="facebook"
                                                                                            type="text"
                                                                                            placeholder="https://www.facebook.com/margaretbrown" />
                                                                                    </Form.Group>
                                                                                    <Form.Group controlId="github">
                                                                                        <Form.ControlLabel>Github</Form.ControlLabel>
                                                                                        <Form.Control name="github"
                                                                                            type="text"
                                                                                            placeholder="https://www.github.com/margaretbrown" />
                                                                                    </Form.Group>
                                                                                    <Form.Group
                                                                                        controlId="behance">
                                                                                        <Form.ControlLabel>Behance</Form.ControlLabel>
                                                                                        <Form.Control
                                                                                            name="behance"
                                                                                            type="text"
                                                                                            placeholder="http://www.behance.net/margaretbrown" />
                                                                                    </Form.Group>
                                                                                    <Form.Group
                                                                                        controlId="dribble">
                                                                                        <Form.ControlLabel>Dribble</Form.ControlLabel>
                                                                                        <Form.Control
                                                                                            name="dribble"
                                                                                            type="text"
                                                                                            placeholder="http://www.dribble.com/margaretbrown" />
                                                                                    </Form.Group>
                                                                                    <Form.Group
                                                                                        controlId="linkedin">
                                                                                        <Form.ControlLabel>Linkedin</Form.ControlLabel>
                                                                                        <Form.Control
                                                                                            name="linkedin"
                                                                                            type="text"
                                                                                            placeholder="https://www.linkedin.com/margaretbrown" />
                                                                                    </Form.Group>
                                                                                    {/* <Uploader className="upload"
                                                                                        onChange={(fileList, fileType) => setCv(fileList)}
                                                                                        action=""
                                                                                        maxPreviewFileSize={2}
                                                                                        defaultFileList={cv}
                                                                                    >
                                                                                        <button type="button">
                                                                                            Import from Linkedin
                                                                                        </button>
                                                                                    </Uploader> */}
                                                                                    <div
                                                                                        className="d-flex justify-content-end routing-button">
                                                                                        <Button
                                                                                            onClick={() => setCurrent(1)}
                                                                                            type="button"
                                                                                            className="previous-button">Previous</Button><Form.Group>
                                                                                            <ButtonToolbar>
                                                                                                <Button
                                                                                                    className="next-button"
                                                                                                    type="submit">Next</Button>
                                                                                            </ButtonToolbar>
                                                                                        </Form.Group>
                                                                                    </div>
                                                                                </Form>
                                                                            </div>
                                                                        </div>
                                                                }
                                                            </div>
                                                        }
                                                    />
                                            }
                                        </Steps>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default steps2