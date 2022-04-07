import ReactDOM from "react-dom";
import App from "./App";
import "./style/style.css";
import { AuthProvider } from "./context/AuthProvider";


const Index: React.FC = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
