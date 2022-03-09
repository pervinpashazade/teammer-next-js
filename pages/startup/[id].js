import React, { useState } from 'react';
import { Button, Panel } from 'rsuite';
import BreadCrumb from '../../src/components/Lib/BreadCrumb';
import Banner from '../../src/components/Lib/Banner';
import { getFetchData } from '../../lib/fetchData';
import { getToken } from "../../lib/session";
import CardStartupProfile from '../../src/components/Startup/CardStartupProfile';
import CardJobList from '../../src/components/Startup/CardJobList';
import Link from 'next/link';
import HomeSlider from '../../src/components/HomeSlider';
import Image from 'next/image';
import CardOwnStartupList from '../../src/components/Startup/CardOwnStartupList';
import { NEXT_URL } from '../../src/configuration';

function Startup(props) {

    const {
        startupData,
        startupJobList,
    } = props;

    const [userId, setUserId] = useState(null);

    React.useEffect(async () => {
        const fetchUser = await fetch(NEXT_URL + 'api/auth');
        const resObj = await fetchUser.json();
        setUserId(resObj?.user?.id)
    }, [])

    React.useEffect(() => {
        // console.clear();
        console.log('startup page props', props);
    }, [props]);

    return (
        <div className='profile-startup'>
            <BreadCrumb />
            <Banner />
            <div className="profile-wrapper">
                <div className="content">
                    <div className="startup-title">
                        <h1>About this project</h1>
                    </div>
                    <div className='startup-description'>
                        {startupData?.description}
                    </div>
                    {/* <button
                        className='btn btn-link p-0'
                    >
                        Show more
                    </button> */}
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
                    />

                    {
                        userId === startupData?.owner?.id &&
                        <>
                            <hr />
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
                                    <HomeSlider />
                                </div>
                            </div>
                            <hr />
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
                            <Link href="/startup/create-startup" passHref>
                                <a className='btn-add-startup'>
                                    Add New Startup
                                </a>
                            </Link>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

Startup.layout = true;

export default Startup;

export const getServerSideProps = async (context) => {

    const startupData = await getFetchData(`projects/${context.params.id}?include=owner,type`, getToken(context));
    const startupJobList = await getFetchData(
        `projects/${context.params.id}/jobs?include=position,project.owner`,
        getToken(context)
    );

    return {
        props: {
            startupData: startupData?.data,
            startupJobList: startupJobList?.data.items || []
        }
    }
}