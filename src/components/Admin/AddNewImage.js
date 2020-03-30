import React from 'react';
import '../../App.css';
import { db, storage, storageRef } from '../../config/firebase';
import watermark from 'watermarkjs';
import ImageCompressor from 'image-compressor.js';
import Footer from './Footer';


// import Jimp from 'jimp';
// import { $ } from 'jquery';

import M from 'materialize-css';
import { AuthContext } from '../../context/AuthContext';
import { GalleryContext } from '../../context/GalleryContext';



class AddNewImage extends React.Component {
    state = {
        title: "",
        description: "",
        price: null,
        loadingStatus: null,
        isWatermarkApply: false,
        isStatusApply: false,
        fileName: '',
        fileURL: null,
        fileWidth: null,
        fileHeight: null

    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    toggleButton = (event) => {
        this.setState({ [event.target.name]: !this.state[event.target.name] });
    }

    submitData = (auth, gallery) => {
        if (this.state.title === "" || this.state.description === "") {
            return M.toast({ html: `"Title" And "Description" Required!`, classes: 'red' })
        }
        var imageData = {
            title: this.state.title,
            description: this.state.description,
            price_status: this.state.isStatusApply,
            price: this.state.price,
            user_id: auth.user.uid,
            src: this.state.fileURL,
            width: this.state.fileWidth,
            height: this.state.fileHeight,
        }
        console.log(imageData);
        db.collection("uploads").add(imageData)
            .then((docRef) => {
                imageData.id = docRef.id

                gallery.addToList(imageData);

                console.log("Document written with ID: ", docRef.id);
                this.setState({ title: null, description: null, price: null, fileURL: null, loadingStatus: null, fileName: '' });
                return M.toast({ html: `Successfully Uploaded!`, classes: 'green' })
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

    }

    handleFileSelection = (event) => {

        let file = event.target.files[0]

        this.setState({ fileName: file.name, loadingStatus: 'Processing for Optimization' });

        const watermarkImage = require('../../components/ss-logo-png-4.png');


        // for getting image width and height
        var _URL = window.URL || window.webkitURL;

        const i = new Image();
        i.onload = () => {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                console.log({
                    src: file.preview,
                    width: i.width,
                    height: i.height,
                    data: reader.result
                })
            }
            this.setState({ fileWidth: i.width, fileHeight: i.height });
        };
        i.src = _URL.createObjectURL(file);




        if (this.state.isWatermarkApply === true) {

            // Aultra optimization

            new ImageCompressor(file, {
                quality: .5,
                success: (beforeFile) => {

                    console.log("first optimization");

                    const options = {
                        init(img) {
                            img.crossOrigin = 'anonymous'
                        }
                    };
                    watermark([beforeFile, watermarkImage], options)
                        .blob(watermark.image.center(0.5))
                        .then((blob) => {
                            // perform upload using FormData
                            console.log("Adding watermark on file")

                            new ImageCompressor(blob, {
                                quality: .5,
                                success: (result) => {

                                    this.setState({ loadingStatus: "Optimization" })

                                    console.log("Again optimization")


                                    storageRef.child(`images/${file.name}`).put(result).then((snapshot) => {

                                        console.log('Uploaded a blob or file!');
                                        // console.log(snapshot);
                                        snapshot.ref.getDownloadURL().then((downloadURL) => {
                                            console.log('File available at', downloadURL);
                                            this.setState({ fileURL: downloadURL, loadingStatus: "all done" });
                                        });
                                    }).catch((e) => {
                                        console.log(e);

                                    });

                                    this.setState({ loadingStatus: "Storing In Database" })

                                },
                                error(e) {
                                    console.log(e.message);
                                },
                            });



                        });


                }
            })



            // // first apply watermark then compress file for uploading into database

            // // only watermark
            // const options = {
            //     init(img) {
            //         img.crossOrigin = 'anonymous'
            //     }
            // };
            // watermark([file, watermarkImage], options)
            //     .blob(watermark.image.center(0.5))
            //     .then((blob) => {
            //         // perform upload using FormData
            //         console.log(blob)


            //         new ImageCompressor(blob, {
            //             quality: .6,
            //             success: (result) => {

            //                 this.setState({ loadingStatus: "Optimization" })
            //                 console.log(result)


            //                 storageRef.child(`images/${file.name}`).put(result).then((snapshot) => {

            //                     console.log('Uploaded a blob or file!');
            //                     console.log(snapshot);
            //                     snapshot.ref.getDownloadURL().then((downloadURL) => {
            //                         console.log('File available at', downloadURL);
            //                         this.setState({ fileURL: downloadURL, loadingStatus: "all done" });
            //                     });
            //                 }).catch((e) => {
            //                     console.log(e);

            //                 });

            //                 this.setState({ loadingStatus: "Storing In Database" })

            //             },
            //             error(e) {
            //                 console.log(e.message);
            //             },
            //         });



            //     });




            // first compress then add water mark contain total size a file 1.26 Mb
            // new ImageCompressor(file, {
            //     quality: .6,
            //     success: (result) => {


            //         this.setState({ loadingStatus: "Optimization" })

            //         // only watermark
            //         const options = {
            //             init(img) {
            //                 img.crossOrigin = 'anonymous'
            //             }
            //         };
            //         // const upload = event.target.files[0];
            //         watermark([result, watermarkImage], options)
            //             .image(watermark.image.center(0.5))
            //             // .image(watermark.image.lowerRight())
            //             .then((img) => {
            //                 console.log(img)
            //                 this.setState({ fileURL: img.src, loadingStatus: 'Inserting Watermark' });

            //             }
            //             );


            //     },
            //     error(e) {
            //         console.log(e.message);
            //     },
            // });










        } else {

            // with database + optimization

            new ImageCompressor(file, {
                quality: .5,
                success: (result) => {


                    this.setState({ loadingStatus: "Optimization" })

                    console.log("compressing result")

                    // console.log(result);

                    storageRef.child(`images/${file.name}`).put(result).then((snapshot) => {

                        console.log('Uploaded a blob or file!');
                        // console.log(snapshot);
                        snapshot.ref.getDownloadURL().then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            this.setState({ fileURL: downloadURL, loadingStatus: "all done" });
                        });

                    }).catch((e) => {
                        console.log(e);

                    });

                    this.setState({ loadingStatus: "Storing In Database" })

                },
                error(e) {
                    console.log(e.message);
                },
            });

        }














        // watermark + resizeing process
        // const options = {
        //     init(img) {
        //         img.crossOrigin = 'anonymous'
        //     }
        // };
        // const upload = event.target.files[0];
        // watermark([upload, watermarkImage], options)
        //     .image(watermark.image.center(0.5))
        //     // .image(watermark.image.lowerRight())
        //     .then((img) => {
        //         // console.log(img)
        //         var newImg = Jimp.read(img.src, (err, image) => {
        //             if (err) throw err;
        //             image
        //                 .resize(250, 250) // resize
        //                 .quality(70) // set JPEG quality
        //             image.getBase64(Jimp.AUTO, (err, data) => {
        //                 console.log(data);
        //                 // this.setState({ fileURL: data, loadingStatus: 'Inserting Watermark' });
        //             });
        //         });
        //         // console.log(newImg)
        //         this.setState({ fileURL: img.src, loadingStatus: 'Inserting Watermark' });
        //     }
        //     );


    }


