import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseproductSuccess= (id, orderData) => {
    return{
        type: actionTypes.PURCHASE_product_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseproductFail= (error) => {
    return{
        type: actionTypes.PURCHASE_product_FAIL,
        error: error
    }
}

export const purchaseproductStart= ()=>{
    return{
        type: actionTypes.PURCHASE_product_START
    }
}

export const purchaseproduct= (orderData, token) => {
    return dispatch=>{
        dispatch(purchaseproductStart())
        axios.post('/orders.json?auth='+ token, orderData)                   
        .then((response)=> {
            dispatch(purchaseproductSuccess(response.data.name, orderData))
        })
        .catch((error)=>{
            dispatch(purchaseproductFail(error))
        })
    }
}

export const purchaseInit= ()=>{
    return{
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess=(orders)=>{
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail=(error)=>{
    return{
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart= ()=>{
    return{
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders= (token, userId) => {
        return (dispatch)=>{
            dispatch(fetchOrdersStart())
            const querryParams= '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"'
            axios.get('/orders.json' + querryParams)
            .then((res)=>{
            
            const fetchOrders=[]
            for(let key in res.data){
                fetchOrders.push({
                    ...res.data[key],
                    id:key
                })
            }
            dispatch(fetchOrdersSuccess(fetchOrders))
        }).catch((error)=>{
            dispatch(fetchOrdersFail(error))
        })
        }
}