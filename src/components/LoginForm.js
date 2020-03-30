import React, { Component } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import swal from 'sweetalert';
import firebase from '../config/firebase';
import $ from 'jquery';




class LoginForm extends Component {
    state = {
        email: '',
        password: '',
    }
    handleChange = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

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


    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(context.user.password);

        if (this.state.email === "") {
            return alert("Please enter email.");
        }
        if (this.state.password === "" || this.state.password.length < 6) {
            return alert("Please Enter a Valid Password.");
        }
        // if(context.user.email == this.state.email && context.user.password == this.state.password){
        //     return alert("login sucessfull");
        // }else{
        //     return alert("login fail");
        // }
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
            swal("Login", "Successfully Logedin", "Success")
            window.location.href = "http://localhost:3000"
        }).catch((error) => {
            console.log(error);
            swal("Login Failed", "Somthing Wrong!", "warning")
        })


    }


    loginWithFacebook = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('user_birthday');
        firebase.auth().useDeviceLanguage();
        provider.setCustomParameters({
            'display': 'popup'
        });

        firebase.auth().signInWithPopup(provider).then((result) => {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            const db = firebase.firestore();
            
            db.collection('users').doc(user.uid).set({
                first_name: user.displayName,
                last_name: "",
                email: "",
                password: "",
                confirmPassword: "",
                role: 'user',
                tocken: user.refreshToken,
                
            }).then((user) => {
                swal("Login", "Successfully Logedin", "Success")
                window.location.href = "http://localhost:3000"
            })
            // ...
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

            console.log(errorCode)
            console.log(errorMessage)
            console.log(email)
            console.log(credential)

            swal("Login Failed", errorMessage , "warning")
            // ...
        });
    }



    render() {



        return (



            <form className="login100-form" onSubmit={this.handleSubmit}>

                <span className="login100-form-title p-b-43">
                    Login to continue
                            </span>


                <div className="input-field col s12">
                    <input onBlur={this.checkValue} onChange={this.handleChange} id="email" type="text" name="email" className="validate" />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="input-field col s12">
                    <input onBlur={this.checkValue} onChange={this.handleChange} id="password" name="password" type="password" className="validate" />
                    <label htmlFor="password">Password</label>
                </div>


                {/* <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                <input className="input100" onBlur={this.checkValue} onChange={this.handleChange} type="email" autoComplete="off" name="email" />
                                <span className="focus-input100"></span>
                                <span className="label-input100">Email</span>
                            </div>

                            <div className="wrap-input100 validate-input" onBlur={this.checkValue} onChange={this.handleChange} data-validate="Password is required">
                                <input className="input100" type="password" name="password" autoComplete="off" />
                                <span className="focus-input100"></span>
                                <span className="label-input100">Password</span>
                            </div> */}


                <div className="container-login100-form-btn">
                    <button className="login100-form-btn" >
                        Login
                                </button>
                </div>

                <div className="text-center p-t-46 p-b-20">
                    <span className="txt2">
                        or sign up using
                                </span>
                </div>

                <div className="login100-form-social flex-c-m">

                    <span className="login100-form-social-item flex-c-m bg1 m-r-5" onClick={this.loginWithFacebook} >
                        <i className="fab fa-facebook" aria-hidden="true" ></i>
                    </span>
                    <span className="login100-form-social-item flex-c-m bg2 m-r-5">
                        <i className="fab fa-twitter" aria-hidden="true"></i>
                    </span>
                </div>

            </form>


        );

    }
};

