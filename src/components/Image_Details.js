import React, { Component } from 'react'
import Header from './Header';
import Footer from './Footer';

// import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

// import Jimp from 'jimp';
import swal from 'sweetalert';

import Carousel, { Modal, ModalGateway } from "react-images";
import { GalleryContext } from '../context/GalleryContext';

// import LoadSimilarImages from './LoadSimilarImages';

import HorizontalAd from './HorizontalAd';
import RectangleAd from './RectangleAd';



// material-ui
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';



const useStyles = (theme) => ({
    detailsImageSection: {
        display: "block",
        height: "auto",
        width: "100%",
        position: "relative",
        boxShadow: "0 1px 3px rgba(0,0,30,.3)",
        background: "linear-gradient(45deg,#efefef 25%,transparent 0,transparent 75%,#efefef 0,#efefef),linear-gradient(45deg,#efefef 25%,transparent 0,transparent 75%,#efefef 0,#efefef)",
        backgroundPosition: "0 0,10px 10px",
        backgroundColor: "#fff",
        backgroundSize: "21px 21px",
    },
    detailsImage: {
        // marginRight: "40%",
        maxHeight: "400px",
        display: "block",
        margin: "auto",
    },
    container: {
        maxWidth: "1310px",
        margin: "0 auto",
        padding: "0 20px",
        position: "relative",
    },
    mainwrapper: {
        height: "auto",
        textAlign: "center",
        '& .box': {
            cursor: "pointer",
            // height:"400px",
            position: "relative",
            overflow: "hidden",
            width: "auto",
            '-webkit-box-shadow': "1px 1px 1px 1px #ccc",
            '-moz-box-shadow': "1px 1px 1px 1px #ccc",
            boxShadow: "1px 1px 1px 1px #ccc",
            '&:hover .simple-caption': {
                "-moz-transform": 'translateY(-100%)',
                '-o-transform': 'translateY(-100%)',
                '-webkit-transform': 'translateY(-100%)',
                transform: 'translateY(-100%)',
            },
            '& img': {

                '-webkit-transition': "all 300ms ease-out",
                '-moz-transition': "all 300ms ease-out",
                '-o-transition': "all 300ms ease-out",
                '-ms-transition': "all 300ms ease-out",
                transition: "all 300ms ease-out",
            },
            '& .caption': {
                backgroundColor: "rgba(0,0,0,0.8)",
                position: "absolute",
                color: "#fff",
                zIndex: 100,
                '-webkit-transition': "all 300ms ease-out",
                '-moz-transition': "all 300ms ease-out",
                '-o-transition': "all 300ms ease-out",
                '-ms-transition': "all 300ms ease-out",
                transition: "all 300ms ease-out",
                left: 0,
            },
            '& .simple-caption': {
                height: "50px",
                width: "100%",
                display: "block",
                bottom: "-50px",
                lineHeight: "25pt",
                textAlign: "center",
            }
        },

    },
    detail_title: {
        padding: "15px 20px",
        background: "#f6f5fa",
        borderBottom: "1px solid #eeeff2",
        lineHeight: "1.7",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textTransform: "capitalize",
        color: "#0a88d3",
        fontFamily: "Poppins-Regular, sans-serif",
        fontSize: "14px",
    },

    detail_description: {
        '& #details tr': {
            border: "none",
        },
        '& #details td': {
            textAlign: "right",
        },
        '& #details td, & #details th': {
            whiteSpace: "nowrap",
            fontSize: "14px",
            padding: 0,
            lineHeight: 1.5,
            fontWeight: 400,
            color: "#636363",
            fontFamily: "Poppins-Regular, sans-serif",
        }
    },
    downloadSection: {
        margin: "20px 0 10px",
        padding: "15px 20px",
        background: "#f6f5fa",
        lineHeight: "1.5",
        fontSize: "14px",
        color: "#0a88d3",
        fontFamily: "Poppins-Regular, sans-serif",
        '& button': {
            fontFamily: "Poppins-Regular, sans-serif",
        },
        '& h4': {
            fontFamily: "Poppins-Regular, sans-serif",
            color: "#0a88d3",
            fontSize: "16px",
            textDecoration: "underline",
        },
    },
    keywordSection: {
        margin: "20px auto",
        '& h2': {
            margin: "10px auto",
        },
        '& a': {
            margin: "5px",
        },
        padding: "10px"
    }


});


class Image_Details extends Component {
    static contextType = GalleryContext;


    constructor(props) {
        super(props);
        // this.child = React.createRef();
        this.state = {
            viewerIsOpen: false,
            customBoxIsOpen: false,
            details: {
                category: "",
                description: "",
                epsName: "",
                epsURL: "",
                height: null,
                id: "",
                price: "",
                price_status: false,
                src: "",
                title: "",
                user_id: "",
                width: null
            },
            similarImagesArray: [],
            height: '',
            width: '',
            creatorDetails: {},
            callChildReset: 0,
        }
    }



    componentDidMount = () => {
        window.scrollTo({
            top: 0,
        });
        


        var details = this.props.location.state;

        // (window.adsbygoogle = window.adsbygoogle || []).push({});


        const galleryData = this.context;

        if (details === "undefined" || !details) {

            setTimeout(() => {

                var imageData = galleryData.findById(this.props.match.params.id)

                if (imageData) {
                    this.setState({ details: imageData });

                } else {
                    this.setState({ details: this.state.details });
                    this.props.history.push({
                        pathname: `/404Eroor`
                    });
                }


            }, 7000);

        } else {

            this.setState({ details: details });


            setTimeout(() => {

                this.setState({ similarImagesArray: galleryData.SearchSimilarImages(details.keywords) })
            }, 3000);



        }


    }



