import CardWeek from "./Cards/CardWeek";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";
import React from "react";
import CardBlog from "./Cards/CardBlog";
import Image from "next/image";

const StartUpBlog = () => {

    return (<div className="startup-blog">
        <div className="check-all">
            <span>Latest blogs</span>
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
            <CardBlog />
        </div>
    </div>
    )
}
export default StartUpBlog;

