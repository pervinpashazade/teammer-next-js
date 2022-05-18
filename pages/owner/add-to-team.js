import Head from "next/head";
import React, {useEffect, useState} from "react";
import CardTeammerProfile from '../../src/components/Profile/CardTeammerProfile'
import {Button, IconButton, InputPicker, Modal, Notification, toaster} from "rsuite";
import {HiArrowLeft} from "react-icons/hi";
import Link from 'next/link';
import getAuth from "../../lib/session";
import config from "../../src/configuration";
import {getFetchData} from "../../lib/fetchData";
import {getToken} from "../../lib/session";
import axios from "axios";
import {useAuth} from "../../Auth";

const AddToTeam = () => {
    // const {items} = props.data;
    const {currentUser} = useAuth();
    const [items, setItems] = useState([])
    const [projects, setProjects] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [open, setOpen] = useState(false);
    const [teammerId, setTeammerId] = useState('');
    const [teammerName, setTeammerName] = useState('');
    const [startupName, setStartUpName] = useState('');
    const [jobName, setJobName] = useState(0);
    const removeFromTeam = (id) => {
        console.log(id)
        if (id) {
            axios.post(config.BASE_URL + "team-requests/" + id + "/reject", {})
                .then(res => {
                    console.log(res);
                    getData();
                })
        }
    }
    const getProjects = () => {
        axios.get(config.BASE_URL + "users/projects")
            .then(res => {
                setProjects(res?.data.data.items.map(item => {
                    return {
                        label: item.title,
                        value: item.id
                    }
                }))
            })
    }
    const getData = () => {
        axios.get(config.BASE_URL +
            'teammers?include=detail,skills,positions,self_request,experiences,detail.location&per_page=3')
            .then(res => {
                setItems(res.data.data.items)
            });
    };
    useEffect(() => {
        getProjects();
        getData()
    }, [])
    const getJobs = async (e) => {
        if (e) {
            // let res = await getFetchData("users/projects?include=jobs.position", cookies.get('teammers-access-token'));
            axios.get(config.BASE_URL + "users/projects?include=jobs.position")
                .then(res => {
                    console.log(res)
                    if (res.data.success) {
                        setJobs(res.data.data.items.find(item => item.id === e).jobs.map(item => {
                            return {
                                label: item.position.name,
                                value: item.id
                            }
                        }))
                        setStartUpName(e)
                    }

                })
        } else {
            setJobs([]);
            setStartUpName('')
        }
    };
    const addToTeam = (data, id) => {
        setTeammerId(id)
        setTeammerName(data);
        setOpen(!open);
    };
    const submitAddToTeam = async () => {
        if (currentUser && currentUser?.id) {
            axios.post(config.BASE_URL + "jobs/" + jobName + "/add-to-team", {
                id: teammerId
            }).then(res => {
                console.log('adks')
                toaster.push(
                    <Notification type={"success"} header="Success!" closable>
                        New Teammer added!
                    </Notification>, 'topEnd'
                );
                getData();
                setOpen(!open);
                setJobName(0);
                setJobs([]);
                setTeammerId('');
                setStartUpName('');
            }).catch(error => {
                toaster.push(
                    <Notification type={"error"} header="Warning!" closable>
                        {error.response.data.message}
                    </Notification>, 'topEnd'
                );
            })
        }
    }
    return (
        <div className="owner">
            <Head>
                <title>Owner login</title>
                <meta name="description" content="Generated by create next app"/>
            </Head>
            <div>
                <div className="breadcrumb-wrapper">
                    <div className="goback-btn">
                        <Link href="/owner/home" passHref>
                            <IconButton
                                size="lg"
                                icon={<HiArrowLeft/>}
                                className="goback-btn"
                            />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="teammer-type-banner">
                <div className="product-div">
                    <h3>
                        <h3 className="mr-2">&#128526;</h3>Find people to join your team right now
                    </h3>
                </div>
            </div>
            <p className="text-center my-4" style={{fontSize: '22px'}}>
                You can also add people to your team👇
            </p>
            <div className="row" style={{marginTop: "170px"}}>
                {
                    items.map(item => <div className="col-md-4"><CardTeammerProfile props={
                        {
                            id: item.id,
                            isProfile: false,
                            full_name: item.full_name,
                            photo: item.detail.photo,
                            location: item.detail.location.name + " , " + item.detail.location.country_code,
                            skills: item.skills,
                            positions: item.positions,
                            year_of_experience: item.detail.years_of_experience,
                            bio_position: item.bio_position,
                            about: item.detail?.about,
                            self_request: item.self_request,
                            addToTeam: addToTeam,
                            removeFromTeam: removeFromTeam
                        }
                    } isProfile={false}/></div>)
                }
                <Modal open={open} onClose={() => {
                    setOpen(!open);
                    setTeammerId('')
                }}>
                    <Modal.Header>
                        <Modal.Title>Add to team</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Do you want to add <strong>{teammerName}</strong> to your Team?</p>
                        <InputPicker
                            size="lg"
                            data={projects}
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
AddToTeam.layout = true;
export const getServerSideProps = async (context) => {
    const auth = getAuth(context);
    if (auth === "1") {
        return {
            props: getFetchData('teammers?include=detail,skills,positions,self_request,experiences,detail.location&per_page=3', getToken(context))
        }
    } else if (auth !== "1")
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
}
export default AddToTeam;