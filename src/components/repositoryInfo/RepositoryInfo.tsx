import React from "react";
import { useLocation } from "react-router-dom";
import { ListItemButton, Box, Typography, Grid, ListItemText } from "@mui/material";
import Tag from "../../interfaces/Tag";
import Repository from "../../interfaces/Repositoriy";

const RepositoryInfo: React.FC = () => {
    const location = useLocation()
    
    return (
        <h1>{location.pathname.slice(12,location.pathname.length)}</h1>
    );
}

export default RepositoryInfo;