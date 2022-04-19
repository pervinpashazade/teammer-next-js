import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
    Avatar, Button, Tag,
} from 'rsuite';

const CardOwnStartupList = (props) => {
    const {
        editMode,
        title,
        startupList,
        classNames,
        showStartupDetails,
        setIsOpen
    } = props;
    // React.useEffect(() => {
    //     console.clear();
    //     console.log('props', startupList);
    // }, [props])
    return (
        <div className={`startup-list-card ${classNames ? classNames : ''}`}>
            <div className="wrapper">
                {
                    title ?
                        <div className="_title">
                            <h4>{title}</h4>
                            <Button
                                className='btn-add'
                                onClick={() => {
                                console.log('salam')
                                }
                                }
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
                    startupList?.map((item, index) => {
                        return <div key={index} className="startup-list-item">
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
                                <Link
                                    passHref
                                    href={`/startup/${item.id}`}
                                >
                                    <a
                                        className="btn btn-startup-link"
                                    >
                                        <Image
                                            src={'/icons/arrow-right_white.svg'}
                                            alt='icon'
                                            width={18}
                                            height={18}
                                        />
                                    </a>
                                </Link>
                            </div>
                            <span className='own-startup-type'>Job Position</span>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default CardOwnStartupList