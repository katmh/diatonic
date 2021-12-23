import Interval from "../components/presets/Interval.svelte";
import TransposingInstrument from "../components/presets/TransposingInstrument.svelte";
import KeySignature from "../components/presets/KeySignature.svelte";
import KeySignatureModulation from "../components/presets/KeySignatureModulation.svelte";
import Key from "../components/presets/Key.svelte";

export default [
    {
        name: "interval",
        label: "Interval",
        rulers: ["pitch", "interval"],
        component: Interval,
    },
    {
        name: "transposing_instrument",
        label: "Transposing instrument",
        rulers: ["pitch", "pitch"],
        component: TransposingInstrument,
    },
    {
        name: "key_signature",
        label: "Key signature",
        rulers: ["pitch", "position"],
        component: KeySignature,
    },
    {
        name: "key_signature_modulator",
        label: "Key signature modulation",
        rulers: ["pitch", "position", "position"],
        component: KeySignatureModulation,
    },
    {
        name: "key",
        label: "Key",
        rulers: ["pitch", "position", "degree"],
        component: Key
    },
]