<script lang="ts">
    import interact from "interactjs";
    import { positions } from "../stores.js";
    const interactable = interact(`#window`);
    const gridTarget = interact.snappers.grid({
        x: 1,
        y: 37,
    });
    interactable.draggable({
        lockAxis: "y",
        listeners: {
            move(e) {
                positions.update((positions) => ({
                    ...positions,
                    window: {
                        x: positions.window.x + e.dx,
                        y: positions.window.y + e.dy,
                    },
                }));
                e.target.style.transform = `translate(${$positions.window.x}px, ${$positions.window.y}px)`;
            },
        },
        modifiers: [
            interact.modifiers.snap({
                targets: [gridTarget],
            }),
        ],
    });
</script>

<div id="window" />

<style>
    #window {
        border: 1px solid red;
        height: 37px;
        width: 300px;
        position: absolute;
        margin-left: -50px;
    }
</style>
