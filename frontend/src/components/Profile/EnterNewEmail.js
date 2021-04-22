import React , { useState } from "react";
import { Button, Grid, makeStyles} from '@material-ui/core'
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

export default function EnterNewEmail(props) {

    const classes = useStyles()
    const [emailData, setEmailData] = useState({
        'email': '',
    })

    const handleChangeEmail = (key) => (event) => {
        setEmailData({
            ...emailData,
            [key]: event.target.value,
        })
        
    }
    const handleResetEmail = () => {
        props.setState(1)
        // call backend
        // submit สำเร็จ ใส่ props.setState(1) ด้วย
    }

    return (
        <React.Fragment>
            <Grid container item>
                <EditTextField
                    display='New E-mail'
                    type='email'
                    onChange={handleChangeEmail('email')}
                />
            </Grid>
            <Grid container item justify='space-between' style={{paddingTop:'5%'}}>
                <Button
                    variant= "contained"
                    color="primary"
                    onClick={() => {handleResetEmail()}}
                    className={classes.roleButton}
                >
                    Submit
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