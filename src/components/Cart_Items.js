import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
// import StripeCheckout from 'react-stripe-checkout';
import { PayPalButton } from "react-paypal-button-v2";
import { GalleryContext } from '../context/GalleryContext';
import swal from 'sweetalert';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import M from 'materialize-css';
import axios from 'axios';





const useStyles = (theme) => ({
    StripeBtn: {
        width: "100%",
        '&>span': {
            padding: "18px 12px!important",
            lineHeight: "4px!important"
        }
    }
});





const cart = localStorage.getItem('cartItems');
const totalCartItems = cart ? JSON.parse(cart) : [];

class Cart_Items extends Component {


    static contextType = GalleryContext;
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            showAlert: "none",

            state: '',
            address: '',
            postcode: '',
            totalPrice: null,
            startDownload: false,

            CCnumber: null,
            CCexpiry: "",
            CCcvc: "",
            showLoading: false,


            downloadProgress: 0,
            downloadFile: "",
            dataRate: "KB/s"


        }
    }


    componentDidMount = () => {
        const cart = localStorage.getItem('cartItems');
        var totalCartItems = cart ? JSON.parse(cart) : [];

        if (Array.isArray(totalCartItems) !== false || totalCartItems.length !== 0) {
            var price = 0;
            totalCartItems.map((item) => {
                price = price + Number(item.price);
                return true;
            });
            this.setState({ items: totalCartItems, totalPrice: price });

        }
    }

    deleteCartItem = (index) => {

        totalCartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(totalCartItems));
        this.componentDidMount();
        this.refs.child.getUpdate();
    }


    handlePayment = (details) => {
        
        if (details.status === "COMPLETED") {
            this.downloadZip();
            this.setState({ showAlert: "block" })

            return swal("Success", "Downloading will start one by one", "success");
        } else {
            return alert("Something went wrong");
        }
    }

    handleTocken = async (token) => {
        
        const product = {
            name: "Product Name Send",
            price: this.state.totalPrice
        }

        // const responce = await axios.post('http://localhost:4000/checkout', {
        const responce = await axios.post('https://us-central1-shutterstock-d60e1.cloudfunctions.net/app/checkout', {
            token,
            product,
        });

        
        const { status } = responce.data;
        if (status === "success") {
            console.log("Success! Check email for Details");
            // this.downloadZip();
            M.toast({ html: `Success! Check email for Details`, classes: 'green' });
        } else {
            console.log("Something Went Wrong!");
            M.toast({ html: `Something Went Wrong!`, classes: 'red' });
        }


    }



    downloadZip = async () => {
        var array = this.state.items;
        const gallery = this.context;
        var files = [];
        array.forEach((item) => {
            files.push(gallery.findById(item.productId));
            return true;
        })

        let length = files.length;



        const GetImageLoader = () => {

            let imageLoader = {
                isComplete: false,
            };

            imageLoader['LoadImage'] = function (imageUrl, progressUpdateCallback, fileName) {
                return new Promise((resolve, reject) => {

                    var start = new Date().getTime();
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', imageUrl, true);
                    xhr.responseType = 'arraybuffer';

                    xhr.onprogress = function (e) {
                        if (e.lengthComputable) {
                            var end = new Date().getTime();
                            var duration = (end - start) / 1000;
                            var bps = e.loaded / duration;
                            var kbps = bps / 1024;

                            kbps = Math.floor(kbps);


                            var time = (e.loaded - e.total) / bps;
                            var seconds = time % 60;
                            var minutes = time / 60;

                            seconds = Math.floor(seconds)
                            minutes = Math.floor(minutes)

                            var remainingTime = minutes + " minutes " + seconds + " seconds remaining "

                            progressUpdateCallback(parseInt((e.loaded / e.total) * 100), kbps, remainingTime);
                        }
                    };

                    xhr.onloadend = function () {
                        progressUpdateCallback(100, 0);
                        var options = {};
                        var headers = xhr.getAllResponseHeaders();
                        var typeMatch = headers.match(/^Content-Type\:\s*(.*?)$/mi);

                        if (typeMatch && typeMatch[1]) {
                            options.type = typeMatch[1];
                        }

                        var blob = new Blob([this.response], options);

                        // resolve(window.URL.createObjectURL(blob));
                        var urlCreator = window.URL || window.webkitURL;
                        var imageUrl = urlCreator.createObjectURL(blob);

                        // resolve(imageUrl);

                        var tag = document.createElement('a');
                        tag.href = imageUrl;
                        tag.download = fileName;
                        document.body.appendChild(tag);
                        tag.click();

                        document.body.removeChild(tag);

                        resolve({ iscomplete: true })


                    }
                    xhr.send();
                });
            }

            return imageLoader;
        }


        const updateProgress = (progress, kbps, remainingTime) => {
            this.setState({ downloadProgress: progress, dataRate: `${kbps} KB/s ${remainingTime} ` })
        }



        const downloadFile = (i) => {
            if (i === length) {
                this.setState({ startDownload: false })
                return true;
            }

            if (i < length) {

                var fileName = `${i}${files[i].title}.png`;
                var fileSrc = files[i].paidSrc;


                let imageLoader = GetImageLoader();


                this.setState({ downloadFile: fileName, startDownload: true });

                imageLoader.LoadImage(fileSrc, updateProgress, fileName).then((res) => {


                    if (res.iscomplete === true) {
                        fileName = "";
                        fileSrc = "";
                        
                        this.setState({ downloadProgress: 0, dataRate: "KB/s" });
                        i++;
                        downloadFile(i);
                    }

                })

                // this.setState({downloadFile: fileName , startDownload: true });
                // setTimeout(() => {
                //     fileName = "";
                //     fileSrc = "";
                //     console.log("set time out")
                //     this.setState({downloadProgress: 0 });
                //     i++;
                //     downloadFile(i);
                // }, 5000);

            }

        }

        downloadFile(0);




    }

    render() {
        const { classes } = this.props;
        return (
            <div style={{ background: "white", height: "100vh" }} >
    
                <Header ref="child" />

                <div className="bg0 p-t-75 p-b-85">
                    <div className="container">
                        <div className="row" >
                            <div className="col-md-8 col-sm-5 col-xs-12 p-2">
                                <div className="p-2 border-gray">
                                    <div className="wrap-table-shopping-cart" style={{ overflow: "auto" }}>
                                        <table className="table-shopping-cart">
                                            <thead>
                                                <tr className="table_head">
                                                    <th className="column-1">Image</th>
                                                    <th className="column-3">Title</th>
                                                    <th className="column-4">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody id="cartTable">
                                                {this.state.items.map((item, index) => {
                                                    return (
                                                        <tr key={item.cartId} className="table_row">
                                                            <td className="column-1">
                                                                <div className="how-itemcart1" onClick={() => { this.deleteCartItem(index) }}>
                                                                    <img src={item.image} alt="IMG" />
                                                                </div>
                                                            </td>
                                                            <td className="column-2">{item.title}</td>
                                                            <td className="column-3">{item.price} </td>
                                                        </tr>
                                                    )

                                                })}

                                            </tbody>
                                        </table>
                                    </div>


                                    <div className="flex-w flex-sb-m bor15 p-t-18 p-b-15 p-lr-40 p-lr-15-sm">
                                        <div className="flex-w flex-m m-r-20 m-tb-5">

                                        </div>

                                    </div>

                                </div>

                                <div className="alert" style={{ display: this.state.showAlert }} >
                                    <span onClick={() => this.setState({ showAlert: "none " })} className="closebtn">&times;</span>
                                    Press <b>"Allow"</b> to Download Multiple files if needed! <br /><br />
                                    <b>Note: </b>Don't Refresh or Reload the page during downloads. These files will not be Redownload.
                                                        </div>
                            </div>

                            <div className="col-md-4 col-sm-7 col-xs-12 p-2">
                                <div className="p-3 border-gray" style={{ background: "rgb(246, 245, 250)" }} >
                                    <h4 className="mtext-109 cl2 p-b-30">
                                        Total Price
                                                                </h4>


                                    <div className="flex-w flex-t p-t-14 p-b-33">
                                        <div className="size-208">
                                            <span className="mtext-101 cl2">
                                                Total:
                                                                    </span>
                                        </div>

                                        <div className="size-209 p-t-1">
                                            $ {this.state.totalPrice} -USD
                                                                    <span className="mtext-110 cl2" id="grandTotal">

                                            </span>
                                        </div>
                                    </div>




                                    {this.state.startDownload ?

                                        <div>
                                            <LinearProgressWithLabel value={this.state.downloadProgress} status={this.state.downloadFile} dataRate={this.state.dataRate} />
                                        </div>
                                        : null
                                    }




                                    <hr />




                                    {/* <StripeCheckout stripeKey="pk_test_51HUbFjJ1ZaNMwlyfXV528BvEH9SB5lfY008u2hIln9Ym51SiIe7ek4d4ryQlaI9iJVY6yfQBpi2rWJsLluyj36uS00KgxhBj0W" token={this.handleTocken}
                                        name="SStock Images"
                                        className={classes.StripeBtn}
                                        amount={this.state.totalPrice * 100}
                                    /> 
                                    <p style={{ fontSize: "10px" }} >🔐 Secure payment by Stripe.</p>
                                    

                                    <hr />
                                    */}

                                    {this.state.showLoading ? <span>Loading Button...</span> : null}
                                    <PayPalButton
                                        amount={this.state.totalPrice}
                                        shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                        onSuccess={this.handlePayment}
                                        onError={(err) => alert(err)}
                                        catchError={(err) => alert(err)}
                                        onButtonReady={() => this.setState({ showLoading: false })}
                                    />







                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}







function LinearProgressWithLabel(props) {

    return (
        <>
            <Box display="block" alignItems="start" m={1} >
                <Typography variant="body2" color="textSecondary">Downloading: {props.status}</Typography>
            </Box>

            <Box display="flex" >

                <Box width="100%" mr={1}>
                    <LinearProgress variant="determinate" value={props.value} />
                </Box>
                <Box minWidth={35}>
                    <Typography variant="body2" color="textSecondary">{`${Math.round(
                        props.value,
                    )}%`}</Typography>
                </Box>
            </Box>
            <Box display="flex" alignItems="start" m={1} >
                <Typography variant="body2" color="textSecondary">{props.dataRate}</Typography>
            </Box>
        </>
    );
}


LinearProgressWithLabel.propTypes = {

    value: PropTypes.number.isRequired,
};











export default withStyles(useStyles)(Cart_Items);