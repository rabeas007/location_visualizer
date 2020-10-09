import React, { Component } from 'react'
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import './Map.css';
import Marker from '../Markers/Marker'
import { ReactComponent as Mapimg } from './6thFloorMapFinal.svg'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedDiv from "./outlinedDiv";
import {Avatar,Chip} from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete";
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import { blue } from '@material-ui/core/colors';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


export default class extends Component{
    constructor(props){
        super(props);
        this.state= {
            ids: this.initIds(props.data),
            selected:'',
            rooms: {},
            alarmInRooms: {},
            checked:false,
            searchText:'',
            colocation:[],
            open:false,
            roomNum:'',
        }
        this.Timer = {};
        this.Colors = {
            'Inf RN': '#607D8B',
            'CASS':'#E91E63',
            'CA': '#FF9800',
            'Patient':'#64b5f6',
            'Research RN':'#3F51B5',
            'Manager': '#81c784',
            'MD':'#ffb74d',
            'Acupuncturist':'#9c27b0',
            'Sys Admin':'#'+Math.random().toString(16).substr(2,6),
            //  'NP PA':'#'+Math.random().toString(16).substr(2,6),
            // 'Social Worker':'#'+Math.random().toString(16).substr(2,6),
            // 'Lead CA':'#'+Math.random().toString(16).substr(2,6),
            // 'Program RN':'#'+Math.random().toString(16).substr(2,6),
            'Massage Therapist':'#'+Math.random().toString(16).substr(2,6),
            'Lead CASS': '#'+Math.random().toString(16).substr(2,6),
            // 'Fellow ' :'#'+Math.random().toString(16).substr(2,6),
            // 'Interpreter':'#'+Math.random().toString(16).substr(2,6),
            // 'Unknow':'#'+Math.random().toString(16).substr(2,6),
        }

    }

    handleClickOpen = (colocationData,i) => {
        this.setState(prevState => ({
                ...prevState,
            open:true,
            colocation:colocationData,
            roomNum:i
            }))
    };

