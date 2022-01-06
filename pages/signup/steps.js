import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    ButtonToolbar,
    Form,
    Input, InputGroup, InputNumber,
    InputPicker, Notification,
    Radio,
    RadioGroup,
    Steps,
    Tag, toaster, Uploader
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
import ReactHtmlParser from 'react-html-parser'
import Image from "next/image";

const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;

const months = [
    {
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
    }] // month array
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

    useEffect(() => {
        console.log('aaa', props?.testData);
    }, [props])

    const router = useRouter();
    const dispatch = useDispatch()
    const [find, setFind] = useState();
    const [person, setPerson] = useState({
        username: '',
        full_name: '',
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
        location: [],
        job_type: [],
        payment: [],
        salary: '',
        salary_periods: '',
        year_experience: '',
        descriptionEditorText: ''
    });
    const [teamArray, setTeamArray] = useState([{
        job_position: '',
        location: [],
        job_type: [],
        payment: [],
        salary: '',
        salary_periods: '',
        year_experience: '',
        descriptionEditorText: ''
    }])
    const buttonRef = useRef();
    const ownerRef = useRef();
    const store = useSelector(store => store);
    useEffect(() => {
        if (store.isAuth === "STARTUP_TYPE") {
            router.push('/owner/home');
        }
        else if (store.isAuth === "TEAMMER_TYPE") {
            router.push("/teammer/home");
        }
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
    const handleChange = (content, delta, source, editor) => {
        setEditorText(content);
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
        if (key === 'location' || key === 'job_type' || key === 'payment') {
            let element = teamArray.find((item, i) => i === index);
            let newData = [];
            if (type === 'add') {
                if (data && !team[key].some(item => item === data)) newData = [...team[key], data]
                else newData = team[key];
            } else {
                newData = team[key].filter(item => item !== data)
            }
            setTeam({
                ...team,
                [key]: newData
            });
            element[key] = newData;
            let newArray = teamArray.filter((item, i) => {
                if (i === index) {
                    return element
                } else return item
            })
            setTeamArray(newArray);
        } else {
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
    }
    const addMoreJobPosition = () => {
        if (team.location.length > 0 &&
            team.job_position &&
            team.job_type.length > 0 &&
            team.payment.length > 0 &&
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
        }
    }
    const addMoreExperience = () => {
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
        const formData = new FormData();
        buildFormData(formData, body);
        axios.post(config.BASE_URL + "auth/register-complete", formData, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('accessToken')
            }
        })
            .then(res => {
                let data = res.data.data;
                localStorage.setItem('accessToken', data.token);
                localStorage.setItem('type', 2);
                dispatch(log_in('TEAMMER_TYPE'));
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
    }
    // console.log('log1', editorText, team.descriptionEditorText)
    const submitOwnerData = () => {

        let jobs = teamArray.map(item => {
            return {
                salary: item.salary,
                salary_period: item.salary_periods,
                years_of_experience: item.year_experience,
                pay_types: item.payment,
                types: item.job_type,
                locations: item.location,
                position_id: item.job_position,
                description: "item.descriptionEditorText"
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
                description: "editorText",
                type_id: ownerInformation.startupType,
                jobs: jobs
            }
        }
        const formData = new FormData();
        buildFormData(formData, body);
        axios.post(config.BASE_URL + "auth/register-complete", formData, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('accessToken')
            }
        })
            .then(res => {
                let data = res.data.data;
                // localStorage.setItem('accessToken', data.token);
                localStorage.setItem('type', 1);
                dispatch(log_in('SIGNUP_TYPE'));
                // dispatch(setData('user', person.full_name));
                router.push('/signup/add-to-team');
            })
            .catch(error => {
                console.log(error)
                toaster.push(<Notification type={"error"} header="Failed confirmation!" closable>
                    <p className="text-danger">An error occurred while filling in the information.
                        All boxes must be filled correctly</p>
                </Notification>, 'topEnd')
            })
    }

    return <div className="container login">
        <div className="d-flex justify-content-between login-header">
            <Link href="/">
                <a className="navbar-brand">
                    {/* <img src="/LogoHeader.svg" alt="logo" /> */}
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
                    {/* <img src="/icons/help.svg" /> */}
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
            <div className="image" style={{
                backgroundImage: "url('/img/steps.png')"
            }}>
                <h2 className="text-center"><span>Tell us more about <br /> yourself</span></h2>
                <p className="text-center">Before exploring Teammers, make <br /> sure you build your profile.</p>
            </div>
            <div className="steps_form">
                <Steps current={current} vertical>
                    <Steps.Item title={<>Which one defines you? {current > 0 &&
                        <button className="edit" onClick={() => editButton(0)}><AiOutlineEdit /></button>}</>}
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
                    <Steps.Item title={<>Contact Information {current > 1 &&
                        <button className="edit" onClick={() => editButton(1)}><AiOutlineEdit /></button>}</>}
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
                                            {find === "1" && <div className="profile_information mb-4">
                                                <input type="file" name="myImage" className="d-none"
                                                    ref={ownerRef}
                                                    onChange={(e) => uploadToClient(e, 'owner')} />
                                                <div>
                                                    <Image
                                                        src={createObjectURL.owner}
                                                        alt='icon'
                                                        width={64}
                                                        height={64}
                                                    />
                                                    <button onClick={() => {
                                                        ownerRef.current.click()
                                                    }
                                                    }>Upload New Photo
                                                    </button>
                                                </div>
                                            </div>}
                                            <Form.ControlLabel>Username</Form.ControlLabel>
                                            <Form.Control name="username" value={person.username}
                                                onChange={(e) => setPerson({
                                                    ...person,
                                                    username: e
                                                })} type="text" placeholder="Username" />
                                        </Form.Group>
                                        <Form.Group controlId="first_name">
                                            <Form.ControlLabel>Full Name</Form.ControlLabel>
                                            <Form.Control name="full_name" value={person.full_name}
                                                onChange={(e) => setPerson({
                                                    ...person,
                                                    full_name: e
                                                })} type="text" placeholder="Full Name    " />
                                        </Form.Group>
                                        {find === "1" ?
                                            <Form.Group>
                                                <Form.ControlLabel>Roles in Startup</Form.ControlLabel>
                                                <InputPicker size="lg" placeholder="Roles in Startup"
                                                    name="location" data={props.roles}
                                                    value={person.role}
                                                    onChange={(e) => setPerson({
                                                        ...person,
                                                        role: e
                                                    })} className="w-100 mb-2" />
                                            </Form.Group>
                                            :
                                            <Form.Group>
                                                <Form.ControlLabel>Location</Form.ControlLabel>
                                                <InputPicker size="lg" placeholder="Location"
                                                    name="location" data={props.locations}
                                                    value={person.location}
                                                    onChange={(e) => setPerson({
                                                        ...person,
                                                        location: e
                                                    })} className="w-100 mb-2" />
                                            </Form.Group>}
                                        <div className="d-flex justify-content-end routing-button"><Button
                                            onClick={() => setCurrent(0)}
                                            type="button"
                                            className="previous-button">Previous</Button><Form.Group>
                                                <ButtonToolbar>
                                                    <Button className="next-button" type="button"
                                                        onClick={() => setCurrent(2)}>Next</Button>
                                                </ButtonToolbar>
                                            </Form.Group>
                                        </div>
                                    </Form>
                                }
                            </div>
                        } />
                    {
                        find === "1" ? <Steps.Item title={<>Stratup information {current > 2 &&
                            <button className="edit" onClick={() => editButton(2)}><AiOutlineEdit /></button>}</>}
                            description={
                                (current !== 0 && current !== 1 && current !== 2) ? (
                                    find === "1" ? <div>
                                        <p className="summary_person"><span>Startup Title</span>
                                            <span>{ownerInformation.startupTitle}</span>
                                        </p>
                                        <p className="summary_person"><span>Startup Type</span>
                                            <span>{ownerInformation.startupType}</span>
                                        </p>
                                        <p className="summary_person"><span>Description</span>
                                            <span>{description}</span>
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
                                            <InputPicker size="lg" placeholder="Startup type"
                                                name="type" data={props.project_types}
                                                value={ownerInformation.startupTitle}
                                                onChange={(e) => setOwnerInformation({
                                                    ...ownerInformation,
                                                    startupType: e
                                                })} className="w-100 mb-2" />
                                        </Form>
                                        <Form.Group className="mt-2">
                                            <Form.ControlLabel>Description about
                                                startup</Form.ControlLabel>
                                            <ReactQuill style={{ height: '10rem' }}
                                                value={editorText}
                                                onChange={handleChange}
                                                className="mt-2" />
                                        </Form.Group>
                                    </Form>
                                    <div className="d-flex justify-content-end routing-button"
                                        style={{
                                            marginTop: '56px'
                                        }}>
                                        <Button
                                            onClick={() => setCurrent(1)}
                                            type="button"
                                            className="previous-button">Previous</Button><Form.Group>
                                            <ButtonToolbar>
                                                <Button onClick={() => setCurrent(3)}
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
                                            <InputPicker size="lg"
                                                placeholder="Position"
                                                onChange={(e) => {
                                                    if (e && !positionDetails.some(i => i === e))
                                                        setPositionDetails([...positionDetails, e])
                                                }}
                                                data={props.positions}
                                                className="w-100" />
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
                                                            placeholder="Select company"
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
                                                        placeholder="Select company"
                                                        onChange={(e) => setPortfolio(e)}
                                                        className="w-100 mr-2"
                                                        value={portfolio} />
                                                    <Button><BsPlusLg
                                                        className="mr-2 "
                                                        onClick={() => portoflioAdd('add')} /></Button>
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
                                                        action="">
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
                                                <InputPicker size="lg"
                                                    placeholder="Job Position"
                                                    onChange={(e) => teamFunction('job_position', e, experienceCount)}
                                                    value={team.job_position}
                                                    data={props.positions}
                                                    className="w-100 mb-2" />
                                            </Form.Group>
                                            <Form.Group>
                                                <InputPicker size="lg"
                                                    placeholder="Location"
                                                    onChange={(e) => teamFunction('location', e, experienceCount, 'add')}
                                                    value={team.location}
                                                    data={props.locations}
                                                    className="w-100 mb-2" />
                                                {
                                                    team.location.length > 0 && team.location.map((item, index) => {
                                                        return <Tag key={index}
                                                            onClose={() => {
                                                                teamFunction('location', item, experienceCount, 'remove')
                                                            }
                                                            } closable
                                                            className="close-tag my-2">{props.locations.find(i => i.value === item)?.label}</Tag>
                                                    })
                                                }
                                            </Form.Group>
                                            <Form.Group>
                                                <InputPicker size="lg"
                                                    placeholder="Job type"
                                                    onChange={(e) => teamFunction('job_type', e, experienceCount, 'add')}
                                                    value={team.job_type}
                                                    data={props.job_types}
                                                    className="w-100 mb-2" />
                                                {
                                                    team.job_type.length > 0 && team.job_type.map((item, index) => {
                                                        return <Tag key={index}
                                                            onClose={() => {
                                                                teamFunction('job_type', item, experienceCount, 'remove')
                                                            }
                                                            } closable
                                                            className="close-tag my-2">{props.job_types.find(i => i.value === item)?.label}</Tag>
                                                    })
                                                }
                                            </Form.Group>
                                            <Form.Group>
                                                <InputPicker size="lg"
                                                    placeholder="Payment"
                                                    onChange={(e) => teamFunction('payment', e, experienceCount, 'add')}
                                                    value={team.payment}
                                                    data={props.payments}
                                                    className="w-100 mb-2" />
                                                {
                                                    team.payment.length > 0 && team.payment.map((item, index) => {
                                                        return <Tag key={index}
                                                            onClose={() => {
                                                                teamFunction('payment', item, experienceCount, 'remove')
                                                            }
                                                            } closable
                                                            className="close-tag my-2">{props.payments.find(i => i.value === item)?.label}</Tag>
                                                    })
                                                }
                                            </Form.Group>
                                            <Form.Group className="d-flex justify-content-between align-items-baseline">
                                                <Input placeholder='Salary' value={team.salary}
                                                    onChange={(e) => teamFunction('salary', e, experienceCount)} />
                                                <InputPicker style={{
                                                    maxWidth: '100px'
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
                                                <InputNumber value={team.year_experience}
                                                    className="w-100"
                                                    onChange={(e) =>
                                                        teamFunction('year_experience', e, experienceCount)} />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.ControlLabel>
                                                    Description about Job Position
                                                </Form.ControlLabel>
                                                <ReactQuill
                                                    style={{ height: '10rem' }}
                                                    value={team.descriptionEditorText}
                                                    onBlur={(content, delta, source, editor) => {
                                                        teamFunction('descriptionEditorText', content, experienceCount)
                                                    }}
                                                    className="mt-2" />
                                            </Form.Group>
                                            <button
                                                style={{ margin: "2rem" }}
                                                className="add-more-experience"
                                                onClick={addMoreJobPosition}>
                                                <BsPlusLg
                                                    className="mr-2" /> Add More
                                                Experience
                                            </button>
                                            <div
                                                className="d-flex justify-content-end routing-button">
                                                <Button
                                                    onClick={() => setCurrent(2)}
                                                    type="button"
                                                    className="previous-button">Previous</Button><Form.Group>
                                                    <ButtonToolbar>
                                                        <Button
                                                            onClick={submitOwnerData}
                                                            className="next-button"
                                                            type="button">Submit</Button>
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
                                                src={createObjectURL.owner}
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
export default StepsComponent

export const getServerSideProps = async () => {
    // const positions = await axios.get(config.BASE_URL + "positions");

    const positions = await fetch('https://mocki.io/v1/624f640b-0d0f-4c64-94a3-b2af52277044');

    console.log('test pervin', positions);

    // const locations = await axios.get(config.BASE_URL + "locations");
    // const skills = await axios.get(config.BASE_URL + "skills");
    // const experience_levels = await axios.get(config.BASE_URL + "experience-levels");
    // const roles = await axios.get(config.BASE_URL + "project/roles");
    // const project_types = await axios.get(config.BASE_URL + "project/types");
    // const job_types = await axios.get(config.BASE_URL + "job/types");
    // const payments = await axios.get(config.BASE_URL + "job/payment_types");

    // 123123
    return {
        props: {
            // positions: positions.data.data.items.map(item => {
            //     return { label: item.name, value: item.id }
            // }),
            // positions: positions.map(item => {
            //     return { label: item.name, value: item.id }
            // }),
            testData: positions,
            // locations: locations.data.data.items.map(item => {
            //     return { label: item.name, value: item.id }
            // }),
            locations: [],
            // skills: skills.data.data.items.map(item => {
            //     return { label: item.name, value: item.id }
            // }),
            skills: [],
            // experience_levels: experience_levels.data.data.map(item => {
            //     return { label: item.name, value: item.id }
            // }),
            experience_levels: [],
            // roles: roles.data.data.map(item => {
            //     return { label: item.name, value: item.id }
            // }),
            roles: [],
            // project_types: project_types.data.data.map(item => {
            //     return { label: item.name, value: item.id }
            // }),
            project_types: [],
            // job_types: job_types.data.data.map(item => {
            //     return { label: item.name, value: item.id }
            // }),
            job_types: [],
            // payments: payments.data.data.map(item => {
            //     return { label: item.name, value: item.id }
            // })
            payments: []
        }
    }

}