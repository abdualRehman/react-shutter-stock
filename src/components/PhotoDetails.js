import React from 'react';
import Header2 from './Header2'
import Footer from './Footer';
import { Link } from 'react-router-dom';
import M from 'materialize-css';

import Jimp from 'jimp';
import swal from 'sweetalert';

import Carousel, { Modal, ModalGateway } from "react-images";
import { GalleryContext } from '../context/GalleryContext';

class PhotoDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            viewerIsOpen: false,
            customBoxIsOpen: false,
            details: {},
            height: '',
            width: '',
        }
    }

    componentDidMount = () => {
        M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), { closeOnClick: false, coverTrigger: false, constrainWidth: false, alignment: "left" });
        M.Collapsible.init(document.querySelectorAll('.collapsible'));
    }


    componentWillMount() {
        var details = this.props.location.state
        console.log(details);
        this.setState({ details: details })
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

    render() {
        const images = [{ src: this.state.details.src }]
        return (
            <GalleryContext.Consumer>
                {(gallery) => {

                    return (
                        <div>
                            <Header2 />

                            <div className="container">
                                <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
                                    <Link to="/" className="stext-109 cl8 hov-cl1 trans-04">
                                        Home
				                    <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                                    </Link>
                                    <Link to="/images" className="stext-109 cl8 hov-cl1 trans-04">
                                        Images
				                    <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                                    </Link>
                                    <span className="stext-109 cl4">
                                        Photo Details
			                        </span>
                                </div>
                            </div>
                            <div className="container">
                                <div className="row">

                                    <div className="col-md-7">
                                        <div className="details-image">
                                            {/* {gallery.photos.find(this.findDetails)} */}
                                            <img src={this.state.details.src} alt="imagedetails" />

                                            <button onClick={this.openLightbox} ><i className="fas 3x fa-binoculars"></i></button>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="container">
                                            <div className="detailSectionSinup">
                                                <div>
                                                    <div>
                                                        Created by: {this.state.details.user_id}
                                                    </div>
                                                    <br /><br />
                                                    <div>
                                                        Price: {this.state.details.price_status ? this.state.details.price : "Free"}
                                                    </div>
                                                    <br />
                                                    {/* <button className="btn green p-2" style={{width:"100%"}} onClick={this.addToCart} > <i className="fas fa-cart-plus"></i> Add To Cart</button><br /><br /> */}

                                                    {this.state.details.price_status ? <button className="btn green p-2" style={{ width: "100%" }} onClick={this.addToCart} > <i className="fas fa-cart-plus"></i> Add To Cart</button> :
                                                        <button className='dropdown-trigger btn downloadBtn green p-1' data-target='dropdown1'><i className="fas fa-download"></i> Download</button>
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
                                        <h1>{this.state.details.title}</h1>
                                        <br />
                                        <p>{this.state.details.description}</p>
                                        <br />
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
            </GalleryContext.Consumer>
        )
    }
}
export default PhotoDetails;