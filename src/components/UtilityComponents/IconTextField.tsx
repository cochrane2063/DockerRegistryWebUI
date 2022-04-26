import React from "react";
import { TextField, InputAdornment } from "@mui/material";

interface Props {
    iconStart:  React.ReactNode;
    iconEnd:  React.ReactNode;
    others: any[]
}

const IconTextField: React.FC<Props> = (props) => {
    // cosnt { iconStart, iconEnd, ...others } = props;
    return (
        <TextField
        // {...props}
        // InputProps={{
        //     ...InputProps,
        //     startAdornment: iconStart ? (
        //     <InputAdornment position="start">{iconStart}</InputAdornment>
        //     ) : null,
        //     endAdornment: iconEnd ? (
        //     <InputAdornment position="end">{iconEnd}</InputAdornment>
        //     ) : null
        // }}
        />
    );
};

export default IconTextField;