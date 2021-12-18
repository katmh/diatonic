import { writable, derived } from 'svelte/store';
import allItems from "./data/items";
import presets from "./data/presets";

export const selectedPreset = writable(presets[0].name);

export const rulers = writable({})

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