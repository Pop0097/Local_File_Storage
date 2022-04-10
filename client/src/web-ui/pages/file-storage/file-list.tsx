import React from 'react';

import {FileOverview, FileOverviewInterface} from "./file-overview";

interface FileListProps {
    fileOverviews: FileOverviewInterface[];
    numFiles: number;
    getFileOverviews: () => Promise<any>;
    setNumFiles: React.Dispatch<React.SetStateAction<number>>;
}

export const FileList = (props: FileListProps) => {

    const deleteFile = async (rawFileName: string) => {
        const response = await fetch("/api/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fileName: rawFileName,
            }),
        });
        if (response.status !== 200) {
            throw Error("Could not delete file: " + rawFileName);
        }

        props.setNumFiles(props.numFiles - 1);
    }

    const downloadFile = async (rawFileName: string) => {
        const response = await fetch("/api/download", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fileName: rawFileName,
            })
        });
        if (response.status !== 200) {
            throw Error("Could not get file: " + rawFileName);
        }

        response.blob().then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = rawFileName.substring(rawFileName.indexOf('---') + 3);
            a.click();
        });
    }

    return (
        <div>
            <h3>File List</h3>
            <h6>You have {props.numFiles} file(s)</h6>
            {props.fileOverviews.length > 0 &&
                props.fileOverviews.map((overview) => {
                    return (
                        <FileOverview
                            fileOverview={overview}
                            deleteFile={deleteFile}
                            downloadFile={downloadFile}
                        />
                    );
                })
            }
        </div>
    )
}
