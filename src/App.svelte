<script lang="ts">
    import Dashboard from "./components/Dashboard.svelte";
    import Ruler from "./components/Ruler.svelte";
    import Window from "./components/Window.svelte";
    import { rulers, rulerInfo } from "./stores.js";
    import generateID from "./utils/ID.js";

    let selectedMode;
    const handleSelectMode = () => {
        rulers.update(() =>
            selectedMode.rulers.map((ruler) => ({
                id: generateID(),
                type: ruler,
                position: 0,
            }))
        );
        console.log($rulers, $rulerInfo);
    };
    const keys = Object.keys($rulers);
    const test = [1, 2, 3];
    //<Ruler rulerType={$rulers[key].type} id={$rulers[key].id} />
    //<Dashboard {handleSelectMode} {selectedMode} />
</script>

<div class="container">
    <div class="rulers">
        <Window />
        {#each keys as key}
            <Ruler id={key} />
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
</style>
