import React, {Component} from 'react';
import './Marker.css';
import {Avatar,Chip} from '@material-ui/core';


export default class extends Component{
    constructor(props){
        super(props);
        this.state={
            opened: false,
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.x !== prevProps.x || this.props.y !== prevProps.y) {

            this.handleAnimation(prevProps.x, prevProps.y, this.props.x, this.props.y)

        }
    } 
    handleAnimation = (prevLeft, prevBottom, left, bottom) => {
        const keyframesStyle = `
        @-webkit-keyframes run-${this.props.id} {
          0%   { left: ${prevLeft}; bottom: ${prevBottom}; }
          100% { left: ${left}; bottom: ${bottom}; }
        }`;
        const styleElement = document.createElement('style');
        document.head.appendChild(styleElement);
        const styleSheet = styleElement.sheet;
        styleSheet.insertRule(keyframesStyle, styleSheet.cssRules.length);
    };

    getPosition = (receiver) => {
        const roomElement = document.querySelector(`[data-name*="${receiver}"]`);
        let x = 0, y =0 ;
        if (roomElement) {
            const rect = roomElement.getBoundingClientRect();
            x = Math.random() * (rect.right - rect.left) + rect.left + 10;
            y = Math.random() * (rect.bottom - rect.top) + rect.top -10;
        }
        return {x, y}
    };
    render(){
        const { color, name, id, x, y} = this.props;
        //this is a fake number to test please change it by receiver number
          //receiver number should be aligned with the data-name of g element
        const position = this.getPosition('6095')
        return (
            <div style={{left: position.x , top: position.y, position:"absolute", WebkitAnimation: `run-${this.props.id} 1s linear`}} ref={ref => this.marker = ref} id={id} onClick={this.showLabel}>
                {this.state.opened && <Chip
                    avatar={<Avatar>M</Avatar>}
                    variant="outlined"
                    size="small"
                    color='primary'
                    label={id}
                    onClick={()=>console.log('Hi') }
                    style={{ transform: 'translate(-55%, -26%)'}}
                  />}
                <div
                  className="pin bounce"
                  style={{ backgroundColor: color, cursor: 'pointer'}}
                  title={name + ' '+id}
                  />
                <div className="pulse" />
            </div>)
    }
}

