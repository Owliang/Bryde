import React, { useState } from "react"
import { makeStyles, AppBar, Toolbar, Typography, Button, IconButton, Box, Drawer, List, ListItem, ListItemText, Badge, Menu, MenuItem, Link } from '@material-ui/core'
import { useHistory } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import ButtonLink from './ButtonLink'
import DropDownMenu from './DropDownMenu'

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
    navButton: {
        height: '32px', 
        marginRight: '8px',
    },
    logo: {
        marginRight: '24px',
    },
}));

const mobile = { md: 'block', desktop: 'none' }
const desktop = { sm: 'none', md: 'none', desktop: 'block' }
  
export default function Navbar() {

    const classes = useStyles();
    const username = localStorage.getItem('username')
    const inbox = 4
    const notify = 3
    const profile = 0
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
                {['home', 'courses', 'qanda'].map((text) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    )

    const handleLogout = () => {
        localStorage.setItem('username', '')
        localStorage.setItem('auth', false)
        history.push("/")
        window.location.reload()
    }

    const handleProfile = () => {
        history.push("/profile")
        window.location.reload();
    }

    const handleHome = () => {
        history.push("/home")
        window.location.reload();
    }

    const handleMycourse = () => {
        history.push("/mycourse")
        window.location.reload();
    }

    const handleCourse = () => {
        history.push("/courses")
        window.location.reload();
    }

    const handleDashboard = () => {
        history.push("/qanda")
        window.location.reload();
    }

    const handleFollowingQuestion = () => {
        history.push("/qanda/follow")
        window.location.reload();
    }

    const inboxContent = ['inbox1','inbox2','inbox3','inbox4'].map(content => (
        <Box onClick={handleLogout}>{content}</Box>
    ))

    const notifyContent = ['notify1','notify2'].map(content => (
        <Box onClick={handleLogout}>{content}</Box>
    ))

    const profileContent = [1,2,3].map(num => (
        <>
        </>
    ))

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <Box display={mobile}>
                        <IconButton
                            className={classes.menuButton}
                            onClick={toggleDrawer(true)}
                            edge="start"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Typography variant="h6" color="secondary" className={classes.logo} >
                        OffDemand
                    </Typography>

                    <Box display={desktop}>
                        <Button
                            color="secondary"
                            className={classes.navButton}
                            onClick={handleHome}
                        >
                            Home
                        </Button>
                        <DropDownMenu
                            title='Course'
                            color="secondary"
                            className={classes.navButton}
                        >
                            <Box onClick={handleCourse}>Search Course</Box>
                            <Box onClick={handleMycourse}>My course</Box>
                        </DropDownMenu>
                        <DropDownMenu
                            title='Q&A'
                            color="secondary"
                            className={classes.navButton}
                        >
                            <Box onClick={handleDashboard}>Dashboard</Box>
                            <Box onClick={handleFollowingQuestion}>Folowing Question</Box>
                        </DropDownMenu>
                    </Box>

                    <div className={classes.grow} />

                    <DropDownMenu
                        title={
                            <Badge
                                badgeContent={inbox}
                                color="primary"
                                children={<MailIcon color="secondary"/>}
                                max={99}
                            />
                        }
                    >
                        {inboxContent}
                    </DropDownMenu>

                    <DropDownMenu
                        title={
                            <Badge
                                badgeContent={notify}
                                color="primary"
                                children={<NotificationsIcon color="secondary"/>}
                                max={99}
                            />
                        }
                    >
                        {notifyContent}
                    </DropDownMenu>

                    <DropDownMenu
                        title={
                            <Badge
                                badgeContent={profile}
                                color="primary"
                                children={<AccountCircle color="secondary"/>}
                                max={99}
                            />
                        }
                    >
                        <Box>Loggin as : {localStorage.getItem('username')}</Box>
                        <Box onClick={handleProfile}>Profile</Box>
                        <Box onClick={handleLogout}>Logout</Box>
                    </DropDownMenu>
                </Toolbar>
            </AppBar>

            {/* navbar for mobile */}
            <Drawer
                className={classes.drawer}
                onClose={toggleDrawer(false)}
                open={isDrawerOpen}
                anchor="left"
            >
                {drawerItem()}
            </Drawer>

            <Toolbar />
        </div>
    );
}