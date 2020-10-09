import React,{Component} from 'react'
import DiscreteSlider from '../Slider/Slider'
import Map from '../Maps/Map'

export default class extends Component{
    constructor(props){
        super(props);
        this.state={
            fullData:props.fullData,
            data: props.data,
            Frame: props.data && props.data[props.millseconds] || [],
            hr: props.time,
            millseconds: props.millseconds
        }
    }
    componentWillReceiveProps(nextProps) {
        if(this.props !== nextProps) {
          this.setState({
              fullData:nextProps.fullData,
            data: nextProps.data,
            Frame: nextProps.data && nextProps.data[nextProps.millseconds] || [],
            hr: nextProps.time,
            millseconds: nextProps.millseconds

          });
        }
      }
    toColocation(data){
        // debugger;
        let rooms={}
        let myMap={}
        let prev=0
        data && data.forEach(obj => {
            // console.log(obj.badge_type_desc)
            if (prev !== obj.receiver_id){
                myMap={}
            }
            if (rooms[obj.receiver_id]){

                if(myMap[obj.id_number]) {
                    myMap[obj.id_number] += obj.duration_sec
                    rooms[obj.receiver_id].find(v => v.id === obj.id_number).duration= myMap[obj.id_number]
                }
                else {
                    myMap[obj.id_number] = obj.duration_sec
                    rooms[obj.receiver_id] = [...rooms[obj.receiver_id],{'id':obj.id_number, 'duration':obj.duration_sec, 'badge':obj.badge_type_desc, 'roomName':obj.receiver_desc}]
                }

            }
            else{
                rooms[obj.receiver_id]=[{'id':obj.id_number, 'duration':obj.duration_sec, 'badge':obj.badge_type_desc, 'roomName':obj.receiver_desc}]
            }
            prev=obj.receiver_id
        })

        return rooms
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
        let rooms=this.toColocation(this.state.fullData)
        // console.log(rooms)

        // console.log(this.props.fullData)
        return(
            <div className='map-container'>
                <Map rooms={rooms} data={showFrame} />
                <DiscreteSlider onChange={this.handleSliderChange} time={startingHour} />
            </div>
        )
    }
}