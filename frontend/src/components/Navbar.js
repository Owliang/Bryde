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
}));

const mobile = { md: 'block', desktop: 'none' }
const desktop = { sm: 'none', md: 'none', desktop: 'block' }
  
export default function Navbar() {

    const classes = useStyles();
    const username = localStorage.getItem('username')
    const inbox = 7
    const notify = 4
    const profile = 2
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
        window.location.reload();
    }

    const inboxContent = [1,2,3].map(num => (
        <Box onClick={handleLogout}>Logout</Box>
    ))

    const notifyContent = [1,2,3].map(num => (
        <Box onClick={handleLogout}>Logout</Box>
    ))

    const profileContent = [1,2,3].map(num => (
        <Box onClick={handleLogout}>Logout</Box>
    ))

    const NavButton = ((props) => (
        <ButtonLink
            variant="contained"
            color="secondary"
            path={props.path}
            className={classes.navButton}
        >
            {props.children}
        </ButtonLink>
    ))

    const NavDropDown = ((props) => {
        const {title, children, ...prop} = props
        return (
            <DropDownMenu
                variant="contained"
                color="secondary"
                title={title}
                className={classes.navDropDown}
            >
                {children}
            </DropDownMenu>
        )
    })

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
                    <Typography variant="h6" color="secondary">
                        OffDemand
                    </Typography>


                    <Box display={desktop}>
                        <NavButton path="/home">Home</NavButton>
                        <NavDropDown title="Course">
                            <NavButton path="/courses">Course</NavButton>
                            <MenuItem component={Link} to="/courses">Course</MenuItem>
                        </NavDropDown>
                        <NavButton path="/qanda">Q&A</NavButton>
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
                        {profileContent}
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