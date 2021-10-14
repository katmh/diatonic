<script lang="ts">
    import { visibleItems, rulers } from "../stores.js";
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
        const idx = $rulers.findIndex((obj) => obj.type === rulerType);
        rulers.update((rulers) => {
            const rulerToUpdate = rulers[idx];
            const updatedRuler = {
                type: rulerType,
                position: rulerToUpdate.position + dy,
            };
            rulers[idx] = updatedRuler;
            return rulers;
        });
        rulerElement.style.transform = `translate(0, ${$rulers[idx].position}px)`;
    };

    interactable.draggable({
        lockAxis: "y",
        listeners: {
            move(e) {
                moveRuler(e.dx, e.dy, e.target);
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

    // event handler for up/down arrows
    // TODO: update position in store
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
