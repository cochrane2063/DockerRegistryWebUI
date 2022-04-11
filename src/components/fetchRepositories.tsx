import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useRepositories from "../hooks/useRepositories";
import { loginInfo } from "../context/AuthProvider";
import Tag from "../interfaces/Tag";
import Repository from "../interfaces/Repositoriy";
import Layer from "../interfaces/Layer";

// const [repositories, setRepositories] = useState<Repository[]>([]);

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
                });
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
        });
        promises.push(promise);
    });
    await Promise.all(promises);
    return getTagInfo(newRepositories, auth);
};

const listRepositories = async() => {
    const { auth } = useAuth();
    const { setRepositories } = useRepositories();

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
    // setRepositories(newRepositories);

};

export { listRepositories };