import React from 'react';
import Header2 from './Header2';
import Footer from './Footer';

import { Link } from 'react-router-dom';
// for gallery
import Gallery from 'react-photo-masonry';
import Carousel, { Modal, ModalGateway } from "react-images";



// for import images
import { GalleryContext } from '../context/GalleryContext';

// jQuery
import $ from 'jquery';

export default class SearchResult extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: null,
            previewSrc: "",
            currentImage: "",
            viewerIsOpen: false,
            keyword: "",
            category: "",


            todos: null,
            currentPage: 1,
            todosPerPage: 50,
            upperPageBound: 25,
            lowerPageBound: 0,
            isPrevBtnActive: 'disabled',
            isNextBtnActive: '',
            pageBound: 25
        }
        this.handleClick = this.handleClick.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);
        this.btnNextClick = this.btnNextClick.bind(this);
        this.btnPrevClick = this.btnPrevClick.bind(this);
        this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);

    }

    componentDidMount = () => {
        this.setState({
            category: this.props.match.params.category,
            keyword: this.props.match.params.keyword
        });
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


    // new images data
    componentDidUpdate = () => {
        $("ul li.active").removeClass('active');
        $('ul li.' + this.state.currentPage).addClass('active');
    }

    handleClick = (listid, todos) => {
        console.log(todos);

        this.setState({
            currentPage: listid
        });
        $("ul li.active").removeClass('active');
        $('ul li.' + listid).addClass('active');

        this.setPrevAndNextBtnClass(listid, todos);
    }

    setPrevAndNextBtnClass = (listid, todos) => {
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

    getAllData = (gallery) => {
        var resultData =  gallery.searchByCategoryAndKeyword(this.state.keyword, this.state.category);
        
        // console.log(resultData); 
        // if(resultData.length !== 0 ){  //ye nai kam kia 
        //     if(this.state.photos === null){
        //         this.setState({
        //             photos: resultData
        //         });
        //     }
        // }

        return resultData;

    }



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

                    const todos = this.getAllData(gallery);

                    const { currentPage, todosPerPage, upperPageBound, lowerPageBound, isPrevBtnActive, isNextBtnActive } = this.state;
                    // Logic for displaying current todos
                    const indexOfLastTodo = currentPage * todosPerPage;
                    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
                    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);



                    // currently workingtodos
                    const renderTodos = currentTodos.map((item, index) => {
                        return (
                            <div className="brick" key={index} >
                                <figure className="snip0016 caption" style={{ ...cont }} >
                                    {item.src ?
                                        <img className="gallery" alt={index} src={item.src} /> : <img className="gallery" alt={index} src={FreeLabel} />}
                                    <figcaption>
                                        {!item.price_status ?
                                            <span className="freeLabel"><img src={FreeLabel} alt="Free" /></span>
                                            : null}
                                        <div className="links">
                                            <Link className="waves-effect waves-light btn green m-l-10" to={{ pathname: `/details/${item.id}`, state: item }}><i className="small material-icons">file_download</i></Link>
                                            <a href="" className="waves-effect waves-light btn bg-info text-white m-l-10" onClick={(e) => {
                                                e.preventDefault();
                                                this.openLightbox(indexOfFirstTodo + index)
                                            }}><i className="small material-icons">visibility</i> </a>
                                        </div>
                                    </figcaption>
                                </figure>

                            </div>
                        )
                    });

                    // Logic for displaying page numbers
                    const pageNumbers = [];
                    for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
                        pageNumbers.push(i);
                    }
                    const renderPageNumbers = pageNumbers.map(number => {
                        if (number === 1 && currentPage === 1) {
                            return (
                                <li key={number} className='active' id={number}><a href='#' id={number} onClick={() => this.handleClick(number, todos)}>{number}</a></li>
                            )
                        }
                        else if ((number < upperPageBound + 1) && number > lowerPageBound) {
                            return (
                                <li key={number} className={`${number}`} id={number}><a href='#' id={number} onClick={() => this.handleClick(number, todos)}>{number}</a></li>
                            )
                        }
                    });
                    let pageIncrementBtn = null;
                    if (pageNumbers.length > upperPageBound) {
                        pageIncrementBtn = <li className=''><a href='#' onClick={() => this.btnIncrementClick(todos)}> &hellip; </a></li>
                    }
                    let pageDecrementBtn = null;
                    if (lowerPageBound >= 1) {
                        pageDecrementBtn = <li className=''><a href='#' onClick={() => this.btnDecrementClick(todos)}> &hellip; </a></li>
                    }
                    let renderPrevBtn = null;
                    if (isPrevBtnActive === 'disabled') {
                        renderPrevBtn = <li className={isPrevBtnActive}><span id="btnPrev"> <i className="material-icons">chevron_left</i> </span></li>
                    }
                    else {
                        renderPrevBtn = <li className={isPrevBtnActive}><a href='#' id="btnPrev" onClick={() => this.btnPrevClick(todos)}> <i className="material-icons">chevron_left</i> </a></li>
                    }
                    let renderNextBtn = null;
                    if (isNextBtnActive === 'disabled') {
                        renderNextBtn = <li className={isNextBtnActive}><span id="btnNext"> <i className="material-icons">chevron_right</i> </span></li>
                    }
                    else {
                        renderNextBtn = <li className={isNextBtnActive}><a href='#' id="btnNext" onClick={() => this.btnNextClick(todos)}> <i className="material-icons">chevron_right</i> </a></li>
                    }





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
                                        <Link to="/images/all" className="stext-109 cl4">
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

                                <div>
                                    <div className="masonry" style={{ width: "100%", margin: "0px", padding: "0px" }}>
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
                                </div>

                            </div>


                            <ModalGateway>
                                {this.state.viewerIsOpen ?
                                    
                                     (
                                    <Modal onClose={this.closeLightbox}>
                                        <Carousel
                                            currentIndex={this.state.currentImage}
                                            // views={this.state.photos.map(x => ({
                                            views={gallery.searchByCategoryAndKeyword(this.state.keyword , this.state.category).map(x => ({
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
            </GalleryContext.Consumer>
        )
    }

}