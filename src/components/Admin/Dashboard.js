import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

import { OrderContext } from '../../context/OrderContext';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';
import { GalleryContext } from '../../context/GalleryContext';


export default class Dashboard extends React.Component {
    render() {
        const add = (a , b) => {
            return Number(a) + Number(b.totalPrice)
        }
        return (

            <AuthContext.Consumer>
                {(auth) => {
                    return (
                        <OrderContext.Consumer>
                            {(ordersContext) => {
                                return (
                                    <UserContext.Consumer>
                                        {(userContext) => {
                                            return (
                                                <GalleryContext.Consumer>
                                                    {(gallery) => {
                                                        return (
                                                            <div>
                                                                <Header />
                                                                <div className="container">
                                                                    <section className="au-breadcrumb2">
                                                                        <div className="container">
                                                                            <div className="row">
                                                                                <div className="col-md-12">
                                                                                    <div className="au-breadcrumb-content">
                                                                                        <div className="au-breadcrumb-left">
                                                                                            <span className="au-breadcrumb-span">You are here:</span>
                                                                                            <ul className="list-unstyled list-inline au-breadcrumb__list">
                                                                                                <li className="list-inline-item active">
                                                                                                    <Link to="/">Home</Link>
                                                                                                </li>
                                                                                                <li className="list-inline-item seprate">
                                                                                                    <span>/</span>
                                                                                                </li>
                                                                                                <li className="list-inline-item">Dashboard</li>
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div>
                                                                                            <input className="au-input--w300 au-input--style2" type="text" placeholder="Search for datas &amp; reports..." />
                                                                                            <button className="au-btn--submit2" type="submit">
                                                                                                <i className="zmdi zmdi-search"></i>
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </section>

                                                                </div>


                                                                <section className="welcome p-t-10">
                                                                    <div className="container">
                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                                <h1 className="title-4">Welcome back
                                                                    <span> {auth.user.first_name}!</span>
                                                                                </h1>
                                                                                <hr className="line-seprate" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </section>

                                                                <section className="statistic statistic2">
                                                                    <div className="container">
                                                                        <div className="row">
                                                                            <div className="col-md-6 col-lg-3">
                                                                                <div className="statistic__item statistic__item--white">



                                                                                    <h2 className="number grey-text">{userContext.users.length}</h2>
                                                                                    <span className="desc grey-text">total members</span>
                                                                                    <div className="icon">
                                                                                        <i className="zmdi zmdi-account-o"></i>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6 col-lg-3">
                                                                                <div className="statistic__item statistic__item--white">
                                                                                    <h2 className="number grey-text">{ordersContext.orders.length}</h2>
                                                                                    <span className="desc grey-text">orders</span>
                                                                                    <div className="icon">
                                                                                        <i className="zmdi zmdi-shopping-cart"></i>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6 col-lg-3">
                                                                                <div className="statistic__item statistic__item--white">
                                                                                    <h2 className="number grey-text">{gallery.photos.length}</h2>
                                                                                    <span className="desc grey-text">Photos</span>
                                                                                    <div className="icon">
                                                                                        <i className="zmdi zmdi-calendar-note"></i>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6 col-lg-3">
                                                                                <div className="statistic__item statistic__item--white">

                                                                                    {/* <h2 className="number grey-text">RS:{ordersContext.orders.map((order) => {
                                                                                        var totalPrice = totalPrice + order.totalPrice;
                                                                                        console.log(+order.totalPrice);
                                                                                        return totalPrice;
                                                                                    })}</h2> */}
                                                                                    <h2 className="number grey-text">RS:{ordersContext.orders.reduce(add,0)}</h2>
                                                                                    <span className="desc grey-text">total earnings</span>
                                                                                    <div className="icon">
                                                                                        <i className="zmdi zmdi-money"></i>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </section>

                                                                <Footer />

                                                            </div>
                                                        )
                                                    }}
                                                </GalleryContext.Consumer>

                                            )
                                        }}
                                    </UserContext.Consumer>
                                )
                            }}
                        </OrderContext.Consumer>
                    )
                }}
            </AuthContext.Consumer>
        )
    }
}