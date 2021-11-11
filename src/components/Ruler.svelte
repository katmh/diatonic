<script lang="ts">
    import { rulers } from "../stores.js";
    import allItems from "../data/items.js";
    import itemHeight from "../data/itemHeight.js";
    import interact from "interactjs";
    import { onMount } from "svelte";

    export let id: string;

    const type = $rulers[id].type;

    const moveRuler = (dy: number, rulerElement: HTMLElement) => {
        // update `position` property of ruler in store
        // TODO: and `items` (for infinite ruler)
        rulers.update((rulers) => ({
            ...rulers,
            [id]: {
                ...rulers[id],
                position: rulers[id].position + dy,
            },
        }));
        // move the ruler on the screen accordingly
        rulerElement.style.transform = `translate(0, ${$rulers[id].position}px)`;
    };

    // event handler for up/down arrows
    // TODO: update position in store
    const shift = (e, down = false) =>
        moveRuler(
            down ? itemHeight : -itemHeight,
            document.getElementById(e.target.dataset.rulerId)
        );

    onMount(async () => {
        // make ruler take up full height of viewport
        let remainingHeight = window.innerHeight;
        while (remainingHeight > 0) {
            const currentItems = $rulers[id].items;
            const nextItem =
                allItems[type][currentItems.length % allItems[type].length];
            const itemsPlusNextItem = currentItems.concat([nextItem]);
            rulers.update((rulers) => ({
                ...rulers,
                [id]: {
                    ...rulers[id],
                    items: itemsPlusNextItem,
                },
            }));
            remainingHeight -= itemHeight;
        }

        const interactable = interact(`#${id}`);
        const gridTarget = interact.snappers.grid({
            x: 1,
            y: itemHeight,
        });
        interactable.draggable({
            lockAxis: "y",
            listeners: {
                move(e) {
                    moveRuler(e.dy, e.target);
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
    });
</script>

<div class="ruler_container no_select">
    <button id="top_button" on:click={shift} data-ruler-id={id}>up</button>
    <div class="ruler_parent">
        <!-- direct parent to use as snap grid offset -->
        <div class="ruler" {id}>
            {#each $rulers[id].items as item}
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
        data-ruler-id={id}>down</button
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
