import React, {useEffect, useState} from "react";
import BannerHome from "../BannerHome";
import HomeSlider from "../HomeSlider";
import SearchHome from "../SearchHome";
import StartUpBlog from "../StartUpBlog";
import StartUpByCategory from "../StartUpByCategory";
import StartUpWeek from "../StartUpWeek";
import Subscribe from "../Subscribe";

const Content = (props) => {
    const {
        jobList,
        positionList,
        startup_of_week_list,
    } = props;
    const [jobs , setJobs] = useState([]);
    // console.log(jobs)
    return <div>
        <BannerHome/>
        <SearchHome getData={setJobs}/>
        <div className="row">
            <div className="col-md-8 mb-4">
                <StartUpByCategory
                    jobList={jobs.length === 0 ? props.jobList : jobs}
                    positionList={props.positionList}
                />
                <StartUpByCategory
                    jobList={jobs.length === 0 ? props.jobList : jobs}
                    positionList={props.positionList}
                />
            </div>
            <div className="col-md-4 mb-4">
                <StartUpWeek
                    startupList={startup_of_week_list}
                />
                <StartUpBlog/>
            </div>
        </div>
        {/* <div className="row">
            <div className="col-md-8">
                <HomeSlider />
            </div>
        </div> */}
        <Subscribe/>
    </div>
};

export default Content;