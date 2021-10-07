<script lang="ts">
    import interact from "interactjs";
    import { positions, offsets } from "../stores.js";
    const interactable = interact(`#window`);

    const itemHeight = 37; // TODO: put this in store or data file

    const gridTarget = interact.snappers.grid({
        x: 1,
        y: itemHeight,
    });

    let previousY = 0;
    const updateOffset = () => {
        if (previousY !== $positions.window.y) {
            const diff = $positions.window.y - previousY;
            const numItems = diff / itemHeight;
            offsets.update((offsets) => ({
                ...offsets,
                window: offsets.window + numItems,
            }));
            previousY = $positions.window.y;
        }
    };

    const moveWindow = (dx, dy, windowElement) => {
        positions.update((positions) => ({
            ...positions,
            window: {
                x: positions.window.x + dx,
                y: positions.window.y + dy,
            },
        }));
        windowElement.style.transform = `translate(${$positions.window.x}px, ${$positions.window.y}px)`;
    };

    interactable.draggable({
        lockAxis: "y",
        listeners: {
            move(e) {
                moveWindow(e.dx, e.dy, e.target);
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
