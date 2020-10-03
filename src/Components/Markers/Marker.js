import React, {Component} from 'react';
import './Marker.css';
import {Avatar,Chip} from '@material-ui/core';


export default class extends Component{
    constructor(props){
        super(props);
        this.state={
            opened: false,
        }
        this.timeout = '';
        this.marker=React.createRef();
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

    showLabel=()=>{
        const { opened } = this.state;
        this.setState({
            opened: !opened,
        });
    }
    checkDistance = (receiver) => {
        const roomElement = document.querySelector(`[data-name*="${receiver}"]`);

        // if (roomElement) {
        //     setInterval(function(){roomElement.classList.toggle("backgroundRed")},1500);
        // }
    };
    render(){
        const { color, name, id, x, y, receiver_desc,receiver_id, badge } = this.props;
        this.checkDistance(receiver_id)
        return (
            <div style={{left: x , top: y, position:"absolute", WebkitAnimation: `run-${this.props.id} 1s linear`}} ref={ref => this.marker = ref} id={id} onClick={this.showLabel}>
                {this.state.opened && <Chip
                    avatar={<Avatar style={{backgroundColor:color, }}>{badge}</Avatar>}
                    variant="outlined"
                    size="small"
                    color='primary'
                    label={id}
                    style={{
                        top: -18, left: 0, position: "absolute",
                        borderColor:color,
                        color:color,
                        transform: 'translate(-55%, -26%)'
                    }}
                    onClick={()=>console.log('Hi') }
                  />}
                <div
                  className="pin bounce"
                  style={{ backgroundColor: color, cursor: 'pointer'}}
                  title={receiver_desc + ' '+id}
                  />
                <div className="pulse" />
            </div>)
    }
}

