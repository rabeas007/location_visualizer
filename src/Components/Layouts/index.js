import React,{Component} from 'react'
import DiscreteSlider from '../Slider/Slider'
import Map from '../Maps/Map'

export default class extends Component{
    constructor(props){
        super(props);
        this.state={
            data: props.data,
            Frame: props.data && props.data[props.millseconds] || [],
            hr: props.time,
            millseconds: props.millseconds
        }
    }
    componentWillReceiveProps(nextProps) {
        if(this.props !== nextProps) {
          this.setState({
            data: nextProps.data,
            Frame: nextProps.data && nextProps.data[nextProps.millseconds] || [],
            hr: nextProps.time,
            millseconds: nextProps.millseconds

          });
        }
      }

    handleSliderChange = (time) => {
        var obj = this.state.data;
        if (obj && Object.keys(obj).length>0){
            const newTime = this.state.millseconds + time.value;
            this.setState((state) => {
                return {
                    ...state.data,
                    Frame: obj[newTime],
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