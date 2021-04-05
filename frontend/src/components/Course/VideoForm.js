import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFileUpload } from "use-file-upload";
import { styled } from '@material-ui/core/styles';
import VideoThumbnail from 'react-video-thumbnail';
import FormComponents from "../FormComponents/FormComponents.js";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import { green } from "@material-ui/core/colors";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
  Button,
  Grid,
  Box,
  Typography,
  makeStyles,
  CircularProgress,
  IconButton
} from "@material-ui/core";
import RenameForm from "./RenameForm.js";

const myCourseURL = "/myCourse";

const GridIcon = styled(({ color, ...other }) => <IconButton {...other} />)({
  color: (props) =>
    props.color === 'red'
      ? 'red'
      : ' #00ff23 ',
  margin: 3,
});

const useStyles = makeStyles((theme) => ({
  video: {
    margin: theme.spacing(3),
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
  icon: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  gridicon: {
    color: (props) =>
      props.color === 'red'
        ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
        : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  },
  gridroot: {
    margin: theme.spacing(3),
    width: "95%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    overflow: "hidden",
    backgroundColor: "#424242",
    borderRadius: 20,
  },
  gridList: {
    width: 1000,
    height: 500,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
}));

const humanFileSize = (size) => {
  var i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    " " +
    ["B", "kB", "MB", "GB", "TB"][i]
  );
};

const CourseVideo = (props) => {
  const { tutor: curTutor, setDialog: setAlert, CID, mode, initialCourseData } = props;
  const [videos, setVideos] = useState([]);
  const [popup, setPopup] = useState("");
  const [loading, setLoading] = useState(false);
  const [newVideos, selectNewVideos] = useFileUpload();
  const classes = useStyles(props);

  useEffect(() => {
    if (mode === "edit") {
      let tempVideos = []
      let n = initialCourseData.videos.length
      for (let i = 0; i < n; i++) {
        tempVideos.push({
          name: initialCourseData.videos_name[i],
          size: initialCourseData.videos[i].size,
          source: initialCourseData.videos[i].path,
          file: initialCourseData.videos[i],
        })
      }
      setVideos(tempVideos)
    }
  }, [1]);

  useEffect(() => {
    setLoading(false);
    console.log(`videos`, videos)
  }, [videos]);

  const handleSubmit = () => {
    let formData = new FormData();
    var nVideo = videos?.length;
    for (var i = 0; i < nVideo; i++) {
      formData.append("attatch_video_" + i, videos[i].file);
      formData.append("attatch_video_name" + i, videos[i].file);
    }
    formData.append("total_video", nVideo);
    formData.append("id", CID);
    console.log("submited");
    axios
      .post("http://localhost:4000/add_video", formData, { crossdomain: true, })
      .then((response) => {
        console.log("response: ", response);
        var isSuccess = response.data.result;
        if (isSuccess) {
          var cid = response.data.id;
          setAlert({
            title: "Add Course's Video Success!",
            open: true,
            message: "Add Video Successfully.",
            optionMessage: "Back",
            optionRefTo: myCourseURL,
          });
        } else {
          setAlert({
            title: "Add Video Fail!",
            open: true,
            message: "Add Video Failed !",
            submessage: response.data.error,
            optionMessage: "Try Again",
          });
        }
      })
      .catch((err) => {
        setAlert({
          title: "There are Server Failure",
          open: true,
          message:
            "An error occured during sending results to server, Please try again later and make sure that server is on.",
          submessage: err.name + ": " + err.message,
          optionMessage: "Try Again",
        });
        console.error(err);
      });
  };

  const handleClose = () => {
    setPopup({ open: false });
  };

  return (
    <Grid
      container
      //direction="column"
      justify="space-between"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Typography variant="h6" color="primary" gutterBottom>
          <Box fontWeight="fontWeightBold" m={1}>
            Course name: {initialCourseData.name}
          </Box>
        </Typography>
        <FormComponents.SingleFieldPopup
          title="Change Video's Name"
          open={popup.open}
          handleClose={handleClose}
        >
          <RenameForm
            value={popup.value}
            setValue={(newValue) => {
              setVideos(
                videos.map((item, id) =>
                  id === popup.index
                    ? { ...item, name: newValue }
                    : item
                ))
            }}
            handleClose={handleClose}
          />
        </FormComponents.SingleFieldPopup>
      </Grid>
      <Grid item xs={12}>
        {videos?.length > 0 ? (
          <div className={classes.gridroot}>
            <br />
            <br />
            <GridList cellHeight={250} className={classes.gridList}>
              <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
                <ListSubheader component="div" color="primary" variant='h5'>
                  Video List
                </ListSubheader>
              </GridListTile>
              {videos.map((video, index) => (
                <GridListTile key={`${index}${video.name}`}>
                  <VideoThumbnail
                    videoUrl={video.source}
                    thumbnailHandler={(thumbnail) => console.log(thumbnail)}
                    width={425}
                    height={240}
                  />
                  <GridListTileBar
                    title={video.name}
                    subtitle={<span>size: {humanFileSize(video.size)}</span>}
                    actionIcon={
                      <Box>
                        <GridIcon id={index} aria-label={`rename id ${index}`}
                          onClick={(event) => {
                            console.log('edit click at ', index)
                            setPopup({
                              open: true,
                              value: videos[index].name,
                              index: index
                            })
                          }}
                        >
                          <EditTwoToneIcon />
                        </GridIcon>
                        <GridIcon id={video.id} aria-label={`delete id ${video.id}`} color='red'
                          onClick={(event) => {
                            console.log('delete click at ', index)
                            setVideos(videos.filter((item, id) => id !== index))
                          }}
                        >
                          <DeleteTwoToneIcon />
                        </GridIcon>
                      </Box>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
        ) : (
          <Typography
            variant="h5"
            display="block"
            gutterBottom
            color="secondary"
            align="center"
          >
            <Box m={1}>
              <br />
              Currently, No Video Uploaded.
            </Box>
          </Typography>
        )}
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={async () => {
              selectNewVideos({ accept: "video/*", multiple: true }, (selectvideos) => {
                selectvideos.map(({ source, name, size, file }) => {
                  console.log({ source, name, size, file });
                });
                setVideos([
                  ...videos,
                  ...selectvideos,
                ])
              });
              //console.log(nVideo)
              console.log("select Done.",);
            }}
          >
            <Typography component="div"> Add More Video </Typography>
            <CloudUploadOutlinedIcon className={classes.icon} />
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <FormComponents.SimpleButton text="Submit" onClick={handleSubmit} />
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
};

export default CourseVideo;
