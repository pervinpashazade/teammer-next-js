import {Avatar} from "rsuite";

const CardWeek = (props) => {

    const {
        logoUrl,
        title,
        type,
    } = props;

    return (
        <div className="startup-card">
            <div className="status-logo">
                <div className="logo">
                    <Avatar
                        circle
                        src={
                            logoUrl ? logoUrl
                                :
                                "https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
                        }
                    />
                </div>
                {type && <button className="status">
                    {type}
                </button>}
            </div>
            <div className="job-name">
                <h5>
                    {title}
                </h5>
                {/* <p>Dallas Texas</p> */}
            </div>
        </div>
    )
}
export default CardWeek;
