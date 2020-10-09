import React, {Component} from 'react';
import Header from './Components/Layouts/Header';
import Layouts from './Components/Layouts'
import axios from 'axios';
import './app.scss';

class App extends Component{
    constructor(){
        super()
        //this.FramedData=this.FramesByTime()
        //const Defultdata=this.Frames(6, '2016-04-01', 9)
        this.state={

            data: this.getDataByFloor(6, 9),
            hr: 9,
            millseconds:'',
            selectedData: null,
        }
    }

    loadPoints = () => {
        axios.get('/api/getPoints')
            .then(({ data }) => {
                this.setState({
                    fkd: data,
                })
            })
            .catch((err) => {
                alert(err)
            });
    }
    addPoint = () => {
        axios.post('/api/putData', {
            id_number: 10000064,
            badge_type_desc: "Inf RN",
            start_date: 1451902509000,
            end_date: 1451902662000,
            x: 276.2283570392,
            y: 995.8385104472,
            room: "605",
            floor_id: 6,
            x_start_time: "10:15:09",
            x_end_time: "10:17:42"
        });
    }
    getPosition = (receiver) => {
        const roomElement = document.querySelector(`[data-name*="${receiver}"]`);
        let x = 0, y =0 ;
        if (roomElement) {
            const rect = roomElement.getBoundingClientRect();
            x = Math.random() * (rect.right - (rect.left * 1.02 )) + rect.left*1.02;
            y = Math.random() * ((rect.bottom) - rect.top*1.06) + rect.top*1.01;
        }
        return {x, y}
    };

    FramesByTime = (data) => {
        const dataByTime = {};
        for (const point of data) {
            if (point.receiver_id !== null){
                const { floor_id, start_time, end_time,receiver_id }=point
                let pos= this.getPosition(receiver_id)
                point.x=pos.x
                point.y=pos.y
                var start=start_time
                while (start < end_time) {
                    dataByTime[start]=dataByTime[start] ? [...dataByTime[start],point] : [point]
                    start += 1
                }
            }   
         }
        return dataByTime
    }
    isIntervalIncluded = (time, point) => {
        const generatedHour = time + ':00:00';
        const nextHour = (time+1) + ':00:00';
        const currentDate = new Date(`October 13, 2014 ${generatedHour}`);
        const nextDate = new Date(`October 13, 2014 ${nextHour}`);
        const startTime = new Date(`October 13, 2014 ${point.x_start_time}`);
        const endTime = new Date(`October 13, 2014 ${point.x_end_time}`);
        return (startTime >= currentDate && startTime <= nextDate) ||
            (endTime >= currentDate && endTime <= nextDate);
    };
    Frames = (floor, date, time) =>{
        const generatedHour = time + ':00:00';
        const nextHour = (time+1) + ':00:00';
        const currentTime = new Date(`October 13, 2014 ${generatedHour}`);
        const nextTime = new Date(`October 13, 2014 ${nextHour}`);
        var matchingKeys=[]
        while (currentTime < nextTime) {
            const key=currentTime.toLocaleTimeString(('it-IT'))+'_'+ floor
            matchingKeys.push(key)
            currentTime.setMinutes(currentTime.getMinutes() + 1);
        }
        const data=this.FramedData
        const matchingFrames = {}
        matchingKeys.map(function(key){ 
            (data[key]) && (matchingFrames[key]= data[key])
        });
        return matchingFrames
    }

    getDataByFloor = (floor_id, time ,current= 1451898000, next=1451901600) => {
        axios.get('/api/getPointsByFloor',{
            params: {floor_id, current, next}
        })
            .then(({ data }) => {

                this.setState({
                    data,
                    hr:time,
                    millseconds:current,
                    selectedData: this.FramesByTime(data)
                })
            })
            .catch((err) => {
                alert(err)
            });
    }
    toTimestamp(date, time){
        const currentTime = new Date(date +' '+ time + ' GMT');
        var datum = Date.parse(currentTime);
        return datum/1000;
    }
    handleOnSearch = (floor, date, time) => {
        // const newData = data.filter(point => point.floor_id === floor && this.isIntervalIncluded(time, point) && point.Room!=null);
        const generatedHour = time + ':00:00';
        const nextHour = (time+1) + ':00:00';
        const currentTime = this.toTimestamp(date,generatedHour)
        const nextTime = this.toTimestamp(date,nextHour)

        this.getDataByFloor(floor,time, currentTime, nextTime)
    };
    
    render(){
        return(
            <div className='global-container'>
                <Header handleOnSearch={this.handleOnSearch}/>
                <Layouts  fullData={this.state.data} data={this.state.selectedData} millseconds={this.state.millseconds} time={this.state.hr}/>
            </div>)
    }
}

export default App;
