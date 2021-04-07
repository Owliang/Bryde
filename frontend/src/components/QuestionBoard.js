import React , { useState } from "react"
import { Box, Grid, makeStyles, Typography, Button, MenuItem } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import QuestionCard from './Question/QuestionCard'
import ButtonLink from './ButtonLink'
import TextFieldSmall from './TextFieldSmall'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    typography: {
        color: '#FFFFFF',
    },
}));

export default function QuestionBoard() {

    const questionList = [
        {
            _id: "6052b4f4ff4b284d740d0c2d",
            topic: "บวกเลขไม่เป็นงับบบ",
            subject: "math",
            creator: "a",
        },
        // {
        //     _id: "604f27851e813a34881f9656",
        //     topic: "บวกเลขไม่เป็นงับ",
        //     subject: "math",
        //     creator: "a",
        // },
        // {
        //     _id: "604f26a4995de24b207a3766",
        //     topic: "ant เเปลว่าอะไรอ่ะ",
        //     subject: "english",
        //     creator: "b",
        // },
    ]

    const classes = useStyles()
    const subjectList = ['','english','math']
    const [questionData, setQuestionData] = useState({
        topic: '',
        username: '',
        subject: '',
    })

    const handleChangeQuestion = (key) => (event) => {
        setQuestionData({
            ...questionData,
            [key]: event.target.value,
        })
    }

    const handleSearchQuestion = async () => {
        axios.get("http://localhost:4000/question", questionData
        ).then(response => {
            console.log(response.data.result)
        }).catch(err => {
            console.error(err)
        })
    }

    const questionCardList = questionList.map(question => {
        const {topic, subject, creator} = question
        return (
            <QuestionCard mb={2} p={2} topic={topic} subject={subject} creator={creator} />
        )
    })

    return (
        <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-between" width={1} mt={4} mb={2}>
                <Typography variant="h4" className={classes.typography}>
                    Q & A
                </Typography>
                <ButtonLink
                    variant="contained"
                    color="primary"
                    path='/create_question'
                    startIcon={<AddIcon />}
                    className={classes.navButton}
                >
                    Add Question
                </ButtonLink>
            </Box>

            <Box bgcolor="background.light2" py={4} px={4} borderRadius={8} mb={2}>
            <Grid container>
                <Grid item xs={1}>
                    <Typography variant="h6" className={classes.typography} mb={2}>
                        Topic :
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <TextFieldSmall
                        value={questionData['topic']}
                        onChange={handleChangeQuestion('topic')}
                    />
                </Grid>
                <Grid item xs={3}>

                </Grid>
                <Grid item xs={1}>
                    <Typography variant="h6" className={classes.typography} mb={2}>
                        Creator :
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <TextFieldSmall
                        value={questionData['username']}
                        onChange={handleChangeQuestion('username')}
                    />
                </Grid>
                <Grid item xs={3}>

                </Grid>
                <Grid item xs={1}>
                    <Typography variant="h6" className={classes.typography} mb={2}>
                        Subject :
                    </Typography>
                    
                </Grid>
                <Grid item xs={6}>
                    <TextFieldSmall
                        value={questionData['subject']}
                        onChange={handleChangeQuestion('subject')}
                        select
                    >
                        {subjectList.map(subject => (
                            <MenuItem key={subject} value={subject}>
                                {subject}
                            </MenuItem>
                        ))}
                    </TextFieldSmall>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {handleSearchQuestion()}}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>
            </Box>



            <Typography variant="h4" className={classes.typography}>
                Result ({questionList.length})
            </Typography>
            <Box mt={2}>
                {questionCardList}
            </Box>
        </Box>
    )
}