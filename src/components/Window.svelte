<script lang="ts">
    import interact from "interactjs";
    import { windowPosition, rulers } from "../stores.js";
    import { onMount } from "svelte";
    const interactable = interact(`#window`);
    import itemHeight from "../data/itemHeight.js";

    $: numRulers = Object.keys($rulers).length;
    $: windowWidth = numRulers * 110 + (numRulers - 1) * 10 + 40;

    const moveWindow = (dy, windowElement) => {
        windowPosition.update((position) => position + dy / itemHeight);
        windowElement.style.transform = `translate(0px, ${
            $windowPosition * itemHeight
        }px)`;
    };

    const gridTarget = interact.snappers.grid({
        x: 1,
        y: itemHeight,
    });
    interactable.draggable({
        lockAxis: "y",
        listeners: {
            move(e) {
                moveWindow(e.dy, e.target);
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

    onMount(() => {
        // initialize window about halfway down the page
        // initial position should be on itemHeight grid
        const windowElement = document.querySelector("#window");
        moveWindow(
            (Math.floor(window.innerHeight / itemHeight) / 2) * itemHeight,
            windowElement
        );
    });
</script>

<div
    id="window"
    style="--item-height: {itemHeight}px; --window-width: {windowWidth}px;"
/>

<style>
    #window {
        border: 2px solid #bb9955;
        border-right-width: 20px;
        border-left-width: 20px;
        height: var(--item-height);
        width: var(--window-width);
        position: absolute;
        z-index: 1;
        background: rgba(240, 220, 150, 0.3);
    }
</style>
