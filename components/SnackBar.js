import React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const AlertSnackbar = ({ message, open, autoHideDuration, handleClose, severity = "success" }) => {
    const action = (
        <>
            <IconButton size='small' aria-label='close-icon' onClick={handleClose}>
                <CloseIcon fontSize='small' />
            </IconButton>
        </>
    );
    return (
        <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: "20rem" }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default AlertSnackbar;
