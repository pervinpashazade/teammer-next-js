import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Avatar, Button } from 'rsuite'

function SavedJobCard(props) {

    const {
        jobId,
        startupId,
        isSaved,
        project,
        position,
        owner,
        ownerAvatarUrl,
        logo,
        isStartup,
        unsaveFunction,
    } = props;

    return (
        <div className="job-card">
            <div className="logo-wrapper">
                {
                    logo ?
                        <img
                            src={logo}
                            alt="logo"
                        />
                        :
                        <h2>Logo</h2>
                }
            </div>
            <div className="_content">
                <div className="_top">
                    <div className="_owner-info">
                        <Avatar
                            circle
                            size='sm'
                            src={
                                owner?.detail?.photo ? owner.detail.photo
                                    :
                                    "https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
                            }
                        />
                        <p className="name">{owner?.full_name}</p>
                    </div>
                    {/* <Button
                        // onClick={checkSave}
                    >
                        <Image
                            src={'/icons/save.svg'}
                            alt='img'
                            width={12}
                            height={24}
                            layout='fixed'
                        />
                    </Button> */}
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
                                    {project}
                                </a>
                            </Link>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SavedJobCard