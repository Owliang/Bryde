import React , { useState, useEffect } from "react";
import { Box, Grid, makeStyles, Typography, Button, TextareaAutosize } from '@material-ui/core'
import AnswerCard from './AnswerCard'
import axios from 'axios'
import TextFieldSmall from "../TextFieldSmall";

const useStyles = makeStyles((theme) => ({
    typography: {
        color: '#FFFFFF',
    },
    grow: {
        flexGrow: 1,
    },
    button: {
        background: theme.palette.background.default,
        color: '#FFF',
        '&:hover': {
            background: theme.palette.primary.main,
            color: '#000',
         },
    },
}));

export default function QuestionMore(props) {

    const classes = useStyles()
    const [isFollow, setIsFollow] = useState(false)
    const [answer, setAnswer] = useState('')
    const [result, setResult] = useState({
        description: '',
        creator: '',
        subject: '',
        topic: '',
        comment: [],
        follower: [],
    })

    const handleChangeAnswer = (key) => (event) => {
        setAnswer(event.target.value)
    }

    const handleFollow = () => {
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
    }

    useEffect(() => {
        axios.get("http://localhost:4000/question_more", {
            params: {
                topic: "บวกเลขไม่เป็นงับ",
            },
        }).then(response => {
            setResult(response.data)
        }).catch(err => {
            console.error(err)
        })
    }, []);

    const answerCardList = ['1'].map(com => {
        return (
            <AnswerCard content={com} username='owliang' mb={3}/>
        )
    })

    return (
        <>
            <Box display="flex" bgcolor="background.light2" borderRadius={8}>
                <Box display="flex" flexDirection="column">
                    <Typography variant="h6" className={classes.typography}>
                        Topic: {result.topic}
                    </Typography>
                    <Typography variant="h6" className={classes.typography}>
                        by {result.username}
                    </Typography>
                    <Typography variant="h6" className={classes.typography}>
                        Subject: {result.subject}
                    </Typography>
                </Box>
                <Box className={classes.grow} />
                <Box display="flex" flexDirection="column" alignItems="spacce-between">
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
            <Box display="flex" bgcolor="background.light2" borderRadius={8}>
                {result.description}
            </Box>
            <Typography variant="h4" className={classes.typography}>
                Comment (2)
            </Typography>
            {answerCardList}
            <Box display="flex" bgcolor="background.light2" borderRadius={8} flexDirection="column" p={4}>
                <Typography variant="h6" className={classes.typography} style={{marginBottom: 8}}>
                    Add a comment
                </Typography>
                <TextareaAutosize
                    value={answer}
                    onChange={handleChangeAnswer()}
                    style={{marginBottom: 16}}
                    height="300px"
                />
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {console.log('yay')}}
                    className={classes.button}
                >
                    Submit
                </Button>
            </Box>
        </>
    )
}