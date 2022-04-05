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

    useEffect(() => {
        axios.get(config.BASE_URL + 'positions').then(res => {
            console.log(res)
            if (res && res.data.success) {
                setPositionList(res.data.data.items)
            };
        });
    }, []);

    useEffect(() => {
        console.log('NOT COMPLETED LOG');

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
                jobList={props.jobList ? props.jobList : []}
                startup_of_week_list={props.startup_of_week_list ? props.startup_of_week_list : []}
            />
        </div>
    )
}

Home.layout = true;

export default Home;

export const getServerSideProps = async () => {

    const fetchJobList = await fetch(config.BASE_URL + "jobs?include=project,project.owner,position&per_page=6");
    const jobListData = await fetchJobList.json();

    const fetchWeeklyStartups = await fetch(config.BASE_URL + "startup-of-week");
    const startup_of_week_list = await fetchWeeklyStartups.json();

    return {
        props: {
            protected: false,
            jobList: jobListData.success ? jobListData.data.items : [],
            startup_of_week_list: startup_of_week_list.data ? startup_of_week_list.data : [],
        }
    }
}