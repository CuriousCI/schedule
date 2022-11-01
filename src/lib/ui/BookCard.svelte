<script lang="ts">
	import type Book from '$lib/models/Book';

	export let book: Book;
	let today = new Date(Date.now()),
		start_date = new Date(Date.now()),
		days = 0,
		start_page = 0,
		end_page = 0;

	$: start_date = new Date(book.start || '2022-11-02');

	$: if (today >= start_date) {
		days = Math.ceil(Math.abs(today.getTime() - start_date.getTime()) / (1000 * 3600 * 24));
		start_page = book.from + (days - 1) * book.pages_per_day;
		end_page = book.from + days * book.pages_per_day;
	}
</script>

{#if book}
	<a href={book.url} target="_blank" rel="noreferrer">
		<div class="w-full border-2 rounded-[50px] grid place-items-center p-5">
			<span class="font-bold">{book.name}</span>
			{#if end_page}
				<span class="text-xl">{start_page} - {end_page}</span>
			{:else}
				You still don't have to start!
			{/if}
		</div>
	</a>
{/if}

<!-- <a -->
<!-- 	href="https://q2a.di.uniroma1.it/fondamenti-di-programmazione-22-23?course=fondamenti-di-programmazione-22-23" -->
<!-- 	target="_blank" -->
<!-- > -->
<!-- 	<QToA /> -->
<!-- </a> -->
