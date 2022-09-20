<script lang="ts">
	import '../app.css';
	import type Teacher from '$lib/models/Teacher';
	import type Building from '$lib/models/Building';
	import type Subject from '$lib/models/Subject';
	import type Class from '$lib/models/Class';
	import Timetable from '$lib/ui/Timetable.svelte';
	import { onMount } from 'svelte';

	let teachers: Map<string, Teacher>,
		buildings: Map<string, Building>,
		subjects: Map<string, Subject>,
		timetable: Map<string, Class[]> = new Map();

	onMount(async () => {
		teachers = new Map(
			(await (await fetch('teachers.json')).json()).map((teacher: Teacher) => [teacher.id, teacher])
		);

		buildings = new Map(
			(await (await fetch('buildings.json')).json()).map((building: Building) => [
				building.code,
				building
			])
		);

		subjects = new Map(
			(await (await fetch('subjects.json')).json()).map((subject: Subject) => [subject.id, subject])
		);

		const t: Map<string, { [key: string]: string }[]> = new Map(
			Object.entries(await (await fetch('timetable.json')).json())
		);

		for (let [day, classes] of t.entries()) {
			timetable.set(
				day,
				classes.map((_class: { [key: string]: string }) => {
					return {
						subject: subjects.get(_class['subject']),
						teacher: teachers.get(_class['teacher']),
						building: buildings.get(_class['building']),
						from: _class['from'],
						to: _class['to'],
						duration: parseInt(_class['duration'])
					} as Class;
				})
			);
		}

		timetable = timetable;
	});
</script>

<main class="grid place-items-center h-screen">
	<Timetable {timetable} />
</main>
