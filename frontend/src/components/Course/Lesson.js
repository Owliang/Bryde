import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Container,
  Grid,
  ListItem,
  Paper,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@material-ui/core";
import FormComponents from "../FormComponents/FormComponents.js";
import { Form, useForm } from "../useForm.js";
import MyVideoPlayer from "./MyVideoPlayer";
import GetCourseData from "../../services/getCourseData";
import RatingForm from "./RatingForm.js";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#FFFFFF",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  typography: {
    color: "#FFFFFF",
  },
  coursedetail: {
    color: "#FFFFFF",
    marginLeft: "3rem",
    marginTop: "auto",
    marginBottom: "auto",
    variant: "h6",
  },
  grid: {
    height: "100%",
    padding: "1rem",
  },
  textFieldSmall: {
    marginBottom: 8,
  },
  ButtonBlock: {
    display: "flex",
    justifyContent: "flex-end",
  },
  paper: {
    padding: theme.spacing(2),

    marginTop: "3rem",
    background: "#4f4f4f",
  },
  dropdown: {
    marginBottom: 8,
    width: "100%",
    height: 50,
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: "10px",
        borderColor: "primary",
        height: 40,
        marginTop: 5,
      },
      "&.Mui-focused fieldset": {
        borderColor: "primary",
        borderWidth: "2px",
        height: 40,
        marginTop: 5,
      },
    },
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },

  courseofweek: {
    height: "auto",
    padding: theme.spacing(1),
    background: "#9f9f9f",
  },
  courseImage: {
    margin: "auto",

    maxWidth: "100%",
  },
  qrcode: {
    marginTop: "2rem",
    maxWidth: "25rem",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  courseText: {
    align: "center",
  },
  margin: {
    marginTop: "2rem",
    marginBottom: "2rem",
    marginLeft: "1rem",
    marginRight: 0,
  },
  Button: {
    backgroundColor: "#212121",
    border: "1.5px solid",
    bordercolor: "#0EED0E",
    padding: "3px",
    marginLeft: "3rem",
    marginTop: "1rem",
    color: "primary",
    width: "10rem",
    "&:hover": {
      backgroundColor: "#212121",
      boxShadow: "none",
    },
  },
  videoFrame: {
    border: "1.5px solid",
    paddingTop: "10",
  },
  ratingPaper: {
    padding: theme.spacing(5),
    margin: theme.spacing(3),
    color: theme.palette.text.secondary,
    backgroundColor: "#424242",
    borderRadius: 15,
  },
}));

export default function Lesson(props) {
  const classes = useStyles();
  const [course, setCourse] = useState({
    status: "loading",
  });
  const [videos, setVideos] = useState([]);
  const [VIDs, setVIDs] = useState([]);
  const getInitialCourseData = () =>
    GetCourseData({
      CID: props.match.params.id,
      mode: "read",
      student: props.match.params.student,
    });

  useEffect(() => {
    console.log("begin Init");
    getInitialCourseData()
      .then((initData) => {
        console.log(`initialCourseData from useEffect`, initData);
        setCourse(initData);
        console.log("set init Video");
        setVideos(initData.attatch_video);
        let n = initData.total_video;
        let tempID = [];
        for (let i = 0; i < n; i++) {
          tempID.push({
            label: "Video " + (i + 1) + ": " + initData.attatch_video[i].name,
            value: i,
          });
        }
        setVIDs(tempID);
      })
      .catch(async (err) => {
        await new Promise((resolve) => setTimeout(resolve, 20000));
        window.location.href = "/";
      });
  }, [1]);

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm({ id: "0" }, false);

  useEffect(() => {
    console.log(`values.id`, values.id);
  }, [values.id]);

  if (!course) {
    return (
      <Typography variant="h2" align="center" className={classes.typography}>
        Class Not Found
      </Typography>
    );
  }

  return (
    <div>
      {course.status == "loading" ? (
        <CircularProgress size={150} />
      ) : (
        <Container fixed>
          <Paper className={classes.paper}>
            <Grid className={classes.margin}>
              <Typography className={classes.typography} variant="h5">
                Course Name : {course.name}
              </Typography>
            </Grid>

            <div className="row" padding="1rem">
              <div className="col">
                <img
                  src={course.attatch_photo.source}
                  className={classes.courseImage}
                />
              </div>
              <div className="col">
                <Typography className={classes.coursedetail}>
                  By : {course.tutor}
                </Typography>
                <Typography className={classes.coursedetail}>
                  Subject : {course.subject}
                </Typography>
                <Typography className={classes.coursedetail}>
                  Price : {course.price} Baht
                </Typography>
                <Typography className={classes.coursedetail}>
                  Rating : {course.rating}
                </Typography>
                <Typography className={classes.coursedetail}>
                  Number of Video : {VIDs.length}
                </Typography>
              </div>
              <div className={classes.margin}>
                <Typography className={classes.typography} variant="h6">
                  Description :
                </Typography>
              </div>
              <Typography className={classes.coursedetail}>
                {" "}
                {course.description}{" "}
              </Typography>
            </div>
          </Paper>
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={6}>
              <FormComponents.Select
                fullWidth
                className={classes.dropdown}
                label="Select Video"
                name="id"
                onChange={handleInputChange}
                value={values.id}
                options={VIDs}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                className={classes.detailButton}
                target="_blank"
                href={course.link}
              >
                {" "}
                Download course material{" "}
              </Button>
            </Grid>
            <Grid item xs={12}>
              {videos[values.id]?.source && (
                <MyVideoPlayer url={videos[values.id].source} />
              )}
            </Grid>
          </Grid>

          {localStorage.getItem("role") === "tutor" && (
            <Typography className={classes.typography}>
              Enrolled students
            </Typography>
          )}

          {localStorage.getItem("role") === "student" && (
            <Box>
              <Typography className={classes.typography} variant="h6">
                Rate This Course
              </Typography>
              <Paper
                className={classes.ratingPaper}
                variant="outlined"
                component="div"
                elevation={3}
              >
                <RatingForm></RatingForm>
              </Paper>
            </Box>
          )}
        </Container>
      )}
    </div>
  );
}
