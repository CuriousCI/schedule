<script lang="ts">
	import type Class from '$lib/models/Class';
	import { identity, now } from 'svelte/internal';
	import { get } from 'svelte/store';
	import ClassCard from './ClassCard.svelte';
	import Dock from './Dock.svelte';

	export let timetable: Map<string, Class[]>, day: string | undefined;

	let innerWidth: number,
		openDock: boolean = false,
		selectedClass: Class | undefined = undefined;

	const rooms: { [key: string]: string } = {
		RM0181L: 'Aula 1L RM018-E01PTEL013',
		RM0182L: 'Aula 2L RM018-E01PTEL026',
		RM0183L: 'Aula 3L RM018-E01PTEL025',
		RM0189L: 'Aula 9L RM018-E01P03L011',
		RM115: 'Aula G50 RM115-E01P03L001',
		CU032: 'Aula I edificio Caglioti - CU032-E01PTEL001',
		RM02515: 'Aula Informatica 15 RM025-E01PTELO24',
		RM025: 'Aula Informatica 17 RM025-E01PTEL01',
		RM111: 'Aula Magna - Edificio RM111-E01PTEL001 (Regina Elena Ed. C)',
		RM113: 'Aula T1 RM113-E01PTEL001 (Regina Elena Ed. E)',
		CU045: 'Aula T1 CU045-E01PTEL001 (Città Univ.)',
		CU046: 'Aula T2 CU046-E01PTEL001 (Città Univ.)'
	};
</script>

<svelte:window bind:innerWidth />
{#if day}
	<div class="h-[80%] w-[80%]">
		{#each timetable.get(day) || [] as _class}
			<button
				class="w-full border-2 rounded-[50px] flex flex-col items-center justify-center gap-2"
				style="color: var(--{_class.subject?.color}); height: {_class.duration * 10}%"
				on:click={() => {
					selectedClass = _class;
					openDock = true;
				}}
			>
				<h1 class="font-bold text-3xl text-center">
					{#if innerWidth > 720}
						{_class.subject?.teaching}
					{:else}
						{_class.subject?.id}
					{/if}
				</h1>
				<h2 class="italic text-xl text-center">
					{_class.from} - {_class.to}
				</h2>
			</button>
			<a
				href="https://docs.google.com/forms/d/e/1FAIpQLSc9hLH7yRV32YVDnKKDySd8lfRmfnUtDHOypE6gwQPYv8cBZA/viewform?entry.293588402_year={new Date(
					Date.now()
				).getFullYear()}&entry.293588402_month={new Date(Date.now()).getMonth() +
					1}&entry.293588402_day={new Date(
					Date.now()
				).getDate()}&entry.426659651=Primo%20anno&entry.604552674={rooms[
					_class.building?.code || ''
				]}"
				style="color: var(--{_class.subject?.color});"
				target="_blank"
				class="relative -top-5 material-symbols-outlined align-text-bottom text-5xl"
			>
				inventory
			</a>
			<br />
		{/each}
	</div>
{/if}

<Dock bind:open={openDock}>
	{#if selectedClass}
		<ClassCard _class={selectedClass} />
	{:else}
		No course selected
	{/if}
</Dock>
