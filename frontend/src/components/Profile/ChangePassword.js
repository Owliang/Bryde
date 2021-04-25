import React , { useState } from "react";
import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import EditTextField from './EditTextField'

const useStyles = makeStyles((theme) => ({
    typography: {
        color:"#0EED0E", 
        fontWeight: 700, 
        paddingTop: '5%', 
        paddingLeft: '15%'
    },
    frame: {
        margin: 'auto',
        maxWidth: '80%',
        backgroundColor: '#4F4F4F',
        borderRadius: 8,
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

export default function ChangePassword() {

    const classes = useStyles()
    const [passwordData, setPasswordData] = useState({
        'current': '',
        'new': '',
        'confirm': '',
    })

    const handleChangePassword = (key) => (event) => {
        setPasswordData({
            ...passwordData,
            [key]: event.target.value,
        })
        
    }
    const handleResetPassword = () => {
        if (passwordData.new != passwordData.confirm) {
            console.log('password not match')
            return
        }
        // call backend
    }

    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            spacing={3}
        >
            <Typography variant="h3" className={classes.typography} >
                Change Password
            </Typography>
            <Grid
                container
                className={classes.frame}
                direction="column"
                alignItems='center'
                justify='center'
                spacing={10}
                style={{paddingBottom: '1%'}}
            >
                <Grid container item xs={8} direction="column" spacing={2} justify='space-around' alignItems='center' style={{width:450}}>
                    <Grid container item>
                        <EditTextField
                            display='Current Password'
                            type='password'
                            onChange={handleChangePassword('current')}
                        />
                    </Grid>
                    <br/>
                    <Grid container item>
                        <EditTextField
                            display='New Password'
                            type='password'
                            onChange={handleChangePassword('new')}
                        />
                    </Grid>
                    <Grid container item>
                        <EditTextField
                            display='Confirm Password'
                            type='password'
                            onChange={handleChangePassword('confirm')}
                        />
                    </Grid>
                    <Grid container item justify='space-between' style={{paddingTop:'5%'}}>
                        <Button
                            variant= "contained"
                            color="primary"
                            onClick={() => {handleResetPassword()}}
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
                </Grid>
            </Grid>
    </Grid>
    )
}