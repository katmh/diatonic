<script lang="ts">
    import { positions } from "../stores.js";
    import interact from "interactjs";

    export let rulerType: string;
    export let items: string[];

    const interactable = interact(`#${rulerType}`);
    const itemHeight = 37;
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

    const shift = (e, down = false) =>
        moveRuler(
            0,
            down ? itemHeight : -itemHeight,
            document.getElementById(e.target.dataset.rulerId)
        );
</script>

<div class="ruler_container">
    <button on:click={shift} data-ruler-id={rulerType}>up</button>
    <div class="ruler_parent">
        <!-- direct parent to use as snap grid offset -->
        <div class="ruler" id={rulerType}>
            {#each items as item}
                <div class="item">
                    <span class="label">{item}</span>
                    <hr class="mark" />
                </div>
            {/each}
        </div>
    </div>
    <button on:click={(e) => shift(e, true)} data-ruler-id={rulerType}
        >down</button
    >
</div>

<style>
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
        padding: 0.5rem 1.25rem;
    }

    .label {
        position: relative;
        z-index: 1;
        background: #fff;
        padding: 0 0.25rem;
        font: normal 1.25rem/1 system-ui;
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
