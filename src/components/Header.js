import React, { Component } from 'react'
import './css/Header.css';
import { Link , withRouter  } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from '@material-ui/core//Drawer';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import Container from '@material-ui/core/Container';


import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ImageSearchRoundedIcon from '@material-ui/icons/ImageSearchRounded';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import PublishIcon from '@material-ui/icons/Publish';



import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Badge from '@material-ui/core/Badge';


import { AuthContext } from '../context/AuthContext';
import firebase from 'firebase';
import swal from 'sweetalert';


const drawerWidth = 240;
const styles = theme => ({
    root: {
        flexGrow: 1,
    },

    menuButton: {
        // marginRight: theme.spacing(2),
        margin: "0px",
        padding: "0px",
        color: "#191b26",
    },
    title: {
        flexGrow: 1,
        padding: theme.spacing(0.5),
        maxWidth: "fit-content",
        marginRight: "auto",
        '& img': {
            width: "40px",
            marginRight: "10px",
        }
    },
    desktopList: {
        '& >*': {
            padding: theme.spacing(2)
        },
        '& .Header-menuButton-2.MuiIconButton-edgeStart': {
            padding: "0px",
            margin: "0px",
        },
    },

    header: {
        background: "#fff",
        boxShadow: "0 0 60px rgba(0,0,0,.12)",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    link: {
        color: "#191b26",
        fontSize: "14px",
        textTransform: "capitalize",
        borderLeft: "1px solid #eee",
        fontFamily: "Open Sans,sans-serif",
        '& *': {
            fontFamily: "Open Sans,sans-serif",
            color: "#191b26",
        },
        '& .MuiBadge-colorSecondary': {
            color: "white",
        },
        '&:hover': {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            color: "#191b26",
        }
    },
    join: {
        marginLeft: "20px",
        padding: "9px 27px!important",

        height: "fit-content",
        alignSelf: "center",

        color: "#fff!important",
        backgroundColor: "#02be6e!important",
        textDecoration: "none!important",
        borderRadius: "50px!important",
        fontSize: "14px",
        textTransform: "capitalize",
        fontFamily: "Open Sans,sans-serif",
        '& *': {
            fontFamily: "Open Sans,sans-serif",
            color: "#fff!important",
        }
    },

    search: {
        background: "#f4f4f5",
        display: "flex",
        border: "none",
        marginLeft: "24px",
        marginRight: "auto",
        borderRadius: theme.shape.borderRadius,
        zIndex: "1",
        maxWidth: "800px",
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            marginRight: "auto",
        },
    },
    searchIcon: {

        border: "none",
        background: "0 0",
        borderTopRightRadius: "6px",
        borderBottomRightRadius: "6px",
        display: "-webkit-box",
        display: "flex",
        "-webkit-box-align": "center",
        alignItems: "center",
        "-webkit-box-pack": "center",
        justifyContent: "center",
        padding: " 0 1rem",
        cursor: "pointer",
        zIndex: 1,
        color: "#5e5e5e",
        background: "transparent",
    },
    inputRoot: {
        color: 'inherit',
        margin: "0px",
        width: "-webkit-fill-available",
        "& .MuiInputBase-input.Header-inputInput-14": {
            margin: "0px",
            borderBottom: "none",
            borderTopLeftRadius: "6px",
            borderBottomLeftRadius: "6px",
            paddingLeft: "5px",
            background: "transparent",
            fontSize: "17px",
            fontWeight: "300",
        },
        "& input[type=text]:not(.browser-default):focus:not([readonly]), textarea.materialize-textarea:focus:not([readonly]), input[type='email']:not(.browser-default):focus:not([readonly])": {
            borderBottom: "none",
            outline: "none",
            boxShadow: "none",
        },
        "& input[type=text]:not(.browser-default)": {
            background: "none",
            margin: "auto",
            paddingLeft: "10px",
            border: "none",
        },
    },
    inputInput: {
        display: "block",
        "-webkit-box-flex": 1,
        flex: 1,
        background: "transparent",
        border: "none",
        color: "#1a1a1a",
        zIndex: 1,
        width: '100%',
    },

    darkMode: {
        backgroundColor: "#232a34",
        '& .MuiTypography-root Header-title-8.MuiTypography-body1': {
            marginRight: "10px",
        },
        '& .Header-link-9, .Header-menuButton-2.MuiIconButton-edgeStart': {
            color: "#dddee0!important",
            '&:hover': {
                color: "#5e5e5e!important",
            }
        },
        '& span *': {
            color: "#dddee0!important",
            '&:hover': {
                color: "#5e5e5e!important",
            }
        }
    }

});



