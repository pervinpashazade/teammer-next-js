import React, {useRef, useState} from 'react';
import {Button, Form, InputPicker, Modal, Panel} from 'rsuite';
import BreadCrumb from '../../src/components/Lib/BreadCrumb';
import Banner from '../../src/components/Lib/Banner';
import {getFetchData} from '../../lib/fetchData';
import {getToken} from "../../lib/session";
import CardStartupProfile from '../../src/components/Startup/CardStartupProfile';
import CardJobList from '../../src/components/Startup/CardJobList';
import Link from 'next/link';
import HomeSlider from '../../src/components/HomeSlider';
import Image from 'next/image';
import CardOwnStartupList from '../../src/components/Startup/CardOwnStartupList';
import config, {NEXT_URL} from '../../src/configuration';
import axios from "axios";
import {useRouter} from "next/router";

function Startup(props) {
    const [startupData, setStartUpData] = useState([]);
    const [startupJobList, setStartupJobList] = useState([])
    const [lists, setLists] = useState({
        salary_periods: [],
        positions: [],
        payment_types: [],
        project_types: [],
        locations: []
    });
    const [jobData, setJobData] = useState({
        position_id: '',
        salary: '',
        salary_period: '',
        years_of_experience: '',
        description: '',
        payment_type_id: '',
        type_id: '',
        location_id: ''
    })
    const router = useRouter();
    const editorRef = useRef();
    const [isEditorLoaded, setIsEditorLoaded] = useState(false);
    const {CKEditor, ClassicEditor} = editorRef.current || {};

    const [userId, setUserId] = useState(null);
    const [type, setType] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const getStartupData = () => {
        axios.get(config.BASE_URL + `projects/${router.query.id}?include=owner,type`)
            .then(res => {
                if (res.data.success) {
                    setStartUpData(res.data.data)
                }
            })
    }
    const getStartupJobList = () => {
        axios.get(config.BASE_URL + `projects/${router.query.id}/jobs?include=position,project.owner&noPagination=1`)
            .then(res => {
                if (res.data.success) {
                    setStartupJobList(res.data.data)
                }
            })
    }
    React.useEffect(async () => {
        const fetchUser = await fetch(NEXT_URL + 'api/auth');
        const resObj = await fetchUser.json();
        setType(resObj?.user?.type)
        setUserId(resObj?.user?.id);
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
        };
        setIsEditorLoaded(true);
        getStartupData();
        getStartupJobList()
        Promise.all([
            axios.get(config.BASE_URL + "locations?noPagination=1"),
            axios.get(config.BASE_URL + "project/types?noPagination=1"),
            axios.get(config.BASE_URL + "job/payment_types?noPagination=1"),
            axios.get(config.BASE_URL + "job/salary-periods?noPagination=1"),
            axios.get(config.BASE_URL + "positions?noPagination=1"),

        ]).then(([
                     locations,
                     project_types,
                     payment_types,
                     salary_periods,
                     positions,
                 ]) => {
            let salary_periods_array = Object.entries(salary_periods.data.data).map(([key, value]) => {
                return {
                    name: key,
                    id: value
                }
            })
            setLists({
                salary_periods: salary_periods_array,
                positions: positions.data.data,
                payment_types: payment_types.data.data,
                project_types: project_types.data.data,
                locations: locations.data.data,
            })
        })
    }, []);
    const submitJobCreate = () => {
        axios.post(config.BASE_URL + `projects/${router.query.id}/jobs` , jobData)
            .then(res => {
                console.log(res)
            })
    }
    return (
        <div className='profile-startup'>
            <BreadCrumb/>
            <Banner/>
            <div className="profile-wrapper">
                <div className="content">
                    <div className="startup-title">
                        <h1>About this project</h1>
                    </div>
                    <div className='startup-description'>
                        {startupData?.description}
                    </div>
                </div>
                <div className="right-side">
                    <CardStartupProfile
                        editMode={userId === startupData?.owner?.id}
                        classNames="mb-3"
                        logo={startupData?.logo}
                        title={startupData?.title}
                        owner_id={startupData?.owner?.id}
                        startup_type={startupData?.type?.name}
                        owner_fullname={startupData?.owner?.full_name}
                        owner_image_url={startupData?.owner?.detail?.photo}
                    />
                    <CardJobList
                        classNames="mb-3"
                        title="Requirements"
                        jobList={startupJobList}
                        setIsOpen={() => setIsOpen(!isOpen)}
                    />
                    {
                        userId === startupData?.owner?.id &&
                        <>
                            <hr/>
                            {/*slider*/}
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="component-header v1">
                                        <h5>Joined Teammates</h5>
                                        <div className='view-all-wrapper'>
                                            <Button>
                                                <Image
                                                    src={'/icons/eye.svg'}
                                                    alt='img'
                                                    width={20}
                                                    height={20}
                                                    layout='fixed'
                                                />
                                                <span>Check all</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <HomeSlider/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="component-header v1">
                                        <h5>My startups</h5>
                                        <div className='view-all-wrapper'>
                                            <Link href="/owner/startups" passHref>
                                                <a>
                                                    <Image
                                                        src={'/icons/eye.svg'}
                                                        alt='img'
                                                        width={20}
                                                        height={20}
                                                        layout='fixed'
                                                    />
                                                    <span>Check all</span>
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <CardOwnStartupList
                                classNames="mb-3"
                                startupList={startupJobList}
                            />
                            {
                                type === "1" && <Link href="/owner/create-startup" passHref>
                                    <a className='btn-add-startup'>
                                        Add New Startup
                                    </a>
                                </Link>
                            }
                        </>
                    }
                </div>
                <Modal size="md" open={isOpen} onClose={() => {
                    setIsOpen(!isOpen);
                }}>
                    <Modal.Header>
                        <Modal.Title>Create position</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="row">
                            <div className="col-md-12 mb-4">
                                <Form.Group controlId="location">
                                    <Form.ControlLabel>Job position</Form.ControlLabel>
                                    <InputPicker
                                        size="md"
                                        className="w-100"
                                        placeholder="Job position"
                                        data={lists.positions}
                                        valueKey="id"
                                        labelKey="name"
                                        onChange={(e) => {
                                            setJobData({
                                                ...jobData,
                                                position_id: e
                                            })
                                        }}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-12 mb-4">
                                <Form.Group controlId="location">
                                    <Form.ControlLabel>Locations</Form.ControlLabel>
                                    <InputPicker
                                        size="md"
                                        className="w-100"
                                        placeholder="Location"
                                        valueKey="id"
                                        labelKey="name"
                                        data={lists.locations}
                                        onChange={(e) => {
                                            setJobData({
                                                ...jobData,
                                                location_id: e
                                            })
                                        }}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-12 mb-4">
                                <Form.Group controlId="location">
                                    <Form.ControlLabel>Payment</Form.ControlLabel>
                                    <InputPicker
                                        size="md"
                                        className="w-100"
                                        placeholder="Payment"
                                        valueKey="id"
                                        labelKey="name"
                                        data={lists.payment_types}
                                        onChange={(e) => {
                                            setJobData({
                                                ...jobData,
                                                payment_type_id: e
                                            })
                                        }}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-12 mb-4">
                                <Form.Group controlId="location">
                                    <Form.ControlLabel>Project type</Form.ControlLabel>
                                    <InputPicker
                                        size="md"
                                        className="w-100"
                                        placeholder="Project type"
                                        valueKey="id"
                                        labelKey="name"
                                        data={lists.project_types}
                                        onChange={(e) => {
                                            setJobData({
                                                ...jobData,
                                                type_id: e
                                            })
                                        }}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-12 d-flex align-items-center mb-4">
                                <div className="col-md-8 px-0" controlId="location">
                                    <Form.ControlLabel>Salary</Form.ControlLabel>
                                    <Form.Control
                                        placeholder="Salary"
                                        onChange={(e) => setJobData({
                                            ...jobData,
                                            salary: e
                                        })}
                                        value={jobData.salary}
                                    />
                                </div>
                                <div className="col-md-4 pr-0" controlId="location">
                                    <Form.ControlLabel>Salary period</Form.ControlLabel>
                                    <InputPicker
                                        size="md"
                                        className="w-100"
                                        placeholder="Salary period"
                                        valueKey="id"
                                        labelKey="name"
                                        value={jobData.salary_period}
                                        data={lists.salary_periods}
                                        onChange={(e) => {
                                            setJobData({
                                                ...jobData,
                                                salary_period: e
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <Form.Group controlId="name">
                                    <Form.ControlLabel>Years of experience</Form.ControlLabel>
                                    <Form.Control
                                        placeholder="Years of experience"
                                        onChange={(e) => {
                                            setJobData({
                                                ...jobData,
                                                years_of_experience: e
                                            })
                                        }}
                                        type="number"
                                        min="0"
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-12 job-create-ck-editor">
                                {
                                    isEditorLoaded ?
                                        <CKEditor
                                            config={{
                                                toolbar: ['bold', 'italic', 'link', 'undo', 'redo', 'numberedList', 'bulletedList'],
                                                width: "100%"
                                            }}
                                            name={"name"}
                                            editor={ClassicEditor}
                                            // style={{maxWidth: "1000px"}}
                                            // data={startup.description}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setJobData({
                                                    ...jobData,
                                                    description: data
                                                })
                                            }}
                                        />
                                        :
                                        ''
                                }
                            </div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => {
                            setIsOpen(!isOpen);
                        }} appearance="subtle">
                            Cancel
                        </Button>
                        <Button onClick={() => submitJobCreate()} appearance="primary">
                            Send
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

Startup.layout = true;

export default Startup;

export const getServerSideProps = async (context) => {

    return {
        props: {}
    }
}