import React from 'react'
import { Typography, Toolbar, AppBar,Button } from '@material-ui/core';
import Toolbox from '../Toolbox/Toolbox';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',

        },
    },
}));

export default props=>{
    const classes = useStyles();
    return(
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    RTLS
                </Typography>
                <div >
                    <Toolbox className={classes.search} handleOnSearch={props.handleOnSearch}/>
                </div>


            </Toolbar>
        </AppBar>
    )
}