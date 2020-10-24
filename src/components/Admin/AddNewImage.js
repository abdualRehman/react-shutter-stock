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



import * as imageConversion from 'image-conversion';



class AddNewImage extends React.Component {
    state = {
        title: "",
        price: null,
        category: "",
        keywords: null,

        pngLoadingStatus: null,
        Images: [],
        completeStatus: "",
    }

    handleKeyword = (event) => {

        this.setState({ keywords: event[0].M_Chips.chipsData });

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
            onChipDelete: this.handleKeyword,
        }

        M.Collapsible.init(document.querySelectorAll('.collapsible'));
        M.FormSelect.init(document.querySelectorAll('select'));
        M.Chips.init(document.querySelectorAll('.chips'), options);

    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    submitData = (auth, gallery) => {
        if (this.state.title === "") {
            return M.toast({ html: `"Title" Required!`, classes: 'red' })
        } else if (this.state.category === "") {
            return M.toast({ html: "Please Choose Category", classes: "red" })

        } else if (this.state.keywords.length < 1) {
            return M.toast({ html: "Please Enter At Least 1 keyword", classes: "red" });
        }



        let totalImages = this.state.Images;

        let uploadData = (counter) => {

            if (counter === totalImages.length) {
                M.toast({ html: `Successfully Uploaded!`, classes: 'green' });
                this.setState({
                    title: null,
                    price: null,
                    pngLoadingStatus: null,
                    Images: [],
                    completeStatus: "",
                });

            }

            var imageData = {
                title: this.state.title,
                category: this.state.category,
                price: this.state.price,
                user_id: auth.user.uid,
                keywords: this.state.keywords,
            }

            setTimeout(() => {
                if (counter < totalImages.length) {
                    imageData.width = totalImages[counter].fileWidth;
                    imageData.height = totalImages[counter].fileHeight;
                    imageData.src = totalImages[counter].src;
                    imageData.paidSrc = totalImages[counter].paidSrc;


                    db.collection("upload").add(imageData)
                        .then((docRef) => {
                            imageData.id = docRef.id

                            gallery.addToList(imageData);


                            console.log("Document written with ID: ", docRef.id);
                         
                            counter++;
                            uploadData(counter);


                        })
                        .catch((error) => {
                            console.error("Error adding document: ", error);
                        });

                }
            }, 2000);
        };

        uploadData(0);



    }


    handlePNG = async (list) => {

        var length = list.length;


        this.setState({ pngLoadingStatus: 0 });

        if (length > 5) {
            return M.toast({ html: `You can select only 5 at once`, classes: 'red' });
        }

        let oneFilePercentage = 100 / length;
        const options = {
            // quality: 0.92,
            // type: "image/jpeg",
            // width: 350,
            // size: 1000,
            // accuracy: 0.9,

            quality: 0.7,
            type: "image/jpeg",
            width: 250,
            size: 1000,
            accuracy: 0.5,
        }



        let start = async (counter) => {


            setTimeout(async () => {
                if (counter < 5) {

                    if (counter === list.length) {
                        this.setState({ completeStatus: `Uploading Completed` });
                    }



                    var imageFile = list[counter];
                    if (imageFile !== "undefined" && imageFile) {
                        this.setState({ completeStatus: `Compressing Images ${counter + 1}` });

                        var imageObj = {
                            fileWidth: "",
                            fileHeight: "",
                            src: "",
                            paidSrc: "",
                        }

                        var _URL = window.URL || window.webkitURL;
                        const i = new Image();
                        i.onload = () => {
                            let reader = new FileReader()
                            reader.readAsDataURL(imageFile)
                            imageObj.fileWidth = Math.round(i.width / 300);
                            imageObj.fileHeight = Math.round(i.height / 300);
                        };
                        i.src = _URL.createObjectURL(imageFile);



                        try {
                            const res = await imageConversion.compress(imageFile, options);

                            this.setState({ completeStatus: `Stroing Image ${counter + 1} into database` });

                            if (res) {

                                storageRef.child(`jpeg/${Math.random()}`).put(res).then((snapshot) => {


                                    snapshot.ref.getDownloadURL().then((downloadURL) => {


                                        this.setState({ completeStatus: `Storing Real Image ${counter + 1}` });

                                        // storing main file 
                                        let firebasePutString = storageRef.child(`png/${Math.random()}`).put(imageFile);

                                        firebasePutString.on(firebase.storage.TaskEvent.STATE_CHANGED,
                                            (snapshot) => {
                                                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                                this.setState({ completeStatus: `Processing ${Math.round(percentage)}` });
                                            },
                                            (e) => {
                                                console.log(e);
                                                M.toast({ html: `Error During Storing Real Image`, classes: 'red' });
                                            },
                                            () => {
                                                firebasePutString.snapshot.ref.getDownloadURL().then((pngURL) => {

                                                    this.setState({ completeStatus: `Successfully Stored ${counter + 1}` });

                                                    imageObj.src = downloadURL;
                                                    imageObj.paidSrc = pngURL;

                                                    var itration = counter + 1;
                                                    this.setState({
                                                        
                                                        pngLoadingStatus: oneFilePercentage * itration,

                                                        Images: [...this.state.Images, imageObj]
                                                    });


                                                    if (downloadURL) {
                                                        counter++;
                                                        start(counter);
                                                    }
                                                })
                                            });





                                    });
                                }).catch((e) => {
                                    console.log(e);
                                    M.toast({ html: `Error During Storing Compressed Image`, classes: 'red' });
                                });
                            }
                        } catch (err) {
                            console.log(err);
                            M.toast({ html: `Error During Compression Image`, classes: 'red' });
                        }

                    }

                }



            }, 3000)
        }

        start(0);


    }



  

