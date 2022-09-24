<script lang="ts">
	import type Teacher from '$lib/models/Teacher';

	export let teacher: Teacher | undefined;
</script>

<div class="flex flex-col justify-center items-center">
	<span class="text-xl mb-2">
		{teacher?.name}
		{teacher?.surname}
	</span>
	{#if teacher?.picture}
		<img src={teacher.picture} alt="{teacher.name} {teacher.surname}" />
		<br />
	{/if}
	{#if teacher?.github}
		<a href={teacher?.github}>GitHub 🐙</a>
	{/if}
	{#if teacher?.profile}
		<a href={teacher?.profile}>Profilo ️📰</a>
	{/if}
	{#if teacher?.email}
		<a href="mailto:{teacher?.email}">Email 📤</a>
	{/if}
	{#if teacher?.website}
		<a href={teacher?.website}>Sito ⌨️</a>
	{/if}
</div>
