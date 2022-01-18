import React, { useState } from 'react'
import './index.css';

export const Square = ({ value , handleClick , i}) => {

    
    return (
        <button 
            className="square"
            onClick={ () => handleClick(i)}
        >
          {value}
        </button>
    )
}
