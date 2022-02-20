import React, { useEffect } from "react";
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

    useEffect(() => {
        console.log('props', props);
    }, [props])

    return <div>
        <BannerHome />
        <SearchHome />
        <div className="row">
            <div className="col-md-8 mb-4">
                <StartUpByCategory
                    jobList={props.jobList}
                    positionList={props.positionList}
                />
                <StartUpByCategory
                    jobList={props.jobList}
                    positionList={props.positionList}
                />
            </div>
            <div className="col-md-4 mb-4">
                <StartUpWeek
                    startupList={startup_of_week_list}
                />
                <StartUpBlog />
            </div>
        </div>
        {/* <div className="row">
            <div className="col-md-8">
                <HomeSlider />
            </div>
        </div> */}
        <Subscribe />
    </div>
};

export default Content;