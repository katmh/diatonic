<script lang="ts">
    import { inWindow, selectedPreset } from "../stores.js";
    import presets from "../data/presets.js";
    import { onMount } from "svelte";
    import updatePreset from "../utils/updatePreset.js";
    import PresetMenu from "./PresetMenu.svelte";
    import PresetInfo from "./PresetInfo.svelte";

    $: presetObject =
        presets[presets.findIndex((item) => item.name === $selectedPreset)];

    onMount(() => {
        updatePreset(presetObject);
    });

    const toggleMobileMenu = (isOpen = false) => {
        const overlay = document.querySelector<HTMLElement>(".overlay");
        const dashboard = document.querySelector<HTMLElement>(".dashboard");
        if (isOpen) {
            overlay.style.display = "none";
            dashboard.style.left = "-100%";
            return;
        }
        overlay.style.display = "block";
        dashboard.style.left = "0px";
    };
</script>

<div class="tab" on:click={() => toggleMobileMenu()}>
    <span>Menu</span>
</div>

<div class="dashboard">
    <div class="intro">
        <h1>Diatonic Ruler 🎹</h1>
        <p>
            This website displays interactive <i>diatonic rulers</i> to let you
            explore relationships between pitch, scale degrees and positions,
            intervals, and more. To get started, select a preset.
            <a href="">Learn more</a>
        </p>
    </div>

    <PresetMenu />

    {#if presetObject}
        <PresetInfo preset={presetObject} />
    {/if}
</div>

<div class="overlay" on:click={() => toggleMobileMenu(true)} />

<style>
    .dashboard {
        z-index: 3;
        height: 100%;
        width: 70%;
        max-width: 18rem;
        position: absolute;
        top: 0;
        left: -100%;
        background: #fff;
        transition: 0.3s;
        padding: 1.5rem 1.25rem;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .overlay {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 2;
        cursor: pointer;
    }

    .tab {
        position: absolute;
        top: 25%;
        left: -4.25rem;
        border: 1px solid #3f387d;
        background: #3f387d;
        padding: 0.4rem 3.5rem;
        transform: rotate(90deg);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(63, 56, 125, 20%);
        z-index: 3;
    }

    .tab span {
        text-transform: uppercase;
        font-weight: bold;
        font-size: 1.15rem;
        color: #fff;
    }

    @media (min-width: 900px) {
        .dashboard {
            position: static;
            width: 100%;
            max-width: 20rem;
            height: auto;
            font-size: 1rem;
            line-height: 1.25;
            border: 1px solid #c4befd;
            border-radius: 10px;
            margin: 1rem 2rem;
            box-shadow: 0 2px 4px rgba(63, 56, 125, 20%);
        }

        .tab,
        .overlay {
            display: none;
        }
    }

    h1 {
        color: #222;
        font-size: 1.75rem;
        letter-spacing: -0.5px;
    }
</style>
