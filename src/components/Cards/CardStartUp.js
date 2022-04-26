import React, { useState } from 'react';
import Image from "next/image";
import { Avatar, Button, Notification, toaster } from "rsuite"
import axios from 'axios';
import config from '../../configuration';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AuthModal from "../Modals/AuthModal";
import { useAuth } from "../../../Auth";

const CardStartUp = (props) => {

    const router = useRouter();

    const {
        jobId,
        startupId,
        isSaved,
        title,
        position,
        ownerFullname,
        ownerAvatarUrl,
        logo,
        isStartup,
        unsaveFunction,
    } = props;

    // React.useEffect(() => {
    //     console.log('jobId', jobId);
    // }, [props]);
    const { currentUser } = useAuth();

    const routing = () => {
        router.push(`/${isStartup ? "startup" : "job"}/${jobId}`)
    }
    const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);

    const checkSave = () => {
        if (!currentUser) {
            setIsOpenLoginModal(true);
            return;
        };

        if (!isSaved) {
            attackSaveProject()
        } else {
            unSaveProject();
        };
    };

    const attackSaveProject = () => {
        if (!jobId) return;
        axios.post(config.BASE_URL + 'users/save-item', { id: jobId, type: 'job' })
            .then(res => {
                // console.log('res', res);
                toaster.push(
                    <Notification type={"success"} header="Success" closable>
                        <span className='font-weight-bold'>{title}</span> added to saved jobs!
                    </Notification>, 'topEnd'
                );
            }).catch(error => console.log('errorres', error.response));
    };

    const unSaveProject = () => {
        if (!jobId) return;
        axios.post(config.BASE_URL + 'users/unsave-project', { id: jobId, type: 'job' }).then(res => {
            // console.log('res', res);
            toaster.push(
                <Notification type={"info"} header="Attention" closable>
                    <span className='font-weight-bold'>{title}</span> removed from saved jobs!
                </Notification>, 'topEnd'
            );
        }).catch(error => console.log('errorres', error.response));
    };

    return (
        // <Link href={`/job/${jobId}`} passHref>
        //     <a>
        <div className="job-card">
            <div onClick={routing} className="logo-wrapper">
                <h2>Logo</h2>
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
                        onClick={checkSave}
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
                    <div className="_card-data" onClick={routing}>
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
            <AuthModal isOpen={isOpenLoginModal} setIsOpen={setIsOpenLoginModal} />
        </div>
        //     </a>
        // </Link>
    )
}
export default CardStartUp;