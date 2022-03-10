import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { Button, Form, Modal } from 'rsuite'

function AuthModal(props) {

    const {
        isOpen,
        setIsOpen
    } = props;

    return (
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
                <div className="social-wrapper">
                    <Button
                        className='google'
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
                    <Button>
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
                <Form className='form' onSubmit={(condition, event) => { forgotPassword() }}>
                    <Form.Group controlId="email">
                        <Form.ControlLabel>E-mail or username</Form.ControlLabel>
                        <Form.Control name="email" type="email" placeholder="Name@domain.com" />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.ControlLabel>Password</Form.ControlLabel>
                        <Form.Control name="password" type="password" placeholder="at least 8 characters" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div className="_modal-footer">
                    <Button
                        className='_login-btn'
                    >
                        Log in
                    </Button>
                    <Link href="/forgot" passHref>
                        <a>
                            Forgot Username or Password?
                        </a>
                    </Link>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default AuthModal