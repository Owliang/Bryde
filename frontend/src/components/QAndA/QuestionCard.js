import React , { useState } from "react";
import { Box, Grid, makeStyles, Typography, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    typography: {
        color: '#FFFFFF',
    },
    grow: {
        flexGrow: 1,
    },
    button: {
        backgroundColor: '#212121',
    },
}));

export default function QuestionCard(props) {

    const classes = useStyles()

    return (
        <Box display="flex" bgcolor="background.light2" borderRadius={8} {...props}>
            <Box display="flex" bgcolor="background.light2" flexDirection="column">
                <Typography variant="h6" className={classes.typography}>
                    Topic
                </Typography>
                <Typography variant="h6" className={classes.typography}>
                    by Username
                </Typography>
                <Typography variant="h6" className={classes.typography}>
                    Subject: subject
                </Typography>
                <Typography variant="h6" className={classes.typography}>
                    Posted Date: 27-03-2021
                </Typography>
            </Box>
            <Box className={classes.grow} />
            <Box display="flex" bgcolor="background.light2" flexDirection="column">
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {console.log('yay')}}
                    className={classes.button}

                >
                    See more
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {console.log('yay')}}
                    className={classes.button}
                >
                    Follow
                </Button>
            </Box>
            
        </Box>
    )
}