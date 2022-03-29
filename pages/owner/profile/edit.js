import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import BreadCrumb from '../../../src/components/Lib/BreadCrumb';
import Banner from '../../../src/components/Lib/Banner';
import {MdModeEdit, MdOutlineWorkOutline} from 'react-icons/md';
import {RiSettingsLine} from 'react-icons/ri';
import {FaRegTimesCircle} from 'react-icons/fa';
import {Avatar, Button, Form, Input, InputPicker, Tag} from 'rsuite';
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
    const token = getCookie('teammers-access-token')
    const [positions, setPositions] = useState([]);
    const [skills, setSkills] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedPositions, setSelectedPositions] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [owner, setOwner] = useState({
        full_name: props.userData.full_name
    })
    const [portfolioUrlList, setPortfolioUrlList] = useState(props.userData?.detail?.portfolio)
    useEffect(async () => {
        axios.get(config.BASE_URL + "positions")
            .then(res => {
                setPositions(res.data.data.items.map(item => {
                    return {
                        value: item.id,
                        label: item.name ? item.name : ''
                    }
                }))
            })
        axios.get(config.BASE_URL + "skills")
            .then(res => {
                setSkills(res.data.data.items.map(item => {
                    return {
                        value: item.id,
                        label: item.name ? item.name : ''
                    }
                }))
            })
        axios.get(config.BASE_URL + "locations")
            .then(res => setLocations(res.data.data.items.map(item => {
                return {
                    value: item.id,
                    label: item.name ? item.name : ''
                }
            })))
        axios.get(config.BASE_URL+"auth/user?include=project,skills,positions,experiences,detail.location",{
            headers : {
                Authorization : "Bearer "+token
            }
        })
            .then(res => {
                console.log(res)
            })
        // const fetchUserInfo = getFetchData("auth/user?include=project,skills,positions,experiences,detail.location", token);
        // console.log(fetchUserInfo)
    }, [])
    console.log(props);
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
                                    src={props.userData?.detail?.photo ? props.userData.detail.photo : "https://www.w3schools.com/howto/img_avatar.png"}
                                    alt="username surname"
                                />
                                <div className="profile-title-content">
                                    <h4>{props.userData?.full_name}</h4>
                                    <span>Edit Profile</span>
                                </div>
                            </div>
                            <Button
                                color="blue"
                                appearance="primary"
                                className='save-btn'

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
                                        src={props.userData?.detail?.photo ? props.userData.detail.photo : "https://www.w3schools.com/howto/img_avatar.png"}
                                        alt="username surname"
                                    />
                                </div>
                                <Button
                                    color="blue"
                                    appearance="primary"
                                    className="btn-custom-outline change-avatar-btn"
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
                                    <div className="col-md-8 mb-4">
                                        <Form.Group controlId="position">
                                            <Form.ControlLabel>Position</Form.ControlLabel>
                                            <InputPicker
                                                size="md"
                                                className="w-100"
                                                placeholder="Position"
                                                data={positions}
                                                onChange={(e) => {
                                                    if (e && !selectedPositions.some(i => i === e))
                                                        setSelectedPositions([...selectedPositions, e])
                                                }}
                                            />
                                            {
                                                selectedPositions.length > 0 && selectedPositions.map((item, index) => {
                                                    return <Tag
                                                        key={index}
                                                        closable
                                                        className="custom-tag mt-2"
                                                        onClose={() => {
                                                            let data = selectedPositions.filter(i => i !== item);
                                                            setSelectedPositions(data);
                                                        }}
                                                    >
                                                        {item}
                                                    </Tag>
                                                })
                                            }
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-4 mb-4">
                                        <Form.Group controlId="experience">
                                            <Form.ControlLabel>Years of experience</Form.ControlLabel>
                                            <Form.Control name="experience" placeholder="Year" type="number" min="0"/>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <Form.Group controlId="position">
                                            <Form.ControlLabel>Skills</Form.ControlLabel>
                                            <InputPicker
                                                size="md"
                                                className="w-100"
                                                placeholder="Skills"
                                                data={skills}
                                                onChange={(e) => {
                                                    if (e && !selectedSkills.some(i => i === e))
                                                        setSelectedSkills([...selectedSkills, e])
                                                }}
                                            />
                                            {
                                                selectedSkills.length > 0 && selectedSkills.map((item, index) => {
                                                    return <Tag
                                                        key={index}
                                                        closable
                                                        className="custom-tag mt-2"
                                                        onClose={() => {
                                                            let data = selectedSkills.filter(i => i !== item);
                                                            setSelectedSkills(data);
                                                        }}
                                                    >
                                                        {item}
                                                    </Tag>
                                                })
                                            }
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