import React, { Component } from 'react';
import Header from './Header';
import { GalleryContext } from '../context/GalleryContext';
import LoadImages from './LoadImages';
import VerticalAd from './VerticalAd';
import HorizontalAd from './HorizontalAd';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import Button from '@material-ui/core/Button';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

// import GoogleAdsense from 'react-adsense-google';

const styles = theme => ({
    topSearch: {
        background: "#fff",
        borderRadius: "5px",
        border: "1px solid #eee",
        width: "70%",
        margin: "0 auto",
        lineHeight: "40px",
        display: "inline-flex",
        '@media only screen and (max-width: 768px)': {
            width: "100%",
        },
    },
    container: {
        width: "90%",
        margin: "auto",
        textAlign: "center",
        maxWidth: "1400px",
    },
    searchBtn: {
        background: "white",
        border: "none",
        boxShadow: "none",
        borderRadius: "0px",
        '&:hover': {
            boxShadow: "none",
            background: "transparent",
        },
        '&:hover .HomePage-searchIcon-4': {
            color: "#5f5858",
            background: "transparent",
        },
    },
    searchIcon: {
        color: "#6d6d6d",
    },
    topCategories: {
        fontSize: "14px",
        color: "#fff",
        opacity: 0.5,
        width: "70%",
        margin: "auto",
    },

    categoryList: {
        boxShadow: "0 1px 3px 0 rgba(0,0,0,.08)",
        display: "block",
        textAlign: "center",
        '& ul li': {
            fontSize: "12px",
            lineHeight: "26px",
            fontWeight: "600",
            marginTop: theme.spacing(1),
            letterSpacing: ".4px",
            marginBottom: 0,
            display: "inline-flex",
            "-webkit-box-align": "center",
            alignItems: "center",
            padding: "1rem",
            color: "#5e5e5e",
            cursor: "pointer",
            margin: "2px",
            fontFamily: "Open Sans,sans-serif",
        },
        '& ul li.active': {
            color: "#0064f9",
            borderBottom: "4px solid",
        },
        '& ul li:hover': {
            color: "#0064f9",
        },
        '@media only screen and (max-width: 768px)': {
            '& ul li': {
                padding: "5px",
                fontSize: "8px",
            }
        },
        '@media only screen and (max-width: 468px)': {
            '& ul li': {
                fontSize: "8px",
                padding: "0px",
                paddingLeft: "5px",
                fontWeight: "normal",
                lineHeight: "20px",
            }
        },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },

});

class HomePage extends Component {
    static contextType = GalleryContext;

    constructor(props, context) {
        super(props, context);

        this.searchResult = this.searchResult.bind(this);
        this.handleChage = this.handleChage.bind(this);
        this.state = {
            search: '',
            displaySection: "none",
            photos: [],
            backdrop: true,
        }
    }

    componentDidMount = () => {
        // setTimeout(() => {
        // this.setState({displaySection:"block"})
        // },4000);
        // (window.adsbygoogle = window.adsbygoogle || []).push({});
        this.getData();

    }


    getData = () => {
        var gallery = this.context;

        if (gallery.photos.length <= 0) {
            setTimeout(() => {
                this.getData();
            }, 1000)
        } else {

            this.setState({ displaySection: "block", backdrop: false });

        }
    }

    searchResult = () => {
        if (this.state.search !== "") {
            this.props.history.push({
                pathname: `/search/all/${this.state.search}`,
            });
        }

    }
    goToLink = (category) => {
        window.location.pathname = `/photos/${category}`
    }

    handleChage = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {/* <Header /> */}

                <div className="homePageSection1">
                    <div className="container-fluid1">
                        <Header />
                    </div>
                    <div className={classes.container}>
                        <div className="topTitle">
                            <h1>S-Stock</h1>
                            <h3>Find the perfect stock asset for your next creative project</h3>
                        </div>
                        <form className={classes.topSearch} onSubmit={(event) => {
                            event.preventDefault();
                            this.searchResult()
                        }}>
                            <Button type="submit" className={classes.searchBtn} variant="contained">
                                <SearchRoundedIcon className={classes.searchIcon} fontSize="large" />
                            </Button>
                            <input type="text"
                                style={{ padding: "0px 3px", border: "none", margin: "0px", boxShadow: "none", font: "normal 16px Open Sans,sans-serif", letterSpacing: "0.5px" }}
                                onChange={this.handleChage} placeholder="Search Images" name="search" id="search" />
                        </form>
                        <p className={classes.topCategories}>
                            Top Categories: Botanical Flowers And Leaves , Texture , Ornaments And Baroque , Degital Textile Design
                        </p>

                    </div>
                </div>
                <div className="container addSection1" >
                    {/* <!-- horizotal add for main page --> */}

                    {/* <GoogleAdsense
                        adClient='ca-pub-7362256281567785'
                        adSlot='6606615613'
                        style={{ 'display': 'block', textAlign: 'center' }}
                        adLayout='in-article'
                        adFormat='horizontal'
                        fullWidthResponsive='true'
                    /> */}

                    <HorizontalAd />

                </div>
                <div className={classes.categoryList} >
                    <ul>
                        <li className="active" >
                            All
                        </li>
                        <li onClick={() => this.goToLink("ornamentsAndBaroque")} >
                            Ornaments And Baroque
                        </li>
                        <li onClick={() => this.goToLink("texture")} >
                            Texture
                        </li>
                        <li onClick={() => this.goToLink("pattren")}  >
                            Pattren
                        </li>
                        <li onClick={() => this.goToLink("degitalTextileDesign")}  >
                            Degital Textile Design
                        </li>
                        <li onClick={() => this.goToLink("botanicalFlowersAndLeaves")}  >
                            Botanical Flowers And Leaves
                        </li>
                    </ul>
                </div>
                <br />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-10 col-sm-10">
                            <div style={{ display: `${this.state.displaySection}` }} >
                                <LoadImages />
                            </div>
                        </div>
                        <div className="col-md-2 col-sm-2" style={{ borderLeft: "1px solid #d0cdcd", minHeight: "340px", padding: '5px' }}>

                            <VerticalAd />
                            <br />
                            <VerticalAd />

                        </div>
                    </div>
                </div>

                <Backdrop className={classes.backdrop} open={this.state.backdrop} >
                    <CircularProgress color="inherit" />
                </Backdrop>


            </div>
        )
    }
}



HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(HomePage);