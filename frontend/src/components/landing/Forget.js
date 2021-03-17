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

export default function Forget(props) {

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
                Forgot password?
            </Typography>
            <Typography variant="h6" className={classes.typography}>
                Enter an e-mail, we will sent you reset password if email exist.
            </Typography>
            <TextFieldSmall
                style={{ marginBottom: 16 }}
                autoFocus
                value={email}
                onChange={handleChangeEmail}
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