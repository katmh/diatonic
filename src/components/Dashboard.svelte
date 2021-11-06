<script lang="ts">
    import { rulers, rulerInfo } from "../stores.js";
    import presets from "../data/presets.js";

    export let handleSelectMode: () => void;
    export let selectedMode: string;
</script>

<div class="dashboard">
    <label for="mode">select a mode:</label>
    <select
        name="mode"
        id="mode"
        bind:value={selectedMode}
        on:change={handleSelectMode}
    >
        <option value="" />
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

<style>
    .dashboard {
        width: 200px;
        padding-top: 1rem;
        font: 1rem/1.25 system-ui;
    }
</style>
