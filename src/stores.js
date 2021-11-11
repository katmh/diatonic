import { writable, derived } from 'svelte/store';
import allItems from "./data/items.js";
import itemHeight from "./data/itemHeight.js";
import generateID from "./utils/ID.js";

export const rulers = writable({
    [generateID()]: {
        type: "pitch",
        position: 0,
        items: []
    },
    [generateID()]: {
        type: "number",
        position: 0,
        items: []
    },
    [generateID()]: {
        type: "interval",
        position: 0,
        items: []
    }
})

export const windowPosition = writable(0);

const mod = (n, m) => ((n % m) + m) % m;
export const inWindow = derived([rulers, windowPosition], ([rulers, windowPosition]) => {
    let items = {};
    for (const key in rulers) {
        const ruler = rulers[key];
        const itemInWindow = allItems[ruler.type][mod(windowPosition - ruler.position, allItems[ruler.type].length)];
        items[key] = itemInWindow;
    }
    return items;
})