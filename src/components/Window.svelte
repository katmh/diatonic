<script lang="ts">
    import interact from "interactjs";
    import { windowPosition, rulers } from "../stores.js";
    import { onMount } from "svelte";
    const interactable = interact(`#window`);
    import itemHeight from "../data/itemHeight.js";

    const windowWidth = $rulers.length * 100 + 100; // TODO

    const gridTarget = interact.snappers.grid({
        x: 1,
        y: itemHeight,
    });

    const moveWindow = (_, dy, windowElement) => {
        windowPosition.update((position) => position + dy);
        windowElement.style.transform = `translate(0px, ${$windowPosition}px)`;
    };

    onMount(() => {
        // initialize window about halfway down the page
        // initial position should be on itemHeight grid
        const windowElement = document.querySelector("#window");
        moveWindow(
            0,
            (Math.floor(window.innerHeight / itemHeight) / 2) * itemHeight,
            windowElement
        );
    });

    interactable.draggable({
        lockAxis: "y",
        listeners: {
            move(e) {
                moveWindow(e.dx, e.dy, e.target);
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

<div
    id="window"
    style="--item-height: {itemHeight}px; --window-width: {windowWidth}px;"
/>

<style>
    #window {
        border: 1px solid red;
        height: var(--item-height);
        width: var(--window-width);
        position: absolute;
        margin-left: -50px;
    }
</style>
