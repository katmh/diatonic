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

<p>
    <b>Interval</b> measures the distance between any pair of pitches, from the lower
    pitch upward.
</p>

<p>
    Setup: We have pitch and interval rulers. Align interval P1 to the lower
    pitch you want, then use the cursor to find all intervals from there.
</p>

<p>Lower pitch: {lowerPitch}</p>
<p>Higher pitch: {higherPitch}</p>
<p>Interval: {interval}</p>
