<script lang="ts">
	import type Class from '$lib/models/Class';
	import ClassCard from './ClassCard.svelte';
	import Dock from './Dock.svelte';

	export let timetable: Map<string, Class[]>,
		hours: string[] = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
		days: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

	function between(time: string, startTime: string, endTime: string): boolean {
		const hour = parseInt(time.slice(0, 2)),
			startHour = parseInt(startTime.slice(0, 2)),
			endHour = parseInt(endTime.slice(0, 2));

		return hour >= startHour && hour < endHour;
	}

	let grid: Map<string, boolean> = new Map(),
		openDock: boolean = false,
		selectedClass: Class | undefined = undefined;

	$: if (timetable) {
		grid = new Map();
		for (const hour of hours)
			for (const day of days)
				for (const _class of timetable.get(day) || [])
					if (between(hour, _class.from, _class.to)) {
						grid.set(`${hour}${day}`, true);
						break;
					}

		grid = grid;
	}
</script>

<table class="w-full h-full table-fixed">
	{#if timetable}
		<thead>
			<tr>
				<th />
				<th class="font-bold bg-bg1 dark:bg-dbg1">M</th>
				<th class="font-bold bg-bg1 dark:bg-dbg1">T</th>
				<th class="font-bold bg-bg1 dark:bg-dbg1">W</th>
				<th class="font-bold bg-bg1 dark:bg-dbg1">T</th>
				<th class="font-bold bg-bg1 dark:bg-dbg1">F</th>
			</tr>
			<br />
		</thead>
		<tbody>
			{#each hours as hour}
				<tr>
					<td class="font-bold bg-bg1 dark:bg-dbg1 align-top pt-4">{hour.slice(0, 2)}</td>
					{#each days as day}
						{#if grid.get(`${hour}${day}`)}
							{#each timetable.get(day) || [] as _class}
								{#if _class.from == hour}
									<td
										class="shadow-2xl dark:shadow-black "
										on:keyup={() => {}}
										style="
                                            background: var(--{_class.subject?.color}Dim);
                                            color: var(--{_class.subject?.color}); 
                                        "
										rowspan={_class.duration}
										on:click={() => {
											openDock = true;
											selectedClass = _class;
										}}
									>
										<span class="text-xl font-bold">{_class.subject?.id}</span>
									</td>
								{/if}
							{/each}
						{:else}
							<td />
						{/if}
					{/each}
				</tr>
			{/each}
		</tbody>
	{/if}
</table>

<Dock bind:open={openDock}>
	{#if selectedClass}
		<ClassCard _class={selectedClass} />
	{:else}
		No course selected
	{/if}
</Dock>
