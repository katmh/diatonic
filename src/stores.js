import { writable } from 'svelte/store';

export const positions = writable({
    pitch: { x: 0, y: 0 },
    number: { x: 0, y: 0 },
    window: { x: 0, y: 0 },
});