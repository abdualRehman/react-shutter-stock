import React , { useContext } from 'react';
import {Route , Redirect } from 'react-router-dom';

import { AuthContext } from './context/AuthContext';


const PrivateRoute = ( { component: RouteComponent , ...rest }) => {
    const { user } = useContext(AuthContext);

    return(
        <Route 
            {...rest}
                render={routeProps => 
                user.role === "admin" ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <Redirect to={"/404Error"} />
                ) }
        
        />
    )

}

export default PrivateRoute;
