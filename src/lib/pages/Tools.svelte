<script>
	import Dock from '$lib/ui/Dock.svelte';
	import QToA from '$lib/ui/QToA.svelte';
	import Wooclap from '$lib/ui/Wooclap.svelte';

	let openDock = false,
		lesson = 1;
</script>

<div class="h-[80%] w-[80%]">
	<a
		href="https://q2a.di.uniroma1.it/fondamenti-di-programmazione-22-23?course=fondamenti-di-programmazione-22-23"
		target="_blank"
		class="w-full border-2 rounded-[50px] grid place-items-center p-5"
		rel="noreferrer"
	>
		<QToA />
	</a>
	<br />
	<button
		class="w-full text-2xl border-2 rounded-[50px] grid place-items-center p-5"
		on:click={() => (openDock = !openDock)}
	>
		<Wooclap />
	</button>
	<br />
	<a
		href="https://sites.google.com/uniroma1.it/mmi2223/home"
		target="_blank"
		class="w-full text-2xl border-2 rounded-[50px] grid place-items-center p-5"
		rel="noreferrer"
	>
		Metodi Matematici
	</a>
</div>

<Dock bind:open={openDock}>
	<div class="w-full flex items-center justify-center gap-5 p-5">
		<!-- <label for="lesson">Lesson</label> -->
		<input type="number" min="1" name="lesson" bind:value={lesson} />
		<a
			href="https://app.wooclap.com/F22LEZ{lesson}"
			target="_blank"
			class="material-symbols-outlined bg-fg text-bg dark:bg-dfg dark:text-dbg p-4 rounded-full"
			rel="noreferrer"
		>
			open_in_browser
		</a>
	</div>
</Dock>
