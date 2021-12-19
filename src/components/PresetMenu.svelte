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
        font-size: 1rem;
        border-bottom: 1px solid #aaa;
    }

    input[type="radio"] {
        display: none;
    }

    label {
        display: block;
        padding: 0.5rem 0.75rem;
        transition: 0.1s;
        cursor: pointer;
    }

    label:hover {
        background: #ddd;
    }

    input[type="radio"]:checked + label {
        background: #ccc;
    }
</style>
