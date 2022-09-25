<script lang="ts">
	import type Class from '$lib/models/Class';
	import { get } from 'svelte/store';
	import ClassCard from './ClassCard.svelte';
	import Tooltip from './Tooltip.svelte';

	export let timetable: Map<string, Class[]>,
		hours: string[] = ['08:00', '09:00', '10:00', '11:00', '12:00'],
		days: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

	function offsetTime(time: string, offset: number): string {
		const hour = parseInt(time.slice(0, 2)) + offset;
		return `${hour < 10 ? '0' : ''}${hour}:00`;
	}

	function between(time: string, startTime: string, endTime: string): boolean {
		const hour = parseInt(time.slice(0, 2)),
			startHour = parseInt(startTime.slice(0, 2)),
			endHour = parseInt(endTime.slice(0, 2));

		return hour >= startHour && hour <= endHour;
	}

	let grid: Map<string, boolean> = new Map();

	$: if (timetable) {
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

<table class="h-[80%] w-[80%] table-fixed">
	{#if timetable}
		<thead>
			<tr>
				<th />
				<th>M</th>
				<th>T</th>
				<th>W</th>
				<th>T</th>
				<th>F</th>
			</tr>
		</thead>
		<tbody>
			{#each hours as hour}
				<tr>
					<!-- <td>{hour} - {offsetTime(hour, 1)}</td> -->
					<td>{hour}</td>
					{#each days as day}
						{#if grid.get(`${hour}${day}`)}
							{#each timetable.get(day) || [] as _class}
								{#if _class.from == hour}
									<td
										rowspan={_class.duration}
										style="background: var(--{_class.subject?.color}Dim)"
									>
										<Tooltip>
											<span class="text-xl font-bold">{_class.subject?.id}</span>
											<div slot="info">
												<ClassCard {_class} />
											</div>
										</Tooltip>
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
