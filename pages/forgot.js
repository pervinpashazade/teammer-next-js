import Link from "next/link";
import React, { useState } from "react";
import { Button, ButtonToolbar, Checkbox, Divider, Form } from "rsuite";
import { useRouter } from "next/router";
import Image from "next/image";
const Forgot = () => {
    const router = useRouter()
    const forgotPassword = () => {
        router.push("/verification")
    }
    return <div className="container login">
        <div className="d-flex justify-content-between login-header">
            <Link href="/">
                <a className="navbar-brand">
                    {/* <img src="/LogoHeader.svg" alt="logo" /> */}
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
                backgroundImage: "url('/img/forgot-password.png')"
            }}>
                <h2>
                    {/* <img src="icons/emoji1.svg" /> */}
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
        </div>
    </div>
}
export default Forgot
