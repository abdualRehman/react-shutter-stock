import React, {Component , createContext } from 'react';
import { db } from '../config/firebase';

export const UserContext  = createContext();

export default class UserContextProvider extends Component {
    state = {
        users:[],
    }

    componentDidMount = () => {
        db.collection("users").get().then((querySnapshot)=>{
            let users = [];
            querySnapshot.forEach((doc)=>{
                let user = doc.data()
                user.id = doc.id
                users.push(user);
            });
            this.setState({users: users});
        })
    }


    findById = (userID) => {
        let users = this.state.users;
        var userDetails = users.find((list) => {
            return list.id === userID;
        });

        return userDetails;
    }
    render(){
        return(
            <UserContext.Provider value={{...this.state, findById:this.findById }}>
                {this.props.children}
            </UserContext.Provider>
        )
    }

}