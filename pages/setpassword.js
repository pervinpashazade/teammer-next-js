import Link from "next/link";
import React, { useState } from "react";
import { Button, ButtonToolbar, Checkbox, Divider, Form, IconButton } from "rsuite";
import { HiArrowLeft } from "react-icons/hi";
import { useRouter } from "next/router";
import Image from "next/image";
const Setpassword = () => {
    const router = useRouter();
    const setpassword = () => {
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
            <Link href={"/"} >
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
                    <span>Do not worry</span>
                </h2>
                <p className="text-center">We are here to help you to recover <br /> your password.</p>
            </div>
            <div className="form">
                <div className="goback-btn">
                    <Link href="/verification" passHref>
                        <IconButton
                            size="lg"
                            icon={<HiArrowLeft />}
                            className="goback-btn"
                        />
                    </Link>
                </div>
                <h2>Set new password</h2>
                <p>Create new password for your account</p>
                <Form onSubmit={(condition, event) => { setpassword() }}>
                    <Form.Group controlId="new_password">
                        <Form.ControlLabel>New password</Form.ControlLabel>
                        <Form.Control name="new_password" type="password" placeholder="at least 8 characters" />
                    </Form.Group>
                    <Form.Group controlId="confirm_password">
                        <Form.ControlLabel>Confirm new password</Form.ControlLabel>
                        <Form.Control name="confirm_password" type="password" placeholder="at least 8 characters" />
                    </Form.Group>
                    <Form.Group>
                        <ButtonToolbar>
                            <Button className="login-button" type="submit">Save New Password</Button>
                        </ButtonToolbar>
                    </Form.Group>
                </Form>
            </div>
        </div>
    </div>
}
export default Setpassword
