<script lang="ts">
	import type Teacher from '$lib/models/Teacher';

	export let teacher: Teacher | undefined;
</script>

<div class="flex flex-col justify-center items-center">
	<span class="text-xl mb-2">
		{teacher?.name}
		{teacher?.surname}
	</span>
	<a href={teacher?.github}>GitHub 🐙</a>
	<a href={teacher?.website}>Sito ⌨️</a>
	<a href="mailto:{teacher?.website}">Email 📤</a>
</div>
