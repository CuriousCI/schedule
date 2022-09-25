<script lang="ts">
	import '../app.css';

	import type Teacher from '$lib/models/Teacher';
	import type Building from '$lib/models/Building';
	import type Subject from '$lib/models/Subject';
	import type Class from '$lib/models/Class';
	import App from '$lib/ui/App.svelte';
	import Timetable from '$lib/ui/Timetable.svelte';
	import { onMount } from 'svelte';
	import Button from '$lib/ui/Button.svelte';

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

	let actions = [
		{
			label: 'Oggi',
			icon: 'today',
			selected: true
		},
		{
			label: 'Domani',
			icon: 'early_on',
			selected: false
		},
		{
			label: 'Calendario',
			icon: 'calendar_view_week',
			selected: false
		}
	];
</script>

<!-- <main class="grid place-items-center h-screen"> -->
<!-- <h1 class="self-end text-xl font-bold">Channel 1</h1> -->
<App>
	<Timetable timetable={channel1} />
	<div slot="actions" class="flex items-center justify-evenly gap-4">
		{#each actions as { label, icon, selected }}
			<Button
				{label}
				bind:selected
				onclick={() => {
					for (let index in actions) actions[index].selected = actions[index].label == label;
				}}
			>
				{#if selected}
					<span class="material-symbols-filled text-xl"> {icon} </span>
				{:else}
					<span class="material-symbols-outlined text-xl"> {icon} </span>
				{/if}
			</Button>
		{/each}
		<!-- <Button label="Oggi" selected={true} onclick={() => {}}>
			<span class="material-symbols-outlined text-xl"> today </span>
		</Button>
		<Button label="Domani" onclick={() => {}}>
			<span class="material-symbols-outlined text-xl"> early_on </span>
		</Button>
		<Button label="Calendario" onclick={() => {}}>
			<span class="material-symbols-outlined text-xl"> calendar_view_week </span>
		</Button> -->
	</div>
</App>
<!-- </main> -->

<!-- <h1 class="self-end text-xl font-bold">Channel 2</h1> -->
<!-- <Timetable
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
	/> -->
