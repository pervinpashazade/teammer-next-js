import { wrapper } from "../../src/store/redux-store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Router from 'next/router'
import Head from "next/head";
import CardStartUp from "../../src/components/Cards/CardStartUp";
import Link from "next/link";
import { Button, Input, Modal, } from "rsuite";
import { RiFileCopyLine } from 'react-icons/ri'
import Image from "next/image";
import config from "../../src/configuration";
import { Cookie, withCookie } from 'next-cookie';

const Subscribe = (props) => {

    const store = useSelector(store => store);

    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('type') !== "2") {
            Router.replace('/login')
        }
    }, []);

    const handleClose = () => {
        setOpen(!open);
    }
    return (
        <div className="teammer">
            <Head>
                <title>Teammer Subscribe</title>
                <meta name="description" content="Subscribe teammer app" />
            </Head>
            <div className="teammer-type-banner">
                <div className="product-div">
                    <h3>
                        <h3 className="mr-2">&#128526;</h3>
                        Are you looking to join your dream startup team as a Designer?
                    </h3>
                </div>
            </div>
            <h4>We have prepared several options for you 👇</h4>
            <div className="startup-category">
                <div className="startup-sections">
                    <div className="row">
                        {
                            props.jobList?.map((item, index) => {
                                return <div
                                    key={index}
                                    className="col-md-4"
                                >
                                    <CardStartUp
                                        title={item.project.title}
                                        ownerFullname={item.project.user_id}
                                        position={props.positionList.find(x => x.id === item.position_id)?.name}
                                    />
                                </div>
                            })
                        }
                    </div>
                    <div className="blur col-12 d-flex">
                        <div className="login-signup">
                            <p>Pay only $6/mo</p>
                            <p style={{
                                fontSize: '18px !important',
                                fontWeight: 400,
                                margin: '0px'
                            }}>Get access to apply to startups</p>
                            <div>
                                <Link href="/teammer/home" passHref><a className="login">I’ll do it later</a></Link>
                                <Link href="/app/pricing" passHref><Button className="sign-up">Get access now 👉</Button></Link>
                            </div>
                        </div>
                        <div className="col-4"><CardStartUp /></div>
                        <div className="col-4"><CardStartUp /></div>
                        <div className="col-4"><CardStartUp /></div>
                    </div>
                </div>
            </div>
            <div className="refer">
                <div className="refer-friend">
                    <h5>Or refer your friend and earn 3 applies</h5>
                    <Button onClick={handleClose}>Refer friend</Button>
                </div>
            </div>
            <Modal size="md" open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Modal Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center">
                        {/* <img src="/img/e-poct.png" alt="" /> */}
                        <Image
                            src={'/img/e-poct.png'}
                            alt='img'
                            width={106}
                            height={106}
                        />
                    </div>
                    <h2 className="refer-link-h2">
                        Invite Friends & You Both Get 3 Free Apply to Any Startup
                    </h2>
                    <label className="copy-link" htmlFor="copy-link">Your link:</label>
                    <div className="d-flex"> <Input placeholder="Default Input" id="copy-link" />
                        <Button className="copy-button"><RiFileCopyLine /></Button></div>
                </Modal.Body>
            </Modal>
        </div>)
}

Subscribe.layout = true
export default wrapper.withRedux(Subscribe);

export const getServerSideProps = async (context) => {

    // const { params, req, res } = context;
    // const cookie = Cookie.fromApiRoute(req, res);
    // let accessToken = cookie.get('teammers-access-token');

    const fetchPositions = await fetch(config.BASE_URL + "positions");
    const positionsData = await fetchPositions.json();

    const fetchJobList = await fetch(config.BASE_URL + "jobs?include=project&per_page=3");
    const jobListData = await fetchJobList.json();

    return {
        props: {
            positionList: positionsData.data.items,
            jobList: jobListData?.data?.items
        }
    }
}