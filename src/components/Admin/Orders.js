import React from 'react';
import M from 'materialize-css';
import { OrderContext } from '../../context/OrderContext';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';
import swal from 'sweetalert';
import Footer from './Footer';
import Header from './Header';



export default class Orders extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            orderStatus: null,
            id: '',
            viewDetails: {},
            customerDetails: {},
            itemsList: [],
        }
    }

    componentDidMount = () => {
        M.Modal.init(document.querySelectorAll('.modal'));
        M.Tabs.init(document.querySelectorAll('.tabs'), { swipeable: true })
    }

    toggleButton = (event) => {
        this.setState({ [event.target.name]: !this.state[event.target.name] });
    }
    editOrder = (id, ordersContext) => {

        // console.log(id);
        // console.log(ordersContext);

        var details = ordersContext.findById(id);

        this.setState({ orderStatus: details.orderStatus, id: details.id });
    }
    updateOrder = (orderContext) => {
        let updateData = {
            orderStatus: this.state.orderStatus,
            id: this.state.id
        };
        orderContext.UpdateOrderData(updateData).then(res => {
            if (res === true) {
                swal("Updated!", "Your Order successfully Updated ", "success");
            }
        });
    }
    deleteOrder = (id, orderContext) => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this permenently?",
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    orderContext.deleteOrder(id);
                    swal("Deleted!", "Your imaginary file has been deleted!", "success");
                }
            });
    }
    getDetails = (id, orderContext, userContext) => {
        var details = orderContext.findById(id);

        var customerDetail = userContext.findById(details.userId)
        console.log(details.orderItems);
        this.setState({ viewDetails: details, customerDetails: customerDetail , itemsList:details.orderItems });
    }

    openCity = (evt, cityName) => {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(cityName).style.display = "block";
    }

    render() {
        return (
            <AuthContext.Consumer>
                {(authContext) => {
                    return (
                        <OrderContext.Consumer>
                            {(ordersContext) => {
                                // console.log(ordersContext);
                                return (
                                    <UserContext.Consumer>
                                        {(userContext) => {
                                            // console.log(userContext)
                                            return (
                                                

                                                <div>
                                                    <Header />
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-lg-10 col-md-12 m-auto m-10 ">
                                                                <div className="card-panel1">
                                                                    <h3>ALL Orders</h3>
                                                                    <br />
                                                                    <div className="table-responsive table-responsive-data2">
                                                                        <table className="table table-data2">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Order Date</th>
                                                                                    <th>Custome Email</th>
                                                                                    <th>Items</th>
                                                                                    <th>T.Price</th>
                                                                                    <th>Status</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {ordersContext.orders.map((list) => {
                                                                                    for (var j = 0; j < list.orderItems.length; j++) {
                                                                                        if (list.orderItems[j].creatorId === authContext.user.uid) {
                                                                                            return (
                                                                                                <tr key={list.id} className="tr-shadow">
                                                                                                    <td>{list.orderDate}</td>
                                                                                                    <td className="desc">
                                                                                                        {userContext.findById(list.userId).email}
                                                                                                    </td>
                                                                                                    <td>{list.orderItems.length}</td>
                                                                                                    <td>{list.totalPrice}</td>
                                                                                                    <td> {list.orderStatus ? <span className="status--process">Completed </span> : <span className="status--denied"> Un Complete </span>}</td>
                                                                                                    <td>
                                                                                                        <div className="table-data-feature">
                                                                                                            <button className="item modal-trigger" onClick={() => this.editOrder(list.id, ordersContext)} data-target="modal1"
                                                                                                                title="Edit">
                                                                                                                <i className="zmdi zmdi-edit"></i>
                                                                                                            </button>
                                                                                                            <button className="item" data-toggle="tooltip" onClick={() => this.deleteOrder(list.id, ordersContext)} data-placement="top"
                                                                                                                title="Delete">
                                                                                                                <i className="zmdi zmdi-delete"></i>
                                                                                                            </button>
                                                                                                            <button className="item modal-trigger" onClick={() => this.getDetails(list.id, ordersContext, userContext)} data-target="modal2"
                                                                                                                title="Details">
                                                                                                                <i className="fas fa-info-circle"></i>
                                                                                                            </button>
                                                                                                        </div>
                                                                                                    </td>

                                                                                                </tr>
                                                                                            )

                                                                                        }


                                                                                    };
                                                                                
                                                                                    return true;

                                                                                }
                                                                                )}


                                                                            </tbody>
                                                                        </table>

                                                                    </div>





                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div id="modal1" className="modal" style={{ width: "fit-content", height: "fit-content" }}>
                                                        <div className="modal-header">
                                                            <h5>Edit Order</h5>
                                                            <button type="button" className="close modal-close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-content">
                                                            <label htmlFor="sellStatus">Status</label>
                                                            <br />
                                                            <div className="switch">
                                                                <label>
                                                                    Un Complete
                                                                                <input type="checkbox" name="orderStatus" checked={this.state.orderStatus ? "checked" : null} onChange={this.toggleButton} />
                                                                    <span className="lever"></span>
                                                                    Completed
                                                                            </label>
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button onClick={() => this.updateOrder(ordersContext)} className="modal-close waves-effect green btn-flat white-text">Update</button>
                                                        </div>
                                                    </div>

                                                    <div id="modal2" className="modal " style={{ overflow: "auto" }} >
                                                        <div className="modal-header">
                                                            <h5>Order Details</h5>
                                                            <button type="button" className="close modal-close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-content">

                                                            <div className="tab">
                                                                <button className="tablinks" onClick={() => this.openCity(this, 'customerDetails')}>Customer Details</button>
                                                                <button className="tablinks" onClick={() => this.openCity(this, 'productDetails')}>Photos Details</button>
                                                            </div>
                                                            <div id="customerDetails" className="tabcontent">
                                                                <h3>Customer Details</h3>
                                                                <div className="row">
                                                                    <div className="col-sm-8">
                                                                        <label htmlFor="date">Date</label>
                                                                        <input type="text" placeholder="date" value={this.state.viewDetails.orderDate} disabled name="date" className="validate" id="date" />
                                                                        <label htmlFor="email">Email</label>
                                                                        <input type="text" placeholder="Email" value={this.state.customerDetails.email} disabled name="email" className="validate" id="email" />
                                                                        <label htmlFor="address">Address</label>
                                                                        <input type="text" placeholder="Address" value={this.state.viewDetails.address} disabled name="address" className="validate" id="address" />
                                                                        <label htmlFor="state">State</label>
                                                                        <input type="text" placeholder="state" value={this.state.viewDetails.state} disabled name="state" className="validate" id="state" />
                                                                        <label htmlFor="postcode">Post Code</label>
                                                                        <input type="text" placeholder="Postcode" value={this.state.viewDetails.postcode} disabled name="postcode" className="validate" id="postcode" />
                                                                    </div>

                                                                </div>

                                                            </div>

                                                            <div id="productDetails" className="tabcontent">
                                                                <h3>Photos Details</h3>
                                                                <div className="table-responsive table-responsive-data2" style={{overflow:"auto"}}>
                                                                    <table className="table table-data2">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Photo</th>
                                                                                <th>ID</th>
                                                                                <th>Title</th>
                                                                                <th>Price</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {this.state.itemsList.map((list) => {
                                                                                
                                                                                return <tr key={list.productId} className="tr-shadow">
                                                                                        <td>
                                                                                            <div className="how-itemcart1">
                                                                                                <img src={list.image} alt="IMG" />
                                                                                            </div>
                                                                                        </td>
                                                                                        <td>{list.productId}</td>
                                                                                        <td>
                                                                                            {list.title}
                                                                                        </td>
                                                                                        <td>
                                                                                            {list.price}
                                                                                        </td>

                                                                                    </tr>
                                                                                
                                                                            })}


                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                <br />
                                                                <p><strong>Total:RS:/</strong><span id="totalPrice">{this.state.viewDetails.totalPrice}</span> </p>


                                                            </div>

                                                        </div>
                                                        <div className="modal-footer">
                                                            <button className="modal-close waves-effect red btn-flat white-text">Cancel</button>
                                                        </div>
                                                    </div>
                                                    <Footer />




                                                </div>
                                            )
                                        }}
                                    </UserContext.Consumer>
                                )
                            }}
                        </OrderContext.Consumer>
                    );
                }}
            </AuthContext.Consumer>
        )
    }
}