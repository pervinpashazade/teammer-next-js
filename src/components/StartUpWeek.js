import CardWeek from "./Cards/CardWeek";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";
import React from "react";
import Image from "next/image";

const StartUpWeek = (props) => {

    const {
        startupList,
    } = props;

    return (
        <div className="startup-week p-md-0 p-3">
            <div className="check-all">
                <span>Startup of the Week</span>
                <Link href="/" className="showAll">
                    <a>
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
                {
                    startupList?.map((item, index) => {
                        return <CardWeek
                            key={index}
                            logoUrl={item.project?.logo}
                            title={item.project?.title}
                            type={item.project?.type?.name}
                        />
                    })
                }
            </div>
        </div>
    )
}
export default StartUpWeek;
