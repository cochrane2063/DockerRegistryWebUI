import React from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem , Tooltip, Avatar, Snackbar, Alert} from "@mui/material";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useRepositories from "../../hooks/useRepositories";
import { loginInfo } from "../../context/AuthProvider";
import Tag from "../../interfaces/Tag";
import Repository from "../../interfaces/Repositoriy";
import Layer from "../../interfaces/Layer";
import { getHostNameFromURL } from "../../utils";

const NavBar: React.FC = () => {
    const { auth } = useAuth();
    const { setIsFetched, setRepositories } = useRepositories();
    const [anchorElUser, setAnchorElUser] = React.useState<(EventTarget & HTMLButtonElement) | null>(null);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const handleClick = () => {
      const url = process.env.REGISTRY_URL ? process.env.REGISTRY_URL : "";
      navigator.clipboard.writeText(getHostNameFromURL(url));
      setSnackbarOpen(true);
    };

    const handleClose = () => {
      setSnackbarOpen(false);
    };

    
    const getTagInfo = async(newRepositories: Repository[], auth: loginInfo) => {
      let promises: Promise<void>[] = [];
      newRepositories.forEach((repository: Repository) => {
          repository.tags.forEach((tag: Tag) => {
              let promise = axios.get(
                  "/" + repository.name + "/manifests/" + tag.label,
                  {
                      headers:{
                          Accept: "application/vnd.docker.distribution.manifest.v2+json",
                      },
                      auth: {
                          username: auth.username,
                          password: auth.password
                      }
                  }
              ).then((response) => {
                  tag.schemaVersion = response?.data['schemaVersion'];
                  tag.mediaType = response?.data['mediaType'];
                  tag.digest = response?.headers['docker-content-digest'];
                  tag.config = response?.data?.config;
                  tag.layers = response?.data?.layers;
                  let size = 0;
                  response?.data?.layers.forEach((layer: Layer) => {
                      size += layer.size;
                  });
                  tag.size = size;
                  return axios.get(
                      "/" + repository.name + "/blobs/" + response?.data?.config['digest'],
                      {
                          headers:{
                              Accept: "application/vnd.docker.distribution.manifest.v2+json",
                          },
                          auth: {
                              username: auth.username,
                              password: auth.password
                          }
                      }
                  ).then((res) => {
                      tag.architecture = res?.data?.architecture;
                      tag.os = res?.data?.os;
                      tag.created = new Date(res?.data?.created);
                  }).catch((err) => {
                    const index = repository.tags.indexOf(tag);
                    if (index > -1) {
                      repository.tags.splice(index, 1);
                    }
                  });
              }).catch((err) => {
                const index = repository.tags.indexOf(tag);
                if (index > -1) {
                  repository.tags.splice(index, 1);
                }
              });
              promises.push(promise);
          });
      });
      return Promise.all(promises);
    };

    const getTags = async(newRepositories: Repository[], auth: loginInfo) => {
      let promises: Promise<void>[] = [];
      newRepositories.forEach((repository: Repository) => {
          let promise = axios.get(
              "/" + repository.name + "/tags/list",
              {
                  auth: {
                      username: auth.username,
                      password: auth.password
                  }
              }
          ).then((res) => {
              let tags: Tag[] = [];
              res?.data?.tags.forEach((tagLabel: string) => {
                  let tag: Tag = {
                      label: tagLabel,
                      architecture: "",
                      os: "",
                      created: undefined,
                      schemaVersion: undefined,
                      mediaType: "",
                      config: undefined,
                      layers: undefined,
                      size: undefined,
                      digest: ""
                  }
                  tags.push(tag);
              });
              repository.tags = tags;
          }).catch((err) => {
            const index = newRepositories.indexOf(repository);
            if (index > -1) {
              newRepositories.splice(index, 1);
            }
          });
          promises.push(promise);
      });
      await Promise.all(promises);
      return getTagInfo(newRepositories, auth);
    };

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
      await getTags(newRepositories, auth)
      
      setRepositories(newRepositories);
      setIsFetched(true);
      // setRepositories(newRepositories);

    };

    useEffect(() => {
        setInterval(() => listRepositories(), 1000);
    }, []);
  
    return (
      <AppBar className="navbar" position="static">
        <Container maxWidth={false} sx={{ m: 0, width: '100%' }}>
          <Toolbar disableGutters>
            <Typography
              className="homeLink"
              variant="h6"
              noWrap
              component={NavLink}
              to="/"
              sx={{ mr: 2, display: 'flex', textDecoration: "none" }}
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