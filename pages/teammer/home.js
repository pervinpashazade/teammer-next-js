import React, { useEffect } from "react";
import { wrapper } from "../../src/store/redux-store";
import { useSelector } from "react-redux";
import Router from 'next/router';
import SearchHome from "../../src/components/SearchHome";
import CardStartUp from "../../src/components/Cards/CardStartUp";
// import Link from "next/link";
import { Button, Input, InputGroup } from "rsuite";
import StartUpWeek from "../../src/components/StartUpWeek";
import StartUpBlog from "../../src/components/StartUpBlog";
import HomeSlider from "../../src/components/HomeSlider";
import Subscribe from "../../src/components/Subscribe";
import { FaArrowRight } from "react-icons/fa";
import config from "../../src/configuration";
import { Cookie, withCookie } from 'next-cookie';
import getAuth from "../../lib/session";
import StartUpByCategory from "../../src/components/StartUpByCategory";

const Home = (props) => {

    const store = useSelector(store => store);

    const CustomInputGroupWidthButton = ({ placeholder, ...props }) => (
        <InputGroup {...props} inside>
            <Input placeholder={placeholder} className="input-wrap" />
            <InputGroup.Button>
                <FaArrowRight />
            </InputGroup.Button>
        </InputGroup>
    );

    useEffect(() => {
        console.log('teammer props', props);
    }, [props]);

    return <div className="teammer-home">
        <div className="teammer-home-baner">
            <h2>🖖 Hello , {store.user?.full_name}</h2>
            <h3>Time to reach new heights</h3>
        </div>
        <h4> &#128526; What are you looking for?</h4>
        <SearchHome />

        <StartUpByCategory
            jobList={props.jobList}
            positionList={props.positionList}
        />
        <StartUpByCategory
            jobList={props.jobList}
            positionList={props.positionList}
        />

        {/* <div className="startup-category">
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
                                        ownerFullname={item.project?.owner?.full_name}
                                        position={item.position?.name}
                                    />
                                </div>
                            })
                        }
                    </div>
                    <p className="mt-4">Opportunities for Designers</p>
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
                    </div>
                </div>
                <div className="col-md-4 p-0">
                    <StartUpWeek />
                    <StartUpBlog />
                </div>
            </div>
        </div> */}

        {/*slider*/}
        {/* <div className="row">
            <div className="col-md-8">
                <HomeSlider />
            </div>
        </div> */}

        {/*    subscribe  */}
        <div className="subscribe">
            <div className="left-card d-flex flex-column align-items-center">
                <h3>Subscribe to our newsletter!</h3>
                <span>Get updates every 2 days</span>
                <CustomInputGroupWidthButton
                    size="lg"
                    placeholder="Your email here"
                    className="search-input"
                />
            </div>
        </div>

    </div>
}

Home.layout = true

export default Home;

export const getServerSideProps = async (context) => {

    const auth = getAuth(context);
    if (auth !== "2") {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    const fetchPositions = await fetch(config.BASE_URL + "positions");
    const positionsData = await fetchPositions.json();

    const fetchJobList = await fetch(config.BASE_URL + "jobs?include=project,project.owner,position&per_page=6");
    const jobListData = await fetchJobList.json();

    return {
        props: {
            protected: false,
            positionList: positionsData.data.items,
            jobList: jobListData?.data?.items ? jobListData.data.items : [],
        }
    }
}