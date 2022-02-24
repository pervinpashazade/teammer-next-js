import React from 'react';
import {
    Avatar,
} from 'rsuite';

const CardStartupProfile = (props) => {
    const {
        title,
        logo,
        classNames,
    } = props;

    return (
        <div className={`profile-card-startup ${classNames ? classNames : ''}`}>
            <div className="wrapper">
                <div className="_title">
                    <h2>{title}</h2>
                    <p>Marketplace</p>
                </div>
                <Avatar
                    size="lg"
                    circle
                    src={logo ? logo : "https://www.w3schools.com/howto/img_avatar.png"}
                    alt="startup profile img"
                    className='profile-img'
                />
                <div className="owner-details">
                    <Avatar
                        size="sm"
                        circle
                        src={logo ? logo : "https://www.w3schools.com/howto/img_avatar.png"}
                        alt="startup owner profile img"
                        className='_owner-avatar'
                    />
                    <div className='_details'>
                        <h4>Denis Delton</h4>
                        <p>Owner</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardStartupProfile