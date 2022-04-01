import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
    Button,
    Checkbox,
    Form,
    IconButton,
    InputPicker,
    Modal,
    Input
} from 'rsuite';
import { months } from '../../configuration';


function CardTeammerWorkExperience(props) {

    const [years, setYears] = useState([]);

    const {
        editMode,
        createModal,
        editModal,
        workExperienceList,
        positionList,
        locationList,
        submitFunc,
    } = props;

    const [validationErrors, setValidationErrors] = useState([]);
    const [selectedWorkExp, setSelectedWorkExp] = useState({
        isCurrent: false,
        position: {
            id: null,
            name: null,
            key: "Position",
        },
        companyName: '',
        location: {
            id: null,
            name: null,
            key: "Location",
        },
        start_month: {
            id: null,
            name: null,
            key: "Start month",
        },
        start_year: {
            id: null,
            name: null,
            key: "Start year",
        },
        end_month: {
            id: null,
            name: null,
            key: "End month",
        },
        end_year: {
            id: null,
            name: null,
            key: "End year",
        },
    });

    const resetState = () => {
        setSelectedWorkExp({
            isCurrent: false,
            position: {
                id: null,
                name: null,
                key: "Position",
            },
            companyName: '',
            location: {
                id: null,
                name: null,
                key: "Location",
            },
            start_month: {
                id: null,
                name: null,
                key: "Start month",
            },
            start_year: {
                id: null,
                name: null,
                key: "Start year",
            },
            end_month: {
                id: null,
                name: null,
                key: "End month",
            },
            end_year: {
                id: null,
                name: null,
                key: "End year",
            },
        });
        setValidationErrors([]);
    };

    useEffect(() => {
        let yearArr = [];
        let nowDate = (new Date()).getFullYear();
        for (let i = 2000; i <= nowDate; i++) {
            yearArr.push({
                id: i,
                name: `${i}`,
            });
        };
        setYears(yearArr);
    }, []);

    const validateWorkExpForm = () => {
        if (!selectedWorkExp) return false;

        let validationErrors = [];

        if (!selectedWorkExp.position.id) {
            validationErrors.push({
                key: 'position',
                message: `Position field is required`
            });
        };
        if (!selectedWorkExp.companyName?.trim()) {
            validationErrors.push({
                key: 'companyName',
                message: `Company name field is required`
            });
        };
        if (!selectedWorkExp.location.id) {
            validationErrors.push({
                key: 'location',
                message: `Location field is required`
            });
        };
        if (!selectedWorkExp.start_month.id) {
            validationErrors.push({
                key: 'start_month',
                message: `Start month field is required`
            });
        };
        if (!selectedWorkExp.start_year.id) {
            validationErrors.push({
                key: 'start_year',
                message: `Start year field is required`
            });
        };
        if (!selectedWorkExp.isCurrent) {
            if (!selectedWorkExp.end_month.id) {
                validationErrors.push({
                    key: 'end_month',
                    message: `End month field is required`
                });
            };
            if (!selectedWorkExp.end_year.id) {
                validationErrors.push({
                    key: 'end_year',
                    message: `End year field is required`
                });
            };
        };

        setValidationErrors(validationErrors);

        if (validationErrors.length) return;

        submitFunc(selectedWorkExp);
    };

    return (
        <div className='work-experience-card-teammer'>
            <div className="card-top">
                <h4>Work Experience</h4>
                {
                    editMode &&
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
                        onClick={() => createModal.toggle()}
                    />
                }
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
                                    item.location_id && ' / '
                                }
                                {
                                    item.location?.id &&
                                        item.location.name ? item.location.name : ''
                                }
                                {/* {locationList?.find(i => i.value === item.location_id)?.label} */}
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
                                    onClick={() => createModal.toggleEdit(item.id)}
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
                    onClose={() => {
                        createModal.toggle();
                        resetState();
                    }}
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
                                    value={selectedWorkExp.position?.id}
                                    valueKey="id"
                                    labelKey='name'
                                    data={positionList}
                                    onSelect={(id, obj) => {
                                        setSelectedWorkExp(prevState => {
                                            return {
                                                ...prevState,
                                                position: obj
                                            }
                                        });
                                    }}
                                />
                                <div className="validation-errors">
                                    <span>
                                        {
                                            validationErrors.find(x => x.key === 'position')?.message
                                        }
                                    </span>
                                </div>
                            </Form.Group>
                            <Form.Group controlId="company">
                                <Form.ControlLabel>Company</Form.ControlLabel>
                                <Input
                                    placeholder="Enter Company name"
                                    value={selectedWorkExp.companyName}
                                    onChange={(e) => {
                                        setSelectedWorkExp(prevState => {
                                            return {
                                                ...prevState,
                                                companyName: e
                                            };
                                        });
                                    }}
                                />
                                <div className="validation-errors">
                                    <span>
                                        {
                                            validationErrors.find(x => x.key === 'companyName')?.message
                                        }
                                    </span>
                                </div>
                            </Form.Group>
                            <Form.Group controlId="location">
                                <Form.ControlLabel>Location</Form.ControlLabel>
                                <InputPicker
                                    size="md"
                                    className="w-100"
                                    placeholder="Your location"
                                    data={locationList}
                                    value={selectedWorkExp.location?.id}
                                    valueKey="id"
                                    labelKey='name'
                                    onSelect={(id, obj) => {
                                        setSelectedWorkExp(prevState => {
                                            return {
                                                ...prevState,
                                                location: obj
                                            };
                                        });
                                    }}
                                />
                                <div className="validation-errors">
                                    <span>
                                        {
                                            validationErrors.find(x => x.key === 'location')?.message
                                        }
                                    </span>
                                </div>
                            </Form.Group>
                            <div className="date-wrapper">
                                <div className='wrapper-item'>
                                    <Form.Group controlId="start_month">
                                        <Form.ControlLabel>Start date</Form.ControlLabel>
                                        <InputPicker
                                            size="md"
                                            className="w-100"
                                            placeholder="Month"
                                            data={months}
                                            valueKey="id"
                                            labelKey='name'
                                            value={selectedWorkExp.start_month?.id}
                                            onSelect={(id, obj) => {
                                                setSelectedWorkExp(prevState => {
                                                    return {
                                                        ...prevState,
                                                        start_month: obj
                                                    };
                                                });
                                            }}
                                        />
                                        <div className="validation-errors">
                                            <span>
                                                {
                                                    validationErrors.find(x => x.key === 'start_month')?.message
                                                }
                                            </span>
                                        </div>
                                    </Form.Group>
                                    <Form.Group controlId="start_year">
                                        <Form.ControlLabel>
                                            <span className='invisible'>Year</span>
                                        </Form.ControlLabel>
                                        <InputPicker
                                            size="md"
                                            className="w-100"
                                            placeholder="Year"
                                            data={years}
                                            value={selectedWorkExp.start_year?.id}
                                            valueKey="id"
                                            labelKey='name'
                                            onSelect={(id, obj) => {
                                                setSelectedWorkExp(prevState => {
                                                    return {
                                                        ...prevState,
                                                        start_year: obj
                                                    };
                                                });
                                            }}
                                        />
                                        <div className="validation-errors">
                                            <span>
                                                {
                                                    validationErrors.find(x => x.key === 'start_year')?.message
                                                }
                                            </span>
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className='wrapper-item'>
                                    <Form.Group controlId="end_month">
                                        <Form.ControlLabel
                                            className={selectedWorkExp.isCurrent ? "text-muted" : ""}
                                        >
                                            End date
                                        </Form.ControlLabel>
                                        <InputPicker
                                            size="md"
                                            className="w-100"
                                            placeholder="Month"
                                            data={months}
                                            valueKey="id"
                                            labelKey='name'
                                            value={selectedWorkExp.end_month?.id}
                                            disabled={selectedWorkExp.isCurrent}
                                            onSelect={(id, obj) => {
                                                setSelectedWorkExp(prevState => {
                                                    return {
                                                        ...prevState,
                                                        end_month: obj
                                                    };
                                                });
                                            }}
                                        />
                                        <div className="validation-errors">
                                            <span>
                                                {
                                                    validationErrors.find(x => x.key === 'end_month')?.message
                                                }
                                            </span>
                                        </div>
                                    </Form.Group>
                                    <Form.Group controlId="start_year">
                                        <Form.ControlLabel>
                                            <span className='invisible'>Year</span>
                                        </Form.ControlLabel>
                                        <InputPicker
                                            disabled={selectedWorkExp.isCurrent}
                                            size="md"
                                            className="w-100"
                                            placeholder="Year"
                                            data={years}
                                            value={selectedWorkExp.end_year?.id}
                                            valueKey="id"
                                            labelKey='name'
                                            onSelect={(id, obj) => {
                                                setSelectedWorkExp(prevState => {
                                                    return {
                                                        ...prevState,
                                                        end_year: obj
                                                    };
                                                });
                                            }}
                                        />
                                        <div className="validation-errors">
                                            <span>
                                                {
                                                    validationErrors.find(x => x.key === 'end_year')?.message
                                                }
                                            </span>
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>
                            <Checkbox
                                checked={selectedWorkExp.isCurrent}
                                onChange={(e, checked) => {
                                    if (checked) {
                                        setSelectedWorkExp(prevState => {
                                            return {
                                                ...prevState,
                                                end_month: {
                                                    id: null,
                                                    name: null,
                                                    key: "End month",
                                                },
                                                end_year: {
                                                    id: null,
                                                    name: null,
                                                    key: "End year",
                                                },
                                                isCurrent: checked
                                            }
                                        });
                                    } else {
                                        setSelectedWorkExp(prevState => {
                                            return {
                                                ...prevState,
                                                isCurrent: checked
                                            }
                                        });
                                    };
                                }}
                            >
                                I’m currently working in this position
                            </Checkbox>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            color="blue"
                            appearance="primary"
                            className="btn-custom-outline btn-cancel"
                            onClick={() => createModal.toggle()}
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
                            onClick={validateWorkExpForm}
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
                    onClose={() => {
                        editModal.toggleFunc();
                        resetState();
                    }}
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
                            // onClick={() => editModal.toggleFunc()}
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
