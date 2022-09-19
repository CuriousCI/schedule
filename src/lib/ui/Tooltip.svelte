<script lang="ts">
	let hover: boolean = false;
</script>

<div
	on:focus={() => {}}
	on:blur={() => {}}
	on:mouseover={() => (hover = true)}
	on:mouseleave={() => (hover = false)}
	class="relative w-min whitespace-nowrap"
>
	{#if hover}
		<span
			class="absolute -translate-y-1/2 -translate-x-1/2 w-fit p-4 border-2 bg-bg text-fg border-fg"
		>
			<slot name="info" />
		</span>
	{:else}
		<slot />
	{/if}
</div>
