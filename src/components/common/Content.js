import React, { useEffect } from "react";
import config from "../../configuration";
import BannerHome from "../BannerHome";
import HomeSlider from "../HomeSlider";
import SearchHome from "../SearchHome";
import StartUpByCategory from "../StartUpByCategory";
import Subscribe from "../Subscribe";

const Content = (props) => {

    useEffect(() => {
        console.log('props', props);
    }, [props])

    return <div>
        <BannerHome />
        <SearchHome />
        <StartUpByCategory />
        <div className="row">
            <div className="col-md-8">
                <HomeSlider />
            </div>
        </div>
        <Subscribe />
    </div>
};

export default Content;

