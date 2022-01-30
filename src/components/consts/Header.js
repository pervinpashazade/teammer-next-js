import React from 'react'
import Link from "next/link";
import {
    Input,
    InputGroup,
    Avatar,
    Whisper,
    Popover,
    Badge
} from 'rsuite';
import { RiArrowRightLine } from 'react-icons/ri';
import { wrapper } from "../../store/redux-store";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

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
                        <Avatar circle src="https://avatars2.githubusercontent.com/u/12592949?s=460&v=4" />
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
                    <div><Avatar circle src="https://avatars2.githubusercontent.com/u/12592949?s=460&v=4" /></div>
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

const Header = () => {

    const store = useSelector(store => store);
    const dispatch = useDispatch();

    const [loading, setLoading] = React.useState(false);

    return (
        <div className="header">
            <div className="row">
                <div className="col-md-12">
                    <nav className="navbar navbar-expand-lg pl-0">

                        {
                            store.isAuth === "TEAMMER_TYPE" ?
                                <Link href="/teammer/home">
                                    <a className="navbar-brand">
                                        <Image
                                            src={'/LogoHeader.svg'}
                                            alt='logo'
                                            width={136}
                                            height={18}
                                        />
                                    </a>
                                </Link>
                                :
                                store.isAuth === "STARTUP_TYPE" ?
                                    <Link href="/owner/home">
                                        <a className="navbar-brand">
                                            <Image
                                                src={'/LogoHeader.svg'}
                                                alt='logo'
                                                width={136}
                                                height={18}
                                            />
                                        </a>
                                    </Link>
                                    :
                                    <Link href="/">
                                        <a className="navbar-brand">
                                            <Image
                                                src={'/LogoHeader.svg'}
                                                alt='logo'
                                                width={136}
                                                height={18}
                                            />
                                        </a>
                                    </Link>
                        }
                        <button className="navbar-toggler" type="button">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <CustomInputGroupWidthButton
                            size="lg"
                            placeholder="Search"
                            className="search-input"
                        />
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <div className="collapse navbar-collapse navbar-middle" id="navbarSupportedContent">
                                <ul className="navbar-nav ml-auto mr-auto">
                                    <li className="nav-item active">
                                        <Link href="/app" passHref>
                                            <a className="nav-link" >Inspiration</a>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/app/pricing" passHref>
                                            <a className="nav-link" >Pricing</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <ul className="navbar-nav navbar-right ml-auto d-flex align-items-center">
                                <CustomComponentNotification placement="bottomEnd" loading={loading} />
                                <CustomComponentMessage placement="bottomEnd" loading={loading} />
                                <li className="nav-item">
                                    {
                                        store.isAuth === "GUESS" ?
                                            <Link href="/login">
                                                <a>
                                                    <Avatar circle
                                                        src="https://avatars2.githubusercontent.com/u/12592949?s=460&v=4" />
                                                </a>
                                            </Link>
                                            :
                                            <Link href="/profile-teammer">
                                                <a>
                                                    <Avatar
                                                        circle
                                                        src={store.user?.detail?.photo ? store.user.detail.photo
                                                            :
                                                            "https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
                                                        }
                                                    />
                                                </a>
                                            </Link>
                                    }
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}
export default wrapper.withRedux(Header);
