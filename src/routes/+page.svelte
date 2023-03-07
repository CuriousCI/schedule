<script lang="ts">
	import '../app.css';

	import { onMount } from 'svelte';
	import type Teacher from '$lib/models/Teacher';
	import type Building from '$lib/models/Building';
	import type Subject from '$lib/models/Subject';
	import type Class from '$lib/models/Class';
	import type Link from '$lib/models/Link';
	import App from '$lib/ui/App.svelte';
	import Timetable from '$lib/ui/Timetable.svelte';
	import Button from '$lib/ui/Button.svelte';
	import Day from '$lib/ui/Day.svelte';

	let teachers: Map<string, Teacher>,
		buildings: Map<string, Building>,
		subjects: Map<string, Subject>,
		timetable: Map<string, Class[]> = new Map(),
		links: Link[] = [],
		books: Link[] = [],
		hash: string | null,
		action = 'Upcoming',
		actions = [
			{ label: 'Upcoming', icon: 'today' },
			{ label: 'Schedule', icon: 'calendar_view_week' },
			{ label: 'Tools', icon: 'build' },
			{ label: 'Social', icon: 'share' }
		];

	let tomorrow = new Date(Date.now());
	tomorrow.setDate(tomorrow.getDate() + 1);

	onMount(async () => {
		hash = window.location.hash;
		if (!hash) hash = localStorage.getItem('action');
		if (hash) action = hash.substring(1);

		function toMap(object: Object) {
			return new Map(Object.entries(object));
		}

		links = await (await fetch('links.json')).json();
		books = await (await fetch('books.json')).json();
		teachers = toMap(await (await fetch('teachers.json')).json());
		buildings = toMap(await (await fetch('buildings.json')).json());
		subjects = toMap(await (await fetch('subjects.json')).json());

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
</script>

<App>
	{#if action == 'Upcoming'}
		<h1>Today</h1>
		<Day
			day={new Date(Date.now()).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()}
			{timetable}
		/>
		<hr />
		<h1>Tomorrow</h1>
		<Day
			day={tomorrow.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()}
			{timetable}
		/>
	{:else if action == 'Tools'}
		<h1>Links</h1>
		{#each links as { name, icon, url }}
			<a href={url} target="_blank" rel="noreferrer" class="w-full px-4 text-xl">
				<span class="material-symbols-outlined align-text-bottom">{icon}</span>
				{name}
			</a>
		{/each}
		<div class="mb-2" />
		<hr class="w-full border-bg2 dark:border-dbg2" />
		<h1>Info</h1>
		{#each books as { name, icon, url }}
			<a href={url} target="_blank" rel="noreferrer" class="w-full px-4 text-xl">
				<span class="material-symbols-outlined align-text-bottom">{icon}</span>
				{name}
			</a>
		{/each}
	{:else if action == 'Social'}
		<h1>Share</h1>
		<div class="flex gap-4 justify-start">
			<a href="https://github.com/CuriousCI/schedule">
				<img src="github.svg" alt="GitHub logo" class="w-10 ds" />
			</a>
			<button
				class="material-symbols-outlined text-4xl"
				on:click={() => {
					navigator.share({ title: 'University' });
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
					window.location.hash = `#${action}`;
					localStorage.setItem('action', `#${action}`);
				}}
			>
				<span class="material-symbols-{action == label ? 'filled' : 'outlined'} text-xl">
					{icon}
				</span>
			</Button>
		{/each}
	</div>
</App>
