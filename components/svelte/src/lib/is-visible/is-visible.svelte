<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getIsVisibleContext } from './is-visible-provider.svelte';

	let { children }: { children: Snippet } = $props();

	const context = getIsVisibleContext();
</script>

<div {@attach context.attachement(context.provider)}>
	{@render children()}
</div>
