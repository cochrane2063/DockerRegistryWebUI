import React from "react";
import { CircularProgress } from "@mui/material";

const Loading: React.FC = () => {
    return(
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '15%'}}>
            <CircularProgress size="5%"/>
        </div>
    );
};

export default Loading;