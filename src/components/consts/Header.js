import React, { useEffect, useState } from 'react'
import Link from "next/link";
import {
    Input,
    InputGroup,
    Avatar,
    Whisper,
    Popover,
    Badge,
    Button,
    Notification,
    toaster,
} from 'rsuite';
import { RiArrowRightLine } from 'react-icons/ri';
import Image from "next/image";
import menu from '../../../public/img/menu.png'
import cancel from '../../../public/img/cancel.png';
import homeIcon from '../../../public/img/home-icon.png'
import arrowRight from '../../../public/img/arrow-right 1.png'
import { withCookie } from 'next-cookie';
import { useRouter } from "next/router";
import { logoutService } from '../../services/Auth/logoutService';
import { useAuth } from '../../../Auth';
import axios from "axios";
import config from "../../configuration";
import { getCookie } from "../../helpers/cookie";
import { useChat } from '../../contexts/ChatProvider';
import { useNotification } from '../../contexts/NotificationProvider';

const CustomComponentUserProfile = ({ placement, loading, children, user, context }) => {
    // console.log(user);
    const router = useRouter();

    return <Whisper
        trigger="click"
        placement={placement}
        controlId={`control-id-${placement}`}
        speaker={
            user ?
                user.type ?
                    user.type === 1 ?
                        <Popover>
                            <p><Link href="/owner/home"><a className="text-dark">Home</a></Link></p>
                            <p>
                                <Link href="/owner/profile"><a className="text-dark">My profile</a></Link>
                            </p>
                            <p
                                style={{
                                    cursor: 'pointer'
                                }}
                                onClick={() => logoutService(context, router)}
                            >
                                <a className="text-dark">Log out</a>
                            </p>
                        </Popover>
                        :
                        user.type === 2 ?
                            <Popover>
                                <p><Link href="/teammer/home"><a className="text-dark">Home</a></Link></p>
                                <p><Link href="/teammer/profile"><a className="text-dark">My profile</a></Link></p>
                                <p style={{
                                    cursor: 'pointer'
                                }}
                                    onClick={() => logoutService(context, router)}
                                >
                                    <a className="text-dark">Log out</a>
                                </p>
                            </Popover>
                            :
                            null
                    :
                    <Popover>
                        <p><Link href="/signup/steps"><a className="text-dark">Complete registration</a></Link></p>
                        <p style={{
                            cursor: 'pointer'
                        }}
                            onClick={() => logoutService(context, router)}
                        >
                            <a className="text-dark">Log out</a>
                        </p>
                    </Popover>
                :
                <Popover>
                    <p><Link href="/login"><a className="text-dark">Login</a></Link></p>
                </Popover>
        }
    >
        <a className="c-pointer">
            <Avatar
                circle
                src={user?.detail?.photo ? user.detail.photo : "https://www.w3schools.com/howto/img_avatar.png"}
                alt={user?.username}
            />
        </a>
    </Whisper>
};

const DefaultPopoverNotification = React.forwardRef(({ content, data, actions, ...props }, ref) => {
    // console.log("notification props", props);

    return (
        <Popover ref={ref} {...props}>
            <div className="notification">
                <div className="message">
                    <span>Notifications</span>
                    <Link
                        href="/notifications"
                        className="showAll"
                    >
                        <a>
                            <Image
                                src={'/icons/eye.svg'}
                                alt='img'
                                width={136}
                                height={18}
                                layout='fixed'
                            />
                            Show all <button><RiArrowRightLine /></button>
                        </a>
                    </Link>
                </div>
                {data?.length ? data.map((item, index) => {
                    return (
                        <div key={index} className="message-person my-md-2">
                            <div>
                                <Avatar circle src="https://www.w3schools.com/howto/img_avatar.png" />
                            </div>
                            <div className="message-text">
                                <p>{item.message}</p>
                                <p>2 min ago</p>
                                {
                                    item.type &&
                                        item.type === "join_request" &&
                                        actions?.acceptJoinRequest && actions?.declineJoinRequest ?
                                        <div className='_actions'>
                                            <Button
                                                color='primary'
                                                onClick={() => actions.acceptJoinRequest(item)}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                color='danger'
                                                onClick={() => actions.declineJoinRequest(item)}
                                            >
                                                Decline
                                            </Button>
                                        </div>
                                        :
                                        ''
                                }
                            </div>
                        </div>
                    )
                }) : ''}
            </div>
        </Popover>
    );
});

