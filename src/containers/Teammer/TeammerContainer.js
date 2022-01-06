import {wrapper} from "../../store/redux-store";
import BannerHome from "../../components/BannerHome";
import React from "react";
import SearchHome from "../../components/SearchHome";
import StartUpByCategory from "../../components/StartUpByCategory";
import HomeSlider from "../../components/HomeSlider";
import Subscribe from "../../components/Subscribe";

const TeammerContainer = () => {
    return <div>
        <div className="teammer-type-banner">
            <div className="product-div"><h3>
                <h3 className="mr-2">&#128526;</h3>Are you looking to join your dream startup team as a Designer?
            </h3></div>
        </div>
    </div>
}

export default  wrapper.withRedux(TeammerContainer)