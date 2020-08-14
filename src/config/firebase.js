import * as firebase from "firebase/app";


// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBiIXIqCNm2goD8s6PeGzyCCMlFZ2AG87s",
    authDomain: "shutterstock-d60e1.firebaseapp.com",
    databaseURL: "https://shutterstock-d60e1.firebaseio.com",
    projectId: "shutterstock-d60e1",
    storageBucket: "shutterstock-d60e1.appspot.com",
    messagingSenderId: "751487563290",
    appId: "1:751487563290:web:0fa43721dee2d3284e03a3"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// admin.initializeApp(firebaseConfig);


var db = firebase.firestore();

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();


// Create a storage reference from our storage service
var storageRef = storage.ref();

export {db, storage, storageRef}



export default firebase;
// export const  admin;