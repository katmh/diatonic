<script lang="ts">
    import Dashboard from "./components/Dashboard.svelte";
    import RulersContainer from "./components/RulersContainer.svelte";
</script>

<div class="container">
    <Dashboard />
    <RulersContainer />
</div>

<style>
    .container {
        height: 100%;
        width: auto;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        overflow-y: hidden;
    }
</style>
