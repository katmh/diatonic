const getAt = (arr: any[], i: number) => {
    if (i >= 0 && i < arr.length) {
        return arr[i];
    }
    if (i >= arr.length) {
        return arr[i % arr.length];
    }
    // i < 0
    return arr[arr.length - (-i % arr.length)];
}

export default getAt;