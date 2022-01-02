<script lang="ts">
    import { inWindow, rulers, rulerIDs, windowPosition } from "../../stores";

    let written: string, concert: string, transposition: string;
    $: {
        if ($inWindow.length !== 0) {
            [written, concert] = $inWindow.map((tup) => tup[1]);
            transposition = getTransposition() || "N/A";
        }
    }

    const getTransposition = () => {
        // find diff between written C and window
        // apply that diff to concert pitch
        const diff = 11 - $windowPosition; // 11 is index of one of the Cs
        const concertRulerItems = $rulers[$rulerIDs[1]].items;
        const concertIndex = concertRulerItems.indexOf(concert);
        return concertRulerItems[concertIndex + diff];
    };
</script>

<p class="description">
    See the mappings between written and concert pitches for transposing
    instruments.
</p>

<p>
    For an instrument in B♭, for example, align B♭ in the right ruler (concert
    pitch) with <span class="inline_highlight">C</span> in the left ruler
    (written pitch). Use the
    <span class="inline_cursor">cursor</span> to see corresponding notes.
</p>

<ul>
    <li>Instrument in <span class="dynamic">{transposition}</span></li>
    <li>Written <span class="dynamic">{written}</span></li>
    <li>Concert <span class="dynamic">{concert}</span></li>
</ul>
