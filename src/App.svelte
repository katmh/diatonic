<script lang="ts">
    import Dashboard from "./components/Dashboard.svelte";
    import Ruler from "./components/Ruler.svelte";
    import Window from "./components/Window.svelte";
    import { rulers } from "./stores.js";

    $: keys = Object.keys($rulers);
</script>

<div class="container">
    <div class="rulers">
        <Window />
        {#each keys as key}
            <Ruler id={key} />
        {/each}
    </div>
    <Dashboard />
</div>

<style>
    .container {
        height: 100vh;
        width: 95%;
        max-width: 1000px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        overflow-y: hidden;
    }

    .rulers {
        height: 100vh;
        width: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        overflow-y: hidden;
    }
</style>
