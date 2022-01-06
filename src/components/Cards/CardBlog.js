import { Avatar } from "rsuite";
import blog from "../../../public/img/blog.png"
import Image from "next/image";
import { AiOutlineClockCircle } from "react-icons/ai";

const CardWeek = () => {
    return (
        <div className="startup-card">
            <div className="image-blog">
                {/* <img src="/img/blog.png" /> */}
                <Image
                    src={'/img/blog.png'}
                    alt='img'
                    width={348}
                    height={117}
                    layout='fixed'
                />
            </div>
            <div className="card-activity">
                <div>
                    <button>Design</button>
                    <p className="date">
                        <AiOutlineClockCircle /> <span>4 min reading</span>
                    </p>
                </div>
                <p className="d-flex align-items-center">
                    {/* <img src="/icons/onactive.svg" /> */}
                    <Image
                        src={'/icons/onactive.svg'}
                        alt='img'
                        width={16}
                        height={16}
                        layout='fixed'
                    /> <span>12</span>
                </p>
            </div>
            <div className="title-blog">
                <h5>Blog title</h5>
                <p>Arvid Kahl is a coder and the co-founder of Feedback Panda, an online teacher productivity SaaS
                    company he built with his life partner before selling it for a life...</p>
            </div>
            <div className="avatar">
                <Avatar circle src="https://avatars2.githubusercontent.com/u/12592949?s=460&v=4" />
                <div>
                    <h6>Denis Dalton</h6>
                    <p>2 days ago</p>
                </div>
            </div>
        </div>
    )
}
export default CardWeek;
