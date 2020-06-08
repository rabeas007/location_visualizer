import React, { Component } from 'react'
import {FormControl, InputLabel, MenuItem,Select, Button} from '@material-ui/core'
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import * as moment from 'moment';
import './Toolbox.scss';

export default class extends Component{
    constructor(props){
        super(props);
        this.state={
            form:{
                floor:'',
                date: '2016-04-01',
                time: ''

            }
        }
    }
    
    handleChange= name => ({target: {value}}) =>{
        this.setState({
            form:{
            ...this.state.form,
            [name]: value
            }
        })
    }

    render(){
        
        const {form:{floor, date, time}}=this.state
        var floorsNum=Array.from(Array(14).keys())
        const FloorlistItems = floorsNum.map((number) => <MenuItem value={number}>{number}</MenuItem>)
        var array = [];
        for (var i = 0; i < 24; i++) {
            array.push(moment(i + ':00:00',"HH:mm:ss").format("HH:mm:ss"))}
        const TimelistItems = array.map((val, index) => <MenuItem value={index}>{val}</MenuItem>)

        return(
            <div className='toolbox'>

            <div className={this.props.className}>
                <FormControl variant="outlined" style={{minWidth: '170px'}}>
                    <InputLabel>Floor</InputLabel>
                    <Select
                    value={floor}
                    onChange={this.handleChange('floor')}
                    label="Floor"
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {FloorlistItems}
                    </Select>
                </FormControl>
            </div>
                <div className={this.props.className}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                    autoOk
                    variant="inline"
                    inputVariant="outlined"            
                    format="MM/dd/yyyy"
                    label="Date picker inline"
                    value={date}
                    onChange={this.handleChange('date')}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}/>
                </MuiPickersUtilsProvider>
                </div>
                <div className={this.props.className}>
                <FormControl variant="outlined" style={{minWidth: '170px'}}>

                <InputLabel>Time</InputLabel>
                    <Select
                    value={time}
                    onChange={this.handleChange('time')}
                    label="Time"
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {TimelistItems}
                    </Select>
                </FormControl>
                </div>
                <Button color="inherit" onClick={() => this.props.handleOnSearch(floor, date, time)}>Search</Button>
            </div>
        )
    }
}