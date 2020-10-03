import React from "react";

import TextField from "@material-ui/core/TextField";

const InputComponent = ({ inputRef, ...other }) => <div {...other} />;
const OutlinedDiv = ({ children, label ,height}) => {
    return (
        <TextField
            variant="outlined"
            label={label}
            multiline
            InputLabelProps={{ shrink: true }}
            InputProps={{
                inputComponent: InputComponent
            }}
            inputProps={{ children: children ,style:{height: height, overflow: 'scroll'}}}
        />
    );
};
export default OutlinedDiv;
