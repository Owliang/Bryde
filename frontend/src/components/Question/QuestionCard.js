import React , { useState, useEffect } from "react";
import { Box, Grid, makeStyles, Typography, Button } from '@material-ui/core'
import axios from 'axios'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    typography: {
        color: '#FFFFFF',
    },
    grow: {
        flexGrow: 1,
    },
    button: {
        // backgroundColor: '#212121',
    },
}));

export default function QuestionCard(props) {

    const classes = useStyles()
    const history = useHistory()
    const [isFollow, setIsFollow] = useState(false)
    const {topic, subject, creator, ...prop} = props

    const handleFollow = () => {
        axios.post("/question", {
            topic: topic,
            username: localStorage.getItem('username')
        }).then(response => {
            console.log(response.data.description)
            if (response.data.description == "follow") {
                setIsFollow(true)
            } else {
                setIsFollow(false)
            }
        }).catch(err => {
            console.error(err)
        })
    }

    useEffect(() => {
        // required api just for checking follow/unfollow

        // axios.post("/question", {
        //     topic: topic,
        //     username: localStorage.getItem('username')
        // }).then(response => {
        //     console.log(response.data.description)
        //     if (response.data.description == "follow") {
        //         setIsFollow(true)
        //     } else {
        //         setIsFollow(false)
        //     }
        // }).catch(err => {
        //     console.error(err)
        // })
    }, []);

    const handleMore = () => {
        history.push("/qanda/more?topic=" + topic)
        window.location.reload();
    }

    return (
        <Box display="flex" bgcolor="background.light2" borderRadius={8} {...props}>
            <Box display="flex" bgcolor="background.light2" flexDirection="column">
                <Typography variant="h6" className={classes.typography}>
                    Topic: {topic}
                </Typography>
                <Typography variant="h6" className={classes.typography}>
                    by {creator}
                </Typography>
                <Typography variant="h6" className={classes.typography}>
                    Subject: {subject}
                </Typography>
            </Box>
            <Box className={classes.grow} />
            <Box display="flex" bgcolor="background.light2" flexDirection="column" alignItems="spacce-between">
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {handleMore()}}
                    className={classes.button}
                >
                    See more
                </Button>
                <Button
                    variant={isFollow ? "contained" : "outlined"}
                    color={isFollow ? "primary" : "#000"}
                    onClick={handleFollow}
                    className={classes.button}
                >
                    {isFollow ? 'Followed' : 'Follow'}
                </Button>
            </Box>
            
        </Box>
    )
}