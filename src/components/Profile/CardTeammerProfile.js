import React, { useState } from 'react';
import { useRouter } from 'next/router'
import {
    Avatar,
    Button,
    IconButton,
    Tag
} from 'rsuite';
import ActionLink from '../Lib/ActionLink';
import Image from 'next/image';
import { withCookie } from 'next-cookie';

const CardTeammerProfile = ({ props, cookie }) => {

    const router = useRouter();

    const {
        user,
        viewProfileLink,
        id,
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

    const [loggedUser, setLogedUser] = useState({
        id: cookie.get('teammers-id'),
        teammer_type: cookie.get('teammers-type'),
    });

    const viewProfile = () => {
        if (!id) return;
        router.push(`/teammer/${id}`);
    }

    // React.useEffect(() => {
    //     // console.log('user log', cookie.get('teammers-type'));
    //     // setLogedUser({
    //     //     id: cookie.get('teammers-id'),
    //     //     teammer_type: cookie.get('teammers-type'),
    //     // })

    //     console.log('CARD TEAMMER LOG USER => ', user);

    // }, [user]);

    return (
        <div className='profile-card-teammer'>
            <div className="card-top">
                <Avatar
                    circle
                    size="lg"
                    alt="profile img"
                    className={`${!isProfile ? 'c-pointer' : ''}`}
                    src={photo ? photo : "https://www.w3schools.com/howto/img_avatar.png"}
                    onClick={() => !isProfile && id && viewProfile()}
                />
                <div className="icons-wrapper">
                    <IconButton
                        size="sm"
                        icon={
                            <Image
                                width={16}
                                height={16}
                                layout='fixed'
                                alt='img'
                                src={'/social-images/facebook_muted.svg'}
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
                }
            </div>
            <div className="card-content">
                <div className="profile">
                    {
                        isProfile && full_name ?
                            <h1>
                                {full_name}
                            </h1>
                            :
                            <h1
                                className='c-pointer'
                                onClick={() => viewProfile()}
                            >
                                {full_name}
                            </h1>
                    }
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
                <div className="bio-wrapper">
                    {about}
                </div>
                {
                    !isProfile && loggedUser?.teammer_type === "1" &&
                    <div className="d-flex justify-content-around profile-buttons pt-3">
                        <Button onClick={() => addToTeam(full_name)}>Add to team</Button>
                        <Button>
                            <Image
                                src={'/icons/envelope_white.svg'}
                                alt='img'
                                width={16}
                                height={16}
                                layout='fixed'
                            />
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default withCookie(CardTeammerProfile);