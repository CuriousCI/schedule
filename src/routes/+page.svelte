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
	import Day from '$lib/ui/Day.svelte';
	import QToA from '$lib/ui/QToA.svelte';

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

	enum Menu {
		Today = 'Today',
		Tomorrow = 'Tomorrow',
		Schedule = 'Schedule',
		Tools = 'Tools'
	}

	let action = Menu.Today,
		actions = [
			{
				label: Menu.Today,
				icon: 'today'
			},
			{
				label: Menu.Tomorrow,
				icon: 'early_on'
			},
			{
				label: Menu.Schedule,
				icon: 'calendar_view_week'
			},
			{
				label: Menu.Tools,
				icon: 'build'
			}
		],
		openDock = false,
		channel: number;

	let tomorrow = new Date(Date.now());
	tomorrow.setDate(tomorrow.getDate() + 1);
</script>

<App bind:channel>
	{#if action == Menu.Today}
		<Day
			day={new Date(Date.now())
				.toLocaleDateString('en-US', {
					weekday: 'long'
				})
				.toLowerCase()}
			timetable={channel == 1 ? channel1 : channel2}
		/>
	{:else if action == Menu.Tomorrow}
		<Day
			day={tomorrow
				.toLocaleDateString('en-US', {
					weekday: 'long'
				})
				.toLowerCase()}
			timetable={channel == 1 ? channel1 : channel2}
		/>
	{:else if action == Menu.Tools}
		<div class="h-[80%] w-[80%]">
			<a
				href="https://q2a.di.uniroma1.it/fondamenti-di-programmazione-22-23?course=fondamenti-di-programmazione-22-23"
				target="_blank"
				class="w-full border-2 rounded-[50px] grid place-items-center p-5"
			>
				<QToA />
			</a>
			<br />
			<a
				href="https://sites.google.com/uniroma1.it/mmi2223/home"
				target="_blank"
				class="w-full text-2xl border-2 rounded-[50px] grid place-items-center p-5"
			>
				Metodi Matematici
			</a>
		</div>
	{:else}
		<Timetable
			timetable={channel == 1 ? channel1 : channel2}
			hours={channel == 2
				? [
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
				  ]
				: ['08:00', '09:00', '10:00', '11:00', '12:00']}
		/>
	{/if}
	<div slot="actions" class="flex items-center justify-evenly gap-4">
		{#each actions as { label, icon }}
			<Button label={`${label}`} selected={label == action} onclick={() => (action = label)}>
				<span class="material-symbols-{action == label ? 'filled' : 'outlined'} text-xl">
					{icon}
				</span>
			</Button>
		{/each}
	</div>
</App>
