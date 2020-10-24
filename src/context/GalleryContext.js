import React, { Component, createContext } from 'react';
import { db } from '../config/firebase';



export const GalleryContext = createContext();


export default class GalleryContextProvider extends Component {
    state = {

        photos: [],
        // photos: [
        //     {
        //         category: "ornamentsAndBaroque",
        //         description: "",
        //         epsName: "0 (9) copy.EPS",
        //         epsURL: "https://firebasestorage.googleapis.com/v0/b/shutterstock-d60e1.appspot.com/o/EPSFiles%2F0%20(9)%20copy.EPS?alt=media&token=a9eb85a2-8b43-46e0-a691-8dae5cefd221",
        //         height: 3,
        //         id: "0GcgqYh4R5orTwFzFuly",
        //         keywords: [
        //             { tag: "Ornament" },
        //             { tag: "pattern" },
        //             { tag: "texture" },
        //             { tag: "motif" },
        //             { tag: "textile" },
        //             { tag: "design" },
        //             { tag: "Baroque" }
        //         ],
        //         price: "2",
        //         price_status: true,
        //         src: "https://firebasestorage.googleapis.com/v0/b/shutterstock-d60e1.appspot.com/o/images%2F0%20(9)%20copy.JPG?alt=media&token=8cc8e685-ac49-4bcb-81d5-9ed85dce95ad",
        //         title: "digital textile design ornament and texture",
        //         user_id: "tHFdp7E2fPdOmSOtlw22X9qsP0l2",
        //         width: 2,
        //     },
        //     {
        //         category: "ornamentsAndBaroque",
        //         description: null,
        //         epsName: "pattern (29) copy.eps",
        //         epsURL: "https://firebasestorage.googleapis.com/v0/b/shutterstock-d60e1.appspot.com/o/EPSFiles%2Fpattern%20(29)%20copy.eps?alt=media&token=94fff854-998a-40e2-b141-eb71e6d00f22",
        //         height: 10,
        //         id: "0RsCIPuWL024WCiwyhsb",
        //         keywords: [
        //             { tag: "Ornament" },
        //             { tag: "pattern" },
        //             { tag: "texture" },
        //             { tag: "motif" },
        //             { tag: "textile" },
        //             { tag: "design" },
        //             { tag: "Baroque" },
        //         ],
        //         price: "2",
        //         price_status: true,
        //         src: "https://firebasestorage.googleapis.com/v0/b/shutterstock-d60e1.appspot.com/o/images%2Fpattern%20(29)%20copy.jpg?alt=media&token=4d769f45-0b50-4d28-a6b6-4b52279b8c23",
        //         title: "digital textile design ornament and texture",
        //         user_id: "tHFdp7E2fPdOmSOtlw22X9qsP0l2",
        //         width: 4,
        //     },
        //     {
        //         category: "ornamentsAndBaroque",
        //         description: "",
        //         epsName: "0 (9) copy.EPS",
        //         epsURL: "https://firebasestorage.googleapis.com/v0/b/shutterstock-d60e1.appspot.com/o/EPSFiles%2F0%20(9)%20copy.EPS?alt=media&token=a9eb85a2-8b43-46e0-a691-8dae5cefd221",
        //         height: 3,
        //         id: "0GcgqYh4R5orTwFzFuly",
        //         keywords: [
        //             { tag: "Ornament" },
        //             { tag: "pattern" },
        //             { tag: "texture" },
        //             { tag: "motif" },
        //             { tag: "textile" },
        //             { tag: "design" },
        //             { tag: "Baroque" }
        //         ],
        //         price: "2",
        //         price_status: true,
        //         src: "https://firebasestorage.googleapis.com/v0/b/shutterstock-d60e1.appspot.com/o/images%2F0%20(9)%20copy.JPG?alt=media&token=8cc8e685-ac49-4bcb-81d5-9ed85dce95ad",
        //         title: "digital textile design ornament and texture",
        //         user_id: "tHFdp7E2fPdOmSOtlw22X9qsP0l2",
        //         width: 2,
        //     },
        //     {
        //         category: "ornamentsAndBaroque",
        //         description: null,
        //         epsName: "pattern (29) copy.eps",
        //         epsURL: "https://firebasestorage.googleapis.com/v0/b/shutterstock-d60e1.appspot.com/o/EPSFiles%2Fpattern%20(29)%20copy.eps?alt=media&token=94fff854-998a-40e2-b141-eb71e6d00f22",
        //         height: 10,
        //         id: "0RsCIPuWL024WCiwyhsb",
        //         keywords: [
        //             { tag: "Ornament" },
        //             { tag: "pattern" },
        //             { tag: "texture" },
        //             { tag: "motif" },
        //             { tag: "textile" },
        //             { tag: "design" },
        //             { tag: "Baroque" },
        //         ],
        //         price: "2",
        //         price_status: true,
        //         src: "https://firebasestorage.googleapis.com/v0/b/shutterstock-d60e1.appspot.com/o/images%2Fpattern%20(29)%20copy.jpg?alt=media&token=4d769f45-0b50-4d28-a6b6-4b52279b8c23",
        //         title: "digital textile design ornament and texture",
        //         user_id: "tHFdp7E2fPdOmSOtlw22X9qsP0l2",
        //         width: 4,
        //     },
        //     {
        //         category: "ornamentsAndBaroque",
        //         description: "",
        //         epsName: "0 (9) copy.EPS",
        //         epsURL: "https://firebasestorage.googleapis.com/v0/b/shutterstock-d60e1.appspot.com/o/EPSFiles%2F0%20(9)%20copy.EPS?alt=media&token=a9eb85a2-8b43-46e0-a691-8dae5cefd221",
        //         height: 3,
        //         id: "0GcgqYh4R5orTwFzFuly",
        //         keywords: [
        //             { tag: "Ornament Black" },
        //             { tag: "pattern" },
        //             { tag: "texture" },
        //             { tag: "motifPink" },
        //             { tag: "textile" },
        //             { tag: "design" },
        //             { tag: "Baroque" }
        //         ],
        //         price: "2",
        //         price_status: true,
        //         src: "https://firebasestorage.googleapis.com/v0/b/shutterstock-d60e1.appspot.com/o/images%2F0%20(9)%20copy.JPG?alt=media&token=8cc8e685-ac49-4bcb-81d5-9ed85dce95ad",
        //         title: "digital textile design ornament and texture",
        //         user_id: "tHFdp7E2fPdOmSOtlw22X9qsP0l2",
        //         width: 2,
        //     },
        //     {
        //         category: "ornamentsAndBaroque",
        //         description: null,
        //         epsName: "pattern (29) copy.eps",
        //         epsURL: "https://firebasestorage.googleapis.com/v0/b/shutterstock-d60e1.appspot.com/o/EPSFiles%2Fpattern%20(29)%20copy.eps?alt=media&token=94fff854-998a-40e2-b141-eb71e6d00f22",
        //         height: 10,
        //         id: "0RsCIPuWL024WCiwyhsb",
        //         keywords: [
        //             { tag: "Brown Ornament" },
        //             { tag: "pattern" },
        //             { tag: "texture" },
        //             { tag: "Bluemotif" },
        //             { tag: "textile" },
        //             { tag: "design" },
        //             { tag: "Baroque" },
        //         ],
        //         price: "2",
        //         price_status: true,
        //         src: "https://firebasestorage.googleapis.com/v0/b/shutterstock-d60e1.appspot.com/o/images%2Fpattern%20(29)%20copy.jpg?alt=media&token=4d769f45-0b50-4d28-a6b6-4b52279b8c23",
        //         title: "digital textile design ornament and texture",
        //         user_id: "tHFdp7E2fPdOmSOtlw22X9qsP0l2",
        //         width: 4,
        //     },
        //     {
        //         category: "ornamentsAndBaroque",
        //         description: null,
        //         epsName: "m (38).EPS",
        //         epsURL: "https://firebasestorage.googleapis.com/v0/b/shutterstock-d60e1.appspot.com/o/EPSFiles%2Fm%20(38).EPS?alt=media&token=a0bd1810-b2cb-4355-a3cf-df1d7c9a5715",
        //         height: 15,
        //         id: "Lujhf2fp01Q20cJI53IQ",
        //         keywords: [
        //             { tag: "pattern" },
        //             { tag: "Texture" },
        //             { tag: "design" },
        //             { tag: "textile design" },
        //             { tag: "motif black" },
        //             { tag: "ornament Sheet" },
        //             { tag: "ornament" },
        //             { tag: "baroque" }
        //         ],
        //         price: "2",
        //         price_status: true,
        //         src: "https://firebasestorage.googleapis.com/v0/b/shutterstock-d60e1.appspot.com/o/images%2Fm%20(38)%20copy.JPG?alt=media&token=091c98b2-4a14-421c-acb2-9b46636f893d",
        //         title: "digital textile design ornament and texture",
        //         user_id: "tHFdp7E2fPdOmSOtlw22X9qsP0l2",
        //         width: 11,
        //     },
        //     {
        //         category: "texture",
        //         description: null,
        //         epsName: "0 (120) copy.EPS",
        //         epsURL: "https://firebasestorage.googleapis.com/v0/b/shutterstock-d60e1.appspot.com/o/EPSFiles%2F0%20(120)%20copy.EPS?alt=media&token=402f1827-76a0-4025-8210-4b3f2169be5a",
        //         height: 8,
        //         id: "KuHB0Zg2ABvuRj5Lohs5",
        //         keywords: [
        //             { tag: "pattern" },
        //             { tag: "flowers" },
        //             { tag: "Texture" },
        //             { tag: "blue motif" },
        //             { tag: "leaves" },
        //             { tag: "Textile Designs" },
        //             { tag: "ornament motive" },
        //             { tag: "Baroque" },
        //         ],
        //         price: "2",
        //         price_status: true,
        //         src: "https://firebasestorage.googleapis.com/v0/b/shutterstock-d60e1.appspot.com/o/images%2F0%20(120)%20copy.JPG?alt=media&token=84306507-6303-4efb-8381-4ec7b54cec63",
        //         title: "digital textile design ornamet and flowers motif",
        //         user_id: "tHFdp7E2fPdOmSOtlw22X9qsP0l2",
        //         width: 7,
        //     },
        //     {
        //         category: "ornamentsAndBaroque",
        //         description: null,
        //         epsName: "P (59).eps",
        //         epsURL: "https://firebasestorage.googleapis.com/v0/b/shutterstock-d60e1.appspot.com/o/EPSFiles%2FP%20(59).eps?alt=media&token=666e665c-9302-44ca-8783-7846a11827d4",
        //         height: 25,
        //         id: "Sl6omzqFjXsdmlmqqpfU",
        //         keywords: [
        //             { tag: "baroque" },
        //             { tag: "motif brown" },
        //             { tag: "ornament baroque" },
        //             { tag: "ornament" },
        //             { tag: "pattern" },
        //             { tag: "texture" },
        //             { tag: "textile" },
        //             { tag: "design" },
        //         ],
        //         price: "2",
        //         price_status: true,
        //         src: "https://firebasestorage.googleapis.com/v0/b/shutterstock-d60e1.appspot.com/o/images%2FP%20(59)%20copy.jpg?alt=media&token=0c94aca5-663c-498e-a671-e73f97e2349c",
        //         title: "digital textile design ornament and texture",
        //         user_id: "tHFdp7E2fPdOmSOtlw22X9qsP0l2",
        //         width: 19,
        //     }
        // ],
        loading: false,
        more: true,
        data: [],
        after: 0,
        perPage: 8,
    }


