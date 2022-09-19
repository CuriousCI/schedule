<script lang="ts">
	import TeacherCard from '$lib/ui/TeacherCard.svelte';
	import Tooltip from '$lib/ui/Tooltip.svelte';
	import '../app.css';
	import type Teacher from '$lib/models/Teacher';

	let teacher: Teacher = {
		id: 'MP',
		name: 'Marco',
		surname: 'Polo',
		github: 'https://github.com/CuriousCI',
		website: ''
	};
</script>

<main class="grid place-items-center h-screen">
	<Tooltip>
		Marco Polo
		<div slot="info">
			<TeacherCard {teacher} />
		</div>
	</Tooltip>
</main>

<style>
</style>
