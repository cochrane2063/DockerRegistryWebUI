import { useContext } from "react";
import RepositoriesContext from "../context/RepositoriesProvider";

const useRepositories = () => {
  return useContext(RepositoriesContext);
};

export default useRepositories;