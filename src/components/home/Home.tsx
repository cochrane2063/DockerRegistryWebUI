import React from "react";
import { List } from "@mui/material";
import RepositoryItem from "./RepositoryEntry";
import useRepositories from "../../hooks/useRepositories";
import Repository from "../../interfaces/Repositoriy";

const Home: React.FC = () => {
    const  { repositories } = useRepositories();

    return(
        <div className="sectionHome">
            <List className="repositoryList" style={{ maxHeight: "100%", overflow: "auto" }}>
                {repositories.map((repository: Repository) => {
                    return(
                        <RepositoryItem repository={repository} />
                    );
                })}
            </List>
        </div>
    );
};

export default Home;