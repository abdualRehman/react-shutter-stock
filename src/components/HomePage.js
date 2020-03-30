import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import M from 'materialize-css';

class HomePage extends React.Component {

    componentDidMount = () => {
        M.Parallax.init(document.querySelectorAll('.parallax'));
    }




    render() {
        const googlePic = require('../images/google.png');
        const amc = require('../images/amc.png');
        const aol = require('../images/aol.png');
        const bbdo = require('../images/bbdo.png');
        const buzzfeed = require('../images/buzzfeed.png');
        const capital = require('../images/capital.png');
        const marvel = require('../images/marvel.png');
        const card1 = require('../images/card1.jpg');
        const card2 = require('../images/card02.jpg');
        const card3 = require('../images/card3.jpg');
        const paralex1 = require('../images/paralex1.jpg');
        return (
            <div>
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col-sm-2 "></div>
                        <div className="col-sm-12 col-md-6 col-lg-4">

                            <div className="wrapper">
                                <div className="secondCard">
                                   
                                    <div className="card-content white-text text-lighten-2">
                                        <span className="card-title">Services</span>
                                        <p className="white-text">I am a very simple card. I am good at containing small bits of information.
                                        I am convenient because I require little markup to use effectively.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* <div className="col-sm-4"> */}
                        <div className="col-sm-12 col-md-6 col-lg-4">

                            <div className="wrapper">
                                <div className="secondCard">
                                    <div className="card-content white-text text-lighten-2">
                                        <span className="card-title">About</span>
                                        <p className="white-text">I am a very simple card. I am good at containing small bits of information.
                                        I am convenient because I require little markup to use effectively.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-sm-2"></div> */}
                    </div>
                </div>
                <br/><br/>
                <div className="container m-auto">
                    <h3><b> Shutterstock powers creativity for global brands</b></h3>
                    <div className="row">

                        <div className="col-sm-8 creativity">
                            <ul style={{ listStyle: 'none', display: 'flex' }}>


                                <li>
                                    <img className="responsive-img" src={googlePic} alt="google" />
                                </li>
                                <li>
                                    <img className="responsive-img" src={amc} alt="google" />
                                </li>
                                <li>
                                    <img className="responsive-img" src={aol} alt="google" />
                                </li>
                                <li>
                                    <img className="responsive-img" src={bbdo} alt="google" />
                                </li>
                                <li>
                                    <img className="responsive-img" src={buzzfeed} alt="google" />
                                </li>
                                <li>
                                    <img className="responsive-img" src={capital} alt="google" />
                                </li>
                                <li>
                                    <img className="responsive-img" src={marvel} alt="google" />

                                </li>
                            </ul>

                        </div>

                    </div>
                </div>
                <div className="container-fluid">
                    <div className="container">
                        <h2>Royalty-free stock images, photos, videos, and more for your creative projects</h2>

                    </div>
                </div>
                <div className="container">
                    <div className="row section2">
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="card">
                                <div className="card-image waves-effect">
                                    <img className="responsive-img" height="100px" src={card1} alt="card1" />
                                    <div className="card-stacked">
                                        {/* <div className="card-content">
                                            <p>I am a very simple card. I am good at containing small bits of information.</p>
                                            <p>I am a very simple card. I am good at containing small bits of information.</p>
                                        </div> */}
                                        <div className="card-action">
                                            <h2>Photos</h2>
                                            <p>Lorem ipsum dolotam quod numquam aliquam dicta nulla reprehenderit asperiores dolore Molestiae</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="card">
                                <div className="card-image waves-effect">
                                    <img src={card2} alt="card2" />
                                    <div className="card-stacked">
                                        {/* <div className="card-content">
                                            <p>I am a very simple card. I am good at containing small bits of information.</p>
                                        </div> */}
                                        <div className="card-action">
                                            <h2>Footage</h2>
                                            <p>Lorem ipsum dolor sit amet, consecteturdmw totam quod numquliquam dicta nlla reprehenderit asperiores dolore Molestiae</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="card">
                                <div className="card-image waves-effect">
                                    <img src={card3} alt="card2" />
                                    <div className="card-stacked">
                                        <div className="card-action">
                                            <h2>Music</h2>
                                            <p>Molestiae totam quod numquam .this lorem is  Molestiae aliquam dicta nulla reprehenderit asperiores dolore Molestiae</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <h2>Popular stock image searches in March</h2>
                </div>

                <div className="container">
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

                {/* section 3 */}

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
                                                By creating an account, I agree to Shutterstock's
                                            <Link to="">Website terms</Link>, <Link to="">Privacy policy</Link> and <Link to="">Licensing terms</Link>.
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
                <br />
                <div className="container" style={{ padding: "10px" }} >
                    <h6 className="gray-text center" style={{ color: "gray" }} >*The 10 images per month annual plan will automatically charge you each month for USD $29, allowing you to continue to download content without interruption. If you wish to cancel during your free trial period, visit the Plans section of the My Account page here. To ensure seamless service, the charge will happen 4 days before your free trial period ends. You may be subject to a plan price adjustment if you cancel during your first year after the free trial period. After that, your plan will automatically renew for another 1-year commitment, unless you contact us. For more details on billing, click here. Limit 1 free trial per person. Users are not eligible for this PICK10FREE promotion if they have used any other prior Free Trial coupons with the same user account, email address, or payment method. This promotion may not be combined with any other offers, coupons, or discounts for the remainder of the subscription.</h6>
                </div>

                <Footer />

            </div>
        )
    }
}
export default HomePage;