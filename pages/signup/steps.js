import React, { useEffect, useRef, useState } from "react";
import { wrapper } from "../../src/store/redux-store";
import Link from "next/link";
import {
    Button,
    ButtonToolbar,
    Form,
    Input, InputGroup, InputNumber,
    InputPicker, Notification,
    Radio,
    RadioGroup,
    Steps,
    Tag,
    toaster,
    Uploader
} from "rsuite";
import { AiOutlineEdit } from 'react-icons/ai'
import { MdModeEditOutline } from 'react-icons/md';
import { BsPlusLg } from 'react-icons/bs'
import { FaRegTrashAlt } from 'react-icons/fa'
import axios from "axios";
import config from "../../src/configuration";
import { useRouter } from 'next/router'
import { log_in, setData } from "../../src/store/actions";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { setCookie } from "../../src/helpers/cookie";
import getAuth from "../../lib/session";
import {withCookie} from 'next-cookie'

const renderErrorMessages = err => {
    let errList = [];

    for (const [key, value] of Object.entries(err)) {
        value.map(item => errList.push(item))
    }

    return errList;
}

// month array
const months = [{
    label: 'January',
    value: 1
}, {
    label: 'February',
    value: 2
}, {
    label: 'March',
    value: 3
}, {
    label: 'April',
    value: 4
}, {
    label: 'May',
    value: 5
}, {
    label: 'June',
    value: 6
}, {
    label: 'July',
    value: 7
}, {
    label: 'August',
    value: 8
}, {
    label: 'September',
    value: 9
}, {
    label: 'Octaber',
    value: 10
}, {
    label: 'November',
    value: 11
}, {
    label: 'December',
    value: 12
}]

const buildFormData = (formData, data, parentKey) => {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
        Object.keys(data).forEach(key => {
            buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
        });
    } else {
        const value = data == null ? '' : data;
        formData.append(parentKey, value);
    }
}

