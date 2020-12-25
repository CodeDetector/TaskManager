// import { collectionRef } from "../../components/firebase/firebase"

import { auth, firestore } from "../../components/firebase/firebase"

export const addtaskToDb=(prevCards,cardtoAdd)=>{
    return(
        [...prevCards,cardtoAdd]
    )
}

export const removetaskfromDb=(prevCards,cardtoRemoveId)=>{
    console.log("task id : ",cardtoRemoveId)
    firestore.doc(`users/${(auth.currentUser.uid)}`).collection("tasks").doc(cardtoRemoveId).delete().then((res)=>console.log(res)).catch(()=>console.log("Error in deleting "))
    firestore.collection("users").doc(auth.currentUser.uid).collection("tasks").doc(cardtoRemoveId).get().then(snapshot=>{
        console.log(snapshot);
    })
    if(prevCards.find(card=>card.id===cardtoRemoveId)){
        const newcards = prevCards.filter(card=>card.id!==cardtoRemoveId)
        return newcards
    }
}

