import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, ButtonToolbar, Checkbox, Divider, Form, Notification, toaster } from "rsuite";
import { useRouter } from "next/router";
import axios from "axios";
import config from "../src/configuration";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setData } from '/src/store/actions';
import { setCookie } from "../src/helpers/cookie";
import {withCookie} from 'next-cookie'
import getAuth from "../lib/session";
const renderErrorMessages = err => {
    let errList = [];

    for (const [key, value] of Object.entries(err)) {
        value.map(item => errList.push(item))
    }

    return errList;
}

const Signup = (props) => {
    const {cookie} = props
     const dispatch = useDispatch();
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [validation, setValidation] = useState(true);

    const router = useRouter();

    // useEffect(() => {
    //     // console.log(localStorage.getItem('type'))
    //     if (localStorage.getItem('teammers-access-token') && !JSON.parse(localStorage.getItem('type'))) {
    //         // console.log('ansdjkansdkjansdkjsnd')
    //         router.push("/signup/steps");
    //     }
    // }, [])
    const signup_form = (event) => {

        let data = new FormData(event.target);
        let body = {};
        for (let [key, value] of data.entries()) {
            body[key] = value;
        }

        if (!body.password || !body.repeat_password) {
            setValidation(false);
            // return;
        } else if (body.password.length < 8) {
            setValidation(false);
            toaster.push(<Notification type={"error"} header="Failed confirmation!" closable>
                <p className="text-danger">Password must be at least 8 characters</p>
            </Notification>, 'topEnd');
            return;
        } else if (body.password.length > 16) {
            setValidation(false);
            toaster.push(<Notification type={"error"} header="Failed confirmation!" closable>
                <p className="text-danger">Password must be between 8 - 16 characters</p>
            </Notification>, 'topEnd');
            return;
        };

        if (body.password !== body.repeat_password) {
            setValidation(false)
        } else {
            !validation && setValidation(true);

            axios.post(config.BASE_URL + "auth/register", {
                email: body.email,
                full_name: body.full_name,
                password: body.password
            }).then(res => {
                let data = res.data.data;

                // localStorage.setItem('teammers-access-token', data.token);
                // localStorage.setItem('type', data.user.type);
                // localStorage.setItem('user', JSON.stringify(data.user))
                console.log(res)
                cookie.remove('teammers-type');
                cookie.set('teammers-access-token', data.token)
                cookie.set('teammers-type' , data.user.type)


                // dispatch(setData('user', data.user));
                // dispatch(setData('token', data.token));

                // console.log(res);

                router.push("/signup/steps")
            }).catch(error => {
                console.log('error signup', error.response);

                if (error.response?.status === 422) {
                    toaster.push(
                        <Notification type={"error"} header="Failed confirmation!" closable>
                            {
                                renderErrorMessages(error.response.data.error.validation).map(item =>
                                    <p className="text-danger">{item}</p>
                                )
                            }
                        </Notification>, 'topEnd'
                    );
                    return;
                }

                toaster.push(<Notification type={"error"} header="Failed confirmation!" closable>
                    <p className="text-danger">{error.response?.data.error.message}</p>
                </Notification>, 'topEnd')
            })
        }
        // console.log(body)
    }
    return <div className="container login">
        <div className="d-flex justify-content-between login-header">
            <Link href="/">
                <a className="navbar-brand">
                    {/* <img src="LogoHeader.svg" alt="logo"/> */}
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
                    {/* <img src="icons/help.svg"/> */}
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
            <div className="image d-md-flex d-none" style={{
                backgroundImage: "url('/img/signup.png')"
            }}>
                <h1 className="banner"> Join your dream
                    {/* <img src="/img/startup.png" alt="startup image" /> */}
                    <div className="d-flex">
                        <Image
                            src={'/img/startup.png'}
                            alt='startup image'
                            layout={'fixed'}
                            width={208}
                            height={68}
                        />
                        team in
                    </div> Minutes.</h1>
                <p className="text-center">Connect with your future teammates <br />
                    from all over the world.</p>
            </div>
            <div className="signup_form">
                <h2>Sign up</h2>
                <p>Already a Member? <Link href="/login"><a>Log in</a></Link></p>
                <div className="with_google d-flex">
                    <Button className="signup_google">
                        {/* <img
                            src="icons/google.svg"
                        /> */}
                        <Image
                            src={'/icons/google.svg'}
                            alt='startup image'
                            layout={'fixed'}
                            width={24}
                            height={24}
                        />
                        <span>Sign up with Google</span>
                    </Button>
                    <Button>
                        {/* <img
                            src="social-images/twitter.svg"
                        /> */}
                        <Image
                            src={'/social-images/twitter.svg'}
                            alt='startup image'
                            layout={'fixed'}
                            width={24}
                            height={24}
                        />
                    </Button>
                    <Button>
                        {/* <img
                            src="social-images/facebook2.svg"
                        /> */}
                        <Image
                            src={'/social-images/facebook2.svg'}
                            alt='startup image'
                            layout={'fixed'}
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
                    signup_form(event)
                }}>
                    <Form.Group controlId="full_name">
                        <Form.ControlLabel>Full Name</Form.ControlLabel>
                        <Form.Control
                            name="full_name"
                            type="text"
                            placeholder="Full Name"
                        />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.ControlLabel>E-mail or username</Form.ControlLabel>
                        <Form.Control name="email" type="email" placeholder="Name@domain.com" />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.ControlLabel className={validation ? '' : 'login-validation'}>Password</Form.ControlLabel>
                        <Form.Control className={validation ? '' : 'login-border-color'} name="password" type="password"
                            placeholder="at least 8 characters" />
                    </Form.Group>
                    <Form.Group controlId="repeat_password">
                        <Form.ControlLabel className={validation ? '' : 'login-validation'}>Repeat
                            password</Form.ControlLabel>
                        <Form.Control className={validation ? '' : 'login-border-color'} name="repeat_password"
                            type="password" placeholder="at least 8 characters" />
                    </Form.Group>
                    <Form.Group>
                        <Checkbox onChange={(e, checked) => setCheck1(checked)}>Yes! Send me
                            genuinely useful emails
                            every now and then to help me get the most out of Teammers.</Checkbox>
                    </Form.Group>
                    <Form.Group>
                        <Checkbox onChange={(e, checked) => setCheck2(checked)}>Yes, I understand and
                            agree to the Terms
                            of Service, including the User Agreement and Privacy Policy.</Checkbox>
                    </Form.Group>
                    <Form.Group>
                        <ButtonToolbar>
                            <Button disabled={!check2} className="login-button" type="submit">Sign up</Button>
                        </ButtonToolbar>
                    </Form.Group>
                </Form>
            </div>
        </div>
    </div>
};
Signup.layout = false;
export default withCookie(Signup);
export const getServerSideProps = (context)=>{
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
    else if(auth === "null")
        return {
            redirect: {
                destination: "/signup/steps",
                permanent: false,
            },
        };
    return {
        props: {
            data: 'ajksndkajjsnd'
        }
    }
}