    downloadImage = () => {
        // var url = this.state.fileURL;
        // var fileName = this.state.fileName;

        // var xhr = new XMLHttpRequest();//
        // xhr.open("GET", url, true);
        // xhr.responseType = "blob";//
        // xhr.onload = function () {//
        //     var urlCreator = window.URL || window.webkitURL;
        //     var imageUrl = urlCreator.createObjectURL(this.response);
        //     var tag = document.createElement('a');
        //     tag.href = imageUrl;
        //     tag.download = fileName;
        //     document.body.appendChild(tag);
        //     tag.click();
        //     document.body.removeChild(tag);
        // }
        // xhr.send();

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
                                                                <br />
                                                                <div>
                                                                    <label htmlFor="title">Enter Title</label>
                                                                    <input type="text" value={this.state.title || ''} style={{ background: "transparent" }} name="title" className="input-field col-12" placeholder="Enter Title" onChange={this.handleChange} id="title" />
                                                                </div>
                                                                <br />

                                                                <div className="input-field col-12">

                                                                    <select name="category" id="category" className="category" value={this.state.category || ''} style={{ background: "transparent" }} onChange={this.handleChange} >
                                                                        <option value="" disabled >Choose Your Option</option>
                                                                        <option value="ornamentsAndBaroque">Ornaments And Baroque</option>
                                                                        <option value="texture">Texture</option>
                                                                        <option value="pattren">Pattern</option>
                                                                        <option value="degitalTextileDesign">Degital Textile Design</option>
                                                                        <option value="botanicalFlowersAndLeaves">Botanical Flowers And Leaves</option>
                                                                    </select>
                                                                    <label htmlFor="category" >Select Category</label>
                                                                </div>
                                                                <br />
                                                                <div>
                                                                    <label htmlFor="price">Enter Price</label>
                                                                    <input type="text" name="price" value={this.state.price || ''} onChange={this.handleChange} className="input-field col-4" placeholder="Enter Price" style={{ background: "transparent" }} />
                                                                </div>
                                                                <br />
                                                                <div>
                                                                    <label htmlFor="keywords" >Keywords</label>
                                                                    <div className="chips chips-autocomplete" ></div>
                                                                </div>

                                                            </div>
                                                            <div className="col-md-6 p-t-50">

                                                                <ul className="collapsible">

                                                                    <li>
                                                                        <div className="collapsible-header"><i className="material-icons">image</i>Uploads</div>
                                                                        <div className="collapsible-body"><span>

                                                                            <input type="file" name="pngFile" id="pngFile" onChange={(event) => this.handlePNG(event.target.files)} multiple accept="image/png" /><br /><br />

                                                                            {this.state.pngLoadingStatus !== null ?
                                                                                <div>
                                                                                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", color: "#8e949a" }} >
                                                                                        <label>Uploading: {this.state.pngLoadingStatus}%</label>
                                                                                        {this.state.completeStatus}
                                                                                    </div>
                                                                                    <div className="progress">
                                                                                        <div className="determinate" style={{ width: `${this.state.pngLoadingStatus}%` }}></div>
                                                                                    </div>

                                                                                </div>
                                                                                :
                                                                                <div></div>}


                                                                        </span></div>
                                                                    </li>
                                                                </ul>


                                                            </div>
                                                            <br /><br />
                                                            <div className="divider" tabIndex="-1"></div>

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