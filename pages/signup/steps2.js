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
    InputNumber,
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
import { useAuth } from '../../Auth';
import { getCookie } from '../../src/helpers/cookie';
import { buildFormData } from '../../src/helpers/buildFormData';
import { renderErrorMessages } from '../../src/helpers/renderErrorMessages';

const steps2 = (props) => {

    const authContext = useAuth();

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

    const [ownerResponseErrors, setOwnerResponseErrors] = useState([]);
    const [teammerResponseErrors, setTeammerResponseErrors] = useState([]);

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
                id: i,
                name: `${i}`,
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

    const [currentStep, setCurrentStep] = useState(0);

    const [selectedUserType, setSelectedUserType] = useState();

    const [isValidOwnerUsername, setIsValidOwnerUsername] = useState({
        status: null,
        message: null
    });
    const [isValidTeammerUsername, setIsValidTeammerUsername] = useState({
        status: null,
        message: null
    });

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
    });

    const [jobList, setJobList] = useState([]);
    const [selectedJob, setSelectedJob] = useState({
        position: {
            id: null,
            name: null,
            key: "Position",
        },
        location: {
            id: null,
            name: null,
            key: "Location",
        },
        type: {
            id: null,
            name: null,
            key: "Type"
        },
        payment: {
            id: null,
            name: null,
            key: "Payment"
        },
        salary: '',
        period: {
            id: null,
            name: null,
            key: "Salary period"
        },
        experience: '',
        description: '',
    });
    const [selectedJobErrors, setSelectedJobErrors] = useState([]);
    const [isEditSelectedJob, setIsEditSelectedJob] = useState({
        status: false,
        index: -1,
    });

    const resetSelectedJob = () => {
        setSelectedJob({
            position: {
                id: null,
                name: null,
                key: "Position",
            },
            location: {
                id: null,
                name: null,
                key: "Location",
            },
            type: {
                id: null,
                name: null,
                key: "Type"
            },
            payment: {
                id: null,
                name: null,
                key: "Payment"
            },
            salary: '',
            period: {
                id: null,
                name: null,
                key: "Salary period"
            },
            experience: '',
            description: '',
        });
    };

    const ownerImgRef = useRef();
    const startupLogoRef = useRef();
    const teammerImgRef = useRef();

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
        portfolioList: [],
        about: ''
    });

    const [workExperienceList, setWorkExperienceList] = useState([]);
    const [selectedWorkExp, setSelectedWorkExp] = useState({
        position: {
            id: null,
            name: null,
            key: "Position",
        },
        companyName: '',
        location: {
            id: null,
            name: null,
            key: "Location",
        },
        start_month: {
            id: null,
            name: null,
            key: "Start month",
        },
        start_year: {
            id: null,
            name: null,
            key: "Start year",
        },
        end_month: {
            id: null,
            name: null,
            key: "End month",
        },
        end_year: {
            id: null,
            name: null,
            key: "End year",
        },
    });
    const [selectedWorkExpErrors, setSelectedWorkExpErrors] = useState([]);
    const [isEditSelectedWorkExp, setIsEditSelectedWorkExp] = useState({
        status: false,
        index: -1,
    });

    const [portfolioLink, setPortfolioLink] = useState('');

    const resetSelectedWorkExp = () => {
        setSelectedWorkExp({
            position: {
                id: null,
                name: null,
                key: "Position",
            },
            companyName: '',
            location: {
                id: null,
                name: null,
                key: "Location",
            },
            start_month: {
                id: null,
                name: null,
                key: "Start month",
            },
            start_year: {
                id: null,
                name: null,
                key: "Start year",
            },
            end_month: {
                id: null,
                name: null,
                key: "End month",
            },
            end_year: {
                id: null,
                name: null,
                key: "End year",
            },
        });
    };

    const validateWorkExpForm = () => {
        if (!selectedWorkExp) return false;

        let validationErrors = [];

        for (const [key, value] of Object.entries(selectedWorkExp)) {
            if (typeof value === 'string') {
                if (!value || !value.trim()) {
                    validationErrors.push({
                        key: key,
                        message: 'This field is required'
                    });
                };
            };
            if (typeof value === 'object') {

                // if (key === "end_month") return;
                // if (key === "end_year") return;

                if (!value.id) {
                    validationErrors.push({
                        key: key,
                        message: `${value.key} field is required`
                    });
                };

                // if (key === "start_year") {
                //     if (!value.value) {
                //         validationErrors.push({
                //             key: key,
                //             message: `${value.key} field is required`
                //         });
                //     };
                // } else {
                //     if (!value.id) {
                //         validationErrors.push({
                //             key: key,
                //             message: `${value.key} field is required`
                //         });
                //     };
                // };
            };
        };

        setSelectedWorkExpErrors(validationErrors);

        if (validationErrors.length) {
            return false;
        } else {
            return true;
        };
    };

    const addMoreExperience = () => {
        let isValidForm = validateWorkExpForm();
        // if not valid form
        if (!isValidForm) {
            return;
        };

        if (!isEditSelectedWorkExp.status && isEditSelectedWorkExp.index < 0) {
            setWorkExperienceList(prevState => {
                return [...prevState, selectedWorkExp]
            });
        } else {
            let arr = workExperienceList;
            arr.splice(isEditSelectedWorkExp.index, 1, selectedWorkExp);
            setWorkExperienceList(arr);
            setIsEditSelectedWorkExp({
                status: false,
                index: -1
            });
        };

        resetSelectedWorkExp();
    };

    const editWorkExperience = index => {

        const selectedObj = workExperienceList[index];

        console.log('selected obj', selectedObj);

        setSelectedWorkExp({
            position: {
                id: selectedObj.position?.id || null,
                name: selectedObj.position?.name || null,
                key: "Position",
            },
            companyName: selectedObj.companyName || '',
            location: {
                id: selectedObj.location?.id || null,
                name: selectedObj.location?.name || null,
                key: "Location",
            },
            start_month: {
                id: selectedObj.start_month?.id || null,
                name: selectedObj.start_month?.name || null,
                key: "Start month",
            },
            start_year: {
                id: selectedObj.start_year?.id || null,
                name: selectedObj.start_year?.name || null,
                key: "Start year",
            },
            end_month: {
                id: selectedObj.end_month?.id || null,
                name: selectedObj.end_month?.name || null,
                key: "End month",
            },
            end_year: {
                id: selectedObj.end_year?.id || null,
                name: selectedObj.end_year?.name || null,
                key: "End year",
            },
        });

        setIsEditSelectedWorkExp({
            status: true,
            index: index
        });
    };

    const validateAddPositionForm = () => {
        if (!selectedJob) return false;

        let validationErrors = [];

        for (const [key, value] of Object.entries(selectedJob)) {
            if (typeof value === 'string') {
                if (!value || !value.trim()) {
                    validationErrors.push({
                        key: key,
                        message: 'This field is required'
                    });
                };
            };
            if (typeof value === 'object') {

                if (key === "start_year" || key === "end_year") {
                    if (!value.value) {
                        validationErrors.push({
                            key: key,
                            message: `${value.key} field is required`
                        });
                    };
                } else {
                    if (!value.id) {
                        validationErrors.push({
                            key: key,
                            message: `${value.key} field is required`
                        });
                    };
                };
            };
        };

        setSelectedJobErrors(validationErrors);

        if (validationErrors.length) {
            return false;
        } else {
            return true;
        };
    };

    const addMorePosition = () => {

        console.log('addMorePosition selcetedJob', selectedJob);

        let isValidForm = validateAddPositionForm();
        // if not valid form
        if (!isValidForm) {
            return;
        };

        if (!isEditSelectedJob.status && isEditSelectedJob.index < 0) {
            setJobList(prevState => {
                return [...prevState, selectedJob]
            });
        } else {
            let arr = jobList;
            arr.splice(isEditSelectedJob.index, 1, selectedJob);
            setJobList(arr);
            setIsEditSelectedJob({
                status: false,
                index: -1
            });
        };

        resetSelectedJob();
    };

    const editSelectedJob = index => {

        const selectedObj = jobList[index];

        console.log('selected obj', selectedObj);

        setSelectedJob({
            position: {
                id: selectedObj.position.id || null,
                name: selectedObj.position.name || null,
                key: "Position",
            },
            location: {
                id: selectedObj.location.id || null,
                name: selectedObj.location.name || null,
                key: "Location",
            },
            type: {
                id: selectedObj.type.id || null,
                name: selectedObj.type.name || null,
                key: "Type"
            },
            payment: {
                id: selectedObj.payment.id || null,
                name: selectedObj.payment.name || null,
                key: "Payment"
            },
            salary: selectedObj.salary,
            period: {
                id: selectedObj.period.id || null,
                name: selectedObj.period.name || null,
                key: "Salary period"
            },
            experience: selectedObj.experience,
            description: selectedObj.description,
        });

        setIsEditSelectedJob({
            status: true,
            index: index
        });
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
            positions: [],
            experienceLevel: null,
            skillList: [],
            socialDatas: {},
            portfolioList: [],
            about: ''
        });
    };

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
        };
    };

    const getSocialDatas = (e) => {
        let formData = new FormData(e.target);

        let data = {};

        for (let [key, value] of formData.entries()) {
            data[key] = value;
        };

        return data;
    };

    const portfolioFunction = (type, itemLink) => {
        if (type === "add") {
            setTeammer(prevState => {
                return {
                    ...prevState,
                    portfolioList: [...prevState.portfolioList, portfolioLink]
                };
            });
            setPortfolioLink('');
        }
        if (type === "remove" && itemLink) {
            setTeammer(prevState => {
                return {
                    ...prevState,
                    portfolioList: [...prevState.portfolioList.filter(item => item !== itemLink)]
                };
            });
            // setPortfolios(portfolios.filter(item => item !== element))
        };
    };

    const confirm_step_3 = (socialDatas) => {

        alert('here')

        const socialData = getSocialDatas(socialDatas);

        setTeammer(prevState => {
            return {
                ...prevState,
                socialDatas: socialData
            };
        });

        if (validateStep(2)) {
            setCurrentStep(3);
        };
    };

    const [teammerStepValidations, setTeammerStepValidations] = useState({
        step_1: [],
        step_2: [],
        step_3: [],
    });
    const [ownerStepValidations, setOwnerStepValidations] = useState({
        step_1: [],
        step_2: [],
        step_3: [],
    });

    const checkUsernameAsync = async (username, userType) => {

        if (!username?.trim()) return;
        if (!userType || !currentStep) {
            setCurrentStep(0);
            return false;
        };

        if (/^[A-z\d_]{5,20}$/i.test(username)) {
            if (userType === "1") {
                setIsValidOwnerUsername({
                    status: true,
                    message: ''
                });
            };
            if (userType === "2") {
                setIsValidTeammerUsername({
                    status: true,
                    message: ''
                });
            };
            axios.get(config.BASE_URL + `register/check?type=username&value=${username}`).then(res => {
                if (!res.data.success) {
                    if (userType === "1") {
                        setIsValidOwnerUsername({
                            status: false,
                            message: res.data.message
                        });
                    };
                    if (userType === "2") {
                        setIsValidTeammerUsername({
                            status: false,
                            message: res.data.message
                        });
                    };
                } else {
                    if (userType === "1") {
                        setIsValidOwnerUsername({
                            status: true,
                            message: res.data.message
                        });
                    };
                    if (userType === "2") {
                        setIsValidTeammerUsername({
                            status: true,
                            message: res.data.message
                        });
                    };
                };
            });
        } else {
            if (userType === "1") {
                setIsValidOwnerUsername({
                    status: false,
                    message: 'Username is not valid'
                });
            };
            if (userType === "2") {
                setIsValidTeammerUsername({
                    status: false,
                    message: 'Username is not valid'
                });
            };
        };
    };

    const validateStep = () => {
        if (!selectedUserType || !currentStep) {
            setCurrentStep(0);
            return false;
        };

        // user stype => owner
        if (selectedUserType === "1") {
            if (currentStep === 1) {

                // TEST MODE !!!
                return true;
                // TEST MODE !!!

                let step_1_errors = [];

                if (!owner.avatarFile) {
                    step_1_errors.push({
                        key: 'avatarFile',
                        message: 'Avatar field is required'
                    });
                };
                if (!owner.full_name?.trim()) {
                    step_1_errors.push({
                        key: 'full_name',
                        message: 'Fullname field is required'
                    });
                };
                if (!owner.username?.trim()) {
                    step_1_errors.push({
                        key: 'username',
                        message: 'Username field is required'
                    });
                };
                if (!owner.role) {
                    step_1_errors.push({
                        key: 'role',
                        message: 'Role field is required'
                    });
                };

                setOwnerStepValidations(prevState => {
                    return {
                        ...prevState,
                        step_1: step_1_errors
                    };
                });

                if (step_1_errors.length && !isValidOwnerUsername.status) {
                    return false;
                } else {
                    return true;
                };
            };
            if (currentStep === 2) {

                // TEST MODE !!!
                return true;
                // TEST MODE !!!

                let step_2_errors = [];

                if (!startup.avatarFile) {
                    step_2_errors.push({
                        key: 'avatarFile',
                        message: 'Logo field is required'
                    });
                };
                if (!startup.title?.trim()) {
                    step_2_errors.push({
                        key: 'title',
                        message: 'Title field is required'
                    });
                };
                if (!startup.type) {
                    step_2_errors.push({
                        key: 'type',
                        message: 'Startup type field is required'
                    });
                };
                if (!startup.description) {
                    step_2_errors.push({
                        key: 'description',
                        message: 'Description field is required'
                    });
                };

                setOwnerStepValidations(prevState => {
                    return {
                        ...prevState,
                        step_2: step_2_errors
                    };
                });
            };
            if (currentStep === 3) {
                // OWNER FINAL STEP
                let step_3_errors = [];

                let isValidForm = validateAddPositionForm();

                // // validate and submit all steps form

                // // v1
                if (!jobList.length && !isValidForm) {
                    step_3_errors.push({
                        key: 'final',
                        message: 'You must add at least 1 job position'
                    });
                    setOwnerStepValidations(prevState => {
                        return {
                            ...prevState,
                            step_3: step_3_errors
                        };
                    });

                    return;
                };

                // // v2
                if (!jobList.length && (isValidForm && !isEditSelectedJob.status)) {
                    setJobList([selectedJob]);
                    setOwnerStepValidations(prevState => {
                        return {
                            ...prevState,
                            step_3: []
                        };
                    });
                    submitOwnerData();

                    return;
                };

                // // v3
                if (jobList.length && !isValidForm) {
                    resetSelectedJob();
                    setOwnerStepValidations(prevState => {
                        return {
                            ...prevState,
                            step_3: []
                        };
                    });
                    submitOwnerData();

                    return;
                };

                // // v4 (list & editing selected job )
                if (jobList.length && (isValidForm && isEditSelectedJob)) {
                    step_3_errors.push({
                        key: 'final',
                        message: 'You did not complete editing selected job'
                    });
                    setOwnerStepValidations(prevState => {
                        return {
                            ...prevState,
                            step_3: step_3_errors
                        };
                    });

                    return;
                };

                // // v5 (list & new job )
                if (jobList.length && (isValidForm && !isEditSelectedJob)) {
                    // let currentJobList = jobList;
                    // currentJobList.push(selectedJob);
                    // setJobList(currentJobList);

                    addMorePosition();

                    setOwnerStepValidations(prevState => {
                        return {
                            ...prevState,
                            step_3: []
                        };
                    });
                    submitOwnerData();

                    return;
                };

                alert('not valid form');
            };
        };
        // user stype => teammer
        if (selectedUserType === "2") {
            if (currentStep === 1) {

                // TEST MODE !!!
                return true;
                // TEST MODE !!!

                let step_1_errors = [];

                if (!teammer.full_name?.trim()) {
                    step_1_errors.push({
                        key: 'full_name',
                        message: 'Fullname field is required'
                    });
                };
                if (!teammer.username?.trim()) {
                    step_1_errors.push({
                        key: 'username',
                        message: 'Username field is required'
                    });
                };
                if (!teammer.location) {
                    step_1_errors.push({
                        key: 'location',
                        message: 'Location field is required'
                    });
                };

                setTeammerStepValidations(prevState => {
                    return {
                        ...prevState,
                        step_1: step_1_errors
                    };
                });

                console.log('TEAMMER STEP ! LOG', step_1_errors.length);

                if (step_1_errors.length && !isValidTeammerUsername.status) {
                    return false;
                } else {
                    return true;
                };
            };
            if (currentStep === 2) {

                // TEST MODE !!!
                return true;
                // TEST MODE !!!

                let step_2_errors = [];

                if (!teammer.positions.length) {
                    step_2_errors.push({
                        key: 'positions',
                        message: 'Position field is required'
                    });
                };
                if (!teammer.experienceLevel) {
                    step_2_errors.push({
                        key: 'experienceLevel',
                        message: 'Experience level field is required'
                    });
                };
                if (!teammer.skillList.length) {
                    step_2_errors.push({
                        key: 'skillList',
                        message: 'Skills field is required'
                    });
                };

                const isValidWorkExp = validateWorkExpForm();

                if (!workExperienceList.length && !isValidWorkExp) {
                    step_2_errors.push({
                        key: 'step_2_final',
                        message: 'You must add at least 1 job position'
                    });
                };

                setTeammerStepValidations(prevState => {
                    return {
                        ...prevState,
                        step_2: step_2_errors
                    };
                });

                if (step_2_errors.length) {
                    return false;
                } else {
                    return true;
                };
            };
            if (currentStep === 3) {

                // final step
                // TEST MODE !!!
                // return true;
                // TEST MODE !!!

                let step_3_errors = [];

                if (!teammer.avatarFile) {
                    step_3_errors.push({
                        key: 'avatarFile',
                        message: 'Avatar field is required'
                    });
                };
                if (!teammer.about?.trim()) {
                    step_3_errors.push({
                        key: 'about',
                        message: 'Description field is required'
                    });
                };

                setTeammerStepValidations(prevState => {
                    return {
                        ...prevState,
                        step_1: step_3_errors
                    };
                });

                if (step_3_errors.length) {
                    return false;
                } else {
                    return true;
                };
            };
        };
    };

    const submitOwnerData = () => {
        // jobList bosh gelir 

        console.log(
            'owner data : ', owner,
            'startup : ', startup,
            'job list : ', jobList,
        );


        let jobs = jobList.map(item => {
            return {
                salary: item.salary,
                salary_period: item.period?.id,
                years_of_experience: item.experience,
                payment_type_id: item.payment?.id,
                type_id: item.type?.id,
                location_id: item.location?.id,
                position_id: item.position?.id,
                description: item.description
            };
        });

        let body = {
            type: 1,
            photo: owner.avatarFile,
            // username: owner.username,
            full_name: owner.full_name,
            detail: {
                project_role_id: owner.role?.id
            },
            project: {
                logo: startup.avatarFile,
                title: startup.title,
                type_id: startup.type?.id,
                jobs: jobs,
                description: startup.description,
            }
        };

        // console.log('authContext', authContext);
        // console.log('getToken', getCookie('teammers-access-token'));

        const formData = new FormData();
        buildFormData(formData, body);

        axios.post(config.BASE_URL + "auth/register-complete", formData, {
            headers: {
                "Authorization": "Bearer " + getCookie('teammers-access-token')
            }
        }).then(res => {
            console.log('steps RESPONSE', res);
        }).catch(error => {
            if (error.response?.status === 422) {
                let errors = renderErrorMessages(error.response.data.error.validation);
                setOwnerResponseErrors(errors);
            };
        });
    };

    const submitTeammerData = () => {
        alert('submit teammer data');
    };

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
                                                                        <div className="validation-errors mb-4">
                                                                            {
                                                                                ownerStepValidations.step_1.map((item, index) => {
                                                                                    if (item.key === "avatarFile") {
                                                                                        return <span key={index}>{item.message}</span>
                                                                                    };
                                                                                })
                                                                            }
                                                                        </div>
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

                                                                                checkUsernameAsync(e, selectedUserType);
                                                                            }}
                                                                        // onBlur={(e) => {
                                                                        //     checkUsernameAsync(e.target.value, selectedUserType);
                                                                        // }}
                                                                        />
                                                                        {
                                                                            selectedUserType === "1" &&
                                                                            <div className="validation-errors">
                                                                                {
                                                                                    ownerStepValidations.step_1.map((item, index) => {
                                                                                        if (item.key === "username") {
                                                                                            return <span key={index}>{item.message}</span>
                                                                                        };
                                                                                    })
                                                                                }
                                                                                {
                                                                                    !isValidOwnerUsername.status &&
                                                                                    <span>{isValidOwnerUsername.message}</span>
                                                                                }
                                                                            </div>
                                                                        }
                                                                        {
                                                                            selectedUserType === "2" &&
                                                                            <div className="validation-errors">
                                                                                {
                                                                                    teammerStepValidations.step_1.map((item, index) => {
                                                                                        if (item.key === "username") {
                                                                                            return <span key={index}>{item.message}</span>
                                                                                        };
                                                                                    })
                                                                                }
                                                                                {
                                                                                    !isValidTeammerUsername.status &&
                                                                                    <span>{isValidTeammerUsername.message}</span>
                                                                                }
                                                                            </div>
                                                                        }
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
                                                                        <div className="validation-errors">
                                                                            {
                                                                                selectedUserType === "1" ?
                                                                                    ownerStepValidations.step_1.map((item, index) => {
                                                                                        if (item.key === "full_name") {
                                                                                            return <span key={index}>{item.message}</span>
                                                                                        };
                                                                                    })
                                                                                    :
                                                                                    teammerStepValidations.step_1.map((item, index) => {
                                                                                        if (item.key === "full_name") {
                                                                                            return <span key={index}>{item.message}</span>
                                                                                        };
                                                                                    })
                                                                            }
                                                                        </div>
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
                                                                                            };
                                                                                        });
                                                                                    }}
                                                                                />
                                                                                <div className="validation-errors">
                                                                                    {
                                                                                        ownerStepValidations.step_1.map((item, index) => {
                                                                                            if (item.key === "role") {
                                                                                                return <span key={index}>{item.message}</span>
                                                                                            };
                                                                                        })
                                                                                    }
                                                                                </div>
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
                                                                                <div className="validation-errors">
                                                                                    {
                                                                                        teammerStepValidations.step_1.map((item, index) => {
                                                                                            if (item.key === "location") {
                                                                                                return <span key={index}>{item.message}</span>
                                                                                            };
                                                                                        })
                                                                                    }
                                                                                </div>
                                                                            </Form.Group>
                                                                    }
                                                                    <div className="navigation-btn-wrapper">
                                                                        <Button
                                                                            type="button"
                                                                            onClick={() => setCurrentStep(0)}
                                                                        >
                                                                            Previous
                                                                        </Button>
                                                                        <Button
                                                                            type='button'
                                                                            onClick={() => {
                                                                                if (validateStep(1)) {
                                                                                    setCurrentStep(2);
                                                                                };
                                                                            }}
                                                                        >
                                                                            Next
                                                                        </Button>
                                                                    </div>
                                                                </Form>
                                                        }
                                                    </div>
                                                }
                                            />
                                            {/* STEP 3 */}
                                            {
                                                selectedUserType === "1" ?
                                                    // owner
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
                                                                                        {/* <span>{selectedJob.experienceLevel?.name}</span> */}
                                                                                        <span>{selectedJob.experience}</span>
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
                                                                                            width={64}
                                                                                            height={64}
                                                                                            alt='icon'
                                                                                            src={startup.avatarUrl ? startup.avatarUrl : '/img/upload_image.png'}
                                                                                        />
                                                                                        <button
                                                                                            onClick={() => {
                                                                                                startupLogoRef.current.click()
                                                                                            }}
                                                                                        >
                                                                                            Upload Logo
                                                                                        </button>
                                                                                    </div>
                                                                                    <div className="validation-errors mb-4">
                                                                                        {
                                                                                            ownerStepValidations.step_2.map((item, index) => {
                                                                                                if (item.key === "avatarFile") {
                                                                                                    return <span key={index}>{item.message}</span>
                                                                                                };
                                                                                            })
                                                                                        }
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
                                                                                    <div className="validation-errors">
                                                                                        {
                                                                                            ownerStepValidations.step_2.map((item, index) => {
                                                                                                if (item.key === "title") {
                                                                                                    return <span key={index}>{item.message}</span>
                                                                                                };
                                                                                            })
                                                                                        }
                                                                                    </div>
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
                                                                                    <div className="validation-errors mb-4">
                                                                                        {
                                                                                            ownerStepValidations.step_2.map((item, index) => {
                                                                                                if (item.key === "type") {
                                                                                                    return <span key={index}>{item.message}</span>
                                                                                                };
                                                                                            })
                                                                                        }
                                                                                    </div>
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
                                                                                    <div className="validation-errors mb-4">
                                                                                        {
                                                                                            ownerStepValidations.step_2.map((item, index) => {
                                                                                                if (item.key === "description") {
                                                                                                    return <span key={index}>{item.message}</span>
                                                                                                };
                                                                                            })
                                                                                        }
                                                                                    </div>
                                                                                </Form.Group>
                                                                            </Form>
                                                                            <div className="navigation-btn-wrapper">
                                                                                <Button
                                                                                    type="button"
                                                                                    onClick={() => setCurrentStep(1)}
                                                                                >
                                                                                    Previous
                                                                                </Button>
                                                                                <Button
                                                                                    onClick={() => {
                                                                                        if (validateStep(2)) {
                                                                                            setCurrentStep(3);
                                                                                        };
                                                                                    }}
                                                                                >
                                                                                    Next
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                }
                                                            </div>
                                                        }
                                                    />
                                                    :
                                                    // teammer
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
                                                                                <span>
                                                                                    {
                                                                                        teammer.positions.map(item => {
                                                                                            return <div>
                                                                                                {
                                                                                                    item.name
                                                                                                }
                                                                                            </div>
                                                                                        })
                                                                                    }
                                                                                </span>
                                                                            </p>
                                                                            <p>
                                                                                <span>Experience level</span>
                                                                                <span>{teammer.experienceLevel?.name}</span>
                                                                            </p>
                                                                            <p>
                                                                                <span>Skills</span>
                                                                                <span>
                                                                                    {
                                                                                        teammer.skillList.map(item => {
                                                                                            return <div>
                                                                                                {
                                                                                                    item.name
                                                                                                }
                                                                                            </div>
                                                                                        })
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
                                                                            <div className="validation-errors">
                                                                                {
                                                                                    teammerStepValidations.step_2.map((item, index) => {
                                                                                        if (item.key === "positions") {
                                                                                            return <span key={index}>{item.message}</span>
                                                                                        }
                                                                                    })
                                                                                }
                                                                            </div>
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
                                                                            <div className="validation-errors">
                                                                                {
                                                                                    teammerStepValidations.step_2.map((item, index) => {
                                                                                        if (item.key === "experienceLevel") {
                                                                                            return <span key={index}>{item.message}</span>
                                                                                        }
                                                                                    })
                                                                                }
                                                                            </div>
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
                                                                            <div className="validation-errors">
                                                                                {
                                                                                    teammerStepValidations.step_2.map((item, index) => {
                                                                                        if (item.key === "skillList") {
                                                                                            return <span key={index}>{item.message}</span>
                                                                                        }
                                                                                    })
                                                                                }
                                                                            </div>
                                                                            <h3>Work Experience</h3>
                                                                            <div className="work-experience-summary">
                                                                                {
                                                                                    workExperienceList.map((item, index) =>
                                                                                        <div key={index}>
                                                                                            <p>
                                                                                                <span className="from-date">
                                                                                                    {item.start_month?.name} {item.start_year?.name}
                                                                                                </span>
                                                                                                <span className="to-date"> - {item.end_month?.name} {item.end_year?.name}</span>
                                                                                            </p>
                                                                                            <div className="edit-header">
                                                                                                <div className="job-title">
                                                                                                    <h3>{item.position?.name}</h3>
                                                                                                    <p>{item.companyName} / {item.location?.name}</p>
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
                                                                                        <div className="validation-errors">
                                                                                            <span>
                                                                                                {
                                                                                                    selectedWorkExpErrors.find(x => x.key === 'position')?.message
                                                                                                }
                                                                                            </span>
                                                                                        </div>
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
                                                                                        <div className="validation-errors">
                                                                                            <span>
                                                                                                {
                                                                                                    selectedWorkExpErrors.find(x => x.key === 'companyName')?.message
                                                                                                }
                                                                                            </span>
                                                                                        </div>
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
                                                                                        <div className="validation-errors">
                                                                                            <span>
                                                                                                {
                                                                                                    selectedWorkExpErrors.find(x => x.key === 'location')?.message
                                                                                                }
                                                                                            </span>
                                                                                        </div>
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
                                                                                                valueKey="id"
                                                                                                labelKey='name'
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
                                                                                        <div className="validation-errors">
                                                                                            <span>
                                                                                                {
                                                                                                    selectedWorkExpErrors.find(x => x.key === 'start_month')?.message
                                                                                                }
                                                                                            </span>
                                                                                        </div>
                                                                                        <div className="validation-errors">
                                                                                            <span>
                                                                                                {
                                                                                                    selectedWorkExpErrors.find(x => x.key === 'start_year')?.message
                                                                                                }
                                                                                            </span>
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
                                                                                                value={selectedWorkExp.end_year?.id}
                                                                                                valueKey="id"
                                                                                                labelKey='name'
                                                                                                onSelect={(id, obj) => {
                                                                                                    setSelectedWorkExp(prevState => {
                                                                                                        return {
                                                                                                            ...prevState,
                                                                                                            end_year: obj
                                                                                                        };
                                                                                                    });
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                        <div className="validation-errors">
                                                                                            <span>
                                                                                                {
                                                                                                    selectedWorkExpErrors.find(x => x.key === 'end_month')?.message
                                                                                                }
                                                                                            </span>
                                                                                        </div>
                                                                                        <div className="validation-errors">
                                                                                            <span>
                                                                                                {
                                                                                                    selectedWorkExpErrors.find(x => x.key === 'end_year')?.message
                                                                                                }
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <button
                                                                                    className="add-more-experience"
                                                                                    onClick={addMoreExperience}
                                                                                >
                                                                                    <BsPlusLg className="mr-2" />
                                                                                    {
                                                                                        !isEditSelectedWorkExp.status ?
                                                                                            'Add More Experience'
                                                                                            :
                                                                                            'Edit Selected Experience'
                                                                                    }
                                                                                </button>
                                                                            </div>
                                                                            <hr />
                                                                            <div className="portfolio">
                                                                                <h3>Portfolio</h3>
                                                                                {
                                                                                    teammer.portfolioList.length > 0 && teammer.portfolioList.map((item, index) =>
                                                                                        <div
                                                                                            key={index}
                                                                                            className="portfolio-links"
                                                                                        >
                                                                                            <Link href={item} passHref>
                                                                                                <a>{item}</a>
                                                                                            </Link>
                                                                                            <Button
                                                                                                onClick={() => {
                                                                                                    portfolioFunction('remove', item);
                                                                                                }}
                                                                                            >
                                                                                                <FaRegTrashAlt />
                                                                                            </Button>
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                                <div className="portfolio-add">
                                                                                    <Input
                                                                                        placeholder="Enter link"
                                                                                        onChange={(e) => setPortfolioLink(e)}
                                                                                        className="w-100 mr-2"
                                                                                        value={portfolioLink}
                                                                                    />
                                                                                    <Button
                                                                                        onClick={() => portfolioFunction('add')}
                                                                                    >
                                                                                        <BsPlusLg
                                                                                            className="mr-2 " />
                                                                                    </Button>
                                                                                </div>
                                                                                <hr />
                                                                            </div>
                                                                            <div className="step_form">
                                                                                <h3>Social media accounts</h3>
                                                                                {/* social media form */}
                                                                                <Form
                                                                                    className="mt-3"
                                                                                    onSubmit={(e, data) => confirm_step_3(data)}
                                                                                >
                                                                                    <Form.Group
                                                                                        controlId="twitter">
                                                                                        <Form.ControlLabel>Twitter</Form.ControlLabel>
                                                                                        <Form.Control
                                                                                            name="twitter"
                                                                                            type="url"
                                                                                            placeholder="https://www.twitter.com/margaretbrown" />
                                                                                    </Form.Group>
                                                                                    <Form.Group
                                                                                        controlId="facebook">
                                                                                        <Form.ControlLabel>Facebook</Form.ControlLabel>
                                                                                        <Form.Control
                                                                                            name="facebook"
                                                                                            type="url"
                                                                                            placeholder="https://www.facebook.com/margaretbrown" />
                                                                                    </Form.Group>
                                                                                    <Form.Group controlId="github">
                                                                                        <Form.ControlLabel>Github</Form.ControlLabel>
                                                                                        <Form.Control name="github"
                                                                                            type="url"
                                                                                            placeholder="https://www.github.com/margaretbrown" />
                                                                                    </Form.Group>
                                                                                    <Form.Group
                                                                                        controlId="behance">
                                                                                        <Form.ControlLabel>Behance</Form.ControlLabel>
                                                                                        <Form.Control
                                                                                            name="behance"
                                                                                            type="url"
                                                                                            placeholder="http://www.behance.net/margaretbrown" />
                                                                                    </Form.Group>
                                                                                    <Form.Group
                                                                                        controlId="dribble">
                                                                                        <Form.ControlLabel>Dribble</Form.ControlLabel>
                                                                                        <Form.Control
                                                                                            name="dribble"
                                                                                            type="url"
                                                                                            placeholder="http://www.dribble.com/margaretbrown" />
                                                                                    </Form.Group>
                                                                                    <Form.Group
                                                                                        controlId="linkedin">
                                                                                        <Form.ControlLabel>Linkedin</Form.ControlLabel>
                                                                                        <Form.Control
                                                                                            name="linkedin"
                                                                                            type="url"
                                                                                            placeholder="https://www.linkedin.com/margaretbrown" />
                                                                                    </Form.Group>
                                                                                    <div className="validation-errors">
                                                                                        {
                                                                                            teammerStepValidations.step_2.map((item, index) => {
                                                                                                if (item.key === "step_2_final") {
                                                                                                    return <span key={index}>{item.message}</span>
                                                                                                };
                                                                                            })
                                                                                        }
                                                                                    </div>
                                                                                    <div className="navigation-btn-wrapper">
                                                                                        <Button
                                                                                            type="button"
                                                                                            onClick={() => setCurrent(1)}
                                                                                        >
                                                                                            Previous
                                                                                        </Button>
                                                                                        <Button
                                                                                            type="submit"
                                                                                        >
                                                                                            Next
                                                                                        </Button>
                                                                                    </div>
                                                                                </Form>
                                                                            </div>
                                                                        </div>
                                                                }
                                                            </div>
                                                        }
                                                    />
                                            }
                                            {/* STEP 4 */}
                                            {
                                                selectedUserType === "1" ?
                                                    <Steps.Item
                                                        className='_step-item'
                                                        title="Who are you looking for in your team?"
                                                        description={
                                                            <div className='step-form'>
                                                                {
                                                                    jobList.length > 0 && jobList.map((item, index) =>
                                                                        item.position && (
                                                                            <div key={index}>
                                                                                <div
                                                                                    className="edit-header d-flex justify-content-between align-items-baseline"
                                                                                >
                                                                                    <div className="job-title">
                                                                                        <h5>Position: {' '}{' '}</h5>
                                                                                    </div>
                                                                                    <p>
                                                                                        {item.position.name}
                                                                                    </p>
                                                                                    <MdModeEditOutline
                                                                                        className='c-pointer'
                                                                                        onClick={() => editSelectedJob(index)}
                                                                                    />
                                                                                </div>
                                                                                <hr />
                                                                            </div>
                                                                        )
                                                                    )
                                                                }
                                                                <div className="position_details">
                                                                    {/* add position form */}
                                                                    <Form>
                                                                        <Form.Group>
                                                                            <Form.ControlLabel>
                                                                                Job Position
                                                                            </Form.ControlLabel>
                                                                            <InputPicker
                                                                                size="lg"
                                                                                className="w-100 mb-2"
                                                                                placeholder="Job Position"
                                                                                data={publicDatas.positionList}
                                                                                value={selectedJob.position?.id}
                                                                                valueKey="id"
                                                                                labelKey='name'
                                                                                onSelect={(id, obj) => {
                                                                                    setSelectedJob(prevState => {
                                                                                        return {
                                                                                            ...prevState,
                                                                                            position: obj
                                                                                        };
                                                                                    });
                                                                                }}
                                                                            />
                                                                            <div className="validation-errors">
                                                                                <span>
                                                                                    {
                                                                                        selectedJobErrors.find(x => x.key === 'position')?.message
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        </Form.Group>
                                                                        <Form.Group>
                                                                            <InputPicker
                                                                                size="lg"
                                                                                className="w-100 mb-2"
                                                                                placeholder="Location"
                                                                                data={publicDatas.locationList}
                                                                                value={selectedJob.location?.id}
                                                                                valueKey="id"
                                                                                labelKey='name'
                                                                                onSelect={(id, obj) => {
                                                                                    setSelectedJob(prevState => {
                                                                                        return {
                                                                                            ...prevState,
                                                                                            location: obj
                                                                                        };
                                                                                    });
                                                                                }}
                                                                            />
                                                                            <div className="validation-errors">
                                                                                <span>
                                                                                    {
                                                                                        selectedJobErrors.find(x => x.key === 'location')?.message
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        </Form.Group>
                                                                        <Form.Group>
                                                                            <InputPicker
                                                                                size="lg"
                                                                                className="w-100 mb-2"
                                                                                placeholder="Job type"
                                                                                data={publicDatas.jobTypeList}
                                                                                value={selectedJob.type?.id}
                                                                                valueKey="id"
                                                                                labelKey='name'
                                                                                onSelect={(id, obj) => {
                                                                                    setSelectedJob(prevState => {
                                                                                        return {
                                                                                            ...prevState,
                                                                                            type: obj
                                                                                        };
                                                                                    });
                                                                                }}
                                                                            />
                                                                            <div className="validation-errors">
                                                                                <span>
                                                                                    {
                                                                                        selectedJobErrors.find(x => x.key === 'type')?.message
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        </Form.Group>
                                                                        <Form.Group>
                                                                            <InputPicker
                                                                                size="lg"
                                                                                placeholder="Payment"
                                                                                className="w-100 mb-2"
                                                                                data={publicDatas.paymentTypeList}
                                                                                value={selectedJob.payment?.id}
                                                                                valueKey="id"
                                                                                labelKey='name'
                                                                                onSelect={(id, obj) => {
                                                                                    setSelectedJob(prevState => {
                                                                                        return {
                                                                                            ...prevState,
                                                                                            payment: obj
                                                                                        };
                                                                                    });
                                                                                }}
                                                                            />
                                                                            <div className="validation-errors">
                                                                                <span>
                                                                                    {
                                                                                        selectedJobErrors.find(x => x.key === 'payment')?.message
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        </Form.Group>
                                                                        <Form.Group>
                                                                            <div className='d-flex justify-content-between align-items-baseline'>
                                                                                <Input
                                                                                    type="number"
                                                                                    min={0}
                                                                                    placeholder='Salary'
                                                                                    value={selectedJob.salary || ''}
                                                                                    onChange={(e) => {
                                                                                        setSelectedJob(prevState => {
                                                                                            return {
                                                                                                ...prevState,
                                                                                                salary: e
                                                                                            };
                                                                                        });
                                                                                    }}
                                                                                />
                                                                                <InputPicker
                                                                                    size="lg"
                                                                                    style={{
                                                                                        maxWidth: '100px',
                                                                                        marginLeft: "5px"
                                                                                    }}
                                                                                    className="w-100 mb-2"
                                                                                    placeholder="Periods"
                                                                                    data={[
                                                                                        {
                                                                                            id: 1,
                                                                                            name: 'hour',
                                                                                        }, {
                                                                                            id: 2,
                                                                                            name: 'day',
                                                                                        }, {
                                                                                            id: 3,
                                                                                            name: 'week',
                                                                                        }, {
                                                                                            id: 4,
                                                                                            name: 'month',
                                                                                        }
                                                                                    ]}
                                                                                    valueKey="id"
                                                                                    labelKey='name'
                                                                                    value={selectedJob.period?.id}
                                                                                    onSelect={(id, obj) => {
                                                                                        setSelectedJob(prevState => {
                                                                                            return {
                                                                                                ...prevState,
                                                                                                period: obj
                                                                                            };
                                                                                        });
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                            <div className="validation-errors">
                                                                                <span>
                                                                                    {
                                                                                        selectedJobErrors.find(x => x.key === 'salary')?.message
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                            <div className="validation-errors">
                                                                                <span>
                                                                                    {
                                                                                        selectedJobErrors.find(x => x.key === 'period')?.message
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        </Form.Group>
                                                                        <Form.Group>
                                                                            <Form.ControlLabel>Years of experience</Form.ControlLabel>
                                                                            <InputNumber
                                                                                min={0}
                                                                                max={50}
                                                                                className="w-100"
                                                                                value={selectedJob.experience}
                                                                                onChange={(e) => {
                                                                                    setSelectedJob(prevState => {
                                                                                        return {
                                                                                            ...prevState,
                                                                                            experience: e
                                                                                        };
                                                                                    });
                                                                                }}
                                                                            />
                                                                            <div className="validation-errors">
                                                                                <span>
                                                                                    {
                                                                                        selectedJobErrors.find(x => x.key === 'experience')?.message
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        </Form.Group>
                                                                        <Form.Group>
                                                                            <Form.ControlLabel>Description about Job Position</Form.ControlLabel>
                                                                            {
                                                                                isEditorLoaded ?
                                                                                    <CKEditor
                                                                                        name={"name"}
                                                                                        editor={ClassicEditor}
                                                                                        data={selectedJob.description || ''}
                                                                                        onChange={(event, editor) => {
                                                                                            const data = editor.getData();

                                                                                            setSelectedJob(prevState => {
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
                                                                            <div className="validation-errors">
                                                                                <span>
                                                                                    {
                                                                                        selectedJobErrors.find(x => x.key === 'description')?.message
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        </Form.Group>
                                                                        <button
                                                                            type='button'
                                                                            className="add-more-experience"
                                                                            onClick={addMorePosition}
                                                                        >
                                                                            <BsPlusLg className="mr-2" />
                                                                            {
                                                                                !isEditSelectedWorkExp.status ?
                                                                                    'Add New Job Position'
                                                                                    :
                                                                                    'Edit Selected Job Position'
                                                                            }
                                                                        </button>
                                                                        <div className="validation-errors">
                                                                            {
                                                                                ownerStepValidations.step_3.map((item, index) => {
                                                                                    if (item.key === "final") {
                                                                                        return <span key={index}>{item.message}</span>
                                                                                    };
                                                                                })
                                                                            }
                                                                        </div>
                                                                        <div className="my-4">
                                                                            {
                                                                                ownerResponseErrors.map((item, index) => {
                                                                                    return <p
                                                                                        key={index}
                                                                                        className="text-danger font-weight-bold"
                                                                                    >
                                                                                        {item}
                                                                                    </p>
                                                                                })
                                                                            }
                                                                        </div>
                                                                        <div className="navigation-btn-wrapper">
                                                                            <Button
                                                                                type="button"
                                                                                onClick={() => setCurrentStep(2)}
                                                                            >
                                                                                Previous
                                                                            </Button>
                                                                            <Button
                                                                                type='button'
                                                                                onClick={() => {
                                                                                    if (validateStep(3)) {
                                                                                        submitOwnerData();
                                                                                    };
                                                                                }}
                                                                            >
                                                                                Submit
                                                                            </Button>
                                                                        </div>
                                                                    </Form>
                                                                </div>
                                                            </div>
                                                        }
                                                    />
                                                    :
                                                    <Steps.Item
                                                        className='_step-item'
                                                        title="Profile information"
                                                        description={
                                                            <div className="profile_information">
                                                                <div className="upload-avatar-wrapper mb-4">
                                                                    <input
                                                                        type="file"
                                                                        name="myImage"
                                                                        className="d-none"
                                                                        ref={teammerImgRef}
                                                                        onChange={(e) => uploadFile(e, 'teammer-avatar')}
                                                                    />
                                                                    <div>
                                                                        <Image
                                                                            width={64}
                                                                            height={64}
                                                                            alt='icon'
                                                                            src={teammer.avatarUrl ? teammer.avatarUrl : '/img/upload_image.png'}
                                                                        />
                                                                        <button
                                                                            onClick={() => {
                                                                                teammerImgRef.current.click()
                                                                            }}
                                                                        >
                                                                            Upload New Photo
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <h4
                                                                    style={{
                                                                        fontWeight: 600,
                                                                        fontSize: '12px',
                                                                        lineHeight: '15px',
                                                                        color: '#020c40'
                                                                    }}
                                                                >
                                                                    Description about yourself
                                                                </h4>
                                                                <Input
                                                                    as="textarea"
                                                                    rows={3}
                                                                    placeholder="Write something about yourself"
                                                                    onBlur={(e) => setTeammer(prevState => {
                                                                        return {
                                                                            ...prevState,
                                                                            about: e.target.value
                                                                        };
                                                                    })}
                                                                />
                                                                <div className="navigation-btn-wrapper">
                                                                    <Button
                                                                        type="button"
                                                                        onClick={() => setCurrentStep(2)}
                                                                    >
                                                                        Previous
                                                                    </Button>
                                                                    <Button
                                                                        onClick={() => {
                                                                            if (validateStep(3)) {
                                                                                submitTeammerData();
                                                                            };
                                                                        }}
                                                                    >
                                                                        Submit
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        } />
                                            }
                                        </Steps>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default steps2