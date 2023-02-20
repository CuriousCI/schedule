<script lang="ts">
	import '../app.css';

	import { onMount } from 'svelte';
	import type Teacher from '$lib/models/Teacher';
	import type Building from '$lib/models/Building';
	import type Subject from '$lib/models/Subject';
	import type Class from '$lib/models/Class';
	import App from '$lib/ui/App.svelte';
	import Timetable from '$lib/ui/Timetable.svelte';
	import Button from '$lib/ui/Button.svelte';
	import Day from '$lib/ui/Day.svelte';
	import ThemeSwitch from '$lib/ui/ThemeSwitch.svelte';

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

		const t1: Map<string, { [key: string]: string }[]> = new Map(
			Object.entries(await (await fetch('channel12.json')).json())
		);

		for (let [day, classes] of t1.entries()) {
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

	enum Menu {
		Upcoming = 'Upcoming',
		Schedule = 'Schedule',
		Tools = 'Tools',
		Social = 'Social'
	}

	let action = Menu.Upcoming,
		actions = [
			{ label: Menu.Upcoming, icon: 'today' },
			{ label: Menu.Schedule, icon: 'calendar_view_week' },
			{ label: Menu.Tools, icon: 'build' },
			{ label: Menu.Social, icon: 'share' }
		];

	let tomorrow = new Date(Date.now());
	tomorrow.setDate(tomorrow.getDate() + 1);
</script>

<App>
	<span slot="appbar" class="flex items-center gap-4">
		<ThemeSwitch />
	</span>
	{#if action == Menu.Upcoming}
		<h1 class="text-4xl font-bold w-full">Today</h1>
		<Day
			day={new Date(Date.now()).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()}
			{timetable}
		/>
		<hr class="w-full border-bg2 dark:border-dbg2" />
		<h1 class="text-4xl font-bold text-shadow dark w-full">Tomorrow</h1>
		<Day
			day={tomorrow.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()}
			{timetable}
		/>
	{:else if action == Menu.Tools}
		<h1 class="text-4xl font-bold w-full">Links</h1>
		<a
			href="https://github.com/orgs/sapienzastudentsnetwork/repositories"
			target="_blank"
			rel="noreferrer"
			class="w-full text-xl font-bold p-2 rounded-2xl flex flex-col items-center justify-center bg-bg dark:bg-dbg shadow-lg dark:shadow-black"
		>
			Sapienza Students Network
		</a>
		<a
			href="https://github.com/orgs/sapienzastudentsnetwork/repositories"
			target="_blank"
			rel="noreferrer"
			class="w-full text-xl font-bold p-2 rounded-2xl flex flex-col items-center justify-center bg-bg dark:bg-dbg shadow-lg dark:shadow-black"
		>
			Sapienza Students Network 2
		</a>
		<div class="mb-2" />
		<hr class="w-full border-bg2 dark:border-dbg2" />
		<h1 class="text-4xl font-bold w-full">Info</h1>
		<div
			class="w-full text-xl font-bold p-2 rounded-2xl flex flex-col items-center justify-center bg-bg dark:bg-dbg shadow-lg dark:shadow-black"
		>
			Random ducking info
		</div>
	{:else if action == Menu.Social}
		GitHub, Share button
	{:else}
		<Timetable {timetable} />
	{/if}
	<div slot="actions" class="flex items-center justify-evenly">
		{#each actions as { label, icon }}
			<Button label={`${label}`} selected={label == action} onclick={() => (action = label)}>
				<span class="material-symbols-{action == label ? 'filled' : 'outlined'} text-xl">
					{icon}
				</span>
			</Button>
		{/each}
	</div>
</App>
