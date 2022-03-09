import Image from 'next/image'
import React from 'react'
import { Button, Form, Modal } from 'rsuite'

function ApplyProjectModal() {
    return (
        <Modal
            size='sm'
            // open={createModal.isOpen}
            open={true}
            className='work-exp-modal'
            // onClose={() => createModal.toggle()}
        >
            <Modal.Header>
                <Modal.Title>{createModal.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    inputs
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    color="blue"
                    appearance="primary"
                    className="btn-custom-outline btn-cancel"
                    // onClick={() => createModal.toggle()}
                >
                    <div className='icon-btn-wrapper'>
                        <Image
                            src={'/icons/times.svg'}
                            alt='img'
                            width={14}
                            height={14}
                            layout='fixed'
                        />
                        <span className='ml-2'>Cancel</span>
                    </div>
                </Button>
                <Button
                    color="blue"
                    appearance="primary"
                    className='btn-submit'
                    onClick={() => {
                        console.log(formData.id)
                        if (formData.id) {
                            createModal.toggleEditFunc()
                        } else createModal.toggleFunc()
                    }
                    }
                >
                    <div className='icon-btn-wrapper'>
                        <Image
                            src={'/icons/plus.svg'}
                            alt='img'
                            width={14}
                            height={14}
                            layout='fixed'
                        />
                        <span className='ml-2'>Add</span>
                    </div>
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ApplyProjectModal