<script lang="ts">
    import Vex from "vexflow";
    import { onMount } from "svelte";
    import {
        pitchLabelToMajorKey,
        majorKeyStartNotes,
    } from "../../data/keySignatures";
    import getAt from "../../utils/getAt.js";
    import { rulers, rulerIDs } from "../../stores";

    let notationContainer: HTMLElement;
    let VF, renderer, context;
    onMount(() => {
        notationContainer = document.querySelector("#notation");
        VF = Vex.Flow;
        renderer = new VF.Renderer(notationContainer, VF.Renderer.Backends.SVG);
        renderer.resize(200, 140);
        context = renderer.getContext();
    });

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

        if (notationContainer) {
            context.clear();
            const treble = new VF.Stave(0, 0, 200, { space_above_staff_ln: 2 }); // x, y, width
            const keyToUse = keySignatures[0].major
                .replace("♯", "#")
                .replace("♭", "b");
            treble.addClef("treble").addKeySignature(keyToUse);
            const bass = new VF.Stave(0, 90, 200, { space_above_staff_ln: 0 });
            bass.addClef("bass").addKeySignature(keyToUse);
            treble.setContext(context).draw();
            bass.setContext(context).draw();
        }
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

<div id="notation" />

<p>
    Key signature corresponds to the keys <span class="dynamic"
        >{keySignatures[0].major} major</span
    >
    or <span class="dynamic">{keySignatures[0].minor} minor</span>
</p>

<style>
    #notation :global(svg) {
        width: 100%;
    }
</style>
