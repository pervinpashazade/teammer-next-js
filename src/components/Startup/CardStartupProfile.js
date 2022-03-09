import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
    Avatar, Button,
} from 'rsuite';

const CardStartupProfile = (props) => {
    const {
        user_id,
        editMode,
        title,
        logo,
        startup_type,
        classNames,
        owner_id,
        owner_fullname,
        owner_image_url,
    } = props;

    React.useEffect(() => {
        // console.log("owner_image_url", owner_image_url);
    }, [])

    return (
        <div className={`profile-card-startup ${classNames ? classNames : ''}`}>
            <div className="wrapper">
                <div className="_title">
                    <h2>
                        {title}
                        {
                            editMode &&
                            <Link href="/startup/edit/5" passHref>
                                <a className='link-edit-startup'>
                                    <Image
                                        src={'/icons/edit.svg'}
                                        alt='img'
                                        width={16}
                                        height={16}
                                        layout='fixed'
                                    />
                                </a>
                            </Link>
                        }
                    </h2>
                </div>
                <div className="_type">
                    <p>{startup_type}</p>
                </div>
                <Avatar
                    size="lg"
                    circle
                    src={logo ? logo : "https://www.w3schools.com/howto/img_avatar.png"}
                    alt="startup profile img"
                    className='profile-img'
                />
                <div className="owner-details">
                    <Avatar
                        size="sm"
                        circle
                        src={owner_image_url ? owner_image_url : "https://www.w3schools.com/howto/img_avatar.png"}
                        alt="startup owner profile img"
                        className='_owner-avatar'
                    />
                    <div className='_details'>
                        <h4>
                            {owner_fullname}
                        </h4>
                        <p>Owner</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardStartupProfile