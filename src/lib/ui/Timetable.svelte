<script lang="ts">
	import type Class from '$lib/models/Class';

	export let timetable: { [day: string]: Class[] },
		selectedClass: Class | undefined = undefined;

	let schedule: Date[] = [
		new Date('01-01-1990 08:00'),
		new Date('01-01-1990 09:00'),
		new Date('01-01-1990 10:00'),
		new Date('01-01-1990 11:00'),
		new Date('01-01-1990 12:00')
	];
</script>

<!-- Math.abs(date1 - date2) / 36e5 -->

<table class="h-[80vh] w-[80vw] table-fixed">
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
		{#each schedule as hour}
			<tr>
				<td>{hour.toLocaleTimeString('it').slice(0, 5)}</td>
				<!-- {#each timetable.keys() as { hour, _class }}
					<td>{hour}</td>
				{/each} -->
			</tr>
		{/each}
		<!-- <tr>
			<td>08:00 - 09:00</td>
			<td rowspan="3">proa</td>
			<td>test</td>
			<td>bella</td>
			<td>come va</td>
			<td>come va</td>
		</tr>
		<tr>
			<td>08:00 - 09:00</td>
			<td>proa</td>
			<td>test</td>
			<td>bella</td>
			<td>come va</td>
		</tr>
		<tr>
			<td>08:00 - 09:00</td>
			<td>proa</td>
			<td>test</td>
			<td>bella</td>
			<td>come va</td>
		</tr>
		<tr>
			<td>08:00 - 09:00</td>
			<td>proa</td>
			<td>test</td>
			<td>bella</td>
			<td>come va</td>
			<td>come va</td>
		</tr>
		<tr>
			<td>08:00 - 09:00</td>
			<td>proa</td>
			<td>test</td>
			<td>bella</td>
			<td>come va</td>
			<td>come va</td>
		</tr> -->
	</tbody>
</table>
