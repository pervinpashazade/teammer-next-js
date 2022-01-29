import React from "react";
import BannerHome from "../BannerHome";
import HomeSlider from "../HomeSlider";
import SearchHome from "../SearchHome";
import StartUpByCategory from "../StartUpByCategory";
import Subscribe from "../Subscribe";

const Content = (props) => {
    return <div>
        <BannerHome />
        <SearchHome />
        <div className="my-4">
            test
            {
                props.positions?.map((item, index) => {
                    return <p key={index}>{item.label}</p>
                })
            }
        </div>
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

export const getServerSideProps = async () => {
    const fetchPositions = await fetch(config.BASE_URL + "positions");
    const positionsData = await fetchPositions.json();

    return {
        props: {
            positions: positionsData.data.items.map(item => {
                return {
                    value: item.id,
                    label: item.name ? item.name : ''
                }
            })
        }
    }
}