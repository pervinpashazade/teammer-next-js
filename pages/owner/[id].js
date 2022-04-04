import React, {useEffect, useState} from 'react';
import {Button, InputPicker, Modal, Notification, Panel, toaster} from 'rsuite';
import BreadCrumb from '../../src/components/Lib/BreadCrumb';
import Banner from '../../src/components/Lib/Banner';
import CardTeammerProfile from '../../src/components/Profile/CardTeammerProfile';
import CardTeammerWorkExperience from '../../src/components/Profile/CardTeammerWorkExperience';
import CardStartUp from '../../src/components/Cards/CardStartUp';
import CardTeammerPortfolio from '../../src/components/Profile/CardTeammerPortfolio';
import config from '../../src/configuration';
import { getFetchData } from '../../lib/fetchData';
import { getToken } from "../../lib/session";
import ProPanel from '../../src/components/ProPanel';
import axios from "axios";
import {useAuth} from "../../Auth";
import {useRouter} from "next/router";

const ProfileOwner = (props) => {
    const {currentUser} = useAuth();
    const {
        joinedProjectList,
    } = props;
    const router = useRouter();
    const teammerId = Number(router.query.id)
    const [open , setOpen] = useState(false)
    // const [teammerId , setTeammerId] = useState('')
    const [teammerName, setTeammerName] = useState('');
    const [startupName, setStartUpName] = useState('');
    const [jobName, setJobName] = useState(0);
    const [jobs, setJobs] = useState([]);
    const [project , setProject] = useState('');
    useEffect(()=>{
        axios.get(config.BASE_URL+"users/projects")
            .then(res=> setProject(res.data.data.items.map(item => {
                return {
                    label: item.title,
                    value: item.id
                }
            })))
    },[])
    React.useEffect(() => {
        // console.clear();
    }, [props]);

    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const [portfolioUrlList, setPortfolioUrlList] = useState({
        cvFileName: props.userData?.detail.cv,
        cv: '',
        portfolio: props.userData?.detail?.portfolio
    })
    const toggleCreateModal = () => {
        setIsOpenCreateModal(!isOpenCreateModal);
    };
    const getJobs = async (e) => {
        if (e) {
            axios.get(config.BASE_URL+"users/projects?include=jobs.position")
                .then(res => {
                    setJobs(res.data.data.items.find(item => item.id === e).jobs.map(item => {
                        return {
                            label: item.position.name,
                            value: item.id
                        }
                    }))
                    setStartUpName(e)
                })
            // axios.get(config.BASE_URL+"users/projects?include=jobs.position")
            //     .then(res => {
            //         setJobs(res.data.items.find(item => item.id === e).jobs.map(item => {
            //             return {
            //                 label: item.position.name,
            //                 value: item.id
            //             }
            //         }))
            //         setStartUpName(e)
            //     })
            // let res = await getFetchData("users/projects?include=jobs.position", cookies.get('teammers-access-token'));

        } else {
            setJobs([]);
            setStartUpName('')
        }
    };
    const addToTeam = (data , id) => {
        // setTeammerId(id)
        setTeammerName(data);
        setOpen(!open);
    };
    const submitAddToTeam = async () => {
        if (currentUser?.id) {
            axios.post(config.BASE_URL + "jobs/" + jobName + "/add-to-team", {
                id: teammerId
            }).then(res => {
                toaster.push(
                    <Notification type={"success"} header="Success!" closable>
                        New Teammer added!
                    </Notification>, 'topEnd'
                );
                setOpen(!open);
                setJobName(0);
                setJobs([]);
                setStartUpName('');
            })
                .catch(error => {
                toaster.push(
                    <Notification type={"error"} header="Warning!" closable>
                        {error.response?.data?.message}
                    </Notification>, 'topEnd'
                );
            })
        }
    }
    return (
        <div className='profile-teammer'>
            <BreadCrumb />
            <Banner />
            <div className="profile-wrapper">
                <div className="left-side">
                    <CardTeammerProfile
                        props={
                            {
                                isProfile: false,
                                full_name: props.userData?.full_name,
                                photo: props.userData.detail?.photo,
                                location: props.userData.detail?.location,
                                skills: props.userData?.skills,
                                positions: props.userData.positions,
                                year_of_experience: props.userData.detail?.years_of_experience,
                                about: props.userData?.detail?.about,
                                addToTeam : addToTeam
                            }
                        }
                    />
                    <CardTeammerWorkExperience
                        workExperienceList={props.userData?.experiences}
                        editMode={false}
                        createModal={{
                            isOpen: isOpenCreateModal,
                            toggleFunc: toggleCreateModal,
                            title: "Add Work Experience",
                            locationlist: []
                        }}
                    />
                </div>
                <div className="content">
                    <div className="portfolio-wrapper">
                        <h5>CV and Portfolio</h5>
                        <CardTeammerPortfolio
                            portfolioUrlList={portfolioUrlList}
                            setPortfolioUrlList={setPortfolioUrlList}
                        />
                    </div>
                    <div className="custom-devider"></div>
                    <ProPanel
                        title="Projects joined"
                        noDataMessage="User has not yet joined any project"
                        dataList={joinedProjectList?.length ? joinedProjectList : []}
                    />
                </div>
                <Modal open={open} onClose={() => {
                    setOpen(!open);
                }}>
                    <Modal.Header>
                        <Modal.Title>Add to team</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Do you want to add <strong>{teammerName}</strong> to your Team?</p>
                        <InputPicker
                            size="lg"
                            data={project}
                            onChange={(e) => getJobs(e)}
                            placeholder="Name of Startup"
                            className="w-100"
                        />
                        <InputPicker
                            size="lg"
                            disabled={jobs.length === 0}
                            data={jobs}
                            value={jobName}
                            onChange={(e) => setJobName(e)}
                            placeholder="Position"
                            className="w-100 mt-3"
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => {
                            setOpen(!open);
                            setTeammerId('')
                        }} appearance="subtle">
                            Cancel
                        </Button>
                        <Button onClick={() => submitAddToTeam()} appearance="primary" disabled={!jobName}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

ProfileOwner.layout = true;

export default ProfileOwner;

export const getServerSideProps = async (context) => {

    const fetchUserInfo = await getFetchData(`users/${context.params.id}/show?include=detail.experience_level,experiences.location,skills,positions,detail.location`, getToken(context));

    // const joinedProjectList = await getFetchData("users/projects?include=jobs", getToken(context));

    return {
        props: {
            userData: fetchUserInfo?.data,
            // joinedProjectList: joinedProjectList,
        }
    }
}