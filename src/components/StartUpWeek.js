import React from "react";
import CardWeek from "./Cards/CardWeek";
import Link from "next/link";

const StartUpWeek = (props) => {

    const {
        startupList,
    } = props;

    return (
        <div className="startup-week p-md-0 p-3">
            <div className="check-all">
                <span>Startup of the Week</span>
                {/* <Link href="/" className="showAll">
                    <a>
                        <Image
                            src={'/icons/eye.svg'}
                            alt='icon'
                            width={20}
                            height={20}
                        />
                        Check all <button><RiArrowRightLine /></button>
                    </a>
                </Link> */}
            </div>
            <div className="parent-cards">
                {
                    startupList?.map((item, index) => {
                        return <Link
                            key={index}
                            href={`/startup/${item.project_id}`}
                            passHref
                        >
                            <a>
                                <CardWeek
                                    logoUrl={item.project?.logo}
                                    title={item.project?.title}
                                    type={item.project?.type?.name}
                                />
                            </a>
                        </Link>
                    })
                }
            </div>
        </div>
    )
}
export default StartUpWeek;
