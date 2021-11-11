import { writable, derived } from 'svelte/store';
import rulerItems from "./data/items.js";
import itemHeight from "./data/itemHeight.js";
import generateID from "./utils/ID.js";

// TODO: ruler unique IDs so we can have e.g. multiple "number"-type rulers
export const rulers = writable([
    {
        id: generateID(),
        type: "pitch",
        position: 0,
    },
    {
        id: generateID(),
        type: "number",
        position: 0,
    },
    {
        id: generateID(),
        type: "interval",
        position: 0,
    }
]);

export const windowPosition = writable(0);
const windowOffset = derived(windowPosition, ($windowPosition) => ($windowPosition / itemHeight));

const mod = (n, m) => ((n % m) + m) % m;
export const rulerInfo = derived([rulers, windowOffset], ([$rulers, $windowOffset]) => {
    let info = {};
    $rulers.forEach((ruler) => {
        const items = rulerItems[ruler.type];
        const rulerLength = items.length;
        const rulerOffset = ruler.position / itemHeight;

        info[ruler.type] = {
            position: ruler.position,
            offset: rulerOffset,
            inWindow: items[mod($windowOffset - rulerOffset, rulerLength)]
        }
    })
    return info;
})


// for infinite ruler / managing what's on the page
export const visibleItems = writable({
    pitch: [],
    number: [],
    interval: [],
})