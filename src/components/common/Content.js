import React, { useEffect, useState } from "react";
import { useAuth } from "../../../Auth";
import BannerHome from "../BannerHome";
// import HomeSlider from "../HomeSlider";
import SearchHome from "../SearchHome";
import StartUpBlog from "../StartUpBlog";
import StartUpByCategory from "../StartUpByCategory";
import StartUpWeek from "../StartUpWeek";
import Subscribe from "../Subscribe";

const Content = (props) => {

    const authContext = useAuth();

    const {
        jobList,
        positionList,
        startup_of_week_list,
    } = props;

    const [user, setUser] = useState(null);

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        setUser(authContext.currentUser);
    }, [authContext.currentUser]);

    return (
        <div>
            <BannerHome />
            <SearchHome getData={setJobs} />
            <div className="row">
                <div className="col-md-8 mb-4">
                    <StartUpByCategory
                        user={user}
                        positionList={positionList}
                        jobList={jobs.length === 0 ? jobList : jobs}
                    />
                    <StartUpByCategory
                        user={user}
                        positionList={positionList}
                        jobList={jobs.length === 0 ? jobList : jobs}
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
    )
};

export default Content;