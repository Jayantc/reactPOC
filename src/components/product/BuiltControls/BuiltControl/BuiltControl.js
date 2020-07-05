import React from 'react'
import classes from './BuiltControl.css'

const builtControl=(props)=>(
    <div className={classes.BuiltControl}>
        <div className={classes.Label}>{props.label}</div>
        <div>Price: {props.price}</div>
        <button className={classes.Less} onClick={props.removed} disabled={props.disabled}>REMOVE</button>
        <button className={classes.More} onClick={props.added} > ADD</button>
        <div>{props.count}</div>
    </div>
)

export default builtControl