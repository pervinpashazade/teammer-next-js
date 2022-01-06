import {wrapper} from "../../store/redux-store";
import BannerHome from "../../components/BannerHome";
import React from "react";
import SearchHome from "../../components/SearchHome";
import StartUpByCategory from "../../components/StartUpByCategory";
import HomeSlider from "../../components/HomeSlider";
import Subscribe from "../../components/Subscribe";

const StartupContainer = () => {
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
}

export default wrapper.withRedux(StartupContainer)