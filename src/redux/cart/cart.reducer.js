import {CardActionType} from './cart.types';
import {addtaskToDb} from './cart.utils';
import {removetaskfromDb} from './cart.utils';

const initialState={
    tasks:[],
    hidden:true,
}

const cartReducer=(state=initialState,action)=>{
    
    switch(action.type)
    {
        case CardActionType.ADD_CARD:
                return{
                    ...state,
                        tasks:addtaskToDb(state.tasks,action.payload)
                    }
        case CardActionType.REMOVE_CARD:
                return{
                    ...state,
                    tasks:removetaskfromDb(state.tasks,action.payload)
                } 
        case CardActionType.CLEAR_BOARD:
                return{
                    tasks:[],
                    hidden:true
                }
        case CardActionType.CREATE_TASK:
            return({
                ...state,
                hidden:false
            })  
        case CardActionType.HIDE_TASK:
            return(
                {
                    ...state,
                    hidden:true
                }
            )  
        case CardActionType.GET_TASKS:
            return(
                {
                    ...state,
                    tasks:action.payload
                }
            )              
        default: 
                return{
                    ...state
                }                 
    }
}

export default cartReducer;