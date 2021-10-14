<script lang="ts">
    import Ruler from "./components/Ruler.svelte";
    import Window from "./components/Window.svelte";
    import { rulerInfo, rulers } from "./stores.js";
    import presets from "./data/presets.js";
    import { onMount } from "svelte";

    onMount(() => {
        handleSelectMode();
    });

    let selectedMode;
    const handleSelectMode = () => {
        console.log(selectedMode);
        rulers.update(() =>
            selectedMode.rulers.map((ruler) => ({
                type: ruler,
                position: 0,
            }))
        );
    };
</script>

<div class="container">
    <div class="rulers">
        <Window />
        {#each $rulers as ruler}
            <Ruler rulerType={ruler.type} />
        {/each}
    </div>
    <div class="dashboard">
        <label for="mode">select a mode:</label>
        <select
            name="mode"
            id="mode"
            bind:value={selectedMode}
            on:change={handleSelectMode}
        >
            {#each presets as preset}
                <option value={preset}>{preset.label}</option>
            {/each}
        </select>

        <br />
        <br />

        {#each $rulers as ruler}
            <p>{$rulerInfo[ruler.type].inWindow}</p>
        {/each}
    </div>
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

    .dashboard {
        width: 200px;
        padding-top: 1rem;
        font: 1rem/1.25 system-ui;
    }
</style>
