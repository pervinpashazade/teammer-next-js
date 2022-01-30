import Image from "next/image";
import { Avatar } from "rsuite"

const CardStartUp = (props) => {

    const {
        title,
        position,
        ownerFullname,
        avatarUrl,
    } = props;

    return (
        <div>
            <div className="card-opportunity">
                <div className="logo"><h2>LOGO</h2></div>
                <div className="position">
                    <div className="person">
                        <div>
                            <Avatar circle src="https://avatars2.githubusercontent.com/u/12592949?s=460&v=4" />
                            <p className="name">{ownerFullname}</p>
                        </div>
                        <a>
                            {/* <img src="/icons/save.svg" /> */}
                            <Image
                                src={'/icons/save.svg'}
                                alt='img'
                                width={12}
                                height={24}
                                layout='fixed'
                            />
                        </a>
                    </div>
                    <div className="job-info">
                        <p>Job Position</p>
                        <p>{position}</p>
                    </div>
                    <div className="job-info">
                        <p>Name of the startup</p>
                        <p>{title}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CardStartUp;
