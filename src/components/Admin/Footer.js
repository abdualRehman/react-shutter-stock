import React from 'react';



export default class Footer extends React.Component {
    render() {
        return (
            <div>
                <section className="p-t-60 p-b-10 grey lighten-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="copyright">
                                    <p>Copyright &copy; 2020. All rights reserved. Created by <a href="">AR Web Creators</a>.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}