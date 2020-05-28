import React,{Component} from 'react'
import {Grid, Paper} from '@material-ui/core';
import Toolbox from '../Toolbox/Toolbox'
import DiscreteSlider from '../Slider/Slider'
import Map from '../Maps/Map'
import {data} from '../Store'

const styles={
    Paper : {padding: 2, marginTop:10, marginBottom:10, height:500, overflowY:'auto'}
}
export default class extends Component{
    constructor(props){
        super(props)
        this.state={
            data: props.data,
            Frame: props.data && props.data[Object.keys(props.data)[0]] || [],
            hr: props.time,
        }
    }

    // componentDidUpdate = (prevProps) => {
    //     if(prevProps.data !== this.props.data) {
    //       this.setState({
    //         data: this.props.data,
    //         Frame: this.props.data[Object.keys(this.props.data)[0]],
    //         hr: this.props.time,
    //       });
    //     }
    // }

    componentWillReceiveProps(nextProps) {
        if(this.props != nextProps) {
          this.setState({
            data: nextProps.data,
            Frame: nextProps.data && nextProps.data[Object.keys(nextProps.data)[0]] || [],
            hr: nextProps.time,
          });
        }
      }


    // filterDefaultValues = () => {
    //     var obj = this.props.data
    //     const defaultData=obj[Object.keys(obj)[0]]
    //     return defaultData
    // }
    handleSilderChang = (time) => {
        var obj = this.state.data 
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
        
        // filter this.props.data by time and setState ({data : result of the filter})
        }
    }
    newDataStream= (newData) => {
        this.setState({
            data: newData
        })
    }

    render(){
        const showFrame=this.state.Frame
        const startingHour= this.state.hr
        return(
                <Grid container spacing={2}>
                    <Grid container spacing={2}  direction="column" xs>
                        <Grid item  >
                            <Paper style={{padding: 2, marginTop:10,marginBottom:2, height:590, overflowY:'auto'}}>
                            <Map data={showFrame} />
                            </Paper>
                        </Grid>
                        <Grid item>
                        <Paper style={{padding: 'auto', marginLeft:10}}>
                                    <DiscreteSlider onChange={this.handleSilderChang} time={startingHour} />
                                </Paper>
                        </Grid>
                    </Grid>
                </Grid>
        )
    }
}