    handleClose = () => {
        const roomElement = document.querySelector(`[data-name*="${this.state.roomNum}"]`);
        roomElement.removeAttribute('style')
        this.setState(prevState => ({
            ...prevState,
            open:false,
            roomNum:'',
            colocation:[]
        }))
    };
    // setAnchorEl= (e) => {
    //     this.setState(prevState => ({
    //         ...prevState,
    //         anchorEl:e
    //     }))
    // }
    // handleClickPopover = (event) => {
    //     this.setAnchorEl(event.currentTarget);
    // };
    //
    // handleClosePopover = () => {
    //     this.setAnchorEl(null);
    // };
    initIds=(data)=>{
        let listOfIds=[]
        for (const obj of data) {
                // console.log(obj.badge_type_desc)
                let ids={}
                ids['id']=String(obj.id_number)
                ids['appear']=true
                ids['object']=obj
                listOfIds.push(ids)
        }

        return listOfIds
    }
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        const rooms={}
        let listOfIds=[]
        const alarm={}
        if (this.props.data !== prevProps.data) {
            for (const obj of this.props.data) {
                // console.log(obj.badge_type_desc)
                rooms[obj.receiver_id] = rooms[obj.receiver_id] ? [...rooms[obj.receiver_id], obj] : [obj]
                let ids={}
                ids['id']=String(obj.id_number)
                if (this.state.selected !== '') {
                    ids['appear'] = this.state.selected === String(obj.id_number)
                }
                else {
                    ids['appear'] =true
                }
                ids['object']=obj
                listOfIds.push(ids)
                if (rooms[obj.receiver_id].length >=2){
                    alarm[obj.receiver_id]=true
                }
            }

            this.checkIn(listOfIds,rooms,alarm)
            this.activateAlarm(this.state.checked)
        }
        if (this.props.rooms !== prevProps.rooms){
            this.addOnclickToSVG()
        }
    }

    checkIn=(ids,rooms,alarmInRooms) => {
        // redundant code.
        //
        // const newAlarmState=alarmInRooms
        // if (this.state.checked) {
        //     this.alarm(newAlarmState)
        //     this.Timer.forEach((t)=> clearInterval(t))
        //     Object.keys(alarmInRooms).map((key, index) => {
        //         if (alarmInRooms[key]) {
        //             newAlarmState[key]=false
        //         }
        //     })
        //
        // }
        this.setState(prevState => ({
            ...prevState,
            ids:ids,
            rooms: rooms,
            alarmInRooms: alarmInRooms
        }))


    }
    activateAlarm= (checked) => {
        var ARooms = this.state.alarmInRooms
        if (checked) {
            for (const room of Object.keys(this.Timer)){
                const roomElement = document.querySelector(`[data-name*="${room}"]`);
                if (roomElement.classList.contains('backgroundRed')) {
                    roomElement.classList.remove('backgroundRed');
                }
                clearInterval(this.Timer[room])
            }
            for (const i of Object.keys(ARooms)){

                this.Timer[i] = setInterval(function () {
                        const roomElement = document.querySelector(`[data-name*="${i}"]`);
                        roomElement.classList.toggle("backgroundRed")
                },1500)
            }
        }
    }

    alarm = (receivers) => {
        let Rooms = this.state.alarmInRooms
        Object.keys(Rooms).forEach((i) => {
            this.Timer.push(setInterval(function () {
                if (Rooms[i]) {
                    const roomElement = document.querySelector(`[data-name*="${i}"]`);
                    roomElement.classList.toggle("backgroundRed")
                }
            },1500))
        })

    };

    handleSwitchChange = () =>{

        // debugger;
        if (!this.state.checked) {
            this.activateAlarm(!this.state.checked)
            // Object.keys(this.state.alarmInRooms).map((key, index) => {
            //     if (this.state.alarmInRooms[key]) {
            //         newAlarmState[key]=false
            //     }
            // })
        }
        else{
            Object.keys(this.Timer).forEach((room)=> {
                const roomElement = document.querySelector(`[data-name*="${room}"]`);
                if (roomElement.classList.contains('backgroundRed')) {
                    roomElement.classList.remove('backgroundRed');
                }
                clearInterval(this.Timer[room])
            })        }

        this.setState({
            ...this.state,
            checked:!this.state.checked,
        })
    }
    useStyles = () =>
        makeStyles((theme) => ({
            root: {
                overflow:'scroll',
                height:'600px',
                width: '100%',
                maxWidth: '36ch',
                backgroundColor: theme.palette.background.paper,
            },
            inline: {
                display: 'inline',
            },
        }));
    setSearchText = (val) => {
        this.setState({
            ...this.state,
            searchText:val,
        })
    }
    showSelectedID = (selectedObj) => {
        // debugger;
        let newIds = []
        if (selectedObj) {
            this.state.ids.forEach((item) => {
                if (item.id !== selectedObj.id) {
                    item.appear = false
                }
                newIds.push(item)
            })
        }
        else{
            this.state.ids.forEach((item) => {
                item.appear = true
                newIds.push(item)
            })
        }
        this.setState({
            ...this.state,
            ids: newIds,
            selected: selectedObj ? selectedObj.id: ''
        })
    }
    addOnclickToSVG= () =>{
        let Rooms = this.props.rooms
        Rooms && Object.keys(Rooms).forEach((i) => {
            const roomElement = document.querySelector(`[data-name*="${i}"]`);
            roomElement.addEventListener('mouseover', event => {
                    roomElement.setAttribute("style","cursor: pointer;")
                }
            )
            roomElement.addEventListener('click', event => {
                roomElement.setAttribute("style", "fill: blue; stroke: blue; stroke-width: 2")
                this.handleClickOpen(Rooms[i],i)
                }
            )
        })
    }
    render(){
        const classes = this.useStyles();
        return(
            <>
                <div className='pageContainer'>
                    <div className='dashBoardContainer'>
                        <OutlinedDiv label="DashBoard">
                        <FormControlLabel
                            control={<Switch checked={this.state.checked} onChange={this.handleSwitchChange} name="checkedB" />}
                            label="Alert Mode"
                        />
                            <Divider variant="middle" />
                                <Autocomplete
                                    // onBlur={() => setSearchText("")}
                                    id="include-input-in-list"
                                    includeInputInList
                                    options={this.state.ids}
                                    getOptionLabel={(option) => String(option.id)}
                                    style={{ width: 200, margin:20}}
                                    // renderOption={(option) => (
                                    //         <div
                                    //             style={{
                                    //                 display: "flex",
                                    //                 flexDirection: "row",
                                    //                 alignItems: "center",
                                    //                 justifyContent: "space-between",
                                    //             }}
                                    //             >
                                    //             <p>{String(option.id)}</p>
                                    //         </div>
                                    // )}
                                    onChange={(event, newValue) => {
                                        this.showSelectedID(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            onChange={(event) => {
                                                this.setSearchText(event.target.value);
                                            }}
                                            {...params}
                                            label="Track ID"
                                        />
                                    )}
                                />

                        </OutlinedDiv>
                    </div>
                    <div className='mapkey'>
                        <OutlinedDiv label="Key" hieght='100%'>
                            <div style={{marginTop:'10px'}}>
                                {Object.keys(this.Colors).map((key,value)=> {
                                        return<div >
                                            <div style={{float: 'right'}}>{key + ""}</div>
                                            <Avatar style={{backgroundColor:this.Colors[key], width:'20px', height: '20px'}}/>
                                        </div>

                                    }

                                )}
                            </div>
                        </OutlinedDiv>
                    </div>
                    <div className='mapContainer'>
                        <SimpleDialog colocation={this.state.colocation} open={this.state.open} onClose={this.handleClose} colors={this.Colors} />
                        <Mapimg />
                        {this.state.ids.map((obj) => {
                            let color= this.Colors[obj.object.badge_type_desc] ? this.Colors[obj.object.badge_type_desc] : this.Colors['Unknow']
                            return (
                                <>
                                    {obj.appear && <Marker key={obj.object.id_number} color={color+''} x={obj.object.x} y={obj.object.y} name={obj.object.room_num+" "} id={obj.object.id_number + '' } receiver_desc={obj.object.receiver_desc+''} receiver_id={obj.object.receiver_id+''} badge={obj.object.badge_type_desc+''}
                                    />}
                                </>)
                        })}
                        {/*{this.props && this.props.data && this.props.data.length && this.props.data.map(obj=> {*/}
                        {/*    let color= this.Colors[obj.badge_type_desc] ? this.Colors[obj.badge_type_desc] : this.Colors['Unknow']*/}
                        {/*    return (*/}
                        {/*        <>*/}
                        {/*            {<Marker key={obj.id_number} color={color+''} x={obj.x} y={obj.y} name={obj.room_num+" "} id={obj.id_number + '' } receiver_desc={obj.receiver_desc+''} receiver_id={obj.receiver_id+''} badge={obj.badge_type_desc+''}*/}
                        {/*        />}*/}
                        {/*    </>)*/}
                        {/*    }*/}
                        {/*)}*/}
                    </div>
                    <div className='SummaryContainer'>
                        <OutlinedDiv label="Summary" height='550px'>
                            <List className={classes.root}>
                            {
                                Object.keys(this.state.rooms).map((key, index) => {
                                return(
                                    <>
                                            <ListItem alignItems="flex-start">
                                                {/*<ListItemAvatar>*/}
                                                {/*    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />*/}
                                                {/*</ListItemAvatar>*/}
                                                <ListItemText
                                                    primary={key + ':'+ this.state.rooms[key][0].receiver_desc}
                                                    secondary={
                                                        <React.Fragment>
                                                            {this.state.rooms[key].map( obj => {
                                                                let color= this.Colors[obj.badge_type_desc] ? this.Colors[obj.badge_type_desc] : this.Colors['Unknow']
                                                                return <>
                                                                    <Chip
                                                                    avatar={<Avatar style={{backgroundColor:color}}>{obj.badge_type_desc+''}</Avatar>}
                                                                    variant="outlined"
                                                                    size="small"
                                                                    color='primary'
                                                                    style={{
                                                                        borderColor:color,
                                                                        color:color
                                                                    }}
                                                                    label={obj.id_number}
                                                                    onClick={()=>console.log('Hi') }
                                                                    // style={{ transform: 'translate(-55%, -26%)'}}
                                                                />

                                                                </>

                                                            })}
                                                        </React.Fragment>
                                                    }
                                                />
                                            </ListItem>
                                            <Divider variant="inset" component="li" />
                                    </>
                                        )
                            })}
                            </List>
                        </OutlinedDiv>
                    </div>
                </div>
            </>
        )
    }
}

