<script lang="ts">
	import type Class from '$lib/models/Class';
	import ClassCard from './ClassCard.svelte';
	import Tooltip from './Tooltip.svelte';

	export let timetable: Map<string, Class[]>;

	let hours: string[] = ['08:00', '09:00', '10:00', '11:00', '12:00'],
		days: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
</script>

<!-- Math.abs(date1 - date2) / 36e5 -->

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
								<td rowspan={_class.duration}>
									<Tooltip>
										{_class.subject?.id}
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
			<!-- <tr>
			<td>08:00 - 09:00</td>
			<td rowspan="3">proa</td>
			<td>test</td>
			<td>bella</td>
			<td>come va</td>
			<td>come va</td>
		</tr> -->
		</tbody>
	{/if}
</table>
