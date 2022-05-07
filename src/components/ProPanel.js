import React from 'react'
import { Panel } from 'rsuite'
import CardStartUp from "./Cards/CardStartUp";
import SavedJobCard from './Cards/SavedJobCard';

function ProPanel(props) {
    const {
        children,
        title,
        dataList,
        noDataMessage,
        isStartup,
        isSaved,
    } = props;

    if (isSaved) {
        return (
            <Panel
                bordered
                collapsible
                // defaultExpanded={dataList?.length ? true : false}
                defaultExpanded={true}
                className='panel-joined'
                header={title}
            >
                {
                    dataList?.length ?
                        dataList.map((item) => {
                            console.log('SAVEDITEM => ', item.saveable);
                            return (
                                <SavedJobCard
                                    key={item.id}
                                    jobId={item.saveable?.id}
                                    position={item.saveable?.position?.name}
                                    project={item.saveable?.project?.title}
                                    owner={item.saveable?.project?.owner}
                                    logo={item.saveable?.project?.logo}
                                />
                            )
                        }) : noDataMessage ? noDataMessage :
                            'You have not yet joined any project'
                }
            </Panel>
        )
    }

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
                                jobId={item.id}
                                title={item.title}
                                logo={item.logo}
                            />
                        )
                    }) : noDataMessage ? noDataMessage :
                        'You have not yet joined any project'
            }
        </Panel>
    )
}

export default ProPanel