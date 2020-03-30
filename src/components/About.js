import React from 'react';
// import * as jQuery from 'jquery';

class About extends React.Component {





    render() {

       




        // this.componentDidMount = () => {
        //     (($) => {
        //         // Dropdown 
        //         try {
        //             var menu = $('.js-item-menu');
        //             var sub_menu_is_showed = -1;
    
        //             for (var i = 0; i < menu.length; i++) {
        //                 $(menu[i]).on('click', function (e) {
        //                     e.preventDefault();
        //                     $('.js-right-sidebar').removeClass("show-sidebar");
        //                     if (jQuery.inArray(this, menu) == sub_menu_is_showed) {
        //                         $(this).toggleClass('show-dropdown');
        //                         sub_menu_is_showed = -1;
        //                     }
        //                     else {
        //                         for (var i = 0; i < menu.length; i++) {
        //                             $(menu[i]).removeClass("show-dropdown");
        //                         }
        //                         $(this).toggleClass('show-dropdown');
        //                         sub_menu_is_showed = jQuery.inArray(this, menu);
        //                     }
        //                 });
        //             }
        //             $(".js-item-menu, .js-dropdown").click(function (event) {
        //                 event.stopPropagation();
        //             });
    
        //             $("body,html").on("click", function () {
        //                 for (var i = 0; i < menu.length; i++) {
        //                     menu[i].classList.remove("show-dropdown");
        //                 }
        //                 sub_menu_is_showed = -1;
        //             });
    
        //         } catch (error) {
        //             console.log(error);
        //         }
    
    
        //     })(jQuery)
        // }



        return (
            <div className="container-fluid p-0">

                {/* <header className="header-desktop3 d-none d-lg-block">
                    <div className="section__content section__content--p35">
                        <div className="header3-wrap">
                            <div className="header__logo">
                                <a href="#">
                                    <img src="images/icon/logo-white.png" alt="CoolAdmin" />
                                </a>
                            </div>
                            <div className="header__navbar">
                                <ul className="list-unstyled">
                                    <li className="has-sub">
                                        <a href="#">
                                            <i className="fas fa-tachometer-alt"></i>Dashboard
                                    <span className="bot-line"></span>
                                        </a>
                                        <ul className="header3-sub-list list-unstyled">
                                            <li>
                                                <a href="index.html">Dashboard 1</a>
                                            </li>
                                            <li>
                                                <a href="index2.html">Dashboard 2</a>
                                            </li>
                                            <li>
                                                <a href="index3.html">Dashboard 3</a>
                                            </li>
                                            <li>
                                                <a href="index4.html">Dashboard 4</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fas fa-shopping-basket"></i>
                                            <span className="bot-line"></span>eCommerce</a>
                                    </li>
                                    <li>
                                        <a href="table.html">
                                            <i className="fas fa-trophy"></i>
                                            <span className="bot-line"></span>Features</a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="#">
                                            <i className="fas fa-copy"></i>
                                            <span className="bot-line"></span>Pages</a>
                                        <ul className="header3-sub-list list-unstyled">
                                            <li>
                                                <a href="login.html">Login</a>
                                            </li>
                                            <li>
                                                <a href="register.html">Register</a>
                                            </li>
                                            <li>
                                                <a href="forget-pass.html">Forget Password</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="has-sub">
                                        <a href="#">
                                            <i className="fas fa-desktop"></i>
                                            <span className="bot-line"></span>UI Elements</a>
                                        <ul className="header3-sub-list list-unstyled">
                                            <li>
                                                <a href="button.html">Button</a>
                                            </li>
                                            <li>
                                                <a href="badge.html">Badges</a>
                                            </li>
                                            <li>
                                                <a href="tab.html">Tabs</a>
                                            </li>
                                            <li>
                                                <a href="card.html">Cards</a>
                                            </li>
                                            <li>
                                                <a href="alert.html">Alerts</a>
                                            </li>
                                            <li>
                                                <a href="progress-bar.html">Progress Bars</a>
                                            </li>
                                            <li>
                                                <a href="modal.html">Modals</a>
                                            </li>
                                            <li>
                                                <a href="switch.html">Switchs</a>
                                            </li>
                                            <li>
                                                <a href="grid.html">Grids</a>
                                            </li>
                                            <li>
                                                <a href="fontawesome.html">FontAwesome</a>
                                            </li>
                                            <li>
                                                <a href="typo.html">Typography</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div className="header__tool">
                                <div className="header-button-item has-noti js-item-menu">
                                    <i className="zmdi zmdi-notifications"></i>
                                    <div className="notifi-dropdown notifi-dropdown--no-bor js-dropdown">
                                        <div className="notifi__title">
                                            <p>You have 3 Notifications</p>
                                        </div>
                                        <div className="notifi__item">
                                            <div className="bg-c1 img-cir img-40">
                                                <i className="zmdi zmdi-email-open"></i>
                                            </div>
                                            <div className="content">
                                                <p>You got a email notification</p>
                                                <span className="date">April 12, 2018 06:50</span>
                                            </div>
                                        </div>
                                        <div className="notifi__item">
                                            <div className="bg-c2 img-cir img-40">
                                                <i className="zmdi zmdi-account-box"></i>
                                            </div>
                                            <div className="content">
                                                <p>Your account has been blocked</p>
                                                <span className="date">April 12, 2018 06:50</span>
                                            </div>
                                        </div>
                                        <div className="notifi__item">
                                            <div className="bg-c3 img-cir img-40">
                                                <i className="zmdi zmdi-file-text"></i>
                                            </div>
                                            <div className="content">
                                                <p>You got a new file</p>
                                                <span className="date">April 12, 2018 06:50</span>
                                            </div>
                                        </div>
                                        <div className="notifi__footer">
                                            <a href="#">All notifications</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="header-button-item js-item-menu">
                                    <i className="zmdi zmdi-settings"></i>
                                    <div className="setting-dropdown js-dropdown">
                                        <div className="account-dropdown__body">
                                            <div className="account-dropdown__item">
                                                <a href="#">
                                                    <i className="zmdi zmdi-account"></i>Account</a>
                                            </div>
                                            <div className="account-dropdown__item">
                                                <a href="#">
                                                    <i className="zmdi zmdi-settings"></i>Setting</a>
                                            </div>
                                            <div className="account-dropdown__item">
                                                <a href="#">
                                                    <i className="zmdi zmdi-money-box"></i>Billing</a>
                                            </div>
                                        </div>
                                        <div className="account-dropdown__body">
                                            <div className="account-dropdown__item">
                                                <a href="#">
                                                    <i className="zmdi zmdi-globe"></i>Language</a>
                                            </div>
                                            <div className="account-dropdown__item">
                                                <a href="#">
                                                    <i className="zmdi zmdi-pin"></i>Location</a>
                                            </div>
                                            <div className="account-dropdown__item">
                                                <a href="#">
                                                    <i className="zmdi zmdi-email"></i>Email</a>
                                            </div>
                                            <div className="account-dropdown__item">
                                                <a href="#">
                                                    <i className="zmdi zmdi-notifications"></i>Notifications</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="account-wrap">
                                    <div className="account-item account-item--style2 clearfix js-item-menu">
                                        <div className="image">
                                            <img src="images/icon/avatar-01.jpg" alt="John Doe" />
                                        </div>
                                        <div className="content">
                                            <a className="js-acc-btn" href="#">john doe</a>
                                        </div>
                                        <div className="account-dropdown js-dropdown">
                                            <div className="info clearfix">
                                                <div className="image">
                                                    <a href="#">
                                                        <img src="images/icon/avatar-01.jpg" alt="John Doe" />
                                                    </a>
                                                </div>
                                                <div className="content">
                                                    <h5 className="name">
                                                        <a href="#">john doe</a>
                                                    </h5>
                                                    <span className="email">johndoe@example.com</span>
                                                </div>
                                            </div>
                                            <div className="account-dropdown__body">
                                                <div className="account-dropdown__item">
                                                    <a href="#">
                                                        <i className="zmdi zmdi-account"></i>Account</a>
                                                </div>
                                                <div className="account-dropdown__item">
                                                    <a href="#">
                                                        <i className="zmdi zmdi-settings"></i>Setting</a>
                                                </div>
                                                <div className="account-dropdown__item">
                                                    <a href="#">
                                                        <i className="zmdi zmdi-money-box"></i>Billing</a>
                                                </div>
                                            </div>
                                            <div className="account-dropdown__footer">
                                                <a href="#">
                                                    <i className="zmdi zmdi-power"></i>Logout</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <header className="header-mobile header-mobile-2 d-block d-lg-none">
                    <div className="header-mobile__bar">
                        <div className="container-fluid">
                            <div className="header-mobile-inner">
                                <a className="logo" href="index.html">
                                    <img src="images/icon/logo-white.png" alt="CoolAdmin" />
                                </a>
                                <button className="hamburger hamburger--slider" type="button">
                                    <span className="hamburger-box">
                                        <span className="hamburger-inner"></span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <nav className="navbar-mobile">
                        <div className="container-fluid">
                            <ul className="navbar-mobile__list list-unstyled">
                                <li className="has-sub">
                                    <a className="js-arrow" href="#">
                                        <i className="fas fa-tachometer-alt"></i>Dashboard</a>
                                    <ul className="navbar-mobile-sub__list list-unstyled js-sub-list">
                                        <li>
                                            <a href="index.html">Dashboard 1</a>
                                        </li>
                                        <li>
                                            <a href="index2.html">Dashboard 2</a>
                                        </li>
                                        <li>
                                            <a href="index3.html">Dashboard 3</a>
                                        </li>
                                        <li>
                                            <a href="index4.html">Dashboard 4</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="chart.html">
                                        <i className="fas fa-chart-bar"></i>Charts</a>
                                </li>
                                <li>
                                    <a href="table.html">
                                        <i className="fas fa-table"></i>Tables</a>
                                </li>
                                <li>
                                    <a href="form.html">
                                        <i className="far fa-check-square"></i>Forms</a>
                                </li>
                                <li>
                                    <a href="calendar.html">
                                        <i className="fas fa-calendar-alt"></i>Calendar</a>
                                </li>
                                <li>
                                    <a href="map.html">
                                        <i className="fas fa-map-marker-alt"></i>Maps</a>
                                </li>
                                <li className="has-sub">
                                    <a className="js-arrow" href="#">
                                        <i className="fas fa-copy"></i>Pages</a>
                                    <ul className="navbar-mobile-sub__list list-unstyled js-sub-list">
                                        <li>
                                            <a href="login.html">Login</a>
                                        </li>
                                        <li>
                                            <a href="register.html">Register</a>
                                        </li>
                                        <li>
                                            <a href="forget-pass.html">Forget Password</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="has-sub">
                                    <a className="js-arrow" href="#">
                                        <i className="fas fa-desktop"></i>UI Elements</a>
                                    <ul className="navbar-mobile-sub__list list-unstyled js-sub-list">
                                        <li>
                                            <a href="button.html">Button</a>
                                        </li>
                                        <li>
                                            <a href="badge.html">Badges</a>
                                        </li>
                                        <li>
                                            <a href="tab.html">Tabs</a>
                                        </li>
                                        <li>
                                            <a href="card.html">Cards</a>
                                        </li>
                                        <li>
                                            <a href="alert.html">Alerts</a>
                                        </li>
                                        <li>
                                            <a href="progress-bar.html">Progress Bars</a>
                                        </li>
                                        <li>
                                            <a href="modal.html">Modals</a>
                                        </li>
                                        <li>
                                            <a href="switch.html">Switchs</a>
                                        </li>
                                        <li>
                                            <a href="grid.html">Grids</a>
                                        </li>
                                        <li>
                                            <a href="fontawesome.html">Fontawesome Icon</a>
                                        </li>
                                        <li>
                                            <a href="typo.html">Typography</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
                <div className="sub-header-mobile-2 d-block d-lg-none">
                    <div className="header__tool">
                        <div className="header-button-item has-noti js-item-menu">
                            <i className="zmdi zmdi-notifications"></i>
                            <div className="notifi-dropdown notifi-dropdown--no-bor js-dropdown">
                                <div className="notifi__title">
                                    <p>You have 3 Notifications</p>
                                </div>
                                <div className="notifi__item">
                                    <div className="bg-c1 img-cir img-40">
                                        <i className="zmdi zmdi-email-open"></i>
                                    </div>
                                    <div className="content">
                                        <p>You got a email notification</p>
                                        <span className="date">April 12, 2018 06:50</span>
                                    </div>
                                </div>
                                <div className="notifi__item">
                                    <div className="bg-c2 img-cir img-40">
                                        <i className="zmdi zmdi-account-box"></i>
                                    </div>
                                    <div className="content">
                                        <p>Your account has been blocked</p>
                                        <span className="date">April 12, 2018 06:50</span>
                                    </div>
                                </div>
                                <div className="notifi__item">
                                    <div className="bg-c3 img-cir img-40">
                                        <i className="zmdi zmdi-file-text"></i>
                                    </div>
                                    <div className="content">
                                        <p>You got a new file</p>
                                        <span className="date">April 12, 2018 06:50</span>
                                    </div>
                                </div>
                                <div className="notifi__footer">
                                    <a href="#">All notifications</a>
                                </div>
                            </div>
                        </div>
                        <div className="header-button-item js-item-menu">
                            <i className="zmdi zmdi-settings"></i>
                            <div className="setting-dropdown js-dropdown">
                                <div className="account-dropdown__body">
                                    <div className="account-dropdown__item">
                                        <a href="#">
                                            <i className="zmdi zmdi-account"></i>Account</a>
                                    </div>
                                    <div className="account-dropdown__item">
                                        <a href="#">
                                            <i className="zmdi zmdi-settings"></i>Setting</a>
                                    </div>
                                    <div className="account-dropdown__item">
                                        <a href="#">
                                            <i className="zmdi zmdi-money-box"></i>Billing</a>
                                    </div>
                                </div>
                                <div className="account-dropdown__body">
                                    <div className="account-dropdown__item">
                                        <a href="#">
                                            <i className="zmdi zmdi-globe"></i>Language</a>
                                    </div>
                                    <div className="account-dropdown__item">
                                        <a href="#">
                                            <i className="zmdi zmdi-pin"></i>Location</a>
                                    </div>
                                    <div className="account-dropdown__item">
                                        <a href="#">
                                            <i className="zmdi zmdi-email"></i>Email</a>
                                    </div>
                                    <div className="account-dropdown__item">
                                        <a href="#">
                                            <i className="zmdi zmdi-notifications"></i>Notifications</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="account-wrap">
                            <div className="account-item account-item--style2 clearfix js-item-menu">
                                <div className="image">
                                    <img src="images/icon/avatar-01.jpg" alt="John Doe" />
                                </div>
                                <div className="content">
                                    <a className="js-acc-btn" href="#">john doe</a>
                                </div>
                                <div className="account-dropdown js-dropdown">
                                    <div className="info clearfix">
                                        <div className="image">
                                            <a href="#">
                                                <img src="images/icon/avatar-01.jpg" alt="John Doe" />
                                            </a>
                                        </div>
                                        <div className="content">
                                            <h5 className="name">
                                                <a href="#">john doe</a>
                                            </h5>
                                            <span className="email">johndoe@example.com</span>
                                        </div>
                                    </div>
                                    <div className="account-dropdown__body">
                                        <div className="account-dropdown__item">
                                            <a href="#">
                                                <i className="zmdi zmdi-account"></i>Account</a>
                                        </div>
                                        <div className="account-dropdown__item">
                                            <a href="#">
                                                <i className="zmdi zmdi-settings"></i>Setting</a>
                                        </div>
                                        <div className="account-dropdown__item">
                                            <a href="#">
                                                <i className="zmdi zmdi-money-box"></i>Billing</a>
                                        </div>
                                    </div>
                                    <div className="account-dropdown__footer">
                                        <a href="#">
                                            <i className="zmdi zmdi-power"></i>Logout</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <h1>this is about pages</h1>


            </div>


        );
    }
}


export default About;