const StepsComponent = (props) => {
    const editorRef = useRef();
    const { CKEditor, ClassicEditor } = editorRef.current || {};
    const [editorLoader, setEditorLoaded] = useState(false)
    const {cookie} = props
    const store = useSelector(store => store);

    const dispatch = useDispatch();

    const router = useRouter();

    const [find, setFind] = useState();
    const [back, setBack] = useState(false);
    const [person, setPerson] = useState({
        username: '',
        full_name: store.user?.full_name ? store.user?.full_name : '',
        location: '',
        role: ''
    })
    const [current, setCurrent] = useState(0);
    const [positionDetails, setPositionDetails] = useState([]);
    const [skills, setSkills] = useState([]);
    const [portfolios, setPortfolios] = useState([]);
    const [portfolio, setPortfolio] = useState('')
    const [experienceLevel, setExperienceLevel] = useState('');
    const [years, setYears] = useState([]);
    const [experience, setExperience] = useState([{
        position: '',
        company: '',
        location: '',
        start_date: {
            month: '',
            year: ''
        },
        end_date: {
            month: '',
            year: ''
        }
    }]);
    const [exp, setExp] = useState({
        position: '',
        company: '',
        location: '',
        start_date: {
            month: '',
            year: ''
        },
        end_date: {
            month: '',
            year: ''
        }
    });
    const [experienceCount, setExperinceCount] = useState(0);
    const [social_accounts, setSocialAccounts] = useState({})
    const [image, setImage] = useState({
        teammer: '',
        owner: ''
    });
    const [createObjectURL, setCreateObjectURL] = useState({
        teammer: '/img/upload_image.png',
        owner: '/img/upload_image.png'
    });
    const [description, setDescription] = useState('');
    const [cv, setCv] = useState({});

    const [editorText, setEditorText] = useState('');

    const [ownerInformation, setOwnerInformation] = useState({
        startupTitle: '',
        startupType: ''
    })

    const [team, setTeam] = useState({
        job_position: '',
        location: '',
        job_type: '',
        payment: '',
        salary: '',
        salary_periods: '',
        year_experience: '',
        descriptionEditorText: ''
    });
    const [teamArray, setTeamArray] = useState([{
        job_position: '',
        location: '',
        job_type: '',
        payment: '',
        salary: '',
        salary_periods: '',
        year_experience: '',
        descriptionEditorText: ''
    }]);

    const buttonRef = useRef();
    const ownerRef = useRef();
    let reactQuillRef = useRef();
    useEffect(() => {
        // if (!localStorage.getItem('teammers-access-token') && !localStorage.getItem('type')) {
        //     router.push("/signup");
        // } else {
        //     if (store.isAuth === "STARTUP_TYPE") {
        //         router.push('/owner/home');
        //     } else if (store.isAuth === "TEAMMER_TYPE") {
        //         router.push("/teammer/home");
        //     }
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
        };
        setEditorLoaded(true)
            let year_array = [];
            let nowDate = (new Date()).getFullYear();
            for (let i = 2000; i <= nowDate; i++) {
                year_array.push({
                    label: `${i}`,
                    value: i
                })
                setYears(year_array);
            }

    }, [store.isAuth, router])

    const nextButton = (c) => {
        if (c === 0) {
            find && setCurrent(1)
        }
    }
    const editButton = (c) => {
        setCurrent(c)
    }
    const handleChange = (data) => {
        setEditorText(data);
    }
    const portoflioAdd = (type, element) => {
        if (type === "add") {
            setPortfolios([...portfolios, portfolio]);
            setPortfolio('')
        } else {
            setPortfolios(portfolios.filter(item => item !== element))
        }

    }
    const experienceFunction = (key, data, index) => {
        setExp({
            ...exp,
            [key]: data
        })
        let element = experience.find((item, i) => i === index);
        element[key] = data;
        let newArray = experience.filter((item, i) => {
            if (i === index) {
                return element
            } else return item
        })
        setExperience(newArray)
    }
    const teamFunction = (key, data, index, type) => {
        setTeam({
            ...team,
            [key]: data
        });
        let element = teamArray.find((item, i) => i === index);
        element[key] = data;
        let newArray = teamArray.filter((item, i) => {
            if (i === index) {
                return element
            } else return item
        })
        setTeamArray(newArray);
    }
    const addMoreJobPosition = () => {
        // owner
        if (team.location &&
            team.job_position &&
            team.job_type &&
            team.payment &&
            team.salary &&
            team.year_experience && team.salary_periods) {
            setTeamArray([...teamArray, {
                job_position: '',
                location: [],
                job_type: [],
                payment: [],
                salary: '',
                salary_periods: '',
                year_experience: '',
                descriptionEditorText: ''
            }]);
            setTeam({
                job_position: '',
                location: [],
                job_type: [],
                payment: [],
                salary: '',
                salary_periods: '',
                year_experience: '',
                descriptionEditorText: ''
            });
            setExperinceCount(experienceCount + 1);
            reactQuillRef.current.editor.history.clear();
        } else {
            toaster.push(<Notification type={"error"} header="Failed confirmation!" closable>
                <p className="text-danger">An error occurred while filling in the information.
                    All boxes must be filled correctly</p>
            </Notification>, 'topEnd')
        }
    }
    const addMoreExperience = () => {
        // teaamer
        if (exp.position && exp.company && exp.location && exp.start_date.month &&
            exp.start_date.year && exp.end_date.month && exp.end_date.year) {
            setExperience([...experience, {
                position: '',
                company: '',
                location: '',
                start_date: {
                    month: '',
                    year: ''
                },
                end_date: {
                    month: '',
                    year: ''
                }
            }])
            setExp({
                position: '',
                company: '',
                location: '',
                start_date: {
                    month: '',
                    year: ''
                },
                end_date: {
                    month: '',
                    year: ''
                }
            });
            setExperinceCount(experienceCount + 1);
        } else {
            toaster.push(<Notification type={"error"} header="Failed confirmation!" closable>
                <p className="text-danger">An error occurred while filling in the information.
                    All boxes must be filled correctly</p>
            </Notification>, 'topEnd')
        }
    }
    const editWorkExperience = (index) => {
        let element = experience.find((item, i) => i === index);
        setExp(element);
        setExperinceCount(index)
    }
    const editLookingTeam = (index) => {
        let element = teamArray.find((item, i) => i === index);
        setTeam(element);
        setExperinceCount(index);
    }
    const getSocialDatas = (e) => {
        let formData = new FormData(e.target);
        let data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        setSocialAccounts(data)
        setCurrent(3)
    }
    const uploadToClient = (event, type) => {
            console.log(event.target.files)
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            setImage({
                ...image,
                [type]: i
            });
            setCreateObjectURL({
                ...createObjectURL,
                [type]: URL.createObjectURL(i)
            });
        }

        console.log('createObjectURL.owner', createObjectURL.owner);
    };
    const submitData = () => {
        let social_account = [];
        for (let [key, value] of Object.entries(social_accounts)) {
            (value && key !== "file") && social_account.push(value)
        }
        let body = {
            type: Number(find),
            positions: positionDetails,
            skills: skills,
            detail: {
                location_id: person.location,
                experience_level_id: experienceLevel,
                social_accounts: social_account,
                about: description,
                portfolio: portfolios
            },
            experiences: experience.map(item => {
                return {
                    location_id: item.location,
                    position_id: item.position,
                    company: item.company,
                    start_date: (item.start_date.month < 10 ? "0" + item.start_date.month : item.start_date.month) +
                        "-" + item.start_date.year,
                    end_date: (item.end_date.month < 10 ? "0" + item.end_date.month : item.end_date.month) +
                        "-" + item.end_date.year
                }
            }),
            username: person.username,
            full_name: person.full_name,
            photo: image.teammer,
            cv: cv.blobFile
        }
        console.log('data body', body);
        const formData = new FormData();
        buildFormData(formData, body);
        axios.post(config.BASE_URL + "auth/register-complete", formData, {
            headers: {
                "Authorization": "Bearer " + cookie.get('teammers-access-token')
            }
        })
            .then(res => {
                console.log('teammer type token', res.data.data)
                let data = res.data.data;
                // localStorage.setItem('teammers-access-token', data.token);
                // localStorage.setItem('type', 2);
                cookie.remove('teammers-type');
                cookie.set('teammers-type' , 2);
                cookies.set('user' , full_name)
                // dispatch(log_in('TEAMMER_TYPE'));
                dispatch(setData('user', person.full_name));
                router.push('/teammer/subscribe')
            })
            .catch(error => {
                console.log(error)
                toaster.push(<Notification type={"error"} header="Failed confirmation!" closable>
                    <p className="text-danger">An error occurred while filling in the information.
                        All boxes must be filled correctly</p>
                </Notification>, 'topEnd')
            })
        // router.push('/')
    };

    // console.log('log1', editorText, team.descriptionEditorText)

    const submitOwnerData = () => {

        let jobs = teamArray.map(item => {
            return {
                salary: item.salary,
                salary_period: item.salary_periods,
                years_of_experience: item.year_experience,
                payment_type_id: item.payment,
                type_id: item.job_type,
                location_id: item.location,
                position_id: item.job_position,
                // description: item.descriptionEditorText
                description: 'item.descriptionEditorText'
            }
        })
        let body = {
            type: 1,
            photo: image.owner,
            username: person.username,
            full_name: person.full_name,
            detail: {
                project_role_id: person.role
            },
            project: {
                title: ownerInformation.startupTitle,
                // description: editorText,
                description: 'editorText',
                type_id: ownerInformation.startupType,
                jobs: jobs
            }
        };

        const formData = new FormData();

        buildFormData(formData, body);

        axios.post(config.BASE_URL + "auth/register-complete", formData, {
            headers: {
                "Authorization": "Bearer " + cookie.get('teammers-access-token')
            }
        })
            .then(res => {
                console.log('startup owner type token',res.data.data)
                let data = res.data.data;

                // localStorage.setItem('type', 1);
                cookie.remove('teammers-type');
                cookie.set('teammers-type' , 1);
                // localStorage.setItem('teammers-access-token', data.token);
                // localStorage.setItem('type', data.user.type);
                // localStorage.setItem('user', JSON.stringify(data.user));
                cookie.set('user' , data.full_name);
                // setCookie('teammers-access-token', data.token)
                router.push('/signup/add-to-team');
            })
            .catch(error => {
                console.log(error)
                if (error?.response.status === 422) {
                    toaster.push(
                        <Notification type={"error"} header="Failed confirmation!" closable>
                            {
                                renderErrorMessages(error.response.data.error.validation).map(item =>
                                    <p className="text-danger">{item}</p>
                                )
                            }
                        </Notification>, 'topEnd'
                    );
                    return;
                }

                toaster.push(<Notification type={"error"} header="Failed confirmation!" closable>
                    <p className="text-danger">An error occurred while filling in the information.
                        All boxes must be filled correctly</p>
                </Notification>, 'topEnd')
            })
    };

    useEffect(() => {
        console.log('steps component props', props);
    }, [props])

    return <div className="container login">
        <div className="d-flex justify-content-between login-header">
            <Link href="/">
                <a className="navbar-brand">
                    <Image
                        src={'/LogoHeader.svg'}
                        alt='logo'
                        width={136}
                        height={18}
                    />
                </a>
            </Link>
            <Link href="/">
                <a>
                    <Image
                        src={'/icons/help.svg'}
                        alt='icon'
                        width={24}
                        height={24}
                    />
                    <span>Help</span>
                </a>
            </Link>
        </div>
        <div className="authenticate">
            <div className="image" style={{ backgroundImage: "url('/img/steps.png')" }}>
                <h2 className="text-center"><span>Tell us more about <br /> yourself</span></h2>
                <p className="text-center">Before exploring Teammers, make <br /> sure you build your profile.</p>
            </div>
            <div className="steps_form">
                <Steps current={current} vertical>
                    <Steps.Item
                        title={
                            <>Which one defines you? {current > 0 &&
                                <button
                                    className="edit"
                                    onClick={() => editButton(0)}
                                >
                                    <AiOutlineEdit />
                                </button>}
                            </>}
                        description={
                            (find && current !== 0) ? <div>
                                {
                                    find === "1" ? <p>I want to find teammates</p> :
                                        <p>I want to find startup team</p>
                                }
                            </div> : <div>
                                <RadioGroup name="list" value={find}>
                                    <Radio value="1" onChange={setFind}>I want to find teammates</Radio>
                                    <Radio value="2" onChange={setFind}>I want to find startup team</Radio>
                                </RadioGroup>
                                <div className="d-flex justify-content-end routing-button"><Button
                                    onClick={() => nextButton(current)}
                                    className="next-button">Next</Button>
                                </div>

                            </div>
                        } />
                    <Steps.Item
                        title={
                            <>
                                Contact Information {current > 1 &&
                                    <button className="edit" onClick={() => editButton(1)}><AiOutlineEdit /></button>}
                            </>}
                        description={
                            <div className="step_form">
                                {
                                    (current !== 0 && current !== 1) ? <div>
                                        <p className="summary_person"><span>Username</span>
                                            <span>{person.username}</span>
                                        </p>
                                        <p className="summary_person"><span>Full Name</span>
                                            <span>{person.full_name}</span></p>
                                        {find === "1" ?
                                            <p className="summary_person"><span>Role in Startup</span>
                                                <span>{props.roles.find(item => item.value === person.role)?.label}</span>
                                            </p> :
                                            <p className="summary_person"><span>Location</span>
                                                <span>{person.location}</span>
                                            </p>}
                                    </div> : <Form>
                                        <Form.Group controlId="username">
                                            {
                                                find === "1" && <div className="profile_information mb-4">
                                                    <input
                                                        type="file"
                                                        name="myImage"
                                                        className="d-none"
                                                        ref={ownerRef}
                                                        onChange={(e) => uploadToClient(e, 'owner')}
                                                    />
                                                    <div>
                                                        <Image
                                                            src={createObjectURL.owner}
                                                            alt='icon'
                                                            width={64}
                                                            height={64}
                                                        />
                                                        <button
                                                            onClick={() => {
                                                                ownerRef.current.click()
                                                            }}
                                                        >
                                                            Upload New Photo
                                                        </button>
                                                    </div>
                                                </div>
                                            }
                                            <Form.ControlLabel>Username</Form.ControlLabel>
                                            <Form.Control
                                                name="username"
                                                value={person.username}
                                                onChange={(e) => setPerson({
                                                    ...person,
                                                    username: e
                                                })}
                                                type="text"
                                                placeholder="Username"
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="first_name">
                                            <Form.ControlLabel>Full Name</Form.ControlLabel>
                                            <Form.Control
                                                type="text"
                                                name="full_name"
                                                placeholder="Full Name"
                                                value={person.full_name}
                                                onChange={(e) => setPerson({
                                                    ...person,
                                                    full_name: e
                                                })}
                                            />
                                        </Form.Group>
                                        {
                                            find === "1" ?
                                                <Form.Group>
                                                    <Form.ControlLabel>Roles in Startup</Form.ControlLabel>
                                                    <InputPicker
                                                        size="lg"
                                                        placeholder="Roles in Startup"
                                                        name="location"
                                                        data={props.roles}
                                                        value={person.role}
                                                        className="w-100 mb-2"
                                                        onChange={(e) => setPerson({
                                                            ...person,
                                                            role: e
                                                        })}
                                                    />
                                                </Form.Group>
                                                :
                                                <Form.Group>
                                                    <Form.ControlLabel>Location</Form.ControlLabel>
                                                    <InputPicker
                                                        size="lg"
                                                        placeholder="Location"
                                                        name="location" data={props.locations}
                                                        value={person.location}
                                                        className="w-100 mb-2"
                                                        onChange={
                                                            (e) => setPerson({
                                                                ...person,
                                                                location: e
                                                            })
                                                        }
                                                    />
                                                </Form.Group>
                                        }
                                        <div className="d-flex justify-content-end routing-button">
                                            <Button
                                                onClick={() => setCurrent(0)}
                                                type="button"
                                                className="previous-button">
                                                Previous
                                            </Button>
                                            <Form.Group>
                                                <ButtonToolbar>
                                                    <Button
                                                        className="next-button"
                                                        type="button"
                                                        onClick={() => {
                                                            if (find === '1') {
                                                                if (person.username && person.full_name && person.role && image.owner) {
                                                                    setCurrent(2)
                                                                } else {
                                                                    toaster.push(
                                                                        <Notification
                                                                            type={"error"}
                                                                            header="Failed confirmation!"
                                                                            closable
                                                                        >
                                                                            <p className="text-danger">
                                                                                An error occurred while filling in the information.
                                                                                All boxes must be filled correctly
                                                                            </p>
                                                                        </Notification>, 'topEnd'
                                                                    )
                                                                }
                                                            }
                                                            if (find === '2') {
                                                                if (person.username && person.full_name && person.location) {
                                                                    setCurrent(2)
                                                                } else {
                                                                    toaster.push(
                                                                        <Notification
                                                                            type={"error"}
                                                                            header="Failed confirmation!"
                                                                            closable
                                                                        >
                                                                            <p className="text-danger">
                                                                                An error occurred while filling in the information.
                                                                                All boxes must be filled correctly
                                                                            </p>
                                                                        </Notification>, 'topEnd'
                                                                    )
                                                                }
                                                            }

                                                            // if (person.username && person.full_name && person.role && image.owner
                                                            // ) {
                                                            //     setCurrent(2)
                                                            // } else {
                                                            //     toaster.push(
                                                            //         <Notification
                                                            //             type={"error"}
                                                            //             header="Failed confirmation!"
                                                            //             closable
                                                            //         >
                                                            //             <p className="text-danger">
                                                            //                 An error occurred while filling in the information.
                                                            //                 All boxes must be filled correctly
                                                            //             </p>
                                                            //         </Notification>, 'topEnd'
                                                            //     )
                                                            // }
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
                        } />
                    {
                        find === "1" ? <Steps.Item title={<>Startup information {current > 2 &&
                            <button className="edit" onClick={() => editButton(2)}><AiOutlineEdit /></button>}</>}
                            description={
                                (current !== 0 && current !== 1 && current !== 2) ? (
                                    find === "1" ? <div>
                                        <p className="summary_person"><span>Startup Title</span>
                                            <span>{ownerInformation.startupTitle}</span>
                                        </p>
                                        <p className="summary_person"><span>Startup Type</span>
                                            <span>{props.project_types.find(item => item.value === ownerInformation.startupType)?.label}</span>
                                        </p>
                                        <p className="summary_person"><span>Description</span>
                                            <span>{editorText.length > 10 ? editorText.slice(0,10)+"..." : editorText}</span>
                                        </p>
                                    </div> :
                                        <div>
                                            <p className="summary_person"><span>Position</span>
                                                <span>{positionDetails.map(item => props.positions.find(i => i.value === item)?.label)}</span>
                                            </p>
                                            <p className="summary_person">
                                                <span>Experience level</span>
                                                <span>{props.experience_levels.find(i => i.value === experienceLevel)?.label}</span>
                                            </p>
                                            <p className="summary_person"><span>Skills</span>
                                                <span>{skills.map(item => props.skills.find(i => i.value === item)?.label)}</span>
                                            </p>
                                            <p className="summary_person">
                                                <span>Work experience</span>
                                                <span>....</span>
                                            </p>
                                            <p className="summary_person"><span>Portfolio</span>
                                                <span>....</span>
                                            </p>
                                            <p className="summary_person">
                                                <span>Social media accounts</span>
                                                <span>....</span>
                                            </p>
                                        </div>
                                ) : <div>
                                    <Form>
                                        <Form.Group controlId="title">
                                            <Form.ControlLabel>Startup Title</Form.ControlLabel>
                                            <Form.Control name="title"
                                                value={ownerInformation.startupTitle}
                                                onChange={(e) => setOwnerInformation({
                                                    ...ownerInformation,
                                                    startupTitle: e
                                                })} type="text"
                                                placeholder="Startup Title" />
                                        </Form.Group>
                                        <Form className="Group">
                                            <Form.ControlLabel>Startup type</Form.ControlLabel>
                                            <InputPicker
                                                size="lg"
                                                placeholder="Startup type"
                                                name="type"
                                                className="w-100 mb-2"
                                                data={props.project_types}
                                                value={ownerInformation.startupType}
                                                onChange={(e) => setOwnerInformation({
                                                    ...ownerInformation,
                                                    startupType: e
                                                })}
                                            />
                                        </Form>
                                        <Form.Group className="mt-2">
                                            <Form.ControlLabel>Description about startup</Form.ControlLabel>
                                            {/*<ReactQuill*/}
                                            {/*    className="mt-2"*/}
                                            {/*    defaultValue={editorText}*/}
                                            {/*    style={{ height: '10rem' }}*/}
                                            {/*    onChange={handleChange}*/}
                                            {/*/>*/}
                                            {editorLoader ? <CKEditor
                                                style={{maxWidth : "400px"}}
                                                name={"name"}
                                                editor={ClassicEditor}
                                                data={editorText}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    // console.log({ event, editor, data })
                                                    // onChange(data);
                                                    console.log(data)
                                                    handleChange(data)
                                                }}
                                            /> : ''}
                                        </Form.Group>
                                    </Form>
                                    <div className="d-flex justify-content-end routing-button"
                                        style={{
                                            marginTop: '56px'
                                        }}>
                                        <Button
                                            onClick={() => setCurrent(1)}
                                            type="button"
                                            className="previous-button">
                                            Previous
                                        </Button>
                                        <Form.Group>
                                            <ButtonToolbar>
                                                <Button
                                                    onClick={() => {
                                                        if (ownerInformation.startupTitle && ownerInformation.startupType) {
                                                            setCurrent(3)
                                                        } else {
                                                            toaster.push(
                                                                <Notification
                                                                    type={"error"}
                                                                    header="Failed confirmation!"
                                                                    closable
                                                                >
                                                                    <p className="text-danger">
                                                                        An error occurred while filling in the information.
                                                                        All boxes must be filled correctly
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
                            } /> : <Steps.Item title={<>Position details {current > 2 &&
                                <button className="edit" onClick={() => editButton(2)}>
                                    <AiOutlineEdit /></button>}</>}
                                description={
                                    (current !== 0 && current !== 1 && current !== 2) ?
                                        <div>
                                            <p className="summary_person">
                                                <span>Position</span>
                                                <span>{positionDetails.map(item => props.positions.find(i => i.value === item)?.label)}</span>
                                            </p>
                                            <p className="summary_person"><span>Experience level</span>
                                                <span>{props.experience_levels.find(i => i.value === experienceLevel)?.label}</span>
                                            </p>
                                            <p className="summary_person">
                                                <span>Skills</span>
                                                <span>{skills.map(item => props.skills.find(i => i.value === item)?.label)}</span>
                                            </p>
                                            <p className="summary_person"><span>Work experience</span>
                                                <span>....</span>
                                            </p>
                                            <p className="summary_person">
                                                <span>Portfolio</span>
                                                <span>....</span>
                                            </p>
                                            <p className="summary_person"><span>Social media accounts</span>
                                                <span>....</span>
                                            </p>
                                        </div> :
                                        <div className="position_details">
                                            <InputPicker
                                                size="lg"
                                                className="w-100"
                                                placeholder="Position"
                                                data={props.positions}
                                                onChange={(e) => {
                                                    if (e && !positionDetails.some(i => i === e))
                                                        setPositionDetails([...positionDetails, e])
                                                }}
                                            />
                                            {
                                                positionDetails.length > 0 && positionDetails.map((item, index) => {
                                                    return <Tag key={index}
                                                        onClose={() => {
                                                            let data = positionDetails.filter(i => i !== item);
                                                            setPositionDetails(data)
                                                        }
                                                        } closable
                                                        className="close-tag my-2">{props.positions.find(i => i.value === item)?.label}</Tag>
                                                })
                                            }
                                            <InputPicker size="lg"
                                                placeholder="Experience Level"
                                                onChange={(e) => setExperienceLevel(e)}
                                                data={props.experience_levels}
                                                className="w-100 my-2" />
                                            <InputPicker size="lg"
                                                placeholder="Skills"
                                                onChange={(e) => {
                                                    if (e && !skills.some(i => i === e))
                                                        setSkills([...skills, e])
                                                }
                                                }
                                                data={props.skills}
                                                className="w-100 my-2" />
                                            {
                                                skills.length > 0 && skills.map((item, index) => {
                                                    return <Tag key={index}
                                                        onClose={() => {
                                                            let data = skills.filter(i => i !== item);
                                                            setSkills(data)
                                                        }
                                                        } closable
                                                        className="close-tag my-2">{props.skills.find(i => i.value === item)?.label}</Tag>
                                                })
                                            }
                                            <h3>Work Experience</h3>
                                            <div
                                                className="work-experience-summary">
                                                {
                                                    experience.map((item, index) =>
                                                        <div key={index}>
                                                            <p><span
                                                                className="from-date">{item.start_date.month && months.find((el) => el.value === item.start_date.month)?.label} {item.start_date.year}</span><span
                                                                    className="to-date"> -{item.end_date.month && months.find((el) => el.value === item.end_date.month)?.label} {item.end_date.year}</span>
                                                            </p>
                                                            <div
                                                                className="edit-header">
                                                                <div
                                                                    className="job-title">
                                                                    <h3>{props.positions.find(i => i.value === item.position)?.label}</h3>
                                                                    <p>{item.company} / {props.locations.find(i => i.value === item.location)?.label}</p>
                                                                </div>
                                                                <button
                                                                    onClick={() => editWorkExperience(index)}>
                                                                    <MdModeEditOutline />
                                                                </button>
                                                            </div>
                                                        </div>)
                                                }
                                                <hr className="mt-0" />
                                                <div className="job-section">
                                                    <div className="job-divs">
                                                        <h4>Position</h4>
                                                        <InputPicker
                                                            size="lg"
                                                            data={props.positions}
                                                            value={exp.position}
                                                            onChange={(e) => experienceFunction('position', e, experienceCount)}
                                                            placeholder="Type your position"
                                                            className="w-100"
                                                        />
                                                    </div>
                                                    <div className="job-divs">
                                                        <h4>Company</h4>
                                                        <Input
                                                            placeholder="Enter Company name"
                                                            value={exp.company}
                                                            onChange={(e) => experienceFunction('company', e, experienceCount)} />
                                                    </div>
                                                    <div className="job-divs">
                                                        <h4>Location</h4>
                                                        <InputPicker
                                                            size="lg"
                                                            data={props.locations}
                                                            value={exp.location}
                                                            onChange={(e) => experienceFunction('location', e, experienceCount)}
                                                            placeholder="Your location"
                                                            className="w-100"
                                                        />
                                                    </div>
                                                    <div className="job-divs">
                                                        <h4>Start date</h4>
                                                        <div
                                                            className="d-flex justify-content-between">
                                                            <InputPicker size="lg"
                                                                placeholder="Months"
                                                                onChange={(e) => experienceFunction('start_date', {
                                                                    month: e,
                                                                    year: exp.start_date.year
                                                                }, experienceCount)}
                                                                value={exp.start_date.month}
                                                                data={months}
                                                                className="w-100 my-2 mr-2"
                                                                style={{
                                                                    width: "232px"
                                                                }} />
                                                            <InputPicker size="lg"
                                                                placeholder="Years"
                                                                onChange={(e) => experienceFunction('start_date', {
                                                                    month: exp.start_date.month,
                                                                    year: e
                                                                }, experienceCount)}
                                                                value={exp.start_date.year}
                                                                data={years}
                                                                className="w-100 my-2"
                                                                style={{
                                                                    maxWidth: "130px"
                                                                }} />
                                                        </div>
                                                    </div>
                                                    <div className="job-divs">
                                                        <h4>End date</h4>
                                                        <div
                                                            className="d-flex justify-content-between">
                                                            <InputPicker size="lg"
                                                                placeholder="Months"
                                                                onChange={(e) => experienceFunction('end_date', {
                                                                    month: e,
                                                                    year: exp.end_date.year
                                                                }, experienceCount)}
                                                                value={exp.end_date.month}
                                                                data={months}
                                                                className="w-100 my-2 mr-2"
                                                                style={{
                                                                    width: "232px"
                                                                }} />
                                                            <InputPicker size="lg"
                                                                placeholder="Years"
                                                                onChange={(e) => experienceFunction('end_date', {
                                                                    month: exp.end_date.month,
                                                                    year: e
                                                                }, experienceCount)}
                                                                value={exp.end_date.year}
                                                                data={years}
                                                                className="w-100 my-2"
                                                                style={{
                                                                    maxWidth: "130px"
                                                                }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    className="add-more-experience"
                                                    onClick={addMoreExperience}>
                                                    <BsPlusLg
                                                        className="mr-2" /> Add More
                                                    Experience
                                                </button>
                                            </div>
                                            <hr />
                                            <div className="portfolio">
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
                                                        <BsPlusLg className="mr-2 " />
                                                    </Button>
                                                </div>
                                                <hr />
                                            </div>
                                            <div className="step_form">
                                                <h3>Social media accounts</h3>
                                                <Form
                                                    onSubmit={(e, data) => getSocialDatas(data)}
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
                                                    <Uploader className="upload"
                                                        onChange={(fileList, fileType) => setCv(fileList[0])}
                                                        action="" maxPreviewFileSize={2}>
                                                        <button type="button">
                                                            Import from Linkedin
                                                        </button>
                                                    </Uploader>
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
                                } />}
                    {
                        find === "1" ? <Steps.Item
                            title="Who are you looking for in your team?"
                            description={
                                <div>
                                    {
                                        teamArray.length > 0 && teamArray.map((item, index) =>
                                            item.job_position && <div key={index}>
                                                <div
                                                    className="edit-header d-flex justify-content-between align-items-baseline">
                                                    <div className="job-title">
                                                        <h5>Position: {' '}{' '}</h5>
                                                    </div>
                                                    <p>{props.positions.find(i => i.value === item.job_position)?.label}</p>
                                                    <MdModeEditOutline onClick={() => editLookingTeam(index)} />
                                                </div>
                                                <hr />
                                            </div>)
                                    }
                                    <div className="position_details">
                                        <Form>
                                            <Form.Group>
                                                <Form.ControlLabel>
                                                    Job Position
                                                </Form.ControlLabel>
                                                <InputPicker
                                                    size="lg"
                                                    className="w-100 mb-2"
                                                    placeholder="Job Position"
                                                    onChange={(e) => teamFunction('job_position', e, experienceCount)}
                                                    value={team.job_position}
                                                    data={props.positions}
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <InputPicker size="lg"
                                                    placeholder="Location"
                                                    onChange={(e) => teamFunction('location', e, experienceCount)}
                                                    value={team.location}
                                                    data={props.locations}
                                                    className="w-100 mb-2"
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <InputPicker size="lg"
                                                    placeholder="Job type"
                                                    onChange={(e) => teamFunction('job_type', e, experienceCount)}
                                                    value={team.job_type}
                                                    data={props.job_types}
                                                    className="w-100 mb-2" />
                                            </Form.Group>
                                            <Form.Group>
                                                <InputPicker size="lg"
                                                    placeholder="Payment"
                                                    onChange={(e) => teamFunction('payment', e, experienceCount)}
                                                    value={team.payment}
                                                    data={props.paymet_types}
                                                    className="w-100 mb-2" />
                                            </Form.Group>
                                            <Form.Group className="d-flex justify-content-between align-items-baseline">
                                                <Input type="number" min={0} placeholder='Salary' value={team.salary}
                                                    onChange={(e) => teamFunction('salary', e, experienceCount)} />
                                                <InputPicker style={{
                                                    maxWidth: '100px',
                                                    marginLeft : "5px"
                                                }} size="lg"
                                                    placeholder="Salary periods"
                                                    onChange={(e) => teamFunction('salary_periods', e, experienceCount)}
                                                    value={team.salary_periods}
                                                    data={[{
                                                        label: 'hour',
                                                        value: 1
                                                    }, {
                                                        label: 'day',
                                                        value: 2
                                                    }, {
                                                        label: 'week',
                                                        value: 3
                                                    }, {
                                                        label: 'month',
                                                        value: 4
                                                    }]}
                                                    className="w-100 mb-2" />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.ControlLabel>
                                                    Years of experience
                                                </Form.ControlLabel>
                                                <InputNumber
                                                    value={team.year_experience}
                                                    min={0}
                                                    className="w-100"
                                                    onChange={(e) =>
                                                        teamFunction('year_experience', e, experienceCount)
                                                    }
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.ControlLabel>
                                                    Description about Job Position
                                                </Form.ControlLabel>
                                                {/*<ReactQuill*/}
                                                {/*    style={{ height: '10rem' }}*/}
                                                {/*    ref={reactQuillRef}*/}
                                                {/*    defaultValue={team.descriptionEditorText}*/}
                                                {/*    onChange={(content, delta, source, editor) => {*/}
                                                {/*        const text = editor.getText(content);*/}
                                                {/*        teamFunction('descriptionEditorText', text, experienceCount);*/}
                                                {/*    }}*/}
                                                {/*    className="mt-2" />*/}
                                                {editorLoader ? <CKEditor
                                                    name={"name"}
                                                    editor={ClassicEditor}
                                                    data={team.descriptionEditorText}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        // console.log({ event, editor, data })
                                                        // onChange(data);
                                                        teamFunction('descriptionEditorText', data, experienceCount);
                                                    }}
                                                /> : ''}
                                            </Form.Group>
                                            <button
                                                style={{ margin: "2rem" }}
                                                className="add-more-experience"
                                                onClick={() => {
                                                    addMoreJobPosition()
                                                }}
                                            >
                                                <BsPlusLg className="mr-2" /> Add New Job Position
                                            </button>
                                            <div
                                                className="d-flex justify-content-end routing-button">
                                                <Button
                                                    onClick={() => setCurrent(2)}
                                                    type="button"
                                                    className="previous-button"
                                                >
                                                    Previous
                                                </Button>
                                                <Form.Group>
                                                    <ButtonToolbar>
                                                        <Button
                                                            onClick={submitOwnerData}
                                                            className="next-button"
                                                            type="button">
                                                            Submit
                                                        </Button>
                                                    </ButtonToolbar>
                                                </Form.Group>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            }
                        />
                            : <Steps.Item title="Profile information"
                                description={
                                    <div className="profile_information">
                                        <input type="file" name="myImage" className="d-none" ref={buttonRef}
                                            onChange={(e) => uploadToClient(e, 'teammer')} />
                                        <div>
                                            <Image
                                                src={createObjectURL.teammer}
                                                alt='icon'
                                                width={64}
                                                height={64}
                                            />
                                            <button onClick={() => {
                                                buttonRef.current.click()
                                            }
                                            }>Upload New Photo
                                            </button>
                                        </div>
                                        <h4>Description about yourself</h4>
                                        <Input as="textarea" onBlur={(e) => setDescription(e.target.value)}
                                            rows={3}
                                            placeholder="Write something about yourself" />
                                        <div className="d-flex justify-content-end routing-button"><Button
                                            onClick={() => setCurrent(2)}
                                            type="button"
                                            className="previous-button">Previous</Button>
                                            <div>
                                                <Button className="next-button" type="button"
                                                    onClick={submitData}>Submit</Button>
                                            </div>
                                        </div>
                                    </div>
                                } />
                    }
                </Steps>
            </div>
        </div>
    </div>
}
export default withCookie(StepsComponent);

export const getServerSideProps = async (context) => {
    const auth = getAuth(context);
    if (auth === "1")
        return {
            redirect: {
                destination: "/owner/home",
                permanent: false,
            },
        };
    else if (auth === "2")
        return {
            redirect: {
                destination: "/teammer/home",
                permanent: false,
            },
        };
    else if(!auth)
        return {
            redirect: {
                destination: "/signup",
                permanent: false,
            },
        };
    const fetchPositions = await fetch(config.BASE_URL + "positions");
    const positionsData = await fetchPositions.json();

    const fetchRoles = await fetch(config.BASE_URL + "project/roles");
    const roleData = await fetchRoles.json();

    const fetchProjectTypes = await fetch(config.BASE_URL + "project/types");
    const projectTypesData = await fetchProjectTypes.json();

    const fetchLocations = await fetch(config.BASE_URL + "locations");
    const locationData = await fetchLocations.json();

    const fetchJobTypes = await fetch(config.BASE_URL + "job/types");
    const jobTypesData = await fetchJobTypes.json();

    const fetchPaymentTypes = await fetch(config.BASE_URL + "job/payment_types");
    const paymentTypesData = await fetchPaymentTypes.json();

    const fetchSkills = await fetch(config.BASE_URL + "skills");
    const skillsData = await fetchSkills.json();

    const fetchExperienceLevels = await fetch(config.BASE_URL + "experience-levels");
    const experienceLevelsData = await fetchExperienceLevels.json();

    // 123123
    return {
        props: {
            positions: positionsData.data.items.map(item => {
                return {
                    value: item.id,
                    label: item.name ? item.name : ''
                }
            }),
            roles: roleData.data.map(item => {
                return {
                    value: item.id,
                    label: item.name ? item.name : ''
                }
            }),
            project_types: projectTypesData.data.map(item => {
                return {
                    value: item.id,
                    label: item.name ? item.name : ''
                }
            }),
            locations: locationData.data.items.map(item => {
                return {
                    value: item.id,
                    label: item.name ? item.name : ''
                }
            }),
            job_types: jobTypesData.data.map(item => {
                return {
                    value: item.id,
                    label: item.name ? item.name : ''
                }
            }),
            paymet_types: paymentTypesData.data.map(item => {
                return {
                    value: item.id,
                    label: item.name ? item.name : ''
                }
            }),
            experience_levels: experienceLevelsData.data.map(item => {
                return {
                    value: item.id,
                    label: item.name ? item.name : ''
                }
            }),
            skills: skillsData.data.items.map(item => {
                return {
                    value: item.id,
                    label: item.name ? item.name : ''
                }
            }),
        }
    }

}