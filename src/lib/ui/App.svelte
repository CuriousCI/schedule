<script lang="ts">
	import { onMount } from 'svelte';
	import ThemeSwitch from './ThemeSwitch.svelte';

	export let heading: string = 'Uni Schedule',
		channel: number | undefined = undefined;

	onMount(() => {
		channel = parseInt(localStorage.getItem('channel') || '1');
	});
</script>

<main class="w-full h-full grid bg-bg text-fg dark:bg-dbg dark:text-dfg ">
	<div class="flex items-center px-5 text-lg justify-between">
		<span class="font-bold">{heading}</span>
		<span class="flex items-center gap-4">
			<button
				class="overline"
				on:click={() => {
					channel = channel == 1 ? 2 : 1;
					localStorage.setItem('channel', channel.toString());
				}}
			>
				Channel
				{#if channel}
					<span class="font-bold">{channel}</span>
				{/if}
			</button>
			<ThemeSwitch />
		</span>
	</div>
	<div class="grid place-items-center bg-bgH dark:bg-dbgH">
		<slot />
	</div>
	<div class="grid place-items-center">
		<slot name="actions" />
	</div>
</main>

<style>
	main {
		grid-template-rows: 64px 1fr 80px;
	}
</style>
