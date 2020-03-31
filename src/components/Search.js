import React from 'react';
import '../App.css';
import { GalleryContext } from '../context/GalleryContext';
// import {Router} from 'react-router' ;
import PropTypes from "prop-types"; //fail


import { withRouter } from "react-router-dom";






class Search extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.searchResult = this.searchResult.bind(this);
        this.handleChage = this.handleChage.bind(this);
        this.state = {
            search: '',
        }
    }


    searchResult = (galleryContext) => {
    

        var searchFor = this.state.search;

        var result = galleryContext.searchByTitle(searchFor);

        this.props.history.push({
            pathname: '/search',
            search: `?query=${this.state.search}`,
            state: { detail: result , keywords: this.state.search }
          });

    }
    handleChage = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }


    render() {
        return (
            <GalleryContext.Consumer>
                {(galleryContext) => {
                    return (

                        <div>
                            <div className="container">
                                <nav className="search-nav">
                                    <div className="nav-wrapper" style={{ borderRadius: "20px" }}>
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            this.searchResult(galleryContext)
                                        }}>
                                            <div className="input-field">
                                                <input id="search" type="search" className="search-field" name="search" onChange={this.handleChage} placeholder="Search here..." required />
                                                <label className="label-icon" htmlFor="search"><i onClick={() => this.searchResult(galleryContext)} className="material-icons">search</i></label>
                                                <i className="material-icons">close</i>
                                            </div>
                                        </form>
                                    </div>
                                </nav>

                            </div>
                            {/* <SearchResult /> */}
                        </div>
                    )
                }}
            </GalleryContext.Consumer>
        )
    }
}


export default withRouter(Search);