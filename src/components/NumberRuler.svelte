<script lang="ts">
    import Ruler from "./Ruler.svelte";

    const labels = [
        "7",
        "#6/b7",
        "6",
        "#5/b6",
        "5",
        "#4/b5",
        "4",
        "3",
        "#2/b3",
        "2",
        "#1/b2",
        "1",
    ];
</script>

<Ruler rulerType="number" items={labels} />
