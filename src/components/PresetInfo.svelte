<script lang="ts">
    export let preset;
</script>

<div class="preset_info">
    <svelte:component this={preset.component} />
</div>

<style>
    .preset_info {
        margin-top: 1.5rem;
    }
</style>
