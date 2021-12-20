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
    }

    @media (min-width: 600px) {
        .rulers_container {
            margin: 0 2rem 0 1rem;
        }
    }

    @media (min-width: 900px) {
        .rulers_container {
            margin: 0 4rem 0 2rem;
        }
    }
</style>
