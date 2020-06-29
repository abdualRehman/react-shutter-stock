import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import HomePage2 from './components/HomePage2';


import Forms from './components/LoginForm'
import Contact from './components/Contact'
import About from './components/About';
import Terms from './components/Terms';
import Privacy from './components/Privacy';

// import HomePage from './components/HomePage';


import Images from './components/Images';
import PhotoDetails from './components/PhotoDetails';
import Cart from './components/Cart';

import SearchResult from './components/SearchResult';


import Error from './components/Error';


import M from 'materialize-css';


import PrivateRoute from './PrivateRoute';

// admin dashboard data

import AddImage from './components/Admin/AddNewImage';
import UserUploads from './components/Admin/UserUploads';
import Orders from './components/Admin/Orders';
import Dashboard from './components/Admin/Dashboard';




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

                    <Route exact path="/" component={HomePage2} ></Route>
                    {/* <Route exact path="/" component={HomePage} ></Route> */}
                    <Route exact path="/login" component={Forms} ></Route>
                    <Route exact path="/images/:category" component={Images} ></Route>

                    <Route exact path="/search/:category/:keyword" component={SearchResult} ></Route>

                    <Route exact path="/details/:id" component={PhotoDetails} ></Route>
                    <Route exact path="/cart" component={Cart} ></Route>
                    <Route exact path="/about-us" component={About} ></Route>
                    <Route exact path="/contact-us" component={Contact} ></Route>
                    <Route exact path="/terms" component={Terms} ></Route>
                    <Route exact path="/privacy" component={Privacy} ></Route>

                    

                    {/* <Route path="/contact" component={AdminHeader} ></Route> */}

                    {/* for user dashboard */}
                   
                    <PrivateRoute exact path="/user/dashboard" component={Dashboard} ></PrivateRoute>
                    <PrivateRoute exact path="/user/add-new-image" component={AddImage} ></PrivateRoute>
                    <PrivateRoute exact path="/user/uploads" component={UserUploads} ></PrivateRoute>
                    <PrivateRoute exact path="/user/orders" component={Orders} ></PrivateRoute>

                    <Route path="/*" component={Error} ></Route>

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
