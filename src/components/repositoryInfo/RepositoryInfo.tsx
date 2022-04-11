import React from "react";
import { useLocation } from "react-router-dom";
import { ListItemButton, Button, Box, Card, CardContent, Typography, CardActions, Grid, ListItemText, Snackbar, Alert } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import useRepositories from "../../hooks/useRepositories";
import Tag from "../../interfaces/Tag";
import Repository from "../../interfaces/Repositoriy";
import { getHostNameFromURL, printSize, printTimePassed } from "../../utils";
import NotFound from "../NotFound";

const RepositoryInfo: React.FC = () => {
    const location = useLocation();
    const path = location.pathname;
    const  { repositories } = useRepositories();
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const repository = repositories.find((element) => (element.name === path.slice(12,path.length)));

    const generatePushCommand = (hostName: string) => {
        return "docker push " + hostName + "/" + (repository?.name ? repository?.name : "") + ":tagname";
    }

    const handleClick = () => {
        const hostName = getHostNameFromURL(process.env.REGISTRY_URL ? process.env.REGISTRY_URL : "");
        navigator.clipboard.writeText(generatePushCommand(hostName));
        setSnackbarOpen(true);
    };

    const handleClose = () => {
        setSnackbarOpen(false);
    };
    
    return (repository ? (
        <div className="repositoryInfo">
            <Card className="repositoryDetail" variant="outlined">
                <CardContent>
                    {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                    </Typography> */}
                    <Typography className="lines" variant="h5" component="div">
                        {repository.name}
                    </Typography>
                    <Typography className="lines" sx={{ mb: 1.5 }} color="text.secondary">
                        <AccessTimeIcon className="clock-icon" />
                        {"Last updated: " + repository.tags.filter((tag: Tag) => (tag.label === "latest")).map((tag: Tag) => (tag.created ? printTimePassed(tag.created) : "")).join(" ")}
                    </Typography>
                    <Typography className="lines" variant="h6">
                        Docker commands
                    </Typography>
                    <Typography className="lines" variant="body2">
                        To push a new tag to this repository,
                    </Typography>
                    <Box className="commandDisplay" onClick={handleClick} component="span" sx={{ display: 'block', bgcolor: '#445d6e', color: 'white', borderColor: '#445d6e' }}>{generatePushCommand(getHostNameFromURL(process.env.REGISTRY_URL ? process.env.REGISTRY_URL : ""))}</Box>
                </CardContent>
                {/* <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions> */}
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Copied!
                    </Alert>
                </Snackbar>
            </Card>
            <Card className="tagsDetail" variant="outlined">
                <CardContent>
                    <Typography className="lines" variant="h6">
                        Tags
                    </Typography>
                    <Typography className="lines" variant="body2">
                        {"This repository contains " + repository.tags.length + " tag" + (repository.tags.length > 1 ? "s" : "") + "."}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Details</Button>
                </CardActions>
            </Card>
        </div>
    ) : (
        <NotFound />
    ));
}

export default RepositoryInfo;