const DefaultPopoverMessage = React.forwardRef(({ content, ...props }, ref) => {

    const router = useRouter();

    return (
        <Popover ref={ref} {...props}>
            <div className="notification">
                <div className="message">
                    <span>Your messages</span>
                    <Link href="/chat" className="showAll">
                        <a>
                            <Image
                                src={'/icons/eye.svg'}
                                alt='img'
                                width={20}
                                height={20}
                                layout='fixed'
                            />
                            Show all <button><RiArrowRightLine /></button>
                        </a>
                    </Link>
                </div>
                {/* here */}
                {
                    props.data?.length > 0 ?
                        props.data.map(item =>
                            <div
                                key={item.id}
                                className="message-person"
                                // onClick={() => router.push("/chat")}
                                onClick={() => router.push({
                                    pathname: '/chat',
                                    query: {
                                        selectedConversationId: item.id
                                    }
                                }, "/chat")}
                            >
                                <div>
                                    <Avatar
                                        circle
                                        src={
                                            item.avatar ? item.avatar
                                                :
                                                "https://www.w3schools.com/howto/img_avatar.png"
                                        }
                                    />
                                </div>
                                <div className="message-text">
                                    <p>{item.title}</p>
                                    {
                                        item.lastMessage &&
                                        <p>
                                            {item.lastMessage.isOwn && 'You: '}
                                            {item.lastMessage.content}
                                        </p>
                                    }
                                </div>
                                <div className="date">
                                    <p>
                                        {/* Aug 23, 2021 */}
                                        {item.created_at}
                                    </p>
                                </div>
                            </div>
                        )
                        :
                        'no data'
                }

            </div>
        </Popover>
    );
});

const CustomComponentNotification = ({ data, placement, loading, children, count, actions }) => (
    <Whisper
        trigger="click"
        placement={placement}
        controlId={`control-id-${placement}`}
        speaker={
            <DefaultPopoverNotification
                data={data}
                actions={actions}
            />
        }
    >
        {
            count ?
                <Badge content={count} color="blue">
                    <li>
                        <div className="c-pointer">
                            <Image
                                src={'/icons/bell.svg'}
                                alt='img'
                                className="icon"
                                width={20}
                                height={20}
                                layout='fixed'
                            />
                        </div>
                    </li>
                </Badge> :
                <li>
                    <div className="c-pointer">
                        <Image
                            src={'/icons/bell.svg'}
                            alt='img'
                            className="icon"
                            width={20}
                            height={20}
                            layout='fixed'
                        />
                    </div>
                </li>
        }

    </Whisper>
);

const CustomComponentMessage = ({ data, placement, loading, children }) => (
    <Whisper
        trigger="click"
        placement={placement}
        controlId={`control-id-${placement}`}
        speaker={
            <DefaultPopoverMessage
                data={data}
            />
        }
    >
        <li>
            <div className="c-pointer">
                <Image
                    src={'/icons/envelope.svg'}
                    alt='img'
                    className="icon"
                    width={20}
                    height={20}
                    layout='fixed'
                />
            </div>
        </li>
    </Whisper>
);

const CustomInputGroupWidthButton = ({ placeholder, ...props }) => (
    <InputGroup {...props} inside>
        <Input placeholder={placeholder} />
        <InputGroup.Button>
            {/* <img src="/icons/search.svg" /> */}
            <Image
                src={'/icons/search.svg'}
                alt='img'
                // className="icon"
                width={16}
                height={16}
                layout='fixed'
            />
        </InputGroup.Button>
    </InputGroup>
);

