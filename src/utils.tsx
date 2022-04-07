import axios from "./api/axios"

const checkValidURL = async (url: string) => {
    try {
        let response = await axios.get(
            `/`
        );
        console.log(url);
    } catch (error: any) {
        console.log(error);
        if (error.response !== undefined) {
            return false;
        }
    }
    return true;
}

export { checkValidURL };