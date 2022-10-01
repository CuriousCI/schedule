<main class="w-full h-full grid bg-bg text-fg dark:bg-dbg dark:text-dfg ">
	<div class="flex items-center px-5 text-lg justify-between">
		<span class="font-bold">Uni Schedule</span>
		<slot name="appbar" />
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
