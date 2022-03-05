import React from 'react'
import { Panel } from 'rsuite'

function ProPanel(props) {

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
                        return <div key={index}>{item.id}</div>
                    })
                    :
                    noDataMessage ? noDataMessage :
                        'You have not yet joined any project'
            }
        </Panel>
    )
}

export default ProPanel