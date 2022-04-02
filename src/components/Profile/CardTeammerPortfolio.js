import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
<<<<<<< HEAD
import { IconButton, Input } from 'rsuite';
import { URL_REGEX } from '../../configuration';
=======
import Link from 'next/link';
import {Button, IconButton, Input, InputPicker, Modal, Notification, toaster} from 'rsuite';
import ActionLink from '../Lib/ActionLink';
import axios from "axios";
import config from "../../configuration";
>>>>>>> ba9e634811e8863d9797601f7df2b994dc7ba42b

function CardTeammerPortfolio(props) {
    const {
        title,
        editMode,
        classNames,
        portfolioUrlList,
        setPortfolioUrlList,
        cvUrl,
        full_name,
    } = props;

    // React.useEffect(() => {
    //     console.log('component card props', props);
    // }, [props]);
    // console.log(portfolioUrlList)

    const [newPortfolioLink, setNewPortfolioLink] = useState('');

    const inputRef = useRef();
    // wrong
    const uploadFile = (event) => {
        // console.log(event)
        if (event.target.files) {
            let file_extension = event.target.files[0].type.split("/").pop();
            if (file_extension === "pdf" || file_extension === "doc" || file_extension === "txt") {
                setPortfolioUrlList({
                    ...portfolioUrlList,
                    cvFileName: event.target.files[0].name,
                    cv: event.target.files[0]
                })
            }
            // console.log(event.target.files[0])
        }
    };


    return (
        <div className={`resume-card ${classNames ? classNames : ''}`}>
            <div className="card-top">
                {
                    title &&
                    <p className="_title">{title}</p>
                }
                <div className="resume-wrap">
                    <div className="resume">
                        <span onClick={() => console.log(inputRef)}>
                            <Image
                                src={'/icons/file.svg'}
                                alt='img'
                                width={24}
                                height={24}
                                layout='fixed'
                            />
                        </span>
                        <input
                            className="d-none"
                            onChange={uploadFile}
                            ref={inputRef}
                            type="file"
                        />
                        {
                            cvUrl &&
                            <a
                                href={cvUrl}
                                target="_blank"
                                download
                            >
                                {
                                    full_name ? full_name : 'CV'
                                }
                            </a>
                        }
                    </div>
                    <div className="action-buttons">
                        {
                            editMode ?
                                <>
                                    <span
                                        className="c-pointer"
                                        onClick={() => inputRef.current.click()}
                                    >
                                        <Image
                                            src={'/icons/link.svg'}
                                            alt='img'
                                            width={16}
                                            height={16}
                                            layout='fixed'
                                        />
                                    </span>
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
                                    />
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
                        console.log(portfolioUrlList)
                    }
                    {/*{*/}
                    {/*    portfolioUrlList.map((item, index) => {*/}
                    {/*        return (*/}
                    {/*            <li*/}
                    {/*                key={index}*/}
                    {/*                className="d-flex justify-content-between align-items-center"*/}
                    {/*            >*/}
                    {/*                <a href={item} target="_blank">{item}</a>*/}
                    {/*                <IconButton*/}
                    {/*                    size="sm"*/}
                    {/*                    className='bg-transparent ml-2'*/}
                    {/*                    icon={*/}
                    {/*                        <span onClick={() => {*/}
                    {/*                            setPortfolioUrlList(portfolioUrlList.filter(i => i !== item))*/}
                    {/*                        }}*/}
                    {/*                        >*/}
                    {/*                            <Image*/}
                    {/*                                src={'/icons/trash.svg'}*/}
                    {/*                                alt='img'*/}
                    {/*                                width={16}*/}
                    {/*                                height={16}*/}
                    {/*                                layout='fixed'*/}
                    {/*                            />*/}
                    {/*                        </span>*/}
                    {/*                    }*/}
                    {/*                />*/}
                    {/*            </li>*/}
                    {/*        )*/}
                    {/*    })*/}
                    {/*}*/}
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
                                if (!URL_REGEX.test(newPortfolioLink)) return;

                                if (portfolioUrlList.some(item => item !== newPortfolioLink) && newPortfolioLink.trim()) {
                                    let arr = portfolioUrlList;
                                    arr.push(newPortfolioLink);
                                    setPortfolioUrlList(arr);
                                    setNewPortfolioLink('')
                                };
                            }}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default CardTeammerPortfolio
