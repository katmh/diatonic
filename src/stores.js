import { writable, derived } from 'svelte/store';
import rulerItems from "./data/items.js";

const rulers = ["pitch", "number", "interval"];

export const visibleRulers = writable({
    pitch: true,
    number: true,
    interval: true,
})

// for dragging and snapping
export const positions = writable({
    window: { x: 0, y: 0 },
    pitch: { x: 0, y: 0 },
    number: { x: 0, y: 0 },
    interval: { x: 0, y: 0 },
});

// for infinite ruler / managing what's on the page
export const visibleItems = writable({
    pitch: [],
    number: [],
    interval: [],
})

// for detecting what elements are inside the draggable window
export const offsets = writable({
    window: 0,
    pitch: 0,
    number: 0,
    interval: 0,
});

const mod = (n, m) => ((n % m) + m) % m;
export const inWindow = derived(
    offsets,
    ($offsets) => {
        let items = [];
        rulers.forEach((ruler) => {
            let index = mod($offsets.window - $offsets[ruler], rulerItems[ruler].length);
            const item = rulerItems[ruler][index];
            items.push([ruler, item]);
        });
        return items;
    }
);