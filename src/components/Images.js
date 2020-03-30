import React from 'react';
import Header2 from './Header2';
import Footer from './Footer';
import Search from './Search';
import { Link } from 'react-router-dom';
// for gallery
import Gallery from 'react-photo-masonry';
import Carousel, { Modal, ModalGateway } from "react-images";

// for import images
import { GalleryContext } from '../context/GalleryContext';


class Images extends React.Component {
    constructor(props) {
        super(props)
        this.previewPhoto = this.previewPhoto.bind(this);
        this.state = {
            photos: [],
            previewSrc: "",
            currentImage: "",
            viewerIsOpen: false,
        }
    }


    columns = (containerWidth) => {
        let columns = 1;
        if (containerWidth >= 500) columns = 2;
        if (containerWidth >= 900) columns = 3;
        if (containerWidth >= 1500) columns = 4;
        return columns;
    }

    checkImage = (event, { photo, index }) => {
        console.log("event");
        console.log(event);
        console.log("Photo");
        console.log(photo);
        console.log("index");
        console.log(index);
    }

    previewPhoto = (photo) => {

        this.setState({ previewSrc: photo.src })

        console.log(this.state.previewSrc);
    }


    openLightbox = (index) => {
        console.log(index);
        this.setState({ currentImage: index, viewerIsOpen: true });

    };

    closeLightbox = () => {
        this.setState({ currentImage: '', viewerIsOpen: false })
    };



    render() {
        const FreeLabel = require('../images/free.png');

        const cont = {
            backgroundColor: "#eee",
            cursor: "pointer",
            overflow: "hidden",
            position: "relative"
        };


        return (
            <GalleryContext.Consumer>
                {(gallery) => {

                    return (

                        <div>
                            <div className="div">
                                <Header2 />
                                <Search />
                            </div>
                            <br />
                            <div className="container">
                                <div className="container">
                                    <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
                                        <Link to="/" className="stext-109 cl8 hov-cl1 trans-04">
                                            Home
				                    <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                                        </Link>
                                        <span className="stext-109 cl4">
                                            Images
			                        </span>
                                    </div>
                                </div>

                                <br />
                            </div>
                            <div className="container">

                                {/* <Gallery photos={photos} direction="row" columns={this.columns} onClick={this.checkImage} /> */}

                                {/* <Gallery photos={photos} direction="row" renderImage={(item) => {
                        return (
                            <figure className="snip0016 caption" style={{ margin: item.margin, minHeight: item.photo.height, width: item.photo.width, ...cont }} key={item.index} >
                                <img className="gallery" alt={item.index} {...item.photo} style={{ height: "100%", width: item.photo.width }} />

                                <figcaption>
                                    <span className="freeLabel"><img src={FreeLabel} alt="Free" /></span>
                                    <div className="details">
                                        <h2>I think the <span>surest</span> sign </h2>
                                        <p>That intelligent life exists elsewhere in the universe is that none of it has tried to contact us.</p>
                                    </div>
                                    <div className="links">
                                        <a className="waves-effect waves-light btn black" href="!#">Download / Details</a>
                                        <a className="waves-effect waves-light btn" onClick={() => this.openLightbox(item.index)}>Preview</a>
                                    </div>

                                </figcaption>
                            </figure>
                        )
                    }} /> */}
                                <Gallery photos={gallery.photos} direction="row" renderImage={(item) => {
                                    return (
                                        <figure className="snip0016 caption" style={{ margin: item.margin, minHeight: item.photo.height, width: item.photo.width, ...cont }} key={item.index} >
                                            <img className="gallery" alt={item.index} {...item.photo} style={{ height: "100%", width: "100%" }} />
                                            <figcaption>
                                                {!item.photo.price_status ?
                                                    <span className="freeLabel"><img src={FreeLabel} alt="Free" /></span>
                                                    : null}
                                                <div className="details">
                                                    <h2>{item.photo.title}</h2>
                                                    <p>{item.photo.description}</p>
                                                </div>
                                                <div className="links">
                                                    <Link className="waves-effect waves-light btn black" to={{ pathname: `/details/${item.photo.id}`, state: item.photo }}  >Download / Details</Link>
                                                    <a href="" className="waves-effect waves-light btn" onClick={(e) =>{
                                                        e.preventDefault();
                                                        this.openLightbox(item.index)}}>Preview</a>
                                                </div>
                                            </figcaption>
                                        </figure>
                                    )
                                }} />


                            </div>

                            <ModalGateway>
                                {this.state.viewerIsOpen ? (
                                    <Modal onClose={this.closeLightbox}>
                                        <Carousel
                                            currentIndex={this.state.currentImage}
                                            views={gallery.photos.map(x => ({
                                                ...x,
                                                srcset: x.src,
                                                caption: x.title
                                            }))}
                                        />
                                    </Modal>
                                ) : null}
                            </ModalGateway>


                            <div>
                                <br />
                                <hr />
                                <br />
                                <Footer />
                            </div>

                        </div >
                    );
                }}
            </GalleryContext.Consumer>
        )
    }
}
export default Images;