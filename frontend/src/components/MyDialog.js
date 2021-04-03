import React from 'react'
import {Dialog, DialogActions, DialogContent, DialogTitle, Slide, Button, Typography} from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MyDialog = (props) => {
    const {open, handleClose, title, message, submessage, buttonOneRefTo, buttonOneMessage, buttonTwoRefTo, buttonTwoMessage  } = props;
    console.log("dialog ",JSON.stringify(props))
    return (
        <Dialog
            open = {open}
            TransitionComponent={Transition}
            keepMounted
            disableBackdropClick
            disableEscapeKeyDown
            onClose={handleClose}
            aria-labelledby = "alert-dialog-slide-title"
            aria-describedby = "alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                    {message}
                </Typography>

                {submessage && <Typography variant='caption' gutterBottom>
                    {submessage}
                </Typography>}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={() => window.location.href = buttonOneRefTo || '/'} color="primary">
                    {buttonOneMessage || "Go Home"}
                </Button>
                
                { buttonTwoRefTo == null ? 
                <Button onClick={handleClose} color="primary">
                    {buttonTwoMessage || "Close" }
                </Button> : 
                <Button onClick={() => window.location.href = buttonTwoRefTo} color="primary">
                    {buttonTwoMessage}
                </Button>}
            </DialogActions>
        </Dialog>
    )
}

export default MyDialog