    deleteFile = () => {
        var httpsReference = storage.refFromURL(this.state.fileURL);
        httpsReference.delete().then(() => {
            this.setState({ fileURL: null, loadingStatus: null, fileHeight: null, fileWidth: null })
        }).catch(function (error) {
            console.log(error)
        });

    }

    downloadImage = () => {

        var url = this.state.fileURL;
        var fileName = this.state.fileName;

        var xhr = new XMLHttpRequest();//
        xhr.open("GET", url, true);
        xhr.responseType = "blob";//
        xhr.onload = function () {//
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(this.response);
            var tag = document.createElement('a');
            tag.href = imageUrl;
            tag.download = fileName;
            document.body.appendChild(tag);
            tag.click();
            document.body.removeChild(tag);
        }
        xhr.send();

    }


    render() {
        return (
            <AuthContext.Consumer>
                {(AuthContext) => {

                    return (
                        <GalleryContext.Consumer>
                            {(gallery) => {
                                // console.log(gallery);
                                return (
                                    <div>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-lg-10 col-md-12 m-auto m-30 ">
                                                    <div className="card-panel">
                                                        <div className="row m-t-10">
                                                            <div className="col-md-6">
                                                                <div className="input-field col-12">
                                                                    <input type="text" value={this.state.title || ''} name="title" className="validate" onChange={this.handleChange} id="title" />
                                                                    <label htmlFor="title">Enter Title</label>
                                                                </div>

                                                                <div className="input-field col-12">
                                                                    <textarea id="description" name="description" value={this.state.description || ''} onChange={this.handleChange} className="materialize-textarea"></textarea>
                                                                    <label htmlFor="description">Description</label>
                                                                </div>
                                                                <div className="row">
                                                                    <label htmlFor="information" className="green-text" >First Make Sure All Changes Then Upload Your Photo!</label>
                                                                    <hr />
                                                                    <div className="col-8">
                                                                        <label htmlFor="waterMark">Watermark</label>
                                                                        <br />
                                                                        <div className="switch">
                                                                            <label>
                                                                                None
                                                                        <input type="checkbox" name="isWatermarkApply" onChange={this.toggleButton} />
                                                                                <span className="lever"></span>
                                                                                Apply
                                                                        </label>
                                                                        </div>
                                                                        <hr />

                                                                        <label htmlFor="sellStatus">Status</label>
                                                                        <br />
                                                                        <div className="switch">
                                                                            <label>
                                                                                Free
                                                    <input type="checkbox" name="isStatusApply" onChange={this.toggleButton} />
                                                                                <span className="lever"></span>
                                                                                Sell
                                                </label>
                                                                        </div>
                                                                        <br />
                                                                        {this.state.isStatusApply !== false ?
                                                                            <div>
                                                                                <b>Rs:-</b> <input type="text" name="price" value={this.state.price || ''} onChange={this.handleChange} className="input-field col-12" placeholder="Enter Price" />
                                                                                <label htmlFor="price">Enter Price</label>
                                                                                <hr />
                                                                            </div>
                                                                            : null}


                                                                    </div>
                                                                    <div className="col-4">

                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div className="col-md-6 p-t-50">

                                                                {
                                                                    this.state.fileURL !== null
                                                                        ?
                                                                        <div>
                                                                            {/* <div className="card-panel"> */}
                                                                            <img src={this.state.fileURL} alt="" style={{ maxWidth: '100%' }} />
                                                                            <br /><br />
                                                                            <button className="btn red waves-effect waves-red" onClick={this.deleteFile}>Delete</button>
                                                                            <button className="btn waves-effect waves-green" onClick={this.downloadImage} >Download </button>
                                                                            {/* </div> */}
                                                                        </div>
                                                                        :
                                                                        <div>
                                                                            <input type="file" name="photo" onChange={this.handleFileSelection} /><br /><br />
                                                                            <label htmlFor="photo">Make sure file size must be less then 5MB before Uploading for better Results</label>
                                                                            {this.state.loadingStatus !== null ?
                                                                                <div>
                                                                                    {this.state.loadingStatus}
                                                                                    <div className='progress'><div className='indeterminate'></div></div>
                                                                                </div>
                                                                                :
                                                                                <div></div>}
                                                                        </div>
                                                                }
                                                            </div>
                                                            <br /><br />
                                                            <div className="divider" tabIndex="-1"></div>

                                                            {/* <button className={`btn green lighten-1 float-right ${this.state.loadingStatus !== 'all done' ? 'disabled' : ''} `} 
                                            onClick={()=>{
                                                this.submitData(AuthContext)
                                            }} >Create</button> */}
                                                            <button className={`btn green lighten-1 float-right`}
                                                                onClick={() => {
                                                                    this.submitData(AuthContext, gallery)
                                                                }} >Create</button>

                                                        </div>
                                                    </div>
                                                </div>
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
        )
    }
}
export default AddNewImage;