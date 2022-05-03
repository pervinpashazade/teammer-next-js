import React from 'react'
import { Panel } from 'rsuite'
import CardStartUp from "./Cards/CardStartUp";

function ProPanel(props) {
    const {
        title,
        dataList,
        noDataMessage,
        isStartup
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
                    dataList.map((item) => {
                        // console.log('SAVEDITEM => ', item);
                        return (
                            <CardStartUp
                                key={item.id}
                                isStartup={isStartup}
                                jobId={item.saveable.id}
                                title={item.saveable.title}
                                logo={item.saveable.logo}
                            />
                        )
                    }) : noDataMessage ? noDataMessage :
                        'You have not yet joined any project'
            }
        </Panel>
    )
}

export default ProPanel