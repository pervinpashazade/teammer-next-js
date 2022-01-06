import Link from "next/link";
import React, { useState } from "react";
import { Button, ButtonToolbar, Checkbox, Divider, Form } from "rsuite";
import config from "../src/configuration";
import axios from "axios";
import { useDispatch } from "react-redux";
import { log_in, setData } from '/src/store/actions';
import { STARTUP_TYPE, TEAMMER_TYPE } from "../src/get_auth";
import { useRouter } from 'next/router'
import Image from "next/image";
const Login = () => {
    const [check, setCheck] = useState({});
    const [validation, setValidation] = useState(true);
    const dispatch = useDispatch();
    const router = useRouter()
    const login_form = (event) => {
        let data = new FormData(event.target);
        let body = {};
        for (let [key, value] of data.entries()) {
            body[key] = value;
        }
        axios.post(config.BASE_URL + "auth/login", body)
            .then(res => {
                let data = res.data.data;
                console.log(res)
                localStorage.setItem('accessToken', data.token);
                localStorage.setItem('type', data.user.type);
                localStorage.setItem('user', JSON.stringify(data.user))
                if (data.user.type === STARTUP_TYPE) {
                    dispatch(log_in('STARTUP_TYPE'))
                    dispatch(setData('user', data.user.full_name));
                    console.log(data.user.is_complete_registration)
                    data.user.is_complete_registration ? router.push('/') : router.push("/signup/steps")
                } else if (data.user.type === TEAMMER_TYPE) {
                    dispatch(log_in('TEAMMER_TYPE'));
                    dispatch(setData('user', data.user.full_name));
                    data.user.is_complete_registration ? router.push('/teammer/home') : router.push("/signup/steps")
                } else router.push("/signup/steps")
            })
            .catch(error => {
                console.log(error)
                setValidation(false)

            })

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
                <h2>
                    {/* <img src="icons/emoji1.svg" /><span>Welcome back</span> */}
                    <Image
                        src={'/icons/emoji1.svg'}
                        alt='icon'
                        width={40}
                        height={42}
                    />
                </h2>
                <p>We’ve glad to see you again!</p>
            </div>
            <div className="form">
                <h2>Log in</h2>
                <p>Not a Member? <Link href="/signup"><a>Sign up</a></Link></p>
                <div className="with_google">
                    <Button className="signup_google">
                        {/* <img
                            src="icons/google.svg"
                        /> */}
                        <Image
                            src={'/icons/google.svg'}
                            alt='icon'
                            width={24}
                            height={24}
                        />
                        <span>Sign up with Google</span>
                    </Button>
                    <Button>
                        {/* <img src="social-images/twitter.svg" /> */}
                        <Image
                            src={'/social-images/twitter.svg'}
                            alt='icon'
                            width={24}
                            height={24}
                        />
                    </Button>
                    <Button>
                        {/* <img src="social-images/facebook2.svg" /> */}
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
export default Login
