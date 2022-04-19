import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {URL_REGEX} from '../../configuration';
import Link from 'next/link';
import {Button, IconButton, Input, InputPicker, Modal, Notification, toaster} from 'rsuite';
import ActionLink from '../Lib/ActionLink';
import axios from "axios";
import config from "../../configuration";

function CardTeammerPortfolio(props) {
    const {
        title,
        editMode,
        classNames,
        portfolioUrlList,
        setPortfolioUrlList,
        cvUrl,
        full_name,
        removeCvFunc,
        uploadCvFunc,
    } = props;

    const [newPortfolioLink, setNewPortfolioLink] = useState('');

    const teammerCvRef = useRef();

    return (
        <div className={`resume-card ${classNames ? classNames : ''}`}>
            <div className="card-top">
                {
                    title &&
                    <p className="_title">{title}</p>
                }
                <div className="resume-wrap">
                    <div className="resume">
                        {
                            cvUrl ?
                                <>
                                    <span>
                                        <Image
                                            src={'/icons/file.svg'}
                                            alt='img'
                                            width={24}
                                            height={24}
                                            layout='fixed'
                                        />
                                    </span>
                                    <a
                                        href={cvUrl}
                                        target="_blank"
                                        // download
                                    >
                                        {
                                            full_name ? full_name : 'CV'
                                        }
                                    </a>
                                </>
                                :
                                <div className="upload-avatar-wrapper mb-4">
                                    <input
                                        type="file"
                                        className="d-none"
                                        ref={teammerCvRef}
                                        onChange={e => {
                                            if (uploadCvFunc) {
                                                uploadCvFunc(e);
                                            }
                                            ;
                                        }}
                                    />
                                    <div>
                                        <Image
                                            width={24}
                                            height={24}
                                            alt='icon'
                                            src={'/icons/file.svg'}
                                        />
                                        <button
                                            type='button'
                                            onClick={() => {
                                                teammerCvRef.current.click()
                                            }}
                                        >
                                            Import from Linkedin
                                        </button>
                                    </div>
                                    {/* <div className="validation-errors">
                                        {
                                            teammerStepValidations.step_2.map((item, index) => {
                                                if (item.key === "cv") {
                                                    return <span key={index}>{item.message}</span>
                                                };
                                            })
                                        }
                                    </div> */}
                                </div>
                        }
                    </div>
                    <div className="action-buttons">
                        {
                            editMode ?
                                <>
                                    {/* <span
                                        className="c-pointer"
                                        onClick={() => teammerCvRef.current.click()}
                                    >
                                        <Image
                                            src={'/icons/link.svg'}
                                            alt='img'
                                            width={16}
                                            height={16}
                                            layout='fixed'
                                        />
                                    </span> */}
                                    {
                                        cvUrl && removeCvFunc &&
                                        <IconButton
                                            size="sm"
                                            className='bg-transparent ml-2'
                                            icon={
                                                <Image
                                                    src={'/icons/trash.svg'}
                                                    alt='img'
                                                    width={16}
                                                    height={16}
                                                    layout='fixed'
                                                />
                                            }
                                            onClick={() => {
                                                if (window.confirm("Are you sure remove CV file ?")) {
                                                    removeCvFunc();
                                                }
                                                ;
                                            }}
                                        />
                                    }
                                </>
                                :
                                <IconButton
                                    size="md"
                                    className='view-resume-btn'
                                    icon={
                                        <Image
                                            src={'/icons/eye_view.svg'}
                                            alt='img'
                                            width={16}
                                            height={16}
                                            layout='fixed'
                                        />
                                    }
                                />
                        }
                    </div>
                </div>
            </div>
            <div className="card-content">
                <ul>
                    {
                        portfolioUrlList.portfolio.length > 0 && portfolioUrlList?.portfolio?.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    className="d-flex justify-content-between align-items-center"
                                >
                                    <a href={item} target="_blank">{item}</a>
                                    <IconButton
                                        size="sm"
                                        className='bg-transparent ml-2'
                                        icon={
                                            <span onClick={() => {
                                                setPortfolioUrlList(portfolioUrlList.filter(i => i !== item))
                                            }}
                                            >
                                                <Image
                                                    src={'/icons/trash.svg'}
                                                    alt='img'
                                                    width={16}
                                                    height={16}
                                                    layout='fixed'
                                                />
                                            </span>
                                        }
                                    />
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            {
                editMode &&
                <div className="card-bottom">
                    <div className="add-to-list-wrapper">
                        <Input
                            type='url'
                            className='mr-3'
                            placeholder='Enter portfolio link'
                            value={newPortfolioLink}
                            onChange={value => setNewPortfolioLink(value)}
                        />
                        <IconButton
                            size="sm"
                            color='primary'
                            appearance='blue'
                            icon={
                                <Image
                                    src={'/icons/plus.svg'}
                                    alt='img'
                                    width={14}
                                    height={14}
                                    layout='fixed'
                                />
                            }
                            onClick={() => {
                                // if (!/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(newPortfolioLink)) return;

                                if (portfolioUrlList.some(item => item !== newPortfolioLink) && newPortfolioLink.trim()) {
                                    let arr = portfolioUrlList;
                                    arr.push(newPortfolioLink);
                                    setPortfolioUrlList(arr);
                                    setNewPortfolioLink('')
                                }
                                ;
                            }}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default CardTeammerPortfolio
