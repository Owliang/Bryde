import React, { useState } from "react"
import { makeStyles, Box, Button, Typography, TextField } from '@material-ui/core'
import TextFieldSmall from '../TextFieldSmall'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    typography: {
        color: '#FFFFFF',
        marginBottom: 16,
    },
}));

export default function ForgetName(props) {

    const classes = useStyles()
    const [name, setName] = useState({
        'Firstname': '',
        'Lastname': '',
    })

    const handleChangeName = (key) => (event) => {
        setName({
            ...name,
            [key]: event.target.value,
        })
    }

    const handleForget = () => {
        // axios here
        console.log('FORGET!')
    }

    return (
        <Box display="flex" flexDirection="column">
            <Typography variant="h4" className={classes.typography}>
                Verify Information
            </Typography>
            <Typography variant="h6" className={classes.typography} style={{ marginBottom: 32 }}>
                Enter your First name and Last name to continue. New password will be sent to your registered e-mail.
            </Typography>
            <TextFieldSmall
                display='Firstname'
                type='password'
                value={name['Firstname']}
                onChange={handleChangeName('Firstname')}
            />
            <TextFieldSmall
                display='Lastname'
                type='password'
                value={name['Lastname']}
                onChange={handleChangeName('Lastname')}
                style={{ marginBottom: 32 }}
            />
            <Button
                variant="outlined"
                color="primary"
                onClick={() => {props.setState(0)}}
            >
                Continue
            </Button>
        </Box>
    )
}