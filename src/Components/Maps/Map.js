import React, { Component } from 'react'
import './Map.css';
import Marker from '../Markers/Marker'
import { ReactComponent as Mapimg } from './6thFloorMap15.svg'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedDiv from "./outlinedDiv";
import {Avatar,Chip} from '@material-ui/core';

export default class extends Component{
    constructor(props){
        super(props);
        this.state= {
            rooms: {},
            alarmInRooms: {},
            checked:false,
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
            }

    }
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        const rooms={}
        const alarm={}
        if (this.props.data !== prevProps.data) {
            this.props.data.forEach(obj => {
                // console.log(obj.badge_type_desc)
                rooms[obj.receiver_id] = rooms[obj.receiver_id] ? [...rooms[obj.receiver_id], obj] : [obj]
                if (rooms[obj.receiver_id].length >=2){
                    alarm[obj.receiver_id]=true
                }
            }
            )
            this.checkIn(rooms,alarm)
            this.activateAlarm(this.state.checked)
        }
    }

    checkIn=(rooms,alarmInRooms) => {
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
            rooms: rooms,
            alarmInRooms: alarmInRooms
        }))


    }
    activateAlarm= (checked) => {
        var ARooms = this.state.alarmInRooms
        if (checked) {
            Object.keys(this.Timer).forEach((room)=> {
                const roomElement = document.querySelector(`[data-name*="${room}"]`);
                if (roomElement.classList.contains('backgroundRed')) {
                    roomElement.classList.remove('backgroundRed');
                }
                clearInterval(this.Timer[room])
            })
            Object.keys(ARooms).forEach((i) => {
                this.Timer[i] = setInterval(function () {
                        const roomElement = document.querySelector(`[data-name*="${i}"]`);
                        roomElement.classList.toggle("backgroundRed")
                },1500)
            })
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

        debugger;
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
                            </OutlinedDiv>
                        </div>
                    <div className='mapContainer'>
                        <Mapimg />
                        {this.props && this.props.data && this.props.data.length && this.props.data.map(obj=> {

                            return <Marker key={obj.id_number} color={this.Colors[obj.badge_type_desc]+''} x={obj.x} y={obj.y} name={obj.room_num+" "} id={obj.id_number + '' } receiver_desc={obj.receiver_desc+''} receiver_id={obj.receiver_id+''} badge={obj.badge_type_desc+''}  />
                            }
                        )}
                    </div>
                    <div className='SummaryContainer'>
                        <OutlinedDiv label="Summary">
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
                                                                return <>
                                                                    <Chip
                                                                    avatar={<Avatar style={{backgroundColor:this.Colors[obj.badge_type_desc]}}>{obj.badge_type_desc+''}</Avatar>}
                                                                    variant="outlined"
                                                                    size="small"
                                                                    color='primary'
                                                                    style={{
                                                                        borderColor:this.Colors[obj.badge_type_desc],
                                                                        color:this.Colors[obj.badge_type_desc]
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