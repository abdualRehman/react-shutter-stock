import React from 'react';
import Header2 from './Header2';
import Footer from './Footer';

import { Link } from 'react-router-dom';
// for gallery
import Gallery from 'react-photo-masonry';
import Carousel, { Modal, ModalGateway } from "react-images";



export default class SearchResult extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            previewSrc: "",
            currentImage: "",
            viewerIsOpen: false,
            keyword: "",
        }
    }

    componentDidMount = () => {

        console.log(this.props.location.state.detail);

        this.setState({
            photos: this.props.location.state.detail,
            keyword: this.props.location.state.keywords
        })

    }

    columns = (containerWidth) => {
        let columns = 1;
        if (containerWidth >= 500) columns = 2;
        if (containerWidth >= 900) columns = 3;
        if (containerWidth >= 1500) columns = 4;
        return columns;
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
            <div>
                <div className="div">
                    <Header2 />
                </div>
                <br />

                <div className="container">
                    <h1 className="searchLabel">Showing Results For: {this.state.keyword} </h1>
                    <div className="container">
                        <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
                            <Link to="/" className="stext-109 cl8 hov-cl1 trans-04">
                                Home
                                <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                            </Link>
                            <Link to="/images" className="stext-109 cl4">
                                Images
                                <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                            </Link>
                            <span className="stext-109 cl4">
                                Search
                                
                            </span>

                        </div>
                    </div>

                    <br />
                </div>

                <div className="container">

                    <Gallery photos={this.state.photos} direction="row" renderImage={(item) => {
                        return (
                            <figure className="snip0016 caption" style={{ margin: item.margin, minHeight: item.photo.height, width: item.photo.width, ...cont }} key={item.index} >
                                <img className="gallery" alt={item.index} src={item.photo.src}  style={{ height: "100%", width: "100%" }} />
                                <figcaption>
                                    {!item.photo.price_status ?
                                        <span className="freeLabel"><img src={FreeLabel} alt="Free" /></span>
                                        : null}
                                    <div className="details">
                                        <h2>{item.photo.title}</h2>
                                        <p>{item.photo.description}</p>
                                    </div>
                                    <div className="links">
                                        <Link className="waves-effect waves-light btn black" to={{ pathname: `/details/${item.photo.id}`, state: item.photo }}><i class="small material-icons left">file_download</i>Download</Link>&nbsp;&nbsp;&nbsp;
                                        <a href="" className="waves-effect waves-light btn" onClick={(e) => {
                                            e.preventDefault();
                                            this.openLightbox(item.index)
                                        }}><i class="small material-icons left ">visibility</i>Preview </a>
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
                                views={this.state.photos.map(x => ({
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









            </div>
        )
    }

}