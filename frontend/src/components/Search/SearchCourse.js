import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Grid, ListItem, Paper, Typography , Button , Select ,MenuItem ,FormControl,InputLabel} from '@material-ui/core'
import TextFieldSmall from '../TextFieldSmall'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import data from "./data";



const useStyles = makeStyles((theme) => ({

    title: {
        color: '#FFFFFF',
        marginTop: '1rem',
        marginBottom:'1rem'
    },
    typography: {
        color: '#FFFFFF',
    },
    grid: {
        height: '100%',
        padding : '1rem',
    },
    textFieldSmall: {
        marginBottom: 8,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
      },
    paper: {
        padding: theme.spacing(2),
        margin: '1rem',
        background : '#4f4f4f',
        
        
    },
    dropdown: {
        marginBottom: 8,
        height:40,
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
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },

    courseofweek: {
        height: 'auto',
        padding : theme.spacing(1),
        background: '#9f9f9f',

    },
    courseImage:{
        margin: 'auto',
        display: 'block',
        minHeight: '150px',
        minWidth: '260px',
        maxWidth: '260px',
        maxHeight: '150px',
        
    },
    courseText:{
        align: 'center'
    },
    margin:{
        margin:theme.spacing(1)
    },
    Button:{
        backgroundColor :'#212121',
        border:'1.5px solid',
        bordercolor:'#0EED0E',
        padding: '3px',
        margin: '1rem',
        color:'primary',
        '&:hover': {
            backgroundColor: '#212121',
            boxShadow: 'none',
          },
    }
}));

export default function SearchCourse() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [result,setResult] = React.useState(false);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

      
    const handleResult = () => {
        result === true ? setResult(false):setResult(true);
      };

    const classes = useStyles();


    return (
      <Container fixed>
        <Typography variant="h4" className={classes.title}>Search Course </Typography>
        <Paper className={classes.paper}>
            <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={3}>
                    <Typography variant = 'h5' className = {classes.typography}> Course Name : </Typography>
                </Grid>
                <Grid item xs={9}>
                <TextFieldSmall

                />
                </Grid>
                <Grid item xs={3}>
                    <Typography variant = 'h5' className = {classes.typography}> Tutor Name : </Typography>
                </Grid>
                <Grid item xs={9}>
                <TextFieldSmall

                />
                </Grid>
                <Grid item xs={3}>
                    <Typography variant = 'h5' className = {classes.typography}> Subject : </Typography>
                </Grid>
                <Grid item xs={9}>
                <Select fullWidth id="demo-simple-select-filled" className={classes.dropdown} >
                    <MenuItem value="" >
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Math</MenuItem>
                    <MenuItem value={20}>Biology</MenuItem>
                    <MenuItem value={30}>Physic</MenuItem>
                </Select>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant = 'h5' className = {classes.typography}> Price : </Typography>
                </Grid>
                <Grid item xs={4}>
                <TextFieldSmall
                    placeholder="Min"

                />
                </Grid>
                <Grid item xs={1} alignContent='center'>
                    <Typography variant = 'h5' className = {classes.typography} align='center'> -</Typography>
                </Grid>
                <Grid item xs={4}>
                <TextFieldSmall
                    placeholder="Max"
                />
                </Grid>
                <Button variant="outlined" color="primary" fullWidth className={classes.Button} onClick={handleResult}  > Search </Button>
            </Grid>
        </Paper>
        {result === true ? 
            <Typography variant="h4" className={classes.title} >Results </Typography>
        
            : <Typography variant="h4" className={classes.title} > No Result </Typography>}
        {result === true &&
        data.courses.map((cow) => (
                <Paper className = {classes.paper}>
                <img src= {cow.img} className={classes.courseImage}/>
                <Typography align='center' variant="subtitle1" className={classes.typography}> {cow.name} </Typography>
                <Button variant="outlined" color="primary" fullWidth className={classes.detailButton} href={'/course/'+cow.id} > see detail </Button>
                </Paper>

            ))}

      </Container>
    )
}