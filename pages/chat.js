import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Avatar, Button, Checkbox, Form, IconButton, Input, InputGroup, Notification, toaster } from 'rsuite';
import { HiArrowLeft } from 'react-icons/hi';
import { AiOutlineRight } from 'react-icons/ai';
import { RiSendPlaneFill } from 'react-icons/ri';
import Image from 'next/image';
import config from '../src/configuration';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useChat } from '../src/contexts/ChatProvider';
import { getCookie } from '../src/helpers/cookie';

const CustomSearchButton = ({ placeholder, ...props }, icon) => (
    <InputGroup {...props} inside>
        <Input placeholder={placeholder} className="input-wrap" />
        <InputGroup.Button>
            <Image src={'/icons/search.svg'} alt='search icon' width={24} height={24} />
        </InputGroup.Button>
    </InputGroup>
);

function Chat() {

    const router = useRouter();

    const formRef = useRef();
    const setMessageRef = useCallback(node => {
        if (node) {
            node.scrollIntoView({ smooth: true })
        }
    }, []);

    const {
        chat,
        createMessage,
    } = useChat();

    const [user, setUser] = useState(null);
    const [conversationList, setConversationList] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);

    // // // mount
    useEffect(() => {
        if (router.query.selectedConversationId && chat) {
            setSelectedConversation(chat.find(x => x.id === Number(router.query.selectedConversationId)))
        };
    }, [router.query.selectedConversationId]);

    useEffect(() => {
        setConversationList(chat);
    }, [chat]);

    useEffect(() => {
        console.log('selected conversation', selectedConversation);
    }, [selectedConversation])

    const sendMessage = e => {

        if (!selectedConversation?.id) return;

        let data = new FormData(e.target);
        let body = {};

        for (let [key, value] of data.entries()) {
            body[key] = value.trim();
        }

        if (body.text) {
            axios.post(config.BASE_URL + `conversations/${selectedConversation.id}/messages`, {
                body: body.text
            }).then(res => {
                formRef.current.root.reset();
                if (res.data.success) {
                    createMessage(res.data.data)
                };
            }).catch(err => {
                toaster.push(
                    <Notification type={"error"} header="Oopss!" closable>
                        {err.response?.data?.message}
                    </Notification>, 'topEnd'
                );
            });
        };
    };

    return (
        <div className="chat">
            <div className="breadcrumb-wrapper">
                <div className="goback-btn">
                    <IconButton
                        size="lg"
                        icon={<HiArrowLeft />}
                        className="goback-btn"
                    />
                    <span>Go back</span>
                </div>
                <div className="custom-breadcrumb">
                    <span>Home</span>
                    <span className='breadcrumb-icon'>
                        <AiOutlineRight />
                    </span>
                    <span className='active'>
                        Chat
                    </span>
                </div>
            </div>
            <div className="chat-wrapper">
                <div className="wrapper-top">
                    <div className="chat-left-side-top">
                        <span>Inbox</span>
                    </div>
                    {
                        selectedConversation &&
                        <div className="chat-right-side-top">
                            {
                                selectedConversation.members.map((item) => {
                                    if (item.id !== Number(getCookie("teammers-id"))) {
                                        return <>
                                            <div className="user-profile">
                                                <Avatar
                                                    circle
                                                    src={item.detail.photo}
                                                    alt="profile photo"
                                                />
                                                <span>{item.full_name}</span>
                                            </div>
                                            <Image
                                                className='chat-settings-btn'
                                                src={'/icons/settings.svg'}
                                                alt='settings svg icon'
                                                width={24}
                                                height={24}
                                            />
                                        </>
                                    }
                                })
                            }
                        </div>
                    }
                </div>
                <div className="wrapper-body">
                    <div className="chat-left-side">
                        <div className="select-wrap">
                            <Checkbox
                                className='check-select-all'
                            >
                                Select all
                            </Checkbox>
                            <IconButton
                                size="sm"
                                className="select-action-btn"
                                icon={
                                    <Image
                                        src={'/icons/3dot.svg'}
                                        alt='dots'
                                        width={24}
                                        height={24}
                                    />
                                }
                            />
                        </div>
                        <div className="message-list-wrapper">
                            <CustomSearchButton
                                size="lg"
                                placeholder="Search"
                                className="search-input"
                            />
                            <ul className="message-list">
                                {/* here !!! */}
                                {
                                    conversationList.map((item, index) => {

                                        let lastMessage = {};
                                        let lastMessageSender = null;

                                        if (item.messages.length) {
                                            lastMessage = item.messages[item.messages.length - 1]
                                        };

                                        let isOwnMessage = lastMessage.from === Number(getCookie("teammers-id"));

                                        if (!isOwnMessage) {
                                            lastMessageSender = item.members.find(x => x.id === lastMessage.from);
                                        };

                                        // console.log('last message', lastMessage);

                                        return lastMessage ? <li
                                            key={index}
                                            className="item"
                                            onClick={() => setSelectedConversation(item)}
                                        >
                                            <Checkbox
                                                className='check-select-all'
                                            />
                                            <div className="content">
                                                <Avatar
                                                    circle
                                                    src={
                                                        lastMessage?.from === Number(getCookie("teammers-id")) ?
                                                            "https://www.w3schools.com/howto/img_avatar.png"
                                                            :
                                                            lastMessageSender?.detail.photo
                                                    }
                                                    className='user-avatar'
                                                    alt="user photo"
                                                />
                                                <div className="message unread">
                                                    <span>
                                                        {
                                                            item.members.map((item) => {
                                                                if (item.id !== Number(getCookie("teammers-id"))) {
                                                                    return item.full_name + ' '
                                                                }
                                                            })
                                                        }
                                                    </span>
                                                    <p>
                                                        {
                                                            lastMessage.from === Number(getCookie("teammers-id")) ?
                                                                "You: "
                                                                :
                                                                ''
                                                        }
                                                        {
                                                            lastMessage.body?.length > 23 ?
                                                                lastMessage.body.slice(0, 20) + '...'
                                                                :
                                                                lastMessage.body
                                                        }
                                                    </p>
                                                </div>
                                                <span className='date'>
                                                    {/* Aug 23, 2021 */}
                                                    {lastMessage.updated_at}
                                                </span>
                                            </div>
                                        </li> : null
                                    })
                                }
                                {/* <li className="item">
                                    <Checkbox
                                        className='check-select-all'
                                    />
                                    <div className="content">
                                        <Avatar
                                            circle
                                            src="/img/avatar1.png"
                                            className='user-avatar'
                                            alt="user photo"
                                        />
                                        <div className="message unread">
                                            <span>Denis Delton</span>
                                            <p>Yeah! I’m interested...</p>
                                        </div>
                                        <span className='date'>Aug 23, 2021</span>
                                    </div>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                    {
                        selectedConversation &&
                        <div className="chat-inner">
                            <div className="chat-area">
                                {/*  STATIC !!!! message list date start */}
                                <div className="message-date">
                                    <span>
                                        Aug 23, 2021
                                    </span>
                                </div>
                                {/* message list date end */}
                                {/* messages list start */}
                                {
                                    selectedConversation.messages.map((item, index) => {
                                        let isOwnMessage = item.from === Number(getCookie("teammers-id"));
                                        let isLastMessage = selectedConversation.messages.length - 1 === index;
                                        return <div
                                            ref={isLastMessage ? setMessageRef : null}
                                            key={index}
                                            className={`message ${isOwnMessage ? 'sent' : 'received'}`}
                                        >
                                            <div
                                                className="content"
                                            >
                                                {
                                                    item.body
                                                }
                                            </div>
                                        </div>
                                    })
                                }
                                {/* <div className="message sent">
                                    <div className="content">
                                        Hello!
                                        We are engaged in the design and development of web and mobile applications. Now I am looking for an experienced UX/UI designer for our team.
                                        If you are open to suggestions - let me know. I will tell you the details. :)
                                    </div>
                                </div>
                                <div className="message received">
                                    <Avatar
                                        circle
                                        src="/img/avatar1.png"
                                        alt="profile photo"
                                        className='user-avatar'
                                    />
                                    <div className="content">
                                        Yeah! I’m interested
                                    </div>
                                </div> */}
                                {/* messages list end */}
                            </div>
                            {/* message input */}
                            <Form
                                className='chat-form'
                                onSubmit={(condition, event) => { sendMessage(event) }}
                                ref={formRef}
                            >
                                <Input
                                    name='text'
                                    placeholder="Enter your message here..."
                                />
                                <Button
                                    type='submit'
                                >
                                    <RiSendPlaneFill />
                                </Button>
                            </Form>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

Chat.layout = true;

export default Chat
