import React from "react";
import { useLocation } from "react-router-dom";
import { ListItemButton, Box, Typography, Grid, ListItemText } from "@mui/material";
import useRepositories from "../../hooks/useRepositories";
import Tag from "../../interfaces/Tag";
import Repository from "../../interfaces/Repositoriy";
import NotFound from "../NotFound";

const RepositoryInfo: React.FC = () => {
    const location = useLocation();
    const path = location.pathname;
    const  { repositories } = useRepositories();
    const repository = repositories.find((element) => (element.name === path.slice(12,path.length)));
    
    return (repository ? (
        <h1>{repository?.tags.map((tag) => (tag.label)).join(" ")}</h1>
    ) : (
        <NotFound />
    ));
}

export default RepositoryInfo;