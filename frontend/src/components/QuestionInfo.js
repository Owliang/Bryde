import React , { useState } from "react"
import { Box, Grid, makeStyles, Typography, Button, } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import QuestionCard from './Question/QuestionCard'
import ButtonLink from './ButtonLink'

const useStyles = makeStyles((theme) => ({
    typography: {
        color: '#FFFFFF',
    },
}));

export default function QuestionInfo() {

    const classes = useStyles()

    return (
        <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-between" width={1} mt={4} mb={2}>
                <Typography variant="h4" className={classes.typography}>
                    Question Info
                </Typography>
            </Box>
            <Box display="flex"  flexDirection="column" bgcolor="background.light2" py={4} px={4} borderRadius={8} mb={2}>
                <Box display="flex">
                    <Typography variant="h6" className={classes.typography} mb={2}>
                        Topic
                    </Typography>
                </Box>
                <Box display="flex">
                    <Typography variant="h6" className={classes.typography} mb={2}>
                        Subject
                    </Typography>
                </Box>
                <Box display="flex">
                    <Typography variant="h6" className={classes.typography} mb={2}>
                        Content
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}