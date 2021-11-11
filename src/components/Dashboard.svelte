<script lang="ts">
    import { rulers, inWindow } from "../stores.js";
    import presets from "../data/presets.js";
    import generateID from "../utils/ID.js";

    let selectedMode;
    const handleSelectMode = async () => {
        if (!selectedMode) {
            rulers.update(() => ({}));
            return;
        }
        rulers.update(() => {
            let newRulers = {};
            selectedMode.rulers.forEach(
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
    <h1>Music Modulator</h1>

    <p>
        To get started, select a preset, or explore by shifting the rulers up
        and down.
    </p>

    <hr />

    <label for="mode"><b>Preset:</b></label>
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

    {#each keys as key}
        <p>{$rulers[key].type}: {$inWindow[key]}</p>
    {/each}
</div>

<style>
    .dashboard {
        width: 200px;
        padding-top: 1rem;
        font: 1rem/1.25 system-ui;
        background: #efefef;
    }

    hr,
    p {
        margin: 1rem 0;
    }
</style>
