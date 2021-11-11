import { writable, derived } from 'svelte/store';
import rulerItems from "./data/items.js";
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
const windowOffset = derived(windowPosition, ($windowPosition) => ($windowPosition / itemHeight));

const mod = (n, m) => ((n % m) + m) % m;
export const rulerInfo = derived([rulers, windowOffset], ([$rulers, $windowOffset]) => {
    let info = {};
    /*
    for (ruler in $rulers) {
        console.log(ruler);
        const items = rulerItems[ruler.type];
        const rulerLength = items.length;
        const rulerOffset = ruler.position / itemHeight;

        info[ruler.type] = {
            position: ruler.position,
            offset: rulerOffset,
            inWindow: items[mod($windowOffset - rulerOffset, rulerLength)]
        }
    }*/
    return info;
})