    componentDidMount = () => {
        db.collection("upload").get().then((querySnapshot) => {
            let photos = []
            querySnapshot.forEach((doc) => {
                let photo = doc.data()
                photo.id = doc.id
                // console.log(photo)
                // console.log(`${doc.id} => ${doc.data()}`);
                photos.push(photo);
            });
            this.setState({ photos: photos });
        });

    }

    getAllData = () => {
        return this.state.photos;
    }


    dispatch = (action) => {
        switch (action.type) {
            case "start":
                this.setState({ loading: true });
                break;
            case "loaded":
                this.setState({
                    loading: false,
                    data: [...this.state.data, ...action.newData],
                    more: action.newData.length === this.state.perPage,
                    after: this.state.after + action.newData.length

                })
                break;
            default:
                throw new Error("Don't understand action")
        }


    }

    load = (photos) => {
       
        const { after, perPage } = this.state;
        this.dispatch({ type: "start" });

        setTimeout(() => {
            const newData = photos.slice(after, after + perPage);
            this.dispatch({ type: "loaded", newData });
        }, 3000);
    }




  

    addToList = (photo) => {
        let newPhotos = [...this.state.photos, photo]
        this.setState({ photos: newPhotos });
    }

    findById = (photoId) => {
        let photos = this.state.photos;
        var PhotoDetails = photos.find((list) => {
            return list.id === photoId;
        });

        return PhotoDetails;
    }

