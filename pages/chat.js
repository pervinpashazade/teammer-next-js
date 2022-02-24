import React from 'react';
import { Avatar, Checkbox, Dropdown, IconButton, Input, InputGroup } from 'rsuite';
import { HiArrowLeft } from 'react-icons/hi';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { AiOutlineRight } from 'react-icons/ai';
import { RiSendPlaneFill } from 'react-icons/ri';
import { FaArrowRight } from 'react-icons/fa';
import { List } from 'rsuite';
import Image from 'next/image';

// const renderIconButton = (props, ref) => {
//     return (
//         <IconButton
//             {...props}
//             ref={ref}
//             icon={<img src='/icons/3dot.svg' alt='dots' />}
//             circle
//             color="blue"
//             appearance="primary"
//         />
//     );
// };

const CustomSearchButton = ({ placeholder, ...props }, icon) => (
    <InputGroup {...props} inside>
        <Input placeholder={placeholder} className="input-wrap" />
        <InputGroup.Button>
            {/* <img src='/icons/search.svg' alt='search icon' /> */}
            <Image src={'/icons/search.svg'} alt='search icon' width={24} height={24} />
        </InputGroup.Button>
    </InputGroup>
);

const CustomSendButton = ({ placeholder, ...props }, icon) => (
    <InputGroup {...props} inside>
        <Input placeholder={placeholder} className="input-wrap" />
        <InputGroup.Button>
            <RiSendPlaneFill />
        </InputGroup.Button>
    </InputGroup>
);

function Chat() {
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
                    <div className="chat-right-side-top">
                        <div className="user-profile">
                            <Avatar
                                circle
                                src="/img/avatar1.png"
                                alt="profile photo"
                            />
                            <span>Denis Delton</span>
                        </div>
                        {/* <img
                            className='chat-settings-btn'
                            src="/icons/settings.svg"
                            alt='settings svg icon'
                        /> */}
                        <Image
                            className='chat-settings-btn'
                            src={'/icons/settings.svg'}
                            alt='settings svg icon'
                            width={24}
                            height={24}
                        />
                    </div>
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
                                icon={
                                    // <img src='/icons/3dot.svg' alt='dots' />
                                    <Image
                                        src={'/icons/3dot.svg'}
                                        alt='dots'
                                        width={24}
                                        height={24}
                                    />
                                }
                                className="select-action-btn"
                            />
                        </div>
                        <div className="message-list-wrapper">
                            <CustomSearchButton
                                size="lg"
                                placeholder="Search"
                                className="search-input"
                            />
                            <ul className="message-list">
                                <li className="item">
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
                                </li>
                                <li className="item">
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
                                </li>
                                <li className="item">
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
                                </li>
                                <li className="item">
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
                                        <div className="message">
                                            <span>Denis Delton</span>
                                            <p>Yeah! I’m interested...</p>
                                        </div>
                                        <span className='date'>Aug 23, 2021</span>
                                    </div>
                                </li>
                                <li className="item">
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
                                        <div className="message">
                                            <span>Denis Delton</span>
                                            <p>Yeah! I’m interested...</p>
                                        </div>
                                        <span className='date'>Aug 23, 2021</span>
                                    </div>
                                </li>
                                <li className="item">
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
                                        <div className="message">
                                            <span>Denis Delton</span>
                                            <p>Yeah! I’m interested...</p>
                                        </div>
                                        <span className='date'>Aug 23, 2021</span>
                                    </div>
                                </li>
                                <li className="item">
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
                                        <div className="message">
                                            <span>Denis Delton</span>
                                            <p>Yeah! I’m interested...</p>
                                        </div>
                                        <span className='date'>Aug 23, 2021</span>
                                    </div>
                                </li>
                                <li className="item">
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
                                        <div className="message">
                                            <span>Denis Delton</span>
                                            <p>Yeah! I’m interested...</p>
                                        </div>
                                        <span className='date'>Aug 23, 2021</span>
                                    </div>
                                </li>
                                <li className="item">
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
                                        <div className="message">
                                            <span>Denis Delton</span>
                                            <p>Yeah! I’m interested...</p>
                                        </div>
                                        <span className='date'>Aug 23, 2021</span>
                                    </div>
                                </li>
                                <li className="item">
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
                                        <div className="message">
                                            <span>Denis Delton</span>
                                            <p>Yeah! I’m interested...</p>
                                        </div>
                                        <span className='date'>Aug 23, 2021</span>
                                    </div>
                                </li>
                                <li className="item">
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
                                        <div className="message">
                                            <span>Denis Delton</span>
                                            <p>Yeah! I’m interested...</p>
                                        </div>
                                        <span className='date'>Aug 23, 2021</span>
                                    </div>
                                </li>
                                <li className="item">
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
                                        <div className="message">
                                            <span>Denis Delton</span>
                                            <p>Yeah! I’m interested...</p>
                                        </div>
                                        <span className='date'>Aug 23, 2021</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="chat-area">
                        {/* message list start */}
                        <div className="message-date">
                            <span>Aug 23, 2021</span>
                        </div>
                        {/* message list date end */}
                        {/* messages list start */}
                        <div className="message sent">
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
                        </div>
                        {/* messages list end */}
                        {/* message input */}
                        <CustomSendButton
                            size="lg"
                            placeholder="Enter your message here..."
                            className="message-input"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

Chat.layout = true;

export default Chat
