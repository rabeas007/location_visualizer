import React,{Component} from 'react'
import DiscreteSlider from '../Slider/Slider'
import Map from '../Maps/Map'

export default class extends Component{
    constructor(props){
        super(props);
        this.state={
            data: props.data,
            Frame: props.data && props.data[Object.keys(props.data)[0]] || [],
            hr: props.time,
        }
    }
    componentWillReceiveProps(nextProps) {
        if(this.props !== nextProps) {
          this.setState({
            data: nextProps.data,
            Frame: nextProps.data && nextProps.data[Object.keys(nextProps.data)[0]] || [],
            hr: nextProps.time,
          });
        }
      }

    handleSliderChange = (time) => {
        var obj = this.state.data;
        if (obj && Object.keys(obj).length>0){
            const floor=Object.keys(obj)[0].slice(-1);
            const generatedHour = this.state.hr+":"+ parseInt(time.value/60) + ':' + time.value % 60;
            const currentTime = new Date(`October 13, 2014 ${generatedHour}`);
            const key=currentTime.toLocaleTimeString(('it-IT'))+'_'+ floor
            this.setState((state) => {
                return {
                    ...state.data,
                    Frame: obj[key],
                    }
            });
        }
    }

    render(){
        const showFrame=this.state.Frame;
        const startingHour= this.state.hr;

        return(
            <div className='map-container'>
                <Map data={showFrame} />
                <DiscreteSlider onChange={this.handleSliderChange} time={startingHour} />
            </div>
        )
    }
}