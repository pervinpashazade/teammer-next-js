import { wrapper } from "../../src/store/redux-store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Router from 'next/router';
import SearchHome from "../../src/components/SearchHome";
import CardStartUp from "../../src/components/Cards/CardStartUp";
// import Link from "next/link";
import { Button, Input, InputGroup } from "rsuite";
import StartUpWeek from "../../src/components/StartUpWeek";
import StartUpBlog from "../../src/components/StartUpBlog";
import HomeSlider from "../../src/components/HomeSlider";
import Subscribe from "../../src/components/Subscribe";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
    const store = useSelector(store => store);

    const CustomInputGroupWidthButton = ({ placeholder, ...props }) => (
        <InputGroup {...props} inside>
            <Input placeholder={placeholder} className="input-wrap" />
            <InputGroup.Button>
                <FaArrowRight />
            </InputGroup.Button>
        </InputGroup>
    );

    useEffect(() => {
        if (store.isAuth !== "TEAMMER_TYPE") {
            Router.replace("/login")
        }
    }, [store.isAuth]);
    return <div className="teammer-home">
        <div className="teammer-home-baner">
            <h2>🖖 Hello , {store.user}</h2>
            <h3>Time to reach new heights</h3>
        </div>
        <h4> &#128526; What are you looking for?</h4>
        <SearchHome />
        <div className="startup-category">
            <div className="row">
                <div className="col-md-8 startup-sections">
                    <p>Opportunities for Developers</p>
                    <div className="row">
                        <div className="col-md-6"><CardStartUp /></div>
                        <div className="col-md-6"><CardStartUp /></div>
                        <div className="col-md-6"><CardStartUp /></div>
                        <div className="col-md-6"><CardStartUp /></div>
                        <div className="col-md-6"><CardStartUp /></div>
                        <div className="col-md-6"><CardStartUp /></div>
                        <div className="col-md-6"><CardStartUp /></div>
                        <div className="col-md-6"><CardStartUp /></div>
                    </div>
                    <p className="mt-4">Opportunities for Designers</p>
                    <div className="row">
                        <div className="col-md-6"><CardStartUp /></div>
                        <div className="col-md-6"><CardStartUp /></div>
                        <div className="col-md-6"><CardStartUp /></div>
                        <div className="col-md-6"><CardStartUp /></div>
                        <div className="col-md-6"><CardStartUp /></div>
                        <div className="col-md-6"><CardStartUp /></div>
                        <div className="col-md-6"><CardStartUp /></div>
                        <div className="col-md-6"><CardStartUp /></div>
                    </div>
                </div>
                <div className="col-md-4 p-0">
                    <StartUpWeek />
                    <StartUpBlog />
                </div>
            </div>
        </div>

        {/*slider*/}
        <div className="row">
            <div className="col-md-8">
                <HomeSlider />
            </div>
        </div>

        {/*    subscribe  */}
        <div className="subscribe">
            <div className="left-card d-flex flex-column align-items-center">
                <h3>Subscribe to our newsletter!</h3>
                <span>Get updates every 2 days</span>
                <CustomInputGroupWidthButton
                    size="lg"
                    placeholder="Your email here"
                    className="search-input"
                />
            </div>
        </div>

    </div>
}

export default wrapper.withRedux(Home);