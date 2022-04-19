import Link from "next/link";
import Image from "next/image";
import React, {useEffect, useRef, useState} from "react";
import {Steps, Form, InputPicker, ButtonToolbar, Button, Input, toaster, Notification} from "rsuite";
import {AiOutlineEdit} from "react-icons/ai";
import config from "../../src/configuration";
import {useRouter} from "next/router";
import Header from "../../src/components/consts/NotAuth/Header";
import axios from "axios";
import {buildFormData} from "../../src/helpers/buildFormData";

const CreateStartup = () => {
    //ref
    const editorRef = useRef();
    const startupLogoRef = useRef();
    const {CKEditor, ClassicEditor} = editorRef.current || {};
    const router = useRouter();
    //states
    const [createObjectURL, setCreateObjectURL] = useState('/img/upload_image.png');
    const [current, setCurrent] = useState(0);
    const [validate, setValidation] = useState(false)
    const [types, setTypes] = useState([])
    const [editorLoader, setEditorLoaded] = useState(false);
    const [startup, setStartUp] = useState({
        title: '',
        type_id: '',
        description: '',
        logo: ''
    });
    //functions
    const getProjectTypes = () => {
        axios.get(config.BASE_URL + "project/types?noPagination=1")
            .then(res => {
                setTypes(res.data.data.map(item => {
                    return {label: item.name, value: item.id}
                }))
            })
    }
    //useEffect
    useEffect(async () => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
        };
        setEditorLoaded(true);
        //fetch data
        getProjectTypes();
    }, []);

    const uploadToClient = (event) => {
        console.log(event.target.files[0])
        const element = event.target.files[0]
        if (event.target.files && event.target.files[0]) {
            if (element.type === "image/jpeg" || element.type === "image/png") {
                const i = event.target.files[0];
                setStartUp({...startup, logo: i});
                setCreateObjectURL(URL.createObjectURL(i));
            } else {
                alert('Please select only .jpg and .png images');
            }
        }
    };
    const submitData = () => {
        if (startup.description && startup.logo) {
            console.log('salam dunya');
            const formData = new FormData();
            buildFormData(formData, startup);
            axios.post(config.BASE_URL + "projects", formData)
                .then(res => {
                    if(res.data.success){
                        toaster.push(
                            <Notification type={"success"} header="Success!" closable>
                                New Teammer added!
                            </Notification>, 'topEnd'
                        );
                        router.push("/owner/startups")
                    }
                })
        } else {
            setValidation(true)
        }
        // const response = await fetch("http://localhost:3000/api/post/create-startup", {
        //     method: 'POST',
        //     body: body
        // });
        // console.log(response);
    }
    return <div className="container">
        <div className="not-auth-layout steps">
            <Header/>
            <div className="row">
                <div className="col-md-6">
                    <div className="left">
                        <div className="bg-wrapper">
                            <div className="bg-icon-wrapper"></div>
                            <div className="title">
                                <h2>Create a new Startup</h2>
                                <p>Do you have more than one startup?
                                    It's not a problem, create new startup profile!</p>
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
                                    <Steps vertical current={current}>
                                        <Steps.Item className='_step-item'
                                                    title={
                                                        <>
                                                            Startup info
                                                            {current > 0 &&
                                                            <Button
                                                                className="btn-edit-step"
                                                                onClick={() => setCurrent(0)}
                                                            >
                                                                <AiOutlineEdit/>
                                                            </Button>
                                                            }
                                                        </>}
                                                    description={
                                                        current > 0 ?
                                                            <div className="step-form-item-summary">
                                                                <p>
                                                                    <span>Startup title : </span>
                                                                    <span>{startup.title}</span>
                                                                    {
                                                                        console.log(types)
                                                                    }
                                                                </p>
                                                                <p>
                                                                    <span>Startup type : </span>
                                                                    <span>{types.find(item => item.value === startup.type_id).label}</span>
                                                                </p>
                                                            </div> :
                                                            <Form>
                                                                <Form.Group>
                                                                    <Form.ControlLabel>
                                                                        Startup Title
                                                                    </Form.ControlLabel>
                                                                    <Form.Control
                                                                        value={startup.title}
                                                                        onChange={(e) => setStartUp({
                                                                            ...startup,
                                                                            title: e
                                                                        })}
                                                                        type="text"
                                                                        placeholder="Startup title"
                                                                    />
                                                                    {(validate && !startup.title) &&
                                                                    <div className="validation-errors mt-0">Startup
                                                                        title is
                                                                        required
                                                                    </div>}
                                                                </Form.Group>
                                                                <Form.Group>
                                                                    <Form.ControlLabel>Startup types</Form.ControlLabel>
                                                                    <InputPicker
                                                                        size="lg"
                                                                        placeholder="Roles in Startup"
                                                                        name="location"
                                                                        data={types}
                                                                        value={startup.type_id}
                                                                        className="w-100 mb-2"
                                                                        onChange={(e) => setStartUp({
                                                                            ...startup,
                                                                            type_id: e
                                                                        })}
                                                                    />
                                                                    {(validate && !startup.type_id) &&
                                                                    <div className="validation-errors mt-0">Startup type
                                                                        is
                                                                        required
                                                                    </div>}
                                                                </Form.Group>
                                                                <div className="navigation-btn-wrapper">
                                                                    <Button
                                                                        type='button'
                                                                        onClick={() => {
                                                                            if (startup.title && startup.type_id) {
                                                                                setCurrent(1);
                                                                                setValidation(false)
                                                                            } else setValidation(true)
                                                                        }}
                                                                    >
                                                                        Next
                                                                    </Button>
                                                                </div>
                                                            </Form>
                                                    }/>
                                        <Steps.Item className='_step-item' title="Startup descripton"
                                                    description={
                                                        <Form>
                                                            <div className="upload-avatar-wrapper mb-4">
                                                                <input
                                                                    type="file"
                                                                    className="d-none"
                                                                    ref={startupLogoRef}
                                                                    onChange={(e) => uploadToClient(e)}
                                                                />
                                                                <div>
                                                                    <Image
                                                                        width={64}
                                                                        height={64}
                                                                        alt='icon'
                                                                        src={createObjectURL ? createObjectURL : createObjectURL}
                                                                    />
                                                                    <button
                                                                        onClick={() => {
                                                                            startupLogoRef.current.click()
                                                                        }}
                                                                    >
                                                                        Upload Logo
                                                                    </button>
                                                                </div>
                                                                {(validate && !startup.logo) &&
                                                                <div className="validation-errors mt-0">Startup logo
                                                                    is
                                                                    required
                                                                </div>}
                                                            </div>
                                                            <Form.Group className="mt-2">
                                                                <Form.ControlLabel>Description about
                                                                    startup</Form.ControlLabel>
                                                                {
                                                                    editorLoader ?
                                                                        <CKEditor
                                                                            name={"name"}
                                                                            editor={ClassicEditor}
                                                                            style={{maxWidth: "400px"}}
                                                                            data={startup.description}
                                                                            onChange={(event, editor) => {
                                                                                const data = editor.getData();
                                                                                setStartUp({
                                                                                    ...startup,
                                                                                    description: data
                                                                                });
                                                                            }}
                                                                        />
                                                                        :
                                                                        ''
                                                                }
                                                                {(validate && !startup.description) &&
                                                                <div className="validation-errors mt-0">Startup
                                                                    description
                                                                    is
                                                                    required
                                                                </div>}
                                                                <div className="navigation-btn-wrapper">
                                                                    <Button
                                                                        type='button'
                                                                        onClick={submitData}
                                                                    >
                                                                        Submit
                                                                    </Button>
                                                                </div>
                                                            </Form.Group>
                                                        </Form>
                                                    }
                                        />
                                    </Steps>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
CreateStartup.layout = false;
export default CreateStartup;