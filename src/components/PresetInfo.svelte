<script lang="ts">
    export let preset;
</script>

<div class="preset_info">
    <h2>{preset.label}</h2>
    <svelte:component this={preset.component} />
</div>

<style>
    .preset_info {
        margin-top: 1.25rem;
    }
</style>
