import React, { useEffect, useState } from "react";
import FormComponents from "../FormComponents/FormComponents.js";
import { useFileUpload } from "use-file-upload";
import { Form, useForm } from "../useForm.js";
import {
  Grid,
  IconButton,
  Typography,
  Box,
  InputAdornment,
  makeStyles,
  Dialog,
} from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import axios from "axios";

const myCourseURL = "/myCourse";

const useStyles = makeStyles((theme) => ({
  textRoot: {
    //'& .MuiTextField-root': {
    margin: theme.spacing(1),
    width: "100%",
    color: "#fc1919",
    //},
  },
  icon: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

const initialCourseData = {
  tutor: "",
  name: "",
  subject: "",
  description: "",
  price: "",
  link: "",
};

const subject = [
  { value: "Mathematics", label: "Mathematics" },
  { value: "Science", label: "Science" },
  { value: "Social Studies", label: "Social Studies" },
  { value: "Language", label: "Language" },
  { value: "Arts", label: "Arts" },
  { value: "Other", label: "Other" },
];

const CourseForm = (props) => {
  const { tutor: curTutor, setDialog: setAlert } = props;
  const [photo, selectPhoto] = useFileUpload();
  const classes = useStyles();
  console.log(`cur tutorfrom course Form ${curTutor}`);

  useEffect(() => {
    photo ? validate({ photo: photo }) : validate({ foo: "" });
  }, [photo]);

  const validate = (fieldValues = { ...courseData, photo: photo }) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name != "" ? "" : "This field is required.";
    if ("tutor" in fieldValues)
      temp.tutor = fieldValues.tutor != "" ? "" : "Please Login First";
    if ("subject" in fieldValues)
      temp.subject = fieldValues.subject != "" ? "" : "This field is required.";
    if ("price" in fieldValues) {
      temp.price = fieldValues.price != "" ? "" : "This field is required.";
      temp.price =
        temp.price || /^[0-9]{1,10}$/.test(fieldValues.price)
          ? temp.price
          : "Price should be integer.";
      temp.price =
        temp.price || fieldValues.price.length < 6
          ? temp.price
          : "Price is too expensive.";
    }
    if ("link" in fieldValues)
      temp.link =
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
          fieldValues.link
        ) || !fieldValues.link
          ? ""
          : "URL is not valid.";
    if ("photo" in fieldValues)
      temp.photo = fieldValues.photo ? "" : "Course's Image is required.";
    setErrors((errors) => ({
      ...temp,
    }));
    console.log("fieldValues", fieldValues);
    console.log({ ...courseData, photo: photo });
    console.log(`errors from validate${JSON.stringify(errors)}`);
    console.log(`temp from validate${JSON.stringify(temp)}`);

    if (fieldValues == { ...courseData, photo: photo })
      console.log(
        "Validate Return",
        Object.values(temp).every((x) => x == "")
      );
    return Object.values(temp).every((x) => x == "");
  };

  const {
    values: courseData,
    setValues: setCourseData,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialCourseData, true, validate);

  useEffect(() => {
    setCourseData({ ...courseData, tutor: curTutor });
  }, [curTutor]);

  /*useEffect(() => {
    console.log('Updated errors', JSON.stringify(errors))
  }, [errors]);
  
  useEffect(() => {
    console.log('Updated courseData', JSON.stringify(courseData))
  }, [courseData]);*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sumbit Hit");
    console.log(`cur tutor from course Form Submit ${curTutor}`);
    console.log(`Data's tutor from submit ${JSON.stringify(courseData.tutor)}`);
    console.log(`Data from submit ${JSON.stringify(courseData)}`);

    if (validate()) {
      let formData = new FormData();
      for (let key in courseData) {
        formData.append(key, courseData[key]);
      }
      let attatch_videos = [];
      /*var nVideo = videos?.length;
      for(var i=0; i<nVideo ;i++){
        formData.append('attatch_video_'+i, videos[i].file);
      }*/
      formData.append("attatch_photo", photo.file);
      //formData.append('total_video', nVideo);
      //window.alert(JSON.stringify({context:'Creating Course',data:{...courseData, attatch_photo : files.file }}, null, 2));
      console.log(attatch_videos);
      console.log([...formData]);
      axios
        .post("http://localhost:4000/create_course", formData, {
          crossdomain: true,
        })
        .then((response) => {
          console.log("response: ", response);
          var isSuccess = response.data.result;
          if (isSuccess) {
            var cid = response.data.id;
            setAlert({
              title: "Create Course Success!",
              open: true,
              message:
                "Create Successfully. Do you want to upload course's video now or later",
              optionMessage: "Add Now",
              optionRefTo: "/course_video",
              //optionRefTo : `/course_video?cid=${cid}`,
              mainMessage: "Add Later",
              mainRefTo: myCourseURL,
            });
          } else {
            setAlert({
              title: "Create Course Fail!",
              open: true,
              message: `Create Course Failed`,
              submessage: response.data.error,
              optionMessage: "Try Again",
            });
          }
        })
        .catch((err) => {
          setAlert({
            title: "Create Course Failed",
            open: true,
            message:
              "An error occured during sending results to server, Please try again later and make sure that server is on.",
            submessage: err.name + ": " + err.message,
            optionMessage: "Try Again",
          });
          //window.alert('Error', JSON.stringify(err, null, 2));
          console.error(err);
        });
    } else {
      console.log(`errors from submit error ${JSON.stringify(errors)}`);
      if (errors.tutor) {
        setAlert({
          title: "I don't know who R U",
          open: true,
          message: errors.tutor,
          mainMessage: "Login",
          optionMessage: "Go Home",
          optionRefTo: "/",
        });
        await new Promise((resolve) => setTimeout(resolve, 20000));
        window.location.href = "/";
      } else {
        setAlert({
          title: "Create Course Failed",
          open: true,
          message: "Some Fields Are Not Valid",
        });
      }
      //window.alert( JSON.stringify({context:'Information not valid',data:courseData,error:errors}, null, 2));
    }
  };

  return (
    <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Grid container justify="space-around" alignItems="center">
        <Grid item xs={12} md={6}>
          <FormComponents.PreviewAvatar
            src={photo?.source}
            onChange={() => {
              validate({ photo: photo });
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid
            container
            spacing={1}
            direction="column"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                variant="contained"
                onClick={() => {
                  selectPhoto(
                    { accept: "image/*" },
                    ({ name, size, source, file }) => {
                      console.log("Files Selected", {
                        name,
                        size,
                        source,
                        file,
                      });
                    }
                  );
                }}
              >
                <PhotoCamera fontSize="large" className={classes.icon} />
                Upload Course Photo
              </IconButton>
            </Grid>
            <Grid item>
              <FormComponents.TextInput
                className={classes.textRoot}
                variant="outlined"
                label={errors.photo ? "!!    Please Upload Image    !!" : ""}
                error={errors.photo}
                disabled
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid item xs={12}>
        <FormComponents.TextInput
          label="Course Name"
          value={courseData.name}
          name="name"
          onChange={handleInputChange}
          error={errors.name}
          fullWidth
        />
      </Grid>
      <Grid container spacing={3} justify="space-between">
        <Grid item xs={5}>
          <FormComponents.TextInput
            label="Course Price"
            placeholder="1000"
            name="price"
            onChange={handleInputChange}
            value={courseData.price}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">Bath</InputAdornment>
              ),
            }}
            error={errors.price}
          />
        </Grid>
        <Grid item xs={5}>
          <FormComponents.Select
            label="Select Course Subject"
            name="subject"
            onChange={handleInputChange}
            value={courseData.subject}
            error={errors.subject}
            options={subject}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <FormComponents.TextInput
          multiline
          rows="4"
          label="Course Description"
          name="description"
          onChange={handleInputChange}
          value={courseData.description}
          fullWidth
          error={errors.description}
        />
      </Grid>
      <Grid item xs={12}>
        <FormComponents.TextInput
          label="Link to your course material (Link or Drive)"
          name="link"
          onChange={handleInputChange}
          value={courseData.link}
          fullWidth
          error={errors.link}
        />
      </Grid>
      <br />
      <br />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={4}>
          <FormComponents.SimpleButton
            text="Submit"
            onClick={handleSubmit}
          />
        </Grid>
      </Grid>
    </Form >
  );
};

export default CourseForm;
