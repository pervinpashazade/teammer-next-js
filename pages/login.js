import Link from "next/link";
import React, {useLayoutEffect, useState} from "react";
import {Button, ButtonToolbar, Checkbox, Divider, Form, Notification, toaster} from "rsuite";
import config from "../src/configuration";
import axios from "axios";
import {useDispatch} from "react-redux";
import {log_in, setData} from '/src/store/actions';
import {STARTUP_TYPE, TEAMMER_TYPE} from "../src/get_auth";
import {useRouter} from 'next/router'
import Image from "next/image";
import {setCookie} from "../src/helpers/cookie";
import {withCookie} from 'next-cookie'
import getAuth, {getToken} from "../lib/session";
import {postData} from "../lib/postData";

const renderErrorMessages = err => {
    let errList = [];

    for (const [key, value] of Object.entries(err)) {
        value.map(item => errList.push(item))
    }

    return errList;
}

const Login = (props) => {
    const {cookie} = props
    const [check, setCheck] = useState({});
    const [validation, setValidation] = useState(true);
    const dispatch = useDispatch();
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');

    const login_form = async (event) => {
        let data = new FormData(event.target);
        let body = {};
        for (let [key, value] of data.entries()) {
            body[key] = value;
        }
        if (!body.password) {
            setValidation(false);
        } else if (body.password.length < 8) {
            setErrorMessage('Password must be at least 8 characters')
            return;
        } else if (body.password.length > 16) {
            setErrorMessage('Password must be between 8 - 16 characters')
            return;
        }
        const handleData = await postData(body, "auth/login");
        console.log(handleData);
        if (handleData?.success) {
            cookie.remove('teammers-access-token');
            cookie.remove('user');
            cookie.remove('type');
            cookie.set('teammers-access-token', handleData.data.token);
            cookie.set('user', handleData.data.user.full_name);
            cookie.set('teammers-type', handleData.data.user.type.toString());
            console.log(handleData.data.user);

            handleData.data.user.is_complete_registration ? (handleData.data.user.type === 1 ? router.push('/owner/home') :
                router.push('/teammer/home')) : router.push("/signup/steps")
        } else {
            setErrorMessage(handleData?.error?.message)
            setValidation(false)
        }
        // axios.post(config.BASE_URL + "auth/login", body)
        //     .then(res => {
        //         console.log('login res', res)
        //         let data = res.data.data;
        // localStorage.setItem('teammers-access-token', data.token);
        // localStorage.setItem('type', data.user.type);
        // localStorage.setItem('user', JSON.stringify(data.user));
        // setCookie('teammers-access-token', data.token)
        //
        // if (data.user.type === STARTUP_TYPE) {
        //     dispatch(log_in('STARTUP_TYPE'))
        //
        //     dispatch(setData('user', data.user));
        //
        //     dispatch(setData('token', data.token));

        // console.log(data.user.is_complete_registration)
        //     data.user.is_complete_registration ? router.push('/owner/home') : router.push("/signup/steps")
        // } else if (data.user.type === TEAMMER_TYPE) {
        //
        //     dispatch(log_in('TEAMMER_TYPE'));
        //
        //     dispatch(setData('user', data.user));
        //
        //     dispatch(setData('token', data.token));

        //         data.user.is_complete_registration ? router.push('/teammer/home') : router.push("/signup/steps")
        //     } else {
        //         dispatch(setData('user', data.user));
        //         router.push("/signup/steps");
        //     }
        // })
        // .catch(error => {
        //     console.log('error', error.response)

        // if (error.response.status === 422) {
        //     toaster.push(
        //         <Notification type={"error"} header="Failed confirmation!" closable>
        //             {
        //                 renderErrorMessages(error.response.data.error.validation).map(item =>
        //                     <p className="text-danger">{item}</p>
        //                 )
        //             }
        //         </Notification>, 'topEnd'
        //     );
        //     return;
        // }
        // toaster.push(
        //     <Notification type={"error"} header="Failed confirmation!" closable>
        //         <p className="text-danger">
        //             {
        //                 error.response.data.error.message
        //             }
        //         </p>
        //     </Notification>, 'topEnd'
        // )
        //     setValidation(false)
        // })

    }

    return <div className="container login">
        <div className="d-flex justify-content-between login-header">
            <Link href="/">
                <a className="navbar-brand">
                    {/* <img src="LogoHeader.svg" alt="logo" /> */}
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
                    {/* <img src="icons/help.svg" /> */}
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
                    {/* <img src="icons/emoji1.svg" /><span>Welcome back</span> */}
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
                    <Button className="signup_google">
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
                    <Button>
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
                                      placeholder="Name@domain.com"/>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.ControlLabel className={validation ? '' : 'login-validation'}>Password</Form.ControlLabel>
                        <Form.Control className={validation ? '' : 'login-border-color'} name="password" type="password"
                                      placeholder="at least 8 characters"/>
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
                    <Link href="/forgot"><a>Forget Username or Password?</a></Link>
                </div>
            </div>
        </div>
    </div>
}
Login.layout = false
export default withCookie(Login);
export const getServerSideProps = (context) => {
    const auth = getAuth(context);
    if (auth === "1")
        return {
            redirect: {
                destination: "/owner/home",
                permanent: false,
            },
        };
    else if (auth === "2")
        return {
            redirect: {
                destination: "/teammer/home",
                permanent: false,
            },
        };
    else if (auth === "null")
        return {
            redirect: {
                destination: "/signup/steps",
                permanent: false,
            },
        };
    return {
        props: {
            data: 'dataaaaa'
        }
    }
}
