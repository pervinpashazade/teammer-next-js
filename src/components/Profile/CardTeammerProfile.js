import React from 'react';
import {
    Avatar, Button,
    IconButton,
    Tag
} from 'rsuite';
import ActionLink from '../Lib/ActionLink';
import { GrMailOption } from 'react-icons/gr'
import Image from 'next/image';

const CardTeammerProfile = ({ props, isProfile }) => {
    const {
        full_name,
        photo,
        position,
        experienceYear,
        role,
        location,
        about,
        avatarUrl,
        skills,
        positions
    } = props;
    console.log(props)
    React.useEffect(() => {
        console.log('CardTeammerProfile', props);
    }, [props])

    return (
        <div className='profile-card-teammer'>
            <div className="card-top">
                <Avatar
                    size="lg"
                    circle
                    src={photo ? photo : "/img/avatar2.png"}
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
                    href="profile-teammer/edit"
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
                        {full_name}
                    </h1>
                    <h3>{position} / {experienceYear ? `${experienceYear} years experience` : ''}</h3>
                    <p>
                        <Image
                            src={'/icons/work.svg'}
                            alt='img'
                            width={16}
                            height={16}
                            layout='fixed'
                        />
                        {positions.map(item => item.name + " / ")}
                    </p>
                    <p>
                        <Image
                            src={'/icons/location.svg'}
                            alt='img'
                            width={16}
                            height={16}
                            layout='fixed'
                        />
                        {location}
                    </p>
                </div>
                <div className="tag-wrapper">

                    {
                        skills?.map((item, index) => {
                            return <Tag key={index} size="lg" className="custom-tag">{item.name}</Tag>
                        })
                    }

                </div>
                {isProfile ? <div className="bio-wrapper">

                    {about}

                    {/* Hi there 🖖
                    <br />
                    My name is Zoia
                    <br />
                    <br />
                    I’m a UX/UI designer with 4+ years of experience and with an understanding of the
                    design process from concepts and market research to detailed design and implementation. */}
                </div> : <div className="d-flex justify-content-around profile-buttons pt-3">
                    <Button>Add to team</Button>
                    <Button><GrMailOption /></Button>
                </div>}
            </div>
        </div>
    )
}

export default CardTeammerProfile
