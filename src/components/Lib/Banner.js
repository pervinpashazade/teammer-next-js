import React from 'react'

function Banner(props) {

    const {
        styles,
        text,
    } = props;

    return (
        <div className='banner' style={styles}>
            <p>{text}</p>
        </div>
    )
}

export default Banner
