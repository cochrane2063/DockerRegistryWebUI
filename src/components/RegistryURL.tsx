import React from "react";
import { useState } from "react";
import { Button, TextField, Grid } from "@mui/material";
import axios from "../api/axios";

const RegistryURL: React.FC = () => {
    
    const [registryURL, setRegistryURL] = useState("");
    const [hasError, setHasError] = useState(false);

    const requireLogin = () => {
        console.log("Login is Required");
    }

    const checkURL = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        try {
            let axoisInstance = axios(registryURL);
            // axoisInstance.interceptors.response.use(
            //     response => response,
            //     error => {
            //         if (error.response.status === 401) {
            //             requireLogin();
            //         } else {
            //             setHasError(true);
            //         }
            //         return error;
            //     }
            // );
            let response = await axoisInstance.get(
                `/`
            );
            console.log(registryURL);
        } catch (error: any) {
            console.log(error);
            if (error.response == undefined) {
                setHasError(false);
                requireLogin();
            } else {
                setHasError(true);
            }
        }
    };

    return(
        <div className="get-url">
            <Grid container spacing={2}>
                <Grid item xs={10} md={10}>
                    <TextField id="registry-url-input" label="RegistryURL" variant="outlined" value={registryURL} error={hasError} helperText={hasError ? "The registry URL is invalid!" : ""} onChange={(event)=>{setRegistryURL(event.target.value)}} fullWidth />
                </Grid>
                <Grid item xs={2} md={2}>
                    <Button className="submit-url-btn" onClick={checkURL} fullWidth>Next</Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default RegistryURL;