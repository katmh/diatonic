import itemHeight from "../data/itemHeight.js";

const itemsInFractionalHeight = (f: number) => {
    // given a fraction f between 0 and 1,
    // returns an approximate number of ruler items
    // that can fit in f * height of screen
    return Math.floor((window.innerHeight * f) / itemHeight);
};

export default itemsInFractionalHeight;
