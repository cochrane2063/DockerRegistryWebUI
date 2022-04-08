interface Tag {
    label: string;
    architecture: string;
}

interface Repository {
    name: string;
    tags: Tag[];
}

export default Repository;