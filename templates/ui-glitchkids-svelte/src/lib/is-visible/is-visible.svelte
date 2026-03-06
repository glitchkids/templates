<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getIsVisibleContext, type IsVisibleContext } from './is-visible-provider.svelte';

	let { children }: { children: Snippet<[IsVisibleContext['provider']]> } = $props();

	const context = getIsVisibleContext();
</script>

<div {@attach context.attachement(context.provider)}>
	{@render children(context.provider)}
</div>
