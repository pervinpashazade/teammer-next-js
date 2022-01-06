import {Avatar} from "rsuite";

const CardWeek = ()=>{
    return(
        <div className="startup-card">
                <div className="status-logo">
                    <div className="logo">
                        <Avatar circle />
                        <span>LOGO</span>
                    </div>
                    <button className="status">Remote</button>
                </div>
                <div className="job-name">
                    <h5>Product Designer</h5>
                    <p>Dallas Texas</p>
                </div>
        </div>
    )
}
export default CardWeek;
