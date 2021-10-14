<script lang="ts">
    import { positions, visibleItems, offsets } from "../stores.js";
    import allItems from "../data/items.js";
    import itemHeight from "../data/itemHeight.js";
    import interact from "interactjs";
    import { onMount } from "svelte";

    export let rulerType: string;

    onMount(async () => {
        let remainingHeight = window.innerHeight;
        while (remainingHeight > 0) {
            visibleItems.update((visibleItems) => ({
                ...visibleItems,
                [rulerType]: visibleItems[rulerType].concat([
                    allItems[rulerType][
                        visibleItems[rulerType].length %
                            allItems[rulerType].length
                    ],
                ]),
            }));
            remainingHeight -= itemHeight;
        }
    });

    const interactable = interact(`#${rulerType}`);
    const gridTarget = interact.snappers.grid({
        x: 1,
        y: itemHeight,
    });

    const moveRuler = (dx, dy, rulerElement) => {
        positions.update((positions) => ({
            ...positions,
            [rulerType]: {
                x: positions[rulerType].x + dx,
                y: positions[rulerType].y + dy,
            },
        }));
        rulerElement.style.transform = `translate(${$positions[rulerType].x}px, ${$positions[rulerType].y}px)`;
    };

    let previousY = 0;
    const updateOffset = () => {
        if (previousY !== $positions[rulerType].y) {
            const diff = $positions[rulerType].y - previousY;
            const numItems = diff / itemHeight;
            offsets.update((offsets) => ({
                ...offsets,
                [rulerType]: offsets[rulerType] + numItems,
            }));
            previousY = $positions[rulerType].y;
        }
    };

    interactable.draggable({
        lockAxis: "y",
        listeners: {
            move(e) {
                moveRuler(e.dx, e.dy, e.target);
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

    const shift = (e, down = false) =>
        moveRuler(
            0,
            down ? itemHeight : -itemHeight,
            document.getElementById(e.target.dataset.rulerId)
        );
</script>

<div class="ruler_container no_select">
    <button id="top_button" on:click={shift} data-ruler-id={rulerType}
        >up</button
    >
    <div class="ruler_parent">
        <!-- direct parent to use as snap grid offset -->
        <div class="ruler" id={rulerType}>
            {#each $visibleItems[rulerType] as item}
                <div class="item">
                    <span class="label">{item}</span>
                    <hr class="mark" />
                </div>
            {/each}
        </div>
    </div>
    <button
        id="bottom_button"
        on:click={(e) => shift(e, true)}
        data-ruler-id={rulerType}>down</button
    >
</div>

<style>
    button {
        position: absolute;
    }

    #bottom_button {
        bottom: 0;
    }

    .ruler_container {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    button {
        z-index: 1;
    }

    .ruler {
        display: flex;
        flex-direction: column;
        text-align: center;
        border: 1px solid #aaa;
        width: min-content;
    }

    .item {
        position: relative;
        padding: 8px 20px;
        display: flex;
        justify-content: center;
    }

    .label {
        display: block;
        position: relative;
        z-index: 1;
        background: #fff;
        padding: 0 0.25rem;
        font: normal 20px/1 system-ui;
        width: max-content;
    }

    .mark {
        position: absolute;
        width: 100%;
        left: 0;
        top: 50%;
        z-index: 0;
        border: 1px solid #ccc;
    }
</style>
