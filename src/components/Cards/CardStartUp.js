import React from 'react';
import Image from "next/image";
import { Avatar } from "rsuite"
import axios from 'axios';
import config from '../../configuration';
import { withCookie } from 'next-cookie';

const CardStartUp = (props) => {
    const { cookie } = props;
    const {
        jobId,
        title,
        position,
        ownerFullname,
        ownerAvatarUrl,
    } = props;

    // React.useEffect(() => {
    //     console.log('jobId', jobId);
    // }, [props]);

    const attackSaveProject = () => {
        if (!jobId) return;

        axios.post(config.BASE_URL + 'users/save-project', { id: jobId }, {
            headers: {
                'Authorization': 'Bearer ' + cookie.get('teammers-access-token')
            }
        }).then(res => {
            console.log('res', res);
        }).catch(error => console.log('errorres', error.response));
    };

    return (
        <div>
            <div className="card-opportunity">
                <div className="logo"><h2>LOGO</h2></div>
                <div className="position">
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
                        <p>{title}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withCookie(CardStartUp);
