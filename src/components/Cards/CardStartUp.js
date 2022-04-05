import React from 'react';
import Image from "next/image";
import { Avatar, Button } from "rsuite"
import axios from 'axios';
import config from '../../configuration';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CardStartUp = (props) => {

    const router = useRouter();

    const {
        jobId,
        startupId,
        title,
        position,
        ownerFullname,
        ownerAvatarUrl,
        onClick,
    } = props;

    // React.useEffect(() => {
    //     console.log('jobId', jobId);
    // }, [props]);

    const attackSaveProject = () => {
        if (!jobId) return;

        axios.post(config.BASE_URL + 'users/save-project', { id: jobId }).then(res => {
            console.log('res', res);
        }).catch(error => console.log('errorres', error.response));
    };

    return (
        // <Link href={`/job/${jobId}`} passHref>
        //     <a>
        <div
            className="job-card"
            onClick={() => router.push(`/job/${jobId}`)}
        >
            <div className="logo-wrapper">
                <h2>LOGO</h2>
            </div>
            <div className="_content">
                <div className="_top">
                    <div className="_owner-info">
                        <Avatar
                            circle
                            size='sm'
                            src={
                                ownerAvatarUrl ? ownerAvatarUrl
                                    :
                                    "https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
                            }
                        />
                        <p className="name">{ownerFullname}</p>
                    </div>
                    <Button
                        onClick={attackSaveProject}
                    >
                        <Image
                            src={'/icons/save.svg'}
                            alt='img'
                            width={12}
                            height={24}
                            layout='fixed'
                        />
                    </Button>
                </div>
                <div className="_body">
                    <div className="_card-data">
                        <p>Job Position</p>
                        <h3>{position}</h3>
                    </div>
                    <div className="_card-data">
                        <p>Name of the startup</p>
                        <h3>
                            <Link href={`/startup/${startupId}`} passHref>
                                <a className="navbar-brand">
                                    {title}
                                </a>
                            </Link>
                        </h3>
                    </div>
                </div>
            </div>
            {/* <div className="position">
                        <div className="person">
                            <div>
                                <Avatar
                                    circle
                                    src={
                                        ownerAvatarUrl ? ownerAvatarUrl
                                            :
                                            "https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
                                    }
                                />
                                <p className="name">{ownerFullname}</p>
                            </div>
                            <div
                                className='save-job-icon'
                                onClick={attackSaveProject}
                            >
                                <Image
                                    src={'/icons/save.svg'}
                                    alt='img'
                                    width={12}
                                    height={24}
                                    layout='fixed'
                                />
                            </div>
                        </div>
                        <div className="job-info">
                            <p>Job Position</p>
                            <p>{position}</p>
                        </div>
                        <div className="job-info">
                            <p>Name of the startup</p>
                            <p>
                                <Link href={`/startup/${startupId}`} passHref>
                                    <a className="navbar-brand">
                                        {title}
                                    </a>
                                </Link>
                            </p>
                        </div>
                    </div> */}
        </div>
        //     </a>
        // </Link>
    )
}
export default CardStartUp;