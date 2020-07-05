import React from 'react'
import productLogo from '../../assets/images/BlueConch.jpeg'
import classes from './Logo.css'

const logo=(props)=>(
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={productLogo} alt='Myproduct' />
    </div>
)

export default logo