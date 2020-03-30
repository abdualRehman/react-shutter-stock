import React from 'react';
import Header2 from './Header2';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import swal from 'sweetalert';
import { AuthContext } from '../context/AuthContext';
import { OrderContext } from '../context/OrderContext';
import { db } from '../config/firebase';


const cart = localStorage.getItem('cartItems');
const totalCartItems = cart ? JSON.parse(cart) : [];

class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            state: '',
            address: '',
            postcode: '',
            totalPrice: null,
        }
    }


    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }


    componentDidMount = () => {
        const cart = localStorage.getItem('cartItems');
        const totalCartItems = cart ? JSON.parse(cart) : [];

        if (Array.isArray(totalCartItems) !== false || totalCartItems.length !== 0) {
            var price = 0;
            totalCartItems.map((item) => {
                price = price + Number(item.price);
            });
            this.setState({ items: totalCartItems, totalPrice: price });

        }
    }
    deleteCartItem = (itemId) => {
        var index = totalCartItems.findIndex(function (list) {
            return list.cartId === itemId;
        });
        totalCartItems.splice(index, 1);

        localStorage.setItem('cartItems', JSON.stringify(totalCartItems));
        this.componentDidMount();
    }

    createOrder = (authContext, orderContext) => {

        var state = this.state.state;
        var address = this.state.address;
        var postcode = this.state.postcode;
        var currentUserID = authContext.user.uid;

        if (state === "") {
            M.toast({ html: `"State" is Required!`, classes: 'red' });
        }
        if (address === "") {
            M.toast({ html: `"Address" is Required!`, classes: 'red' });
        }
        if (postcode === "") {
            M.toast({ html: `"Postsode" is Required!`, classes: 'red' });
        }
        if (state && address && postcode) {
            if (this.state.items !== [] && authContext.isAuthenticated !== false ) {
                var date = new Date();
                var orderDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

                var orderData = {
                    orderDate: orderDate,
                    userId: currentUserID,
                    state: state,
                    address: address,
                    postcode: postcode,
                    orderItems: this.state.items,
                    orderStatus: false,
                    totalPrice: this.state.totalPrice
                }

                swal({
                    title: "Are you sure?",
                    text: "Click ok to confirm order",
                })
                    .then(willDelete => {
                        if (willDelete) {

                            db.collection("orders").add(orderData)
                            .then((docRef) => {
                                orderData.id = docRef.id
        
                                orderContext.addToList(orderData);
        
        
                                console.log("Document written with ID: ", docRef.id);
        
                                this.setState({ postcode: '', address: '', state: '', items: [], totalPrice: null });
        
                                localStorage.removeItem('cartItems');
        
                            })
                            .catch((error) => {
                                console.error("Error adding document: ", error);
                            });


                            swal("Order Placed!", "Your order successfully placed ", "success");
                        }
                    });

            }else{
                swal("Something Wrong!", "Please Check Login and Cart Items ", "warning");
            }

        }

    }


    render() {
        return (
            <AuthContext.Consumer>
                {(auth) => {
                    // console.log(auth);
                    return (
                        <OrderContext.Consumer>
                            {(orderContext) => {
                                return (


                                    <div>
                                        <Header2 />
                                        <div className="container">
                                            <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
                                                <Link to="/" className="stext-109 cl8 hov-cl1 trans-04">
                                                    Home
				                                <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                                                </Link>
                                                <span className="stext-109 cl4">
                                                    Shoping Cart
			                                    </span>
                                            </div>
                                        </div>

                                        <div className="bg0 p-t-75 p-b-85">
                                            <div className="container">
                                                <div className="row" >
                                                    <div className="col-lg-8 col-xl-7 m-lr-auto m-b-50">
                                                        <div className="m-l-25 m-r--38 m-lr-0-xl p-2  border-gray">
                                                            <div className="wrap-table-shopping-cart ">
                                                                <table className="table-shopping-cart">
                                                                    <thead>
                                                                        <tr className="table_head">
                                                                            <th className="column-1">Image</th>
                                                                            {/* <th className="column-2"></th> */}
                                                                            <th className="column-3">Title</th>
                                                                            <th className="column-4">Price</th>
                                                                            {/* <th className="column-5">Total</th> */}
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody id="cartTable">
                                                                        {this.state.items.map((item) => {
                                                                            return (
                                                                                <tr key={item.cartId} className="table_row">
                                                                                    <td className="column-1">
                                                                                        {/* <div className="how-itemcart1" onClick="deleteCartItem(`+item.cartId+`)"> */}
                                                                                        <div className="how-itemcart1" onClick={() => { this.deleteCartItem(item.cartId) }}>
                                                                                            <img src={item.image} alt="IMG" />
                                                                                        </div>
                                                                                    </td>
                                                                                    <td className="column-2">{item.title}</td>
                                                                                    <td className="column-3">{item.price} </td>
                                                                                    {/* <td className="column-4">
                                                            <div className="wrap-num-product flex-w m-l-auto m-r-0 p-l-3">
                                                                <div className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                                                                    <i className="fs-16 zmdi zmdi-minus"></i>
                                                                </div>

                                                                <input className="mtext-104 cl3 txt-center num-product" style={{width:"31%"}} type="number"
                                                                    name="num-product[]" />

                                                                <div className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                                                                    <i className="fs-16 zmdi zmdi-plus"></i>
                                                                </div>
                                                                <input type="hidden" value="`+item.cartId+`" name="cartId[]" />

                                                            </div>
                                                        </td> */}
                                                                                    {/* <td className="column-5">Rs:/ `+item.price*item.quantity+`</td> */}
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
                                                    </div>

                                                    <div className="col-sm-10 col-lg-4 col-xl-5 m-lr-auto m-b-50  border-gray">
                                                        <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
                                                            <h4 className="mtext-109 cl2 p-b-30">
                                                                Cart Totals
						            </h4>

                                                            <div className="flex-w flex-t bor12 p-b-13">
                                                                <div className="size-208">
                                                                    <span className="stext-110 cl2">
                                                                        Subtotal:
								</span>
                                                                </div>

                                                                <div className="size-209">
                                                                    Rs:/ {this.state.totalPrice}
                                                                    <span className="mtext-110 cl2" id="subTotal">

                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="flex-w flex-t bor12 p-t-15 p-b-30">
                                                                <div className="size-208 w-full-ssm">
                                                                    <span className="stext-110 cl2">
                                                                        Shipping:
								</span>
                                                                </div>

                                                                <div className="size-209 p-r-18 p-r-0-sm w-full-ssm">
                                                                    <p className="stext-111 cl6 p-t-2">
                                                                        There are no shipping methods available. Please double check your address, or
                                                                        contact us if you need any help.
								</p>

                                                                    <div className="p-t-15">
                                                                        <span className="stext-112 cl8">
                                                                            Calculate Shipping
									</span>

                                                                        <div className="bor8 bg0 m-b-12">
                                                                            <input className="stext-111 cl8 plh3 size-111 p-lr-15" type="text" name="state"
                                                                                id="state" onChange={this.handleChange}
                                                                                placeholder="State /  country" />
                                                                        </div>
                                                                        <div className="bor8 bg0 m-b-12">
                                                                            <input className="stext-111 cl8 plh3 size-111 p-lr-15" type="text" name="address" id="address" onChange={this.handleChange}
                                                                                placeholder="Address" />
                                                                        </div>

                                                                        <div className="bor8 bg0 m-b-22">
                                                                            <input className="stext-111 cl8 plh3 size-111 p-lr-15" type="text" name="postcode" id="postcode" onChange={this.handleChange}
                                                                                placeholder="Postcode / Zip" />
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className="flex-w flex-t p-t-27 p-b-33">
                                                                <div className="size-208">
                                                                    <span className="mtext-101 cl2">
                                                                        Total:
								            </span>
                                                                </div>

                                                                <div className="size-209 p-t-1">
                                                                    Rs:/ {this.state.totalPrice}
                                                                    <span className="mtext-110 cl2" id="grandTotal">

                                                                    </span>
                                                                </div>
                                                            </div>

                                                            {/* <button onClick="createOrder" className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer"> */}
                                                            <button onClick={() => { this.createOrder(auth, orderContext) }} className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer">
                                                                Order Now
						            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <Footer />
                                    </div>
                                )
                            }}
                        </OrderContext.Consumer>
                    )
                }}
            </AuthContext.Consumer>
        );
    }
}
export default Cart;