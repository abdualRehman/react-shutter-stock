import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';

import HomePage2 from './components/HomePage2';

import Header from './components/Header'
import Footer from './components/Footer'
import Forms from './components/LoginForm'
import Contact from './components/Contact'
import About from './components/About';

// import HomePage from './components/HomePage';


import Images from './components/Images';
import PhotoDetails from './components/PhotoDetails';
import Cart from './components/Cart';

import SearchResult from './components/SearchResult';



import UserDashboard from './components/UserDashboard';
import M from 'materialize-css';


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
                <div className="App">

                  {/* <Header /> */}
                  {this.state.isAuth === true ? '' : <Header />}
                  <Route exact path="/" component={HomePage2} ></Route>
                  {/* <Route exact path="/" component={HomePage} ></Route> */}
                  <Route path="/login" component={Forms} ></Route>
                  <Route path="/images" component={Images} ></Route>

                  <Route path="/search" component={SearchResult} ></Route>

                  <Route path="/details/:id" component={PhotoDetails} ></Route>
                  <Route path="/cart" component={Cart} ></Route>
                  <Route path="/about-us" component={About} ></Route>
                  <Route path="/contact-us" component={Contact} ></Route>


                  {/* <Route path="/contact" component={AdminHeader} ></Route> */}

                  {/* for user dashboard */}
                  <Route path="/user" component={UserDashboard} ></Route>
                  {/* <Route extact path="/user/contact" component={Contact} ></Route> */}
                  <Route path="/user/dashboard" component={Dashboard} ></Route>
                  <Route path="/user/add-new-image" component={AddImage} ></Route>
                  <Route path="/user/uploads" component={UserUploads} ></Route>
                  <Route path="/user/orders" component={Orders} ></Route>
                  {/* <Footer /> */}
                  {this.state.isAuth === true ? '' : <Footer />}

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
