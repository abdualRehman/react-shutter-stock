import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
    render() {
        return (
            <div>

                <footer className="page-footer" style={{ backgroundColor: "#0c121c" }}>

                    <div className="container">
                        <br />
                        <h3 className="grey-text">Over 315,408,056 royalty-free images with 1,271,550 new stock images added weekly.</h3>
                    </div>
                    <div className="container">
                        <div className="row footerLinks" >
                            <div className="col-md-3">
                                <h5 className="white-text">Our company</h5>
                                <ul>
                                    <li>
                                        <Link to=""> Sell content </Link>
                                    </li>
                                    <li>
                                        <Link to=""> Subscribe/Renew </Link>
                                    </li>
                                    <li>
                                        <Link to=""> About us </Link>
                                    </li>
                                    <li>
                                        <Link to=""> Careers </Link>
                                    </li>
                                    <li>
                                        <Link to=""> Press/Media </Link>
                                    </li>
                                    <li>
                                        <Link to="">Investor relations</Link>
                                    </li>
                                </ul>

                            </div>
                            <div className="col-md-3">
                                <h5 className="white-text">Shutterstock</h5>
                                <ul>
                                    <li>
                                        <Link to=""> Home </Link>
                                    </li>
                                    <li>
                                        <Link to=""> Stock photos </Link>
                                    </li>
                                    <li>
                                        <Link to="">Vector images </Link>
                                    </li>
                                    <li>
                                        <Link to=""> Editorial </Link>
                                    </li>
                                    <li>
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
                                    </li>
                                </ul>

                            </div>
                            <div className="col-md-3">
                                <h5 className="white-text">Discover</h5>
                                <ul>
                                    <li>
                                        <Link to=""> Bigstock </Link>
                                    </li>
                                    <li>
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
                                    </li>
                                </ul>
                                <h5 className="white-text">Apps</h5>
                                <ul>
                                    <li>
                                        <Link to="">Mobile apps</Link>
                                    </li>
                                </ul>

                            </div>
                            <div className="col-md-3">
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

                            </div>
                            <hr />
                        </div>
                    </div>

                    <div className="footer-copyright">
                        <div className="container">
                            © 2003-2020 Shutterstock, Inc.
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
                </footer>




            </div>
        )
    }
}

export default Footer;