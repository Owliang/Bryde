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

export default function ForgetEmail(props) {

    const classes = useStyles()
    const [email, setEmail] = useState('')

    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
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
                Enter your registered e-mail address
            </Typography>
            <TextFieldSmall
                style={{ marginBottom: 16 }}
                display='E-mail address'
                autoFocus
                value={email}
                onChange={handleChangeEmail}
            />
            <Button
                variant="outlined"
                color="primary"
                onClick={() => {props.setState(4)}}
            >
                Continue
            </Button>
        </Box>
    )
}