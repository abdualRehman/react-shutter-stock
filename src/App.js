import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import 'render-smooth-image-react/build/style.css';

import Forms from './components/LoginForm'
import Contact from './components/Contact'
import About from './components/About';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import SearchResults from './components/SearchResults';
import Error from './components/Error';
import M from 'materialize-css';
import PrivateRoute from './PrivateRoute';

// admin dashboard data

import AddImage from './components/Admin/AddNewImage';
import UserUploads from './components/Admin/UserUploads';
import Orders from './components/Admin/Orders';
import Dashboard from './components/Admin/Dashboard';

// new layout
import HomePage from './components/HomePage';
import LoadAll_Images2 from './components/LoadAll_Images2';
import Image_Details from './components/Image_Details';
import Cart_Items from './components/Cart_Items';



import AuthContextProvider from './context/AuthContext';  // For authentication
import GalleryContextProvider from './context/GalleryContext';  // For Gallery
import OrderContextProvider from './context/OrderContext';  // For Orders
import UserContextProvider from './context/UserContext';  // For Users


console.log(M)


// function App() {
class App extends React.Component {
  state = {
    isAuth: true
  }
  render() {
    return (
      <AuthContextProvider>
        <GalleryContextProvider>
          <OrderContextProvider>
            <UserContextProvider>
              <BrowserRouter>

                <div className="App" style={{ overflowX: "hidden" }}>

                 
                  <Switch>

                    <Route exact path="/" component={HomePage} ></Route>
                    
                    <Route exact path="/login" component={Forms} ></Route>


                    

                    <Route exact path="/search/:category/:keyword" component={SearchResults} ></Route>

                    


                    <Route exact path="/about-us" component={About} ></Route>
                    <Route exact path="/contact-us" component={Contact} ></Route>
                    <Route exact path="/terms" component={Terms} ></Route>
                    <Route exact path="/privacy" component={Privacy} ></Route>

                    

      
                    <Route exact path="/photos/:category" component={LoadAll_Images2} ></Route>
                    <Route exact path="/photo_details/:id" component={Image_Details} ></Route>
                    <Route exact path="/Cart" component={Cart_Items} ></Route>

                    

                    {/* for user dashboard */}
                   
                    <PrivateRoute exact path="/user/dashboard" component={Dashboard} ></PrivateRoute>
                    <PrivateRoute exact path="/user/add-new-image" component={AddImage} ></PrivateRoute>
                    <PrivateRoute exact path="/user/uploads" component={UserUploads} ></PrivateRoute>
                    <PrivateRoute exact path="/user/orders" component={Orders} ></PrivateRoute>

                    {/* <Route path="/*" component={Error} ></Route> */}
                    <Route component={Error} ></Route>

                  </Switch>

               

                </div>

              </BrowserRouter>
            </UserContextProvider>
          </OrderContextProvider>
        </GalleryContextProvider>
      </AuthContextProvider>
    );
  }
}

export default App;
