import React, { Component, createContext } from 'react';
import { db } from '../config/firebase';

export const OrderContext = createContext();

export default class OrderContextProvider extends Component {
    state = {
        orders: [],
    }

    componentDidMount = () => {
        db.collection("orders").get().then((querySnapshot) => {
            let orders = [];
            querySnapshot.forEach((doc) => {
                let order = doc.data()
                order.id = doc.id
                orders.push(order);
            });
            this.setState({ orders: orders });
        })
    }

    addToList = (order) => {
        let newOrders = [...this.state.orders, order]
        this.setState({ orders: newOrders });
    }

    findById = (orderId) => {
        let orders = this.state.orders;
        var orderDetails = orders.find((list) => {
            return list.id === orderId;
        });
        return orderDetails;
    }

    UpdateOrderData = (order) => {

        var docRef = db.collection("orders").doc(order.id);

        var sucess = false;
        // Set the "capital" field of the city 'DC'
        return docRef.update(order)
            .then(() => {
                console.log("Document successfully updated!");

                let newOrders = this.state.orders.map((o, i) => {
                    if (order.id === o.id)

                        o.orderStatus = order.orderStatus

                    return o;
                })

                this.setState({ orders: newOrders });
                sucess = true
                return sucess;
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                return sucess;
            });

    }

    deleteOrder = (id) => {
        db.collection("orders").doc(id).delete()
            .then(() => {

                let newOrders = this.state.orders.filter((o, i) => {
                    return o.id !== id
                })

                this.setState({ orders: newOrders })

            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
    }


    render() {
        return (
            <OrderContext.Provider value={{ ...this.state, addToList: this.addToList, findById: this.findById, UpdateOrderData: this.UpdateOrderData , deleteOrder : this.deleteOrder}}>
                {this.props.children}
            </OrderContext.Provider>
        )
    }

}