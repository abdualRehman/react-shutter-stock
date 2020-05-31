import React from 'react';
// import * as jQuery from 'jquery';
import Header2 from './Header2';
import Footer from './Footer';

class About extends React.Component {





    render() {
        const aboutImage = require('../images/about-image.jpg');
        const aboutCustomer = require('../images/about-customer.jpg');

        const aboutContent = require('../images/about-content.svg');
        const aboutGrouth = require('../images/about-grouth.svg');
        const aboutRecognization = require('../images/about-recognization.svg');

        return (

            <div>
                <div className="container-fluid aboutCoverPic">
                    <Header2 />
                    <div className="col-md-6 aboutTopContent">
                        <h1 className="text-white">About S-Stock</h1>
                        <p className="text-white">
                            We sell images. We add over 100,000 new images every day, sourced from photographers and photo agencies in 173 countries. We pay our photographers a higher percentage of the sale than our competitors and it’s easy to get your images online.
                        </p>
                    </div>
                </div>
                {/* <br /> */}
                <div style={{ backgroundColor: "#FFF" }} >
                    <div className="container">
                        <div className="row aboutSection2">
                            <div className="col-md-6">
                                <img src={aboutImage} alt="aboutImage" />
                                <h2>Our images</h2>
                                <p>We have a bigger, broader, more unique collection than any other library and every day we supply thousands of creative professionals including designers, marketing departments, news desks, and publishers with images produced by the best professional photographers around.</p>
                            </div>
                            <div className="col-md-6">
                                <img src={aboutCustomer} alt="aboutImage" />
                                <h2>Customer service</h2>
                                <p>
                                    We have the best customer service in the industry, our friendly team of image buying experts are on hand to help you out via email, phone or live chat wherever you are in the world.
                            </p>

                            </div>
                        </div>

                        <div className="row aboutSection3">
                            <h1>Who we are</h1>
                            <p>Launched in 2018, S-Stock is the leading online network for photographers with over 15 million members worldwide. Photographers come to S-Stock to discover and share incredible photos, gain meaningful exposure, compete in photo contests, and license their photos through our exclusive distribution partners.</p>

                        </div>

                    </div>
                </div>
                <div className="aboutSection5" style={{ backgroundColor: "#027a95" }}>
                    <div className="container">
                        <h2>Our commitment to photographers</h2>
                        <div className="row">
                            <div className="col-md-4">
                                <img src={aboutContent} alt="aboutContent" className="responsive-img image_8" /><br />
                                <h3>Content</h3>
                                <p>We believe that great content should speak for itself and we take pride in helping all photographers showcase their incredible work—it’s at the core of everything we do.</p>
                            </div>
                            <div className="col-md-4">
                                <img src={aboutGrouth} alt="aboutGrouth" className="responsive-img image_8" /><br />
                                <h3>Growth</h3>
                                <p>The creative journey doesn’t have an end; there’s always room for improvement. We’re committed to creating a platform that challenges you to keep learning, and step outside of your comfort zone.</p>
                            </div>
                            <div className="col-md-4">
                                <img src={aboutRecognization} alt="aboutRecognization" className="responsive-img image_8" /><br />
                                <h3>Recognition</h3>
                                <p>You work hard as a photographer and we know the importance of being recognized for your work and skills. We’re constantly building ways to ensure our photographers get the recognition they deserve.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid aboutSection4">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h3>Our contributors think we’re great too</h3>
                                <p>
                                    We’re easy to work with, we’re non-exclusive and we don’t tie our contributors in with long-term contracts. We don’t edit our collection either so our contributors can choose what they want to sell.

    This leads to a more diverse collection and less hoops for our artists to jump through. But we also believe in a fairer world by giving higher commissions splits than our core competitors.

    Our ‘100% students’ project supports photography students while they study. We give students 100% of the money they make from the sale of their images on S-Stock.
                                </p>

                            </div>
                        </div>
                    </div>

                </div>





                <Footer />
            </div>

        );
    }
}


export default About;