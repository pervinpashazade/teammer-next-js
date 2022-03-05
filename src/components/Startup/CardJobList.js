import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
    Avatar, Button, Tag,
} from 'rsuite';

const CardJobList = (props) => {
    const {
        editMode,
        title,
        jobList,
        classNames,
        showStartupDetails,
    } = props;
    // React.useEffect(() => {
    //     console.clear();
    //     console.log('props', jobList);
    // }, [props])
    return (
        <div className={`job-list-card ${classNames ? classNames : ''}`}>
            <div className="wrapper">
                {
                    title ?
                        <div className="_title">
                            <h4>{title}</h4>
                            <Button
                                className='btn-add'
                            >
                                <Image
                                    src={'/icons/plus.svg'}
                                    alt='icon'
                                    width={14}
                                    height={14}
                                />
                            </Button>
                        </div>
                        :
                        null
                }
                {
                    jobList?.map((item, index) => {
                        return <div key={index} className="job-list-item">
                            {
                                showStartupDetails &&
                                <div className="startup-details">
                                    {
                                        item.project &&
                                        <Avatar
                                            circle
                                            size='md'
                                            src={item.project.logo ? item.project.logo : "https://www.w3schools.com/howto/img_avatar.png"}
                                            className='user-avatar'
                                            alt="user photo"
                                        />
                                    }
                                    {
                                        item.project &&
                                        <p>{item.project.title && item.project.title}</p>
                                    }
                                </div>
                            }
                            <span>Job Position</span>
                            <div className="position">
                                <h2>
                                    {item.position?.name}
                                </h2>
                                <Link
                                    passHref
                                    href={`/job/${item.id}`}
                                >
                                    <a
                                        className="btn btn-job-link"
                                    >
                                        <Image
                                            src={'/icons/arrow-right_white.svg'}
                                            alt='icon'
                                            width={18}
                                            height={18}
                                        />
                                    </a>
                                </Link>
                                <div className="tag-wrapper">
                                    {
                                        item.project?.type &&
                                        <Tag size="lg" className="custom-tag mb-2">
                                            {item.project?.type?.name}
                                        </Tag>
                                    }
                                    {/* {
                                        !showStartupDetails && item.project?.type &&
                                        <Tag size="lg" className="custom-tag mb-2">
                                            {item.project?.type?.name}
                                        </Tag>
                                    } */}
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default CardJobList