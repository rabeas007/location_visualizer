import React, { Component } from 'react'
import './Map.css';
import Marker from '../Markers/Marker'
import { ReactComponent as Mapimg } from './6thFloorMap15.svg'

export default class extends Component{
    constructor(props){
        super(props);
        this.state={
            marks:''
        }
    }

    render(){
        
        return(
            <>
                <Mapimg />
                {this.props && this.props.data && this.props.data.length && this.props.data.map(obj=> <Marker key={obj.id_number} color='blue' x={obj.x*100+'%'} y={obj.y*100+'%'} name={obj.room_num+" "} id={obj.id_number + ''} />)}
            </>
        )
    }
}