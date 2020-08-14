import React, { Component , createContext } from 'react';
import firebase from '../config/firebase'
import { db } from '../config/firebase';



export const AuthContext = createContext();


export default class AuthContextProvider extends Component {
    state = {
        isAuthenticated : false,
        user : {
            // email : 'abc@gmail.com',
            // password : 123456
        }
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged((currentUser)=>{
            if(currentUser){
                console.log("User is Loged in");
                // this.setState({isAuthenticated: true , user : user});

                // console.log(currentUser.uid)
                
                var docPath = db.doc('/users/' + currentUser.uid);

                docPath.get().then((user)=>{
                    if (user && user.exists) {
                        // console.log(user.data());
                        // this.nameOfUser = user.data();
                        var data = user.data();
                        data.uid = currentUser.uid;
                        localStorage.setItem( "userRole" ,  data.role);
                        this.setState({isAuthenticated: true , user : data});

                        // console.log(this.state.user);
                    }
                })

                // console.log(this.state);

            }else{
                console.log("user loged out");
                localStorage.removeItem("userRole");
                this.setState({isAuthenticated:false , user : {} });
            }
        })
    }





    render(){
        return(
            <AuthContext.Provider value={{...this.state}} >
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}