import React from 'react';
import { Button, Input, InputGroup } from 'rsuite';
import { FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';

function Subscribe() {

    const CustomInputGroupWidthButton = ({ placeholder, ...props }) => (
        <InputGroup {...props} inside>
            <Input placeholder={placeholder} className="input-wrap" />
            <InputGroup.Button>
                <FaArrowRight />
            </InputGroup.Button>
        </InputGroup>
    );

    return (
        <div className="subscribe">
            <div className="row">
                <div className="col-md-6">
                    <div className="left-card">
                        <h3>Subscribe to our newsletter!</h3>
                        <span>Get updates every 2 days</span>
                        <CustomInputGroupWidthButton
                            size="lg"
                            placeholder="Your email here"
                            className="search-input"
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="right-card">
                        <div className="content">
                            <h3>Ready to exprole more?</h3>
                            <Button color="blue" appearance="primary">
                                {/* <img src="/icons/emoji1.svg" className="mr-2" alt="emoji" /> */}
                                <Image
                                    src={'/icons/emoji1.svg'}
                                    alt='icon'
                                    width={16}
                                    height={17}
                                    layout='fixed'
                                />
                                Become teammer
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscribe
