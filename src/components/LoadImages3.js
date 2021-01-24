import React, { useState, useEffect, useCallback, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';


import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import './css/LoadImages.css';
import RenderSmoothImage from 'render-smooth-image-react';
import Carousel, { Modal, ModalGateway } from "react-images";

import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
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

})
);




const breakpointColumnsObj = {
    default: 3,
    700: 2,
    500: 1
};



const perPage = 6;

function LoadImages(props) {

    const classes = useStyles();



    const [element, setElement] = useState(null);
    const [loading, setLoading] = useState(false);
    const [more, setMore] = useState(true);
    const [data, setData] = useState([]);



    const after = useRef(0);
    const prevY = useRef(0);

    const observer = useRef(
        new IntersectionObserver(
            entries => {
                const firstEntry = entries[0];
                const y = firstEntry.boundingClientRect.y;

                if (prevY.current > y) {
                    loadMore();
                }

                prevY.current = y;
            },
            { threshold: 1 }
        )
    );



    const fetchData = useCallback(async afterNumber => {

        const ndata = props.photos.slice(afterNumber, afterNumber + perPage);

        setLoading(false);
        const status = 200;
        return { status, ndata }

    }, []);



    const handleInitial = useCallback(
        async afters => {
            setLoading(true);
            setTimeout(async () => {
                const newData = await fetchData(afters);
                const { status, ndata } = newData;
                if (status === 200) {
                    setNext(ndata.length)
                    setData(data => [...data, ...ndata]);
                }
            }, 2000);
        },
        [fetchData]
    );


    const setNext = (length) => {
        setMore(length === perPage)
        after.current = after.current + length;
    }

    const loadMore = () => {
        handleInitial(after.current);
    };

    useEffect(() => {
        handleInitial(after.current);
    }, [handleInitial]);

    useEffect(() => {
        const currentElement = element;
        const currentObserver = observer.current;
        if (currentElement) {
            currentObserver.observe(currentElement);
        }
        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [element]);








    const [currentImage, setCurrentImage] = useState(null);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = (index) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    };
    const closeLightbox = () => {
        setCurrentImage('');
        setViewerIsOpen(false);
    };

    return (
        <>

            <Container maxWidth="lg">
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                    {data.map((item, index) => {
                        return <div key={index}>
                            <figure className={`snip0016 caption ${classes.image1}`}>
                                <RenderSmoothImage src={item.src} alt={`${index}`} />
                                <figcaption>
                                    <div className="caption">
                                        <Link className="text-grey grey-lighten-5" to={{ pathname: `/photo_details/${item.id}`, state: item }}><i className="small material-icons">file_download</i></Link>
                                        <a href="#" className="text-white" onClick={(e) => {
                                            e.preventDefault();
                                            openLightbox(index)
                                        }}><i className="small material-icons">visibility</i> </a>
                                    </div>
                                </figcaption>
                            </figure>
                        </div>
                    })}
                </Masonry>


                {loading &&
                    <LoadMore />
                }



                {!loading && more &&
                    <div ref={setElement} style={{ background: "transparent", width: "100%", height: "170px", marginBottom: "30px" }}>

                    </div>
                }
                {!loading && !more &&
                    <div className={classes.endContent} >End of Content</div>
                }

            </Container>

            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            views={data.map(x => ({
                                ...x,
                                srcset: x.src,
                                caption: x.title,

                            }))
                            }
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </>
    )
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


export default LoadImages;
