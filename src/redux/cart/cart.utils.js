// import { collectionRef } from "../../components/firebase/firebase"

import { auth, firestore } from "../../components/firebase/firebase"

export const addtaskToDb=(prevCards,cardtoAdd)=>{
    return(
        [...prevCards,cardtoAdd]
    )
}

export const removetaskfromDb=(prevCards,cardtoRemoveId)=>{
    // console.log("task id : ",cardtoRemoveId)
    firestore.doc(`users/${(auth.currentUser.uid)}`).collection("tasks").doc(`${cardtoRemoveId}`).delete().then(()=>console.log("Document deleted")).catch(()=>console.log("Error in deleteing "))
    if(prevCards.find(card=>card.id===cardtoRemoveId)){
    return(
        prevCards.filter(card=>card.id!==cardtoRemoveId)
    )}
}

