import React, { useState } from 'react';
import { Avatar, Button, Modal, Notification, Tag, toaster } from 'rsuite';
import BreadCrumb from '../../src/components/Lib/BreadCrumb';
import Banner from '../../src/components/Lib/Banner';
import { getFetchData } from '../../lib/fetchData';
import { getToken } from "../../lib/session";
// import CardStartupProfile from '../../src/components/Startup/CardStartupProfile';
import CardJobList from '../../src/components/Startup/CardJobList';
import Image from 'next/image';
import axios from 'axios';
import config from '../../src/configuration';
import AuthModal from '../../src/components/Modals/AuthModal';
import { useAuth } from "../../Auth";
import { useRouter } from "next/router";
import { useChat } from '../../src/contexts/ChatProvider';
import { getCookie } from '../../src/helpers/cookie';
import Link from 'next/link';

function Startup(props) {

    const router = useRouter();

    const { chat } = useChat();

    const {
        fetchJobData,
        // logo,
        startupJobList,
        similarJobList,
    } = props;

    const { currentUser } = useAuth();
    const [jobData, setJobData] = useState(fetchJobData);
    const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
    const [isOpenConfirmCancelModal, setIsOpenConfirmCancelModal] = useState(false);

    React.useEffect(() => {
        // console.log('props job', jobData);
        setJobData(fetchJobData);
    }, [fetchJobData]);

    const getData = async () => {
        if (!currentUser) setIsOpenLoginModal(true)
        if (!jobData) return;
        axios.get(config.BASE_URL + `jobs/${jobData.id}?include=project,position,location,type`)
            .then((res) => {
                if (res.data.success) {
                    setJobData(res.data.data);
                }
            })
    };

    const sendMessage = () => {
        if (!jobData?.project?.owner?.id || !chat) return;

        if (!getCookie("teammers-access-token")) {
            setIsOpenLoginModal(true);
            return;
        }

        if (getCookie("teammers-access-token") && !getCookie("teammers-type")) {
            toaster.push(
                <Notification
                    type={"warning"}
                    header="Oopss!"
                    closable
                >
                    <p>
                        Please, complete your registration information.
                        <Button
                            className='ml-2'
                            onClick={() => router.push("/signup/steps")}
                        >
                            Complete registration
                        </Button>
                    </p>

                </Notification>, 'topEnd'
            );

            return;
        }

        // find conversation with job owner
        const conversation = chat.find(conversation => conversation.members.find(member => member.id === jobData.project.owner.id));

        if (conversation) {
            router.push(
                {
                    pathname: '/chat',
                    query: {
                        selectedConversationId: conversation.id
                    }
                }, '/chat'
            );

            return;
        }
        ;

        newConversationRequest(jobData.project.owner.id);
    };

    const newConversationRequest = userId => {
        if (!userId) return;

        axios.post(config.BASE_URL + 'conversations', {
            to: userId
        }).then(res => {
            if (res.data.success) {
                toaster.push(
                    <Notification type={"success"} header="Success!" closable>
                        Conversation request successfully sent!
                    </Notification>, 'topEnd'
                );
            }
            ;
        })
    };

    // console.log('JOB DATA =>', jobData);

    const applyToJob = () => {
        if (!jobData) return;

        if (!getCookie("teammers-access-token")) {
            setIsOpenLoginModal(true);
            return;
        }
        ;

        if (getCookie("teammers-access-token") && !getCookie("teammers-type")) {
            toaster.push(
                <Notification
                    type={"warning"}
                    header="Oopss!"
                    closable
                >
                    <p>
                        Please, complete your registration information.
                        <Button
                            className='ml-2'
                            onClick={() => router.push("/signup/steps")}
                        >
                            Complete registration
                        </Button>
                    </p>

                </Notification>, 'topEnd'
            );

            return;
        }

        if (getCookie("teammers-access-token")) {
            axios.post(config.BASE_URL + `jobs/${jobData.id}/apply`).then(res => {
                if (res.data.success) {
                    toaster.push(
                        <Notification
                            type={"success"}
                            header="Success!"
                            closable
                        >
                            <p className="text-success">
                                Your application has been sent successfully
                            </p>
                        </Notification>, 'topEnd'
                    );
                    getData();
                }
            })
                .catch(err => {
                    if (err.response?.status === 422) {
                        toaster.push(
                            <Notification
                                type={"warning"}
                                header="Warning!"
                                closable
                            >
                                <p className="text-warning">
                                    {err.response.data.message}
                                </p>
                            </Notification>, 'topEnd'
                        );
                    }
                    if (err.response?.status === 400) {
                        toaster.push(
                            <Notification
                                type={"warning"}
                                header="Oopss!"
                                closable
                            >
                                <p>
                                    Please, complete your registration information.
                                    <Button
                                        className='ml-2'
                                        onClick={() => router.push("/signup/steps")}
                                    >
                                        Complete registration
                                    </Button>
                                </p>

                            </Notification>, 'topEnd'
                        );
                    }
                })
        }
    };

    const rejectApplicationToJob = () => {
        if (!jobData) return;
        if (!jobData.self_request) return;
        axios.post(config.BASE_URL + `team-requests/${jobData.self_request.id}/reject`).then(res => {
            if (res.data.success) {
                getData();
                toaster.push(
                    <Notification
                        type={"success"}
                        header="Success!"
                        closable
                    >
                        <p className="text-success">
                            You have canceled your application successfully
                        </p>
                    </Notification>, 'topEnd'
                );
                setIsOpenConfirmCancelModal(false);
            }
        });
    };

    return (
        <>
            <div className='profile-job'>
                <BreadCrumb />
                <Banner />
                <div className="profile-wrapper">
                    <div className="content">
                        <div className="row">
                            <div className="col-md-12 col-lg-6 mb-4">
                                <div className="_top-title">
                                    <Avatar
                                        size="md"
                                        circle
                                        src={jobData?.project?.logo ? jobData.project.logo : "https://www.w3schools.com/howto/img_avatar.png"}
                                        alt="startup profile img"
                                    />
                                    <h2 className='startup-title'>
                                        {jobData?.project?.title}
                                    </h2>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-6 mb-4">
                                <div className="_top-actions">
                                    <ul>
                                        <li className='create-date'>
                                            {jobData?.created_at}
                                        </li>
                                        {/* <li className='create-date'>link</li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="job-details_top">
                            <h1 className="_title">
                                {jobData?.position?.name}
                            </h1>
                            <div className="tag-wrapper">
                                {
                                    jobData?.type?.name &&
                                    <Tag size="lg" className="custom-tag mb-4">{jobData?.type?.name}</Tag>
                                }
                            </div>
                            <ul>
                                {
                                    jobData?.location?.name &&
                                    <li>
                                        <Image
                                            src={'/icons/location.svg'}
                                            alt='icon'
                                            width={16}
                                            height={16}
                                        />
                                        <span className="item">{jobData.location.name}</span>
                                    </li>
                                }
                                {
                                    jobData?.type?.name &&
                                    <li>
                                        <Image
                                            src={'/icons/location.svg'}
                                            alt='icon'
                                            width={16}
                                            height={16}
                                        />
                                        <span className="item">{jobData.type.name}</span>
                                    </li>
                                }
                                {
                                    jobData?.salary &&
                                    <li>
                                        <Image
                                            src={'/icons/location.svg'}
                                            alt='icon'
                                            width={16}
                                            height={16}
                                        />
                                        <span className="item">{jobData.salary}</span>
                                    </li>
                                }
                                {
                                    jobData?.years_of_experience &&
                                    <li>
                                        <Image
                                            src={'/icons/location.svg'}
                                            alt='icon'
                                            width={16}
                                            height={16}
                                        />
                                        <span className="item">
                                            {jobData.years_of_experience} years of experience
                                        </span>
                                    </li>
                                }
                            </ul>
                            <div className="btn-wrapper">
                                {(currentUser && currentUser.type !== 1) && <span>{
                                    jobData?.self_request ?
                                        jobData.self_request.request_from === 2 ?
                                            <Button
                                                appearance="primary"
                                                onClick={() => setIsOpenConfirmCancelModal(true)}
                                            >
                                                Cancel application
                                            </Button>
                                            :
                                            '_'
                                        :
                                        <Button
                                            appearance="primary"
                                            onClick={applyToJob}
                                        >
                                            Apply
                                        </Button>
                                }</span>}
                                <Button
                                    appearance="primary"
                                    onClick={sendMessage}
                                >
                                    <Image
                                        src={'/icons/envelope_white.svg'}
                                        alt='icon'
                                        width={24}
                                        height={24}
                                    />
                                </Button>
                            </div>
                        </div>
                        <div className='startup-description'>
                            <h4 className='_title'>About this requirement</h4>
                            {/*{jobData?.description}*/}
                            <div dangerouslySetInnerHTML={{ __html: jobData?.description }}></div>
                        </div>
                    </div>
                    <div className="right-side">
                        <CardJobList
                            classNames="mb-3"
                            title={`Other requirements ${jobData?.project?.title}`}
                            jobList={startupJobList}
                        />
                        <CardJobList
                            classNames="mb-3"
                            title="Similar requirements"
                            jobList={similarJobList}
                            showStartupDetails
                        />
                        {(currentUser && currentUser.type === 1) &&
                            <a className="newstartup-button"
                                onClick={() => router.push("/owner/create-startup")}> Add New Startup
                            </a>}
                    </div>
                </div>
            </div>
            <AuthModal
                isOpen={isOpenLoginModal}
                setIsOpen={setIsOpenLoginModal}
            />
            {/* confirm cancel application modal */}
            <Modal
                size='sm'
                open={isOpenConfirmCancelModal}
                className='info-modal _auth'
                onClose={() => setIsOpenConfirmCancelModal(!isOpenConfirmCancelModal)}
                overflow={false}
            >
                <Modal.Header>
                    <Modal.Title>Are you sure cancel your application?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
                <Modal.Footer>
                    <div className="_modal-footer">
                        <Button
                            onClick={() => setIsOpenConfirmCancelModal(false)}
                        >
                            No, go back
                        </Button>
                        <Button
                            onClick={() => rejectApplicationToJob()}
                        >
                            Yes, cancel
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}

Startup.layout = true;

export default Startup;

export const getServerSideProps = async (context) => {
    // main datas
    const jobData = await getFetchData(
        `jobs/${context.params.id}?include=project,position,location,type,project.owner`,
        getToken(context)
    );
    let similarJobs = [];
    let startupJobs = [];

    // startup other jobs start
    const startupJobList = await getFetchData(
        `projects/${jobData?.data?.project?.id}/jobs?include=position,project.type,project.owner`,
        getToken(context)
    );
    if (jobData?.data?.project?.id) {
        startupJobs = startupJobList.data?.items?.filter(x => x.id !== jobData.data.id) || []
    }

    // startup other jobs end

    // similar job list start
    let postion_id = '';
    if (jobData?.data?.position?.id) {
        postion_id = jobData.data.position.id;
    }
    const filteredSimilarJobList = await getFetchData(`jobs?filter[position_id]=${postion_id}&include=project,project.type,position&per_page=5`);
    if (jobData?.data?.id && filteredSimilarJobList?.data?.items) {
        similarJobs = filteredSimilarJobList.data.items.filter(x => x.id !== jobData.data.id)
    }
    // similar job list end

    return {
        props: {
            fetchJobData: jobData?.data,
            startupJobList: startupJobs,
            similarJobList: similarJobs,
        }
    }
}