import React, { useState } from "react"
import { makeStyles, Box, Button } from '@material-ui/core'
import TextFieldSmall from '../TextFieldSmall'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    textFieldSmall: {
        marginBottom: 8,
    },
}));

export default function Register(props) {

    const classes = useStyles()
    const [registerData, setRegisterData] = useState({
        'firstname': '',
        'lastname': '',
        'username': '',
        'email': '',
        'password': '',
        'confirmpassword': '',
        'promptpay': '',
        'role': '',
    })

    const handleChangeRegister = (key) => (event) => {
        setRegisterData({
            ...registerData,
            [key]: event.target.value,
        })
    }

    const handleRegister = () => {
        // axios here
        console.log('REGISTER!')
    }

    return (
        <Box display="flex" flexDirection="column">
            <TextFieldSmall
                display="First name"
                type='tel'
                value={registerData['firstname']}
                onChange={handleChangeRegister('firstname')}
            />
            <TextFieldSmall
                display='Last name'
                type='tel'
                value={registerData['lastname']}
                onChange={handleChangeRegister('lastname')}
            />
            <TextFieldSmall
                display='Username'
                type='tel'
                value={registerData['username']}
                onChange={handleChangeRegister('username')}
            />
            <TextFieldSmall
                display='E-mail'
                type='email'
                value={registerData['email']}
                onChange={handleChangeRegister('email')}
            />
            <TextFieldSmall
                display='Password'
                type='password'
                value={registerData['password']}
                onChange={handleChangeRegister('password')}
            />
            <TextFieldSmall
                display='Confirm Password'
                type='password'
                value={registerData['confirmpassword']}
                onChange={handleChangeRegister('confirmpassword')}
            />
            <TextFieldSmall
                display='Promptpay Number'
                type='tel'
                style={{marginBottom: 24}}
                value={registerData['promptpay']}
                onChange={handleChangeRegister('promptpay')}
            />
            <Button
                variant="outlined"
                color="primary"
                onClick={() => {props.setState(2)}}
            >
                Create account
            </Button>
        </Box>
    )
}