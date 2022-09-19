<script lang="ts">
	import '../app.css';
	import TeacherCard from '$lib/ui/TeacherCard.svelte';
	import Tooltip from '$lib/ui/Tooltip.svelte';
	import type Teacher from '$lib/models/Teacher';
	import type Building from '$lib/models/Building';
	import { onMount } from 'svelte';
	import BuildingCard from '$lib/ui/BuildingCard.svelte';
	import type Subject from '$lib/models/Subject';
	import Timetable from '$lib/ui/Timetable.svelte';

	let teachers: Teacher[] = [];
	let buildings: Building[] = [];
	let subjects: Subject[] = [];

	onMount(async () => {
		teachers = await (await fetch('teachers.json')).json();
		buildings = await (await fetch('buildings.json')).json();
		subjects = await (await fetch('subjects.json')).json();
	});
</script>

<main class="grid place-items-center h-screen">
	<Timetable timetable={{}} />
	<!-- {#each teachers as teacher}
		<Tooltip>
			{teacher.name}
			{teacher.surname}
			<div slot="info">
				<TeacherCard {teacher} />
			</div>
		</Tooltip>
	{/each}

	{#each buildings as building}
		<Tooltip>
			{building.code}
			<div slot="info">
				<BuildingCard {building} />
			</div>
		</Tooltip>
	{/each} -->
</main>

<style>
</style>
