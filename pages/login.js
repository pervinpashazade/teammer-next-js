import Link from "next/link";
import React, { useState } from "react";
import { Button, ButtonToolbar, Checkbox, Divider, Form, Notification, toaster } from "rsuite";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/router'
import Image from "next/image";
import { setCookie } from "../src/helpers/cookie";
import { withCookie } from 'next-cookie';
// import getAuth from "../lib/session";
import { loginService } from "../src/services/Auth/loginService";

import { useAuth } from "../Auth";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    FacebookAuthProvider,
} from "firebase/auth";

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
    const dispatch = useDispatch();
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');

    React.useEffect(() => {
      
        console.log('login page context', authContext);
      
        // if (authContext.currentUser) {
        //     if (authContext.currentUser.type === 1) {
        //         router.push("/owner/home");
        //     } else if (authContext.currentUser.type === 2) {
        //         router.push("/teammer/home");
        //     } else {
        //         router.push("/signup/steps");
        //     };
        // }
    }, [authContext.currentUser])

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

        //

        const loginResult = await loginService(data);

        console.log('loginResult', loginResult);

        if (loginResult?.success) {
            // cookie.remove('teammers-access-token');
            // cookie.remove('user');
            // cookie.remove('type');
            // cookie.remove('teammers-id');

            // setCookie('teammers-access-token', loginResult.data.token, 6);
            // setCookie('user', loginResult.data.user.full_name, 6);
            // setCookie('teammers-type', loginResult.data.user.type ? loginResult.data.user.type.toString() : '', 6);
            // setCookie('teammers-id', loginResult.data.user.id, 6);

            // console.log(loginResult.data.user);

            // authContext.setCurrentUser(loginResult.data.user);

            await createUserWithEmailAndPassword(firebaseAuth, body.email, body.password).then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                console.log('userCredential.user', user);
                // ...
            })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });;


            // loginResult.data.user.is_complete_registration ?
            //     (loginResult.data.user.type === 1 ? router.push('/owner/home')
            //         :
            //         router.push('/teammer/home')) : router.push("/signup/steps");
        } else {
            setErrorMessage(loginResult?.error?.message)
            setValidation(false)
        };

    };

    const withGoogleService = () => {
        signInWithPopup(firebaseAuth, googleProvider);
    };

    const withFacebookService = () => {
        signInWithPopup(firebaseAuth, facebookProvider);
    };

    return (
        <div className="container login">
            <div className="d-flex justify-content-between login-header">
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
            </div>
        </div>
    )
};

Login.layout = false;

export default withCookie(Login);

// export const getServerSideProps = (context) => {

//     const auth = getAuth(context);

//     if (auth === "1")
//         return {
//             redirect: {
//                 destination: "/owner/home",
//                 permanent: false,
//             },
//         };
//     else if (auth === "2")
//         return {
//             redirect: {
//                 destination: "/teammer/home",
//                 permanent: false,
//             },
//         };
//     else if (auth === "null")
//         return {
//             redirect: {
//                 destination: "/signup/steps",
//                 permanent: false,
//             },
//         };
//     return {
//         props: {
//             data: 'dataaaaa'
//         }
//     }
// }