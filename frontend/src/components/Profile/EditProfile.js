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

export default function EditProfile() {

    const classes = useStyles()
    const [editProfileData, setEditProfileData] = useState({
        'firstname': 'Korapin',
        'lastname': 'Thongpud',
        'username': 'phare',
        'promptpay': '0614139956',
    })

    const handleChangeEdit = (key) => (event) => {
        setEditProfileData({
            ...editProfileData,
            [key]: event.target.value,
        })
        
    }
    const handleEditProfile = () => {
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
                    Edit Profile
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
                                display='First Name'
                                type='tel'
                                value={editProfileData['firstname']}
                                onChange={handleChangeEdit('firstname')}
                            />
                        </Grid>
                        <Grid container item>
                            <EditTextField
                                display='Last Name'
                                type='tel'
                                value={editProfileData['lastname']}
                                onChange={handleChangeEdit('lastname')}
                            />
                        </Grid>
                        <Grid container item>
                            <EditTextField
                                display='Username'
                                type='tel'
                                value={editProfileData['username']}
                                onChange={handleChangeEdit('username')}
                            />
                        </Grid>
                        <Grid container item>
                            <EditTextField
                                display='Promptpay Number'
                                type='tel'
                                value={editProfileData['promptpay']}
                                onChange={handleChangeEdit('promptpay')}
                            />
                        </Grid>
                        <Grid container item justify='space-between' style={{paddingTop:'5%'}}>
                            <Button
                                variant= "contained"
                                color="primary"
                                onClick={() => {handleEditProfile()}}
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