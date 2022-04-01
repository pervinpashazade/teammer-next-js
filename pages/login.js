import Link from "next/link";
import React, { useState } from "react";
import { Button, ButtonToolbar, Checkbox, Divider, Form, Notification, toaster } from "rsuite";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/router'
import Image from "next/image";
import { setAuthCookies, setCookie } from "../src/helpers/cookie";
import { withCookie } from 'next-cookie';
import { loginService } from "../src/services/Auth/loginService";

import { useAuth } from "../Auth";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    FacebookAuthProvider,
    setPersistence,
    inMemoryPersistence,
    signInWithRedirect,
} from "firebase/auth";
import Header from "../src/components/consts/NotAuth/Header";

const renderErrorMessages = err => {
    let errList = [];

    for (const [key, value] of Object.entries(err)) {
        value.map(item => errList.push(item))
    }

    return errList;
}

const Login = (props) => {

    const firebaseAuth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

    const authContext = useAuth();

    const { cookie } = props;
    const [check, setCheck] = useState({});
    const [validation, setValidation] = useState(true);
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');

    React.useEffect(() => {
        if (authContext.currentUser) {
            if (!authContext.currentUser.type) {
                router.push('/signup/steps');
                return;
            };
            if (!authContext.currentUser.type === 1) {
                router.push('/owner/home');
                return;
            };
            if (!authContext.currentUser.type === 2) {
                router.push('/teammer/home');
                return;
            };
        };

        window.onbeforeunload = function (e) {
            // if (true) {
            //     return;
            // }
            var dialogText = 'Dialog text here';
            e.returnValue = dialogText;
            return dialogText;
        };
    }, [])

    // React.useEffect(() => {

    //     if (authContext.currentUser) {
    //         if (!authContext.currentUser.type) {
    //             router.push('/signup/steps');
    //             return;
    //         };
    //         if (!authContext.currentUser.type === 1) {
    //             router.push('/owner/home');
    //             return;
    //         };
    //         if (!authContext.currentUser.type === 2) {
    //             router.push('/teammer/home');
    //             return;
    //         };
    //     };

    // }, [authContext.currentUser])

    const login_form = async (event) => {

        let data = new FormData(event.target);
        let body = {};

        for (let [key, value] of data.entries()) {
            body[key] = value;
        };

        if (!body.email) {
            setValidation(false);
            return;
        };
        if (!body.password) {
            setValidation(false);
        } else if (body.password.length < 8) {
            setErrorMessage('Password must be at least 8 characters')
            return;
        } else if (body.password.length > 16) {
            setErrorMessage('Password must be between 8 - 16 characters')
            return;
        };
        const loginResult = await loginService(data);
        if (loginResult?.success) {

            setAuthCookies(
                loginResult.data.token,
                loginResult.data.user.full_name,
                loginResult.data.user.type,
                loginResult.data.user.id
            );

            authContext.setCurrentUser(loginResult.data.user);

            if (loginResult.data.user.is_complete_registration) {
                if (loginResult.data.user.type === 1) {
                    router.push('/owner/home')
                } else {
                    router.push('/teammer/home')
                }
            } else {
                router.push("/signup/steps");
            };

            // console.log('authContext', authContext);

        } else {
            setErrorMessage(loginResult.message)
            setValidation(false)
        };
    };

    const withGoogleService = () => {
        signInWithPopup(firebaseAuth, googleProvider).catch(err => console.log('withGoogleService', err));
    };

    const withFacebookService = () => {
        signInWithPopup(firebaseAuth, facebookProvider).catch(err => console.log('withFacebookService', err));
    };

    return (
        <div className="container">
            <div className="not-auth-layout login">
                <Header />
                <div className="row">
                    <div className="col-md-6">
                        <div className="left">
                            <div className="bg-wrapper">
                                <div className="bg-icon-wrapper"></div>
                                <div className="title">
                                    <h2>🖖 Welcome back</h2>
                                    <p>We’ve glad to see you again!</p>
                                </div>
                                <div className="bg-icon-wrapper"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="right">
                            <div className="inner">
                                <div className="wrapper">
                                    <div className="_top">
                                        <h1>Log in</h1>
                                        <p className="info">
                                            Not a Member?
                                            <Link href="/signup" passHref>
                                                <a>Sign up</a>
                                            </Link>
                                        </p>
                                        <div className="social-auth-wrapper">
                                            <Button
                                                className='google'
                                                onClick={withGoogleService}
                                            >
                                                <Image
                                                    src={'/icons/google.svg'}
                                                    alt='img'
                                                    width={24}
                                                    height={24}
                                                    layout='fixed'
                                                />
                                                <span>Sign up with Google</span>
                                            </Button>
                                            <Button>
                                                <Image
                                                    src={'/social-images/twitter.svg'}
                                                    alt='img'
                                                    width={24}
                                                    height={24}
                                                    layout='fixed'
                                                />
                                            </Button>
                                            <Button
                                                onClick={withFacebookService}
                                            >
                                                <Image
                                                    src={'/social-images/facebook2.svg'}
                                                    alt='img'
                                                    width={24}
                                                    height={24}
                                                    layout='fixed'
                                                />
                                            </Button>
                                        </div>
                                    </div>
                                    <Divider className="_devider">OR</Divider>
                                    <Form
                                        onSubmit={(condition, event) => {
                                            login_form(event)
                                        }}
                                    >
                                        <Form.Group controlId="email">
                                            <Form.ControlLabel className={validation ? '' : 'login-validation'}>
                                                E-mail
                                            </Form.ControlLabel>
                                            <Form.Control className={validation ? '' : 'login-border-color'} name="email" type="email"
                                                placeholder="Name@domain.com" />
                                        </Form.Group>
                                        <Form.Group controlId="password">
                                            <Form.ControlLabel className={validation ? '' : 'login-validation'}>Password</Form.ControlLabel>
                                            <Form.Control className={validation ? '' : 'login-border-color'} name="password" type="password"
                                                placeholder="at least 8 characters" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Checkbox onChange={(e, checked) => setCheck(checked)}> Remember me</Checkbox>
                                        </Form.Group>
                                        <p className="text-danger font-weight-bold">{errorMessage}</p>
                                        <Form.Group>
                                            <ButtonToolbar>
                                                <Button className="submit-btn" type="submit">Log in</Button>
                                            </ButtonToolbar>
                                        </Form.Group>
                                        <div className="forgot-link">
                                            <Link href="/forgot"><a>Forgot Username or Password?</a></Link>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="d-flex justify-content-between _header">
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
                <Link href="/">
                    <a>
                        <Image
                            src={'/icons/help.svg'}
                            alt='icon'
                            width={24}
                            height={24}
                        />
                        <span>Help</span>
                    </a>
                </Link>
            </div>
            <div className="authenticate">
                <div className="image" style={{
                    backgroundImage: "url('/img/login_1.png')"
                }}>
                    <h2 className="font-weight-bold">
                        <Image
                            src={'/icons/emoji1.svg'}
                            alt='icon'
                            width={40}
                            height={42}
                        /> <span>Welcome back</span>
                    </h2>
                    <p>We’ve glad to see you again!</p>
                </div>
                <div className="form">
                    <h2>Log in</h2>
                    <p>Not a Member? <Link href="/signup"><a>Sign up</a></Link></p>
                    <div className="with_google">
                        <Button
                            className="signup_google"
                            onClick={withGoogleService}
                        >
                            <Image
                                src={'/icons/google.svg'}
                                alt='icon'
                                width={24}
                                height={24}
                            />
                            <span>Sign up with Google</span>
                        </Button>
                        <Button>
                            <Image
                                src={'/social-images/twitter.svg'}
                                alt='icon'
                                width={24}
                                height={24}
                            />
                        </Button>
                        <Button
                            onClick={withFacebookService}
                        >
                            <Image
                                src={'/social-images/facebook2.svg'}
                                alt='icon'
                                width={24}
                                height={24}
                            />
                        </Button>
                    </div>
                    <Divider style={{
                        color: "#7f7f7f",
                        fontSize: "12px"
                    }}>OR</Divider>
                    <Form onSubmit={(condition, event) => {
                        login_form(event)
                    }}>
                        <Form.Group controlId="email">
                            <Form.ControlLabel className={validation ? '' : 'login-validation'}>E-mail or
                                username</Form.ControlLabel>
                            <Form.Control className={validation ? '' : 'login-border-color'} name="email" type="email"
                                placeholder="Name@domain.com" />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.ControlLabel className={validation ? '' : 'login-validation'}>Password</Form.ControlLabel>
                            <Form.Control className={validation ? '' : 'login-border-color'} name="password" type="password"
                                placeholder="at least 8 characters" />
                        </Form.Group>
                        <Form.Group>
                            <Checkbox onChange={(e, checked) => setCheck(checked)}> Remember me</Checkbox>
                        </Form.Group>
                        <p className="text-danger">{errorMessage}</p>
                        <Form.Group>
                            <ButtonToolbar>
                                <Button className="login-button" type="submit">Log in</Button>
                            </ButtonToolbar>
                        </Form.Group>
                    </Form>
                    <div className="forget-password">
                        <Link href="/forgot"><a>Forgot Username or Password?</a></Link>
                    </div>
                </div>
            </div> */}
        </div>
    )
};

Login.layout = false;

export default withCookie(Login);