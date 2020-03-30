import React from 'react';
import Header from './Header';
import $ from 'jquery';
import '../App.css';

class Content extends React.Component {
    checkValue = (event) => {
        $('.input100').each(() => {
                if (event.target.value.trim() !== "") {
                    event.target.classList.add('has-val');
                }
                else {
                    event.target.classList.remove('has-val');
                }
        })
    }

    render() {



        return (
            <div className="Content">
                <div className="container-fluid p-0">
                    <Header />
                </div>


                {/* <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100">
                            <form className="login100-form validate-form">
                                <span className="login100-form-title p-b-43">
                                    Login to continue
					            </span>
                                <Link to="/user/contact" >Go to Contact</Link>


                                <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                    <input className="input100" onBlur={this.checkValue} type="text" autoComplete="off" name="email" />
                                    <span className="focus-input100"></span>
                                    <span className="label-input100">Email</span>
                                </div>

                                <div className="wrap-input100 validate-input" onBlur={this.checkValue} data-validate="Password is required">
                                    <input className="input100" type="password" name="pass" autoComplete="off" />
                                    <span className="focus-input100"></span>
                                    <span className="label-input100">Password</span>
                                </div>

                                <div className="flex-sb-m w-full p-t-3 p-b-32">
                                    <div className="txt1">
                                        <span className="txt2">don't have an account? </span><span style={{textDecoration:'underline'}}> Sign Up</span>
                                    </div>
                                    <div>
                                        <Link to="#" className="txt1">
                                            Forgot Password?
                                            </Link>
                                    </div>
                                </div>


                                <div className="container-login100-form-btn">
                                    <button className="login100-form-btn">
                                        Login
						            </button>
                                </div>

                                <div className="text-center p-t-46 p-b-20">
                                    <span className="txt2">
                                        or sign up using
						            </span>
                                </div>

                                <div className="login100-form-social flex-c-m">
                                    <span className="login100-form-social-item flex-c-m bg1 m-r-5">
                                        <i className="fa fa-facebook-f" aria-hidden="true"></i>
                                    </span>

                                    <span className="login100-form-social-item flex-c-m bg2 m-r-5">
                                        <i className="fa fa-twitter" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </form>
                            <div className="login100-more backGround">
                            </div>
                        </div>
                    </div>
                </div>
 */}




            </div>
        )
    }
}

export default Content;