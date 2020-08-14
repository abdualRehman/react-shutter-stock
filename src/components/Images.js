import React from 'react';
import Header2 from './Header2';
import Footer from './Footer';
import Search from './Search';
import { Link } from 'react-router-dom';
// for gallery
// import Gallery from 'react-photo-masonry';

// new one

// import ImageMasonry from 'react-image-masonry';

import Carousel, { Modal, ModalGateway } from "react-images";

// for import images
import { GalleryContext } from '../context/GalleryContext';

// jQuery
import $ from 'jquery';


class Images extends React.Component {
    constructor(props) {
        super(props)
        this.previewPhoto = this.previewPhoto.bind(this);
        this.state = {
            photos: [],
            previewSrc: "",
            currentImage: "",
            viewerIsOpen: false,

            // Panigation
            todos: null,
            currentPage: 1,
            // todosPerPage: 6,   real
            // upperPageBound: 3, real
            todosPerPage: 50,
            upperPageBound: 25,
            lowerPageBound: 0,
            isPrevBtnActive: 'disabled',
            isNextBtnActive: '',
            // pageBound: 3, real
            pageBound: 25
        }

        this.handleClick = this.handleClick.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);
        this.btnNextClick = this.btnNextClick.bind(this);
        this.btnPrevClick = this.btnPrevClick.bind(this);
        this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);
    }

    componentDidUpdate = () => {
        // $("ul li.active").removeClass('active');
        // $('ul li#' + this.state.currentPage).addClass('active');
        window.scrollTo(0, 0);
        $("ul li.active").removeClass('active');
        $('ul li.' + this.state.currentPage).addClass('active');
    }
    handleClick = (listid, todos) => {
        console.log(todos);
        // let listid = Number(event.target.id);
        this.setState({
            currentPage: listid
        });
        // $("ul li.active").removeClass('active');
        // $('ul li#' + listid).addClass('active');

        $("ul li.active").removeClass('active');
        $('ul li.' + listid).addClass('active');



        this.setPrevAndNextBtnClass(listid, todos);
    }
    setPrevAndNextBtnClass = (listid, todos) => {
        // let totalPage = Math.ceil(this.state.todos.length / this.state.todosPerPage);
        let totalPage = Math.ceil(todos.length / this.state.todosPerPage);
        this.setState({ isNextBtnActive: 'disabled' });
        this.setState({ isPrevBtnActive: 'disabled' });
        if (totalPage === listid && totalPage > 1) {
            this.setState({ isPrevBtnActive: '' });
        }
        else if (listid === 1 && totalPage > 1) {
            this.setState({ isNextBtnActive: '' });
        }
        else if (totalPage > 1) {
            this.setState({ isNextBtnActive: '' });
            this.setState({ isPrevBtnActive: '' });
        }
    }
    btnIncrementClick = (todos) => {
        this.setState({ upperPageBound: this.state.upperPageBound + this.state.pageBound });
        this.setState({ lowerPageBound: this.state.lowerPageBound + this.state.pageBound });
        let listid = this.state.upperPageBound + 1;
        this.setState({ currentPage: listid });
        this.setPrevAndNextBtnClass(listid, todos);
    }
    btnDecrementClick = (todos) => {
        this.setState({ upperPageBound: this.state.upperPageBound - this.state.pageBound });
        this.setState({ lowerPageBound: this.state.lowerPageBound - this.state.pageBound });
        let listid = this.state.upperPageBound - this.state.pageBound;
        this.setState({ currentPage: listid });
        this.setPrevAndNextBtnClass(listid, todos);
    }
    btnPrevClick = (todos) => {
        if ((this.state.currentPage - 1) % this.state.pageBound === 0) {
            this.setState({ upperPageBound: this.state.upperPageBound - this.state.pageBound });
            this.setState({ lowerPageBound: this.state.lowerPageBound - this.state.pageBound });
        }
        let listid = this.state.currentPage - 1;
        this.setState({ currentPage: listid });
        this.setPrevAndNextBtnClass(listid, todos);
    }
    btnNextClick = (todos) => {
        if ((this.state.currentPage + 1) > this.state.upperPageBound) {
            this.setState({ upperPageBound: this.state.upperPageBound + this.state.pageBound });
            this.setState({ lowerPageBound: this.state.lowerPageBound + this.state.pageBound });
        }
        let listid = this.state.currentPage + 1;
        this.setState({ currentPage: listid });
        this.setPrevAndNextBtnClass(listid, todos);
    }

    columns = (containerWidth) => {
        let columns = 1;
        if (containerWidth >= 500) columns = 2;
        if (containerWidth >= 900) columns = 3;
        if (containerWidth >= 1500) columns = 4;
        return columns;
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


    // filter by category

    filterImages = (data) => {
        const categoryName = this.props.match.params.category;
        if( categoryName !== "all"){
            return data.searchByCategory(categoryName);
        }else{
            return data.photos;
        }
    }


    render() {
        const FreeLabel = require('../images/free.png');

        const cont = {
            backgroundColor: "#eee",
            cursor: "pointer",
            overflow: "hidden",
            position: "relative",
            display: "flex"
        };


        return (
            <GalleryContext.Consumer>
                {(gallery) => {

                   
                    const todos = this.filterImages(gallery);

                    const { currentPage, todosPerPage, upperPageBound, lowerPageBound, isPrevBtnActive, isNextBtnActive } = this.state;
                    // Logic for displaying current todos
                    const indexOfLastTodo = currentPage * todosPerPage;
                    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
                    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);


                    // currently workingtodos
                    const renderTodos = currentTodos.map((item, index) => {
                        // console.log(item)
                        return (
                            <div className="brick" key={index} style={{"maxHeight": `${item.height}`, "maxWidth": `${item.width}` }} >
                                <figure className="snip0016 caption" style={{...cont}} >
                                    {item.src ?   
                                    <img className="gallery" alt={index} src={item.src} /> : <img className="gallery" alt={index} src={FreeLabel} />   }
                                    <figcaption>
                                        {!item.price_status ?
                                            <span className="freeLabel"><img src={FreeLabel} alt="Free" /></span>
                                            : null}
                                        {/* <div className="links">
                                            <Link className="waves-effect waves-light btn green m-l-10" to={{ pathname: `/details/${item.id}`, state: item }}><i className="small material-icons">file_download</i></Link>
                                                <a href="" className="waves-effect waves-light btn bg-info text-white m-l-10" onClick={(e) => {
                                                e.preventDefault();
                                                this.openLightbox(indexOfFirstTodo + index)
                                            }}><i className="small material-icons">visibility</i> </a>
                                        </div> */}
                                        <div className="caption">
                                            <Link className="text-grey grey-lighten-5" to={{ pathname: `/details/${item.id}`, state: item }}><i className="small material-icons">file_download</i></Link>
                                                <a href="!#" className="text-white" onClick={(e) => {
                                                e.preventDefault();
                                                this.openLightbox(indexOfFirstTodo + index)
                                            }}><i className="small material-icons">visibility</i> </a>
                                        </div>
                                    </figcaption>
                                </figure>

                            </div>


                        )

                    });

                    // const renderTodos = 
                    //     <div>
                    //         <ImageMasonry
                    //             numCols={3}
                    //             animate={false}
                    //         >
                    //             {currentTodos.map((item, i) => {
                    //                 console.log(item);
                    //                 return (
                    //                     // <img key={i} className="gallery" alt={i} src={item.src} />
                    //                     <div style={{ padding: "10px", backgroundColor: "transparent" }} key={i} >
                    //                         <figure className="snip0016 caption" style={{ ...cont }} >
                    //                             <img className="gallery" alt={i} src={item.src} style={{ height: "100%", width: "100%" }} />
                    //                             <figcaption>
                    //                                 {!item.price_status ?
                    //                                     <span className="freeLabel"><img src={FreeLabel} alt="Free" /></span>
                    //                                     : null}
                    //                                 <div className="details">
                    //                                     <h2>{item.title}</h2>
                    //                                     {/* <p>{item.description}</p> */}
                    //                                 </div>
                    //                                 <div className="links">
                    //                                     <Link className="waves-effect waves-light btn black" style={{ width: "auto" }} to={{ pathname: `/details/${item.id}`, state: item }}><i style={{ width: "auto" }} className="small material-icons left">file_download</i><em style={{ width: "auto" }} >Download</em></Link>&nbsp;&nbsp;&nbsp;
                    //                                         <a href="" className="waves-effect waves-light btn light-blue" style={{ width: "auto" }} onClick={(e) => {
                    //                                         e.preventDefault();
                    //                                         this.openLightbox(i)
                    //                                     }}><i className="small material-icons left" style={{ width: "auto" }} >visibility</i><em style={{ width: "auto" }} > Preview </em> </a>
                    //                                 </div>
                    //                             </figcaption>
                    //                         </figure>
                    //                     </div>
                    //                 )
                    //             })}

                    //         </ImageMasonry>
                    //     </div>




                    // let renderTodos = <div>
                    {/* <Gallery photos={currentTodos} direction={"row"} renderImage={(item) => {
                                console.log(item)
                                return (
                                    <div style={{ padding: "5px", backgroundColor: "transparent", minHeight: item.photo.height, maxWidth: item.photo.width}} key={item.index} >
                                        <figure className="snip0016 caption" style={{ minHeight: item.photo.height, maxWidth: item.photo.width, ...cont }} >
                                            <img className="gallery" alt={item.index} src={item.photo.src} style={{ minHeight: item.photo.height, maxWidth: item.photo.width }} />
                                            <figcaption>
                                                {!item.photo.price_status ?
                                                    <span className="freeLabel"><img src={FreeLabel} alt="Free" /></span>
                                                    : null}
                                                <div className="details">
                                                    <h2>{item.photo.title}</h2>
                                                    <p>{item.photo.description}</p>
                                                </div>
                                                <div className="links">
                                                    <Link className="waves-effect waves-light btn black" to={{ pathname: `/details/${item.photo.id}`, state: item.photo }}><i className="small material-icons left">file_download</i>Download</Link>&nbsp;&nbsp;&nbsp;
                                                    <a href="" className="waves-effect waves-light btn light-blue" onClick={(e) => {
                                                        e.preventDefault();
                                                        this.openLightbox(item.index)
                                                    }}><i className="small material-icons left ">visibility</i>Preview </a>
                                                </div>
                                            </figcaption>
                                        </figure>
                                    </div>
                                )
                            }} /> */}
                    {/* <ImageMasonry numCols={3} animate={true} >
                            {currentTodos.map((item, i) => {
                                console.log(item);
                                return (
                                    <div style={{ padding: "10px", backgroundColor: "transparent" }} key={i} >
                                        <figure className="snip0016 caption" style={{ ...cont }} >
                                            <img className="gallery" alt={i} src={item.src} style={{ height: "100%", width: "100%" }} />
                                            <figcaption>
                                                {!item.price_status ?
                                                    <span className="freeLabel"><img src={FreeLabel} alt="Free" /></span>
                                                    : null}
                                                <div className="details">
                                                    <h2>{item.title}</h2>
                                                </div>
                                                <div className="links">
                                                    <Link className="waves-effect waves-light btn black" style={{ width: "auto" }} to={{ pathname: `/details/${item.id}`, state: item }}><i style={{ width: "auto" }} className="small material-icons left">file_download</i><em style={{ width: "auto" }} >Download</em></Link>&nbsp;&nbsp;&nbsp;
                                                    <a href="" className="waves-effect waves-light btn light-blue" style={{ width: "auto" }} onClick={(e) => {
                                                        e.preventDefault();
                                                        this.openLightbox(i)
                                                    }}><i className="small material-icons left" style={{ width: "auto" }} >visibility</i><em style={{ width: "auto" }} > Preview </em> </a>
                                                </div>
                                            </figcaption>
                                        </figure>
                                    </div>
                                )
                            })}
                        </ImageMasonry> */}
                    // </div>

                    // Logic for displaying page numbers
                    const pageNumbers = [];
                    for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
                        pageNumbers.push(i);
                    }
                    const renderPageNumbers = pageNumbers.map(number => {
                        if (number === 1 && currentPage === 1) {
                            return (
                                <li key={number} className='active' id={number}><a href='!#' id={number} onClick={() => this.handleClick(number, todos)}>{number}</a></li>
                            )
                        }
                        else if ((number < upperPageBound + 1) && number > lowerPageBound) {
                            return (
                                <li key={number} className={`${number}`} id={number}><a href='!#' id={number} onClick={() => this.handleClick(number, todos)}>{number}</a></li>
                            )
                        }
                    });
                    let pageIncrementBtn = null;
                    if (pageNumbers.length > upperPageBound) {
                        pageIncrementBtn = <li className=''><a href='!#' onClick={() => this.btnIncrementClick(todos)}> &hellip; </a></li>
                    }
                    let pageDecrementBtn = null;
                    if (lowerPageBound >= 1) {
                        pageDecrementBtn = <li className=''><a href='!#' onClick={() => this.btnDecrementClick(todos)}> &hellip; </a></li>
                    }
                    let renderPrevBtn = null;
                    if (isPrevBtnActive === 'disabled') {
                        renderPrevBtn = <li className={isPrevBtnActive}><span id="btnPrev"> <i className="material-icons">chevron_left</i> </span></li>
                    }
                    else {
                        renderPrevBtn = <li className={isPrevBtnActive}><a href='!#' id="btnPrev" onClick={() => this.btnPrevClick(todos)}> <i className="material-icons">chevron_left</i> </a></li>
                    }
                    let renderNextBtn = null;
                    if (isNextBtnActive === 'disabled') {
                        renderNextBtn = <li className={isNextBtnActive}><span id="btnNext"> <i className="material-icons">chevron_right</i> </span></li>
                    }
                    else {
                        renderNextBtn = <li className={isNextBtnActive}><a href='!#' id="btnNext" onClick={() => this.btnNextClick(todos)}> <i className="material-icons">chevron_right</i> </a></li>
                    }



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

                                    {gallery.photos.length !== 0 ?
                                    <div>
                                        
                                        <ul className="pagination">
                                            {renderPrevBtn}
                                            {pageDecrementBtn}
                                            {renderPageNumbers}
                                            {pageIncrementBtn}
                                            {renderNextBtn}
                                        </ul>
                                        <br />
                                    </div> : null}




                                </div>

                                <br />
                            </div>
                            <div className="container">
                                {/* <Gallery photos={gallery.photos} direction="row" renderImage={(item) => {
                                    return (
                                        <figure className="snip0016 caption" style={{ margin: item.margin, minHeight: item.photo.height, width: item.photo.width, ...cont }} key={item.index} >
                                            <img className="gallery" alt={item.index} src={item.photo.src} style={{ height: "100%", width: "100%" }} />
                                            <figcaption>
                                                {!item.photo.price_status ?
                                                    <span className="freeLabel"><img src={FreeLabel} alt="Free" /></span>
                                                    : null}
                                                <div className="details">
                                                    <h2>{item.photo.title}</h2>
                                                    <p>{item.photo.description}</p>
                                                </div>
                                                <div className="links">
                                                    <Link className="waves-effect waves-light btn black" to={{ pathname: `/details/${item.photo.id}`, state: item.photo }}><i className="small material-icons left">file_download</i>Download</Link>&nbsp;&nbsp;&nbsp;
                                                    <a href="" className="waves-effect waves-light btn light-blue" onClick={(e) =>{
                                                        e.preventDefault();
                                                        this.openLightbox(item.index)}}><i className="small material-icons left ">visibility</i>Preview </a>
                                                </div>
                                            </figcaption>
                                        </figure>
                                    )
                                }} /> */}

                                {gallery.photos.length !== 0 ?
                                    <div>
                                        <div className="masonry" style={{width:"100%" , margin:"0px" , padding:"0px"}}>
                                            {renderTodos}
                                        </div>
                                        <br />
                                        <ul className="pagination">
                                            {renderPrevBtn}
                                            {pageDecrementBtn}
                                            {renderPageNumbers}
                                            {pageIncrementBtn}
                                            {renderNextBtn}
                                        </ul>
                                    </div> : null}

                                {gallery.photos.length !== 0 ?
                                    <div>
                                        {/* {console.log(gallery.photos)} */}
                                        {/* <ImageMasonry
                                            numCols={3}
                                            animate={true}
                                            scrollable={false}
                                            className="imagesGallery"
                                            forceOrder={true}
                                        >
                                            {gallery.photos.map((item, i) => {
                                                // console.log(item);
                                                return (
                                                    <div style={{ padding: "10px", backgroundColor: "transparent" }} key={i} >
                                                        <figure className="snip0016 caption" style={{ ...cont }} >
                                                            <img className="gallery" alt={i} src={item.src} style={{ height: "100%", width: "100%" }} />
                                                            <figcaption>
                                                                {!item.price_status ?
                                                                    <span className="freeLabel"><img src={FreeLabel} alt="Free" /></span>
                                                                    : null}
                                                                <div className="details">
                                                                    <h2>{item.title}</h2>
                                                                    <p>{item.description}</p>
                                                                </div>
                                                                <div className="links">
                                                                    <Link className="waves-effect waves-light btn black" style={{ width: "auto" }} to={{ pathname: `/details/${item.id}`, state: item }}><i style={{ width: "auto" }} className="small material-icons left">file_download</i><em style={{ width: "auto" }} >Download</em></Link>&nbsp;&nbsp;&nbsp;
                                                            <a href="" className="waves-effect waves-light btn light-blue" style={{ width: "auto" }} onClick={(e) => {
                                                                        e.preventDefault();
                                                                        this.openLightbox(i)
                                                                    }}><i className="small material-icons left" style={{ width: "auto" }} >visibility</i><em style={{ width: "auto" }} > Preview </em> </a>
                                                                </div>
                                                            </figcaption>
                                                        </figure>
                                                    </div>
                                                )
                                            })}
                                        </ImageMasonry> */}
                                    </div> : null}

                            </div>

                            <ModalGateway>
                                {this.state.viewerIsOpen ? (
                                    <Modal onClose={this.closeLightbox}>
                                        <Carousel
                                            currentIndex={this.state.currentImage}
                                                views={this.props.match.params.category !== "all" ? gallery.searchByCategory(this.props.match.params.category).map(x => ({
                                                    ...x,
                                                    srcset: x.src,
                                                    caption: x.title
                                                })) :  
                                                gallery.photos.map(x => ({
                                                    ...x,
                                                    srcset: x.src,
                                                    caption: x.title
                                                }))
                                            }
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
                }
                }
            </GalleryContext.Consumer >
        )
    }
}
export default Images;