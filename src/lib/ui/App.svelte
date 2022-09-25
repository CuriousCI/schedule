<script lang="ts">
	import ThemeSwitch from './ThemeSwitch.svelte';

	export let heading: string = 'Uni Schedule';
</script>

<main class="w-full h-screen grid bg-bg text-fg dark:bg-dbg dark:text-dfg ">
	<div class="flex items-center px-5 text-lg justify-between">
		<span class="font-bold">{heading}</span>
		<ThemeSwitch />
	</div>
	<div class="grid place-items-center bg-bgH dark:bg-dbgH">
		<slot />
	</div>
	<div>
		<slot name="actions" />
	</div>
</main>

<style>
	main {
		grid-template-rows: 64px 1fr 64px;
	}
</style>
