<script lang="ts">
	import type Class from '$lib/models/Class';
	import ClassCard from './ClassCard.svelte';
	import Dock from './Dock.svelte';
	import { buildings } from '$lib/models/Building';

	export let timetable: Map<string, Class[]>, day: string | undefined;

	let innerWidth: number,
		openDock: boolean = false,
		selectedClass: Class | undefined = undefined;
</script>

<svelte:window bind:innerWidth />
{#if day && timetable.get(day)}
	<div class="w-full">
		{#each timetable.get(day) || [] as _class}
			<button
				class="relative w-full border-2 rounded-2xl flex flex-col items-center justify-center bg-bg dark:bg-dbg shadow-lg dark:shadow-black"
				style="
                    color: var(--{_class.subject?.color});
                    padding: {_class.duration * 10}px;
                "
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
				<a
					rel="noreferrer"
					href="https://docs.google.com/forms/d/e/1FAIpQLSc9hLH7yRV32YVDnKKDySd8lfRmfnUtDHOypE6gwQPYv8cBZA/viewform?entry.293588402_year={new Date(
						Date.now()
					).getFullYear()}&entry.293588402_month={new Date(Date.now()).getMonth() +
						1}&entry.293588402_day={new Date(
						Date.now()
					).getDate()}&entry.426659651=Primo%20anno&entry.604552674={buildings[
						_class.building?.code || ''
					]}"
					style="color: var(--{_class.subject?.color});"
					target="_blank"
					on:click|stopPropagation={() => {}}
					class="absolute z-10 top-4 left-4 material-symbols-outlined align-text-bottom text-5xl"
				>
					inventory
				</a>
			</button>
			<br />
		{/each}
	</div>
{:else}
	<h1 class="text-2xl font-bold text-shadow dark mb-4 w-full">Nothing</h1>
{/if}

<Dock bind:open={openDock}>
	{#if selectedClass}
		<ClassCard _class={selectedClass} />
	{:else}
		No course selected
	{/if}
</Dock>
