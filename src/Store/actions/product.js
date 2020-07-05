import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'


export const additem= (name) => {
    return{
        type: actionTypes.ADD_item,
        itemName: name
    }
}

export const removeitem= (name) => {
    return{
        type: actionTypes.REMOVE_item,
        itemName: name
    }
}

export const setitems= (items) => {
    return{
        type: actionTypes.SET_items,
        items: items
    }
}

export const fetchitemsFailed=()=>{
    return{
        type: actionTypes.FETCH_items_FAILED
    }
}

export const inititems= () => {
    return dispatch=> {
        axios.get('https://react-burger-jayant.firebaseio.com/ingradients.json')     
        .then(response =>{
            dispatch(setitems(response.data))
        })
        .catch(error =>{
            dispatch(fetchitemsFailed())
        })
    }
}