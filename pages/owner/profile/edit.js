import React, {useState, useEffect, useRef} from 'react';
import Link from 'next/link';
import BreadCrumb from '../../../src/components/Lib/BreadCrumb';
import Banner from '../../../src/components/Lib/Banner';
import {MdModeEdit, MdOutlineWorkOutline} from 'react-icons/md';
import {RiSettingsLine} from 'react-icons/ri';
import {FaRegTimesCircle} from 'react-icons/fa';
import {Avatar, Button, Form, InputPicker, Notification, Tag, toaster} from 'rsuite';
import config from '../../../src/configuration';
import axios from "axios";
import {getCookie} from "../../../src/helpers/cookie";
import {buildFormData} from "../../signup/steps_old";

const EditComponent = (props) => {
    const photoRef = useRef();
    const [locations, setLocations] = useState([]);
    const [projects, setProjects] = useState([]);
    const [validation, setValidation] = useState(false);
    const [notification, setNotification] = useState(false);
    const [photo, setPhoto] = useState('')
    const [owner, setOwner] = useState({
        full_name: '',
        location: '',
        photo: '',
        project_role_id: ''
    })
    useEffect(async () => {
        axios.get(config.BASE_URL + "locations")
            .then(res => setLocations(res.data.data.items.map(item => {
                return {
                    value: item.id,
                    label: item.name ? item.name : ''
                }
            })))
        await axios.get(config.BASE_URL + 'project/roles').then(res => {
            if (res.data.success) {
                setProjects(res.data.data.map(item => {
                    return {
                        value: item.id,
                        label: item.name ? item.name : ''
                    }
                }));
            }
        });
        axios.get(config.BASE_URL + "auth/user?include=project,skills,positions,experiences,detail.location", {
            headers: {
                Authorization: "Bearer " + getCookie('teammers-access-token')
            }
        })
            .then(res => {
                console.log(res.data.data)
                let data = res.data?.data
                setOwner({
                    full_name: data?.full_name,
                    location: data?.detail?.location?.id,
                    photo: data?.detail?.photo,
                    project_role_id: data?.detail?.project_role_id ? data?.detail?.project_role_id : ""
                })
            })
    }, []);
    useEffect(() => {
        if (notification) {
            setTimeout(() => {
                setNotification(false);
            }, 5000)
        }
    }, [notification])
    const uploadFile = (event) => {
        console.log("event target ", event.target.files.length)
        if (event.target.files.length) {
            let file_extension = event.target.files[0].type.split("/").pop();
            if (file_extension === "png" || file_extension === "jpeg") {
                setPhoto(event.target.files[0])
                setOwner({
                    ...owner,
                    photo: URL.createObjectURL(event.target.files[0])
                });
            } else {
                toaster.push(
                    <Notification type={"error"} header="Success!" closable>
                        You did'nt upload photo , please select only .jpg and .png images
                    </Notification>, 'topEnd'
                );
            }
        }
    }
    const saveChanges = () => {

        if (owner.project_role_id) {
            console.log(photo)
            let data = {
                detail: {
                    project_role_id: owner.project_role_id,
                    location_id: owner.location,
                },
                full_name: owner.full_name,
            }
            const formData = new FormData();
            if (photo) {
                data.detail['photo'] = photo;
                buildFormData(formData, data);

                axios.put(config.BASE_URL + "users", formData, {
                    headers: {
                        Authorization: "Bearer " + getCookie('teammers-access-token'),
                    }
                })
                    .then(res => {
                        console.log(res);
                        setNotification(true)
                    })
                return
            }
            axios.put(config.BASE_URL + "users", data, {
                headers: {
                    Authorization: "Bearer " + getCookie('teammers-access-token')
                }
            })
                .then(res => {
                    console.log(res);
                    setNotification(true)
                })
            setValidation(false);
        } else {

            setValidation(true);
        }

    }
    const setData = (key, data) => {
        setOwner({
            ...owner,
            [key]: data
        })
    }
    console.log(owner);

    return (
        <div>
            <div className='teammer-profile-edit'>
                <BreadCrumb/>
                <Banner
                    styles={{marginBottom: '2.5rem'}}
                />
                <div className="profile-wrapper">
                    <div className="left-side">
                        <ul className="profile-edit-nav">
                            <li className='active'>
                                <Link href="/owner/profile/edit">
                                    <a>
                                        <MdModeEdit/>
                                        <span>Edit Profile</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/owner/profile/settings">
                                    <a>
                                        <RiSettingsLine/>
                                        <span>Account Settings</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/owner/profile/company">
                                    <a>
                                        <MdOutlineWorkOutline/>
                                        <span>Company</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/owner/profile/blocked-users">
                                    <a>
                                        <FaRegTimesCircle/>
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
                                    size="lg"
                                    circle
                                    src={owner.photo ? owner.photo : ""}
                                    alt="username surname"
                                />
                                <div className="profile-title-content">
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
                        <div>{notification &&
                        <div className="alert-success">Profile changes edited successfly!</div>}</div>
                        <div className="user-info-wrapper">
                            <div className="change-avatar-side">
                                <div className="side_title">
                                    <span>User Information</span>
                                </div>
                                <div className="user-avatar-wrapper">
                                    <Avatar
                                        size="lg"
                                        circle
                                        src={owner.photo ? owner.photo : ""}
                                        alt="username surname"
                                    />
                                </div>
                                <input type="file" onChange={uploadFile} ref={photoRef} className="d-none"/>
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
                                                onChange={(e) => setData('full_name', e)}
                                                value={owner.full_name}
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
                                                data={locations}
                                                value={owner.location}
                                                onChange={(e) => setOwner({...owner, location: e})}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="location">
                                            <Form.ControlLabel>Roles</Form.ControlLabel>
                                            <InputPicker
                                                size="md"
                                                className="w-100"
                                                placeholder="Roles"
                                                data={projects}
                                                value={owner.project_role_id}
                                                onChange={(e) => setOwner({...owner, project_role_id: e})}
                                            />
                                            {validation &&
                                            <p className="login-validation">Project role is required!</p>}
                                        </Form.Group>
                                    </div>
                                </Form>
                            </div>
                        </div>
                        <div className="delete-account-wrapper">
                            {/*<Button*/}
                            {/*    color="blue"*/}
                            {/*    appearance="primary"*/}
                            {/*    className="btn-custom-outline btn-danger delete-account-btn"*/}
                            {/*>*/}
                            {/*    <div>*/}
                            {/*        <Image*/}
                            {/*            src={'/icons/trash_red.svg'}*/}
                            {/*            alt='alt'*/}
                            {/*            layout={'fixed'}*/}
                            {/*            width={16}*/}
                            {/*            height={16}*/}
                            {/*        />*/}
                            {/*        Delete Account*/}
                            {/*    </div>*/}
                            {/*</Button>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

EditComponent.layout = true;

export default EditComponent;

// export const getServerSideProps = async (context) => {
//     const fetchUserInfo = await getFetchData("auth/user?include=project,skills,positions,experiences,detail.location", getToken(context));
//     return {
//         props: {
//             userData: fetchUserInfo?.data,
//         }
//     }
// };