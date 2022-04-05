import React, {useState} from 'react';
import Image from "next/image";
import {Avatar} from "rsuite"
import axios from 'axios';
import config from '../../configuration';
import {withCookie} from 'next-cookie';
import Link from 'next/link';
import {useAuth} from "../../../Auth";
import AuthModal from "../Modals/AuthModal";
import {useRouter} from "next/router";

const CardStartUp = (props) => {
    console.log(props)
    const {
        jobId,
        startupId,
        title,
        position,
        ownerFullname,
        ownerAvatarUrl,
        onClick,
    } = props;

    const {currentUser} = useAuth();
    const router = useRouter();
    const [isOpenLoginModal , setIsOpenLoginModal] = useState(false);

    const routing =()=>{
        router.push(`/job/${jobId}`)
    }
    const attackSaveProject = () => {
        if (!jobId) return;

        axios.post(config.BASE_URL + 'users/save-project', {id: jobId}, {
            headers: {
                'Authorization': 'Bearer ' + cookie.get('teammers-access-token')
            }
        }).then(res => {
            console.log('res', res);
        }).catch(error => console.log('errorres', error.response));
    };
    const checkSave = () => {
        if(currentUser){
            axios.post(config.BASE_URL+'user/save-project',{
                id : jobId,
                type : 'job'
            })
        }
        else setIsOpenLoginModal(true)
    }
    return (
            <a>
                <div className="card-opportunity">
                    <a className="logo c-pointer" onClick={routing}><h2>LOGO</h2></a>
                    <div className="position">
                        <div className="person">
                            <div onClick={routing} className="c-pointer">
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
                            >
                                <a onClick={checkSave}>
                                    <Image
                                        src={'/icons/save.svg'}
                                        alt='img'
                                        width={12}
                                        height={24}
                                        layout='fixed'
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="job-info">
                            <p>Job Position</p>
                            <p onClick={routing} className="c-pointer">{position}</p>
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
                        <AuthModal
                            isOpen={isOpenLoginModal}
                            setIsOpen={setIsOpenLoginModal}
                        />
                    </div>
                </div>
            </a>
    )
}
export default withCookie(CardStartUp);
