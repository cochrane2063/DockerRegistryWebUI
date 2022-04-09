interface Tag {
    label: string;
    architecture: string;
    os: string;
    created: Date | undefined;
    digest: string;
}

export default Tag;