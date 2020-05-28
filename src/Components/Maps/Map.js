import React, { Component } from 'react'
import './Map.css';
import Marker from '../Markers/Marker'
import { ReactComponent as Mapimg } from './6thFloorMap.svg'
import {ReactSVGPanZoom} from 'react-svg-pan-zoom'
import {ReactSvgPanZoomLoader} from 'react-svg-pan-zoom-loader'

export default class extends Component{
    constructor(props){
        super(props);
        this.state={
            marks:''
        }
    }

    render(){
        
        return(
            <div class="image">
                {/* <ReactSvgPanZoomLoader src='./6thFloorPic.svg' render= {(content) => (
        
                <ReactSVGPanZoom width={1437} height={590}
                    onClick={event => console.log(event.x, event.y, event.originalEvent)}>
                        {content} */}
                        <Mapimg />
                        {/* <img src={'./6thFloorOp_V1.svg'} /> */}
                        
                 {/* </ReactSVGPanZoom> 
                     )}/>*/}
                     {(this.props) && (this.props.data) && this.props.data.map(obj=> <Marker key={obj.id_number} color='blue' x={obj.x*100+'%'} y={obj.y*100+'%'} name={obj.room_num+" "} id={obj.id_number + ''} />)
                }

            </div>
        )
    }
}