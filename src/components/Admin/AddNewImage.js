import React from 'react';
import '../../App.css';
import { db, storage, storageRef } from '../../config/firebase';
import watermark from 'watermarkjs';
// import ImageCompressor from 'image-compressor.js';
import ImageCompressor from 'compressorjs';

import Footer from './Footer';
import Header from './Header';


// import Jimp from 'jimp';
// import { $ } from 'jquery';

import M from 'materialize-css';
import { AuthContext } from '../../context/AuthContext';
import { GalleryContext } from '../../context/GalleryContext';


// new

import firebase from 'firebase';


class AddNewImage extends React.Component {
    state = {
        title: "",
        description: "",
        price: null,
        category: "",
        loadingStatus: null,
        isWatermarkApply: true,
        isStatusApply: false,
        fileName: '',
        fileURL: null,
        fileWidth: null,
        fileHeight: null,
        keywords:null,

        epsName: null,
        epsLoadingStatus: null,
        epsURL: null,
    }

    handleKeyword = (event) => {

        this.setState({keywords: event[0].M_Chips.chipsData});

        console.log(this.state.keywords);
    }
  
    componentDidMount = () => {
        var options = {
            autocompleteOptions: {
                data: {
                    'Texture': null,
                    'Ornament': null,
                    'Baroque': null,
                    'Patterns': null,
                    'Botanical': null,
                    'Flowers': null,
                    'Leaves': null,
                    'Digital': null,
                    'Textile Designs': null,
                },
                limit: Infinity,
                minLength: 1,

            },
            onChipAdd: this.handleKeyword,
            onChipDelete:this.handleKeyword,
        }

        M.Collapsible.init(document.querySelectorAll('.collapsible'));
        M.FormSelect.init(document.querySelectorAll('select'));
        M.Chips.init(document.querySelectorAll('.chips'), options);

    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    toggleButton = (event) => {
        this.setState({ [event.target.name]: !this.state[event.target.name] });
    }

    submitData = (auth, gallery) => {
        if (this.state.title === "" ) {
            return M.toast({ html: `"Title" Required!`, classes: 'red' })
        } else if (this.state.category === "") {
            return M.toast({ html: "Please Choose Category", classes: "red" })

        } else if (this.state.fileURL === null || this.state.epsURL === null) {
            return M.toast({ html: "Please Insert Both Files .EPS + .JPG", classes: "red" });
        }
        var imageData = {
            title: this.state.title,
            description: this.state.description,
            category: this.state.category,
            price_status: this.state.isStatusApply,
            price: this.state.price,
            user_id: auth.user.uid,
            src: this.state.fileURL,
            width: this.state.fileWidth,
            height: this.state.fileHeight,
            keywords: this.state.keywords,
            epsURL: this.state.epsURL,
            epsName: this.state.epsName,
        }
        console.log(imageData);
        db.collection("uploads").add(imageData)
            .then((docRef) => {
                imageData.id = docRef.id

                gallery.addToList(imageData);

                console.log("Document written with ID: ", docRef.id);
                this.setState({ title: null, description: null, price: null, fileURL: null, loadingStatus: null, fileName: '', epsLoadingStatus: null, epsName: null, epsURL: null });
                return M.toast({ html: `Successfully Uploaded!`, classes: 'green' })
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

    }

    handleEPSFileSelection = (event) => {

        let file = event.target.files[0];

        // this.setState({ epsName: file.name });

        // Create the file metadata
        var metadata = {
            contentType: 'image/eps'
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = storageRef.child('EPSFiles/' + file.name).put(file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
                this.setState({ epsLoadingStatus: Math.floor(progress) });
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                    default:
                        console.log("Something Wrong Please Refresh the page and try again!");
                }
            }, (error) => {

                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object;
                        M.toast({ html: "User doesn't have permission to access the object", classes: "red" })

                        break;

                    case 'storage/canceled':
                        // User canceled the upload
                        M.toast({ html: "User canceled the upload", classes: "red" });
                        break;



                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        M.toast({ html: "Unknown error occurred", classes: "red" });
                        break;
                    default:
                        alert("Something Wrong Please Refresh the page and try again!");
                }
            }, () => {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    this.setState({ epsURL: downloadURL, epsName: file.name, epsLoadingStatus: null });
                });
            });





    }

    handleImageSelection = (event) => {
        let file = event.target.files[0];
        var _URL = window.URL || window.webkitURL;
        const i = new Image();
        i.onload = () => {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                console.log({
                    width: i.width,
                    height: i.height,
                    data: reader.result
                });
            }
            this.setState({ fileWidth: Math.round(i.width / 300), fileHeight: Math.round(i.height / 300) });
        };
        i.src = _URL.createObjectURL(file);

        const options = {
            init(img) {
                img.crossOrigin = 'anonymous'
            }
        };
        var watermarkImage = require('../../images/UntitledCopy.png');

        this.setState({ loadingStatus: "Uploading" });

        if (this.state.isWatermarkApply === true) {

            new ImageCompressor(file, {
                quality: 0.6,
                width: 550,
                // width:1000,
                convertSize: 50000000,
                strict: true,
                checkOrientation: true,
                success: (beforeFile) => {

                    watermark([beforeFile, watermarkImage], options)
                        .blob(watermark.image.center(0.5))
                        .then((blob) => {

                            this.setState({ loadingStatus: "Optimization" })

                            storageRef.child(`images/${file.name}`).put(blob).then((snapshot) => {

                                console.log('Uploaded a blob or file!');
                                // console.log(snapshot);
                                snapshot.ref.getDownloadURL().then((downloadURL) => {
                                    console.log('File available at', downloadURL);
                                    this.setState({ fileURL: downloadURL, loadingStatus: "all done" });
                                });
                            }).catch((e) => {
                                console.log(e);

                            });

                        });

                }
            });


        } else {

            new ImageCompressor(file, {
                quality: .6,
                width: 550,
                // width:1000,
                convertSize: 50000000,
                strict: true,
                checkOrientation: true,
                success: (result) => {

                    this.setState({ loadingStatus: "Optimization" })

                    storageRef.child(`images/${file.name}`).put(result).then((snapshot) => {
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




    }

    handleFileSelection = (event) => {

        let file = event.target.files[0]

        this.setState({ fileName: file.name, loadingStatus: 'Processing for Optimization' });

        // const watermarkImage = require('../../components/ss-logo-png-4.png');
        const watermarkImage = require('../../images/watermark.png');

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

    deleteEps = () => {
        console.log("click");
        var httpsReference = storage.refFromURL(this.state.epsURL);
        httpsReference.delete().then(() => {
            this.setState({ epsURL: null, epsName: null, epsLoadingStatus: null })
        }).catch(function (error) {
            console.log(error)
        });
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
                                        <Header />
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-lg-10 col-md-12 m-auto m-30 ">
                                                    <div className="card-panel1">
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

                                                                <div className="input-field col-12">
                                                                    <select name="category" value={this.state.category || ''} onChange={this.handleChange} >
                                                                        <option value="" disabled >Choose Your Option</option>
                                                                        <option value="ornamentsAndBaroque">Ornaments And Baroque</option>
                                                                        <option value="texture">Texture</option>
                                                                        <option value="pattren">Pattern</option>
                                                                        <option value="degitalTextileDesign">Degital Textile Design</option>
                                                                        <option value="botanicalFlowersAndLeaves">Botanical Flowers And Leaves</option>
                                                                    </select>
                                                                    <label>Select Category</label>
                                                                </div>
                                                                {/* <!-- Default with no input (automatically generated)  --> */}
                                                                <label htmlFor="keywords" >Keywords</label>
                                                                <div className="chips chips-autocomplete" ></div>

                                                                {/* <!-- Customizable input  --> */}
                                                                {/* <div className="chips" >
                                                                    <input className="custom-class" onChipAdd={(data)=>{console.log(data)}} />
                                                                </div> */}

                                                                <div className="row">
                                                                    <label htmlFor="information" className="green-text" >First Make Sure All Changes Then Upload Your Photo!</label>
                                                                    <hr />
                                                                    <div className="col-8">
                                                                        <label htmlFor="waterMark">Watermark</label>
                                                                        <br />
                                                                        <div className="switch">
                                                                            <label>
                                                                                None
                                                                        <input type="checkbox" name="isWatermarkApply" onChange={this.toggleButton} defaultChecked />
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
                                                                                <b>Dollars:-</b> <input type="text" name="price" value={this.state.price || ''} onChange={this.handleChange} className="input-field col-12" placeholder="Enter Price" />
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

                                                                <ul className="collapsible">
                                                                    <li>
                                                                        <div className="collapsible-header"><i className="material-icons">insert_drive_file</i>Upload EPS</div>
                                                                        <div className="collapsible-body"><span>
                                                                            {
                                                                                this.state.epsName !== null
                                                                                    ?
                                                                                    <div>
                                                                                        <div className="collection">
                                                                                            <span className="collection-item"><span className="badge red white-text" style={{ cursor: "pointer" }} onClick={this.deleteEps}><i className="material-icons">delete</i> </span> {this.state.epsName} </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    :
                                                                                    <div>
                                                                                        <input type="file" name="epsFile" id="epsFile" onChange={this.handleEPSFileSelection} /><br /><br />
                                                                                        {this.state.epsLoadingStatus !== null ?
                                                                                            <div>
                                                                                                <label htmlFor="epsFile">Uploading: {this.state.epsLoadingStatus}%</label>
                                                                                                <div className="progress">
                                                                                                    <div className="determinate" style={{ width: `${this.state.epsLoadingStatus}%` }}></div>
                                                                                                </div>
                                                                                            </div>
                                                                                            :
                                                                                            <div></div>}
                                                                                    </div>
                                                                            }
                                                                        </span></div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="collapsible-header"><i className="material-icons">image</i>Upload JPEG</div>
                                                                        <div className="collapsible-body"><span>
                                                                            {
                                                                                this.state.fileURL !== null
                                                                                    ?
                                                                                    <div>
                                                                                        <img src={this.state.fileURL} alt="" style={{ maxWidth: '100%' }} />
                                                                                        <br /><br />
                                                                                        <button className="btn red waves-effect waves-red" onClick={this.deleteFile}>Delete</button>
                                                                                        <button className="btn waves-effect waves-green" onClick={this.downloadImage} >Download </button>
                                                                                    </div>
                                                                                    :
                                                                                    <div>
                                                                                        {/* <input type="file" name="photo" onChange={this.handleFileSelection} /><br /><br /> */}
                                                                                        <input type="file" name="photo" onChange={this.handleImageSelection} /><br /><br />
                                                                                        {this.state.loadingStatus !== null ?
                                                                                            <div>
                                                                                                {this.state.loadingStatus}
                                                                                                <div className='progress'><div className='indeterminate'></div></div>
                                                                                            </div>
                                                                                            :
                                                                                            <div></div>}
                                                                                    </div>
                                                                            }



                                                                        </span></div>
                                                                    </li>
                                                                </ul>



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