import React, { useState } from 'react'
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';
import { Avatar, IconButton } from 'rsuite'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import Banner from '../src/components/Lib/Banner'
import BreadCrumb from '../src/components/Lib/BreadCrumb'
import { BsPlusLg } from 'react-icons/bs';

SwiperCore.use([Autoplay, Pagination, Navigation]);

function SliderItem() {
    return (
        <div className="slider-item">
            <Avatar
                circle
                src="https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
            />
            <h5>Denis Delton</h5>
            <span>Designer</span>
            <IconButton
                size="md"
                className="action-btn btn-primary"
                icon={<BsPlusLg />}
            />
        </div>
    )
}

function CustomSlider() {
    const [swiper, setSwiper] = useState(null);

    return (
        <div className="home-slider">
            <div className="slider-wrapper">
                <IconButton
                    circle
                    size="lg"
                    className="btn-left"
                    onClick={() => {
                        swiper.slidePrev();
                    }}
                    icon={<MdOutlineArrowBackIosNew />}
                />
                <IconButton
                    circle
                    size="lg"
                    className="btn-right"
                    onClick={() => {
                        swiper.slideNext();
                    }}
                    icon={<MdOutlineArrowForwardIos />}
                />
                <Swiper
                    slidesPerView={2}
                    spaceBetween={20}
                    slidesPerGroup={1}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    // autoplay={{
                    //     delay: 1000,
                    //     disableOnInteraction: false
                    // }}
                    // navigation={true}    
                    // navigation={{
                    //     nextEl: '.swiper-button-next',
                    //     prevEl: '.swiper-button-prev',
                    // }}
                    className="home-swiper"
                    onInit={(swiper) => {
                        setSwiper(swiper)
                    }}
                >
                    <SwiperSlide>
                        <SliderItem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderItem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderItem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderItem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderItem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderItem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderItem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderItem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderItem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderItem />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

function App() {
    return (
        <div className='about-us'>
            <BreadCrumb />
            <Banner
                text="We want to tell a little bit about Teammers"
            />
            <div className="content">
                <h4 className="title">
                    What is Teammers? ✌️
                </h4>
                <p>
                    So, what is Teammers? Teammers is a marketplace platform that connects startup owners
                    with their future teammates. Teammers makes finding teammates easier by targeting based
                    on what the project owner is looking for. As well as, our platform makes the process
                    easier for people who want to join startups by showing them the exact startups that
                    are looking for them.
                </p>
                <h4 className="title">
                    Our purpose 🎯
                </h4>
                <p>
                    Our purpose is to help people find their teammates as fast as possible.
                    Since team-building is one of the biggest problems for startups, we came up with a
                    solution - targeting users into projects they are looking to be part of and targeting
                    startup owners with people they want to be teammates with.
                </p>
                <h4 className="title">
                    Our case 💼
                </h4>
                <div className="case-wrapper">
                    <div className="case-item">
                        <span>Our marketplace platform for</span>
                        <h5>2 months</h5>
                    </div>
                    <div className="case-item">
                        <span>we helped to find their teammates more than</span>
                        <h5>50 projects</h5>
                    </div>
                    <div className="case-item">
                        <span>and applied to projects over</span>
                        <h5>700 people</h5>
                    </div>
                </div>
                <div className="custom-devider"></div>
                <div className="team-members">
                    <h4 className="title">
                        Team 🙌
                    </h4>
                    <div className="team-wrapper">
                        <div className="team-item">
                            <Avatar
                                size="lg"
                                circle
                                src="/img/avatar1.png"
                                alt="username surname"
                            />
                            <div className="details">
                                <h5 className="_name">Denis Delton</h5>
                                <h5 className='_position'>Junior UX/UI Designer</h5>
                                <h5 className="_username">@ddelton</h5>
                            </div>
                        </div>
                        <div className="team-item">
                            <Avatar
                                size="lg"
                                circle
                                src="/img/avatar1.png"
                                alt="username surname"
                            />
                            <div className="details">
                                <h5 className="_name">Denis Delton</h5>
                                <h5 className='_position'>Junior UX/UI Designer</h5>
                                <h5 className="_username">@ddelton</h5>
                            </div>
                        </div>
                        <div className="team-item">
                            <Avatar
                                size="lg"
                                circle
                                src="/img/avatar1.png"
                                alt="username surname"
                            />
                            <div className="details">
                                <h5 className="_name">Denis Delton</h5>
                                <h5 className='_position'>Junior UX/UI Designer</h5>
                                <h5 className="_username">@ddelton</h5>
                            </div>
                        </div>
                        <div className="team-item">
                            <Avatar
                                size="lg"
                                circle
                                src="/img/avatar1.png"
                                alt="username surname"
                            />
                            <div className="details">
                                <h5 className="_name">Denis Delton</h5>
                                <h5 className='_position'>Junior UX/UI Designer</h5>
                                <h5 className="_username">@ddelton</h5>
                            </div>
                        </div>
                        <div className="team-item">
                            <Avatar
                                size="lg"
                                circle
                                src="/img/avatar1.png"
                                alt="username surname"
                            />
                            <div className="details">
                                <h5 className="_name">Denis Delton</h5>
                                <h5 className='_position'>Junior UX/UI Designer</h5>
                                <h5 className="_username">@ddelton</h5>
                            </div>
                        </div>
                        <div className="team-item">
                            <Avatar
                                size="lg"
                                circle
                                src="/img/avatar1.png"
                                alt="username surname"
                            />
                            <div className="details">
                                <h5 className="_name">Denis Delton</h5>
                                <h5 className='_position'>Junior UX/UI Designer</h5>
                                <h5 className="_username">@ddelton</h5>
                            </div>
                        </div>
                        <div className="team-item">
                            <Avatar
                                size="lg"
                                circle
                                src="/img/avatar1.png"
                                alt="username surname"
                            />
                            <div className="details">
                                <h5 className="_name">Denis Delton</h5>
                                <h5 className='_position'>Junior UX/UI Designer</h5>
                                <h5 className="_username">@ddelton</h5>
                            </div>
                        </div>
                        <div className="team-item">
                            <Avatar
                                size="lg"
                                circle
                                src="/img/avatar1.png"
                                alt="username surname"
                            />
                            <div className="details">
                                <h5 className="_name">Denis Delton</h5>
                                <h5 className='_position'>Junior UX/UI Designer</h5>
                                <h5 className="_username">@ddelton</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="custom-devider"></div>
                <div className="testimonial">
                    <h4 className="title">
                        What users said about us 💌
                    </h4>
                </div>
                <CustomSlider />
            </div>
        </div>
    )
}

App.layout = true;

export default App
