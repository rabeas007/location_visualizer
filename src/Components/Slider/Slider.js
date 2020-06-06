import React,{Component} from 'react';
import {Slider,Button} from '@material-ui/core';
import * as moment from 'moment';
import './Slider.scss';


export default class extends Component{
    constructor(){
        super()
        this.state={
            sliderValue:0,
            disabled:false,
        }
        this.Timer = null;
    }
    generateMarks= (hr) => {
      const marks = [];
      for (var i = 0; i < 60; i+=5) {
        var t=moment(hr + ':' + i +':00',"HH:mm:ss").format("HH:mm:ss")
        marks.push({value: i*60 ,label: `${t}`})}
      return marks
    }
    handleOnchange=(event,value)=>{
      this.setState(() => {
        return {
           ...this.state,
           sliderValue: value,
            
            }
          }
      )
      this.props.onChange({value})
    }
    componentDidUpdate(prevProps, prevState) {
      if (this.props.time !== prevProps.time) {
          this.setState({sliderValue: 0, disabled:false});
      }
    } 
    setNextFrame = () => {
         let val = this.state.sliderValue; 
         let e=""
         if(val < 3599){
            val += 1;
            this.handleOnchange(e, val);
          }
          else this.handleOnPause()
   }

    handleOnPlay=()=>{
      this.setState({
        ...this.state,
        disabled:true,
      })
      this.Timer = setInterval(this.setNextFrame, 1000);
    }

    handleOnPause=()=>{
      this.setState({
        ...this.state,
        disabled:false,
      })
      clearInterval(this.Timer);
    }

    render(){
      // const classes = this.useStyles();
        let showTime=moment(this.props.time + ':' +this.state.sliderValue/60 + ':' + this.state.sliderValue % 60,"HH:mm:ss").format("HH:mm:ss")
        return (
            <div className='slider'>
                <div>Time: {showTime}</div>
                <Slider
                    value={this.state.sliderValue}
                    defaultValue={0}
                    getAriaValueText={(value) => value}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    max={3599}
                    onChange={this.handleOnchange}
                    marks={this.generateMarks(this.props.time)}
                  />
                <Button variant="contained" color="primary" onClick={this.handleOnPlay} disabled={this.state.disabled}>
                Play
                </Button>
                <Button variant="contained" color="secondary" onClick={this.handleOnPause}>
                Stop
                </Button>
            </div>
      );
    }
}