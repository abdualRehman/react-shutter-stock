import React from 'react';
// import '../../App.css';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import swal from 'sweetalert';
import M from 'materialize-css';

import { withRouter } from "react-router-dom";


class AdminHeader extends React.Component {
    componentDidMount = () => {
        // $(".button-collapse").sideNav();
        M.Sidenav.init(document.querySelectorAll('.sidenav'), { 'edge': 'left' });
        M.Sidenav.init(document.querySelectorAll('#slide-out'), { 'edge': 'right' });
        M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), { 'alignment': 'left', 'coverTrigger': false, 'constrainWidth': false });
    }

    logout = () => {
        firebase.auth().signOut().then(() => {

            swal("logut", "Sucessfully Logout", "success");
            // window.location.href = "http://localhost:3000/";
            this.props.history.push({
                pathname: '/'
              });
        }).catch((error) => {
            alert("Something Went Wrong Please Try Again");
        });
    }

    render() {

        const Logo = require('../../images/logo.PNG');
        // const personImage = require('../../images/personImage.png')
        const personImage = require('../../images/person-male.png')
        return (

            <AuthContext.Consumer>
                {(authContext) => {
                    
                    return (

                        <div className="container-fluid p-0">
                            <nav className="grey darken-3" >
                                <div className="container">
                                    <div className="nav-wrapper" >
                                        <Link to="/" className="brand-logo"> <img src={Logo} alt="logo" width="40px" /></Link>
                                        <Link to="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
                                        <ul className="right hide-on-med-and-down">
                                            <li><Link to="/user/dashboard"><i className="fa fa-tachometer-alt"></i> Dashboard</Link></li>
                                            <li><Link to="/user/add-new-image"><i className="fa fa-plus"></i> Add Images</Link></li>
                                            <li><Link to="/user/uploads"><i className="fa fa-upload"></i> Uploaded Images</Link></li>
                                            <li><Link to="/user/orders"><i className="fa fa-cart-arrow-down"></i> Orders</Link></li>
                                            <li>
                                                <div>
                                                    <Link to="#" className='dropdown-trigger' style={{ height: 'auto', width: '60px' }} data-target='dropdown3'>
                                                        <img src={personImage} style={{ borderRadius: '5px' }} height="100px" alt={authContext.user.first_name} />
                                                    </Link>
                                                </div>
                                            </li>

                                            <li><Link to="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></Link></li>
                                        </ul>
                                    </div>

                                </div>
                            </nav>

                            <ul className="sidenav" id="mobile-demo">
                                <li className="center">
                                    <Link className="sidenav-close" to="/">
                                        <img src={Logo} alt="logo" width="40px" />
                                    </Link>
                                </li>
                                <li></li>
                                <li><Link className="sidenav-close" to="/user/dashboard"><i className="fa fa-tachometer-alt"></i> Dashboard</Link></li>
                                <li><Link className="sidenav-close" to="/user/add-new-image"><i className="fa fa-plus"></i> Add Images</Link></li>
                                <li><Link className="sidenav-close" to="/user/uploads"><i className="fa fa-upload"></i> Uploaded Images</Link></li>
                                <li><Link className="sidenav-close" to="/user/orders"><i className="fa fa-cart-arrow-down"></i>Orders</Link></li>
                                {/* <li><Link to="#" className='dropdown-trigger' style={{ height: 'auto', width: '60px' }} data-target='dropdown3' ><i className="fa fa-user"></i>User</Link></li> */}
                                <li>
                                    <div className="account-dropdown__item" onClick={this.logout}>
                                        <Link className="sidenav-close" to="#">
                                            <i className="zmdi zmdi-power" ></i>Logout
                                        </Link>
                                    </div>
                                </li>

                            </ul>



                            {/* <!-- Dropdown Structure --> */}
                            <ul id='dropdown1' className='dropdown-content dropdown1'>
                                <li>  <div className="notifi__title">
                                    <p>You have 3 Notifications</p>
                                </div>
                                </li>
                                <li className="divider" tabIndex="-1"></li>
                                <li>
                                    <div className="notifi__item">
                                        <div className="bg-c1 img-cir img-40">
                                            <i className="zmdi zmdi-email-open"></i>
                                        </div>
                                        <div className="content">
                                            <p>You got Link email notification</p>
                                            <span className="date">April 12, 2018 06:50</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="notifi__item">
                                        <div className="bg-c2 img-cir img-40">
                                            <i className="zmdi zmdi-account-box"></i>
                                        </div>
                                        <div className="content">
                                            <p>Your account has been blocked</p>
                                            <span className="date">April 12, 2018 06:50</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="notifi__item">
                                        <div className="bg-c3 img-cir img-40">
                                            <i className="zmdi zmdi-file-text"></i>
                                        </div>
                                        <div className="content">
                                            <p>You got Link new file</p>
                                            <span className="date">April 12, 2018 06:50</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="notifi__footer">
                                        <Link to="#">All notifications</Link>
                                    </div>
                                </li>
                            </ul>
                            <ul id='dropdown2' className='dropdown-content' >
                                <li>

                                    <div className="notifi__item">
                                        <div className="bg-c1 img-cir img-40">
                                            <i className="zmdi zmdi-email-open"></i>
                                        </div>
                                        <div className="content">
                                            <p>You got Link email notification</p>
                                            <span className="date">April 12, 2018 06:50</span>
                                        </div>
                                    </div>
                                </li>
                                <li>

                                    <div className="account-dropdown__item">
                                        <Link to="#">
                                            <i className="zmdi zmdi-settings"></i>Setting</Link>
                                    </div>

                                </li>
                                <li>
                                    <div className="account-dropdown__item">
                                        <Link to="#">
                                            <i className="zmdi zmdi-money-box"></i>Billing</Link>
                                    </div>
                                </li>


                            </ul>
                            <ul id='dropdown3' className='dropdown-content' >
                                <li>
                                    <div className="notifi__item">

                                        <div className="content">
                                            <h5 className="name">
                                                {authContext.user.first_name}
                                            </h5>
                                            <span className="email"> {authContext.user.email}</span>
                                        </div>
                                    </div>
                                </li>
                                <li>

                                    <div className="account-dropdown__item">
                                        <Link to="#">
                                            <i className="zmdi zmdi-settings"></i>Setting</Link>
                                    </div>

                                </li>
                                <li className="divider" tabIndex="-1"></li>
                                <li>
                                    <div className="account-dropdown__item" onClick={this.logout}>
                                        <Link to="#">
                                            <i className="zmdi zmdi-power" ></i>Logout
                                        </Link>
                                    </div>
                                </li>


                            </ul>





                            {/* <Link to="#" data-target="slide-out" className="sidenav-trigger show-on-large"><i className="material-icons">menu</i></Link>
                <ul id="slide-out" className="sidenav sidenav-fixe">
                    <li><div className="user-view">
                        <Link to="#name"><span className="white-text name">John Doe</span></Link>
                        <Link to="#email"><span className="white-text email">jdandturk@gmail.com</span></Link>
                    </div></li>
                    <li><Link to="#!"><i className="material-icons">cloud</i>First Link With Icon</Link></li>
                    <li><Link to="#!">Second Link</Link></li>
                    <li><div className="divider"></div></li>
                    <li><Link className="subheader">Subheader</Link></li>
                    <li><Link className="waves-effect" to="#!">Third Link With Waves</Link></li>
                </ul>


                <br />
                <br />
                <hr /> */}


                        </div>
                    );
                }}
            </AuthContext.Consumer>

        );
    }
}
export default withRouter(AdminHeader);
