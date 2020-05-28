
import React, {Component} from 'react';
import './Marker.css';
import {Avatar,Chip} from '@material-ui/core';


export default class extends Component{
  constructor(props){
      super(props)
      this.state={
        opened: false,
      }
      this.timeout = '';
      this.marker=React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.x !== prevProps.x || this.props.y !== prevProps.y) {
        // let counter = 0;
        // this.timeout = setTimeout(() => {
        //     counter ++;
        //     this.step(counter);
        //     if(counter > Math.abs(this.props.x - prevProps.x)) {
        //         clearTimeout(this.timeout)
        //     }
        // }, 20)
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
    let styleSheet = null;

    document.head.appendChild(styleElement);

    styleSheet = styleElement.sheet;

    styleSheet.insertRule(keyframesStyle, styleSheet.cssRules.length);
}
  showLabel=()=>{
    const { opened } = this.state;
		this.setState({
			opened: !opened,
		});
  }
  step = (counter) => {
    if(this.marker) {
        this.marker.style.transform = 'translate(' + counter + 'px, ' + counter + 'px)';
    }

};

  render(){
    const { color, name, id, x, y} = this.props;
    return (
      <div style={{left:x , bottom:y, position:"absolute", WebkitAnimation: `run-${this.props.id} 1s linear`}} ref={ref => this.marker = ref} id={id} onClick={this.showLabel}>
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
        {/* <span style={{fontSize:8}}>{id}</span> */}

      </div>
    )
  }
}

