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

export default function Verify(props) {
    
    const classes = useStyles()
    const [code, setCode] = useState('')

    const handleChangeCode = (event) => {
        setCode(event.target.value)
    }

    const handleVerify = () => {
        // axios here
        console.log('VERIFY!')
    }

    return (
        <Box display="flex" flexDirection="column">
            <Typography variant="h4" className={classes.typography}>
                Verify e-mail address
            </Typography>
            <Typography variant="h6" className={classes.typography}>
                A verification code has been sent to your registered e-mail address. Please enter in the box below.
            </Typography>
            <TextFieldSmall
                style={{ marginBottom: 16 }}
                autoFocus
                value={code}
                onChange={handleChangeCode}
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