import React from "react";
import { Link } from "react-router-dom";
import { ListItemButton, Grid, ListItemText } from "@mui/material";
import Tag from "../../interfaces/Tag";
import Repository from "../../interfaces/Repositoriy";
import { printSize, printTimePassed } from "../../utils";

interface Props {
    repository: Repository;
}

const RepositoryItem: React.FC<Props> = (props: Props) => {
    
    return (
        <ListItemButton 
            component={Link}
            to={"/repository/" + props.repository.name}
        >
            {/* <Box sx={{ display: "flex", flexDirection: "column" }}>
            </Box> */}
            <Grid container>
                <Grid item sm={9}>
                    <ListItemText primary={props.repository.name} secondary={"Last updated: " + props.repository.tags.filter((tag: Tag) => (tag.label === "latest")).map((tag: Tag) => (tag.created ? printTimePassed(tag.created) : "")).join(" ")} />
                </Grid>
                <Grid item sm={3}>
                    <ListItemText style={{display:'flex', justifyContent:'flex-end'}} primary={props.repository.tags.filter((tag: Tag) => (tag.label === "latest")).map((tag: Tag) => (tag.size ? printSize(tag.size) : "")).join(" ")} />
                </Grid>
            </Grid>
        </ListItemButton>
    );
}

export default RepositoryItem;