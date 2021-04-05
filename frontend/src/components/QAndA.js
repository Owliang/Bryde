import React , { useState } from "react";
import { Box, Grid, makeStyles, Typography, Button, } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import QuestionCard from './QAndA/QuestionCard'

const useStyles = makeStyles((theme) => ({
    typography: {
        color: '#FFFFFF',
    },
}));

export default function QAndA() {

    const classes = useStyles()

    const questionCardList = ['1','2','3'].map((number) => {
        return (
            <QuestionCard mb={2} p={2}/>
        )
    })

    return (
        <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-between" width={1} mt={4} mb={2}>
                <Typography variant="h4" className={classes.typography}>
                    Q & A
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {console.log('yay')}}
                    startIcon={<AddIcon />}
                >
                    Add Question
                </Button>
            </Box>
            <Box display="flex"  flexDirection="column" bgcolor="background.light2" py={4} px={4} borderRadius={8} mb={2}>
                <Box display="flex">
                    <Typography variant="h6" className={classes.typography} mb={2}>
                        Topic :
                    </Typography>
                </Box>
                <Box display="flex">
                    <Typography variant="h6" className={classes.typography} mb={2}>
                        Creater :
                    </Typography>
                </Box>
                <Box display="flex">
                    <Typography variant="h6" className={classes.typography} mb={2}>
                        Subject :
                    </Typography>
                </Box>
            </Box>
            <Typography variant="h4" className={classes.typography}>
                Result (3)
            </Typography>
            <Box mt={2}>
                {questionCardList}
            </Box>
        </Box>
    )
}