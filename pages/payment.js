import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, ButtonToolbar, Checkbox, Divider, Form, IconButton, Input, Radio, RadioGroup, Toggle } from "rsuite";
import config from "../src/configuration";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/router'
import Image from "next/image";
import { HiArrowLeft } from "react-icons/hi";
import Header from "../src/components/consts/NotAuth/Header";

const Payment = () => {

    const router = useRouter();

    const [isActiveAnnualy, setIsActiveAnnualy] = useState(false);

    // // mount
    useEffect(() => {
        axios.get(config.BASE_URL + 'subscriptions').then(res => {
            console.log('res', res);
        })
    }, [])

    return (
        <div className="container">
            <div className="not-auth-layout payment">
                <Header />
                <div className="row">
                    <div className="col-md-6">
                        <div className="left">
                            <div className="bg-wrapper">
                                <div className="bg-icon-wrapper">
                                    <div className="ellipse"></div>
                                    <img
                                        alt="teammers"
                                        src="/img/lent.png"
                                        className="bg-icon_middle"
                                    />
                                    <img
                                        alt="teammers"
                                        src="/img/bg_girl.png"
                                        className="bg-icon_right"
                                    />
                                </div>
                                <div className="title">
                                    <h2>Get more from Teammers</h2>
                                    <p>Start using the full functionality right now</p>
                                </div>
                                <div className="bg-icon-wrapper">
                                    <img
                                        alt="teammers"
                                        src="/img/half-ellipse_up.png"
                                        className="bg-icon_left"
                                    />
                                    <img
                                        alt="teammers"
                                        src="/img/notebook_small.png"
                                        className="bg-icon_right"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="right">
                            <div className="inner">
                                <div className="wrapper">
                                    <div className="_top">
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
                                        </div>
                                        <h1>Subscribe</h1>
                                        <div className="app-plan mt-4">
                                            <div className="app-plan_top">
                                                <div className="_top-left">
                                                    <Image
                                                        src={'/img/Monthly.png'}
                                                        alt='img'
                                                        layout={'fixed'}
                                                        className={`${!isActiveAnnualy ? 'visible' : 'invisible'}`}
                                                        width={48}
                                                        height={48}
                                                    />
                                                    <div className="gradient-wrapper">
                                                        <div className="_text-container">
                                                            <h4 className={`plan-title ${!isActiveAnnualy ? '_text-monthly active' : ''}`}>Monthly</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Toggle
                                                    className={`custom-switch ${isActiveAnnualy ? 'active' : ''}`}
                                                    size="lg"
                                                    onChange={(e) => setIsActiveAnnualy(e)}
                                                />
                                                <div className="_top-right">
                                                    <div className="gradient-wrapper">
                                                        <div className="_text-container">
                                                            <h4 className={`plan-title ${isActiveAnnualy ? '_text-annualy active' : ''}`}>Annualy</h4>
                                                        </div>
                                                    </div>
                                                    <Image
                                                        src={'/img/Annualy.png'}
                                                        alt='img'
                                                        layout={'fixed'}
                                                        className={`${isActiveAnnualy ? 'visible' : 'invisible'}`}
                                                        width={48}
                                                        height={48}
                                                    />
                                                </div>
                                            </div>
                                            <div className="app-plan_body">
                                                <div className='price'>
                                                    {
                                                        isActiveAnnualy ?
                                                            <Image
                                                                src={'/img/price2.png'}
                                                                alt='img'
                                                                layout={'fixed'}
                                                                width={89}
                                                                height={43}
                                                            />
                                                            :
                                                            <Image
                                                                src={'/img/price1.png'}
                                                                alt='img'
                                                                layout={'fixed'}
                                                                width={52}
                                                                height={43}
                                                            />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <h1 style={{ fontSize: '32px' }}>Payments Details</h1>

                                    </div>
                                    <Form onSubmit={(condition, event) => {
                                        signup_form(event)
                                    }}>
                                        <Form.Group
                                            controlId="full_name"
                                            // className={!formValidation.fullname.length ? '' : 'not-valid'}
                                            className={'not-valid'}
                                        >
                                            <Form.ControlLabel>Full Name</Form.ControlLabel>
                                            <Form.Control
                                                name="full_name"
                                                type="text"
                                                placeholder="Full Name"
                                                onBlur={e => handleChangeFullname(e.target.value)}
                                            />
                                            {/* {
                                                formValidation.fullname.length > 0 &&
                                                <div className="validation-errors">
                                                    {
                                                        formValidation.fullname.map((item, index) => {
                                                            return <span key={index}>{item}</span>
                                                        })
                                                    }
                                                </div>
                                            } */}
                                        </Form.Group>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        // <div className="container login">
        //     <div className="d-flex justify-content-between _header">
        //         <Link href="/">
        //             <a className="navbar-brand">
        //                 <Image
        //                     src={'/LogoHeader.svg'}
        //                     alt='logo'
        //                     width={136}
        //                     height={18}
        //                 />
        //             </a>
        //         </Link>
        //         <Link href="/">
        //             <a>
        //                 <Image
        //                     src={'/icons/help.svg'}
        //                     alt='icon'
        //                     width={24}
        //                     height={24}
        //                 />
        //                 <span>Help</span>
        //             </a>
        //         </Link>
        //     </div>
        //     <div className="authenticate">
        //         <div className="image d-md-flex d-none" style={{
        //             backgroundImage: "url('/img/pay-pal.svg')"
        //         }}>
        //             <h2 className="font-weight-bold text-center">
        //                 <span style={{ fontSize: '40px !important' }}>Get more from Teammers</span>
        //             </h2>
        //             <p className="text-center">Start using the full functionality <br /> right now</p>
        //         </div>
        //         <div className="form">
        //             <h2>Subscribe</h2>
        //             <div className="app-plan mt-4">
        //                 <div className="app-plan_top">
        //                     <div className="_top-left">
        //                         <Image
        //                             src={'/img/Monthly.png'}
        //                             alt='img'
        //                             layout={'fixed'}
        //                             className={`${!isActiveAnnualy ? 'visible' : 'invisible'}`}
        //                             width={48}
        //                             height={48}
        //                         />
        //                         <div className="gradient-wrapper">
        //                             <div className="_text-container">
        //                                 <h4 className={`plan-title ${!isActiveAnnualy ? '_text-monthly active' : ''}`}>Monthly</h4>
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <Toggle
        //                         className={`custom-switch ${isActiveAnnualy ? 'active' : ''}`}
        //                         size="lg"
        //                         onChange={(e) => setIsActiveAnnualy(e)}
        //                     />
        //                     <div className="_top-right">
        //                         <div className="gradient-wrapper">
        //                             <div className="_text-container">
        //                                 <h4 className={`plan-title ${isActiveAnnualy ? '_text-annualy active' : ''}`}>Annualy</h4>
        //                             </div>
        //                         </div>
        //                         <Image
        //                             src={'/img/Annualy.png'}
        //                             alt='img'
        //                             layout={'fixed'}
        //                             className={`${isActiveAnnualy ? 'visible' : 'invisible'}`}
        //                             width={48}
        //                             height={48}
        //                         />
        //                     </div>
        //                 </div>
        //                 <div className="app-plan_body">
        //                     <div className='price'>
        //                         {
        //                             isActiveAnnualy ?
        //                                 <Image
        //                                     src={'/img/price2.png'}
        //                                     alt='img'
        //                                     layout={'fixed'}
        //                                     width={89}
        //                                     height={43}
        //                                 />
        //                                 :
        //                                 <Image
        //                                     src={'/img/price1.png'}
        //                                     alt='img'
        //                                     layout={'fixed'}
        //                                     width={52}
        //                                     height={43}
        //                                 />
        //                         }
        //                     </div>
        //                 </div>
        //             </div>

        //             <h3 style={{ fontSize: '32px', fontWeight: '600' }} className="my-4">Payments Details</h3>
        //             <RadioGroup name="list" value={check} inline>
        //                 <Radio value="card" onChange={setCheck}>New Card</Radio>
        //                 <Radio value="pay-pal" onChange={setCheck}><Image
        //                     src={'/img/PayPal.svg'}
        //                     alt='icon'
        //                     width={88}
        //                     height={24}
        //                 /></Radio>
        //             </RadioGroup>
        //             <div className="card-details d-flex justify-content-between">
        //                 <div>
        //                     <p>Card Number</p>
        //                     <Input className="p-3" type="number" placeholder="1234 1234 1234 1234" />
        //                 </div>
        //                 <div>
        //                     <p>Postal Code</p>
        //                     <Input className="p-3" type="number" placeholder="1234" />
        //                 </div>
        //             </div>
        //             <div className="card-details d-flex justify-content-between">
        //                 <div>
        //                     <p>Expiration Date</p>
        //                     <Input className="p-3" type="number" placeholder="MM/YYYY" />
        //                 </div>
        //                 <div>
        //                     <p>CVV</p>
        //                     <Input className="p-3" type="number" placeholder="123" />
        //                 </div>
        //             </div>
        //             <Divider />

        //             <div className="total">
        //                 <p className="d-flex justify-content-between"><span>Subtotal</span> <span>$6.00</span></p>
        //                 <p className="d-flex justify-content-between"><span>Billed Now</span> <span>$6.00</span></p>
        //             </div>
        //             <Button>
        //                 Subscribe & Checkout
        //             </Button>
        //             <p className="info-payment">All sales are charged in USD and all sales are final. You will be charged
        //                 $6.00 USD immediately. You will be charged $6.00 USD every monthly thereafter while the subscription
        //                 is active. Cancel any time. Exchange rates are estimated based on our most recent conversion data
        //                 and may not reflect the full charge value.</p>
        //         </div>
        //     </div>
        // </div>
    )
}
export default Payment
