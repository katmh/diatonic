<script lang="ts">
    import Ruler from "./Ruler.svelte";
    import Window from "./Window.svelte";
    import { rulers } from "../stores";

    $: keys = Object.keys($rulers);
</script>

<div class="rulers_container">
    <Window />
    {#each keys as key}
        <Ruler id={key} />
    {/each}
</div>

<style>
    .rulers_container {
        height: 100%;
        display: flex;
        justify-content: center;
        overflow-y: hidden;
        margin: 0 4rem 0 2rem;
    }
</style>
