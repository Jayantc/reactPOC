import React from 'react'
import classes from './BuiltControls.css'
import BuiltControl from './BuiltControl/BuiltControl'

const controls=[
    {label: 'Apple', type: 'apple', price: 20},
    {label: 'Banana', type: 'banana', price: 10},
    {label: 'Beetroot', type: 'beetroot', price: 18},
    {label: 'Carrot', type: 'carrot', price: 8},
    {label: 'Coconut', type: 'coconut', price: 50},
    {label: 'Cucumber', type: 'cucumber', price: 5},
    {label: 'Grapes', type: 'grapes', price: 40},
    {label: 'Guava', type: 'guava', price: 15},
    {label: 'Jackfruit', type: 'jackfruit', price: 100},
    {label: 'Kiwi', type: 'kiwi', price: 25},
    {label: 'Lemon', type: 'lemon', price: 3},
    {label: 'Mango', type: 'mango', price: 30},
    {label: 'Orange', type: 'orange', price: 18},
    {label: 'Papaya', type: 'papaya', price: 40},
    {label: 'Peach', type: 'peach', price: 12},
    {label: 'Pineapple', type: 'pineapple', price: 40},
    {label: 'Radish', type: 'radish', price: 12},
    {label: 'Sapota', type: 'sapota', price: 8},
    {label: 'Strawberry', type: 'strawberry', price: 8},
    {label: 'Watermelon', type: 'watermelon', price: 60} 
]

   

const builtControls=(props)=>(

    


    <div className={classes.BuiltControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl =>(
            <BuiltControl  
            key={ctrl.label} 
            label={ctrl.label}
            price={ctrl.price}
            added={()=>props.itemAdded(ctrl.type)}
            removed={()=> props.itemRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
            count={props.count}
            />
        ))}
        <button className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>
)

export default builtControls