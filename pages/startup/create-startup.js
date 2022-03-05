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
    const buttonRef = useRef();
    //router
    const router = useRouter();
    //states
    const [list , setList] = useState({
        roles : [],
        startup_type : [],
        positions : [],
        locations : [],
        payments : [],
        periods : []
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
        setList({
            roles : roleData.data,
            startup_type : projectData.data,
            positions : positionData.data.items,
            locations : locationData.data.items,
            payments : paymentData.data,
            periods : Object.entries(periodData.data).map(item => {
                return {
                    name : item[0],
                    id : item[1]
                }
            })
        });
    }, []);
    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };
    return <div className="container login">
        <div className="d-flex justify-content-between login-header">
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
                                Contact Information {current > 1 &&
                            <button className="edit" onClick={() => {
                                editButton(1)
                            }}><AiOutlineEdit/></button>}
                            </>} description={
                            current !== 0 ? <div className="step_form">
                                    <p className="summary_person"><span>Username</span>
                                        <span>{person.first_name}</span>
                                    </p>
                                    <p className="summary_person"><span>Full Name</span>
                                        <span>{person.last_name}</span></p>
                                    <p className="summary_person"><span>Role in Startup</span>
                                        <span>{list.roles.find(item => item.id === person.role)?.name}</span>
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
                                                onClick={() => setCurrent(1)}
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

                                    </p>
                                    <p className="summary_person"><span>Startup type</span>

                                    </p>
                                    <p className="summary_person"><span>Description</span>

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
                                            <Form.Control
                                                name="type"
                                                value={startup.type}
                                                onChange={(e) => setStartUp({
                                                    ...startup,
                                                    type: e
                                                })}
                                                type="text"
                                                placeholder="Startup type"
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
                                                <Button className="next-button" onClick={() => setCurrent(2)}
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
                                            // data={props.roles}
                                            value={person.role}
                                            className="w-100 mb-2"
                                            onChange={(e) => setPerson({
                                                ...person,
                                                role: e
                                            })}
                                        />
                                    </Form.Group>
                                    <InputPicker
                                        size="lg"
                                        placeholder="Location"
                                        name="location"
                                        // data={props.roles}
                                        value={person.role}
                                        className="w-100 mb-2"
                                        onChange={(e) => setPerson({
                                            ...person,
                                            role: e
                                        })}
                                    />
                                    <InputPicker
                                        size="lg"
                                        placeholder="Job type"
                                        name="location"
                                        // data={props.roles}
                                        value={person.role}
                                        className="w-100 mb-2"
                                        onChange={(e) => setPerson({
                                            ...person,
                                            role: e
                                        })}
                                    />
                                    <InputPicker
                                        size="lg"
                                        placeholder="Payment"
                                        name="location"
                                        // data={props.roles}
                                        value={person.role}
                                        className="w-100 mb-2"
                                        onChange={(e) => setPerson({
                                            ...person,
                                            role: e
                                        })}
                                    />
                                    <Form.Group className="d-flex justify-content-between align-items-baseline">
                                        <Input type="number" min={0} placeholder='Salary'
                                               onChange={(e) => {
                                               }}/>
                                        <InputPicker style={{
                                            maxWidth: '100px',
                                            marginLeft: "5px"
                                        }} size="lg"
                                                     placeholder="Salary periods"
                                                     onChange={(e) => {
                                                     }}
                                            // value={team.salary_periods}
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
                                                     className="w-100 mb-2"/>
                                    </Form.Group>
                                    <Form.ControlLabel>
                                        Years of experience
                                    </Form.ControlLabel>
                                    <Input type="number" min={0} placeholder='Salary'
                                           onChange={(e) => {
                                           }}/>
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

// export const getServerSideProps = async () => {
//
//     const fetchRoles = await fetch(config.BASE_URL + "project/roles");
//     const roleData = await fetchRoles.json();
//     return {
//         props: {
//             roles: roleData.data.map(item => {
//                 return {
//                     value: item.id,
//                     label: item.name ? item.name : ''
//                 }
//             }),
//         }
//     }
// }