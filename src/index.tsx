import ReactDOM from "react-dom";
import App from "./App";
import "./style/style.css";
import { AuthProvider } from "./context/AuthProvider";
import { RepositoriesProvider } from "./context/RepositoriesProvider";


const Index: React.FC = () => {
  return (
    <AuthProvider>
      <RepositoriesProvider>
        <App />
      </RepositoriesProvider>
    </AuthProvider>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
