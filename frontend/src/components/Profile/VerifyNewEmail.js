import React , { useState } from "react";
import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import EditTextField from './EditTextField'

const useStyles = makeStyles((theme) => ({
    typography: {
        color:"white", 
    },
    roleButton: {
        width: '47.5%',
        textTransform: "none",
        fontWeight: 700,
        backgroundColor:'#191919', 
        color:"#0EED0E",
        fontSize: 18,
        borderRadius: 10
    },
}));

export default function VerfifyNewEmail() {

    const classes = useStyles()
    const [verifyData, setVerifyData] = useState({
        'code': '',
    })

    const handleChangeVerify = (key) => (event) => {
        setVerifyData({
            ...verifyData,
            [key]: event.target.value,
        })
        
    }
    const handleVerifyEmail = () => {
        // call backend
    }

    return (
        <React.Fragment>
            <Typography variant='h6' className={classes.typography}>
                A verification code has been sent to your e-mail address. Please enter in the box below.
            </Typography>
            <br/>
            <Grid container item>
                <EditTextField
                    display='Verification Code'
                    onChange={handleChangeVerify('code')}
                />
            </Grid>
            <Grid container item justify='space-between' style={{paddingTop:'5%'}}>
                <Button
                    variant= "contained"
                    color="primary"
                    onClick={() => {handleVerifyEmail()}}
                    className={classes.roleButton}
                >
                    Save Changes
                </Button>
                <Button
                    variant= "contained"
                    color="primary"
                    className={classes.roleButton}
                >
                    Cancel
                </Button>
            </Grid>
        </React.Fragment>
    )
}