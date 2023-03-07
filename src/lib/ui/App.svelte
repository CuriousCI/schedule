<script lang="ts">
	import ThemeSwitch from '$lib/ui/ThemeSwitch.svelte';
</script>

<main class="w-full h-full max-h-full grid bg-bg text-fg dark:bg-dbg dark:text-dfg ">
	<header class="flex items-center px-5 text-lg justify-between shadow-xl dark:shadow-black z-10">
		<span class="font-bold text-xl">CS @ Sapienza</span>
		<span class="flex items-center gap-4">
			<ThemeSwitch />
		</span>
	</header>
	<div
		class="overflow-y-auto flex flex-col items-center gap-4 py-8 px-6 bg-gradient-to-br from-bgH to-white dark:from-dbgH dark:to-dbg1"
	>
		<slot />
	</div>
	<slot name="actions" />
</main>

<style>
	main {
		grid-template-rows: 64px 1fr 80px;
	}
</style>
