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



const useStyles = makeStyles((theme) => ({

    typography: {
        color: '#FFFFFF',
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
        height: 220,
        background: '#9f9f9f',

    },
    courseImage:{
        margin: 'auto',
        display: 'block',
        minHeight: '150px',
        minWidth: '260px',
        maxWidth: '260px',
        maxHeight: '150px',
        padding: theme.spacing(1)
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
                <GridListTile >
                <img src="https://www.persona-oz.com/wp-content/uploads/2018/10/school_01-2-1024x404.jpg"/>
                <GridListTileBar title="ADs 1"/>
                </GridListTile>

                <GridListTile >
                <img src="https://d3jlwjv6gmyigl.cloudfront.net/images/2019/11/school1.jpg"/>
                <GridListTileBar title="ADs 2"/>
                </GridListTile>
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
                    <Grid item xs={3}>
                        <Paper className={classes.courseofweek}>
                        <img src="https://image.freepik.com/free-vector/math-background_23-2148146270.jpg" className={classes.courseImage}/>
                        <Typography align='center' variant="subtitle1" className={classes.typography}> Course1 </Typography>
                        <Container>
                            <Button variant="outlined" color="primary" fullWidth className={classes.detailButton} > see detail </Button>
                        </Container>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.courseofweek}>
                        <img src="https://thetechtheories.com/wp-content/uploads/2020/01/Factors-of-Science.png" className={classes.courseImage}/>
                        <Typography align='center' variant="subtitle1" className={classes.typography}> Course2 </Typography>
                        <Container>
                            <Button variant="outlined" color="primary" fullWidth className={classes.detailButton} > see detail </Button>
                        </Container>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.courseofweek}>
                        <img src="http://images.shiksha.com/mediadata/images/articles/1538985491phpKctLgx.jpeg" className={classes.courseImage}/>
                        <Typography align='center' variant="subtitle1" className={classes.typography}> Course3 </Typography>
                        <Container>
                            <Button variant="outlined" color="primary" fullWidth className={classes.detailButton} > see detail </Button>
                        </Container>
                        </Paper>
                    </Grid>
                    <Grid item xs={3} direction = "column">
                        <Paper className={classes.courseofweek}>
                        <img src="https://image.freepik.com/free-vector/english-word-education-banner_66675-157.jpg" className={classes.courseImage}/>
                        <Typography align='center' variant="subtitle1" className={classes.typography}> Course4 </Typography>
                        <Container>
                            <Button variant="outlined" color="primary" fullWidth className={classes.detailButton} > see detail </Button>
                        </Container>
                        
                        </Paper>
                    </Grid>

                
                </Grid>
            </Paper>
        </Box>
         
      </Container>
    )
}