import { writable, derived } from 'svelte/store';
import rulerItems from "./data/items.js";

export const positions = writable({
    pitch: { x: 0, y: 0 },
    number: { x: 0, y: 0 },
    window: { x: 0, y: 0 },
});

export const visibleItems = writable({
    pitch: [],
    number: [],
})

export const offsets = writable({
    window: 0,
    pitch: 0,
    number: 0
});

const rulers = ["pitch", "number"];
export const inWindow = derived(
    offsets,
    ($offsets) => {
        let items = [];
        rulers.forEach((ruler) => {
            const index = ($offsets.window - $offsets[ruler]) % rulerItems[ruler].length;
            const item = rulerItems[ruler][index];
            items.push([ruler, item]);
        });
        return items;
    }
);