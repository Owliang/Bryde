import React, { useState } from "react"
import { useHistory } from "react-router-dom";
import axios from 'axios'
import { Box, Button, Link } from '@material-ui/core'
import TextFieldSmall from '../TextFieldSmall'

export default function Login(props) {

    const history = useHistory()
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    })

    const handleChangeLogin = (key) => (event) => {
        setLoginData({
            ...loginData,
            [key]: event.target.value,
        })
    }

    const handleLogin = async () => {
        axios.post("/login", {
                username: loginData.username,
                password: loginData.password
            },{
                params: {
                    username: loginData.username
                }
            }).then(response => {
                console.log(response.data)
                const result = response.data.result
                if (result) {
                    localStorage.setItem('username', loginData.username)
                    localStorage.setItem('auth', true)
                    localStorage.setItem('role','Tutor')
                    history.push("/home")
                    window.location.reload();
                    console.log(response.data)
                } else {
                    localStorage.setItem('username', '')
                    localStorage.setItem('auth', false)
                    localStorage.setItem('role','')
                    console.log(response.data)
                }
            }).catch(err => {
                console.error(err)
            })
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
                style={{marginBottom: 32}}
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
                variant="contained"
                color="primary"
                onClick={() => {props.setState(1)}}
            >
                Register
            </Button>
        </Box>
    )
}