import React from 'react';
import '../App.css';


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


    searchResult = () => {
        var categoryName = this.props.match.params.category;
        this.props.history.push({
            pathname: `/search/${categoryName}/${this.state.search}`,
            search: `?query=${this.state.search}`,
        });

    }
    handleChage = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }


    render() {
        return (
            <div>
                <div className="container">
                    <nav className="search-nav">
                        <div className="nav-wrapper" style={{ borderRadius: "20px" }}>
                            <form onSubmit={this.searchResult}>
                                <div className="input-field">
                                    <input id="search" type="search" className="search-field" name="search" onChange={this.handleChage} placeholder="Search here..." required />
                                    <label className="label-icon" htmlFor="search"><i onClick={this.searchResult} className="material-icons">search</i></label>
                                    <i className="material-icons">close</i>
                                </div>
                            </form>
                        </div>
                    </nav>

                </div>
                {/* <SearchResult /> */}
            </div>
        )
    }
}


export default withRouter(Search);