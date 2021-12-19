<script lang="ts">
    import presets from "../data/presets.js";
    import { selectedPreset } from "../stores.js";
    import updatePreset from "../utils/updatePreset.js";

    $: presetObject =
        presets[presets.findIndex((item) => item.name === $selectedPreset)];
</script>

<h2>Presets</h2>

{#each presets as preset}
    <input
        type="radio"
        name="preset"
        id={preset.name}
        value={preset.name}
        bind:group={$selectedPreset}
        on:change={() => updatePreset(presetObject)}
    />
    <label for={preset.name}>{preset.label}</label>
{/each}

<style>
    h2 {
        text-transform: uppercase;
        font-size: 1.1rem;
        margin: 2rem 0 0.5rem;
    }

    input[type="radio"] {
        display: none;
    }

    label {
        display: block;
        padding: 0.3rem 0.75rem;
        margin: 0.15rem 0;
        transition: 0.1s;
        cursor: pointer;
        border-radius: 5px;
    }

    label:hover {
        background: #dad7fe;
    }

    input[type="radio"]:checked + label {
        background: #c4befd;
        font-weight: bold;
    }
</style>
