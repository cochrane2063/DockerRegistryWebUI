import React from "react";
import { AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem , Tooltip, Avatar, Snackbar, Alert} from "@mui/material";
import useAuth from "../../hooks/useAuth";

const NavBar: React.FC = () => {
    const auth = useAuth();
    const [anchorElUser, setAnchorElUser] = React.useState<(EventTarget & HTMLButtonElement) | null>(null);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const handleClick = () => {
      const url = process.env.REGISTRY_URL ? process.env.REGISTRY_URL : "";
      const urlSplit = url.split('/');
      navigator.clipboard.writeText(urlSplit[urlSplit.length - 1]);
      setSnackbarOpen(true);
    };

    const handleClose = () => {
      setSnackbarOpen(false);
    };
  
    return (
      <AppBar className="navbar" position="static">
        <Container maxWidth={false} sx={{ m: 0, width: '100%' }}>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: 'flex' }}
            >
              Docker Registry
            </Typography>

            <Box sx={{ flexGrow: 1, display: 'flex' }}>
              <Typography onClick={handleClick} className="centerText" > Your registry instance is at {process.env.REGISTRY_URL ? process.env.REGISTRY_URL : ""} </Typography>
            </Box>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Registry address copied!
              </Alert>
            </Snackbar>
  
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={(event) => {setAnchorElUser(event.currentTarget)}} sx={{ p: 0 }}>
                    <Avatar alt={auth['username']} src="/pic.png" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Account</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
};

export default NavBar;