import React from 'react';
import '../../App.css';
import { AuthContext } from '../../context/AuthContext';
import { GalleryContext } from '../../context/GalleryContext';
import swal from 'sweetalert';
import Footer from './Footer';
import Header from './Header';


import M from 'materialize-css';

export default class UserUploads extends React.Component {

    constructor(props) {
        super(props);
        this.editPhoto = this.editPhoto.bind(this);
        this.state = {
            title: '',
            description: '',
            isStatusApply: false,
            price: null,
            fileURL: null,

        }
    }


    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    toggleButton = (event) => {
        this.setState({ [event.target.name]: !this.state[event.target.name] });
    }

    componentDidMount = () => {
        M.Modal.init(document.querySelectorAll('.modal'));
    }

    editPhoto = (id, gallery) => {
        var details = gallery.findById(id);
        this.setState({
            title: details.title,
            description: details.description,
            price: details.price,
            isStatusApply: details.price_status,
            fileURL: details.freeSrc,
            id: details.id
        });
    }
    deletePhoto = (id, gallery) => {

        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this permenently?",
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    gallery.deletePhoto(id);
                    swal("Deleted!", "Your imaginary file has been deleted!", "success");
                }
            });


    }

    updatePhoto = (gallery) => {
        let updateData = {
            title: this.state.title,
            price: this.state.price,
            id: this.state.id
        }

        gallery.UpdatePhotoData(updateData).then(res => {
            if (res === true) {
                swal("Updated!", "Your Photo successfully Updated ", "success");
            }
        });



    }


    render() {
        return (
            <AuthContext.Consumer>
                {(auth) => {
                    return (

                        <GalleryContext.Consumer>
                            {(gallery) => {
                                return (
                                    <div>
                                        <Header />
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-lg-10 col-md-12 m-auto m-30 ">
                                                    <div className="card-panel1">
                                                        <h3>ALL UPLOADS</h3>

                                                        <div className="table-responsive table-responsive-data2">
                                                            <table className="table table-data2" id="productTable">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Image</th>
                                                                        <th>Title</th>

                                                                        <th>Price</th>
                                                                        <th></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {gallery.photos.map((photo) => {
                                                                        if (photo.user_id === auth.user.uid) {

                                                                            return <tr key={photo.id} className="tr-shadow">
                                                                                <td> <div className="how-itemcart1">
                                                                                    <img src={photo.freeSrc} alt="IMG" />
                                                                                </div>
                                                                                </td>
                                                                                <td className="desc" >{photo.title}</td>

                                                                                <td>$ {photo.price}-USD</td>
                                                                                <td>
                                                                                    <div className="table-data-feature">
                                                                                        <button className="item modal-trigger" onClick={() => this.editPhoto(photo.id, gallery)} data-target="modal1"
                                                                                            title="Edit">
                                                                                            <i className="zmdi zmdi-edit"></i>
                                                                                        </button>
                                                                                        <button className="item" data-toggle="tooltip" onClick={() => this.deletePhoto(photo.id, gallery)} data-placement="top"
                                                                                            title="Delete">
                                                                                            <i className="zmdi zmdi-delete"></i>
                                                                                        </button>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>


                                                                        }
                                                                        return true;
                                                                    })}


                                                                </tbody>
                                                            </table>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                        <div id="modal1" className="modal modal-fixed-footer">
                                            <div className="modal-header">
                                                <h5>Edit Post</h5>
                                                <button type="button" className="close modal-close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-content">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-lg-6 col-md-12">
                                                            <input type="text" placeholder="Title" value={this.state.title || ''} name="title" className="validate" onChange={this.handleChange} id="title" />
                                                            <label htmlFor="title">Title</label>


                                                            <hr />

                                                            <div>
                                                                <b>Dollars:-</b> <input type="text" name="price" value={this.state.price || ''} onChange={this.handleChange} className="input-field col-12" placeholder="Enter Price" />
                                                                <label htmlFor="price">Enter Price</label>
                                                                <hr />
                                                            </div>


                                                        </div>
                                                        <div className="col-lg-6 col-md-12">
                                                            {
                                                                this.state.fileURL !== null
                                                                    ?
                                                                    <div>

                                                                        <img src={this.state.fileURL} alt="" style={{ maxWidth: '100%' }} />
                                                                        <br /><br />

                                                                    </div>
                                                                    : null}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button onClick={() => this.updatePhoto(gallery)} className="modal-close waves-effect green btn-flat white-text">Update</button>
                                            </div>
                                        </div>


                                        <Footer />



                                    </div>
                                )
                            }}
                        </GalleryContext.Consumer>
                    );
                }}
            </AuthContext.Consumer>
        );
    }

};