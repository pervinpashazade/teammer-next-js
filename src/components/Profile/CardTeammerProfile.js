import React, { useState } from 'react';
import { useRouter } from 'next/router'
import {
    Avatar,
    Button,
    IconButton,
    Notification,
    Tag,
    toaster
} from 'rsuite';
import ActionLink from '../Lib/ActionLink';
import Image from 'next/image';
import { useAuth } from "../../../Auth";
import { getCookie } from '../../helpers/cookie';
import { useChat } from '../../contexts/ChatProvider';
import axios from 'axios';
import config from '../../configuration';

const CardTeammerProfile = ({ props }) => {

    const context = useAuth();

    const { chat } = useChat();

    const router = useRouter();

    const type = context?.currentUser?.type;
    const {
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
        addToTeam,
        self_request,
        removeFromTeam
    } = props;

    const [loggedUser, setLogedUser] = useState({
        id: getCookie('teammers-id'),
        teammer_type: getCookie('teammers-type'),
    });

    const viewProfile = () => {
        if (!id) return;
        if (type === 1) router.push(`/owner/${id}`);
        else if (type === 2) router.push(`/teammer/${id}`);
    };

    const sendMessage = () => {
        if (!id || !chat) return;

        if (!getCookie("teammers-access-token")) {
            setIsOpenLoginModal(true);
            return;
        }

        if (getCookie("teammers-access-token") && !getCookie("teammers-type")) {
            toaster.push(
                <Notification
                    type={"warning"}
                    header="Oopss!"
                    closable
                >
                    <p>
                        Please, complete your registration information.
                        <Button
                            className='ml-2'
                            onClick={() => router.push("/signup/steps")}
                        >
                            Complete registration
                        </Button>
                    </p>

                </Notification>, 'topEnd'
            );

            return;
        }

        // find conversation with job owner
        const conversation = chat.find(conversation => conversation.members.find(member => member.id === id));

        if (conversation) {
            router.push(
                {
                    pathname: '/chat',
                    query: {
                        selectedConversationId: conversation.id
                    }
                }, '/chat'
            );

            return;
        }

        newConversationRequest(id);
    };

    const newConversationRequest = userId => {
        if (!userId) return;

        axios.post(config.BASE_URL + 'conversations', {
            to: userId
        }).then(res => {
            if (res.data.success) {
                toaster.push(
                    <Notification type={"success"} header="Success!" closable>
                        Conversation request successfully sent!
                    </Notification>, 'topEnd'
                );
            }
        })
    };

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
                            {
                                positions?.map(item => {
                                    // return item.name + " / "
                                    return item.name
                                })
                            }
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
                        {<Button
                            onClick={() => {
                                if (self_request?.status === 1 || !self_request) {
                                    addToTeam(full_name, id)
                                } else if (self_request?.status === 0) {
                                    removeFromTeam(self_request?.id);
                                }
                            }}>{self_request?.status === 0 ? 'Remove from team' :
                                'Add to team'}</Button>}
                        <Button
                            appearance="primary"
                            onClick={sendMessage}
                        >
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

export default CardTeammerProfile;