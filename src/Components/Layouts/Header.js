import React from 'react'
import Toolbox from '../Toolbox/Toolbox';
import './Header.scss';

export default props=>{
    return(
    <div className='header'>
        <div variant="h6">
          RTLS
        </div>
        <Toolbox handleOnSearch={props.handleOnSearch}/>
    </div>
    )
}