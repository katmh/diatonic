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
</script>

<div class="container">
    <div class="rulers">
        <Window />
        {#each $rulers as ruler}
            <Ruler rulerType={ruler.type} id={ruler.id} />
        {/each}
    </div>
    <Dashboard {handleSelectMode} {selectedMode} />
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
