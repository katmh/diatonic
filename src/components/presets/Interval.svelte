<script lang="ts">
    import { inWindow, rulers, rulerIDs, windowPosition } from "../../stores";
    import items from "../../data/items";

    let lowerPitch: string, higherPitch: string, interval: string;
    $: {
        if ($inWindow.length !== 0) {
            [higherPitch, interval] = $inWindow.map((tup) => tup[1]);
            lowerPitch = getLowerPitch() || "N/A";
        }
    }

    const getLowerPitch = () => {
        // find diff between P1 and current interval
        // apply that diff to current pitch
        const diff = 24 - items["interval"].indexOf(interval); // 24 is index of "P1"
        const pitchRulerItems = $rulers[$rulerIDs[0]].items;
        const pitchIndex = pitchRulerItems.indexOf(higherPitch);
        return pitchRulerItems[pitchIndex + diff];
    };
</script>

<p class="description">Measure the distances between any pair of pitches.</p>

<p>
    Align interval <span class="inline_highlight">P1</span> in the interval
    ruler (right) to the desired lower pitch in the pitch ruler (left). Use the
    <span class="inline_cursor">cursor</span> to find all intervals from that lower
    pitch.
</p>

<ul>
    <li>Lower pitch: <span class="dynamic">{lowerPitch}</span></li>
    <li>Higher pitch: <span class="dynamic">{higherPitch}</span></li>
    <li>Interval: <span class="dynamic">{interval}</span></li>
</ul>
