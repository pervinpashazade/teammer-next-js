import Link from "next/link";
import React, {useState} from "react";
import {Button, ButtonToolbar, Checkbox, Divider, Form, IconButton, Input, Radio, RadioGroup, Toggle} from "rsuite";
import config from "../src/configuration";
import axios from "axios";
import {useDispatch} from "react-redux";
import {useRouter} from 'next/router'
import Image from "next/image";
import {HiArrowLeft} from "react-icons/hi";

const Payment = () => {

    const [check, setCheck] = useState('card');
    const [isActiveAnnualy, setIsActiveAnnualy] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter()
    const login_form = (event) => {
        let data = new FormData(event.target);
        let body = {};
        for (let [key, value] of data.entries()) {
            body[key] = value;
        }

    }
    return <div className="container login">
        <div className="d-flex justify-content-between login-header">
            <Link href="/">
                <a className="navbar-brand">
                    <Image
                        src={'/LogoHeader.svg'}
                        alt='logo'
                        width={136}
                        height={18}
                    />
                </a>
            </Link>
            <Link href="/">
                <a>
                    {/* <img src="icons/help.svg" /> */}
                    <Image
                        src={'/icons/help.svg'}
                        alt='icon'
                        width={24}
                        height={24}
                    />
                    <span>Help</span>
                </a>
            </Link>
        </div>
        <div className="authenticate">
            <div className="image d-md-flex d-none" style={{
                backgroundImage: "url('/img/pay-pal.svg')"
            }}>
                <h2 className="font-weight-bold text-center">
                    <span style={{fontSize : '40px !important'}}>Get more from Teammers</span>
                </h2>
                <p className="text-center">Start using the full functionality <br/> right now</p>
            </div>
            <div className="form">
                <h2>Subscribe</h2>
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

                <h3 style={{fontSize: '32px', fontWeight: '600'}} className="my-4">Payments Details</h3>
                <RadioGroup name="list" value={check} inline>
                    <Radio value="card" onChange={setCheck}>New Card</Radio>
                    <Radio value="pay-pal" onChange={setCheck}><Image
                        src={'/img/PayPal.svg'}
                        alt='icon'
                        width={88}
                        height={24}
                    /></Radio>
                </RadioGroup>
                <div className="card-details d-flex justify-content-between">
                    <div>
                        <p>Card Number</p>
                        <Input className="p-3" type="number" placeholder="1234 1234 1234 1234"/>
                    </div>
                    <div>
                        <p>Postal Code</p>
                        <Input className="p-3" type="number" placeholder="1234"/>
                    </div>
                </div>
                <div className="card-details d-flex justify-content-between">
                    <div>
                        <p>Expiration Date</p>
                        <Input className="p-3" type="number" placeholder="MM/YYYY"/>
                    </div>
                    <div>
                        <p>CVV</p>
                        <Input className="p-3" type="number" placeholder="123"/>
                    </div>
                </div>
                <Divider/>

                <div className="total">
                    <p className="d-flex justify-content-between"><span>Subtotal</span> <span>$6.00</span></p>
                    <p className="d-flex justify-content-between"><span>Billed Now</span> <span>$6.00</span></p>
                </div>
                <Button>
                    Subscribe & Checkout
                </Button>
                <p className="info-payment">All sales are charged in USD and all sales are final. You will be charged
                    $6.00 USD immediately. You will be charged $6.00 USD every monthly thereafter while the subscription
                    is active. Cancel any time. Exchange rates are estimated based on our most recent conversion data
                    and may not reflect the full charge value.</p>
            </div>
        </div>
    </div>
}
export default Payment
