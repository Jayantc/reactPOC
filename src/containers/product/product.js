import React, {Component} from 'react'
import {connect} from 'react-redux'

import Auxillary from '../../hoc/Auxillary/Auxillary'
import BuiltControls from '../../components/product/BuiltControls/BuiltControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import * as productActions from '../../Store/actions/index'    
import axios from '../../axios-orders'
import * as actions from '../../Store/actions/index'

class product extends Component{

    state={
        purchasing: false
    }

    

    

    componentDidMount(){
        this.props.onInititems()
    }

    updatePurchaseState (items){
        const sum= Object.keys(items)
        .map(igkey =>{
            return items[igkey]
        })
        .reduce((sum, el)=>{
            return sum+el
        }, 0)
        return sum>0
    }

    purchaseHandler=()=>{
        if(this.props.isAuthenticated){
            this.setState({purchasing: true})
        }else{
            this.props.onSetAuthRedirectPath('/orders')
            this.props.history.push('/auth')
        }
    }
    
    purchaseCancelHandler=()=>{
        this.setState({purchasing: false})
    }

    purchaseContinueHandler=()=>{
        this.props.onInitPurchase()
        const order={
            items: this.props.ings,
            price: this.props.price,
            userId: this.props.userId
        }
        this.props.onOrderproduct(order, this.props.token)
        this.props.history.push('/orders')
    }
    

    render(){
        const disableInfo={
            ...this.props.ings
        }
        for(let key in disableInfo){
            disableInfo[key]=disableInfo[key]<=0
        }
        let orderSummary= null
        

        let product= this.props.error ? <p>items can't be loaded...</p> : <Spinner />
        
        if(this.props.ings){
            product= (
                <Auxillary>
                < BuiltControls 
                    itemAdded={this.props.onitemAdded}
                    itemRemoved={this.props.onitemRemoved}
                    disabled={disableInfo}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                    isAuth={this.props.isAuthenticated}
                    price={this.props.price}
                    
                    count={this.props.count}
                     />
                    
                </Auxillary>)

            orderSummary=
            <OrderSummary 
                items={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />
        }

        return(
            <Auxillary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                {product}
            </Auxillary>
        )
    }
}

const mapStateToProps= state=>{
    return{
        ings: state.product.items,
        price: state.product.totalPrice,
        count: state.product.itemCount,
        error: state.product.error,
        isAuthenticated: state.auth.token !== null,

        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const matchDispatchToProps= dispatch=>{
    return{
        onitemAdded: (ingName)=> dispatch(productActions.additem(ingName)),
        onitemRemoved: (ingName)=> dispatch(productActions.removeitem(ingName)),
        onInititems: ()=> dispatch(productActions.inititems()),
        onInitPurchase: ()=> dispatch(productActions.purchaseInit()),
        onSetAuthRedirectPath: (path)=> dispatch(actions.setAuthRedirectPath(path)),

        onOrderproduct: (orderData, token)=> dispatch(actions.purchaseproduct(orderData, token))
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(withErrorHandler(product, axios))