<script lang="ts">
	import type Teacher from '$lib/models/Teacher';

	export let teacher: Teacher;
</script>

<div class="flex flex-col justify-center items-center">
	<a href={teacher.website} class="text-fg text-xl">
		{teacher.name}
		{teacher.surname}
	</a>
	<a href={teacher.github}>GitHub 🐙</a>
</div>
