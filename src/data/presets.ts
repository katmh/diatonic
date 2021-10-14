export default [
    {
        name: "interval",
        label: "Intervals from a pitch",
        rulers: ["pitch", "interval"],
    },
    {
        name: "key_signature",
        label: "Key signature / diatonic scale",
        rulers: ["pitch", "number"],
        // rulers: ["pitch", "degree"],
    },
    {
        name: "key",
        label: "Key",
        rulers: ["pitch", "number", "number"],
        // rulers: ["pitch", "degree", "position"],
    }
]