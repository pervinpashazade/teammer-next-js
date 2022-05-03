import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import { HiArrowLeft } from 'react-icons/hi';
import { IconButton } from 'rsuite';

function BreadCrumb({ link }) {

    const router = useRouter();

    return (
        <div className="breadcrumb-wrapper">
            <div className="goback-btn">
                <IconButton
                    size="lg"
                    icon={<HiArrowLeft />}
                    className="goback-btn"
                    onClick={() => router.back()}
                />
                <span>Go back</span>
            </div>
            <div className="custom-breadcrumb">
                {/* <span>Home</span> */}
                {/* <span className='breadcrumb-icon'>
                    <AiOutlineRight />
                </span> */}
                {/* <span className='active'>
                    Profile
                </span> */}
            </div>
        </div>
    )
}

export default BreadCrumb
