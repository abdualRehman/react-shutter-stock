import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
    render() {
        return (
            <div>

                <footer className="page-footer" style={{ backgroundColor: "#0c121c" }}>
                    <div className="container">
                        <h3 className="grey-text">Over 315,408,056 royalty-free images with 1,271,550 new stock images added weekly.</h3>
                    </div>
                    <div className="container-fluid footerLinks">
                        <div className="container">
                            <div className="row" >
                                <div className="col-sm-4 col-xs-6">
                                    <h5 className="white-text">Browse by Category</h5>
                                    <ul>
                                        <li>
                                            <Link to="/images/ornamentsAndBaroque"> Ornaments And Baroque </Link>
                                        </li>
                                        <li>
                                            <Link to="/images/texture"> Texture </Link>
                                        </li>
                                        <li>
                                            <Link to="/images/pattren"> Pattren </Link>
                                        </li>
                                        <li>
                                            <Link to="/images/degitalTextileDesign"> Degital Textile Design </Link>
                                        </li>
                                        <li>
                                            <Link to="/images/botanicalFlowersAndLeaves"> Botanical Flowers And Leaves </Link>
                                        </li>
                                        <li>
                                            <Link to="/images/all">All Above</Link>
                                        </li>
                                    </ul>

                                </div>
                                <div className="col-sm-4 col-xs-6">
                                    <h5 className="white-text">Company</h5>
                                    <ul>
                                        <li>
                                            <Link to="/"> Home </Link>
                                        </li>
                                        <li>
                                            <Link to="/images/all"> Stock photos </Link>
                                        </li>
                                        <li>
                                            <Link to="/about-us">About us </Link>
                                        </li>
                                        <li>
                                            <Link to="/terms"> Terms &#38; Conditions </Link>
                                        </li>
                                        <li>
                                            <Link to="/privacy"> Privacy Policy </Link>
                                        </li>
                                        {/* <li>
                                            <Link to=""> Footage </Link>
                                        </li>
                                        <li>
                                            <Link to="">Music</Link>
                                        </li>
                                        <li>
                                            <Link to="">Blog</Link>
                                        </li>
                                        <li>
                                            <Link to="">Royalty free images</Link>
                                        </li>
                                        <li>
                                            <Link to="">Free image of the week</Link>
                                        </li> */}
                                    </ul>

                                </div>
                                <div className="col-sm-4 col-xs-6">
                                    <h5 className="white-text">Get in touch</h5>
                                    <ul>
                                        <li>
                                            <Link to="/contact-us"> Contact us </Link>
                                        </li>
                                        {/* <li>
                                            <Link to=""> Offset </Link>
                                        </li>
                                        <li>
                                            <Link to="">Premier </Link>
                                        </li>
                                        <li>
                                            <Link to=""> PremiumBeat </Link>
                                        </li>
                                        <li>
                                            <Link to=""> Custom </Link>
                                        </li> */}
                                    </ul>
                                    <h5 className="white-text">Customers</h5>
                                    <ul>
                                        <li className="grey-text">
                                          +92310 7078901
                                        </li>
                                        <li>
                                        <a href="mailto:support@sstock.com.pk">support@sstock.com.pk</a>
                                        </li>
                                    </ul>
                                  

                                </div>
                                {/* <div className="col-md-3">
                                    <h5 className="white-text">Help</h5>
                                    <ul>
                                        <li>
                                            <Link to=""> Get help </Link>
                                        </li>
                                    </ul>
                                    <h5 className="white-text">Partner</h5>
                                    <ul>
                                        <li>
                                            <Link to=""> Developer </Link>
                                        </li>
                                        <li>
                                            <Link to="">Affiliate/Reseller </Link>
                                        </li>
                                        <li>
                                            <Link to=""> International reseller </Link>
                                        </li>
                                    </ul>
                                    <h5 className="white-text">Legal</h5>
                                    <ul>
                                        <li>
                                            <Link to="">Terms of use</Link>
                                        </li>
                                        <li>
                                            <Link to="">Privacy policy</Link>
                                        </li>
                                        <li>
                                            <Link to="">License agreement</Link>
                                        </li>
                                    </ul>

                                </div> */}
                                <hr />
                            </div>
                        </div>



                        
                        <div className="footer-copyright">
                            <div className="container">
                            <hr style={{borderBottom: "1px solid #474759"}} />
                                © 20013-2020 S-Stock, Inc.
                        <div className="grey-text text-lighten-4 right">
                                    <ul className="footerIcons">
                                        <li> <Link to=""> <i className="fab fa-2x fa-facebook-square"></i> </Link>  </li>
                                        <li> <Link to=""> <i className="fab fa-2x fa-twitter-square"></i> </Link>  </li>
                                        <li> <Link to=""> <i className="fab fa-2x fa-instagram"></i> </Link>  </li>
                                        <li> <Link to=""> <i className="fab fa-2x fa-linkedin"></i> </Link>  </li>
                                        <li> <Link to=""> <i className="fab fa-2x fa-youtube"></i> </Link>  </li>
                                        <li> <Link to=""> <i className="fab fa-2x fa-vimeo-square"></i> </Link>  </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>




            </div>
        )
    }
}

export default Footer;