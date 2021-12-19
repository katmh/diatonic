<script lang="ts">
    import { rulers, inWindow, selectedPreset } from "../stores.js";
    import presets from "../data/presets.js";
    import { onMount } from "svelte";
    import updatePreset from "../utils/updatePreset.js";
    import PresetMenu from "./PresetMenu.svelte";

    $: presetObject =
        presets[presets.findIndex((item) => item.name === $selectedPreset)];

    onMount(() => {
        updatePreset(presetObject);
    });

    $: keys = Object.keys($inWindow);
</script>

<div class="dashboard">
    <h1>Diatonic Ruler</h1>

    <p>
        The diatonic ruler expands on <a
            href="https://musictheoryexamplesbywomen.com/theorists/sarah-ann-glover-1786-1867/"
            >Sarah Anna Glover</a
        >’s Norwich Sol-Fa System. To get started, select a preset, or explore
        by shifting the rulers up and down.
    </p>

    <PresetMenu />
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
        width: 100%;
        max-width: 20rem;
        padding: 1.5rem 1.25rem;
        font-size: 1rem;
        line-height: 1.25;
        border: 1px solid #c4befd;
        border-radius: 10px;
        margin: 2rem;
    }

    h1 {
        color: #222;
        font-size: 1.75rem;
        letter-spacing: -0.3px;
    }

    p {
        margin: 1.15rem 0;
        line-height: 1.55;
        color: #222;
    }
</style>
