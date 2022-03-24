import React, { useRef, useState } from "react";
import Link from "next/link";
import { Button, ButtonToolbar, Checkbox, Divider, Form, IconButton } from "rsuite";
import { HiArrowLeft } from "react-icons/hi";
import { useRouter } from "next/router";
import Image from "next/image";
import Header from "../src/components/consts/NotAuth/Header";

const Verification = () => {

    const router = useRouter();

    const otp1Ref = useRef();
    const otp2Ref = useRef();
    const otp3Ref = useRef();
    const otp4Ref = useRef();

    const sendOtpCode = e => {
        e.preventDefault();

        let data = new FormData(event.target);
        let body = {};

        for (let [key, value] of data.entries()) {
            body[key] = value;
        };
        // router.push("/setpassword")

        console.log('OTP FORM', body);
    }

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
                                        <h1>Verification</h1>
                                        <p className="info">
                                            Enter the verification code we just sent you to your email address
                                        </p>
                                    </div>
                                    <Form
                                        onSubmit={(condition, event) => {
                                            sendOtpCode(event)
                                        }}
                                    >
                                        <Form.Group
                                            controlId="verification"
                                            className="otp-inputs-wrapper"
                                        >
                                            <input
                                                type="number"
                                                name="otp1"
                                                ref={otp1Ref}
                                                maxLength={1}
                                                onChange={e => {
                                                    if (e.target.value) {
                                                        if (e.target.value.length > 1) {
                                                            otp1Ref.current.value = ''
                                                        } else {
                                                            otp2Ref.current.focus();
                                                        }
                                                    };
                                                }}
                                            />
                                            <input
                                                type="number"
                                                name="otp2"
                                                ref={otp2Ref}
                                                maxLength={1}
                                                onChange={e => {
                                                    if (e.target.value) {
                                                        if (e.target.value.length > 1) {
                                                            otp2Ref.current.value = ''
                                                        } else {
                                                            otp3Ref.current.focus();
                                                        }
                                                    } else {
                                                        otp1Ref.current.focus();
                                                    };
                                                }}
                                            />
                                            <input
                                                type="number"
                                                name="otp3"
                                                ref={otp3Ref}
                                                maxLength={1}
                                                onChange={e => {
                                                    if (e.target.value) {
                                                        if (e.target.value.length > 1) {
                                                            otp3Ref.current.value = ''
                                                        } else {
                                                            otp4Ref.current.focus();
                                                        }
                                                    } else {
                                                        otp2Ref.current.focus();
                                                    };
                                                }}
                                            />
                                            <input
                                                type="number"
                                                name="otp4"
                                                ref={otp4Ref}
                                                maxLength={1}
                                                onChange={e => {
                                                    if (e.target.value) {
                                                        if (e.target.value.length > 1) {
                                                            otp4Ref.current.value = ''
                                                        };
                                                    } else {
                                                        otp3Ref.current.focus();
                                                    };
                                                }}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <ButtonToolbar>
                                                <Button className="submit-btn mt-5" type="submit">Confirm</Button>
                                            </ButtonToolbar>
                                        </Form.Group>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="d-flex justify-content-between _header">
                <Link href="/" passHref>
                    <a className="navbar-brand">
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
                    <Form
                        onSubmit={(condition, event) => {
                            sendOtpCode(event)
                        }}
                    >
                        <Form.Group controlId="verification" className="otp-inputs-wrapper">
                            <input
                                type="number"
                                name="otp1"
                                ref={otp1Ref}
                                maxLength={1}
                                onChange={e => {
                                    if (e.target.value) {
                                        if (e.target.value.length > 1) {
                                            otp1Ref.current.value = ''
                                        } else {
                                            otp2Ref.current.focus();
                                        }
                                    };
                                }}
                            />
                            <input
                                type="number"
                                name="otp2"
                                ref={otp2Ref}
                                maxLength={1}
                                onChange={e => {
                                    if (e.target.value) {
                                        if (e.target.value.length > 1) {
                                            otp2Ref.current.value = ''
                                        } else {
                                            otp3Ref.current.focus();
                                        }
                                    } else {
                                        otp1Ref.current.focus();
                                    };
                                }}
                            />
                            <input
                                type="number"
                                name="otp3"
                                ref={otp3Ref}
                                maxLength={1}
                                onChange={e => {
                                    if (e.target.value) {
                                        if (e.target.value.length > 1) {
                                            otp3Ref.current.value = ''
                                        } else {
                                            otp4Ref.current.focus();
                                        }
                                    } else {
                                        otp2Ref.current.focus();
                                    };
                                }}
                            />
                            <input
                                type="number"
                                name="otp4"
                                ref={otp4Ref}
                                maxLength={1}
                                onChange={e => {
                                    if (e.target.value) {
                                        if (e.target.value.length > 1) {
                                            otp4Ref.current.value = ''
                                        };
                                    } else {
                                        otp3Ref.current.focus();
                                    };
                                }}
                            />
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
            </div> */}
        </div>
    )
}
export default Verification
