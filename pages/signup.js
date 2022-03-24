import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, ButtonToolbar, Checkbox, Divider, Form, Notification, toaster } from "rsuite";
import { useRouter } from "next/router";
import axios from "axios";
import config from "../src/configuration";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setCookie } from "../src/helpers/cookie";
import { withCookie } from 'next-cookie';
import Header from "../src/components/consts/NotAuth/Header";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    FacebookAuthProvider,
} from "firebase/auth";

const renderErrorMessages = err => {
    let errList = [];

    for (const [key, value] of Object.entries(err)) {
        value.map(item => errList.push(item))
    }

    return errList;
}

const Signup = (props) => {

    const router = useRouter();

    const { cookie } = props;

    const firebaseAuth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

    const dispatch = useDispatch();

    const [password, setPassword] = useState('');

    const [formValidation, setFormValidation] = useState({
        email: [],
        password: [],
        confirmPassword: [],
    });

    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);

    const [validation, setValidation] = useState(true);

    React.useEffect(() => {
        window.onbeforeunload = function (e) {
            // if (true) {
            //     return;
            // }
            var dialogText = 'Dialog text here';
            e.returnValue = dialogText;
            return dialogText;
        };
    }, []);

    const handleChangeEmail = (email) => {
        let validationErrors = [];

        if (!email) {
            validationErrors.push("Email field is required");
        };
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            validationErrors.push("Email is not valid");
        };

        setFormValidation(prevState => {
            return {
                ...prevState,
                email: validationErrors
            };
        });
    };

    const handleChangePassword = (password) => {
        let validationErrors = [];

        if (!password) {
            validationErrors.push("Password field is required");
        };
        if (password.length < 8) {
            validationErrors.push("Password must be at least 8 characters");
        };
        if (password.length > 16) {
            validationErrors.push("Password must be maximum 16 characters");
        };

        setFormValidation(prevState => {
            return {
                ...prevState,
                password: validationErrors
            };
        });
    };

    const handleChangeConfirmPassword = (confirmPassword) => {
        let validationErrors = [];

        if (!confirmPassword) {
            validationErrors.push("Repeat password field is required");
        };
        if (confirmPassword !== password) {
            validationErrors.push("Password and confirm password does not match.");
        };

        setFormValidation(prevState => {
            return {
                ...prevState,
                confirmPassword: validationErrors
            };
        });
    };

    useEffect(() => {
        console.log('formValidation', formValidation);
    }, [formValidation])

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

                cookie.remove('teammers-type');

                // cookie.set('teammers-access-token', data.token);
                // cookie.set('teammers-type', data.user.type);
                setCookie('teammers-access-token', data.token, 6);
                setCookie('teammers-type', data.user.type, 6);
                router.push("/signup/steps");
            })
                .catch(error => {
                    console.log('error signup', error);

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
                    ;

                    // toaster.push(<Notification type={"error"} header="Failed confirmation!" closable>
                    //     <p className="text-danger">{error.response?.data.error.message}</p>
                    // </Notification>, 'topEnd');
                })
        }
        // console.log(body)
    };

    const withGoogleService = () => {
        signInWithPopup(firebaseAuth, googleProvider).catch(err => console.log('withGoogleService', err));
    };

    const withFacebookService = () => {
        signInWithPopup(firebaseAuth, facebookProvider).catch(err => console.log('withFacebookService', err));
    };

    return (
        <div className="container">
            <div className="not-auth-layout register">
                <Header />
                <div className="row">
                    <div className="col-md-6">
                        <div className="left">
                            <div className="bg-wrapper">
                                <div className="bg-icon-wrapper"></div>
                                <div className="title">
                                    <h2>Join your dream team in Minutes.</h2>
                                    <p>
                                        Connect with your future teammates from all over the world.
                                    </p>
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
                                        <h1>Sign up</h1>
                                        <p className="info">
                                            Already a Member?
                                            <Link href="/login" passHref>
                                                <a>Log in</a>
                                            </Link>
                                        </p>
                                        <div className="social-auth-wrapper">
                                            <Button
                                                className='google'
                                                onClick={withGoogleService}
                                            >
                                                <Image
                                                    src={'/icons/google.svg'}
                                                    alt='img'
                                                    width={24}
                                                    height={24}
                                                    layout='fixed'
                                                />
                                                <span>Sign up with Google</span>
                                            </Button>
                                            <Button>
                                                <Image
                                                    src={'/social-images/twitter.svg'}
                                                    alt='img'
                                                    width={24}
                                                    height={24}
                                                    layout='fixed'
                                                />
                                            </Button>
                                            <Button
                                                onClick={withFacebookService}
                                            >
                                                <Image
                                                    src={'/social-images/facebook2.svg'}
                                                    alt='img'
                                                    width={24}
                                                    height={24}
                                                    layout='fixed'
                                                />
                                            </Button>
                                        </div>
                                    </div>
                                    <Divider className="_devider">OR</Divider>
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
                                        <Form.Group
                                            controlId="email"
                                            className={!formValidation.email.length ? '' : 'not-valid'}
                                        >
                                            <Form.ControlLabel>E-mail</Form.ControlLabel>
                                            <Form.Control
                                                name="email"
                                                type="email"
                                                placeholder="Name@domain.com"
                                                onBlur={e => handleChangeEmail(e.target.value)}
                                            />
                                            {
                                                formValidation.email.length > 0 &&
                                                <div className="validation-errors">
                                                    {
                                                        formValidation.email.map((item, index) => {
                                                            return <span key={index}>{item}</span>
                                                        })
                                                    }
                                                </div>
                                            }
                                        </Form.Group>
                                        <Form.Group
                                            controlId="password"
                                            className={!formValidation.password.length ? '' : 'not-valid'}
                                        >
                                            <Form.ControlLabel>Password</Form.ControlLabel>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                placeholder="at least 8 characters"
                                                onBlur={e => {
                                                    setPassword(e.target.value);
                                                    handleChangePassword(e.target.value);
                                                }}
                                            />
                                            {
                                                formValidation.password.length > 0 &&
                                                <div className="validation-errors">
                                                    {
                                                        formValidation.password.map((item, index) => {
                                                            return <span key={index}>{item}</span>
                                                        })
                                                    }
                                                </div>
                                            }
                                        </Form.Group>
                                        <Form.Group
                                            controlId="repeat_password"
                                            className={!formValidation.confirmPassword.length ? '' : 'not-valid'}
                                        >
                                            <Form.ControlLabel>Repeat password</Form.ControlLabel>
                                            <Form.Control
                                                type="password"
                                                name="repeat_password"
                                                placeholder="at least 8 characters"
                                                onBlur={e => handleChangeConfirmPassword(e.target.value)}
                                            />
                                            {
                                                formValidation.confirmPassword.length > 0 &&
                                                <div className="validation-errors">
                                                    {
                                                        formValidation.confirmPassword.map((item, index) => {
                                                            return <span key={index}>{item}</span>
                                                        })
                                                    }
                                                </div>
                                            }
                                        </Form.Group>
                                        <Form.Group>
                                            <Checkbox
                                                onChange={(e, checked) => setCheck1(checked)}
                                            >
                                                Yes! Send me genuinely useful emails every now and then to help me get the most out of Teammers.
                                            </Checkbox>
                                        </Form.Group>
                                        <Form.Group>
                                            <Checkbox
                                                onChange={(e, checked) => setCheck2(checked)}
                                            >
                                                Yes, I understand and agree to the Terms of Service, including the User Agreement and Privacy Policy.
                                            </Checkbox>
                                        </Form.Group>
                                        <Form.Group className="mt-5 mb-3">
                                            <ButtonToolbar>
                                                <Button disabled={!check2} className="submit-btn" type="submit">Sign up</Button>
                                            </ButtonToolbar>
                                        </Form.Group>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="bg-wrapper">
                        <div className="wrapper">

                        </div>
                        <h1 className="banner"> Join your dream
                            <div className="d-flex">
                                <Image
                                    src={'/img/startup.png'}
                                    alt='startup image'
                                    layout={'fixed'}
                                    width={208}
                                    height={68}
                                />
                                team in
                            </div>
                            Minutes.
                        </h1>
                        <p className="text-center">Connect with your future teammates <br />
                            from all over the world.
                        </p>
                    </div> */}
                {/* <div className="_content">
                    <div className="image d-md-flex d-none" style={{
                        backgroundImage: "url('/img/signup.png')"
                    }}>
                        <h1 className="banner"> Join your dream
                            <div className="d-flex">
                                <Image
                                    src={'/img/startup.png'}
                                    alt='startup image'
                                    layout={'fixed'}
                                    width={208}
                                    height={68}
                                />
                                team in
                            </div>
                            Minutes.
                        </h1>
                        <p className="text-center">Connect with your future teammates <br />
                            from all over the world.</p>
                    </div>
                    <div className="signup_form">
                        <h2>Sign up</h2>
                        <p>Already a Member? <Link href="/login"><a>Log in</a></Link></p>
                        <div className="with_google d-flex">
                            <Button className="signup_google">
                                <Image
                                    src={'/icons/google.svg'}
                                    alt='startup image'
                                    layout={'fixed'}
                                    width={24}
                                    height={24}
                                />
                                <span className="ml-2">Sign up with Google</span>
                            </Button>
                            <Button>
                                <Image
                                    src={'/social-images/twitter.svg'}
                                    alt='startup image'
                                    layout={'fixed'}
                                    width={24}
                                    height={24}
                                />
                            </Button>
                            <Button>
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
                        }}>
                            OR
                        </Divider>
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
                            <Form.Group
                                controlId="email"
                                className={!formValidation.email.length ? '' : 'not-valid'}
                            >
                                <Form.ControlLabel>E-mail</Form.ControlLabel>
                                <Form.Control
                                    name="email"
                                    type="email"
                                    placeholder="Name@domain.com"
                                    onBlur={e => handleChangeEmail(e.target.value)}
                                />
                                {
                                    formValidation.email.length > 0 &&
                                    <div className="validation-errors">
                                        {
                                            formValidation.email.map((item, index) => {
                                                return <span key={index}>{item}</span>
                                            })
                                        }
                                    </div>
                                }
                            </Form.Group>
                            <Form.Group
                                controlId="password"
                                className={!formValidation.password.length ? '' : 'not-valid'}
                            >
                                <Form.ControlLabel>Password</Form.ControlLabel>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="at least 8 characters"
                                    onBlur={e => {
                                        setPassword(e.target.value);
                                        handleChangePassword(e.target.value);
                                    }}
                                />
                                {
                                    formValidation.password.length > 0 &&
                                    <div className="validation-errors">
                                        {
                                            formValidation.password.map((item, index) => {
                                                return <span key={index}>{item}</span>
                                            })
                                        }
                                    </div>
                                }
                            </Form.Group>
                            <Form.Group
                                controlId="repeat_password"
                                className={!formValidation.confirmPassword.length ? '' : 'not-valid'}
                            >
                                <Form.ControlLabel>Repeat password</Form.ControlLabel>
                                <Form.Control
                                    type="password"
                                    name="repeat_password"
                                    placeholder="at least 8 characters"
                                    onBlur={e => handleChangeConfirmPassword(e.target.value)}
                                />
                                {
                                    formValidation.confirmPassword.length > 0 &&
                                    <div className="validation-errors">
                                        {
                                            formValidation.confirmPassword.map((item, index) => {
                                                return <span key={index}>{item}</span>
                                            })
                                        }
                                    </div>
                                }
                            </Form.Group>
                            <Form.Group>
                                <Checkbox
                                    onChange={(e, checked) => setCheck1(checked)}
                                >
                                    Yes! Send me genuinely useful emails every now and then to help me get the most out of Teammers.
                                </Checkbox>
                            </Form.Group>
                            <Form.Group>
                                <Checkbox
                                    onChange={(e, checked) => setCheck2(checked)}
                                >
                                    Yes, I understand and agree to the Terms of Service, including the User Agreement and Privacy Policy.
                                </Checkbox>
                            </Form.Group>
                            <Form.Group>
                                <ButtonToolbar>
                                    <Button disabled={!check2} className="login-button" type="submit">Sign up</Button>
                                </ButtonToolbar>
                            </Form.Group>
                        </Form>
                    </div>
                </div> */}
            </div>
        </div >
    )
};

Signup.layout = false;

export default withCookie(Signup);

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
//             data: 'ajksndkajjsnd'
//         }
//     }
// }
