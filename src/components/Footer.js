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
                                            <Link to="/photos/ornamentsAndBaroque"> Ornaments And Baroque </Link>
                                        </li>
                                        <li>
                                            <Link to="/photos/texture"> Texture </Link>
                                        </li>
                                        <li>
                                            <Link to="/photos/pattren"> Pattren </Link>
                                        </li>
                                        <li>
                                            <Link to="/photos/degitalTextileDesign"> Degital Textile Design </Link>
                                        </li>
                                        <li>
                                            <Link to="/photos/botanicalFlowersAndLeaves"> Botanical Flowers And Leaves </Link>
                                        </li>
                                        <li>
                                            <Link to="/photos/all">All Above</Link>
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
                                            <Link to="/photos/all"> Stock photos </Link>
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
                                      
                                    </ul>

                                </div>
                                <div className="col-sm-4 col-xs-6">
                                    <h5 className="white-text">Get in touch</h5>
                                    <ul>
                                        <li>
                                            <Link to="/contact-us"> Contact us </Link>
                                        </li>
                                      
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