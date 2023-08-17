import React, { useState } from "react";
import FilePreview from "./FilePreview.js";
import AlertSnackbar from "./SnackBar.js";

const DropFile = ({ data, dispatch }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ type: "IN_DND_ZONE", inDropZone: true });
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ type: "IN_DND_ZONE", inDropZone: false });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = "copy";
        dispatch({ type: "IN_DND_ZONE", inDropZone: true });
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        let files = [...e.dataTransfer.files];

        if (files && files.length > 0) {
            const existingFiles = data.fileList.map((f) => f.name);
            files = files.filter((f) => !existingFiles.includes(f.name));
            dispatch({ type: "ADD_FILE_TO_LIST", files });
            dispatch({ type: "IN_DND_ZONE", inDropZone: false });
        }
    };

    const handleFileSelect = (e) => {
        let files = [...e.target.files];
        if (files && files.length > 0) {
            const existingFiles = data.fileList.map((f) => f.name);
            files = files.filter((f) => !existingFiles.includes(f.name));
            dispatch({ type: "ADD_FILE_TO_LIST", files });
        }
    };

    //To Handle API call
    const uploadFiles = async () => {
        setOpenSnackbar(true);
    };

    const handleSnackbarClose = (e, reason) => {
        if (reason === "clickaway") return;
        setOpenSnackbar(false);
    };

    return (
        <>
            <div
                className='dropzone'
                onDrop={(e) => handleDrop(e)}
                onDragOver={(e) => handleDragOver(e)}
                onDragEnter={(e) => handleDragEnter(e)}
                onDragLeave={(e) => handleDragLeave(e)}
            >
                <input
                    className='files'
                    type='file'
                    multiple
                    onClick={(e) => handleFileSelect(e)}
                />
                <label>You can select more than one file</label>
                <h3 className='uploadMessage'>or drag-drop you files here</h3>
            </div>
            <FilePreview fileData={data} />
            {data.fileList.length > 0 && (
                <>
                    <button className='uploadBtn' onClick={uploadFiles}>
                        Upload
                    </button>
                    <AlertSnackbar
                        message='File Uploaded'
                        open={openSnackbar}
                        autoHideDuration={6000}
                        handleClose={handleSnackbarClose}
                        severity='success' //error, warning, info
                    />
                </>
            )}
        </>
    );
};

export default DropFile;
