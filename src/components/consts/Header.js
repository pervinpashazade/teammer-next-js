import React, { useEffect, useState } from 'react'
import Link from "next/link";
import {
    Input,
    InputGroup,
    Avatar,
    Whisper,
    Popover,
    Badge, Button
} from 'rsuite';
import { RiArrowRightLine } from 'react-icons/ri';
import { wrapper } from "../../store/redux-store";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import menu from '../../../public/img/menu.png'
import cancel from '../../../public/img/cancel.png';
import homeIcon from '../../../public/img/home-icon.png'
import arrowRight from '../../../public/img/arrow-right 1.png'
import { withCookie } from 'next-cookie';
import { useRouter } from "next/router";
import clearCookie from "../../../lib/removeCookie";
import { auth } from '../../../firebase';
import { signOut } from 'firebase/auth';

const CustomComponentUserProfile = ({ placement, loading, children, userType = "1" }) => {
    // console.log(userType)
    const router = useRouter();
    const clearCookieFunction = () => {
        clearCookie();
        router.push("/");
    }
    return <Whisper
        trigger="click"
        placement={placement}
        controlId={`control-id-${placement}`}
        speaker={
            userType === "1" ?
                <Popover>
                    <p><Link href="/owner/home"><a className="text-dark">Home</a></Link></p>
                    <p >
                        <Link href="/owner/profile"><a className="text-dark">My profile</a></Link>
                    </p>
                    <p style={{
                        cursor: 'pointer'
                    }} onClick={() => {
                        clearCookieFunction();
                        signOut(auth)
                    }}
                    ><a className="text-dark">Log out</a></p>
                </Popover> : userType === "2" ? <Popover>
                    <p><Link href="/teammer/home"><a className="text-dark">Home</a></Link></p>
                    <p><Link href="/teammer/profile"><a className="text-dark">My profile</a></Link></p>
                    <p style={{
                        cursor: 'pointer'
                    }} onClick={() => { clearCookieFunction(); signOut(auth) }}>
                        <a className="text-dark">Log out</a>
                    </p>
                </Popover> : <Popover>
                    <p><Link href="/login"><a className="text-dark">Login</a></Link></p>
                </Popover>
        }
    >

        <a className="c-pointer"> <Avatar circle
            src="https://www.w3schools.com/howto/img_avatar.png" /></a>
    </Whisper>
};

const DefaultPopoverNotification = React.forwardRef(({ content, ...props }, ref) => {
    return (
        <Popover ref={ref} {...props}>
            <div className="notification">
                <div className="message">
                    <span>Notifications</span>
                    <Link
                        href="/"
                        className="showAll"
                    >
                        <a>
                            {/* <img src="/icons/eye.svg" /> */}
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
                <div className="message-person">
                    <div>
                        <Avatar circle src="https://www.w3schools.com/howto/img_avatar.png" />
                    </div>
                    <div className="message-text">
                        <p>Denis Delton wants to add you to their Netflix team.</p>
                        <p>2 min ago</p>
                    </div>
                </div>
            </div>
        </Popover>
    );
});

const DefaultPopoverMessage = React.forwardRef(({ content, ...props }, ref) => {
    return (
        <Popover ref={ref} {...props}>
            <div className="notification">
                <div className="message">
                    <span>Your messages</span>
                    <Link href="/chat" className="showAll">
                        <a>
                            {/* <img src="/icons/eye.svg" /> */}
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
                <div className="message-person">
                    <div><Avatar circle src="https://www.w3schools.com/howto/img_avatar.png" /></div>
                    <div className="message-text">
                        <p>Denis Delton</p>
                        <p>Yeah! I’m interested...</p>
                    </div>
                    <div className="date">
                        <p>
                            Aug 23, 2021
                        </p>
                    </div>
                </div>
            </div>
        </Popover>
    );
});

const CustomComponentNotification = ({ placement, loading, children, count = 3 }) => (
    <Whisper
        trigger="click"
        placement={placement}
        controlId={`control-id-${placement}`}
        speaker={
            <DefaultPopoverNotification content={`I am positioned to the ${placement}`} />
        }
    >
        {
            count > 0 ? <Badge content={count} color="blue">
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
            </Badge> : <li>
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

const CustomComponentMessage = ({ placement, loading, children }) => (
    <Whisper
        trigger="click"
        placement={placement}
        controlId={`control-id-${placement}`}
        speaker={
            <DefaultPopoverMessage content={`I am positioned to the ${placement}`} />
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

    const { cookie } = props;

    const [userType, setUserType] = useState(
        cookie.get('teammers-type') ? cookie.get('teammers-type') : ''
    );

    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = React.useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    useEffect(() => {

    }, [])
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
                                <a className="ml-md-0 ml-4"><Link href="/">
                                    <a className="navbar-brand">
                                        <Image
                                            src={'/LogoHeader.svg'}
                                            alt='logo'
                                            width={136}
                                            height={18}
                                        />
                                    </a>
                                </Link>
                                </a>
                            </div>
                            <div className="d-block d-md-none">
                                <ul className="d-flex justify-content-between align-items-center">
                                    <CustomComponentNotification placement="bottomEnd" loading={loading} />
                                    <a className="mx-3"><CustomComponentMessage placement="bottomEnd"
                                        loading={loading} /></a>
                                    <li className="nav-item">
                                        <Link
                                            // href="/login"
                                            href={
                                                userType ?
                                                    userType === "1" ?
                                                        "/owner/profile"
                                                        :
                                                        userType === "2" ?
                                                            "/teammer/profile"
                                                            :
                                                            "/login"
                                                    :
                                                    "/login"
                                            }
                                        >
                                            <a>
                                                <Avatar circle
                                                    src="https://www.w3schools.com/howto/img_avatar.png" />
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/*<button className="navbar-toggler" type="button">*/}
                        {/*    <span className="navbar-toggler-icon"></span>*/}
                        {/*</button>*/}
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
                                <CustomComponentNotification placement="bottomEnd" loading={loading} />
                                <CustomComponentMessage placement="bottomEnd" loading={loading} />
                                {
                                    <li className="nav-item">
                                        {
                                            userType === "1" ?
                                                <CustomComponentUserProfile placement="bottomEnd" loading={loading}
                                                    userType="1" />
                                                : userType === "2" ?
                                                    <CustomComponentUserProfile placement="bottomEnd" loading={loading}
                                                        userType="2" /> :
                                                    <CustomComponentUserProfile placement="bottomEnd" loading={loading}
                                                        userType="none" />


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
                            <a className="text-link">Pricing &nbsp; <Link href="/">
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