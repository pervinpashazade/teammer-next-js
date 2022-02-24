import React from 'react';
import {
    Avatar, Button,
    IconButton,
    Tag
} from 'rsuite';
import ActionLink from '../Lib/ActionLink';
import { GrMailOption } from 'react-icons/gr'
import Image from 'next/image';

const CardTeammerProfile = ({ props }) => {
    const {
        full_name,
        photo,
        year_of_experience,
        bio_position,
        location,
        about,
        skills,
        positions,
        isProfile,
        addToTeam
    } = props;

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
                <ActionLink
                    size="sm"
                    href="/teammer/profile/edit"
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
            </div>
            <div className="card-content">
                <div className="profile">
                    <h1>
                        {full_name ? full_name : ''}
                    </h1>
                    <h3>
                        {bio_position}
                        {
                            bio_position && year_of_experience ? ' / ' : ''
                        }
                        {year_of_experience ? `${year_of_experience} years experience` : ''}
                    </h3>
                    <div className='_info-wrap'>
                        <Image
                            src={'/icons/work.svg'}
                            alt='img'
                            width={16}
                            height={16}
                            layout='fixed'
                        />
                        <span className='ml-2'>
                            {positions?.map(item => item.name + " / ")}
                        </span>
                    </div>
                    <div className='_info-wrap'>
                        <Image
                            src={'/icons/location.svg'}
                            alt='img'
                            width={16}
                            height={16}
                            layout='fixed'
                        />
                        <span className='ml-2'>
                            {/* {location} */}
                            {location?.name}
                        </span>
                    </div>
                </div>
                <div className="tag-wrapper">
                    {
                        skills?.map((item, index) => {
                            return <Tag key={index} size="lg" className="custom-tag">{item.name}</Tag>
                        })
                    }
                </div>
                {
                    isProfile ? <div className="bio-wrapper">
                        {about}
                    </div>
                        :
                        <div className="d-flex justify-content-around profile-buttons pt-3">
                            <Button onClick={() => addToTeam(full_name)}>Add to team</Button>
                            <Button><GrMailOption /></Button>
                        </div>
                }
            </div>
        </div>
    )
}

export default CardTeammerProfile
