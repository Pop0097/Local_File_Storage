import React from 'react';

import "./file-overview.scss";

export interface FileOverviewInterface {
    rawName: string;
    name: string;
    size: number;
    dateUploaded: Date;
}

interface FileOverviewProps {
    fileOverview: FileOverviewInterface;
    deleteFile: (fileName: string) => void;
    downloadFile: (fileName: string) => void;
}

export const FileOverview = (props: FileOverviewProps) => {
    return (
        <div className={"file-overview-container"}>
            <div className={"file-info"}>
                <p className={"file-name"}>{props.fileOverview.name}</p>
                <p>Size: {props.fileOverview.size.toString()} bytes</p>
                <p>Date uploaded: {props.fileOverview.dateUploaded.toDateString()}</p>
            </div>
            <div className={"file-actions"}>
                <p onClick={() => props.downloadFile(props.fileOverview.rawName)}>
                    Download
                </p>
                <p onClick={() => props.deleteFile(props.fileOverview.rawName)}>
                    Delete
                </p>
            </div>
        </div>
    )
}