import { createContext, useState } from "react";
import Repository from "../interfaces/Repositoriy";


interface MyRepositoriesState {
  repositories: Repository[];
  setRepositories: React.Dispatch<React.SetStateAction<Repository[]>>
}

const RepositoriesContext = createContext<MyRepositoriesState>({
  repositories: [],
  setRepositories: () => {}
});

export const RepositoriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  
  return <RepositoriesContext.Provider value={{repositories, setRepositories}}>{children}</RepositoriesContext.Provider>;
};

export default RepositoriesContext;