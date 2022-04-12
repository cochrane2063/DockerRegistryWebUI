import axios from "./api/axios"
import React from "react";
import { FcLinux } from "react-icons/fc";
import { FaWindows } from "react-icons/fa";

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

const printMonth = (month: number): string => {
    switch (month) {
        case 0:return "Jan";break;
        case 1:return "Feb";break;
        case 2:return "Mar";break;
        case 3:return "Apr";break;
        case 4:return "May";break;
        case 5:return "Jun";break;
        case 6:return "Jul";break;
        case 7:return "Aug";break;
        case 8:return "Sep";break;
        case 9:return "Oct";break;
        case 10:return "Nov";break;
        case 11:return "Dec";break;
        default:return "" + month;break;
    }
}

const toUpperFirst= (s: string):string => {
    if (s.length > 0) {
        return s[0].toUpperCase() + s.substring(1);
    } else {
        return s;
    }
};

const getHostNameFromURL = (url: string): string => {
    const urlSplit = url.split('/');
    return urlSplit[urlSplit.length - 1];
}

const printTwoDecimalPlaces = (num: number): string => {
    return (Math.round(num * 100) / 100).toFixed(2);
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

const printSize = (sizeInByte: number): string => {
    if (sizeInByte < 1073741824) {
        return printTwoDecimalPlaces(sizeInByte / 1048576) + " MiB";
    } else {
        return printTwoDecimalPlaces(sizeInByte / 1073741824) + " GiB";
    }
};

const PrintOSIcon: React.FC<{ className: string, os: string }> = ({ className, os }) => {
    if (os === "linux") {
        return <FcLinux className={className} />
    } else if (os === "windows") {
        return <FaWindows className={className} />
    } else {
        return <div className={className}>os</div>;
    }
}

export { checkValidURL, printTwoDecimalPlaces, printTimePassed, printSize, getHostNameFromURL, PrintOSIcon, toUpperFirst, printMonth };