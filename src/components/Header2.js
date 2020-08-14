import React from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import { AuthContext } from '../context/AuthContext';
import firebase from 'firebase';
import swal from 'sweetalert';


class Header2 extends React.Component {



    componentDidMount = () => {
        M.Sidenav.init(document.querySelectorAll('.sidenav'), { 'edge': 'left' });
        window.scrollTo(0, 0)
    }

    logout = () => {
        firebase.auth().signOut().then(() => {
            swal("logut", "Sucessfully Logout", "success");

        }).catch((error) => {
            alert("Something Went Wrong Please Try Again");
        });
    }


    render() {
        const Logo = require('../images/logo.PNG');

        return (
            <AuthContext.Consumer>
                {(auth) => {
                    
                    return (

                        <div>
                            <div className="container-fluid">
                                <div className="navbar navbar-wrapper">
                                    <nav className="transparent z-depth-0 valign-wrapper black-text" id="home" style={{ height: '100px', top: '10px' }}>
                                        <div className="solid container-fluid" style={{ transform: "translateX(30px)" }}>
                                            <div className="nav-wrapper" style={{ width: '100%', paddingRight: '50px' }} >
                                                <Link to="/" className="brand-logo1 p-l-50"  > <img src={Logo} alt="logo" /></Link>
                                                <Link to="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons text-black">menu</i></Link>
                                                <ul className="right hide-on-med-and-down">

                                                 

                                                    <li><Link to="/"> <b>Home</b></Link></li>
                                                    <li><Link to="/images/all"> <b>Images</b> </Link></li>
                                                    {auth.user.role === "admin" ? 
                                                        <li><Link to="/user/dashboard"><b>Upload</b></Link></li>
                                                    : null }
                                                  
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

                                                    <li><Link to="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></Link></li>
                                                </ul>
                                            </div>

                                        </div>
                                    </nav>

                                    <ul className="sidenav" id="mobile-demo">
                                        <li className="center">
                                            <Link  to="/" className="brand-logo1 sidenav-close" style={{ "display": "contents"}} >
                                                <img src={Logo} alt="logo" />
                                            </Link>
                                        </li>
                                        <li><Link className="sidenav-close" to="/"> <b>Home</b></Link></li>
                                        <li><Link className="sidenav-close" to="/images/all"> <b>Images</b> </Link></li>
                                        {auth.user.role === "admin" ? 
                                                        <li><Link className="sidenav-close" to="/user/dashboard"><b>Upload</b></Link></li>
                                                    : null }
                                        <li><Link className="sidenav-close" to="/cart"><b>Cart</b></Link></li>
                                        <li className="right">
                                            <Link className="sidenav-close" to="#" style={{ height: 'auto', width: '60px' }}></Link>
                                        </li>
                                        <li className="right" style={{ color: 'black' }}><Link className="sidenav-close" to="/login"><button className="waves-effect waves-light btn p-2" style={{ textTransform: 'none', letterSpacing: '2px' }} >Join</button></Link></li>

                                        <li className="right">
                                            {!auth.isAuthenticated ?
                                                <Link className="sidenav-close" to="/login"> <b>Login</b></Link>
                                                : <Link className="sidenav-close" to="#" > <b onClick={this.logout} >Logout</b></Link>}
                                        </li>

                                    </ul>

                                </div>
                            </div>

                        </div>
                    )
                }}
            </AuthContext.Consumer>
        )
    }
}


export default Header2;