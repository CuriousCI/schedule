<script lang="ts">
	import type Class from '$lib/models/Class';

	export let _class: Class | undefined = undefined;
	let viewBuilding: boolean = false;
</script>

<main class="w-full flex flex-col items-center">
	{#if _class}
		<h1 class="font-bold text-3xl text-center" style="color: var(--{_class.subject?.color});">
			{_class.subject?.teaching}
		</h1>
		<h2 class="italic text-xl text-center">{_class.from} - {_class.to}</h2>

		<br />

		<h2
			class="italic text-xl text-center cursor-pointer underline"
			on:click={() => (viewBuilding = !viewBuilding)}
		>
			<span class="font-bold">{_class.building?.code}</span>
			{_class.building?.room}
		</h2>

		<br />
		{#if viewBuilding}
			<iframe
				src={_class.building?.map}
				title="Google Maps"
				style="border:0;"
				width="100%"
				height="1000"
				allowfullscreen={true}
				allowtransparency={true}
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
			/>

			<br />
		{/if}

		<br />

		{#if _class.teacher?.picture}
			<img
				src={_class.teacher.picture}
				alt="{_class.teacher.name} {_class.teacher.surname}"
				class="rounded-full h-64 border-2"
				style="color: var(--{_class.subject?.color});"
			/>
			<br />
		{/if}
		<h2 class="font-bold text-3xl text-center">
			{_class.teacher?.name}
			{_class.teacher?.surname}
		</h2>
		<br />
		<div class="flex items-center justify-center gap-5 text-center">
			{#if _class.teacher?.github}
				<a href={_class.teacher?.github} target="_blank">
					<span class="material-symbols-filled text-4xl"> code </span>
				</a>
			{/if}
			{#if _class.teacher?.profile}
				<a href={_class.teacher?.profile} target="_blank">
					<span class="material-symbols-outlined text-4xl"> feed </span>
				</a>
			{/if}
			{#if _class.teacher?.website}
				<a href={_class.teacher?.website} target="_blank">
					<span class="material-symbols-outlined text-4xl"> home </span>
				</a>
			{/if}
			{#if _class.teacher?.email}
				<a href="mailto:{_class.teacher?.email}" target="_blank">
					<span class="material-symbols-outlined text-4xl"> mail </span>
				</a>
			{/if}
		</div>
		<br />
	{/if}
</main>
