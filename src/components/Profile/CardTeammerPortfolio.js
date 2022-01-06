import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IconButton, Input } from 'rsuite';
import ActionLink from '../Lib/ActionLink';

function CardTeammerPortfolio(props) {

    const {
        title,
        editMode,
        classNames,
    } = props;

    return (
        <div className={`resume-card ${classNames ? classNames : ''}`}>
            <div className="card-top">
                {
                    title &&
                    <p className="_title">{title}</p>
                }
                <div className="resume-wrap">
                    <div className="resume">
                        {/* <img src='/icons/file.svg' alt='file icon svg' /> */}
                        <Image
                            src={'/icons/file.svg'}
                            alt='img'
                            width={24}
                            height={24}
                            layout='fixed'
                        />
                        <span>Margaret CV.pdf</span>
                    </div>
                    <div className="action-buttons">
                        {
                            editMode ?
                                <>
                                    <ActionLink
                                        size="sm"
                                        href="profile-teammer/edit"
                                        classNames='bg-transparent'
                                        padding="7px"
                                        margin="0px 0px 0px .75rem"
                                    >
                                        {/* <img src='/icons/link.svg' alt='link icon svg' /> */}
                                        <Image
                                            src={'/icons/link.svg'}
                                            alt='img'
                                            width={16}
                                            height={16}
                                            layout='fixed'
                                        />
                                    </ActionLink>
                                    <IconButton
                                        size="sm"
                                        className='bg-transparent ml-2'
                                        icon={
                                            // <img src='/icons/trash.svg' alt='trash icon svg' />
                                            <Image
                                                src={'/icons/trash.svg'}
                                                alt='img'
                                                width={16}
                                                height={16}
                                                layout='fixed'
                                            />
                                        }
                                    /></>
                                :
                                <IconButton
                                    size="md"
                                    className='view-resume-btn'
                                    icon={
                                        // <img src='/icons/eye_view.svg' alt='eye icon svg' />
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
                    <li>
                        <Link href="/">
                            <a>www.linkname.com</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            <a>www.linkname.com</a>
                        </Link>
                    </li>
                </ul>
            </div>
            {
                editMode &&
                <div className="card-bottom">
                    <div className="add-to-list-wrapper">
                        <Input placeholder='Enter portfolio link' className='mr-3' />
                        <IconButton
                            size="sm"
                            color='primary'
                            appearance='blue'
                            icon={
                                // <img src='/icons/plus.svg' alt='plus icon svg' />
                                <Image
                                    src={'/icons/plus.svg'}
                                    alt='img'
                                    width={14}
                                    height={14}
                                    layout='fixed'
                                />
                            }
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default CardTeammerPortfolio
