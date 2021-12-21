<script lang="ts">
    import { inWindow, rulers } from "../../stores";
    import items from "../../data/items";

    let lowerPitch: string, higherPitch: string, interval: string;
    $: {
        // recompute as $inWindow changes
        if ($inWindow.length !== 0) {
            higherPitch = $inWindow[0][1];
            interval = $inWindow[1][1];
            lowerPitch = getLowerPitch();
        }
    }

    const getLowerPitch = () => {
        // find diff between P1 and current interval,
        // apply that diff to current pitch

        const intervalIndex = items["interval"].indexOf(interval);
        const diff = 24 - intervalIndex; // 24 is index of "P1"

        // my data structures are bad
        const keys = Object.keys($rulers);
        const key =
            keys[keys.findIndex((key) => $rulers[key].type === "pitch")];
        const pitchRulerItems = $rulers[key].items;

        const pitchIndex = pitchRulerItems.indexOf(higherPitch);
        return pitchRulerItems[pitchIndex + diff];
    };
</script>

<p class="description">Measure the distance between any pair of pitches.</p>

<p>
    Align interval <span class="P1_highlight">P1</span> on the interval ruler (right)
    to the desired lower pitch in the pitch ruler (left). Use the cursor to find
    all intervals from that lower pitch.
</p>

<ul>
    <li>Lower pitch: {lowerPitch}</li>
    <li>Higher pitch: {higherPitch}</li>
    <li>Interval: {interval}</li>
</ul>

<style>
    .P1_highlight {
        background: #615e7d;
        color: #fefefe;
        padding: 1px 5px;
        border-radius: 2px;
        letter-spacing: 1px;
    }
</style>