const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    table: {
        minWidth: 300,
    },
});

function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, colocation, open , colors} = props;
    debugger;
    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };
    // const sumDuration = ( ) =>{
    //     const myMap = {};
    //     colocation.forEach((item) => {
    //         if(myMap[item.id]) {
    //             myMap[item.id] += item.duration
    //         } else {
    //             myMap[item.id] = item.duration
    //         }
    //     })
    //     console.log(myMap)
    //     return myMap
    // }
    // const myMap= sumDuration()
    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Co-location : {colocation[1] && colocation[1].roomName}</DialogTitle>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Position</TableCell>
                            <TableCell align="right">ID</TableCell>
                            <TableCell align="right">Duration (sec)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {colocation.map((obj) => {
                            // console.log(obj)
                            let color= colors[obj.badge] ? colors[obj.badge] : colors['Unknow']
                            return <>
                                <TableRow key={obj.id}>
                                    <TableCell component="th" scope="row">
                                        <Avatar style={{backgroundColor: color}} className={classes.avatar}>
                                            <PersonIcon style={{color:'white'}}/>
                                        </Avatar>{obj.badge}
                                    </TableCell>
                                    <TableCell align="right">{obj.id}</TableCell>
                                    <TableCell align="right">{obj.duration}</TableCell>
                                </TableRow>
                            </>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};