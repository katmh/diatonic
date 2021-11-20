export default [
    {
        name: "interval",
        label: "Intervals from a pitch",
        rulers: ["pitch", "interval"],
    },
    {
        name: "key_signature",
        label: "Key signature / diatonic scale",
        rulers: ["pitch", "position"],
    },
    {
        name: "key",
        label: "Key",
        rulers: ["pitch", "position", "degree"],
    },
    {
        name: "key_signature_modulator",
        label: "Key signature modulator",
        rulers: ["pitch", "position", "position"],
    },
    {
        name: "transposition",
        label: "Transposition",
        rulers: ["pitch", "pitch"]
    }
]