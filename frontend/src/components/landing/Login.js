import React, { useState } from "react"
import { Box, Button, Link } from '@material-ui/core'
import TextFieldSmall from '../TextFieldSmall'
import axios from 'axios'

export default function Login(props) {

    const [loginData, setLoginData] = useState({
        'username': '',
        'password': '',
    })

    const handleChangeLogin = (key) => (event) => {
        setLoginData({
            ...loginData,
            [key]: event.target.value,
        })
    }

    const handleLogin = () => {
        // axios here
        console.log('LOGIN!')
    }

    return (
        <Box display="flex" flexDirection="column">
            <TextFieldSmall
                display='Username'
                value={loginData['username']}
                onChange={handleChangeLogin('username')}
            />
            <TextFieldSmall
                style={{marginBottom: 4}}
                display='Password'
                type='password'
                value={loginData['password']}
                onChange={handleChangeLogin('password')}
            />
            <Link
                style={{marginBottom: 16}}
                align="right"
                component="button"
                variant="body2"
                onClick={() => {props.setState(3)}}
            >
                Forgot Password?
            </Link>
            <Button
                variant="outlined"
                color="primary"
                style={{marginBottom: 16}}
                onClick={() => {handleLogin()}}
            >
                Login
            </Button>
            <Button
                variant="outlined"
                color="primary"
                onClick={() => {props.setState(1)}}
            >
                Register
            </Button>
        </Box>
    )
}