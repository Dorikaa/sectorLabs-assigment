import React from "react";

export const FilePane = (filelist) => {
    const files = filelist.filelist;
    return (
        <div className="filePane">
            <p>Files:</p>
            <ul>
                {Object.values(files).map((file, index) => {
                    return (
                        <li key={index}>
                            <a className="fileName" href={file.raw_url} target="_blank" rel="noreferrer">
                                {file.filename}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default FilePane;