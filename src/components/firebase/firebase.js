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

 const createUserProfileDocument=async (userAuth,otherAdditionalDetails,tasks)=>{
    if(!userAuth){
      console.log("No user");
      return};
      console.log("User is present")
    const userRef=firestore.doc(`users/${userAuth.uid}`);
    console.log(userRef);
    const userSnapShot=await userRef.get(); 
    console.log(userSnapShot);
    if(!userSnapShot.exists){
      const {displayName,email}=userAuth;
      const createdAt=new Date();
      try{
        await userRef.set({
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
  const mapstatetoprops=(state)=>{
    return({
      tasks:state.cart.tasks
    })
  }
 
 firebase.initializeApp(firebaseConfig);
  export const auth=firebase.auth();
  export const firestore=firebase.firestore();
  const provider=new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'})
  export const SignInwithGoogle=()=>auth.signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // console.log(token);
    // The signed-in user info.
    var user = result.user;
    // console.log(user);
    // ...
  }).catch(function(error) {
    console.log(error);
  });
connect(mapstatetoprops)(createUserProfileDocument);
export default createUserProfileDocument;