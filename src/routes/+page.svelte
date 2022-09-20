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
		channel1: Map<string, Class[]> = new Map(),
		channel2: Map<string, Class[]> = new Map();

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

		const t1: Map<string, { [key: string]: string }[]> = new Map(
			Object.entries(await (await fetch('channel1.json')).json())
		);

		for (let [day, classes] of t1.entries()) {
			channel1.set(
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

		channel1 = channel1;

		const t2: Map<string, { [key: string]: string }[]> = new Map(
			Object.entries(await (await fetch('channel2.json')).json())
		);

		for (let [day, classes] of t2.entries()) {
			channel2.set(
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

		channel2 = channel2;
	});
</script>

<main class="grid place-items-center h-screen">
	<h1 class="self-end text-xl font-bold">Channel 1</h1>
	<Timetable timetable={channel1} />

	<h1 class="self-end text-xl font-bold">Channel 2</h1>
	<Timetable
		timetable={channel2}
		hours={[
			'08:00',
			'09:00',
			'10:00',
			'11:00',
			'12:00',
			'13:00',
			'14:00',
			'15:00',
			'16:00',
			'17:00',
			'18:00'
		]}
	/>
</main>
