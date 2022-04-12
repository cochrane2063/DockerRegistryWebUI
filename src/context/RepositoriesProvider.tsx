import { createContext, useState } from "react";
import Repository from "../interfaces/Repositoriy";


interface MyRepositoriesState {
  isFetched: boolean;
  setIsFetched: React.Dispatch<React.SetStateAction<boolean>>
  repositories: Repository[];
  setRepositories: React.Dispatch<React.SetStateAction<Repository[]>>
}

const RepositoriesContext = createContext<MyRepositoriesState>({
  isFetched: false,
  setIsFetched: () => {},
  repositories: [],
  setRepositories: () => {}
});

export const RepositoriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  
  return <RepositoriesContext.Provider value={{isFetched, setIsFetched, repositories, setRepositories}}>{children}</RepositoriesContext.Provider>;
};

export default RepositoriesContext;