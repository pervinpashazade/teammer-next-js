import React, { useEffect, useState } from "react";
import Content from './../src/components/common/Content';
import config from '../src/configuration';
import Head from 'next/head';
import '../src/axios-interceptor'
import axios from "axios";
import { useAuth } from "../Auth";

const Home = (props) => {

    const authContext = useAuth();

    const [user, setUser] = useState(authContext.currentUser);

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
            if (res.data.success) {
                setJobList(res.data.data.items);
            };
        });

        axios.get(config.BASE_URL + 'startup-of-week').then(res => {
            if (res.data.success) {
                setStartupOfWeekList(res.data.data);
            };
        });

    }, []);

    useEffect(() => {
        // console.log('NOT COMPLETED LOG');

        if (authContext.currentUser) {
            setUser(authContext.currentUser);
        };
    }, [authContext.currentUser]);
    console.log(props.jobList)
    return (
        <div>
            <Head>
                <title>Teammer</title>
                <meta name="description" content="Teammer application" />
            </Head>
            <Content
                positionList={positionList}
                jobList={jobList}
                startup_of_week_list={startupOfWeekList}
            />
        </div>
    )
}

Home.layout = true;

export default Home;

// export const getServerSideProps = async () => {

//     return {
//         props: {
//             protected: false,
//         }
//     }
// }