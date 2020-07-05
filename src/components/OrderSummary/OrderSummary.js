import React, {Component} from 'react'
import Auxillary from '../../hoc/Auxillary/Auxillary'
import Button from '../UI/Button/Button'




class OrderSummary extends Component{

    render(){
        const itemSummary= Object.keys(this.props.items)
        // eslint-disable-next-line
        .map(igkey =>{
            if(this.props.items[igkey]>0){
                return (<li key={igkey}>
                            <span style={{textTransform: 'capitalize'}}>{igkey}</span>: {this.props.items[igkey]}
                        </li>)
            }
    })

        return(
            <Auxillary>
                <h3>YOUR ORDER</h3>
                <p>Your Cart:</p>
                <ul>
                    {itemSummary}
                </ul>
                <p><strong>Total price: RS {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Auxillary>
        )
    }
}


 export default OrderSummary

