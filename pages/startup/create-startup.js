import Link from "next/link";
import Image from "next/image";
import React, {useEffect, useRef, useState} from "react";
import {Steps, Form, InputPicker, ButtonToolbar, Button, Input} from "rsuite";
import {AiOutlineEdit} from "react-icons/ai";
import config from "../../src/configuration";
import {useRouter} from "next/router";

const CreateStartup = () => {
    //ref
    const editorRef = useRef();
    const {CKEditor, ClassicEditor} = editorRef.current || {};
    // var parser = new CKEditor.htmlParser()
    const buttonRef = useRef();
    //router
    const router = useRouter();
    //states
    const [list, setList] = useState({
        roles: [],
        startup_type: [],
        positions: [],
        locations: [],
        payments: [],
        periods: [],
        job_types: []
    })
    const [createObjectURL, setCreateObjectURL] = useState('/img/upload_image.png');
    const [image, setImage] = useState('')
    const [current, setCurrent] = useState(0)
    const [person, setPerson] = useState({
        first_name: '',
        last_name: '',
        role: ''
    });
    const [editorLoader, setEditorLoaded] = useState(false)
    const [ckeditor, setCkEditor] = useState({
        aboutStartUp: '',
        aboutJob: ''
    })
    const [startup, setStartUp] = useState({
        title: '',
        type: ''
    });
    const [team, setTeam] = useState({
        job_position: '',
        location: '',
        job_type: '',
        payment: '',
        salary: '',
        salary_periods: '',
        years_experience: ''
    })
    //functions
    const editButton = (c) => {
        setCurrent(c)
    }
    //useEffect
    useEffect(async () => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
        };
        setEditorLoaded(true);

        //fetch data
        const fetchRoles = await fetch(config.BASE_URL + "project/roles");
        const roleData = await fetchRoles.json();
        const projectTypes = await fetch(config.BASE_URL + "project/types");
        const projectData = await projectTypes.json();
        const positions = await fetch(config.BASE_URL + "positions");
        const positionData = await positions.json();
        const locations = await fetch(config.BASE_URL + "locations");
        const locationData = await locations.json();
        const payments = await fetch(config.BASE_URL + "job/payment_types");
        const paymentData = await payments.json();
        const periods = await fetch(config.BASE_URL + "job/salary-periods");
        const periodData = await periods.json();
        const job_type = await fetch(config.BASE_URL + "job/types");
        const jobData = await job_type.json();
        console.log(jobData)
        setList({
            roles: roleData.data.map(item => {
                return {value: item.id, label: item.name}
            }),
            startup_type: projectData.data.map(item => {
                return {value: item.id, label: item.name}
            }),
            positions: positionData.data.items.map(item => {
                return {value: item.id, label: item.name}
            }),
            locations: locationData.data.items.map(item => {
                return {value: item.id, label: item.name}
            }),
            payments: paymentData.data.map(item => {
                return {value: item.id, label: item.name}
            }),
            periods: Object.entries(periodData.data).map(item => {
                return {
                    label: item[0],
                    value: item[1]
                }
            }),
            job_types: jobData.data.map(item => {
                return {value: item.id, label: item.name}
            }),
        });
    }, []);
    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };
    const submitData = async () => {
        let body = {
            title : person.first_name
        }
        const response = await fetch("http://localhost:3000/api/post/create-startup", {
            method: 'POST',
            body: body
        });
        console.log(response);
    }
    return <div className="container login">
        <div className="d-flex justify-content-between _header">
            <Link href="/">
                <a className="navbar-brand">
                    {/* <img src="LogoHeader.svg" alt="logo" /> */}
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
                    {/* <img src="icons/help.svg" /> */}
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
                backgroundImage: "url('/img/create-startup.svg')"
            }}>
                <h2 className="font-weight-bold" style={{
                    maxWidth: '70%'
                }}>
                    {/* <img src="icons/emoji1.svg" /><span>Welcome back</span> */}
                    <span className="text-center">Create a new Startup</span>
                </h2>
                <p className="text-center" style={{
                    maxWidth: '70%'
                }}>Do you have more than one startup?
                    It's not a problem, create new startup profile</p>
            </div>
            <div className="form px-0">
                <div className="steps_form px-5">
                    <Steps vertical current={current}>
                        <Steps.Item title={
                            <>
                                Contact Information {current > 0 &&
                            <button className="edit" onClick={() => {
                                editButton(0)
                            }}><AiOutlineEdit/></button>}
                            </>} description={
                            current !== 0 ? <div className="step_form">
                                    <p className="summary_person"><span>Username</span>
                                        <span>{person.first_name}</span>
                                    </p>
                                    <p className="summary_person"><span>Full Name</span>
                                        <span>{person.last_name}</span></p>
                                    <p className="summary_person"><span>Role in Startup</span>
                                        <span>{list.roles.find(item => item.value === person.role)?.label}</span>
                                    </p>
                                </div> :
                                <Form>
                                    <Form.Group>
                                        <Form.ControlLabel>
                                            First Name
                                        </Form.ControlLabel>
                                        <Form.Control
                                            name="first_name"
                                            value={person.first_name}
                                            onChange={(e) => setPerson({
                                                ...person,
                                                first_name: e
                                            })}
                                            type="text"
                                            placeholder="First name"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.ControlLabel>
                                            Last Name
                                        </Form.ControlLabel>
                                        <Form.Control
                                            name="last_name"
                                            value={person.last_name}
                                            onChange={(e) => setPerson({
                                                ...person,
                                                last_name: e
                                            })}
                                            type="text"
                                            placeholder="Last name"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.ControlLabel>Roles in Startup</Form.ControlLabel>
                                        <InputPicker
                                            size="lg"
                                            placeholder="Roles in Startup"
                                            name="location"
                                            data={list.roles}
                                            value={person.role}
                                            className="w-100 mb-2"
                                            onChange={(e) => setPerson({
                                                ...person,
                                                role: e
                                            })}
                                        />
                                        <div className="d-flex justify-content-end routing-button">
                                            <Button
                                                onClick={() => {
                                                    if (person.first_name && person.last_name && person.role) {
                                                        setCurrent(1)
                                                    }
                                                }}
                                                type="button"
                                                className="next-button">
                                                Next
                                            </Button>
                                        </div>
                                    </Form.Group>
                                </Form>
                        }/>
                        <Steps.Item title={
                            <>
                                Stratup information {current > 1 &&
                            <button className="edit" onClick={() => {
                                editButton(1)
                            }}><AiOutlineEdit/></button>}
                            </>} description={
                            current !== 1 ?
                                <div className="step_form">
                                    <p className="summary_person"><span>Startup Title</span>
                                        {startup.title}
                                    </p>
                                    <p className="summary_person"><span>Startup type</span>
                                        {startup.type && list.startup_type.find(item => item.value === startup.type)?.label}
                                    </p>
                                    <p className="summary_person"><span>Description</span>
                                        <div dangerouslySetInnerHTML={{__html : ckeditor.aboutStartUp.length > 10 ?
                                                ckeditor.aboutStartUp.slice(0,20)+ "..." : ckeditor.aboutStartUp}}></div>
                                    </p>
                                </div> : <div>
                                    <div className="profile_information mb-4">
                                        <input type="file" name="myImage" className="d-none" ref={buttonRef}
                                               onChange={(e) => uploadToClient(e)}/>
                                        <div>
                                            <Image
                                                src={createObjectURL}
                                                alt='icon'
                                                width={64}
                                                height={64}
                                            />
                                            <button onClick={() => {
                                                buttonRef.current.click()
                                            }
                                            }>Upload Logo
                                            </button>
                                        </div>
                                    </div>
                                    <Form>
                                        <Form.Group>
                                            <Form.ControlLabel>
                                                Startup Title
                                            </Form.ControlLabel>
                                            <Form.Control
                                                name="title"
                                                value={startup.title}
                                                onChange={(e) => setStartUp({
                                                    ...startup,
                                                    title: e
                                                })}
                                                type="text"
                                                placeholder="Startup Title"
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.ControlLabel>
                                                Startup type
                                            </Form.ControlLabel>
                                            <InputPicker
                                                size="lg"
                                                placeholder="Startup type"
                                                name="startup_type"
                                                data={list.startup_type}
                                                value={startup.type}
                                                className="w-100 mb-2"
                                                onChange={(e) => setStartUp({
                                                    ...startup,
                                                    type: e
                                                })}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.ControlLabel>Description about startup</Form.ControlLabel>
                                            {editorLoader ? <CKEditor
                                                name={"name"}
                                                editor={ClassicEditor}
                                                data={ckeditor.aboutStartUp}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    setCkEditor({
                                                        ...ckeditor,
                                                        aboutStartUp: data
                                                    })
                                                }}
                                            /> : ''}
                                        </Form.Group>
                                        <div className="d-flex justify-content-end routing-button"><Button
                                            onClick={() => setCurrent(1)}
                                            type="button"
                                            className="previous-button">Previous</Button>
                                            <div>
                                                <Button className="next-button" onClick={() => {
                                                    if (startup.title && startup.type && ckeditor.aboutStartUp) {
                                                        setCurrent(2)
                                                    }
                                                }}
                                                        type="button">Next</Button>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                        }/>
                        <Steps.Item
                            title={
                                <>
                                    Who are you looking for in your team? {current > 2 &&
                                <button className="edit" onClick={() => {
                                    editButton(1)
                                }}><AiOutlineEdit/></button>}
                                </>}
                            description={
                                <Form>
                                    <Form.Group>
                                        <Form.ControlLabel>
                                            Job Position
                                        </Form.ControlLabel>
                                        <InputPicker
                                            size="lg"
                                            placeholder="Job Position"
                                            name="job"
                                            data={list.positions}
                                            value={team.job_position}
                                            className="w-100 mb-2"
                                            onChange={(e) => setTeam({
                                                ...team,
                                                job_position: e
                                            })}
                                        />
                                    </Form.Group>
                                    <InputPicker
                                        size="lg"
                                        placeholder="Location"
                                        name="location"
                                        data={list.locations}
                                        value={team.location}
                                        className="w-100 mb-2"
                                        onChange={(e) => setTeam({
                                            ...team,
                                            location: e
                                        })}
                                    />
                                    <InputPicker
                                        size="lg"
                                        placeholder="Job type"
                                        name="location"
                                        data={list.job_types}
                                        value={team.job_type}
                                        className="w-100 mb-2"
                                        onChange={(e) => setTeam({
                                            ...team,
                                            job_type: e
                                        })}
                                    />
                                    <InputPicker
                                        size="lg"
                                        placeholder="Payment"
                                        name="location"
                                        data={list.payments}
                                        value={team.payment}
                                        className="w-100 mb-2"
                                        onChange={(e) => setTeam({
                                            ...team,
                                            payment: e
                                        })}
                                    />
                                    <Form.Group className="d-flex justify-content-between align-items-baseline">
                                        <Input type="number" min={0} placeholder='Salary'
                                               onChange={(e) => setTeam({
                                                   ...team,
                                                   salary: e
                                               })}/>
                                        <InputPicker style={{
                                            maxWidth: '100px',
                                            marginLeft: "5px"
                                        }} size="lg"
                                                     placeholder="Salary periods"
                                                     onChange={(e) => setTeam({
                                                         ...team,
                                                         salary_periods: e
                                                     })}
                                            // value={team.salary_periods}
                                                     data={list.periods}
                                                     className="w-100 mb-2"/>
                                    </Form.Group>
                                    <Form.ControlLabel>
                                        Years of experience
                                    </Form.ControlLabel>
                                    <Input type="number" min={0} placeholder='Salary'
                                           onChange={(e) => setTeam({
                                               ...team,
                                               salary: e
                                           })}/>
                                    <Form.ControlLabel>
                                        Description about Job Position
                                    </Form.ControlLabel>
                                    {editorLoader ? <CKEditor
                                        name={"name"}
                                        editor={ClassicEditor}
                                        data={ckeditor.aboutJob}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setCkEditor({
                                                ...ckeditor,
                                                aboutJob: data
                                            })
                                        }}
                                    /> : ''}
                                    <div className="d-flex justify-content-end routing-button">
                                        <Button
                                            onClick={() => {
                                                submitData()
                                            }}
                                            type="button"
                                            className="next-button">
                                            Next
                                        </Button>
                                    </div>
                                </Form>
                            }
                        />
                    </Steps>
                </div>
            </div>
        </div>
    </div>
}
CreateStartup.layout = false;
export default CreateStartup;