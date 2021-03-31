import React, { useState } from "react"
import { makeStyles, AppBar, Toolbar, Typography, Button, IconButton, Box, Drawer, List, ListItem, ListItemText, Badge, Menu, MenuItem } from '@material-ui/core'
import { useHistory } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import ButtonLink from './ButtonLink'

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
    grow: {
        flexGrow: 1,
    },
}));

const mobile = { md: 'block', desktop: 'none' }
const desktop = { sm: 'none', md: 'none', desktop: 'block' }
  
export default function Navbar() {

    const classes = useStyles();
    const username = localStorage.getItem('username')
    const inbox = 7
    const notify = 4
    const [isDrawerOpen, setDrawerOpen] = useState(false)
    const history = useHistory()

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
                {['home', 'courses', 'livestream', 'qanda', 'account', 'help', 'report'].map((text) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    )

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.setItem('username', '')
        localStorage.setItem('auth', false)
        history.push("/")
        window.location.reload();
    }

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
                    <ButtonLink color="secondary" path="/home">Home</ButtonLink>
                        <ButtonLink color="secondary" path="/courses">Course</ButtonLink>
                        <ButtonLink color="secondary" path="/livestream">Livestream</ButtonLink>
                        <ButtonLink color="secondary" path="/qanda">Q&A</ButtonLink>
                        <ButtonLink color="secondary" path="/account">Account</ButtonLink>
                        <ButtonLink color="secondary" path="/helpcenter">Help Center</ButtonLink>
                        <ButtonLink color="secondary" path="/report">Report</ButtonLink>
                    </Box>
                    <div className={classes.grow} />
                    <div>
                        <IconButton>
                            <Badge badgeContent={inbox} color="primary">
                                <MailIcon color="secondary"/>
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <Badge badgeContent={notify} color="primary">
                                <NotificationsIcon color="secondary"/>
                            </Badge>
                        </IconButton>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="secondary"
                        >
                            {username}
                            <AccountCircle color="secondary"/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer className={classes.drawer} onClose={toggleDrawer(false)} open={isDrawerOpen} anchor="left">
                {drawerItem()}
            </Drawer>
            <Toolbar />
        </div>
    );
}