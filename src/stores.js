import { writable, derived } from 'svelte/store';
import allItems from "./data/items.js";
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

// helper function to handle taking mod of negative numbers
const mod = (n, m) => ((n % m) + m) % m;

export const inWindow = derived([rulers, windowPosition], ([rulers, windowPosition]) => {
    let items = {};
    for (const key in rulers) {
        const ruler = rulers[key];
        let itemInWindow = allItems[ruler.type][mod(windowPosition - ruler.position, allItems[ruler.type].length)];
        if (ruler.type === "interval") { 
            if (windowPosition - ruler.position < 0 || windowPosition - ruler.position >= allItems["interval"].length) {
                itemInWindow = "N/A";
            }
        }
        items[key] = itemInWindow;
    }
    return items;
})