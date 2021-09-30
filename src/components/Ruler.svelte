<script lang="ts">
    import { positions } from "../stores.js";
    import interact from "interactjs";

    export let rulerType: string;
    export let items: string[];

    const interactable = interact(`#${rulerType}`);

    const gridTarget = interact.snappers.grid({
        x: 1,
        y: 40,
        range: 100,
        offset: { x: 0, y: 8 },
    });

    interactable.draggable({
        lockAxis: "y",
        listeners: {
            move(e) {
                positions.update((positions) => ({
                    ...positions,
                    [rulerType]: {
                        x: positions[rulerType].x + e.dx,
                        y: positions[rulerType].y + e.dy,
                    },
                }));
                e.target.style.transform = `translate(${$positions[rulerType].x}px, ${$positions[rulerType].y}px)`;
            },
        },
        modifiers: [
            interact.modifiers.snap({
                targets: [gridTarget],
            }),
        ],
    });
</script>

<div class="ruler" id={rulerType}>
    {#each items as item}
        <div class="item">
            <span class="label">{item}</span>
            <hr class="mark" />
        </div>
    {/each}
</div>

<style>
    .ruler {
        display: flex;
        flex-direction: column;
        text-align: center;
        border: 1px solid #aaa;
        width: min-content;
        padding: 0.5rem 0;
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
