<script lang="ts">
    import getAt from "../../utils/getAt.js";
    import { rulers, rulerIDs } from "../../stores";
    import {
        pitchLabelToMajorKey,
        majorKeyStartNotes,
    } from "../../data/keySignatures";

    let keySignatures: {
        notes: string;
        major: string;
        minor: string;
    }[];

    $: {
        keySignatures = [];

        const rulerPositionDiff =
            $rulers[$rulerIDs[0]].position - $rulers[$rulerIDs[1]].position;
        const indexOf1 = $rulers[$rulerIDs[1]].items.indexOf("1");
        const startItem = getAt(
            $rulers[$rulerIDs[0]].items,
            indexOf1 - rulerPositionDiff
        );

        let startPitch: string[];
        if (startItem in pitchLabelToMajorKey) {
            startPitch = pitchLabelToMajorKey[startItem];
        } else {
            startPitch = startItem;
        }

        for (let i = 0; i < startPitch.length; i++) {
            const keySignature = majorKeyStartNotes[startPitch[i]];
            keySignatures.push({
                notes: keySignature[0],
                major: startPitch[i],
                minor: keySignature[1],
            });
        }

        console.log(keySignatures);
    }
</script>

<p class="description">
    Find the collection of sharps and flats applied to notes in a scale.
</p>

<p>
    Align a pitch (left ruler) with <span class="inline_highlight">1</span> in
    the position ruler (right). The notes in the scale are the ones that
    correspond to
    <span class="inline_highlight">numbers without accidentals</span>.
</p>

<p />
