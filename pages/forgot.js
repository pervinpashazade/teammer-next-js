import Link from "next/link";
import React, { useState } from "react";
import { Button, ButtonToolbar, Checkbox, Divider, Form } from "rsuite";
import { useRouter } from "next/router";
import Image from "next/image";
import Header from "../src/components/consts/NotAuth/Header";

const Forgot = () => {

    const router = useRouter();

    const forgotPassword = () => {
        router.push("/verification")
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
                                    <h2>Don’t worry</h2>
                                    <p>We are here to help you to recover your password.</p>
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
                                        <h1>Forgot password?</h1>
                                        <p className="info">
                                            Enter your email down below to receive your password reset instruction
                                        </p>
                                    </div>
                                    <Form
                                        onSubmit={(condition, event) => {
                                            forgotPassword(event)
                                        }}
                                    >
                                        <Form.Group controlId="email">
                                            <Form.ControlLabel>
                                                E-mail
                                            </Form.ControlLabel>
                                            <Form.Control
                                                name="email"
                                                type="email"
                                                placeholder="Name@domain.com"
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <ButtonToolbar>
                                                <Button className="submit-btn" type="submit">Request password reset</Button>
                                            </ButtonToolbar>
                                        </Form.Group>
                                        <div className="forgot-link">
                                            <Link href="/login" passHref><a>Back to Log in</a></Link>
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
                    backgroundImage: "url('/img/forgot-password.png')"
                }}>
                    <h2>
                        <Image
                            src={'/icons/emoji1.svg'}
                            alt='icon'
                            width={40}
                            height={42}
                        />
                        <span>Don’t worry</span>
                    </h2>
                    <p className="text-center">We are here to help you to recover <br /> your password.</p>
                </div>
                <div className="form">
                    <h2>Forgot password?</h2>
                    <p>Enter your email down below to receive your password reset instruction</p>
                    <Form onSubmit={(condition, event) => { forgotPassword() }}>
                        <Form.Group controlId="email">
                            <Form.ControlLabel>E-mail or username</Form.ControlLabel>
                            <Form.Control name="email" type="email" placeholder="Name@domain.com" />
                        </Form.Group>
                        <Form.Group>
                            <ButtonToolbar>
                                <Button className="login-button" type="submit">Request password reset</Button>
                            </ButtonToolbar>
                        </Form.Group>
                    </Form>
                    <Link href="/login"><a className="back-to-login"><>Back to Log in</></a></Link>
                </div>
            </div> */}
        </div>
    )
}
export default Forgot
