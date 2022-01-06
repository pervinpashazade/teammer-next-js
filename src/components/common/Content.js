import React from "react";
import BannerHome from "../BannerHome";
import HomeSlider from "../HomeSlider";
import SearchHome from "../SearchHome";
import StartUpByCategory from "../StartUpByCategory";
import Subscribe from "../Subscribe";

const Content = () => {
    return <div>
        <BannerHome/>
        <SearchHome/>
        <StartUpByCategory/>
        <div className="row">
            <div className="col-md-8">
                <HomeSlider/>
            </div>
        </div>
        <Subscribe/>
    </div>
};

export default Content;
