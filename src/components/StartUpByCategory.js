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

    const store = useSelector(store => store);

    return (
        <div className="startup-category">
            <>
                <div className="row">
                    <div className="col-md-8 startup-sections">
                        <p>Opportunities for Developers</p>
                        <div className="row">
                            {
                                props.jobList?.map((item, index) => {
                                    return <div
                                        key={index}
                                        className="col-md-6"
                                    >
                                        <CardStartUp
                                            title={item.project?.title}
                                            ownerFullname={item.project?.user_id}
                                            position={props.positionList.find(x => x.id === item.position_id)?.name}
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
                                    <div className="col-6"><CardStartUp /></div>
                                    <div className="col-6"><CardStartUp /></div>
                                </div>
                            }
                        </div>
                        <p>Opportunities for Designers</p>
                        <div className="row">
                            {
                                props.jobList?.map((item, index) => {

                                    if (index <= 3) {
                                        return <div
                                            key={index}
                                            className="col-md-6"
                                        >
                                            <CardStartUp
                                                title={item.project.title}
                                                ownerFullname={item.project.user_id}
                                                position={props.positionList.find(x => x.id === item.position_id)?.name}
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
                                    <div className="col-6"><CardStartUp /></div>
                                    <div className="col-6"><CardStartUp /></div>
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

export const getServerSideProps = async () => {

    const fetchPositions = await fetch(config.BASE_URL + "positions");
    const positionsData = await fetchPositions.json();

    const fetchJobList = await fetch(config.BASE_URL + "jobs?include=project,position&per_page=6");
    const jobListData = await fetchJobList.json();

    console.log('test', jobListData);

    return {
        props: {
            positionList: positionsData.data.items,
            jobList: jobListData?.data?.items ? jobListData.data.items : [],
        }
    }
}