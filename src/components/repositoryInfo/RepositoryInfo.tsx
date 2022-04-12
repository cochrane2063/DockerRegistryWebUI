import React from "react";
import { useLocation, Link } from "react-router-dom";
import { ListItemButton, Button, Box, Card, CardContent, Typography, CardActions, Grid, List, ListItemText, Snackbar, Alert, Tooltip } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import useRepositories from "../../hooks/useRepositories";
import Tag from "../../interfaces/Tag";
import Repository from "../../interfaces/Repositoriy";
import { getHostNameFromURL, printSize, printTimePassed, PrintOSIcon, toUpperFirst } from "../../utils";
import RepoNotFound from "./RepoNotFound"
import Loading from "../Loading";

const RepositoryInfo: React.FC = () => {
    const location = useLocation();
    const path = location.pathname;
    const  { isFetched, repositories } = useRepositories();
    const [hideTags, setHideTags] = React.useState(true);
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

    const toggleHide = () => {
        setHideTags(!hideTags);
    }
    
    return (isFetched ? (
        repository ? (
            <div className="repositoryInfo">
                <Card className="repositoryDetail" variant="outlined">
                    <CardContent>
                        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Word of the Day
                        </Typography> */}
                        <Grid container>
                            <Grid item lg={6} md={12}>
                                <Typography className="lines" variant="h5" component="div">
                                    {repository.name}
                                </Typography>
                                <Typography className="lines" sx={{ mb: 1.5 }} color="text.secondary">
                                    <AccessTimeIcon className="clock-icon" />
                                    {"Last updated: " + repository.tags.filter((tag: Tag) => (tag.label === "latest")).map((tag: Tag) => (tag.created ? printTimePassed(tag.created) : "")).join(" ")}
                                </Typography>
                            </Grid>
                            <Grid item lg={6} md={12}>
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <Typography className="lines" variant="h6">
                                        Docker commands
                                    </Typography>
                                    <Typography className="lines" variant="body2">
                                        To push a new tag to this repository,
                                    </Typography>
                                    <Box className="commandDisplay" onClick={handleClick} component="span" sx={{ display: 'block', bgcolor: '#445d6e', color: 'white', borderColor: '#445d6e' }}>{generatePushCommand(getHostNameFromURL(process.env.REGISTRY_URL ? process.env.REGISTRY_URL : ""))}</Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                    {/* <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions> */}
                </Card>
                <Card className="tagsDetail" variant="outlined">
                    <CardContent>
                        <Typography className="lines" variant="h6">
                            Tags
                        </Typography>
                        <Typography className="lines" variant="body2">
                            {"This repository contains " + repository.tags.length + " tag" + (repository.tags.length > 1 ? "s" : "") + "."}
                        </Typography>
                        <List>
                            <Grid container>
                                <Grid item sm={5}>
                                    <ListItemText primary="TAG" />
                                </Grid>
                                <Grid item sm={3}>
                                    <ListItemText primary="OS" />
                                </Grid>
                                <Grid item sm={2}>
                                    <ListItemText style={{display:'flex', justifyContent:'flex-end'}} primary="SIZE" />
                                </Grid>
                                <Grid item sm={2}>
                                    <ListItemText style={{display:'flex', justifyContent:'flex-end'}} primary="CREATED" />
                                </Grid>
                            </Grid>
                            {repository.tags.sort((a,b) => {
                                let result = (b.created ? b.created.getTime() : 0) - (a.created ? a.created.getTime() : 0);
                                if (result === 0) {
                                    if (b.label === "latest") {
                                        return 1;
                                    } else if (a.label === "latest") {
                                        return -1;
                                    } else {
                                        return 0;
                                    }
                                } else {
                                    return result;
                                }
                            }).slice(0,((hideTags && repository.tags.length > 4) ? 3 : repository.tags.length)).map((tag) => (
                                <Grid container>
                                    <Grid item sm={5}>
                                        <ListItemText primary={tag.label} />
                                    </Grid>
                                    <Grid item sm={3}>
                                        <Tooltip 
                                            title={
                                                <>
                                                    <div>{"Operating System: " + toUpperFirst(tag.os)}</div>
                                                        <br />
                                                    <div>{"Architecture: " + tag.architecture}</div>
                                                </>
                                            } 
                                            placement="bottom" 
                                            arrow
                                        >
                                            <ListItemText className="iconWrapper" primary={<PrintOSIcon className="icon" os={tag.os} />} />
                                        </Tooltip>
                                    </Grid>
                                    <Grid item sm={2}>
                                        <ListItemText style={{display:'flex', justifyContent:'flex-end'}} primary={tag.size ? printSize(tag.size) : "---"} />
                                    </Grid>
                                    <Grid item sm={2}>
                                        <Tooltip 
                                            title={
                                                tag.created ? (tag.created.toLocaleString()) : "---"
                                            } 
                                            placement="bottom-end" 
                                            arrow
                                        >
                                            <ListItemText style={{display:'flex', justifyContent:'flex-end'}} primary={tag.created ? printTimePassed(tag.created) : "---"} />
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            ))}
                            {repository.tags.length > 4 ? (
                                <Grid container>
                                    <Grid item sm={5}>
                                        <ListItemText
                                            className="moreBtn"
                                            onClick={toggleHide}
                                            primary={hideTags ? "more" : "less"}
                                        />
                                    </Grid>
                                </Grid>
                            ) : (
                                <></>
                            )}
                        </List>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Details</Button>
                    </CardActions>
                </Card>
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Copied!
                    </Alert>
                </Snackbar>
            </div>
        ) : (
            <RepoNotFound repositoryName={path.slice(12,path.length)} />
        )
    ) : (
        <Loading />
    ));
}

export default RepositoryInfo;