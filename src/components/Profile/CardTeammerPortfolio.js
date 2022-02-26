import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IconButton, Input } from 'rsuite';
import ActionLink from '../Lib/ActionLink';

function CardTeammerPortfolio(props) {

    const {
        title,
        editMode,
        classNames,
        portfolioUrlList,
        setPortfolioUrlList,
    } = props;

    React.useEffect(() => {
        console.log('component card props', props);
    }, [props]);

    const [newPortfolioLink, setNewPortfolioLink] = useState('');

    return (
        <div className={`resume-card ${classNames ? classNames : ''}`}>
            <div className="card-top">
                {
                    title &&
                    <p className="_title">{title}</p>
                }
                <div className="resume-wrap">
                    <div className="resume">
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
                {
                    console.log(portfolioUrlList)
                }
                <ul>
                    {/*{*/}
                    {/*    portfolioUrlList?.map((item, index) => {*/}
                    {/*        return <li key={index}>*/}
                    {/*            <Link href={item}>*/}
                    {/*                <a>{item}</a>*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*    })*/}
                    {/*}*/}

                </ul>
            </div>
            {
                editMode &&
                <div className="card-bottom">
                    <div className="add-to-list-wrapper">
                        <Input
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
                                setPortfolioUrlList(
                                    [...portfolioUrlList,
                                        newPortfolioLink]
                                );
                                setNewPortfolioLink('');
                            }}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default CardTeammerPortfolio
