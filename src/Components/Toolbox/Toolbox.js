import React, { Component } from 'react'
import {Paper} from '@material-ui/core';
import {FormControl, InputLabel, MenuItem,Select, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import * as moment from 'moment';

export default class extends Component{
    constructor(){
        super()
        this.state={
            form:{
                floor:'',
                date: '2016-04-01',
                time: ''

            }
        }
    }
    useStyles = makeStyles(theme => ({
        
        formControl: {
            display:'flex', 
            justifyContent:'center', 
            alignItems:'center',
            marginTop:10,
            marginBottom:10,
        }
        ,
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
      }));
    
    handleChange= name => ({target: {value}}) =>{
        this.setState({
            form:{
            ...this.state.form,
            [name]: value
            }
        })
    }
    handlChange= name => (event, date) => {
        this.setState({
            form:{
            ...this.state.form,
            date: date
            }
        })
    }

    render(){
        
        const {form:{floor, date, time}}=this.state
        const classes = this.useStyles
        var floorsNum=Array.from(Array(14).keys())
        const FloorlistItems = floorsNum.map((number) => <MenuItem value={number}>{number}</MenuItem>)
        var array = [];
        for (var i = 0; i < 24; i++) {
            array.push(moment(i + ':00:00',"HH:mm:ss").format("HH:mm:ss"))}
        const TimelistItems = array.map((val, index) => <MenuItem value={index}>{val}</MenuItem>)

        return(
            <div style={ {
                display:'flex', 
                justifyContent:'center', 
                alignItems:'center',
                marginTop:10,
                marginBottom:10,
            }}>

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
                    onChange={this.handlChange('date')}
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