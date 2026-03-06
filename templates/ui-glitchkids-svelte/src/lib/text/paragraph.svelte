<script lang="ts">
	interface Props {
		children: import('svelte').Snippet;
		size: 'xs' | 'sm' | 'md' | 'lg';
	}
	const { children, size }: Props = $props();
</script>

<p
	class={[
		size === 'xs' && 'gk_p-xs',
		size === 'sm' && 'gk_p-sm',
		size === 'md' && 'gk_p-md',
		size === 'lg' && 'gk_p-lg'
	]}
>
	{@render children?.()}
</p>

<style>
	:global(p) {
		@apply leading-180%;
	}
	:global(.gk_p-xs) {
		@apply text-3;
	}
	:global(.gk_p-sm) {
		@apply text-0.875rem;
	}

	:global(p, .gk_p-md) {
		@apply text-4;
	}
	:global(.gk_p-lg) {
		@apply text-6;
	}
</style>
