import React from 'react'
import {Panel} from 'rsuite'
import CardStartUp from "./Cards/CardStartUp";

function ProPanel(props) {
    console.log('props', props)
    const {
        title,
        dataList,
        noDataMessage,
    } = props;

    return (
        <Panel
            bordered
            collapsible
            defaultExpanded={dataList?.length ? true : false}
            className='panel-joined'
            header={title}
        >
            {
                dataList?.length ?
                    dataList.map((item, index) => {
                        console.log(item)
                        return <CardStartUp isStartup={true} key={index} jobId={item.id} title={item.title} logo={item.logo}/>
                    }) : noDataMessage ? noDataMessage :
                        'You have not yet joined any project'
            }
        </Panel>
    )
}

export default ProPanel