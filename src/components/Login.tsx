import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { InputLabel, Stack, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

interface LocationState {
  from: { pathname: string };
}
const Login: React.FC = () => {
    const setAuth = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationState;
    const from = state?.from?.pathname || "/";

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hasError, setHasError] = useState(false);

    const handleSkipLogin = () => {
        setAuth["loginNeeded"] = false;
        setAuth["isLoggedIn"] = false;
        navigate(from, { replace: true });
    }

    const handleLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        try {

            const response = await axios.get(
            "/",
            {
                // headers: {
                //     'Content-Type': 'application/json',
                //     'Authorization': 'Basic dXNlcjp1c2Vy'
                // }
                auth: {
                    // username: username,
                    // password: password
                    username: "pusher",
                    password: "pusher"
                }
            }
            );

            const status = response?.status;

            if (status === undefined) {
                setHasError(true);
            } else {
                setAuth["loginNeeded"] = true
                setAuth["isLoggedIn"] = true;
                // setAuth["username"] = username;
                // setAuth["password"] = password;
                setAuth["username"] = "pusher";
                setAuth["password"] = "pusher";
                setHasError(false);
                navigate(from, { replace: true });
                console.log("logged in!");
            }
        } catch (error) {
            console.log(error);
            setHasError(true);
        }
        setUsername(username);
        setPassword("");
    };

    return (
    <Container className="login">
        <Stack className="grid-container" spacing={2}>
            <InputLabel className="login-label" >Login to Docker Registry</InputLabel>
            <TextField
                className="username-input"
                id="outlined-basic"
                label="Username"
                variant="outlined"
                value={username}
                placeholder="Username"
                onChange={(event) => {
                setUsername(event.target.value);
                }}
            />
            <TextField
                className="password-input"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                value={password}
                placeholder="Password"
                error={hasError}
                helperText={hasError ? "Username or Password Incorrect!" : ""}
                type="password"
                onChange={(event) => {
                setPassword(event.target.value);
                }}
            />
            <Stack direction="row" justifyContent="space-between" spacing={2}>
                <Button
                    className="skip-login-btn"
                    variant="contained"
                    type="submit"
                    onClick={handleSkipLogin}
                >
                    Skip Login
                </Button>
                <Button
                    endIcon={<LoginIcon />}
                    className="login-btn"
                    variant="contained"
                    type="submit"
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </Stack>
        </Stack>
    </Container>
    );
};

export default Login;