<script lang="ts">
    import { rulers, inWindow } from "../stores.js";
    import presets from "../data/presets.js";
    import generateID from "../utils/ID.js";

    let selectedPreset;
    const handleSelectPreset = async () => {
        if (!selectedPreset) {
            rulers.update(() => ({}));
            return;
        }
        rulers.update(() => {
            let newRulers = {};
            selectedPreset.rulers.forEach(
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

    const toListString = (arr) => {
        if (arr.length === 1) {
            return arr[0];
        }
        if (arr.length === 2) {
            return `${arr[0]} and ${arr[1]}`;
        }
        return (
            arr
                .slice(0, arr.length - 1)
                .toString()
                .replaceAll(",", ", ") + `, and ${arr[arr.length - 1]}`
        );
    };
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
        bind:value={selectedPreset}
        on:change={handleSelectPreset}
    >
        <option value="" />
        {#each presets as preset}
            <option value={preset}>{preset.label}</option>
        {/each}
    </select>

    {#if selectedPreset}
        <p>
            <i>{selectedPreset.label}</i> uses the
            <b>{toListString(selectedPreset.rulers)}</b>
            ruler{selectedPreset.rulers.length > 1 ? "s" : ""}.
        </p>
    {/if}

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
