import { writable, derived } from "svelte/store";

export const selectedPreset = writable("interval");

export const rulers = writable({});
export const rulerIDs = writable([]); // ruler IDs in order from left to right

export const windowPosition = writable(0);

// helper function to handle taking mod of negative numbers
const mod = (n, m) => ((n % m) + m) % m;

export const inWindow = derived(
    [rulers, windowPosition],
    ([rulers, windowPosition]) => {
        let items = [];
        for (const key in rulers) {
            const ruler = rulers[key];
            const diff = windowPosition - ruler.position;
            let itemInWindow = ruler.items[mod(diff, ruler.items.length)];
            if (diff < 0 || diff >= ruler.items.length) {
                // first condition is ruler being above window, second is below
                itemInWindow = "N/A";
            }
            items.push([ruler.type, itemInWindow]);
        }
        return items;
    }
);
