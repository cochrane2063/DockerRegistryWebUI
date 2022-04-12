import React from "react";
import { useLocation, Link } from "react-router-dom";
import { ListItemButton, Button, Box, Card, CardContent, Typography, CardActions, Grid, List, ListItemText, Snackbar, Alert, Tooltip, Collapse } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import useRepositories from "../../hooks/useRepositories";
import Tag from "../../interfaces/Tag";
import Repository from "../../interfaces/Repositoriy";
import { getHostNameFromURL, printSize, printTimePassed, PrintOSIcon, toUpperFirst, printMonth } from "../../utils";
import RepoNotFound from "./RepoNotFound"
import Loading from "../Loading";
import { digestDisplay } from "../../interfaces/Utils";

const RepositoryInfo: React.FC = () => {
    const location = useLocation();
    const path = location.pathname;
    const  { isFetched, repositories } = useRepositories();
    const [hideTags, setHideTags] = React.useState(true);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [showDetails, setShowDetails] = React.useState(false);
    const repository = repositories.find((element) => (element.name === path.slice(12,path.length)));

    const generatePushCommand = (hostName: string, tagName: string) => {
        return "docker push " + hostName + "/" + (repository?.name ? repository?.name : "") + ":" + tagName;
    }

    const generatePullCommand = (hostName: string, tagName: string) => {
        return "docker pull " + hostName + "/" + (repository?.name ? repository?.name : "") + ":" + tagName;
    }

    const handlePushClick = () => {
        const hostName = getHostNameFromURL(process.env.REGISTRY_URL ? process.env.REGISTRY_URL : "");
        navigator.clipboard.writeText(generatePushCommand(hostName,"tagname"));
        setSnackbarOpen(true);
    };

    const handlePullClick = (tagName: string) => {
        const hostName = getHostNameFromURL(process.env.REGISTRY_URL ? process.env.REGISTRY_URL : "");
        navigator.clipboard.writeText(generatePullCommand(hostName,tagName));
        setSnackbarOpen(true);
    };

    const handleClose = () => {
        setSnackbarOpen(false);
    };

    const toggleHide = () => {
        setHideTags(!hideTags);
    }

    const toggleCollapse = () => {
        setShowDetails((prev) => !prev);
    };
    
    return (isFetched ? (
        repository ? (
            <div className="repositoryInfo">
                <div className="wrapperAlwaysDisplayed">
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
                                        <Box className="commandDisplay" onClick={handlePushClick} component="span" sx={{ display: 'block', bgcolor: '#445d6e', color: 'white', borderColor: '#445d6e' }}>{generatePushCommand(getHostNameFromURL(process.env.REGISTRY_URL ? process.env.REGISTRY_URL : ""),"tagname")}</Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                        {/* <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions> */}
                    </Card>
                    <Card className="tagsOverview" variant="outlined">
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
                                    <Grid className="lines" container>
                                        <Grid item sm={5}>
                                            <ListItemText primary={tag.label} />
                                        </Grid>
                                        <Grid item sm={3}>
                                            <Tooltip 
                                                className="tooltip"
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
                                                className="tooltip"
                                                title={
                                                    tag.created ? (printMonth(tag.created.getMonth()) + " " + tag.created.getDate() + ", " + tag.created.getFullYear() + " at " + tag.created.toLocaleTimeString().replace('.','').toUpperCase()) : "---"
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
                    </Card>
                    <Card className="detailsCard" variant="outlined">
                        <CardActions>
                            <Button startIcon={showDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />} onClick={toggleCollapse} size="small">Tag Details</Button>
                        </CardActions>
                    </Card>
                </div>
                <Collapse className="tagsDetail" in={showDetails}>
                    {repository.tags.map((tag) => (
                        <div className="wrapperWithCheckBox">  
                            <Card className="tagCard" variant="outlined">
                                <CardContent>
                                    <Grid container>
                                        <Grid item lg={6} md={12}>
                                            <Typography className="lines" variant="h5" component="div" color="#94a1aa">
                                                TAG
                                            </Typography>
                                            <Typography className="lines" variant="h5" component="div" color="#007bff">
                                                {tag.label}
                                            </Typography>
                                            <Typography className="lines" sx={{ mb: 1.5 }}>
                                                Last updated: <b>{(tag.created ? printTimePassed(tag.created) : "")}</b>
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={6} md={12}>
                                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                <Typography className="lines" variant="h6">
                                                To pull this image,
                                                </Typography>
                                                <Box className="commandDisplay" onClick={() => (handlePullClick(tag.label))} component="span" sx={{ display: 'block', bgcolor: '#445d6e', color: 'white', borderColor: '#445d6e' }}>{generatePullCommand(getHostNameFromURL(process.env.REGISTRY_URL ? process.env.REGISTRY_URL : ""),tag.label)}</Box>
                                            </Box>
                                        </Grid>
                                        <Grid item lg={12} md={12}>
                                            <Grid className="lines" container>
                                                <Grid item sm={5}>
                                                    <ListItemText primary="DIGEST" />
                                                </Grid>
                                                <Grid item sm={4}>
                                                    <ListItemText primary="OS/ARCH" />
                                                </Grid>
                                                <Grid item sm={3}>
                                                    <ListItemText style={{display:'flex', justifyContent:'flex-end'}} primary="SIZE" />
                                                </Grid>
                                            </Grid>
                                            
                                            <List>
                                                <ListItemButton 
                                                    className="lines"
                                                    component={Link}
                                                    to={"/repository/" + repository.name + "/" + tag.label}
                                                >
                                                    <Grid container>
                                                        <Grid item sm={5}>
                                                            <ListItemText style={{color: '#007bff'}} primary={digestDisplay(tag.digest)} />
                                                        </Grid>
                                                        <Grid item sm={4}>
                                                            <ListItemText primary={tag.os + "/" +tag.architecture} />
                                                        </Grid>
                                                        <Grid item sm={3}>
                                                            <ListItemText style={{display:'flex', justifyContent:'flex-end'}} primary={tag.size ? printSize(tag.size) : "---"} />
                                                        </Grid>
                                                    </Grid>
                                                </ListItemButton>
                                            </List>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </Collapse>
                <Snackbar open={snackbarOpen} autoHideDuration={1500} onClose={handleClose}>
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