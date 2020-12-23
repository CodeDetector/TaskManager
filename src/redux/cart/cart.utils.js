// import { collectionRef } from "../../components/firebase/firebase"

export const addtaskToDb=(prevCards,cardtoAdd)=>{
    return(
        [...prevCards,cardtoAdd]
    )
}

export const removetaskfromDb=(prevCards,cardtoRemoveId)=>{
    if(prevCards.find(card=>card.id===cardtoRemoveId)){
    return(
        prevCards.filter(card=>card.id!==cardtoRemoveId)
    )}
    // const collectionRef = firestore.doc(`user/${auth.currentUser.uid}`).collection("tasks");

}

