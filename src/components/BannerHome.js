import React from 'react';
import { Button } from 'rsuite';
import { wrapper } from "../store/redux-store";
import { useSelector } from "react-redux";
import Image from 'next/image';

function BannerHome() {
    const store = useSelector(store => store)
    return (
        <>
            {
                store.isAuth === "GUESS" ? <div className="home-banner">
                    <div className="wrapper">
                        <span className="result">Result-aimed platform</span>
                        <h1>
                            Join your dream
                            <div style={{position:'relative'}} className="d-flex align-items-center justify-content-center">
                                <Image
                                    src={'/img/startup.png'}
                                    alt='logo'
                                    width={211}
                                    height={78}
                                    quality={100}
                                />
                                team in
                            </div>
                            Minutes.
                        </h1>
                        <p>
                            Connect with your future teammates
                            from all over the world.
                        </p>
                        <div className="buttons flex-column flex-md-row">
                            <Button color="blue" appearance="primary">
                                {/* <img src="/icons/emoji1.svg" className="mr-2" alt="emoji" /> */}
                                <Image
                                    src={'/icons/emoji1.svg'}
                                    alt='logo'
                                    width={16}
                                    height={17}
                                />
                                Become teammer
                            </Button>
                            <Button className="btn-custom-outline my-2 my-md-0" color="blue" appearance="primary">
                                {/* <img style={{ width: '11px', height: '15px' }} src="/icons/play.svg" className="mr-2" alt="emoji" /> */}
                                <Image
                                    src={'/icons/play.svg'}
                                    alt='logo'
                                    width={11}
                                    height={15}
                                />
                                Watch tutorial
                            </Button>
                        </div>
                    </div>
                </div> : store.isAuth === "STARTUP_TYPE" ?
                    <div className="home-banner">
                        <div className="wrapper">
                            <h1>
                                Hello , {
                                    store.user?.full_name
                                }
                                <br />
                                Time to reach new heights
                            </h1>
                            <p>
                                Connect with your future teammates
                                from all over the world.
                            </p>
                        </div>
                    </div> : store.isAuth === "TEAMMER_TYPE" ? <div className="home-banner">
                        <div className="wrapper">
                            <span>Result-aimed platform</span>
                            <h1>
                                Join your dream
                                {/* <img src="/img/startup.png" alt="startup image" /> */}
                                <Image
                                    src={'/img/startup.png'}
                                    alt='logo'
                                    width={211}
                                    height={78}
                                />
                                team in Minutes.
                            </h1>
                            <p>
                                Connect with your future teammates
                                from all over the world.
                            </p>
                            <div className="buttons">
                                <Button color="blue" appearance="primary">
                                    {/* <img src="/icons/emoji1.svg" className="mr-2" alt="emoji" /> */}
                                    <Image
                                        src={'/icons/emoji1.svg'}
                                        alt='logo'
                                        width={16}
                                        height={17}
                                    />
                                    Become teammer
                                </Button>
                                <Button className="btn-custom-outline" color="blue" appearance="primary">
                                    {/* <img style={{ width: '11px', height: '15px' }} src="/icons/play.svg" className="mr-2" alt="emoji" /> */}
                                    <Image
                                        src={'/icons/play.svg'}
                                        alt='logo'
                                        width={11}
                                        height={15}
                                    />
                                    Watch tutorial
                                </Button>
                            </div>
                        </div>
                    </div> : ""
            }
        </>
    )
}

export default wrapper.withRedux(BannerHome)
