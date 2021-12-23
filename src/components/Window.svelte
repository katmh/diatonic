<script lang="ts">
    import { onMount } from "svelte";
    import interact from "interactjs";
    import itemHeight from "../data/itemHeight.js";
    import { windowPosition, rulers, rulerIDs } from "../stores.js";
    import itemsInFractionalHeight from "../utils/itemsInFractionalHeight.js";

    const interactable = interact(`#window`);
    let windowElement;

    const moveWindow = (dy, windowElement) => {
        // prevent window from moving past the endpoints of any ruler
        for (let ID of $rulerIDs) {
            /**
             * if position <= 0, could have empty space below
             *   else, could have empty space above or below
             *
             * empty space below => window can't move down
             *   if window position is (# ruler items + ruler position)
             *
             * empty space above => window can't move up
             *   if window position is ruler position (i.e. they start at the same place)
             */
            const ruler = $rulers[ID];
            if (ruler.items.length === 0) {
                continue;
            }
            if (
                $windowPosition === ruler.items.length + ruler.position - 1 &&
                dy > 0
            ) {
                windowElement.classList.add("resist_pull_down");
                setTimeout(() => {
                    windowElement.classList.remove("resist_pull_down");
                }, 50);
                return;
            }
            if (ruler.position > 0) {
                if ($windowPosition === ruler.position && dy < 0) {
                    windowElement.classList.add("resist_pull_up");
                    setTimeout(() => {
                        windowElement.classList.remove("resist_pull_up");
                    }, 50);
                    return;
                }
            }
        }

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
        windowElement = document.querySelector("#window");
        const itemsInHalfHeight = itemsInFractionalHeight(0.5);
        moveWindow(itemsInHalfHeight * itemHeight, windowElement);
    });
</script>

<div id="window" style="--item-height: {itemHeight}px" />

<style>
    #window {
        border: 2px solid #9791cf;
        border-right-width: 20px;
        border-left-width: 20px;
        border-radius: 5px;
        height: var(--item-height);
        width: calc(100% + 20px);
        position: absolute;
        z-index: 1;
        background: rgba(200, 200, 250, 0.25);
        transition: 0.05s;
    }
</style>
