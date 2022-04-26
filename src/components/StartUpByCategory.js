import React from "react";
import CardStartUp from "./Cards/CardStartUp";
import { Button } from 'rsuite';
import Link from 'next/link';

const StartUpByCategory = (props) => {

    const {
        user,
        jobList,
    } = props;

    return (
        <div className="startup-category">
            <>
                <div className="row">
                    <div className="col-md-12 mb-4 startup-sections">
                        <p>Opportunities for Developers</p>
                        <div className="row">
                            {
                                jobList?.map((item, index) => {
                                    return <div
                                        key={index}
                                        className="col-md-6 col-12"
                                    >
                                        <CardStartUp
                                            jobId={item.id}
                                            startupId={item.project_id}
                                            isSaved={item.kept ? true : false}
                                            title={item.project?.title}
                                            ownerFullname={item.project?.owner?.full_name}
                                            ownerAvatarUrl={item.project?.owner?.detail?.photo}
                                            position={item.position?.name}
                                        />
                                    </div>
                                })
                            }
                            {
                                user && !user.type &&
                                <div className="blur col-12 d-flex">
                                    <div className="login-signup">
                                        <p>Complete registration to continue searching</p>
                                        <div>
                                            <Link href="/signup/steps" passHref>
                                                <Button className="sign-up">
                                                    Complete registration
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-6 d-none d-md-block"><CardStartUp /></div>
                                    <div className="col-md-6 col-12"><CardStartUp /></div>
                                </div>
                            }
                            {
                                !user &&
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
                    </div>
                </div>
            </>
        </div>
    )
}

export default StartUpByCategory;