    UpdatePhotoData = (photo) => {

        var docRef = db.collection("upload").doc(photo.id);

        var sucess = false;
        // Set the "capital" field of the city 'DC'
        return docRef.update(photo)
            .then(() => {
                console.log("Document successfully updated!");

                let newPhotos = this.state.photos.map((p, i) => {
                    if (photo.id === p.id)

                        p.title = photo.title
                        p.price = photo.price

                    return p
                })

                this.setState({ photos: newPhotos });
                sucess = true
                return sucess;
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                return sucess;
            });

    }

    deletePhoto = (id) => {

        db.collection("uploads").doc(id).delete()
            .then(() => {

                let newPhotos = this.state.photos.filter((p, i) => {
                    return p.id !== id
                })

                this.setState({ photos: newPhotos })

            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
    }

    searchByTitle = (keyword) => {
        var photos = this.state.photos;
        return photos.filter(function (photo) {
            return photo.title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        })
        // return photos.filter(function(photo) {
        //    return photo.keyword.filter((photoTag)=>{
        //         return photoTag.toLowerCase.indexOf(keyword.toLowerCase()) !== -1
        //     });
        // })
    }

    searchByCategory = (categoryName) => {
        var photos = this.state.photos;
        return photos.filter(function (photo) {
            return photo.category.toLowerCase().indexOf(categoryName.toLowerCase()) !== -1
        })
    }

    searchByCategoryAndKeyword = (keyword, category) => {
        var sortByCategory;
        var resultData = [];
        if (category !== "all") {
            sortByCategory = this.searchByCategory(category);
        } else {
            sortByCategory = this.state.photos
        }

        if (sortByCategory.length > 0) {

            for (var i = 0; i < sortByCategory.length; i++) {
                sortByCategory[i].keywords.filter((photoTag) => {
                    if (photoTag.tag.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
                        resultData.push(sortByCategory[i]);
                    }
                });
            }
        }

        return resultData;

    }


    SearchSimilarTags = (keyword) => {

        keyword = keyword.toString().toLowerCase();
        keyword = keyword.slice(0, -1)

        var photos = this.state.photos;
        var tags = [];

        var newData = [];


        if (photos.length > 0 && keyword) {
            for (var i = 0; i < photos.length; i++) {


                for (var k = 0; k < photos[i].keywords.length; k++) {

                    if (photos[i].keywords[k].tag.toString().toLowerCase().indexOf(keyword) !== -1) {

                        var searchTag = photos[i].keywords[k].tag;
                        var obj = {
                            src: photos[i].src,
                            tag: photos[i].keywords[k].tag
                        }

                        if (tags.length > 0) {

                            if (tags.indexOf(searchTag) === -1) {
                                tags.push(searchTag);
                                newData.push(obj);
                            }

                        } else {
                            tags.push(searchTag);
                            newData.push(obj);
                        }
                    }
                }

            }

        } else {
            return [];
        }

        return newData;


    };

    SearchSimilarImages = (keywordArray) => {
        var photos = this.state.photos;

        var resultData = [];



        if (photos.length > 0 && keywordArray) {
            for (var i = 0; i < photos.length; i++) {
                photos[i].keywords.filter((photoTag) => {
                    for (var j = 0; j < keywordArray.length; j++) {
                        if (photoTag.tag.toLowerCase().indexOf(keywordArray[j].tag.toLowerCase()) !== -1) {
                            resultData.push(photos[i]);
                            i++;
                            // break;

                        }
                        break;
                    }
                });
                // i++;
            }
        } else {
            return [];
        }

        return resultData;
    }

    render() {
        return (
            <GalleryContext.Provider value={{ 
                ...this.state, 
                addToList: this.addToList, 
                findById: this.findById, 
                UpdatePhotoData: this.UpdatePhotoData, 
                deletePhoto: this.deletePhoto, 
                searchByTitle: this.searchByTitle, 
                searchByCategory: this.searchByCategory, 
                searchByCategoryAndKeyword: this.searchByCategoryAndKeyword, 
                SearchSimilarImages: this.SearchSimilarImages, 
                load: this.load, 
                SearchSimilarTags:this.SearchSimilarTags,
                getAllData: this.getAllData
                }} >
                {this.props.children}
            </GalleryContext.Provider>
        )
    }
}