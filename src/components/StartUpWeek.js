import CardWeek from "./Cards/CardWeek";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";
import React from "react";
import Image from "next/image";

const StartUpWeek = () => {

    return (<div className="startup-week">
        <div className="check-all">
            <span>Startup of the Week</span>
            <Link href="/" className="showAll">
                <a>
                    {/* <img src="/icons/eye.svg" /> */}
                    <Image
                        src={'/icons/eye.svg'}
                        alt='icon'
                        width={20}
                        height={20}
                    />
                    Check all <button><RiArrowRightLine /></button>
                </a>
            </Link>
        </div>
        <div className="parent-cards">
            <CardWeek />
            <CardWeek />
            <CardWeek />
            <CardWeek />
        </div>
    </div>
    )
}
export default StartUpWeek;
