<script lang="ts">
	import type Book from '$lib/models/Book';
	import BookCard from '$lib/ui/BookCard.svelte';
	import Dock from '$lib/ui/Dock.svelte';
	import QToA from '$lib/ui/QToA.svelte';
	import Wooclap from '$lib/ui/Wooclap.svelte';
	import { onMount } from 'svelte';

	let openDock = false,
		lesson = 1,
		books: Book[] = [];

	onMount(async () => {
		books = await (await fetch('books.json')).json();
	});
</script>

<div class="w-full h-full max-h-[95%] flex flex-col px-10 box-border gap-5 overflow-y-scroll">
	<br />
	<a
		href="https://q2a.di.uniroma1.it/fondamenti-di-programmazione-22-23?course=fondamenti-di-programmazione-22-23"
		target="_blank"
		class="w-full rounded-[50px] grid place-items-center"
		rel="noreferrer"
	>
		<QToA />
	</a>
	<button
		class="w-full text-2xl rounded-[50px] grid place-items-center"
		on:click={() => (openDock = !openDock)}
	>
		<Wooclap />
	</button>
	<hr />
	<a
		href="https://sites.google.com/uniroma1.it/mmi2223/home"
		target="_blank"
		class="w-full text-2xl rounded-[50px] grid place-items-center"
		rel="noreferrer"
	>
		Metodi Matematici
	</a>
	<a
		href="https://www1.mat.uniroma1.it/people/birindelli/esercizi/indice.html"
		target="_blank"
		class="w-full text-2xl rounded-[50px] grid place-items-center"
		rel="noreferrer"
	>
		Calcolo Differenziale
	</a>
	<hr />
	{#each books as book}
		<BookCard {book} />
	{/each}
	<hr />
</div>

<Dock bind:open={openDock}>
	<div class="w-full flex items-center justify-center gap-5 p-5">
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
