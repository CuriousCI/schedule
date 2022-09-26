<script lang="ts">
	import type Class from '$lib/models/Class';
	import ClassCard from './ClassCard.svelte';
	import Dock from './Dock.svelte';

	export let timetable: Map<string, Class[]>, day: string | undefined;

	let innerWidth: number,
		openDock: boolean = false,
		selectedClass: Class | undefined = undefined;
</script>

<svelte:window bind:innerWidth />
{#if day}
	<div class="h-[80%] w-[80%] table-fixed cursor-pointer">
		{#each timetable.get(day) || [] as _class}
			<div
				class="border-2 rounded-[50px] flex flex-col items-center justify-center gap-2"
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
			</div>
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
