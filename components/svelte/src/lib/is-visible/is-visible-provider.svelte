<script module lang="ts">
	import { getContext, setContext } from 'svelte';
	import { browser } from '$app/environment';
	import { on } from 'svelte/events';
	import { createSubscriber } from 'svelte/reactivity';
	import { innerWidth, innerHeight } from 'svelte/reactivity/window';

	export interface IsVisibleContext {
		attachement: (provider: IsVisibleProvider) => (node: HTMLElement) => void;
		provider: IsVisibleProvider;
	}
	class IsVisibleProvider {
		#nodes = new Set<HTMLElement>();
		registerNode(node: HTMLElement) {
			this.#nodes.add(node);
		}
		unregisterNode(node: HTMLElement) {
			this.#nodes.delete(node);
		}

		#visibleRune;
		get visible() {
			if (!browser || !innerHeight.current || !innerWidth.current) return [];

			this.#visibleRune();

			return this.#nodes
				.values()
				.filter((node) => {
					const { top, left, bottom, right } = node.getBoundingClientRect();
					const isVisible =
						top < innerHeight.current && bottom > 0 && left < innerWidth.current && right > 0;
					if (isVisible) return true;
				})
				.toArray();
		}

		constructor() {
			this.#visibleRune = createSubscriber((update) => {
				if (!browser) return;
				const off = on(document, 'scroll', update);
				return () => {
					off();
				};
			});
		}
	}
	const attachement = (provider: IsVisibleProvider) => (node: HTMLElement) => {
		provider.registerNode(node);
		return () => {
			provider.unregisterNode(node);
		};
	};

	const KEY_PROVIDER = 'isVisibleProvider';
	export function setIsVisibleContext() {
		const context = {
			attachement,
			provider: new IsVisibleProvider()
		} satisfies IsVisibleContext;
		setContext(KEY_PROVIDER, context);
		return context;
	}
	export function getIsVisibleContext() {
		return getContext<IsVisibleContext>(KEY_PROVIDER);
	}
</script>

<script lang="ts">
	import { type Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();

	setIsVisibleContext();
</script>

{@render children()}
