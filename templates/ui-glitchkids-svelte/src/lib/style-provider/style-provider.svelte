<script lang="ts">
	interface Props {
		children: import('svelte').Snippet;
	}

	const { children }:Props = $props();
</script>

<div id="style-provider">
{@render children?.()}
	</div>


<style>
:global(#style-provider *) {
				font-family: Poppins, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
			}

#style-provider {

				@apply bg-black text-primary-white;
}

			:global(.no-scrollbar::-webkit-scrollbar) {
				display: none;
			}

			:global(.no-scrollbar) {
				-ms-overflow-style: none;  
				scrollbar-width: none;  
			}
</style>

