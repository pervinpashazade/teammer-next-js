import React from "react";
import CardStartUp from "./Cards/CardStartUp";
import { Button } from 'rsuite';
import Link from 'next/link'
import StartUpWeek from "./StartUpWeek";
import StartUpBlog from "./StartUpBlog";
import { wrapper } from "../store/redux-store";
import { useSelector } from "react-redux";
import { Cookie, withCookie } from 'next-cookie';
import config from "../configuration";

const StartUpByCategory = (props) => {

    const {
        jobList,
        positionList,
    } = props;

    // const store = useSelector(store => store);

    return (
        <div className="startup-category">
            <>
                <div className="row">
                    <div className="col-md-8 startup-sections">
                        <p>Opportunities for Developers</p>
                        <div className="row">
                            {
                                jobList?.map((item, index) => {
                                    return <div
                                        key={index}
                                        className="col-md-6 col-12"
                                    >
                                        <CardStartUp
                                            title={item.project?.title}
                                            ownerFullname={item.project?.user_id}
                                            position={positionList.find(x => x.id === item.position_id)?.name}
                                        />
                                    </div>
                                })
                            }
                            {
                                <div className="blur col-12 d-flex">
                                    <div className="login-signup">
                                        <p>Sign up or Log in to continue searching</p>
                                        <div>
                                            <Link href="/login" passHref><a className="login">Log in</a></Link>
                                            <Link href="/signup" passHref><Button className="sign-up">Sign Up</Button></Link>
                                        </div>
                                    </div>
                                    <div className="col-6 d-none d-md-block"><CardStartUp /></div>
                                    <div className="col-md-6 col-12"><CardStartUp /></div>
                                </div>
                            }
                        </div>
                        <p>Opportunities for Designers</p>
                        <div className="row">
                            {
                                jobList?.map((item, index) => {

                                    if (index <= 3) {
                                        return <div
                                            key={index}
                                            className="col-md-6"
                                        >
                                            <CardStartUp
                                                title={item.project?.title}
                                                ownerFullname={item.project?.user_id}
                                                position={positionList.find(x => x.id === item.position_id)?.name}
                                            />
                                        </div>
                                    };
                                })
                            }
                            {
                                <div className="blur col-12 d-flex">
                                    <div className="login-signup">
                                        <p>Sign up or Log in to continue searching</p>
                                        <div>
                                            <Link href={'/login'} passHref><a className="login">Log in</a></Link>
                                            <Link href={'/signup'} passHref><Button className="sign-up">Sign Up</Button></Link>
                                        </div>
                                    </div>
                                    <div className="col-6 d-none d-md-block"><CardStartUp /></div>
                                    <div className="col-md-6 col-12"><CardStartUp /></div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-md-4 p-0">
                        <StartUpWeek />
                        <StartUpBlog />
                    </div>
                </div>
            </>
        </div>
    )
}

export default wrapper.withRedux(StartUpByCategory);