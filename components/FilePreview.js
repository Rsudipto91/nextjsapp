import React from "react";
const FilePreview = ({ fileData }) => {
    return (
        <div className='fileList'>
            <div className='fileContainer'>
                {fileData.fileList.map((file, index) => {
                    return (
                        <ol key={index}>
                            <li className='fileList'>
                                <div key={file.name}> {file.name}</div>
                            </li>
                        </ol>
                    );
                })}
            </div>
        </div>
    );
};
export default FilePreview;
