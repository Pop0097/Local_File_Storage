import React, {useEffect, useState} from 'react';

import {FileInput} from "./file-input";
import {FileList} from "./file-list";

import {FileOverviewInterface} from "./file-overview";

export const FileStorage = () => {
    document.title = "Pop0097's File Saver"

    const [fileOverviews, setFileOverviews] = useState<FileOverviewInterface[]>([]);
    const [numFiles, setNumFiles] = useState<number>(0);

    useEffect(() => {
        getFileOverviews()
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        getFileOverviews()
            .catch((error) => console.log(error));
    }, [numFiles]);

    const isFileOverviewInterface = (value: any): value is FileOverviewInterface => {
        return "name" in value && "size" in value;
    }

    const getFileOverviews = async () => {
        const response = await fetch("/api/overview");
        const body = await response.json();
        if (response.status !== 200) {
            throw Error("Could not retrieve file names");
        }

        const overviews: FileOverviewInterface[] = [];
        body.forEach((value: any) => {
            if (isFileOverviewInterface(value)) {
                let name = value.name;
                const dateUploadedUnixMs = name.slice(0, name.indexOf('---'));
                name = name.substring(name.indexOf('---') + 3);

                overviews.push({
                    rawName: value.name,
                    name,
                    size: value.size,
                    dateUploaded: new Date(parseInt(dateUploadedUnixMs)),
                })
            }
        });

        setFileOverviews(overviews);
        setNumFiles(overviews.length);
        return body;
    }

    return (
        <div>
            <div>
                <h1>Your Files</h1>
            </div>
            <div>
                <FileInput
                    numFiles={numFiles}
                    setNumFiles={setNumFiles}
                />
            </div>
            <div>
                <FileList
                    fileOverviews={fileOverviews}
                    numFiles={numFiles}
                    getFileOverviews={getFileOverviews}
                    setNumFiles={setNumFiles}
                />
            </div>
        </div>
    )
}

