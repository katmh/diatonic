<script lang="ts">
    import { rulers, inWindow, selectedPreset } from "../stores.js";
    import presets from "../data/presets.js";

    $: keys = Object.keys($inWindow);
</script>

<div class="dashboard">
    <h1>Diatonic Ladder</h1>

    <p>
        The diatonic ruler expands on <a
            href="https://musictheoryexamplesbywomen.com/theorists/sarah-ann-glover-1786-1867/"
            >Sarah Anna Glover</a
        >'s Norwich Sol-Fa System.
    </p>

    <p>
        To get started, select a preset, or explore by shifting the rulers up
        and down.
    </p>

    <hr />

    {#each presets as preset}
        <input
            type="radio"
            name="preset"
            id={preset.name}
            value={preset.name}
            bind:group={$selectedPreset}
        />
        <label for={preset.name}>{preset.label}</label>
    {/each}

    <br />

    {#each keys as key}
        <p>{$rulers[key].type}: {@html $inWindow[key]}</p>
    {/each}
</div>

<style>
    @media (max-width: 600px) {
        .dashboard {
            display: none;
        }
    }

    .dashboard {
        width: 50%;
        padding: 1rem;
        font-size: 1rem;
        line-height: 1.25;
        background: #efefef;
    }
</style>
