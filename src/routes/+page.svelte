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
		timetable: Map<string, Class[]> = new Map(),
		links = [
			{
				name: 'GitHub exercises',
				icon: 'qr_code_scanner',
				url: 'https://github.com/orgs/sapienzastudentsnetwork/repositories'
			},
			{
				name: 'Notes bot',
				icon: 'document_scanner',
				url: 'https://t.me/SSN_Notes_Bot'
			},
			{
				name: "Exyss' notes",
				icon: 'add_notes',
				url: 'https://github.com/Exyss/university-notes'
			},
			{
				name: 'Assembly google group',
				icon: 'developer_board',
				url: 'https://groups.google.com/u/1/a/uniroma1.it/g/architettura-degli-elaboratori-2022-23-a-l'
			},
			{
				name: 'Asembly classroom',
				icon: 'settings_input_antenna',
				url: 'https://classroom.google.com/u/1/c/NTYyODM4NDA2NDcy'
			},
			{
				name: 'Asembly slides',
				icon: 'device_hub',
				url: 'https://drive.google.com/drive/folders/1JU1D1xdahVb5hvRDG8aHQFZ73a6arFNo'
			},

			{ name: 'Calculus moodle', icon: 'function', url: 'https://bit.ly/CI202223' },
			{
				name: 'Algorithms forum',
				icon: 'regular_expression',
				url: 'https://twiki.di.uniroma1.it/twiki/view/Intro_algo/AD/WebHome'
			},
			{
				name: 'Algorithms slides',
				icon: 'terminal',
				url: 'https://twiki.di.uniroma1.it/twiki/view/Intro_algo/AD/Dispense'
			},
			{
				name: 'Java classroom',
				icon: 'deployed_code',
				url: 'https://classroom.google.com/u/1/c/NTkzNzA4NTg3MDU5'
			}
		],
		books = [
			{
				name: 'Assembly MIPS',
				icon: 'import_contacts',
				url: 'file:///D:/university/books/Computer%20Organization%20and%20Design%20MIPS%20Edition.pdf'
			},
			{
				name: 'Intro to algorithms',
				icon: 'auto_stories',
				url: 'file:///D:/university/books/Introduction%20To%20Algorithms.pdf'
			},
			{
				name: 'The new Java',
				icon: 'menu_book',
				url: 'file:///D:/university/books/IlNuovoJava.pdf'
			}
		];

	let hash: string | null = '';

	onMount(async () => {
		hash = window.location.hash;
		if (!hash) {
			hash = localStorage.getItem('action');
		}
		if (hash) {
			if (hash == '#Upcoming') {
				action = Menu.Upcoming;
			} else if (hash == '#Schedule') {
				action = Menu.Schedule;
			} else if (hash == '#Tools') {
				action = Menu.Tools;
			} else if (hash == '#Social') {
				action = Menu.Social;
			}
			window.location.hash = `#${action}`;
		}

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
		{#each links as { name, icon, url }}
			<a href={url} target="_blank" rel="noreferrer" class="w-full px-4 text-xl">
				<span class="material-symbols-outlined align-text-bottom">{icon}</span>
				{name}
			</a>
		{/each}
		<div class="mb-2" />
		<hr class="w-full border-bg2 dark:border-dbg2" />
		<h1 class="text-4xl font-bold w-full">Info</h1>
		{#each books as { name, icon, url }}
			<a href={url} target="_blank" rel="noreferrer" class="w-full px-4 text-xl">
				<span class="material-symbols-outlined align-text-bottom">{icon}</span>
				{name}
			</a>
		{/each}
	{:else if action == Menu.Social}
		<h1 class="text-4xl font-bold text-shadow dark w-full">Share</h1>
		<div class="flex gap-4 justify-start">
			<a href="https://github.com/CuriousCI/schedule">
				<img src="github.svg" alt="GitHub logo" class="w-10 ds" />
			</a>
			<button
				class="material-symbols-outlined text-4xl"
				on:click={() => {
					navigator.share({
						title: 'University',
						text: '',
						url: ''
					});
				}}
			>
				share
			</button>
		</div>
	{:else}
		<Timetable {timetable} />
	{/if}
	<div slot="actions" class="px-5 flex items-center justify-evenly">
		{#each actions as { label, icon }}
			<Button
				label={`${label}`}
				selected={label == action}
				onclick={() => {
					action = label;
					window.location.hash = `#${label}`;
					localStorage.setItem('action', `#${label}`);
				}}
			>
				<span class="material-symbols-{action == label ? 'filled' : 'outlined'} text-xl">
					{icon}
				</span>
			</Button>
		{/each}
	</div>
</App>
