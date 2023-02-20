<main class="w-full h-full max-h-full grid bg-bg text-fg dark:bg-dbg dark:text-dfg ">
	<header class="flex items-center px-5 text-lg justify-between shadow-xl dark:shadow-black z-10">
		<span class="font-bold text-xl">Uni Schedule</span>
		<slot name="appbar" />
	</header>
	<div
		class="overflow-y-auto flex flex-col items-center gap-4 py-8 px-6 bg-gradient-to-br from-bgH to-white dark:from-dbgH dark:to-dbg1"
	>
		<slot />
	</div>
	<div id="actions" class="grid place-items-center">
		<slot name="actions" />
	</div>
</main>

<style>
	main {
		grid-template-rows: 64px 1fr 80px;
	}
</style>
