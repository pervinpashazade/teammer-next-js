import Image from 'next/image'
import Link from 'next/link';
import React, {useEffect, useState} from 'react'
import {Button, ButtonToolbar, Form, Modal} from 'rsuite'
import {FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useAuth} from "../../../Auth";
import {loginService} from "../../services/Auth/loginService";
import {setAuthCookies} from "../../helpers/cookie";

function AuthModal(props) {
    const firebaseAuth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const authContext = useAuth();
    const [validation, setValidation] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const {
        isOpen,
        setIsOpen
    } = props;
    const withGoogleService = () => {
        signInWithPopup(firebaseAuth, googleProvider).catch(err => console.log('withGoogleService', err));
    };
    const withFacebookService = () => {
        signInWithPopup(firebaseAuth, facebookProvider).catch(err => console.log('withFacebookService', err));
    };
    const login_form = async (event) => {

        let data = new FormData(event.target);
        let body = {};

        for (let [key, value] of data.entries()) {
            body[key] = value;
        };

        if (!body.email) {
            setValidation(false);
            return;
        };
        if (!body.password) {
            setValidation(false);
        } else if (body.password.length < 8) {
            setErrorMessage('Password must be at least 8 characters')
            return;
        } else if (body.password.length > 16) {
            setErrorMessage('Password must be between 8 - 16 characters')
            return;
        };

        const loginResult = await loginService(data);

        console.log('loginResult', loginResult);

        if (loginResult?.success) {

            setAuthCookies(
                loginResult.data.token,
                loginResult.data.user.full_name,
                loginResult.data.user.type,
                loginResult.data.user.id
            );

            // loginResult.data.user.is_complete_registration ?
            //     (loginResult.data.user.type === 1 ? router.push('/owner/home')
            //         :
            //         router.push('/teammer/home')) : router.push("/signup/steps");

            // console.log('authContext', authContext);

            authContext.setCurrentUser(loginResult.data.user);

        } else {
            setErrorMessage(loginResult.message)
            setValidation(false)
        };
    };
    useEffect(()=>{
        if(authContext.currentUser){
            setIsOpen(!isOpen)
        }
    },[authContext.currentUser])
    return (
        <div className="not-auth-layout login">
            <Modal
                size='sm'
                open={isOpen}
                className='info-modal _auth'
                onClose={() => setIsOpen(!isOpen)}
                overflow={false}
            >
                <Modal.Header>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="_modal-top">
                        <Image
                            src={'/img/bag.png'}
                            alt='img'
                            width={106}
                            height={106}
                            layout='fixed'
                            quality={100}
                            // className="mb-3"
                        />
                        <div className="title">
                            <h1>
                                To apply to the project,
                                please log in
                            </h1>
                        </div>
                    </div>
                    <p>
                        Not a Member?
                        <Link href="/signup" passHref>
                            <a>Sign up</a>
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
                        <Button onClick={withFacebookService}>
                            <Image
                                src={'/social-images/facebook2.svg'}
                                alt='img'
                                width={24}
                                height={24}
                                layout='fixed'
                            />
                        </Button>
                    </div>
                    <div className="_hr"><span>OR</span></div>
                    <Form className='form' onSubmit={(condition, event) => {
                        login_form(event)
                    }}>
                        <Form.Group controlId="email">
                            <Form.ControlLabel className={validation ? '' : 'login-validation'}>E-mail or username</Form.ControlLabel>
                            <Form.Control className={validation ? '' : 'login-border-color'} name="email" type="email" placeholder="Name@domain.com" />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.ControlLabel className={validation ? '' : 'login-validation'}>Password</Form.ControlLabel>
                            <Form.Control className={validation ? '' : 'login-border-color'} name="password" type="password" placeholder="at least 8 characters" />
                        </Form.Group>
                        <p className="text-danger font-weight-bold">{errorMessage}</p>
                        <Form.Group>
                            <ButtonToolbar>
                                <Button className="submit-btn btn-block" style={{
                                    backgroundColor : "#2a6fff",
                                    borderRadius : "72px",
                                    padding : "13px 24px",
                                    color : "white"
                                }} type="submit">Log in</Button>
                            </ButtonToolbar>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="_modal-footer">
                        {/*<Button*/}
                        {/*    className='_login-btn'*/}
                        {/*>*/}
                        {/*    Log in*/}
                        {/*</Button>*/}
                        <Link href="/forgot" passHref>
                            <a>
                                Forgot Username or Password?
                            </a>
                        </Link>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AuthModal