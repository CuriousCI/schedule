<script lang="ts">
	import type Class from '$lib/models/Class';
	import ClassCard from './ClassCard.svelte';
	import Tooltip from './Tooltip.svelte';

	export let timetable: Map<string, Class[]>,
		hours: string[] = ['08:00', '09:00', '10:00', '11:00', '12:00'],
		days: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
</script>

<table class="h-[80%] w-[80%] table-fixed">
	{#if timetable}
		<thead>
			<tr>
				<th />
				<th>Monday</th>
				<th>Tuesday</th>
				<th>Wednesday</th>
				<th>Thursday</th>
				<th>Friday</th>
			</tr>
		</thead>
		<tbody>
			{#each hours as hour}
				<tr>
					<td>{hour}</td>
					{#each days as day}
						{#each timetable.get(day) || [] as _class}
							{#if _class.from == hour}
								<td rowspan={_class.duration} style="background: var(--{_class.subject?.color})">
									<Tooltip>
										<span class="text-bg text-xl font-bold">{_class.subject?.id}</span>
										<div slot="info">
											<ClassCard {_class} />
										</div>
									</Tooltip>
								</td>
							{/if}
						{/each}
					{/each}
				</tr>
			{/each}
		</tbody>
	{/if}
</table>
