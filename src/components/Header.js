import React from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import { Slide } from 'react-slideshow-image';
import $ from 'jquery';

import { AuthContext } from '../context/AuthContext';
import firebase from 'firebase';
import swal from 'sweetalert';






class Header extends React.Component {

    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
    }


    componentDidMount = () => {
        // this._handleScroll();
        window.addEventListener('scroll', this.handleScroll);
        // $(".button-collapse").sideNav();
        M.Sidenav.init(document.querySelectorAll('.sidenav'), { 'edge': 'left' });

    }

    logout = () => {
        firebase.auth().signOut().then(() => {
            swal("logut", "Sucessfully Logout", "success");

        }).catch((error) => {
            alert("Something Went Wrong Please Try Again");
        });
    }

    handleScroll = () => {
        const scrollY = window.scrollY
        if (scrollY > 20) {
            $('.nav').addClass('solid');
            // $('.nav').removeClass('transparent');

        } else {
            $('.nav').removeClass('solid');
            // $('.nav').addClass('transparent');
        }


    }


    render() {
        const logofooter = require('./ss-logo-png-4.png');

        const properties = {
            duration: 5000,
            transitionDuration: 500,
            infinite: true,
            indicators: false,
            arrows: true,
            pauseOnHover: true,
            onChange: (oldIndex, newIndex) => {
                // console.log(`slide transition from ${oldIndex} to ${newIndex}`);
            }
        }
        const Slideshow = () => {
            return (
                <div className="slide-container">
                    <Slide {...properties}>
                        <div className="each-slide">
                            
                            <div id="slide1">
                                {/* <span>Slide 1</span> */}
                            </div>
                        </div>
                        <div className="each-slide">
                            <div id="slide2">
                                {/* <span>Slide 2</span> */}
                            </div>
                        </div>
                        <div className="each-slide">
                            <div id="slide3" >
                                {/* <span>Slide 3</span> */}
                            </div>
                        </div>
                    </Slide>
                </div>
            )
        }

        return (
            <AuthContext.Consumer>
                {(auth) => {

                    return (
                        <div>
                            <div className="container-fluid p-0" onScroll={this.handleScroll}>
                                <div className="navbar navbar-fixed">
                                    <nav className="transparent z-depth-0 valign-wrapper black-text" id="home" style={{ height: '100px', top: '10px' }}>
                                        {/* <nav className="black-text solid" id="home" style={{ height: 'auto', top: '10px' }}> */}
                                        <div className="nav container">
                                            <div className="nav-wrapper" style={{ width: '100%', paddingRight: '50px' }} >
                                                <Link to="/" className="brand-logo1 p-l-50" style={{ marginTop: "-10px" }} > <img src={logofooter} alt="logo" width="90px" /></Link>
                                                <Link to="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons text-black">menu</i></Link>
                                                <ul className="right hide-on-med-and-down">
                                                    <li className="right" style={{ color: 'black' }}><Link to="/login"><button className="waves-effect waves-light btn p-2" style={{ textTransform: 'none', letterSpacing: '2px' }} >Join</button></Link></li>
                                                    <li className="right">
                                                        {!auth.isAuthenticated ?
                                                            <Link to="/login"> <b>Login</b></Link>
                                                            : <Link to="#" > <b onClick={this.logout} >Logout</b></Link>}
                                                    </li>
                                                    <li><Link to="/"> <b>Home</b></Link></li>
                                                    <li><Link to="/images"> <b>Images</b> </Link></li>
                                                    <li><Link to="/user/dashboard"><b>Upload</b></Link></li>
                                                    <li><Link to="/cart"><b>Cart</b></Link></li>
                                                    <li className="right">
                                                        <Link to="#" style={{ height: 'auto', width: '60px' }}></Link>
                                                    </li>
                                                    <li><Link to="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></Link></li>
                                                </ul>
                                            </div>

                                        </div>
                                    </nav>

                                    <ul className="sidenav" id="mobile-demo">
                                        <li className="center">
                                            <Link to="/">
                                                <img src={logofooter} alt="logo" width="60px" />
                                            </Link>
                                        </li>
                                        <li><Link to="/"> <b>Home</b></Link></li>
                                        <li><Link to="/images"> <b>Images</b> </Link></li>
                                        <li><Link to="/user/dashboard"><b>Upload</b></Link></li>
                                        <li><Link to="/cart"><b>Cart</b></Link></li>
                                        <li className="right">
                                            <Link to="#" style={{ height: 'auto', width: '60px' }}></Link>
                                        </li>
                                        <li className="right" style={{ color: 'black' }}><Link to="/login"><button className="waves-effect waves-light btn p-2" style={{ textTransform: 'none', letterSpacing: '2px' }} >Join</button></Link></li>
                                        <li className="right">
                                            {!auth.isAuthenticated ?
                                                <Link to="/login"> <b>Login</b></Link>
                                                : <Link to="#" > <b onClick={this.logout} >Logout</b></Link>}
                                        </li>
                                    </ul>

                                </div>

                                <section>
                                    <Slideshow />
                                </section>
                                <div className="container-fluid">
                                    <div className="row black" >
                                        <div className="container">
                                            <div className="row" style={{ paddingTop: "13px" }} >
                                                <div className="col-md-2"></div>
                                                <div className="col-md-4">
                                                    <p className="white-text">
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


                            </div>
                        </div>
                    );
                }}
            </AuthContext.Consumer>

        )
    }
}

export default Header;