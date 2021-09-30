<script lang="ts">
	import PitchRuler from "./components/PitchRuler.svelte";
	import NumberRuler from "./components/NumberRuler.svelte";
</script>

<div class="container">
	<PitchRuler />
	<NumberRuler />
</div>

<style>
	.container {
		width: 95%;
		max-width: 1000px;
		margin: 2rem auto;
		display: flex;
	}
</style>
