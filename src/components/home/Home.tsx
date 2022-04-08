import React from "react";
import { useState, useEffect } from "react";
import { List, ListItemButton, Box, Typography } from "@mui/material";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import Repository from "../../interfaces/Repositoriy";

const Home: React.FC = () => {
    const auth = useAuth();

    const [repositories, setRepositories] = useState<Repository[]>([]);

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
        setRepositories(newRepositories);

    };

    useEffect(() => {
        setInterval(() => listRepositories(), 1000);
    }, []);

    return(
        <List style={{ maxHeight: "100%", overflow: "auto" }}>
            {repositories.map((repositoriy: Repository) => {
                return(
                    <ListItemButton 
                        component="a" 
                    >
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography color="black" variant="h5">{repositoriy.name}</Typography>
                            <Typography color="white" variant="h6"></Typography>
                            <Typography color="mistyrose" variant="body1"></Typography>
                        </Box>
                    </ListItemButton>
                );
            })}
        </List>
    );
};

export default Home;