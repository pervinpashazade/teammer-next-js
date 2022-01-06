import Link from "next/link";
import React, { useState } from "react";
import { Button, ButtonToolbar, Checkbox, Divider, Form, IconButton } from "rsuite";
import { HiArrowLeft } from "react-icons/hi";
import { useRouter } from "next/router";
import Image from "next/image";

const Verification = () => {
    const router = useRouter();
    const newPassword = () => {
        router.push("/setpassword")
    }
    return <div className="container login">
        <div className="d-flex justify-content-between login-header">
            <Link href="/" passHref>
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
            <Link href="/" passHref>
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
            <div className="image" style={{
                backgroundImage: "url('/img/forgot-password.png')"
            }}>
                <h2>
                    {/* <img src="icons/emoji1.svg" /> */}
                    <Image
                        src={'/icons/emoji1.svg'}
                        alt='startup image'
                        layout={'fixed'}
                        width={40}
                        height={42}
                    />
                    <span>Don’t worry</span>
                </h2>
                <p className="text-center">We are here to help you to recover <br /> your password.</p>
            </div>
            <div className="form">
                <div className="goback-btn">
                    <Link href="/forgot" passHref>
                        <IconButton
                            size="lg"
                            icon={<HiArrowLeft />}
                            className="goback-btn"
                        />
                    </Link>
                </div>
                <h2>Verification</h2>
                <p>Enter the verification code we just sent you to your email address</p>
                <Form onSubmit={(condition, event) => {
                    newPassword()
                }}>
                    <Form.Group controlId="verification" className="verification-numbers">
                        <input type="text" name="1" maxLength="1" />
                        <input type="text" name="2" maxLength="1" />
                        <input type="text" name="3" maxLength="1" />
                        <input type="text" name="4" maxLength="1" />
                    </Form.Group>
                    <Form.Group>
                        <ButtonToolbar>
                            <Button className="login-button" type="submit">Confirm</Button>
                        </ButtonToolbar>
                    </Form.Group>
                </Form>
                <Link href="/login" passHref><a className="back-to-login">Resend code
                </a></Link>
            </div>
        </div>
    </div>
}
export default Verification
