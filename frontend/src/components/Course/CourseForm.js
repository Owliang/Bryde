import React, { useEffect} from 'react'
import FormComponents from "../FormComponents/FormComponents.js";
import { useFileUpload } from "use-file-upload";
import {Form, useForm} from '../useForm.js';
import {Grid, IconButton, Typography, Box, InputAdornment, makeStyles} from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import axios from 'axios';

import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import {GridList,GridListTile ,GridListTileBar ,ListSubheader, Button } from '@material-ui/core'; //for Video

const useStyles = makeStyles((theme) => ({
    textRoot: {
        //'& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '100%',
          color: '#fc1919'
        //},
    },
    video: {
      margin : theme.spacing(3),
      width: theme.spacing(30),
      height: theme.spacing(30),
    },
    icon: {
      marginLeft : theme.spacing(2),
      marginRight : theme.spacing(2),
    },
    gridroot: {
      margin : theme.spacing(3),
      width: '95%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: '#424242',
      borderRadius: 20
    },
    gridList: {
      width: 500,
      height: 450,
    },
}));

const initialCourseData = {
    tutor:"",
    name: "",
    subject: "",
    description: "",
    price: "",
    link: ""
}

const subject = [
    {value: 'Mathematics',    label: 'Mathematics',},
    {value: 'Science',        label: 'Science',},
    {value: 'Social Studies', label: 'Social Studies',},
    {value: 'Language',       label: 'Language',},
    {value: 'Arts',           label: 'Arts',},
    {value: 'Other',          label: 'Other',},
];

