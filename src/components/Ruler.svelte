<script lang="ts">
    import { rulers } from "../stores.js";
    import allItems from "../data/items.js";
    import itemHeight from "../data/itemHeight.js";
    import interact from "interactjs";
    import { beforeUpdate, afterUpdate } from "svelte";
    import getAt from "../utils/getAt.js";

    export let id: string;
    const type = $rulers[id].type;
    $: items = $rulers[id].items;
    let interactable;
    const gridTarget = interact.snappers.grid({
        x: 1,
        y: itemHeight,
    });

    const moveRuler = (dy: number) => {
        // infinite ruler:
        // abs(dy) is always itemHeight
        // -dy (move up) => add -1 items to top, add +1 items to bottom
        // +dy (move down) => add +1 items to top, add -1 items to bottom
        let newItems;
        if (dy < 0) {
            const currentLastItem = getAt($rulers[id].items, -1);
            const nextItem = getAt(
                allItems[type],
                (allItems[type].indexOf(currentLastItem) + 1) %
                    allItems[type].length
            );
            newItems = $rulers[id].items.slice(1).concat([nextItem]);
        } else if (dy > 0) {
            const currentFirstItem = $rulers[id].items[0];
            const previousItem = getAt(
                allItems[type],
                (allItems[type].indexOf(currentFirstItem) - 1) %
                    allItems[type].length
            );
            newItems = [previousItem].concat(
                $rulers[id].items.slice(0, $rulers[id].items.length - 1)
            );
        }

        // update `position` property of ruler in store
        rulers.update((rulers) => ({
            ...rulers,
            [id]: {
                ...rulers[id],
                position: rulers[id].position + dy / itemHeight,
                items: newItems ?? rulers[id].items, // don't replace if dy == 0
            },
        }));
    };

    // event handler for up/down arrows
    const shift = (down = false) => moveRuler(down ? itemHeight : -itemHeight);

    beforeUpdate(async () => {
        if ($rulers[id].items.length != 0) {
            return;
        }
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
        interactable = undefined;
    });

    afterUpdate(async () => {
        if (interactable) {
            return;
        }
        items = $rulers[id].items; // force update
        interactable = interact(`#${id}`);
        interactable.draggable({
            lockAxis: "y",
            listeners: {
                move(e) {
                    moveRuler(e.dy);
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
    <button id="top_button" on:click={() => shift()} data-ruler-id={id}
        >up</button
    >
    <div class="ruler_parent">
        <!-- direct parent to use as snap grid offset -->
        <div class="ruler" {id}>
            {#each items as item}
                <div class="item">
                    <span class="label">{item}</span>
                    <hr class="mark" />
                </div>
            {/each}
        </div>
    </div>
    <button id="bottom_button" on:click={() => shift(true)} data-ruler-id={id}
        >down</button
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
