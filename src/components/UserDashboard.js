import React from 'react';
import Header from './Admin/Header';
import { AuthContext } from '../context/AuthContext';
// import {Link} from 'react-router-dom';


class UserDashboard extends React.Component {
    // constructor(props){
    //     super(props)
    // }

    // componentWillMount = () => {
    //     console.log("loaded")
    // }
    render() {
        return (
            <AuthContext.Consumer>
                {(authContext) => {
                    
                    // if (authContext.isAuthenticated == false ) {
                    //     return window.location.href = "http://localhost:3000";
                    // }
                    return (
                        <div>
                            <Header />
                            {/* <h1>this is dashboard for user</h1>
                            <Link to="/user/contact" >Go To User Contact</Link><br/>
                            <Link to="/user/about" >Go To User About</Link> */}
                        </div>
                    );
                }}
            </AuthContext.Consumer>
        )
    }
}

export default UserDashboard;