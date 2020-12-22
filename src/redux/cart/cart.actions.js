import {CardActionType} from './cart.types'

export const addtask=(item)=>({
        type:CardActionType.ADD_CARD,
        payload:item
})

export const removetask=(item)=>({
        type:CardActionType.REMOVE_CARD,
        payload:item
})

export const clearBoard=()=>({
    type:CardActionType.CLEAR_BOARD
})

export const createtask=(count)=>({
        type:CardActionType.CREATE_TASK
})

export const hidetask=()=>({
        type:CardActionType.HIDE_TASK
})