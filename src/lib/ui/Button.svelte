<script lang="ts">
	export let label: string = '',
		selected: boolean = false,
		onclick: () => void;
</script>

<button class="w-20 flex flex-col items-center gap-1" on:click={onclick}>
	<div style="{selected ? 'background-color: var(--bg1)' : ''};" class="w-14 p-0 rounded-full">
		<slot />
	</div>
	<span class="text-xs" style={selected ? 'font-weight: bold' : ''}>{label}</span>
</button>
