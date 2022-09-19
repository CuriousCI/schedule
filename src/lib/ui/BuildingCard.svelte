<script lang="ts">
	import type Building from '$lib/models/Building';

	export let building: Building;
</script>

<div class="flex flex-col justify-center items-center">
	<span class="text-xl mb-2">
		{building.code}
		<b>{building.room}</b>
	</span>
	<iframe
		src={building.map}
		title="Google Maps"
		width="600"
		height="450"
		style="border:0;"
		allowfullscreen={true}
		loading="lazy"
		referrerpolicy="no-referrer-when-downgrade"
	/>
</div>
