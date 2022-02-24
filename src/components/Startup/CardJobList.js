import React from 'react';
import {
    Avatar,
} from 'rsuite';

const CardJobList = (props) => {
    const {
        title,
        jobList,
        classNames,
    } = props;

    return (
        <div className={`job-list-card ${classNames ? classNames : ''}`}>
            <div className="wrapper">
                {
                    title ?
                        <div className="_title">
                            <h4>{title}</h4>
                        </div>
                        :
                        null
                }
                {
                    jobList?.map((item, index) => {
                        return ''
                    })
                }
            </div>
        </div>
    )
}

export default CardJobList