class RegisterForm extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }


    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state);
        var validate = false;
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;




        if (this.state.first_name === "") {
            M.toast({ html: 'First Name is Requirder', classes: 'red lighten-1' });
        }
        else if (this.state.last_name === "") {
            M.toast({ html: 'Last Name is Requirder', classes: 'red lighten-1' });
        }
        else if (this.state.email === "") {
            M.toast({ html: 'Please enter email!', classes: 'red lighten-1' })
        }
        else if (!this.state.email.match(mailformat)) {
            M.toast({ html: 'Please enter Valid email!', classes: 'red lighten-1' });
        }
        else if (this.state.password === "" || this.state.confirmPassword === "") {
            M.toast({ html: 'Password Required!', classes: 'red lighten-1' })
        }
        else if (this.state.password !== this.state.confirmPassword) {
            M.toast({ html: "You're password doesn't match.", classes: 'red lighten-1' });
        }
        else {
            // M.toast({html: "Successfully Registered", classes: 'green lighten-1'});
            validate = true;
        }

        if (validate) {
            console.log("processing");
            // var newUser = {
            //     first_name: this.state.first_name,
            //     last_name: this.state.last_name,
            //     email: this.state.email,
            //     password: this.state.password,
            //     confirmPassword: this.state.confirmPassword,
            //     role: 'user',
            // }

            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((responce) => {
                // M.toast({ html: "Successfully Registered", classes: 'green lighten-1' });
                console.log("Register Successfull");

                swal("Login", "Successfully Registered", "success")

                const db = firebase.firestore();
            
                db.collection('users').doc(responce.user.uid).set({
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    email: this.state.email,
                    password: this.state.password,
                    confirmPassword: this.state.confirmPassword,
                    role: 'user',

                }).then((user) => {
                    window.location.href = "http://localhost:3000";
                })

            }).catch((error) => {

                var errorCode = error.code;
                var errorMessage = error.message;

                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                }
                swal("Error", errorMessage, "warning");
            });

        }




    }

    render() {
        return (
            <form className="login101-form" onSubmit={this.handleSubmit}>


                <span className="login100-form-title p-b-43">
                    Register
            </span>

                <div className="container">
                    <div className="row">
                        <div className="col s12">

                            <div className="input-field col s6">
                                <input onChange={this.handleChange} id="first_name" name="first_name" type="text" className="validate" />
                                <label htmlFor="first_name">First Name</label>
                            </div>
                            <div className="input-field col s6">
                                <input onChange={this.handleChange} id="last_name" type="text" name="last_name" className="validate" />
                                <label htmlFor="last_name">Last Name</label>
                            </div>

                            <div className="input-field col s12">
                                <input onChange={this.handleChange} id="email" type="text" name="email" className="validate" />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.handleChange} id="password" type="password" name="password" className="validate" />
                                <label htmlFor="password">Password</label>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.handleChange} id="confirmPassword" type="password" name="confirmPassword" className="validate" />
                                <label htmlFor="confirmPassword">Re Enter Password</label>
                            </div>


                            {/* <div className="wrap-input101 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                    <input className="input100" onBlur={this.checkValue} onChange={this.handleChange} type="email" autoComplete="off" name="email" />
                                    <span className="focus-input100"></span>
                                    <span className="label-input100">Email</span>
                                </div>

                                <div className="wrap-input101 validate-input" onBlur={this.checkValue} onChange={this.handleChange} data-validate="Password is required">
                                    <input className="input100" type="password" name="password" autoComplete="off" />
                                    <span className="focus-input100"></span>
                                    <span className="label-input100">Password</span>
                                </div>
                                <div className="wrap-input101 validate-input" onBlur={this.checkValue} onChange={this.handleChange} data-validate="Re Enter Password Please">
                                    <input className="input100" type="password" name="confirmPassword" autoComplete="off" />
                                    <span className="focus-input100"></span>
                                    <span className="label-input100">Confirm Password</span>
                                </div> */}
                        </div>
                    </div>


                </div>



                <div className="container-login100-form-btn">
                    <button className="login100-form-btn">
                        Register
                    </button>
                </div>


            </form>
        );
    }
};






class Forms extends React.Component {
    state = {
        isLoginForm: true
    }
    toggleForm = () => {
        this.setState({ isLoginForm: !this.state.isLoginForm });
    }
    render() {

        const logofooter = require('../components/ss-logo-png-4.png');

        return (
            <AuthContext.Consumer>
                {(authContext) => {
                    console.log(authContext);
                    if (authContext.isAuthenticated) {
                        return window.location.href = "http://localhost:3000/user/about";
                    }
                    return (
                        <div className="Content">
                            <div className="limiter">
                                <div className="container-login100">
                                    <div className="wrap-login100">
                                        <div>
                                            <div style={{ textAlign: 'center', backgroundColor: '#f7f7f7', padding: '0', marginBottom: "0" }} >
                                                <Link to="/" ><img src={logofooter} alt="logo" width="130px" /></Link>
                                            </div>
                                            {
                                                this.state.isLoginForm ? <LoginForm /> : <RegisterForm />
                                            }

                                            <div className="flex-sb-m w-full p-t-3 p-b-32 p-l-10">
                                                <div className="txt1">
                                                    {
                                                        this.state.isLoginForm
                                                            ? <span> <span className="txt2"> don't have an account? </span><span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={this.toggleForm} > Sign Up</span></span>
                                                            : <span> <span className="txt2"> Already have account! </span><span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={this.toggleForm} > Login</span></span>
                                                    }
                                                </div>

                                                <div>
                                                    {
                                                        this.state.isLoginForm
                                                            ? <Link to="#" className="txt1">
                                                                Forgot Password?
                                            </Link> : ''
                                                    }
                                                </div>
                                            </div>

                                        </div>

                                        <div className={`backGround ${this.state.isLoginForm ? 'login100-more' : 'login101-more'}`}>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
                }


            </AuthContext.Consumer >


        );
    }
}
export default Forms;