const Header = (props) => {

    const authContext = useAuth();

    const {
        unReadCount,
        unReadNotifications
    } = useNotification();

    const { lastMessageList } = useChat();

    const {
        user,
    } = props;

    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    };

    const acceptJoinRequest = (item) => {
        if (!item?.request_id) return;

        axios.post(config.BASE_URL + `team-requests/${item?.request_id}/accept`).then(res => {
            // console.log('res accept', res);
            if (res?.data.success) {
                toaster.push(
                    <Notification type={"success"} header="Success!" closable>
                        Team request successfully accepted
                    </Notification>, 'topEnd'
                );
            }
        });
    }

    const declineJoinRequest = (item) => {
        if (!item?.request_id) return;

        axios.post(config.BASE_URL + `team-requests/${item?.request_id}/reject`).then(res => {
            // console.log('res  REJECT', res);
            if (res?.data.success) {
                toaster.push(
                    <Notification type={"info"} header="Success!" closable>
                        Team request declined
                    </Notification>, 'topEnd'
                );
            }
        });
    }

    // console.log('Notification API =>', unReadNotifications);

    return (
        <div className="header">
            <div className="row">
                <div className="col-md-12">
                    <nav className="navbar navbar-expand-lg px-0">
                        <div className="d-flex justify-content-between w-md-100">
                            <div>
                                <a className="d-inline-block d-md-none" onClick={toggleMenu}>
                                    <Image
                                        src={menu}
                                        alt='logo'
                                        width={24}
                                        height={24}
                                        quality={100}
                                    />
                                </a>
                                <a className="ml-md-0 ml-4">
                                    <Link href="/">
                                        <a className="navbar-brand">
                                            <Image
                                                src={'/LogoHeader.svg'}
                                                alt='logo'
                                                width={136}
                                                height={18}
                                                quality={100}
                                                layout="fixed"
                                            />
                                        </a>
                                    </Link>
                                </a>
                            </div>
                            <div className="d-block d-md-none">
                                <ul className="d-flex justify-content-between align-items-center">
                                    <CustomComponentNotification
                                        data={unReadNotifications}
                                        count={user?.unread_notificationList_count}
                                        loading={loading}
                                        placement="bottomEnd"
                                    />
                                    <a className="mx-3">
                                        <CustomComponentMessage
                                            placement="bottomEnd"
                                            loading={loading}
                                            data={lastMessageList}
                                        />
                                    </a>
                                    <li className="nav-item">
                                        <Link
                                            href={
                                                user && user.type ?
                                                    user.type === 1 ?
                                                        "/owner/profile"
                                                        :
                                                        user.type === 2 ?
                                                            "/teammer/profile"
                                                            :
                                                            "/login"
                                                    :
                                                    "/login"
                                            }
                                            passHref
                                        >
                                            <a>
                                                <Avatar
                                                    circle
                                                    src={user?.detail?.photo ? user.detail.photo : "https://www.w3schools.com/howto/img_avatar.png"}
                                                    alt={user?.username}
                                                />
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="d-md-inline-block d-none">
                            <CustomInputGroupWidthButton
                                size="lg"
                                placeholder="Search"
                                className="search-input custom-input-color"
                            />
                        </div>
                        <div className="collapse navbar-collapse d-none d-md-initial" id="navbarSupportedContent">
                            <div className="collapse navbar-collapse navbar-middle" id="navbarSupportedContent">
                                <ul className="navbar-nav ml-auto mr-auto">
                                    <li className="nav-item active">
                                        <Link href="/app" passHref>
                                            <a className="nav-link">Inspiration</a>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/app/pricing" passHref>
                                            <a className="nav-link">Pricing</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <ul className="navbar-nav navbar-right ml-auto d-flex align-items-center">
                                <CustomComponentNotification
                                    placement="bottomEnd"
                                    loading={loading}
                                    count={unReadCount}
                                    data={unReadNotifications}
                                    actions={{
                                        acceptJoinRequest: acceptJoinRequest,
                                        declineJoinRequest: declineJoinRequest,
                                    }}
                                />
                                <CustomComponentMessage
                                    placement="bottomEnd"
                                    loading={loading}
                                    data={lastMessageList}
                                />
                                {
                                    <li className="nav-item">
                                        {
                                            <CustomComponentUserProfile
                                                user={user}
                                                loading={loading}
                                                placement="bottomEnd"
                                                context={authContext}
                                            />
                                        }
                                    </li>
                                }
                            </ul>
                        </div>
                    </nav>
                    <div className="d-md-none d-block w-100 mb-3">
                        <CustomInputGroupWidthButton
                            size="lg"
                            placeholder="Search"
                            className="search-input w-100 custom-input-color"
                        />
                    </div>
                </div>
            </div>
            <div className={isOpen ? "responsive-menu add-margin" : "responsive-menu"}>
                <div className="responsive-menu-header">
                    <a className="navbar-brand">
                        <Image
                            src={'/LogoHeader.svg'}
                            alt='logo'
                            width={136}
                            height={18}
                        />
                    </a>
                    <a onClick={toggleMenu}> <Image
                        src={cancel}
                        alt='logo'
                        width={25}
                        height={25}
                        quality={100}
                    /></a>
                </div>
                <div className="responsive-menu-links">
                    <ul>
                        <li>
                            <a className="text-link">Home &nbsp; <Link href="/">
                                <Image
                                    src={homeIcon}
                                    alt='logo'
                                    width={18}
                                    height={18}
                                    quality={100}
                                />
                            </Link></a>
                            <a className="arrowRightButton">
                                <Link href="/">
                                    <Image
                                        src={arrowRight}
                                        alt='logo'
                                        width={20}
                                        height={20}
                                        quality={100}
                                    />
                                </Link>
                            </a>
                        </li>
                        <li>
                            <a className="text-link">Inspiration &nbsp; <Link href="/">
                                🌟
                            </Link>
                            </a>
                            <a className="arrowRightButton">
                                <Link href="/">
                                    <Image
                                        src={arrowRight}
                                        alt='logo'
                                        width={20}
                                        height={20}
                                        quality={100}
                                    />
                                </Link>
                            </a>
                        </li>
                        <li>
                            <a className="text-link">
                                Pricing &nbsp;
                                <Link href="/">
                                    🌟
                                </Link>
                            </a>
                            <a className="arrowRightButton">
                                <Link href="/">
                                    <Image
                                        src={arrowRight}
                                        alt='logo'
                                        width={20}
                                        height={20}
                                        quality={100}
                                    />
                                </Link>
                            </a>
                        </li>
                        <li>
                            <a className="text-link">Community &nbsp; <Link href="/">
                                🌟
                            </Link></a>
                            <a className="arrowRightButton">
                                <Link href="/">
                                    <Image
                                        src={arrowRight}
                                        alt='logo'
                                        width={20}
                                        height={20}
                                        quality={100}
                                    />
                                </Link>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default withCookie(Header);