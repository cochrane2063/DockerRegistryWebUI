import React from "react";
import { ListItemButton, Box, Typography, tableFooterClasses } from "@mui/material";
import Tag from "../../interfaces/Tag";
import Repository from "../../interfaces/Repositoriy";
import { printTimePassed } from "../../utils";

interface Props {
    repository: Repository;
}

const RepositoryItem: React.FC<Props> = (props: Props) => {
    
    return (
        <ListItemButton 
            component="a" 
        >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography color="black" variant="h5">{props.repository.name}</Typography>
                <Typography color="grey" variant="h6">{"Last updated: " + props.repository.tags.filter((tag: Tag) => (tag.label === "latest")).map((tag: Tag) => (tag.created ? printTimePassed(tag.created) : "")).join(" ")}</Typography>
            </Box>
        </ListItemButton>
    );
}

export default RepositoryItem;