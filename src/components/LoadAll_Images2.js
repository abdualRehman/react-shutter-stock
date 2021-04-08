import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import { GalleryContext } from '../context/GalleryContext';

import Header from './Header';
// import LoadImages from './LoadImages';
// import LoadImages2 from './LoadImages2';
import LoadImages3 from './LoadImages3';




import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';




const useImageStyles = theme => ({
    relatedTags: {
        margin: "10px auto",
        maxWidth: "1400px",
        paddingLeft: "2rem",
        paddingRight: "2rem",
        whiteSpace: "nowrap",
        "-webkit-overflow-scrolling": "touch",
        overflowX: "auto",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
        '&>*': {
            marginRight: "1rem",
        },
        '&::-webkit-scrollbar': {
            display: "none",
        }
    },
    tagName: {
        fontSize: "14px",
        lineHeight: "23px",
        fontWeight: 700,
        marginTop: 0,
        marginBottom: 0,
        textTransform: "capitalize",
        display: "inline-flex",
        padding: ".35rem",
        paddingRight: "1.25rem",
        boxShadow: "0 3px 5px 0 rgba(0,0,0,.08)",
        border: "none",
        '& .MuiChip-label': {
            fontFamily: "-apple-system,BlinkMacSystemFont,segoe ui,roboto,oxygen,cantarell,helvetica neue,ubuntu,sans-serif",
            color: "#5e5e5e",
        }
    },

    SearchHeader: {
        margin: "auto",
        maxWidth: "1400px",
        paddingLeft: "2rem",
        paddingRight: "2rem",
        paddingTop: "2rem",
        paddingBottom: ".5rem",
    },
    SearchHeaderTitle: {
        display: "block",
        fontSize: "26px",
        lineHeight: "1.2",
        fontWeight: 800,
        marginTop: 0,
        textTransform: "capitalize",
        textAlign: "center",
        marginBottom: "1rem",
        fontFamily: "-apple-system,BlinkMacSystemFont,segoe ui,roboto,oxygen,cantarell,helvetica neue,ubuntu,sans-serif",
        color: "#1a1a1a",
        "&>*": {
            fontFamily: "-apple-system,BlinkMacSystemFont,segoe ui,roboto,oxygen,cantarell,helvetica neue,ubuntu,sans-serif",
        }

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





class LoadAll_Images2 extends Component {
    static contextType = GalleryContext;

    constructor(props, context) {
        super(props, context);
        // this.child = React.createRef();
        this.state = {
            similarTagsArray: [],
            categoryName: null,
            categoryFormat: null,
            displaySection: "none",
            backdrop: true,
            sortPhotos:[],
        }

    }

    componentDidMount = () => {
        this.getData();
    }

    getData = () => {
        var gallery = this.context;


        if (gallery.photos.length <= 0) {

            setTimeout(() => {
                this.getData();
            }, 3000)


        } else {


            var categoryName = window.location.pathname;
            categoryName.indexOf(2);
            categoryName.toLowerCase();
            categoryName = categoryName.split("/")[2];
            this.setState({ similarTagsArray: [] });


            var category , photoArray;
            switch (categoryName) {
                case 'all':
                    category = "All";
                    this.setState({ sortPhotos: gallery.photos });
                    break;
                case 'texture':
                    category = "Texture";
                    var texturTags = gallery.SearchSimilarTags("texture");

                    photoArray = gallery.searchByCategory(categoryName);

                    this.setState({ similarTagsArray: this.state.similarTagsArray.concat(texturTags) , sortPhotos:photoArray });
                    break;
                case 'pattren':
                    category = "Pattren";
                    var pattren = gallery.SearchSimilarTags("pattren");

                    photoArray = gallery.searchByCategory(categoryName);

                    this.setState({ similarTagsArray: this.state.similarTagsArray.concat(pattren) , sortPhotos:photoArray  });
                    break;
                case 'degitalTextileDesign':
                    category = "Degital And Textile Design";
                    var TextileDesign = gallery.SearchSimilarTags("textileDesign");

                    photoArray = gallery.searchByCategory(categoryName);

                    this.setState({ similarTagsArray: this.state.similarTagsArray.concat(TextileDesign) , sortPhotos:photoArray  });
                    break;
                case 'botanicalFlowersAndLeaves':
                    category = "Botanical Flowers And Leaves";
                    var botanical = gallery.SearchSimilarTags("botanical");
                    var Flowers = gallery.SearchSimilarTags("flowers");
                    var Leaves = gallery.SearchSimilarTags("leaves");

                    photoArray = gallery.searchByCategory(categoryName);

                    this.setState({ similarTagsArray: this.state.similarTagsArray.concat(botanical).concat(Flowers).concat(Leaves) , sortPhotos:photoArray  });
                    break;
                case 'ornamentsAndBaroque':
                    category = "Ornaments And Baroque";
                    var Ornaments = gallery.SearchSimilarTags("ornament");
                    var Baroque = gallery.SearchSimilarTags("baroque");

                    photoArray = gallery.searchByCategory(categoryName);

                    this.setState({ similarTagsArray: this.state.similarTagsArray.concat(Ornaments).concat(Baroque) , sortPhotos:photoArray  });

                    break;
                default:
                    return false;
            }

            this.setState({ categoryFormat: category, displaySection: "block", backdrop: false });
            

            
            if(this.state.sortPhotos.length > 0 ){
                // this.child.current.getUpdate();
            }
        }


    }


    searchTag = (tagValue) => {
        var categoryName = window.location.pathname;
        categoryName.indexOf(2);
        categoryName.toLowerCase();
        categoryName = categoryName.split("/")[2];

        
        this.props.history.replace({
            pathname: `/search/${categoryName}/${tagValue}`,
        });

    };

    searchCategory = (searchCategory) => {

        this.props.history.replace({
            pathname: `/photos/${searchCategory}`,
        });
        this.getData();
        this.setState({displaySection: "none"});

        setTimeout(()=>{
            this.setState({displaySection: "block"})
        },2000)
        // window.location.reload(false);


    }

    render() {
        const { classes } = this.props;



        return (

            <GalleryContext.Consumer>
                {(gallery) => {
                    return (

                        <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
                            <Header />


                            <div className={classes.categoryList} >
                                <ul>
                                    <li onClick={() => this.searchCategory('all')} className={`${this.state.categoryFormat === 'All' ? 'active' : null}`} >
                                        All
                                    </li>
                                    <li onClick={() => this.searchCategory('ornamentsAndBaroque')}  className={`${this.state.categoryFormat === 'Ornaments And Baroque' ? 'active' : null}`} >
                                         Ornaments And Baroque 
                                    </li>
                                    <li onClick={() => this.searchCategory('texture')} className={`${this.state.categoryFormat === 'Texture' ? 'active' : null}`} >
                                        Texture
                                    </li>
                                    <li onClick={() => this.searchCategory('pattren')} className={`${this.state.categoryFormat === 'Pattren' ? 'active' : null}`} >
                                        Pattren
                                    </li>
                                    <li onClick={() => this.searchCategory('degitalTextileDesign')} className={`${this.state.categoryFormat === 'Degital And Textile Design' ? 'active' : null}`} >
                                        Degital Textile Design
                                    </li>
                                    <li onClick={() => this.searchCategory('botanicalFlowersAndLeaves')} className={`${this.state.categoryFormat === 'Botanical Flowers And Leaves' ? 'active' : null}`} >
                                        Botanical Flowers And Leaves
                                    </li>
                                </ul>
                            </div>





                            <div className={classes.SearchHeader} >
                                <h1 className={classes.SearchHeaderTitle} ><span> {this.state.categoryFormat} </span> Photos</h1>
                            </div>

                            {this.state.similarTagsArray.length > 0 &&
                                <Box component="div" m={1} className={classes.relatedTags}>
                                    {this.state.similarTagsArray.slice(0, 15).map((item, i) => {
                                        return <Chip size="medium" key={i} className={classes.tagName} variant="outlined" label={item.tag} onClick={() => this.searchTag(item.tag)} avatar={<Avatar src={item.src} />} />
                                    })
                                    }
                                </Box>
                            }


                            {this.state.displaySection === "block" &&
                                // <LoadImages2 ref={this.child} photos={this.state.sortPhotos} />
                                <LoadImages3 photos={this.state.sortPhotos} />
                                // <LoadImages photos={this.state.sortPhotos} />
                            }


                            <Backdrop className={classes.backdrop} open={this.state.backdrop} >
                                <CircularProgress color="inherit" />
                            </Backdrop>

                        </div>

                    )
                }}
            </GalleryContext.Consumer>

        )
    }
}
export default withStyles(useImageStyles, { withTheme: true })(LoadAll_Images2);