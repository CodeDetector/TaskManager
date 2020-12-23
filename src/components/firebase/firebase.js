import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { connect } from 'react-redux';

var firebaseConfig = {
    apiKey:"AIzaSyAVasicwFmOusSYLOuqRcFX1AYV5SmshtA",
    authDomain: "taskmanager-52549.firebaseapp.com",
    projectId: "taskmanager-52549",
    storageBucket: "taskmanager-52549.appspot.com",
    messagingSenderId: "801532757927",
    appId: "1:801532757927:web:521e8cdb668883966dd882",
    measurementId: "G-PY3SK1CPEG"
  };

 const createUserProfileDocument=async (userAuth,otherAdditionalDetails)=>{
    if(!userAuth)
      return;
    const userRef=firestore.doc(`users/${userAuth.uid}`);
    const userSnapShot=userRef.get(); 
    console.log(userSnapShot);
    if(!userSnapShot.exists){
      const {displayName,email}=userAuth;
      const createdAt=new Date();
      try{
          userRef.set({
          displayName,
          email,
          createdAt,
          ...otherAdditionalDetails
        })
      }catch(error){
        console.log(error.message);
        }
      }
      return userRef;
  }
  export const addtaskstodb=async (task)=>{
    const collectionRef = firestore.doc(`users/${auth.currentUser.uid}`).collection("tasks"); 
    const newdoc = collectionRef.doc().set(task);
    collectionRef.get().then((querySnapshot)=>querySnapshot.forEach(documentQuery=>console.log(documentQuery.data())))
    // await console.log(collectionRef.get());
  }
  export const removetasksfromdb=(task)=>{
    const collectionRef = firestore.doc(`users/${auth.currentUser.uid}`).collection("tasks");
    collectionRef.get().then((querySnapshot)=>querySnapshot.forEach(documentQuery=>console.log(documentQuery.data())))
  }
 firebase.initializeApp(firebaseConfig);
  export const auth=firebase.auth();
  export const firestore=firebase.firestore();
  // export const collectionRef = firestore.doc(`users/${auth.currentUser.uid}`).collection("tasks"); 
  const provider=new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'})
  export const SignInwithGoogle=()=>auth.signInWithPopup(provider);

export default createUserProfileDocument;