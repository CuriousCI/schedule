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
	<!-- <a href={book.url} target="_blank" rel="noreferrer"> -->
	<div class="rounded-[50px] text-center text-green dark:text-dgreen">
		<span class="font-bold">{book.name}</span>
		{#if end_page}
			<span class="text-xl">{start_page} - {end_page}</span>
		{:else}
			You still don't have to start!
		{/if}
	</div>
	<!-- </a> -->
{/if}
