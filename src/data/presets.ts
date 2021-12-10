import Interval from "../components/presets/Interval.svelte";
import TransposingInstrument from "../components/presets/TransposingInstrument.svelte";

export default [
    {
        name: "interval",
        label: "Intervals from a pitch",
        rulers: ["pitch", "interval"],
        component: Interval,
    },
    {
        name: "transposition",
        label: "Transposing instrument",
        rulers: ["pitch", "pitch"],
        component: TransposingInstrument,
    },
    {
        name: "key_signature",
        label: "Key signature / diatonic scale",
        rulers: ["pitch", "position"],
    },
    {
        name: "key_signature_modulator",
        label: "Key signature modulation",
        rulers: ["pitch", "position", "position"],
    },
    {
        name: "key",
        label: "Key (key signature and tonic)",
        rulers: ["pitch", "position", "degree"],
    },
]