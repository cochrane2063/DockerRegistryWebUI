import React from "react";

interface Props {
    repositoryName: string;
}

const NotFound: React.FC<Props> = (props: Props) => {
    return(
        <h1>Repository "{props.repositoryName}" Not Found!</h1>
    );
};

export default NotFound;