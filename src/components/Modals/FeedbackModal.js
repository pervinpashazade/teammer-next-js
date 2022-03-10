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
            className='info-modal'
            onClose={() => setIsOpen(!isOpen)}
            overflow={false}
        >
            <Modal.Header>
                <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="_modal-top">
                    <Image
                        src={'/img/post-box.png'}
                        alt='img'
                        width={106}
                        height={106}
                        layout='fixed'
                        quality={100}
                    />
                    <div className="title">
                        <h1>
                            Send Feedback
                        </h1>
                    </div>
                </div>
                <Form className='form' onSubmit={(condition, event) => { forgotPassword() }}>
                    <Form.Group controlId="email">
                        <Form.ControlLabel>E-mail or username</Form.ControlLabel>
                        <Form.Control name="email" type="email" placeholder="Name@domain.com" />
                    </Form.Group>
                    <Form.Group controlId="subject">
                        <Form.ControlLabel>Subject</Form.ControlLabel>
                        <Form.Control name="subject" placeholder="Summary of your observation" />
                    </Form.Group>
                    <Form.Group controlId="message">
                        <Form.ControlLabel>Message</Form.ControlLabel>
                        <Form.Control name="message" placeholder="Give as many details as possible" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div className="_modal-footer">
                    <Button
                        className='_cancel-btn'
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <Image
                            src={'/icons/times_blue.svg'}
                            alt='img'
                            width={21}
                            height={21}
                            layout='fixed'
                            quality={100}
                        />
                        <span>Cancel</span>
                    </Button>
                    <Button>
                        <Image
                            src={'/icons/check_white.svg'}
                            alt='img'
                            width={21}
                            height={21}
                            layout='fixed'
                            quality={100}
                        />
                        <span>Send</span>
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default AuthModal