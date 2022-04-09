import React from "react";
import { useState, useEffect } from "react";
import { List, ListItemButton, Box, Typography } from "@mui/material";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import Tag from "../../interfaces/Tag";
import Repository from "../../interfaces/Repositoriy";

const Home: React.FC = () => {
    const auth = useAuth();

    const [repositories, setRepositories] = useState<Repository[]>([]);

    const getTagInfo = async(newRepositories: Repository[]) => {
        let promises: Promise<void>[] = [];
        newRepositories.forEach((repository: Repository) => {
            repository.tags.forEach((tag: Tag) => {
                let promise = axios.get(
                    "/" + repository.name + "/manifests/" + tag.label,
                    {
                        headers:{
                            Accept: "application/vnd.docker.distribution.manifest.v2+json",
                        },
                        auth: {
                            username: auth.username,
                            password: auth.password
                        }
                    }
                ).then((response) => {
                    tag.digest = response?.headers['docker-content-digest'];
                    return axios.get(
                        "/" + repository.name + "/blobs/" + response?.data?.config['digest'],
                        {
                            headers:{
                                Accept: "application/vnd.docker.distribution.manifest.v2+json",
                            },
                            auth: {
                                username: auth.username,
                                password: auth.password
                            }
                        }
                    ).then((res) => {
                        tag.architecture = res?.data?.architecture;
                        tag.os = res?.data?.os;
                        tag.created = new Date(res?.data?.created);
                    });
                });
                promises.push(promise);
            });
        });
        return Promise.all(promises);
    };

    const getTags = async(newRepositories: Repository[]) => {
        let promises: Promise<void>[] = [];
        newRepositories.forEach((repository: Repository) => {
            let promise = axios.get(
                "/" + repository.name + "/tags/list",
                {
                    auth: {
                        username: auth.username,
                        password: auth.password
                    }
                }
            ).then((res) => {
                let tags: Tag[] = [];
                res?.data?.tags.forEach((tagLabel: string) => {
                    let tag: Tag = {
                        label: tagLabel,
                        architecture: "",
                        os: "",
                        created: undefined,
                        digest: ""
                    }
                    tags.push(tag);
                });
                repository.tags = tags;
            });
            promises.push(promise);
        });
        await Promise.all(promises);
        return getTagInfo(newRepositories);
    };

    const listRepositories = async() => {

        const response = await axios.get(
            "/_catalog",
            {
                auth: {
                    username: auth.username,
                    password: auth.password
                }
            }
        );

        let newRepositories: Repository[] = [];
        response?.data?.repositories.forEach((repositoriyName: string) => {
            let newRepository: Repository = {
                name: repositoriyName,
                tags: []
            }
            newRepositories.push(newRepository);
        });
        await getTags(newRepositories)
        setRepositories(newRepositories);

    };

    useEffect(() => {
        setInterval(() => listRepositories(), 1000);
    }, []);

    return(
        <List style={{ maxHeight: "100%", overflow: "auto" }}>
            {repositories.map((repository: Repository) => {
                return(
                    <ListItemButton 
                        component="a" 
                    >
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography color="black" variant="h5">{repository.name}</Typography>
                            <Typography color="grey" variant="h6">{repository.tags.map((tag: Tag) => (tag.created ? tag.created.toDateString() : "Time created not available")).join(" ")}</Typography>
                        </Box>
                    </ListItemButton>
                );
            })}
        </List>
    );
};

export default Home;