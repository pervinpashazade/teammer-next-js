import React from 'react';
import {
    Avatar, Button,
    IconButton,
    Tag
} from 'rsuite';
import ActionLink from '../Lib/ActionLink';
import { GrMailOption } from 'react-icons/gr'
import Image from 'next/image';
const CardTeammerProfile = ({ isProfile }) => {
    console.log(isProfile)
    return (
        <div className='profile-card-teammer'>
            <div className="card-top">
                <Avatar
                    size="lg"
                    circle
                    src="/img/avatar2.png"
                    alt="profile img"
                />
                <div className="icons-wrapper">
                    <IconButton
                        size="sm"
                        icon={
                            // <img src='/social-images/facebook_muted.svg' alt='facebook icon svg' />
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
                            // <img src='/social-images/twitter_muted.svg' alt='twitter icon svg' />
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
                            // <img src='/social-images/linkedin_muted.svg' alt='linkedin icon svg' />
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
                    href="profile-teammer/edit"
                    classNames='bg-transparent'
                    padding="7px"
                    margin="0px 0px 0px 0.5rem"
                >
                    {/* <img src='/icons/edit.svg' alt='edit icon svg' /> */}
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
                    <h1>Margaret Brown</h1>
                    <h3>Lead UX/UI Designer / 6 years experience</h3>
                    <p>
                        {/* <img
                            src='/icons/work.svg'
                            alt='work experience icon'
                        /> */}
                        <Image
                            src={'/icons/work.svg'}
                            alt='img'
                            width={16}
                            height={16}
                            layout='fixed'
                        />
                        Graphic Design / Motion / Graphics / Branding
                    </p>
                    <p>
                        {/* <img
                            src='/icons/location.svg'
                            alt='location icon'
                        /> */}
                        <Image
                            src={'/icons/location.svg'}
                            alt='img'
                            width={16}
                            height={16}
                            layout='fixed'
                        />
                        San Francisco, CA
                    </p>
                </div>
                <div className="tag-wrapper">
                    <Tag size="lg" className="custom-tag">Teammer</Tag>
                    <Tag size="lg" className="custom-tag">Teammer</Tag>
                    <Tag size="lg" className="custom-tag">Teammer</Tag>
                    <Tag size="lg" className="custom-tag">Teammer</Tag>
                    <Tag size="lg" className="custom-tag">Teammer</Tag>
                    <Tag size="lg" className="custom-tag">Teammer</Tag>
                </div>
                {isProfile ? <div className="bio-wrapper">
                    Hi there 🖖
                    <br />
                    My name is Zoia
                    <br />
                    <br />
                    I’m a UX/UI designer with 4+ years of experience and with an understanding of the
                    design process from concepts and market research to detailed design and implementation.
                </div> : <div className="d-flex justify-content-around profile-buttons pt-3">
                    <Button>Add to team</Button>
                    <Button><GrMailOption /></Button>
                </div>}
            </div>
        </div>
    )
}

export default CardTeammerProfile
