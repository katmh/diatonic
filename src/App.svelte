<script lang="ts">
    import Dashboard from "./components/Dashboard.svelte";
    import Ruler from "./components/Ruler.svelte";
    import Window from "./components/Window.svelte";
    import presets from "./data/presets";
    import { selectedPreset, rulers } from "./stores.js";
    import generateID from "./utils/ID";

    const updatePreset = (presetObject) => {
        let newRulers = {};
        for (let i = 0; i < presetObject.rulers.length; i++) {
            newRulers[generateID()] = {
                type: presetObject.rulers[i],
                position: 0,
                items: [],
            };
        }
        rulers.update(() => newRulers);
    };

    let keys: string[];
    $: {
        console.log("updating preset");
        const presetObject =
            presets[presets.findIndex((item) => item.name === $selectedPreset)];
        updatePreset(presetObject);
    }
    $: console.log("rulers 1", $rulers);
    $: keys = Object.keys($rulers);
</script>

<div class="container">
    <Dashboard />
    <div class="rulers">
        <Window />
        {#each keys as key}
            <Ruler id={key} />
        {:else}
            <p>select a preset :)</p>
        {/each}
    </div>
</div>

<style>
    .container {
        height: 100%;
        width: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        overflow-y: hidden;
    }

    .rulers {
        height: 100%;
        width: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        overflow-y: hidden;
    }
</style>
