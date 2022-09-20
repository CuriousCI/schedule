<script lang="ts">
	import type Class from '$lib/models/Class';
	import BuildingCard from './BuildingCard.svelte';
	import TeacherCard from './TeacherCard.svelte';
	import Tooltip from './Tooltip.svelte';

	export let _class: Class | undefined = undefined;
</script>

<main class="flex flex-col justify-center items-center">
	{#if _class}
		<h1>{_class.subject?.teaching}</h1>
		<h2>{_class.from} - {_class.to}</h2>

		<br />
		<hr />

		<Tooltip>
			{_class.teacher?.name}
			{_class.teacher?.surname}
			<div slot="info">
				<TeacherCard teacher={_class.teacher} />
			</div>
		</Tooltip>

		<hr />

		<Tooltip>
			{_class.building?.code}
			{_class.building?.room}
			<div slot="info">
				<BuildingCard building={_class.building} />
			</div>
		</Tooltip>
	{/if}
</main>
