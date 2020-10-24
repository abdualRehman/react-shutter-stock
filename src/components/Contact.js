import React from 'react';
import '../App.css';
import Header from './Header';
import Footer from './Footer';

import { db} from "../config/firebase";

import { Link } from 'react-router-dom';
import swal from 'sweetalert';

class Contact extends React.Component {

    state = {
        name:"",
        email:"",
        subject: "",
        message:"",
    }

    componentDidMount(){
        window.scroll(0,0)
    }

    handleCahnge = (event) => {
        this.setState({[event.target.name]: event.target.value });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let msgData = this.state

        db.collection("contact-messages").add(msgData)
        .then((docRef) => {
            msgData.id = docRef.id;

            

            console.log("Document written with ID: ", docRef.id);
            this.setState({ name: "", email: "", subject: "", message: "" });
            return swal("Send", "We Will Contact You Within 24 hours", "success");
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            swal("Error", "Something Wrong Please Try Later", "warning");
        });
        
        
    }

    render() {

        return (
            <div>
                <Header />
                <div className="container-fluid contactUsSection1">
                    <div className="container aboutTopContent">
                        <div className="col-md-6">
                            <h1 className="text-white">Contact S-Stock</h1>
                            <p className="text-white">
                                If there's anything you need, get in touch
                        </p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <br />
                    <div className="bread-crumb flex-w">
                        <Link to="/" className="stext-109 cl8 hov-cl1 trans-04">
                            Home
				        <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                        </Link>
                        <span className="stext-109 cl4">
                            Contact Us
			        </span>
                    </div><br />
                    <h2>Contact</h2>
                    <p>[contact info goes here]</p>

                    <div className="row">
                        <div className="col-md-12">
                            <form onSubmit={this.handleSubmit} className="contactForm">
                                <div className="input-field col-md-8" >
                                    <i className="material-icons prefix">account_circle</i>
                                    <input type="text" value={this.state.name} onChange={this.handleCahnge} name="name" id="name" placeholder="Name" autoComplete="off" required />
                                </div>
                                <div className="input-field col-md-8" >
                                    <i className="material-icons prefix">email</i>
                                    <input type="email" value={this.state.email} name="email" onChange={this.handleCahnge} id="Email" placeholder="Email" autoComplete="off" required />
                                </div>
                                <div className="input-field col-md-8" >
                                    <i className="material-icons prefix">subject</i>
                                    <input type="text" value={this.state.subject} onChange={this.handleCahnge} name="subject" id="subject" placeholder="Subject" autoComplete="off" required />
                                </div>
                                <div className="input-field col-md-12">
                                    <i className="material-icons prefix">textsms</i>
                                    <textarea id="textarea1" value={this.state.message} name="message" onChange={this.handleCahnge} rows="4" cols="50" placeholder="Textarea" className="materialize-textarea"></textarea>
                                </div>
                                <div className="submitBtn">
                                    <input type="submit" value="Send" />
                                </div>
                            </form>

                        </div>
                    </div>




                </div>

                <Footer />
            </div>

        );
    }
}
export default Contact;
