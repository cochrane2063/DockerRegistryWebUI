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

const printTimePassed = (date: Date): string => {
    const currentTime = Date.now();
    const secondsPassed = (currentTime - date.getTime()) / 1000;
    if (secondsPassed >= 1) {
        if (secondsPassed < 60) {
            return Math.floor(secondsPassed) + (secondsPassed < 2 ? " second ago" : " seconds ago");
        } else if (secondsPassed < 3600) {
            return Math.floor(secondsPassed / 60) + (secondsPassed < 120 ? " minute ago" : " minutes ago");
        } else if (secondsPassed < 86400) {
            return Math.floor(secondsPassed / 3600) + (secondsPassed < 7200 ? " hour age" : " hours ago");
        } else if (secondsPassed < 2629756.8) {
            return Math.floor(secondsPassed / 86400) + (secondsPassed < 172800 ? " day ago" : " days ago");
        } else if (secondsPassed < 31557600) {
            return Math.floor(secondsPassed / 2629756.8) + (secondsPassed < 5259513.6 ? " month ago" : " months ago");
        } else {
            return Math.floor(secondsPassed / 31557600) + (secondsPassed < 63115200 ? " year ago" : " years ago");
        }
    } else {
        return "just now";
    }
};

export { checkValidURL , printTimePassed };