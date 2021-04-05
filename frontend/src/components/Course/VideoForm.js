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
  const { tutor: curTutor, setDialog: setAlert, CID, mode } = props;
  const [videos, setVideos] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [newVideos, selectNewVideos] = useFileUpload();
  const classes = useStyles(props);

  useEffect(() => {
    //* dummy name
    setName("The Course Name");
    axios
      .get("/course", { id: CID }, { crossdomain: true })
      .then((response) => {
        console.log("response: ", response);
        var isSuccess = response.data.result;
        if (isSuccess) {
          setName("The Course Name");
          console.log("Found");
          if(mode === "edit"){
            setVideos(response.data.video)
          }
        } else {
          console.log("Not Found");
        }
      })
      .catch((err) => {
        setAlert({
          title: "Create Course Failed",
          open: true,
          message:
            "An error occured during sending results to server, Please try again later and make sure that server is on.",
          submessage: err.name + ": " + err.message,
          optionMessage: "Try Again Later",
          OptionRefTo: myCourseURL
        });
        console.error(err);
      });
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
            Course name: {name}
          </Box>
        </Typography>
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
                        <GridIcon id={video.id} aria-label={`rename id ${video.id}`}
                          onClick={(event) => {
                            console.log('edit click at ', index)
                            setVideos(
                              videos.map((item, id) =>
                                id === index
                                  ? { ...item, name: "changed" }
                                  : item
                              ))
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
