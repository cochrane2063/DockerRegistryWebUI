import React from "react";
import { List } from "@mui/material";
import RepositoryItem from "./RepositoryEntry";
import useRepositories from "../../hooks/useRepositories";
import Repository from "../../interfaces/Repositoriy";
import Loading from "../UtilityComponents/Loading";

const Home: React.FC = () => {
    const  { isFetched, repositories } = useRepositories();

    return(isFetched ? (
        <div className="sectionHome">
            <List className="repositoryList" style={{ maxHeight: "100%", overflow: "auto" }}>
                {repositories.map((repository: Repository) => {
                    return(
                        <RepositoryItem repository={repository} />
                    );
                })}
            </List>
        </div>
    ) : (
        <Loading />
    ));
};

export default Home;