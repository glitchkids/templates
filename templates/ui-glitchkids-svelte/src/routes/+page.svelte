<script lang="ts">
	import 'uno.css';
	import { StyleProvider } from '../lib/style-provider/index.ts';
	import { IsVisible } from '../lib/is-visible/index.ts';
	import TextShowcase from '../lib/text/text-showcase.svelte';
	import InputShowcase from '$lib/input/input-showcase.svelte';
</script>

<!-- <IsVisible.Provider>
	{#each { length: 4 } as _, i}
		<IsVisible.IsVisible>
			<div class={`elem-${i.toString().padStart(2, '0')}`}>Hello world</div>
		</IsVisible.IsVisible>
	{/each}
</IsVisible.Provider> -->

<StyleProvider>
	<div class="space-y-8">
		<TextShowcase />
		<InputShowcase />
	</div>
</StyleProvider>

<style>
	.elem-00 {
		background-color: blue;
		height: 50vh;
	}

	.elem-01 {
		background-color: red;
		height: 100vh;
		margin-top: 50vh;
		margin-bottom: 50vh;
	}
</style>
