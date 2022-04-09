
const digestDisplay = (digest: string): string => {
    let digestInfo = digest.split(':');
    if (digestInfo.length >= 2) {
        return digestInfo[1].slice(0,12);
    }
    return digest;
};

export { digestDisplay };