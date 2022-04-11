import Layer from "./Layer"

interface Config {
    mediaType: string;
    size: number;
    digest: string;
};

interface Tag {
    label: string;
    architecture: string;
    os: string;
    created: Date | undefined;
    schemaVersion: number | undefined;
    mediaType: string;
    config: Config | undefined;
    layers: Layer[] | undefined;
    size: number | undefined;
    digest: string;
}

export default Tag;