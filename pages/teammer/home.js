import React, { useEffect, useState } from "react";
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
import config, { NEXT_URL } from "../../src/configuration";
import { Cookie, withCookie } from 'next-cookie';
import getAuth from "../../lib/session";
import StartUpByCategory from "../../src/components/StartUpByCategory";
import { useAuth } from "../../Auth";
import axios from "axios";

const CustomInputGroupWidthButton = ({ placeholder, ...props }) => (
    <InputGroup {...props} inside>
        <Input placeholder={placeholder} className="input-wrap" />
        <InputGroup.Button>
            <FaArrowRight />
        </InputGroup.Button>
    </InputGroup>
);

const Home = (props) => {

    const authContext = useAuth();

    const [user, setUser] = useState(authContext.currentUse);

    const [jobs, setJobs] = useState([]);

    const [positionList, setPositionList] = useState([]);
    const [jobList, setJobList] = useState([]);
    const [startupOfWeekList, setStartupOfWeekList] = useState([]);

    useEffect(() => {
        axios.get(config.BASE_URL + 'positions').then(res => {
            console.log(res)
            if (res && res.data.success) {
                setPositionList(res.data.data.items)
            };
        });

        // project.owner => include 500 error
        axios.get(config.BASE_URL + 'jobs?include=project,project.owner,position&per_page=6').then(res => {
        // axios.get(config.BASE_URL + 'jobs?include=project,position&per_page=6').then(res => {
            if (res.data.success) {
                setJobList(res.data.data.items);
            };
        });

        axios.get(config.BASE_URL + 'startup-of-week').then(res => {
            if (res.data.success) {
                setStartupOfWeekList(res.data.data);
            };
        });
    }, [])

    useEffect(() => {
        if (authContext.currentUser) {
            setUser(authContext.currentUser);
        };
    }, [authContext.currentUser]);

    return (
        <div className="teammer-home">
            <div className="teammer-home-baner">
                {
                    user &&
                    <h2>
                        🖖 Hello , {user.full_name}
                    </h2>
                }
                <h3>Time to reach new heights</h3>
            </div>
            <h4>&#128526; What are you looking for?</h4>
            <SearchHome getData={setJobs} />
            <div className="row">
                <div className="col-md-8 mb-4">
                    <StartUpByCategory
                        user={user}
                        jobList={jobList}
                        positionList={positionList}
                    />
                    <StartUpByCategory
                        user={user}
                        jobList={jobList}
                        positionList={positionList}
                    />
                </div>
                <div className="col-md-4 mb-4">
                    <StartUpWeek
                        startupList={startupOfWeekList}
                    />
                    <StartUpBlog />
                </div>
            </div>
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
    )
}

Home.layout = true

export default Home;

// export const getServerSideProps = async (context) => {

//     // const auth = getAuth(context);
//     // if (auth !== 2) {
//     //     return {
//     //         redirect: {
//     //             destination: "/login",
//     //             permanent: false,
//     //         },
//     //     };
//     // }

//     return {
//         props: {
//             protected: false,
//         }
//     }
// }