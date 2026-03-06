<script lang="ts">
	interface Props {
		children: import('svelte').Snippet;
	}
	let { children, ...restProps }: Props = $props();
</script>

<button
	{...restProps}
	class="cursor-pointer bg-white text-primary-black font-semibold text-6/8 py-4 px-6 rounded-4 hover:bg-white/80"
>
	{@render children?.()}
</button>
