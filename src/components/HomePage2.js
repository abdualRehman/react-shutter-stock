import React from 'react';
import Header from './Header';
import Footer from './Footer';

import { GalleryContext } from '../context/GalleryContext';
import ImageMasonry from 'react-image-masonry';

import M from 'materialize-css';
// import $ from 'jquery';
import { Link } from 'react-router-dom';
import '../App.css';

class HomePage2 extends React.Component {

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

        // this.props.history.push({
        //     pathname: '/search',
        //     search: `?query=${this.state.search}`,
        //     state: { detail: result, keywords: this.state.search }
        // });
        this.props.history.push({
            // hash: `${this.state.search}`,
            pathname: `/search/all/${this.state.search}`,
            search: `?query=${this.state.search}`,

        });

    }
    handleChage = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }




    componentDidMount = () => {
        M.Parallax.init(document.querySelectorAll('.parallax'));
        M.Materialbox.init(document.querySelectorAll('.materialboxed'));
    }

    render() {
        const image = require("../images/art2.jpg");
        const paralex1 = require('../images/signup.jpg');
        const artist1 = require('../images/artist1.webp');
        const artist2 = require('../images/artist2.jpg');
        const artist3 = require('../images/artist3.jpg');
        const artist4 = require('../images/artist4.jpg');

        const botanicalFlowersAndLeaves = require('../images/categories/botanicalFlowersAndLeaves.jpg');
        const degitalTextileDesign = require('../images/categories/degitalTextileDesign.jpg');
        const ornamentsAndBaroque = require('../images/categories/ornamentsAndBaroque.jpg');
        const pattern = require('../images/categories/pattern.jpg');
        const texture = require('../images/categories/texture.jpg');

        const categoryArray = [
            {
                src: botanicalFlowersAndLeaves,
                name: 'Botanical Flowers And Leaves',
                keyword: "botanicalFlowersAndLeaves"
            },
            {
                src: pattern,
                name: 'Pattern',
                keyword: "pattren"
            },
            {
                src: ornamentsAndBaroque,
                name: 'Ornaments And Baroque',
                keyword: "ornamentsAndBaroque"

            },
            {
                src: degitalTextileDesign,
                name: 'Degital Textile Design',
                keyword: "degitalTextileDesign"

            },
            {
                src: texture,
                name: 'Texture',
                keyword: "texture"
            },
        ]
        return (
            <GalleryContext.Consumer>
                {(galleryContext) => {
                    return (
                        <div>
                            <div className="homePageSection1">
                                <div className="container-fluid1">
                                    <Header />
                                </div>
                                <div className="container">
                                    <div className="topTitle">
                                        <h1>S-Stock</h1>
                                        <h3>Find the perfect stock asset for your next creative project</h3>
                                    </div>
                                    <form className="topSearch" onSubmit={(event) => {
                                        event.preventDefault();
                                        this.searchResult(galleryContext)
                                    }}>
                                        <input type="text" style={{ padding: "0px 3px", border: "none", margin: "0px" }} onChange={this.handleChage} placeholder="Search Products" name="search" id="search" />
                                    </form>

                                </div>
                            </div>
                            <div className="container-fluid black">
                                <div className="row">
                                    <div className="container">
                                        <div className="row" style={{ paddingTop: "13px" }} >
                                            <div className="col-md-6">
                                                <p className="white-text center p-t-9">
                                                    Looking for corporate, agency or media solutions?
                                        </p>
                                            </div>
                                            <div className="col-md-6">
                                                <button className="waves-effect btn transparent" style={{ border: '1px solid white' }}>
                                                    Explore Enterprise Solutions
                                        </button>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* section2 */}
                            <div className="container">
                                <div className="row">
                                    <div className="container1">
                                        <br /><br />
                                        <h2>Explore New S-Stock Collection</h2>
                                        <p>of creative assets & royalty-free stock assets.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">


                                <div className="container">


                                    <div className="row">

                                        {/* <div className="masonry" style={{ width: "100%", margin: "0px", padding: "0px" }} > */}

                                            {categoryArray.map((item, index) => {
                                                return (
                                                    <div key={index} className="col-xs-12 col-sm-6 col-lg-4" >
                                                        <div className="card">
                                                            <div className="card-image">
                                                                <figure className="snip1321" >
                                                                    <img className="responsive-img" style={{height:"300px"}} src={item.src} alt="sq-sample26" />
                                                                    <figcaption><i className="ion-upload"></i>
                                                                        <Link to={`/images/${item.keyword}`}>
                                                                            <button className="collectionButton">Details</button>
                                                                        </Link> <br />
                                                                        <h4>{item.name}</h4>
                                                                    </figcaption>
                                                                </figure>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    // <div className="brick" key={index}  >
                                                    //     <figure className="snip0016 snip1321">
                                                    //         <img className="gallery" alt={index} src={item.src} />
                                                    //         <figcaption>
                                                    //             <i className="ion-upload"></i>
                                                    //                         <Link to={`/images/${item.keyword}`}>
                                                    //                          <button className="collectionButton">Details</button>
                                                    //                         </Link> <br />
                                                    //                      <h4>{item.name}</h4>
                                                    //         </figcaption>
                                                    //     </figure>
                                                    // </div>

                                                )
                                            })}
                                        {/* </div> */}


                                    </div>


                                    <br /> <br />
                                    <hr style={{ border: "1px solid lightgray" }} />
                                </div>
                            </div>



                            {/* section3 */}
                            <div className="container">
                                <div className="row">
                                    <h2>Popular stock image searches in 2020</h2>
                                </div>
                                <div className="row popularSearch">
                                    <li className="col-md-3"> <Link to="">Birthday</Link> </li>
                                    <li className="col-md-3"> <Link to="">Facebook Logo</Link> </li>
                                    <li className="col-md-3"> <Link to="">Unicorn</Link> </li>
                                    <li className="col-md-3"> <Link to="">Shamrock</Link> </li>
                                    <li className="col-md-3"> <Link to="">Solar System</Link> </li>
                                    <li className="col-md-3"> <Link to="">Rainbow</Link> </li>
                                    <li className="col-md-3"> <Link to="">Congratulations</Link> </li>
                                    <li className="col-md-3"> <Link to="">Thank You</Link> </li>
                                    <li className="col-md-3"> <Link to="">Smiley Face</Link> </li>
                                    <li className="col-md-3"> <Link to="">Leprechaun</Link> </li>
                                    <li className="col-md-3"> <Link to="">Spring</Link> </li>
                                    <li className="col-md-3"> <Link to="">Flower Drawing</Link> </li>
                                    <li className="col-md-3"> <Link to="">Food Chain</Link> </li>
                                    <li className="col-md-3"> <Link to="">Butterfly</Link> </li>
                                    <li className="col-md-3"> <Link to="">Bird Drawing</Link> </li>
                                    <li className="col-md-3"> <Link to="">Great Job</Link> </li>
                                    <li className="col-md-3"> <Link to="">White Background</Link> </li>
                                    <li className="col-md-3"> <Link to="">Skull and Crossbones</Link> </li>
                                    <li className="col-md-3"> <Link to="">Purple Background</Link> </li>
                                    <li className="col-md-3"> <Link to="">Beach</Link> </li>
                                </div>
                            </div>



                            {/* section4 */}
                            <div className="parallax-container section3" style={{ height: "fit-content" }}>
                                <div className="section  no-pad-bot">
                                    <div className="container">
                                        <br /><br />
                                        <div className="row">
                                            <div className="col-md-7">
                                                <h1 className="text-white">
                                                    Access exclusive features with a free account
                                    </h1><br /><br />

                                                <h4 className="text-white">
                                                    Create your free account and start downloading incredible royalty-free images, stock footage and music tracks now. Save and share your favorite assets, try watermarked royalty free images or videos before you buy, plus so much more.
                                    </h4>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="section3Sinup white">
                                                    <h2>Sign up</h2>
                                                    <div className="container">
                                                        <div className="input-field col-sm-12">
                                                            <input id="Email" type="text" className="validate" autoComplete="off" />
                                                            <label htmlFor="Email">Email Address</label>
                                                        </div>
                                                        <div className="input-field col-sm-12">
                                                            <input id="password" type="password" className="validate" autoComplete="off" />
                                                            <label htmlFor="password">Password</label>
                                                        </div>
                                                        <button className="col-sm-12 btn-large waves-effect waves-light red white-text" style={{ borderRadius: "20px" }} >Continue</button>
                                                        <div className="col-sm-12">
                                                            <br />
                                                            By creating an account, I agree to S-Stock's
                                            <Link to="/terms">Website terms</Link> &#38; <Link to="/privacy">Privacy Policy</Link>.
                                            </div>
                                                        <hr />
                                                        Already have an account? <Link to="/login">Log in</Link>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br /><br />
                                </div>
                                <div className="parallax"><img src={paralex1} alt="Unsplashed background img 1" />
                                </div>
                            </div>


                            <div className="contributersSection">
                                <div className="container">
                                    <h3 className="center">ARTISTS RULE</h3><br />
                                    <p>Get inspired by these S-Stock contributors</p><br />
                                    <hr style={{ width: "30%", border: "1px solid #cacaca", margin: "auto", textAlign: "center" }} />
                                </div>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6 col-lg-3">
                                            <div className="art1">
                                                <img src={artist1} className="responsive-img  circle" alt="artist1" /><br />
                                                <h3>William Images</h3>
                                                <h5>Photographer</h5>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6  col-lg-3">
                                            <div className="art1">
                                                <img src={artist2} className="responsive-img  circle" alt="artist2" /><br />
                                                <h3>Liam</h3>
                                                <h5>Illustrator</h5>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6  col-lg-3">
                                            <div className="art1">
                                                <img src={artist3} className="responsive-img  circle" alt="artist3" /><br />
                                                <h3>Alexander</h3>
                                                <h5>Photographer</h5>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6  col-lg-3">
                                            <div className="art1">
                                                <img src={artist4} className="responsive-img  circle" alt="artist4" /><br />
                                                <h3>Abigail</h3>
                                                <h5>Illustrator</h5>
                                            </div>
                                        </div>


                                    </div>
                                </div>


                            </div>






                            <br />
                            <div className="container" style={{ padding: "10px" }} >
                                <h6 className="gray-text center" style={{ color: "gray" }} >*The 10 images per month annual plan will automatically charge you each month for USD $29, allowing you to continue to download content without interruption. If you wish to cancel during your free trial period, visit the Plans section of the My Account page here. To ensure seamless service, the charge will happen 4 days before your free trial period ends. You may be subject to a plan price adjustment if you cancel during your first year after the free trial period. After that, your plan will automatically renew for another 1-year commitment, unless you contact us. For more details on billing, click here. Limit 1 free trial per person. Users are not eligible for this PICK10FREE promotion if they have used any other prior Free Trial coupons with the same user account, email address, or payment method. This promotion may not be combined with any other offers, coupons, or discounts for the remainder of the subscription.</h6>
                            </div>
                            <Footer />








                        </div>
                    )
                }}
            </GalleryContext.Consumer>


        )
    }
}

export default HomePage2;