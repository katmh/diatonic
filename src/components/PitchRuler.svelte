<script lang="ts">
    import Ruler from "./Ruler.svelte";

    const semitones = [
        "B",
        "A#/Bb",
        "A",
        "G#/Ab",
        "G",
        "F#/Gb",
        "F",
        "E",
        "D#/Eb",
        "D",
        "C#/Db",
        "C",
    ];
</script>

<Ruler rulerType="pitch" items={semitones} />
