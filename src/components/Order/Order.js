import React from 'react'
import classes from './Order.css'

const Order=(props)=>{
    const items= []

    for(let itemName in props.items){
        if(props.items[itemName]>0){
        items.push({
            name: itemName ,
            amount: props.items[itemName]
        }
        )
    }
    }

    const itemOutput= items.map((ig)=>{
        return <span 
            style={{textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
        }} 
            key={ig.name}>{ig.name} ({ig.amount})</span>
    })

    return(
        <div className={classes.Order}>
            <p>Products: {itemOutput}</p>
            <p>price: <strong>RS {Number.parseFloat(props.price).toFixed(2)}</strong></p>
            <p>Order Time: {new Date().toLocaleString()}</p>
        </div>
    )
}

export default Order