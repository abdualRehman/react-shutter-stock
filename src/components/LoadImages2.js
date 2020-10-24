import React, { Component } from 'react';


import { withStyles } from '@material-ui/core/styles';

import { GalleryContext } from '../context/GalleryContext';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import './css/LoadImages.css';
import RenderSmoothImage from 'render-smooth-image-react';
import Carousel, { Modal, ModalGateway } from "react-images";

import Container from '@material-ui/core/Container';

// import InfiniteScroll from 'react-infinite-scroll-component';
import InfiniteScroll from 'react-infinite-scroller';


const useStyles = (theme) => ({
    image1: {
        maxHeight: "650px",
        background: "transparent",
    },
    endContent: {
        textAlign: "center",
        fontSize: "20px",
        fontWeight: "700",
        fontFamily: "Open Sans,sans-serif",
        marginBottom: "10px",
    },
});





const breakpointColumnsObj = {
    default: 3,
    700: 2,
    500: 1
};

class LoadImages2 extends Component {

    static contextType = GalleryContext;

    constructor(props) {
        // this.loadMore = this.loadMore.bind(this);
        super(props)
        this.getUpdate = this.getUpdate.bind(this)
        this.state = {
            currentImage: null,
            viewerIsOpen: false,
            // items: [],
            hasMore: true,

            more: true,
            data: [],
            after: 0,
            perPage: 8,

            posts: [],
            page: 0,
            loading: false,
            prevY: 0,

            photos: props.photos,
            entities: null,

        }
    }


    componentDidMount = () => {
        this.getUsers(this.state.page);

        var options = {
            root: null, // Page as root
            rootMargin: "0px",
            threshold: 1.0
        };
        // Create an observer
        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this), //callback
            options
        );
        //Observ the `loadingRef`
        this.observer.observe(this.loadingRef);
    }

    handleObserver(entities, observer) {


        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {

            // const lastUser = this.state.users[this.state.users.length - 1];
            // const curPage = lastUser.id;
            // this.getUsers(curPage);
            // this.setState({ page: curPage });
            this.getUsers(this.state.page);

        }
        this.setState({ prevY: y });

    }


    getUsers(page) {


        // setTimeout(() => {

        const gallery = this.state.photos;


        if (this.state.data.length >= gallery.length) {
            this.setState({ hasMore: false })
            return;
        } else {
            const { after, perPage, more } = this.state;
            this.setState({ loading: true });

            if (more) {
                // const newData = gallery.photos.slice(after, after + perPage);
                const newData = gallery.slice(page, page + perPage);
                
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        data: [...this.state.data, ...newData],
                        more: newData.length === this.state.perPage,
                        page: this.state.page + newData.length
                    })

                }, 3000);
            }
        }

        // }, 7000)


    }





    getUpdate = () => {
        // this.componentDidMount();
        
        // this.setState({ data: [], photos: this.props.photos });
        // this.getUpdate(this.state.page);
     
    }







    openLightbox = (index) => {
        this.setState({ currentImage: index, viewerIsOpen: true });
    };
    closeLightbox = () => {
        this.setState({ currentImage: null, viewerIsOpen: false });
    };

    render() {
        const { classes } = this.props;


        return (
            <>
                <Container maxWidth="lg">
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column">

                        {this.state.data.map((item, index) => {
                            return <div key={index} >
                                <figure className={`snip0016 caption ${classes.image1}`}>
                                    <RenderSmoothImage src={item.src} alt={`${index}`} />
                                    <figcaption>
                                        <div className="caption">
                                            <Link className="text-grey grey-lighten-5" to={{ pathname: `/photo_details/${item.id}`, state: item }}><i className="small material-icons">file_download</i></Link>
                                            <a href="#" className="text-white" onClick={(e) => {
                                                e.preventDefault();
                                                this.openLightbox(index)
                                            }}><i className="small material-icons">visibility</i> </a>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                        })}
                    </Masonry>




                    {!this.state.loading && this.state.more &&
                        <div ref={(loadingRef) => (this.loadingRef = loadingRef)}
                            style={{ background: "transparent", width: "100%", height: "170px", marginBottom: "30px" }}>

                        </div>
                    }

                    {!this.state.loading && !this.state.more &&
                        <div className={classes.endContent} >End of Content</div>
                    }

                    {this.state.loading &&
                        <LoadMore />
                    }

                </Container>

                <ModalGateway>
                    {this.state.viewerIsOpen ? (
                        <Modal onClose={this.closeLightbox}>
                            <Carousel
                                currentIndex={this.state.currentImage}
                                views={this.state.data.map(x => ({
                                    ...x,
                                    srcset: x.src,
                                    caption: x.title
                                }))
                                }
                            />
                        </Modal>
                    ) : null}
                </ModalGateway>

            </>
        )
    }
}


function LoadMore() {
    const loaderGif = require('./loader.gif');
    return (
        <div className="post_loader_outer" >
            <div className="post_loader" style={{ textAlign: "center", height: "100px" }}>
                <img src={loaderGif} alt="Loader" style={{ marginTop: "50px" }} />
            </div>
        </div>
    )
}


export default withStyles(useStyles)(LoadImages2);