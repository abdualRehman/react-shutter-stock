import React, { Component, createContext } from 'react';
import { db } from '../config/firebase';



export const GalleryContext = createContext();


export default class GalleryContextProvider extends Component {
    state = {
        photos: [],
    }

    componentDidMount = () => {

        db.collection("uploads").get().then((querySnapshot) => {

            let photos = []
            querySnapshot.forEach((doc) => {
                let photo = doc.data()
                photo.id = doc.id
                // console.log(photo)
                // console.log(`${doc.id} => ${doc.data()}`);
                photos.push(photo)
            });

            this.setState({ photos: photos });
        });

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

        var docRef = db.collection("uploads").doc(photo.id);

        var sucess = false;
        // Set the "capital" field of the city 'DC'
        return docRef.update(photo)
            .then(() => {
                console.log("Document successfully updated!");

                let newPhotos = this.state.photos.map(( p , i) => {
                    if ( photo.id === p.id)

                        p.title = photo.title
                        p.description = photo.description
                        p.price = photo.price
                        p.price_status = photo.price_status
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
        return photos.filter(function(photo) {
            return photo.title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        })
    }

    searchByCategory = (categoryName) => {
        var photos = this.state.photos;

        return photos.filter(function(photo) {
            return photo.category.toLowerCase().indexOf(categoryName.toLowerCase()) !== -1
        })
    }

    searchByCategoryAndKeyword = (keyword , category) => {
        var sortByCategory;
        if(category !== "all"){
            sortByCategory = this.searchByCategory(category);
        }else{
            sortByCategory = this.state.photos
        }

        var sortByTitle =  sortByCategory.filter((item)=>{
           return  item.title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        });

        return sortByTitle;

    }

    render() {
        return (
            <GalleryContext.Provider value={{ ...this.state, addToList: this.addToList, findById: this.findById, UpdatePhotoData: this.UpdatePhotoData, deletePhoto: this.deletePhoto , searchByTitle : this.searchByTitle , searchByCategory: this.searchByCategory , searchByCategoryAndKeyword: this.searchByCategoryAndKeyword }} >
                {this.props.children}
            </GalleryContext.Provider>
        )
    }
}