import React, { useState } from "react"
import { makeStyles, AppBar, Toolbar, Typography, Button, IconButton, Box, Drawer, List, ListItem, ListItemText } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
        color: '#FFFFFF'
    },
    title: {
        flexGrow: 1,
    },
    drawer: {
        width: '240px',
        flexShrink: 0,
    },
    appBar: {
        background: '#333333',
        zIndex: theme.zIndex.drawer + 1,
    },
    list: {
        width: 240,
    },
}));

const mobile = { md: 'block', desktop: 'none' }
const desktop = { sm: 'none', md: 'none', desktop: 'block' }
  
export default function Navbar() {

    const classes = useStyles();
    const isLogin = false
    const inbox = 1
    const notify = 1
    const [isDrawerOpen, setDrawerOpen] = useState(false)

    const toggleDrawer = (state) => () => {
        setDrawerOpen(state)
    }

    const drawerItem = () => (
        <div
            className={classes.list}
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {['Home', 'Course', 'Livestream', 'Q&A', 'Account', 'Help Center'].map((text) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <Box display={mobile}>
                        <IconButton className={classes.menuButton} onClick={toggleDrawer(true)} edge="start">
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Typography variant="h6" color="secondary">OffDemand</Typography>
                    <Box display={desktop}>
                        <Button color="secondary">Home</Button>
                        <Button color="secondary" href="/courses">Course</Button>
                        <Button color="secondary">Livestream</Button>
                        <Button color="secondary">Q&A</Button>
                        <Button color="secondary">Account</Button>
                        <Button color="secondary">Help Canter</Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer className={classes.drawer} onClose={toggleDrawer(false)} open={isDrawerOpen} anchor="left">
                {drawerItem()}
            </Drawer>
            <Toolbar />
        </div>
    );
}