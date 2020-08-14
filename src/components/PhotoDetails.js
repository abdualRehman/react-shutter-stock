import React from 'react';
import Header2 from './Header2'
import Footer from './Footer';
import { Link } from 'react-router-dom';


import Jimp from 'jimp';
import swal from 'sweetalert';

import Carousel, { Modal, ModalGateway } from "react-images";
import { GalleryContext } from '../context/GalleryContext';
import { UserContext } from '../context/UserContext';


import Gallery from 'react-photo-masonry';

class PhotoDetails extends React.Component {

    static contextType = GalleryContext;

    constructor(props) {
        super(props);
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
            height: '',
            width: '',
            creatorDetails: {},
        }
    }

    componentDidMount = () => {
        // M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), { closeOnClick: false, coverTrigger: false, constrainWidth: false, alignment: "left" });
        // M.Collapsible.init(document.querySelectorAll('.collapsible'));
        window.scrollTo({
            top: 0,
            // behavior: "smooth"
        });

        var details = this.props.location.state

        const galleryData = this.context;
        if (details === "undefined" || !details) {
            setTimeout(() => {
                // console.log(galleryData);
                var imageData = galleryData.findById(this.props.match.params.id)
                // console.log(imageData);
                if (imageData) {
                    this.setState({ details: imageData });
                    console.log(imageData);
                } else {
                    this.setState({ details: this.state.details });
                    this.props.history.push({
                        pathname: `/404Eroor`
                    });
                }
            }, 5000);

        } else {
            this.setState({ details: details })
            // console.log(this.state.details)

        }


    }





    openLightbox = () => {
        // console.log(index);
        this.setState({ viewerIsOpen: true });

    };

    closeLightbox = () => {
        this.setState({ viewerIsOpen: false })
    };

    toggleCustomBox = () => {
        this.setState({ customBoxIsOpen: !this.state.customBoxIsOpen });
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    downloadEPS = () => {
        // var details = this.state.details;
        // console.log(details);

        var url = this.state.details.epsURL;
        var fileName = this.state.details.epsName;

        var tag = document.createElement('a');
        tag.href = url;
        tag.download = fileName;
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);




    }

    downloadImage = () => {
        var url = this.state.details.src;
        var fileName = this.state.details.title;

        var width = this.state.width;
        var height = this.state.height;


        if (width === '' || height === '') {


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

        } else {

            width = Number(width)
            height = Number(height)


            Jimp.read(url, (err, image) => {
                if (err) throw err;
                image
                    .resize(width, height) // resize
                    .quality(70) // set JPEG quality
                image.getBase64(Jimp.AUTO, (err, data) => {

                    var xhr = new XMLHttpRequest();//
                    xhr.open("GET", data, true);
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

                });
            });


        }


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


    }
    // findName = (userContext) => {
    //     if (userContext.users.length !== 0) {
    //         var id = this.state.details.user_id;
    //         var data = userContext.findById(id);
    //         return data.email
    //     }
    // }


    render() {
        const images = this.state.details.src !== "" ? [{ src: this.state.details.src }] : [];
        // const images = [{ src: "" }];
        const loadingImage = require('../images/loading.gif');

        return (
            <GalleryContext.Consumer>
                {(gallery) => {

                    return (
                        <UserContext.Consumer>
                            {(userContext) => {

                                return (
                                    <div>
                                        <Header2 />

                                        <div className="container">
                                            <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
                                                <Link to="/" className="stext-109 cl8 hov-cl1 trans-04">
                                                    Home
				                    <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                                                </Link>
                                                <Link to="/images/all" className="stext-109 cl8 hov-cl1 trans-04">
                                                    Images
				                    <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                                                </Link>
                                                <span className="stext-109 cl4">
                                                    Photo Details
			                        </span>
                                            </div>
                                        </div>
                                        <div className="container imageDetailSection">
                                            <div className="row">

                                                <div className="col-sm-6">
                                                    <div className="details-image">
                                                        {/* {gallery.photos.find(this.findDetails)} */}
                                                        <img src={this.state.details.src === "" ? loadingImage : this.state.details.src} style={{ marginRight: "40%" }} alt="imagedetails" />

                                                        <button onClick={this.openLightbox} ><i className="fas 3x fa-binoculars"></i></button>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="container">
                                                        <div className="detailSectionSinup">
                                                            <div>
                                                                <div>
                                                                    {/* Created by: {this.findName(userContext)} */}
                                                                    <h2>{this.state.details.title}</h2>
                                                                    <p>{this.state.details.description}</p><br/>
                                                                    <p>Width: {this.state.details.width}In</p>
                                                                    <p>Height: {this.state.details.height}In</p>

                                                                </div>
                                                                <br />
                                                                <div>
                                                                    Format: */EPS
                                                                </div>
                                                                <div>
                                                                    Price: {this.state.details.price_status ? this.state.details.price : "Free"}
                                                                </div>
                                                                <br />
                                                                {/* <button className="btn green p-2" style={{width:"100%"}} onClick={this.addToCart} > <i className="fas fa-cart-plus"></i> Add To Cart</button><br /><br /> */}

                                                                {this.state.details.price_status ? <button className="btn green p-2" style={{ width: "100%" }} onClick={this.addToCart} > <i className="fas fa-cart-plus"></i> Add To Cart</button> :
                                                                    // <button className='dropdown-trigger btn downloadBtn green p-1' data-target='dropdown1'><i className="fas fa-download"></i> Download</button>
                                                                    <button className="btn confirmDownload green" style={{ color: "white", paddingTop: "7px", borderRadius: "15px", width: "100%" }} onClick={this.downloadEPS} ><i className="fas fa-download"></i> Download</button>
                                                                }

                                                                <ul id='dropdown1' style={{ width: "inherit" }} className='dropdown-content downloadContent'>
                                                                    <li>
                                                                        <label>
                                                                            <input className="with-gap" name="group1" defaultChecked onChange={this.toggleCustomBox} type="radio" />
                                                                            <span>Orignal Height and Width</span>
                                                                        </label>
                                                                    </li>
                                                                    <li>
                                                                        <label>
                                                                            <input className="with-gap" name="group1" onChange={this.toggleCustomBox} type="radio" />
                                                                            <span>Custom Height and Width</span>
                                                                        </label>
                                                                        {(this.state.customBoxIsOpen) ?
                                                                            <div className="customDownload">
                                                                                <ul className="customDownload1">
                                                                                    <li style={{ width: "40%" }} ><input type="text" placeholder="width" name="width" onChange={this.handleChange} className="customWidth" /></li>
                                                                                    <li className="cross" style={{ width: "auto", padding: "30px 0px 0px 0px" }} >X</li>
                                                                                    <li style={{ width: "40%" }} ><input type="text" placeholder="height" name="height" onChange={this.handleChange} className="customWidth" /></li>
                                                                                </ul>
                                                                            </div>
                                                                            : null}
                                                                    </li>

                                                                    <li><button className="btn confirmDownload green" style={{ color: "white", paddingTop: "7px", borderRadius: "15px", width: "100%" }} onClick={this.downloadImage} ><i className="fas fa-download"></i> Download</button></li>
                                                                </ul>
                                                            </div>
                                                            {/* <div>
                                                    <h2>Sign up</h2>
                                                    <div className="container">
                                                        <div className="input-field col-sm-12">
                                                            <input id="Email" type="text" className="validate" autoComplete="off" />
                                                            <label htmlFor="Email">Email Address</label>
                                                        </div>
                                                        <div className="input-field col-sm-12">
                                                            <input id="password" type="password" className="validate" autoComplete="off" />
                                                            <label htmlFor="password">Password</label>
                                                        </div>
                                                        <button className="col-sm-12 btn-large waves-effect waves-light red white-text" style={{ borderRadius: "20px" }} >Continue</button>

                                                        <div className="col-sm-12">
                                                            <br />
                                                            By creating an account, I agree to Shutterstock's
                                                        <Link to="">Website terms</Link>, <Link to="">Privacy policy</Link> and <Link to="">Licensing terms</Link>.
                                                        </div>
                                                        <hr />
                                                        Already have an account? <Link to="/login">Log in</Link>
                                                    </div>
                                                </div>
                                            */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <h2>Similar Images</h2>
                                                    <br />
                                                    {this.state.src !== "" ?
                                                        <div>
                                                            <Gallery photos={gallery.SearchSimilarImages(this.state.details.keywords)} direction="row" renderImage={(item) => {
                                                                return (
                                                                    <figure className="snip0016 caption" onClick={()=>{
                                                                        this.props.history.push({
                                                                            pathname: `/details/${item.photo.id}`,
                                                                            state: item.photo,
                                                                        });
                                                                        window.location.reload(false);
                                                                    } } style={{ margin: item.margin, height: "max-content", maxWidth: "212px" }} key={item.index} >
                                                                        <img className="gallery" alt={item.index} src={item.photo.src} style={{ height: "100%", width: "100%" }} />
                                                                    </figure>
                                                                )
                                                            }} />
                                                        </div>
                                                        : null}

                                                </div>
                                            </div>
                                        </div>
                                        <ModalGateway>
                                            {this.state.viewerIsOpen ? (
                                                <Modal onClose={this.closeLightbox}>
                                                    <Carousel views={images} />
                                                </Modal>
                                            ) : null}
                                        </ModalGateway>




                                        <Footer />
                                    </div>
                                )
                            }}

                        </UserContext.Consumer>
                    )
                }}
            </GalleryContext.Consumer>
        )
    }
}
export default PhotoDetails;