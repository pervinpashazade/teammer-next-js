import React, {useState} from 'react';
import {Avatar, IconButton} from 'rsuite';
import {MdOutlineArrowBackIosNew} from 'react-icons/md';
import {MdOutlineArrowForwardIos} from 'react-icons/md';
import {BsPlusLg} from 'react-icons/bs';
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Autoplay, Pagination, Navigation} from "swiper";
import "swiper/css";
import Image from 'next/image';
import {useWindowSize} from "../hooks/useWindowSize";

SwiperCore.use([Autoplay, Pagination, Navigation]);

function SliderItem(props) {
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
                icon={<BsPlusLg/>}
            />
        </div>
    )
}


function CustomSlider() {
    const {width} = useWindowSize();
    const [swiper, setSwiper] = useState(null);
    console.log(width)
    return (
        <div className="home-slider">
            <div className="title d-md-block d-none">
                {/* <img src="/icons/emoji2.svg" alt="emoji" /> */}
                <Image
                    src={'/icons/emoji2.svg'}
                    alt='icon'
                    width={24}
                    height={30}
                />
                <h4>
                    Add these people to your team
                </h4>
            </div>
            <div className="slider-wrapper">
                <IconButton
                    circle
                    size="lg"
                    className="btn-left"
                    onClick={() => {
                        swiper.slidePrev();
                    }}
                    icon={<MdOutlineArrowBackIosNew/>}
                />
                <IconButton
                    circle
                    size="lg"
                    className="btn-right"
                    onClick={() => {
                        swiper.slideNext();
                    }}
                    icon={<MdOutlineArrowForwardIos/>}
                />
                <Swiper
                    slidesPerView={width < 528 ? 1 : (width > 528 && width < 768) ? 2 : 4}
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
                        <SliderItem/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderItem/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderItem/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderItem/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderItem/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderItem/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderItem/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderItem/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderItem/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderItem/>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

export default CustomSlider
