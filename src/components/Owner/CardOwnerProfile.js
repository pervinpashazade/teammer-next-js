import React, { useState } from 'react';
import {
    Avatar,
    Button,
    IconButton,
    Tag
} from 'rsuite';
import ActionLink from '../Lib/ActionLink';
import Image from 'next/image';
import { withCookie } from 'next-cookie';

const CardOwnerProfile = ({ props, cookie }) => {
    const {
        full_name,
        photo,
        about,
        isProfile,
    } = props;

    const [loggedUser, setLogedUser] = useState({
        id: cookie.get('teammers-id'),
        teammer_type: cookie.get('teammers-type'),
    });

    return (
        <div className='profile-card-teammer'>
            <div className="card-top">
                <Avatar
                    size="lg"
                    circle
                    src={photo ? photo : "https://www.w3schools.com/howto/img_avatar.png"}
                    alt="profile img"
                />
                <div className="icons-wrapper">
                    <IconButton
                        size="sm"
                        icon={
                            <Image
                                src={'/social-images/facebook_muted.svg'}
                                alt='img'
                                width={16}
                                height={16}
                                layout='fixed'
                            />
                        }
                    />
                    <IconButton
                        size="sm"
                        icon={
                            <Image
                                src={'/social-images/twitter_muted.svg'}
                                alt='img'
                                width={16}
                                height={16}
                                layout='fixed'
                            />
                        }
                    />
                    <IconButton
                        size="sm"
                        icon={
                            <Image
                                src={'/social-images/linkedin_muted.svg'}
                                alt='img'
                                width={16}
                                height={16}
                                layout='fixed'
                            />
                        }
                    />
                </div>
                {
                    isProfile &&
                    <ActionLink
                        size="sm"
                        href="/owner/profile/edit"
                        classNames='bg-transparent'
                        padding="7px"
                        margin="0px 0px 0px 0.5rem"
                    >
                        <Image
                            src={'/icons/edit.svg'}
                            alt='img'
                            width={16}
                            height={16}
                            layout='fixed'
                        />
                    </ActionLink>
                }
            </div>
            <div className="card-content">
                <div className="profile">
                    <h1>
                        {full_name ? full_name : ''}
                    </h1>
                    <h3>Owner</h3>
                </div>
                <div className="bio-wrapper">
                    {about}
                </div>
            </div>
        </div>
    )
}

export default withCookie(CardOwnerProfile);