const CourseForm = (props) => {
    const {tutor:curTutor} = props
    const [photo, selectPhoto] = useFileUpload();
    const [videos, selectVideos] = useFileUpload();
    const classes = useStyles();

    useEffect(() => {
        photo ? validate({ 'photo': photo }) : validate({ 'foo' : ""} )
      }, [photo]);

    const validate = (fieldValues = {...courseData, photo:photo}) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
          temp.name = fieldValues.name ? "" : "This field is required."
        if ('tutor' in fieldValues)
          temp.tutor = fieldValues.tutor ? "" : "Please Login First"
        if ('subject' in fieldValues)
          temp.subject = fieldValues.subject ? "" : "This field is required."
        if ('price' in fieldValues){
          temp.price = temp.price || fieldValues.price ? "" : "This field is required."
          temp.price = temp.price || (/^[0-9]{1,10}$/).test(fieldValues.price) ? temp.price : "Price should be integer."
          temp.price = temp.price || fieldValues.price.length < 6 ? temp.price : "Price is too expensive."
          temp.price = temp.price || fieldValues.price ? temp.price : "This field is required."
        }
        if ('link' in fieldValues)
          temp.link = (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/).test(fieldValues.link) || !fieldValues.link ? "" : "URL is not valid."
        if ('photo' in fieldValues)
          temp.photo = fieldValues.photo ? "" : "Course's Image is required."
        setErrors({
            ...temp
        })
        console.log(fieldValues)
        console.log({...courseData, photo:photo})
    
        if (fieldValues == {...courseData, photo:photo})
            console.log(Object.values(temp).every(x => x == ""))
            return Object.values(temp).every(x => x == "")
    }

    const {
        values: courseData,
        setValues: setCourseData,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialCourseData, true, validate);

    useEffect(() => { setCourseData({...courseData,tutor:curTutor })}, [1]);

    const handleSubmit = e => {

        e.preventDefault()
    
        if(errors.tutor){
          window.alert(errors.tutor);
          window.location.href = "/";
        }
        
        if(validate()){
          //await new Promise(resolve => setTimeout(resolve, 2000));
          let formData = new FormData();
          for(let key in courseData){
            formData.append(key,courseData[key]);
          }
          let attatch_videos = [];
          // for(let video in videos){
          //   attatch_video.push(video.file)
          //   formData.append('attatch_video[]', video.file)
          // }
          var nVideo = videos?.length;
          for(var i=0; i<nVideo ;i++){
            formData.append('attatch_video_'+i, videos[i].file);
          }
          formData.append('attatch_photo', photo.file)
          formData.append('total_video', nVideo);
          //window.alert(JSON.stringify({context:'Creating Course',data:{...courseData, attatch_photo : files.file }}, null, 2));
          console.log(attatch_videos)
          console.log([...formData])
          axios
              .post("http://localhost:4000/create_course", formData, { crossdomain: true, })
              .then(response => {
                  console.log("response: ", response)
                  var isSuccess = response.data.result;
                  if(isSuccess){
                   alert(`Course Registered !!!`);
                   window.location.href = "/course";
                  }else{
                   alert(`Register Failed\n${response.data.error}`);
                  }
                  /*setAlert({
                    ...alert,
                    title:"Create Course Success!" ,
                    open : true,
                    message : "Create Success !!",
                    optionButton:"Add another course"
                  });*/
              })
              .catch(err => {
                /*setAlert({
                  ...alert,
                  title:"Create Course Failed" ,
                  open : true,
                  message : "An Error Occured, Please try again later.\n" + err,
                  optionButton:"Try Again"
                });*/
                window.alert('Error', JSON.stringify(err, null, 2));
                console.error(err)
              })
          }else{
            /*setAlert({
              ...alert,
              title:"Create Course Failed" ,
              open : true,
              message : "Some Fields Are Not Valid",
              optionButton: ""
            });*/
            window.alert( JSON.stringify({context:'Information not valid',data:courseData,error:errors}, null, 2));
          }
      }

    return (
        <Form noValidate autoComplete="off" onSubmit={handleSubmit} >
                <Grid container justify="space-around" alignItems="center">
                  <Grid item xs={12} md={6}>
                    <FormComponents.PreviewAvatar 
                    src = { photo?.source } 
                    onChange = { () => { validate({ photo : photo })} }/>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Grid container spacing={1} direction="column" justify="space-between" alignItems="center">
                      <Grid item>
                          <IconButton color='primary' aria-label="upload picture" component="span" variant="contained" 
                            onClick = { () => { 
                              selectPhoto({ accept: "image/*" }, ({ name, size, source, file }) => {
                                console.log("Files Selected", { name, size, source, file });
                              })
                            }}
                          >  
                            <PhotoCamera fontSize="large" className={classes.icon}/>
                            Upload Course Photo 
                          </IconButton>
                      </Grid>
                      <Grid item>
                        <FormComponents.TextInput 
                            className={classes.textRoot}
                            variant = "outlined"
                            label = {errors.photo ? "!!    Please Upload Image    !!" : ""}
                            error = {errors.photo}
                            disabled
                            fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <br/><br/>
                <Grid item xs={12}>
                  <FormComponents.TextInput
                    label = "Course Name"
                    value = {courseData.name}
                    name = "name"
                    onChange={handleInputChange}
                    error = {errors.name}
                    fullWidth
                  />
                </Grid>
                <Grid container spacing={3} justify="space-between">
                  <Grid item xs={5}>
                    <FormComponents.TextInput
                      label = "Course Price"
                      placeholder="1000"
                      name = "price"
                      onChange={handleInputChange}
                      value = {courseData.price}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">Bath</InputAdornment>,
                      }}
                      error = {errors.price}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <FormComponents.Select
                      label="Select Course Subject"
                      name = "subject"
                      onChange={handleInputChange}
                      value={courseData.subject}
                      error = {errors.subject}
                      options = {subject}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <FormComponents.TextInput
                    multiline 
                    rows = "4"
                    label = "Course Description"
                    name = "description"
                    onChange={handleInputChange}
                    value = {courseData.description}
                    fullWidth
                    error = {errors.description}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormComponents.TextInput
                    label = "Link to your course material (Link or Drive)"
                    name = "link"
                    onChange={handleInputChange}
                    value = {courseData.link}
                    fullWidth
                    error = {errors.link}
                  />
                </Grid>
                <br/><br/>
                <Grid
                  container
                  direction="column"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick = { () => { 
                        selectVideos({ multiple: true }, (videos) => {
                          videos.map(({ source, name, size, file }) =>{
                            console.log({ source, name, size, file })
                          })

                        })

                      }}
                    >
                      <Typography component="div"> Upload Course Video </Typography>
                      <CloudUploadOutlinedIcon className={classes.icon}/>
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    {videos ? (
                      <div className={classes.gridroot}>
                      <br/><br/>
                      <GridList cellHeight={180} className={classes.gridList}>
                        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                          <ListSubheader component="div" color="primary">Video List</ListSubheader>
                        </GridListTile>
                        {videos.map((video) => (
                          <GridListTile key={video.source}>
                            <img src={video.source} alt={video.name} />
                            <GridListTileBar
                            title={video.name}
                            subtitle={<span>size: {video.size}</span>}
                            />
                          </GridListTile>
                          ))}
                      </GridList>
                      </div>
                    ) : (
                      <Typography variant="caption" display="block" gutterBottom color='primary'>
                        <Box m={1}>
                        <br/>
                          No File Uploaded.
                        </Box>
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={4}>
                    <FormComponents.SimpleButton
                      text="Submit"
                      onClick={handleSubmit}
                    />
                  </Grid>
                </Grid>
          </Form>
    )
}

export default CourseForm
