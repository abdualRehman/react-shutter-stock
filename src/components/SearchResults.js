import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { GalleryContext } from '../context/GalleryContext';
import Header from './Header';
import LoadSearchImages from './LoadSearchImages';
// import LoadSearchImages2 from './LoadSearchImages2';




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




class SearchResults extends Component {
    static contextType = GalleryContext;

    constructor(props, context) {
        super(props, context);
        this.state = {
            photos: null,
            previewSrc: "",
            currentImage: "",
            viewerIsOpen: false,
            keyword: "",
            category: "",

            similarTagsArray: [],
            categoryName: null,
            categoryFormat: null,
            backdrop: true,
            displaySection: "none",
            filteredArray:[],
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
        }else{
            var category = this.props.match.params.category
            var keyword = this.props.match.params.keyword
    
            
            this.setState({ similarTagsArray: [] })
    
            var categoryTag = gallery.SearchSimilarTags(category);
            var keywordTag = gallery.SearchSimilarTags(keyword);

            const result = gallery.searchByCategoryAndKeyword(keyword, category);
            
    
            this.setState({  filteredArray: result ,similarTagsArray: this.state.similarTagsArray.concat(categoryTag).concat(keywordTag) });


            var categoryName;
            switch (category) {
                case 'all':
                    categoryName = "All";

                    break;
                case 'texture':
                    categoryName = "Texture";

                    break;
                case 'pattren':
                    categoryName = "Pattren";

                    break;
                case 'degitalTextileDesign':
                    categoryName = "Degital And Textile Design";

                    break;
                case 'botanicalFlowersAndLeaves':
                    categoryName = "Botanical Flowers And Leaves";

                    break;
                case 'ornamentsAndBaroque':
                    categoryName = "Ornaments And Baroque";
                    break;
                default:
                    return false;
            }

            this.setState({displaySection: "none" , backdrop: true});

            setTimeout(()=>{
                this.setState({ categoryFormat: categoryName, category: category, keyword: keyword, backdrop: false , displaySection: "block" });    
            },1500)
            
            


        }
    }




    searchTag = (tagValue) => {
        window.location.pathname = `/search/${this.state.category}/${tagValue}`
    };

    searchCategory = (searchCategory) => {
        window.location.pathname = `/photos/${searchCategory}`
    }

    render() {
        const { classes } = this.props;
        return (
            <div style={{ backgroundColor: "white", minHeight: "100vh" }} >
                <Header />

                <div className={classes.categoryList} >
                    <ul>
                        <li onClick={() => this.searchCategory('all')} className={`${this.state.categoryFormat === 'All' ? 'active' : null}`} >
                            All
                        </li>
                        <li onClick={() => this.searchCategory('ornamentsAndBaroque')} className={`${this.state.categoryFormat === 'Ornaments And Baroque' ? 'active' : null}`} >
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
                    <h1 className={classes.SearchHeaderTitle} >"<span>{this.state.keyword}</span>"  Photos</h1>
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
                    // <LoadSearchImages2 photos={this.state.filteredArray} />
                    <LoadSearchImages photos={this.state.filteredArray} />
                }

                {/* <div style={{ display: `${this.state.displaySection}` }} >
                    <LoadSearchImages props={this.props} />
                </div> */}

                <Backdrop className={classes.backdrop} open={this.state.backdrop} >
                    <CircularProgress color="inherit" />
                </Backdrop>

            </div>
        )
    }
}
export default withStyles(useImageStyles)(SearchResults);