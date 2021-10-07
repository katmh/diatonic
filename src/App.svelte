<script lang="ts">
	import PitchRuler from "./components/PitchRuler.svelte";
	import NumberRuler from "./components/NumberRuler.svelte";
	import Window from "./components/Window.svelte";

	import { inWindow } from "./stores.js";
</script>

<div class="container">
	<div class="rulers">
		<Window />
		<PitchRuler />
		<NumberRuler />
	</div>
	<div class="dashboard">
		{#each $inWindow as item}
			<p>{item[0]}: {item[1]}</p>
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

	.dashboard {
		width: 200px;
	}
</style>
