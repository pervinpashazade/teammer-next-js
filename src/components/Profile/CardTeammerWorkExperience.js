import Image from 'next/image';
import React, { useState } from 'react';
import { Button, Checkbox, Form, IconButton, InputPicker, Modal } from 'rsuite';

function CardTeammerWorkExperience(props) {

    const {
        editMode,
        createModal,
        editModal,
        workExperienceList,
    } = props;

    // React.useEffect(() => {
    //     console.log('propssss', props);
    // }, [props])

    return (
        <div className='work-experience-card-teammer'>
            <div className="card-top">
                <h4>Work Experience</h4>
                <IconButton
                    size="md"
                    className='add-exp-btn'
                    icon={
                        <Image
                            src={'/icons/plus.svg'}
                            alt='img'
                            width={14}
                            height={14}
                            layout='fixed'
                        />
                    }
                    onClick={() => createModal.toggleFunc()}
                />
            </div>
            <ul className="experience-wrapper">
                {
                    workExperienceList?.map((item, index) => {
                        return <li key={index}>
                            <span className="date">
                                {item.start_date}
                                {`${item.start_date && item.end_date ? ' - ' : ''}`}
                                {item.end_date}
                            </span>
                            <h3>{item.position?.name}</h3>
                            <p>
                                {item.company}
                                {
                                    item.company && item.location?.name && ' / '
                                }
                                {item.location?.name}
                                San Francisco, CA
                            </p>
                            {
                                editMode &&
                                <IconButton
                                    size="sm"
                                    className='edit-exp-btn bg-transparent'
                                    icon={
                                        <Image
                                            src={'/icons/edit.svg'}
                                            alt='img'
                                            width={16}
                                            height={16}
                                            layout='fixed'
                                        />
                                    }
                                    onClick={() => editModal.toggleFunc()}
                                />
                            }
                        </li>
                    })
                }
            </ul>
            {
                createModal &&
                <Modal
                    size='sm'
                    open={createModal.isOpen}
                    className='work-exp-modal'
                    onClose={() => createModal.toggleFunc()}
                >
                    <Modal.Header>
                        <Modal.Title>{createModal.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="position">
                                <Form.ControlLabel>Position</Form.ControlLabel>
                                <InputPicker
                                    size="md"
                                    className="w-100"
                                    placeholder="Position"
                                    data={
                                        [{
                                            label: "Developer",
                                            value: 'DEVELOPER'
                                        },
                                        {
                                            label: "Designer",
                                            value: 'DESIGNER'
                                        },
                                        {
                                            label: "Manager",
                                            value: 'MANAGER'
                                        },
                                        {
                                            label: "Director",
                                            value: 'DIRECTOR'
                                        }]
                                    }
                                />
                            </Form.Group>
                            <Form.Group controlId="company">
                                <Form.ControlLabel>Company</Form.ControlLabel>
                                <InputPicker
                                    size="md"
                                    className="w-100"
                                    placeholder="Company"
                                    data={
                                        [{
                                            label: "Teammer",
                                            value: 'Teammer'
                                        },
                                        {
                                            label: "Facebook",
                                            value: 'Facebook'
                                        },
                                        {
                                            label: "A2Z",
                                            value: 'A2Z'
                                        },
                                        {
                                            label: "Netflix",
                                            value: 'Netflix'
                                        }]
                                    }
                                />
                            </Form.Group>
                            <Form.Group controlId="location">
                                <Form.ControlLabel>Location</Form.ControlLabel>
                                <InputPicker
                                    size="md"
                                    className="w-100"
                                    placeholder="Location"
                                    data={
                                        [{
                                            label: "USA",
                                            value: 'USA'
                                        },
                                        {
                                            label: "Germany",
                                            value: 'Germany'
                                        },
                                        {
                                            label: "Azerbaijan",
                                            value: 'Azerbaijan'
                                        },
                                        {
                                            label: "Turkey",
                                            value: 'Turkey'
                                        }]
                                    }
                                />
                            </Form.Group>
                            <div className="date-wrapper">
                                <div className='wrapper-item'>
                                    <Form.Group controlId="start_month">
                                        <Form.ControlLabel>Start date</Form.ControlLabel>
                                        <InputPicker
                                            size="size"
                                            className="w-100"
                                            placeholder="Month"
                                            data={
                                                [{
                                                    label: "January",
                                                    value: 'January'
                                                },
                                                {
                                                    label: "February",
                                                    value: 'February'
                                                },
                                                {
                                                    label: "March",
                                                    value: 'March'
                                                },
                                                {
                                                    label: "Aprel",
                                                    value: 'Aprel'
                                                }]
                                            }
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="start_year">
                                        <Form.ControlLabel>
                                            <span className='invisible'>Year</span>
                                        </Form.ControlLabel>
                                        <InputPicker
                                            size="size"
                                            className="w-100"
                                            placeholder="Year"
                                            data={
                                                [{
                                                    label: "2022",
                                                    value: '2022'
                                                },
                                                {
                                                    label: "2021",
                                                    value: '2021'
                                                },
                                                {
                                                    label: "2020",
                                                    value: '2020'
                                                },
                                                {
                                                    label: "2019",
                                                    value: '2019'
                                                }]
                                            }
                                        />
                                    </Form.Group>
                                </div>
                                <div className='wrapper-item'>
                                    <Form.Group controlId="start_month">
                                        <Form.ControlLabel>End date</Form.ControlLabel>
                                        <InputPicker
                                            size="size"
                                            className="w-100"
                                            placeholder="Month"
                                            data={
                                                [{
                                                    label: "January",
                                                    value: 'January'
                                                },
                                                {
                                                    label: "February",
                                                    value: 'February'
                                                },
                                                {
                                                    label: "March",
                                                    value: 'March'
                                                },
                                                {
                                                    label: "Aprel",
                                                    value: 'Aprel'
                                                }]
                                            }
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="start_year">
                                        <Form.ControlLabel>
                                            <span className='invisible'>Year</span>
                                        </Form.ControlLabel>
                                        <InputPicker
                                            size="size"
                                            className="w-100"
                                            placeholder="Year"
                                            data={
                                                [{
                                                    label: "2022",
                                                    value: '2022'
                                                },
                                                {
                                                    label: "2021",
                                                    value: '2021'
                                                },
                                                {
                                                    label: "2020",
                                                    value: '2020'
                                                },
                                                {
                                                    label: "2019",
                                                    value: '2019'
                                                }]
                                            }
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                            <Checkbox> I’m currently working in this position</Checkbox>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            color="blue"
                            appearance="primary"
                            className="btn-custom-outline btn-cancel"
                            onClick={() => createModal.toggleFunc()}
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
                            onClick={() => createModal.toggleFunc()}
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
            }
            {
                editModal &&
                <Modal
                    size='sm'
                    open={editModal.isOpen}
                    className='work-exp-modal'
                    onClose={() => editModal.toggleFunc()}
                >
                    <Modal.Header>
                        <Modal.Title>{editModal.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="position">
                                <Form.ControlLabel>Position</Form.ControlLabel>
                                <InputPicker
                                    size="md"
                                    className="w-100"
                                    placeholder="Position"
                                    data={
                                        [{
                                            label: "Developer",
                                            value: 'DEVELOPER'
                                        },
                                        {
                                            label: "Designer",
                                            value: 'DESIGNER'
                                        },
                                        {
                                            label: "Manager",
                                            value: 'MANAGER'
                                        },
                                        {
                                            label: "Director",
                                            value: 'DIRECTOR'
                                        }]
                                    }
                                />
                            </Form.Group>
                            <Form.Group controlId="company">
                                <Form.ControlLabel>Company</Form.ControlLabel>
                                <InputPicker
                                    size="md"
                                    className="w-100"
                                    placeholder="Company"
                                    data={
                                        [{
                                            label: "Teammer",
                                            value: 'Teammer'
                                        },
                                        {
                                            label: "Facebook",
                                            value: 'Facebook'
                                        },
                                        {
                                            label: "A2Z",
                                            value: 'A2Z'
                                        },
                                        {
                                            label: "Netflix",
                                            value: 'Netflix'
                                        }]
                                    }
                                />
                            </Form.Group>
                            <Form.Group controlId="location">
                                <Form.ControlLabel>Location</Form.ControlLabel>
                                <InputPicker
                                    size="md"
                                    className="w-100"
                                    placeholder="Location"
                                    data={
                                        [{
                                            label: "USA",
                                            value: 'USA'
                                        },
                                        {
                                            label: "Germany",
                                            value: 'Germany'
                                        },
                                        {
                                            label: "Azerbaijan",
                                            value: 'Azerbaijan'
                                        },
                                        {
                                            label: "Turkey",
                                            value: 'Turkey'
                                        }]
                                    }
                                />
                            </Form.Group>
                            <div className="date-wrapper">
                                <div className='wrapper-item'>
                                    <Form.Group controlId="start_month">
                                        <Form.ControlLabel>Start date</Form.ControlLabel>
                                        <InputPicker
                                            size="size"
                                            className="w-100"
                                            placeholder="Month"
                                            data={
                                                [{
                                                    label: "January",
                                                    value: 'January'
                                                },
                                                {
                                                    label: "February",
                                                    value: 'February'
                                                },
                                                {
                                                    label: "March",
                                                    value: 'March'
                                                },
                                                {
                                                    label: "Aprel",
                                                    value: 'Aprel'
                                                }]
                                            }
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="start_year">
                                        <Form.ControlLabel>
                                            <span className='invisible'>Year</span>
                                        </Form.ControlLabel>
                                        <InputPicker
                                            size="size"
                                            className="w-100"
                                            placeholder="Year"
                                            data={
                                                [{
                                                    label: "2022",
                                                    value: '2022'
                                                },
                                                {
                                                    label: "2021",
                                                    value: '2021'
                                                },
                                                {
                                                    label: "2020",
                                                    value: '2020'
                                                },
                                                {
                                                    label: "2019",
                                                    value: '2019'
                                                }]
                                            }
                                        />
                                    </Form.Group>
                                </div>
                                <div className='wrapper-item'>
                                    <Form.Group controlId="start_month">
                                        <Form.ControlLabel>End date</Form.ControlLabel>
                                        <InputPicker
                                            size="size"
                                            className="w-100"
                                            placeholder="Month"
                                            data={
                                                [{
                                                    label: "January",
                                                    value: 'January'
                                                },
                                                {
                                                    label: "February",
                                                    value: 'February'
                                                },
                                                {
                                                    label: "March",
                                                    value: 'March'
                                                },
                                                {
                                                    label: "Aprel",
                                                    value: 'Aprel'
                                                }]
                                            }
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="start_year">
                                        <Form.ControlLabel>
                                            <span className='invisible'>Year</span>
                                        </Form.ControlLabel>
                                        <InputPicker
                                            size="size"
                                            className="w-100"
                                            placeholder="Year"
                                            data={
                                                [{
                                                    label: "2022",
                                                    value: '2022'
                                                },
                                                {
                                                    label: "2021",
                                                    value: '2021'
                                                },
                                                {
                                                    label: "2020",
                                                    value: '2020'
                                                },
                                                {
                                                    label: "2019",
                                                    value: '2019'
                                                }]
                                            }
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                            <Checkbox> I’m currently working in this position</Checkbox>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            color="blue"
                            appearance="primary"
                            className="btn-custom-outline btn-danger delete-account-btn"
                        >
                            <div>
                                {/* <img src='/icons/trash_red.svg' alt='red trash icon svg' /> */}
                                <Image
                                    src={'/icons/trash_red.svg'}
                                    alt='img'
                                    width={16}
                                    height={16}
                                    layout='fixed'
                                />
                                Delete Account
                            </div>
                        </Button>
                        <div className="modal-footer-right-side">
                            <Button
                                color="blue"
                                appearance="primary"
                                className="btn-custom-outline btn-cancel"
                                onClick={() => editModal.toggleFunc()}
                            >
                                <div className='icon-btn-wrapper'>
                                    {/* <img src="/icons/times.svg" className="mr-2" alt="emoji" /> */}
                                    <Image
                                        src={'/icons/times.svg'}
                                        alt='img'
                                        // className="mr-2"
                                        width={14}
                                        height={14}
                                        layout='fixed'
                                    />
                                    Cancel
                                </div>
                            </Button>
                            <Button
                                color="blue"
                                appearance="primary"
                                className='btn-submit'
                                onClick={() => editModal.toggleFunc()}
                            >
                                <div className='icon-btn-wrapper'>
                                    {/* <img src="/icons/plus.svg" className="mr-2" alt="emoji" /> */}
                                    <Image
                                        src={'/icons/plus.svg'}
                                        alt='img'
                                        // className="mr-2"
                                        width={14}
                                        height={14}
                                        layout='fixed'
                                    />
                                    Add
                                </div>
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            }
        </div>
    )
}

export default CardTeammerWorkExperience