    openLightbox = () => {
        this.setState({ viewerIsOpen: true });
    };

    closeLightbox = () => {
        this.setState({ viewerIsOpen: false })
    };

    downloadImage = () => {
        var url = this.state.details.src;
        var fileName = `${this.state.details.title}.jpg`;


        var xhr = new XMLHttpRequest();//
        xhr.open("GET", url, true);
        xhr.responseType = "blob";//
        xhr.onload = function () {//
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(this.response);
            var tag = document.createElement('a');
            tag.href = imageUrl;
            tag.download = fileName;
            document.body.appendChild(tag);
            tag.click();
            document.body.removeChild(tag);
        }
        xhr.send();



    }


    addToCart = () => {

        var cartID = Math.random();
        cartID = Math.floor(cartID * 6000);

        var newCart = {
            title: this.state.details.title,
            price: this.state.details.price,
            image: this.state.details.src,
            productId: this.state.details.id,
            cartId: cartID,
            creatorId: this.state.details.user_id,
        };

        var existing = localStorage.getItem('cartItems');
        existing = existing ? JSON.parse(existing) : [];
        existing.push(newCart);
        localStorage.setItem('cartItems', JSON.stringify(existing))

        swal(this.state.details.title, "is added to cart !", "success");

        // console.log(this.child)
        // this.child.current.getUpdate();
        // this.refs.child.getUpdate();

        console.log(this)
        console.log(this.refs)
    }



    render() {

        const { classes } = this.props;

        const images = this.state.details.src !== "" ? [{ src: this.state.details.src }] : [];
        const loadingImage = require('../images/loading.gif');



        return (
            <GalleryContext.Consumer>
                {(gallery) => {
                    return (
                        <div style={{ background: "white", minHeight: "100vh" }}>
                            {/* <Header ref={this.child} /> */}
                            <Header />
                            <div className="addSection" >
                                    <HorizontalAd />
                            </div>
                            <Grid container spacing={2} className={classes.container} >
                                <Grid item md={8} sm={6} xs={12} >
                                    <div className={classes.detailsImageSection}>
                                        <div className={classes.mainwrapper}>
                                            <div id="box-1" className="box">
                                                <img src={this.state.details.src === "" ? loadingImage : this.state.details.src} className={classes.detailsImage} style={this.state.details.src === "" ? { margin: "22% auto" } : null} alt="imagedetails" />
                                                <span className="caption simple-caption">
                                                    <button style={{ padding: "10px" }} onClick={this.openLightbox} ><i style={{ color: "white" }} className="fas 3x fa-binoculars"></i></button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.details.keywords &&
                                        <div className={classes.keywordSection} >
                                            <h2>Related Links</h2>
                                            {this.state.details.keywords.map((item, i) => {
                                                return <Chip key={i} label={item.tag} component="a" href="#chip" clickable variant="outlined" />
                                            })}
                                        </div>

                                    }
                                   <HorizontalAd />
                                </Grid>

                                <Grid item md={4} sm={6} xs={12} >

                                    <div className={classes.detailsSection} >
                                        <div className={classes.detail_title} >
                                            {this.state.details.title}
                                        </div>
                                        <div className={classes.detail_description}  >
                                            <div style={{ padding: "15px 20px", background: "#f6f5fa", overflow: "auto" }}>
                                                <table id="details">
                                                    <tbody><tr><th style={{ whiteSpace: "nowrap" }}>Image type</th><td>PNG</td></tr>
                                                        <tr><th>Width</th><td>{this.state.details.width} - inches </td></tr>
                                                        <tr><th>Height</th><td>{this.state.details.height} - inches </td></tr>
                                                        <tr><th>Category</th><td style={{ textTransform: "capitalize" }} >{this.state.details.category}</td></tr>
                                                        <tr><th>Price</th><td>$ {this.state.details.price} -USD </td></tr>
                                                    </tbody></table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.downloadSection}>
                                        It will be less than its original dimensions /.jpg File
                                        <button className="btn confirmDownload green" style={{ width: "100%", margin: "5px auto", padding: "initial" }} onClick={this.downloadImage} ><i className="fas fa-download"></i> Free Download</button>
                                    </div>
                                    <div className={classes.downloadSection}>
                                        <h4>Purchase Orignal</h4>
                                        Download Image with it's orignal height and width
                                        <button className="btn green" style={{ width: "100%", margin: "5px auto", padding: "initial" }} onClick={ this.addToCart } > <i className="fas fa-cart-plus"></i> Add To Cart</button>
                                    </div>
                                    <RectangleAd />
                                </Grid>


                            </Grid>
                            <br />
                            <br />
                            <Footer />


                            <ModalGateway>
                                {this.state.viewerIsOpen ? (
                                    <Modal onClose={this.closeLightbox}>
                                        <Carousel views={images} />
                                    </Modal>
                                ) : null}
                            </ModalGateway>
                        </div>

                    )
                }}
            </GalleryContext.Consumer>
        )
    }
}

export default withStyles(useStyles , {withTheme: true } )(Image_Details);
