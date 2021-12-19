<script lang="ts">
    import { rulers } from "../stores.js";
    import allItems from "../data/items.js";
    import itemHeight from "../data/itemHeight.js";
    import interact from "interactjs";
    import { afterUpdate } from "svelte";

    export let id: string;
    let rulerComponent: HTMLElement, type: string, items: string[];
    $: {
        type = $rulers[id].type;
        items = $rulers[id].items;
        if (rulerComponent) {
            // ensure that new rulers appear at position 0, not offset
            rulerComponent.style.transform = `translate(0, ${
                $rulers[id].position * itemHeight
            }px)`;
        }
    }
    const gridTarget = interact.snappers.grid({
        x: 1,
        y: itemHeight,
    });

    const moveRuler = (dy: number, rulerElement: HTMLElement) => {
        // update `position` property of ruler in store
        rulers.update((rulers) => ({
            ...rulers,
            [id]: {
                ...rulers[id],
                position: rulers[id].position + dy / itemHeight,
            },
        }));
        // move ruler on the screen
        rulerElement.style.transform = `translate(0, ${
            $rulers[id].position * itemHeight
        }px)`;
    };

    // event handler for up/down arrows
    const shift = (e, down = false) =>
        moveRuler(
            down ? itemHeight : -itemHeight,
            document.getElementById(e.target.dataset.rulerId)
        );

    afterUpdate(async () => {
        // make ruler take up full height of viewport
        if ($rulers[id].items.length != 0) {
            return;
        }
        if (type === "interval") {
            rulers.update((rulers) => ({
                ...rulers,
                [id]: {
                    ...rulers[id],
                    items: allItems.interval,
                },
            }));
        } else {
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
        }

        const interactable = interact(`#${id}`);
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

    const getClasses = (item: string) => {
        let classes = [];
        if (type === "interval" && item === "P1") {
            classes.push("highlighted_P1");
        }
        if (type === "position" && parseInt(item)) {
            classes.push("highlighted_diatonic");
        }
        return classes.join(" ");
    };
</script>

<div class="ruler_container no_select">
    <div class="button_container" id="top_button_container">
        <button on:click={(e) => shift(e)} data-ruler-id={id}>
            <div class="triangle" id="top_triangle" />
        </button>
    </div>
    <div class="ruler_parent">
        <!-- direct parent to use as snap grid offset -->
        <div class="ruler" {id} bind:this={rulerComponent}>
            {#each items as item}
                <div class="item {getClasses(item)}">
                    <span class="label">{@html item}</span>
                    <hr class="mark" />
                </div>
            {/each}
        </div>
    </div>
    <div class="button_container" id="bottom_button_container">
        <button on:click={(e) => shift(e, true)} data-ruler-id={id}>
            <div class="triangle" id="bottom_triangle" />
        </button>
    </div>
</div>

<style>
    .highlighted_P1 {
        color: red;
    }
    .highlighted_P1 .label {
    }
    .highlighted_P1 .mark {
        border-color: red;
    }

    .highlighted_diatonic {
        background: #555;
    }
    .highlighted_diatonic .label {
        background: #555;
        color: #fefefe;
    }
    .highlighted_diatonic .mark {
        border-color: white;
    }

    .button_container {
        position: absolute;
        width: 100%;
        z-index: 1;
        padding: 0.25rem 0 1.5rem;
        border: none;
        background: linear-gradient(
            rgba(255, 255, 255, 1) 60%,
            rgba(255, 255, 255, 0)
        );
        display: flex;
        justify-content: center;
        cursor: pointer;
    }
    #bottom_button_container {
        bottom: 0;
        padding: 1.5rem 0 0.25rem;
        background: linear-gradient(
            to top,
            rgba(255, 255, 255, 1) 60%,
            rgba(255, 255, 255, 0)
        );
    }

    .triangle {
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        margin: -1px auto 0;
    }
    #top_triangle {
        border-bottom: 12px solid #999;
    }
    #bottom_triangle {
        border-top: 12px solid #999;
        margin: 1px auto 0;
    }

    button {
        width: 130px;
        height: 35px;
        background: #efefef;
        border: none;
        cursor: pointer;
        transition: 0.2s;
    }
    button:hover {
        background: #dedede;
    }

    .ruler_container {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
    }

    .ruler {
        display: flex;
        flex-direction: column;
        text-align: center;
        border: 1px solid #776644;
        border-bottom: none;
        width: 130px;
        position: relative;
        z-index: 0;
        margin: 0 5px;
        background: #fefefe;
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
        background: #fefefe;
        padding: 0 0.25rem;
        font-size: 20px;
        line-height: 1;
        width: max-content;
    }

    .mark {
        position: absolute;
        width: 100%;
        left: 0;
        top: calc(50% + 1px);
        z-index: 0;
        border-top: 1px solid #776644;
        border-bottom: none;
        border-left: none;
        border-right: none;
        margin: 1rem 0;
    }
</style>