class Header extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            mobileOpen: false,
            isHomePage: false,
            cartItems: null,
            search: "",
        };     

    }

  

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };


  
    componentDidMount = () => {


        if (window.location.pathname === '/home' || window.location.pathname === '/') {
            this.setState({ isHomePage: true });
        } else {
            this.setState({ isHomePage: false })
        }

        var existing = localStorage.getItem('cartItems');

        existing = existing ? JSON.parse(existing) : [];

        if (existing.length > 0) {
            this.setState({ cartItems: existing.length })
        }
    }

    getUpdate = () => {
        this.componentDidMount();
    }

    loadImages = () => {
        window.location.pathname = "/photos/all"
    }


    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    searchResult = () => {

        var category;

        var parentCategory = window.location.pathname;
        parentCategory.indexOf(1);
        parentCategory.toLowerCase();
        parentCategory = parentCategory.split("/")[1];

        if (parentCategory === "photos") {

            var categoryName = window.location.pathname;
            categoryName.indexOf(2);
            categoryName.toLowerCase();
            categoryName = categoryName.split("/")[2];

            category = categoryName
        }else if(parentCategory === "search"){

            var parentSearch = window.location.pathname;
            parentSearch.indexOf(2);
            parentSearch.toLowerCase();
            parentSearch = parentSearch.split("/")[2];

            return window.location.pathname = `/search/${parentSearch}/${this.state.search}`
    
        }
        else {
            category = "all"
        }

        if (this.state.search !== "") {
            
            if(this.props.history){
                this.props.history.push({
                    pathname: `/search/${category}/${this.state.search}`,
                });
            }else{
                window.location.pathname = `/search/${category}/${this.state.search}`
            }
            
    
        }
    }
    logout = () => {
        firebase.auth().signOut().then(() => {
            swal("logut", "Sucessfully Logout", "success");

        }).catch((error) => {
            alert("Something Went Wrong Please Try Again");
        });
    }
    render() {

        const { classes, theme } = this.props;
        const Logo = require('../images/logo.PNG');


        return (
            <AuthContext.Consumer>
                {(auth) => {
                    return (
                        <>
                            <div className={classes.root}>

                                <AppBar className={`${classes.header}  ${this.state.isHomePage === false ? classes.darkMode : ""} `} position="sticky">

                                    <Container maxWidth="lg">
                                        <Toolbar>

                                            <Typography className={classes.title}>
                                                <Link to="/" > <img src={Logo} alt="logo" /></Link>
                                                {/* <a onClick={() => window.location.pathname = "/"} style={{ cursor: "pointer" }} >  <img src={Logo} alt="logo" /></a> */}
                                            </Typography>

                                            {this.state.isHomePage === false ?

                                                <form className={classes.search} onSubmit={(event) => {
                                                    event.preventDefault();
                                                    this.searchResult()
                                                }}>
                                                    <InputBase
                                                        placeholder="Search for free photos"
                                                        classes={{
                                                            root: classes.inputRoot,
                                                            input: classes.inputInput,
                                                        }}
                                                        name="search"
                                                        onChange={this.handleChange}
                                                        inputProps={{ 'aria-label': 'search' }}
                                                    />
                                                    <div className={classes.searchIcon} onClick={this.searchResult} >
                                                        <SearchIcon />
                                                    </div>
                                                </form>


                                                : null
                                            }

                                            <Box className={classes.desktopList} display={{ xs: 'none', sm: 'inline-flex', md: 'inline-flex' }} component="span" m={1}>
                                                <Link to="/" className={classes.link} style={{ borderLeft: "none", cursor: "pointer", color: "#191b26" }} color="inherit">
                                                    Home
                                                </Link>
                                                <Link to="/photos/all" style={{ cursor: "pointer", color: "#191b26" }} className={classes.link} color="inherit">
                                                    Images
                                                </Link>
                                                <Link to="/cart" className={classes.link} color="inherit">
                                                    <Badge badgeContent={this.state.cartItems} color="secondary">
                                                        Cart
                                                </Badge>

                                                </Link>
                                                {auth.user.role === "admin" ?
                                                    <Link to="/user/dashboard" className={classes.link} color="inherit">
                                                        UpLoad
                                                    </Link>
                                                    : null}
                                                {!auth.isAuthenticated ?
                                                    <Link to="/login" className={classes.join} color="inherit">
                                                        Login
                                                </Link> :
                                                    <Link to="#" className={classes.join} color="inherit">
                                                        <b onClick={this.logout} >Logout</b>
                                                    </Link>}
                                            </Box>
                                            <Box className={classes.desktopList} display={{ xs: 'block', sm: 'none', md: 'none' }} component="span" m={1}>
                                                <IconButton edge="start" onClick={this.handleDrawerToggle} className={classes.menuButton} color="inherit" aria-label="menu">
                                                    <MenuIcon />
                                                </IconButton>
                                            </Box>
                                        </Toolbar>
                                    </Container>
                                </AppBar>

                                <Drawer
                                    className={classes.drawer}
                                    variant="persistent"
                                    anchor="left"
                                    open={this.state.mobileOpen}
                                    onClose={this.handleDrawerToggle}
                                    classes={{
                                        paper: classes.drawerPaper,
                                    }}
                                >
                                    <div className={classes.drawerHeader}>
                                        <IconButton onClick={this.handleDrawerToggle}>
                                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                                        </IconButton>
                                    </div>
                                    <Divider />
                                    <List>
                                        <ListItem className={classes.link} button >
                                            <ListItemIcon>
                                                <HomeRoundedIcon />
                                            </ListItemIcon>
                                            <Link to="/">
                                                <ListItemText primary="Home" />
                                            </Link>
                                        </ListItem>
                                        <ListItem className={classes.link} button >
                                            <ListItemIcon>
                                                <ImageSearchRoundedIcon />
                                            </ListItemIcon>
                                            <Link to="/photos/all" >
                                                <ListItemText primary="Images" />
                                            </Link>
                                        </ListItem>
                                        <ListItem className={classes.link} button >
                                            <ListItemIcon>
                                                <AddShoppingCartRoundedIcon />
                                            </ListItemIcon>
                                            <Link to="/cart" >
                                                <ListItemText primary="Cart" />
                                            </Link>
                                        </ListItem>
                                        {auth.user.role === "admin" ?
                                            <ListItem className={classes.link} button >
                                                <ListItemIcon>
                                                    <PublishIcon />
                                                </ListItemIcon>
                                                <Link to="/user/dashboard" >
                                                    <ListItemText primary="Upload" />
                                                </Link>
                                            </ListItem>

                                            : null}
                                    </List>
                                    <Divider />
                                    <List>

                                        <ListItem className={classes.link} button >
                                            <ListItemIcon>
                                                <ExitToAppRoundedIcon />
                                            </ListItemIcon>

                                            {!auth.isAuthenticated ?
                                                <Link to="/login" >
                                                    <ListItemText primary="Login" />
                                                </Link> :
                                                <Link to="#" >
                                                    <ListItemText onClick={this.logout} primary="Logout" />
                                                </Link>}
                                        </ListItem>
                                    </List>
                                </Drawer>


                            </div>

       
                        </>

                    )
                }}
            </AuthContext.Consumer>

        )
    }
}




export default withStyles(styles, { withTheme: true })(withRouter(Header));






