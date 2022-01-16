import Link from "next/link";
import React, { useState } from "react";
import {Button, ButtonToolbar, Checkbox, Divider, Form, IconButton, Radio, RadioGroup} from "rsuite";
import config from "../src/configuration";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/router'
import Image from "next/image";
import {HiArrowLeft} from "react-icons/hi";
const Payment = () => {

    const [check , setCheck] = useState('card')
    const dispatch = useDispatch();
    const router = useRouter()
    const login_form = (event) => {
        let data = new FormData(event.target);
        let body = {};
        for (let [key, value] of data.entries()) {
            body[key] = value;
        }

    }
    return <div className="container login">
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
                backgroundImage: "url('/img/pay-pal.svg')"
            }}>
                <h2 className="font-weight-bold text-center"> <span>Get more from Teammers</span>
                </h2>
                <p className="text-center">Start using the full functionality <br/> right now</p>
            </div>
            <div className="form">
                <div className="goback-btn">
                    <Link href="/" passHref>
                        <IconButton
                            size="lg"
                            icon={<HiArrowLeft />}
                            className="goback-btn"
                        />
                    </Link>
                </div>
                <h2>Subscribe</h2>
                <Form onSubmit={(condition, event) => { }}>
                    <RadioGroup name="list" value={check} inline>
                        <Radio value="card" onChange={setCheck}>New Card</Radio>
                        <Radio value="pay-pal" onChange={setCheck}><Image
                            src={'/img/PayPal.svg'}
                            alt='icon'
                            width={88}
                            height={24}
                        /></Radio>
                    </RadioGroup>
                    <Form.Group controlId="email">
                        <Form.ControlLabel className={''}>E-mail or
                            username</Form.ControlLabel>
                        <Form.Control className={''} name="email" type="email"
                                      placeholder="Name@domain.com" />
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
export default Payment
