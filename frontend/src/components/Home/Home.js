import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Grid, ListItem, Paper, Typography , Button } from '@material-ui/core'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import data from './data.js';




const useStyles = makeStyles((theme) => ({

    typography: {
        color: '#FFFFFF',
        marginTop: '1rem',
        marginBottom:'1rem'
    },
    grid: {
        height: '100%',

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
        margin: 'auto',
        background : '#4f4f4f',
        
        
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
    detailButton:{
        backgroundColor :'#212121',
        border:'1.5px solid',
        bordercolor:'#0EED0E',
        padding: '3px',
        color:'primary',
        '&:hover': {
            backgroundColor: '#212121',
            boxShadow: 'none',
          },
    }
}));

export default function Home() {

    const classes = useStyles();

    return (
      <Container fixed>
          <Box p={2}>
            <Typography variant="h4" className={classes.typography} >
            Up next
            </Typography>
            <GridList className={classes.gridList} cols={1}>
                {data.upnexts.map((upnext) => (
                    <GridListTile >
                    <img src={upnext.img} />
                    <GridListTileBar title={upnext.title} />
                </GridListTile>
                ))}
            </GridList>
        </Box>
        <Box p={2}>
            <Paper className={classes.paper}>
            <Typography variant="h5" align="center" className={classes.typography}>
                    สัมผัสประสบการณ์การเรียนรู้ กับ OffDemand 
                ในหลากหลายช่องทาง หลากหลายรูปแบบที่ไร้ขีดจำกัด…
            </Typography>
            </Paper>
        </Box>
        <Box p ={2}>
            <Typography variant="h4" className={classes.typography}>
                Course of the week
            </Typography>
            <Paper className={classes.paper}>
                <Grid container spacing={3}>
                    {data.cows.map((cow) => (
                        <Grid item xs={3}>
                        <Paper className={classes.courseofweek}>
                        <img src= {cow.img} className={classes.courseImage}/>
                        <Typography align='center' variant="subtitle1" className={classes.typography}> {cow.cname} </Typography>
                        <Button variant="outlined" color="primary" fullWidth className={classes.detailButton} href={'/course/'+cow.id} > see detail </Button>
                        </Paper>
                        </Grid>

                    ))}
                
                </Grid>
            </Paper>
        </Box>
         
      </Container>
    )
}