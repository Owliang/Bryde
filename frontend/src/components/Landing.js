import React , { useState } from "react";
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Login from './landing/Login'
import Register from './landing/Register'
import Verify from './landing/Verify'
import Forget from './landing/Forget'
import FadeIn from './transition/FadeIn'

const useStyles = makeStyles((theme) => ({
    textField: {
        backgroundColor: '#FFFFFF',
        outline: 'none',
    },
    inputTextField: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        outline: 'none',
    },
    typography: {
        color: '#FFFFFF',
    },
    grid: {
        height: '100%',
    },
    textFieldSmall: {
        marginBottom: 8,
    },
}));

export default function Landing() {

    const classes = useStyles()
    const [state, setState] = useState(0) // 0 = login, 1 = register, 2 = verify, 3 = forget pass

    return (
        <Grid container className={classes.grid} justify="space-between">
            <Grid item xs={6}>
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    // bgcolor="#800000"
                    height="100%"
                >
                    <PowerSettingsNewIcon color="primary" style={{ fontSize: 300 }}/>
                    <Typography variant="h1" className={classes.typography}>
                        OffDemand
                    </Typography>
                    <Typography variant="h3" className={classes.typography}>
                        Turn off your future
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    height="100%"
                    // bgcolor="#000080"
                >
                    <FadeIn condition={state == 0}>
                        <Login setState={setState} />
                    </FadeIn>
                    <FadeIn condition={state == 1}>
                        <Register setState={setState} />
                    </FadeIn>
                    <FadeIn condition={state == 2}>
                        <Verify setState={setState} />
                    </FadeIn>
                    <FadeIn condition={state == 3}>
                        <Forget setState={setState} />
                    </FadeIn>
                </Box>
            </Grid>
        </Grid>
    )
}