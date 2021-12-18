<script lang="ts">
    import { rulers, inWindow, selectedPreset } from "../stores.js";
    import presets from "../data/presets.js";
    import generateID from "../utils/ID.js";
    import { onMount } from "svelte";

    onMount(() => {
        updatePreset();
    });

    $: presetObject =
        presets[presets.findIndex((item) => item.name === $selectedPreset)];

    const updatePreset = () => {
        if (!$selectedPreset) {
            rulers.update(() => ({}));
            return;
        }
        rulers.update(() => {
            let newRulers = {};
            presetObject.rulers.forEach(
                (type: string) =>
                    (newRulers[generateID()] = {
                        type,
                        position: 0,
                        items: [],
                    })
            );
            return newRulers;
        });
    };

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

    <label for="mode"><b>Preset:</b></label>
    <select
        name="mode"
        id="mode"
        bind:value={$selectedPreset}
        on:change={updatePreset}
    >
        <option value="" />
        {#each presets as preset}
            <option value={preset.name}>{preset.label}</option>
        {/each}
    </select>

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
