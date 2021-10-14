<script lang="ts">
    import interact from "interactjs";
    import { positions, offsets } from "../stores.js";
    import { onMount } from "svelte";
    const interactable = interact(`#window`);
    import itemHeight from "../data/itemHeight.js";

    const gridTarget = interact.snappers.grid({
        x: 1,
        y: itemHeight,
    });

    let previousY = 0;
    const updateOffset = () => {
        if (previousY !== $positions.window.y) {
            const diff = $positions.window.y - previousY;
            const numItems = diff / itemHeight;
            offsets.update((offsets) => ({
                ...offsets,
                window: offsets.window + numItems,
            }));
            previousY = $positions.window.y;
        }
    };

    const moveWindow = (dx, dy, windowElement) => {
        positions.update((positions) => ({
            ...positions,
            window: {
                x: positions.window.x + dx,
                y: positions.window.y + dy,
            },
        }));
        windowElement.style.transform = `translate(${$positions.window.x}px, ${$positions.window.y}px)`;
    };

    onMount(() => {
        const windowElement = document.querySelector("#window");
        moveWindow(0, window.innerHeight / 2, windowElement);
    });

    interactable.draggable({
        lockAxis: "y",
        listeners: {
            move(e) {
                moveWindow(e.dx, e.dy, e.target);
                updateOffset();
            },
        },
        modifiers: [
            interact.modifiers.snap({
                offset: "parent",
                relativePoints: [{ x: 0, y: 0 }],
                targets: [gridTarget],
            }),
        ],
    });
</script>

<div id="window" style="--item-height: {itemHeight}px" />

<style>
    #window {
        border: 1px solid red;
        height: var(--item-height);
        width: 300px;
        position: absolute;
        margin-left: -50px;
    }
</style>
