import React , { useState } from "react";
import { Box, Grid, Paper, FormControl, TextField,  makeStyles, Typography, Fade, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    textField: {
        backgroundColor: '#FFFFFF',
    },
    inputTextField: {
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
    },
    typography: {
        color: '#FFFFFF',
        marginLeft: '8px'
    }
  }));

export default function Landing() {

    const [state, setState] = useState(0)
    const classes = useStyles();

    const login = () => (
        <div>
            <Typography variant="h6" className={classes.typography}>
                Username
            </Typography>
            <TextField
                variant="outlined"
                size="small"
                color="primary"
                InputProps={{
                    className: classes.inputTextField,
                }}
            />
            <Typography variant="h6" className={classes.typography}>
                Password
            </Typography>
            <TextField
                variant="outlined"
                size="small"
                color="primary"
                InputProps={{
                    className: classes.inputTextField,
                }}
            />
        </div>
    );

    const register = () => (
        <div>
            <Typography variant="h6" className={classes.typography}>
                Register
            </Typography>
        </div>
    );

    const verify = () => (
        <div>
            <Typography variant="h6" className={classes.typography}>
                Verification
            </Typography>
        </div>
    );

    return (
        <Grid container className={classes.grid}>
            <Grid item xs={8}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Paper>Icon</Paper>
                    <Paper>OffDemand</Paper>
                    <Paper>Turn off your future</Paper>
                    <Button onClick={() => {setState(0)}}>
                        login
                    </Button>
                    <Button onClick={() => {setState(1)}}>
                        register
                    </Button>
                    <Button onClick={() => {setState(2)}}>
                        verification
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <Fade
                    in={(state == 0)}
                    unmountOnExit={true}
                    exit={false}
                    timeout={750}
                >
                    {login()}
                </Fade>
                <Fade
                    in={(state == 1)}
                    unmountOnExit={true}
                    exit={false}
                    timeout={750}
                >
                    {register()}
                </Fade>
                <Fade
                    in={(state == 2)}
                    unmountOnExit={true}
                    exit={false}
                    timeout={750}
                >
                    {verify()}
                </Fade>
            </Grid>
        </Grid>
    )
}