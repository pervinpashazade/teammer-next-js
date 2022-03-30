import React, {useState, useEffect, useRef} from 'react';
import Link from 'next/link';
import BreadCrumb from '../../../src/components/Lib/BreadCrumb';
import Banner from '../../../src/components/Lib/Banner';
import {MdModeEdit, MdOutlineWorkOutline} from 'react-icons/md';
import {RiSettingsLine} from 'react-icons/ri';
import {FaRegTimesCircle} from 'react-icons/fa';
import {Avatar, Button, Form, Input, InputPicker, Notification, Tag, toaster} from 'rsuite';
import CardTeammerPortfolio from '../../../src/components/Profile/CardTeammerPortfolio';
import CardTeammerWorkExperience from '../../../src/components/Profile/CardTeammerWorkExperience';
import Image from 'next/image';
import {Cookie, withCookie} from 'next-cookie';
import config from '../../../src/configuration';
import {getFetchData} from '../../../lib/fetchData';
import {getToken} from '../../../lib/session';
import axios from "axios";
import {getCookie} from "../../../src/helpers/cookie";

// const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const EditComponent = (props) => {
    const photoRef = useRef();
    const [locations, setLocations] = useState([]);
    const [owner, setOwner] = useState({
        full_name: '',
        location: '',
        // photo: ''
    })
    useEffect(async () => {
        axios.get(config.BASE_URL + "locations")
            .then(res => setLocations(res.data.data.items.map(item => {
                return {
                    value: item.id,
                    label: item.name ? item.name : ''
                }
            })))
        axios.get(config.BASE_URL + "auth/user?include=project,skills,positions,experiences,detail.location", {
            headers: {
                Authorization: "Bearer " + getCookie('teammers-access-token')
            }
        })
            .then(res => {
                console.log(res);
                setOwner({
                    full_name: res.data?.data?.full_name,
                    location: res.data?.data?.detail?.location?.id,
                    // photo: res.data?.data?.detail?.photo
                })
            })
    }, [])
    const uploadFile = (event) => {
        console.log(event.target.files)
        if (event.target.files) {
            let file_extension = event.target.files[0].type.split("/").pop();
            if (file_extension === "png" || file_extension === "jpeg") {
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
        axios.put(config.BASE_URL + "users",owner , {
            headers: {
                Authorization: "Bearer " + getCookie('teammers-access-token')
            }
        })
            .then(res => {
                console.log(res)
            })
    }
    const setData = (key, data) => {
        setOwner({
            ...owner,
            [key]: data
        })
    }
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