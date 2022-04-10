import React, {FormEvent, useState} from 'react';

import "./file-input.scss";

interface FileInputProps {
    numFiles: number;
    setNumFiles: React.Dispatch<React.SetStateAction<number>>;
}

export const FileInput = (props: FileInputProps) => {
    const [attachedFile, setAttachedFile] = useState<File>();

    const uploadFile = async (event: FormEvent) => {
        event.preventDefault();
        if (attachedFile === undefined) {
            return;
        }

        const data = new FormData();
        data.append('file', attachedFile);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: data,
        });
        if (response.status !== 200) {
            throw Error("Could not upload file " + attachedFile.name);
        }

        props.setNumFiles(props.numFiles + 1);
        setAttachedFile(undefined);
    }

    return (
        <div className={"file-input"}>
            <b>Upload a file</b>
            <div className={"file-input-form"}>
                <label className={"file-input-form-label"} htmlFor={"file-input"}>
                    Attach a file:
                </label>
                {attachedFile === undefined ?
                    <input
                        id={"file-input"}
                        type={"file"}
                        onChange={
                            (event) => {
                                setAttachedFile(event.target.files?.[0])
                            }
                        }
                    /> :
                    <span>{attachedFile.name}</span>
                }
                <br />
                <button
                    className={"file-input-form-submit-button"}
                    type={"submit"}
                    disabled={attachedFile === undefined}
                    onClick={uploadFile}
                >
                    Upload File
                </button>
                <br />
                {attachedFile !== undefined &&
                    <span onClick={() => setAttachedFile(undefined)}>
                        Remove File
                    </span>
                }
            </div>
        </div>
    )
}
