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

        if (!selectedWorkExp.position?.id) {
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
        if (!selectedWorkExp.location?.id) {
            validationErrors.push({
                key: 'location',
                message: `Location field is required`
            });
        };
        if (!selectedWorkExp.start_month?.id) {
            validationErrors.push({
                key: 'start_month',
                message: `Start month field is required`
            });
        };
        if (!selectedWorkExp.start_year?.id) {
            validationErrors.push({
                key: 'start_year',
                message: `Start year field is required`
            });
        };
        if (!selectedWorkExp.isCurrent) {
            if (!selectedWorkExp.end_month?.id) {
                validationErrors.push({
                    key: 'end_month',
                    message: `End month field is required`
                });
            };
            if (!selectedWorkExp.end_year?.id) {
                validationErrors.push({
                    key: 'end_year',
                    message: `End year field is required`
                });
            };
        };

        setValidationErrors(validationErrors);

        if (!validationErrors.length) return true;

        return false;
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
                                    onClick={() => {
                                        let startDate;
                                        let endDate;

                                        if (item.start_date?.split("-")[0]) {
                                            startDate = {
                                                month: months.find(x => x.id === Number(item.start_date.split("-")[0])),
                                                year: years.find(x => x.id === Number(item.start_date.split("-")[1]))
                                            }
                                        };
                                        if (item.end_date?.split("-")[0]) {
                                            endDate = {
                                                month: months.find(x => x.id === Number(item.end_date.split("-")[0])),
                                                year: years.find(x => x.id === Number(item.end_date.split("-")[1]))
                                            }
                                        };

                                        setSelectedWorkExp({
                                            id: item.id,
                                            position: item.position,
                                            companyName: item.company,
                                            location: item.location,
                                            start_month: startDate?.month ?? null,
                                            start_year: startDate?.year ?? null,
                                            end_month: endDate?.month ?? null,
                                            end_year: endDate?.year ?? null,
                                            isCurrent: item.current,
                                        });
                                        editModal.toggle();
                                    }}
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
                            onClick={() => {
                                if (validateWorkExpForm() && createModal?.submitFunc) {
                                    createModal.submitFunc(selectedWorkExp);
                                }
                            }}
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
                        editModal.toggle();
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
                            onClick={() => editModal.toggle()}
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
                                if (validateWorkExpForm() && editModal.submitFunc) {
                                    editModal.submitFunc(selectedWorkExp);
                                }
                            }}
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
        </div>
    )
}

export default CardTeammerWorkExperience
