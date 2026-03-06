<script lang="ts">
	interface Props {
		children: import('svelte').Snippet;
		heading: 1 | 2 | 3 | 4 | 5 | 6;
	}
	const { children, heading }: Props = $props();
</script>

<svelte:element this={`h${heading}`}>{@render children?.()}</svelte:element>

<style>
	:global(h1, h2, h3) {
		@apply leading-150%;
	}
	:global(h1) {
		@apply text-16;
	}

	:global(h2) {
		@apply text-14;
	}

	:global(h3) {
		@apply text-12;
	}
</style>
