<script lang="ts">
    import Ruler from "./Ruler.svelte";
    export let IDs: string[];
    $: console.log("IDs", IDs);
</script>

{#each IDs as ID}
    <Ruler id={ID} />
{:else}
    <p>select a preset :)</p>
{/each}
