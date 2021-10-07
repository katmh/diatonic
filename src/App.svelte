<script lang="ts">
	import PitchRuler from "./components/PitchRuler.svelte";
	import NumberRuler from "./components/NumberRuler.svelte";
	import IntervalRuler from "./components/IntervalRuler.svelte";

	import Window from "./components/Window.svelte";

	import { visibleRulers, inWindow } from "./stores.js";

	let selectedMode;
	const handleSelectMode = () => {
		if (selectedMode === "intervals") {
			visibleRulers.update((visibleRulers) => ({
				...visibleRulers,
				number: false,
			}));
		}
	};
</script>

<div class="container">
	<div class="rulers">
		<Window />
		{#if $visibleRulers.pitch}
			<PitchRuler />
		{/if}
		{#if $visibleRulers.number}
			<NumberRuler />
		{/if}
		{#if $visibleRulers.interval}
			<IntervalRuler />
		{/if}
	</div>
	<div class="dashboard">
		<label for="mode">select a mode:</label>
		<select
			name="mode"
			id="mode"
			bind:value={selectedMode}
			on:change={handleSelectMode}
		>
			<option value="" />
			<option value="intervals">Intervals from a pitch</option>
		</select>

		<br />
		<br />

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
		padding-top: 1rem;
		font: 1rem/1.25 system-ui;
	}
</style>
