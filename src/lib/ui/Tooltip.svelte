<script lang="ts">
	let hover: boolean = false,
		x: number = 0,
		y: number = 0,
		innerWidth: number;

	function onEnter(e: MouseEvent) {
		x = e.pageX;
		y = e.pageY;
	}
</script>

<svelte:window bind:innerWidth />

<div
	on:focus={() => {}}
	on:blur={() => {}}
	on:mouseenter={onEnter}
	on:mouseover={() => (hover = true)}
	on:mouseleave={() => (hover = false)}
	class="relative whitespace-nowrap bg-opacity-0"
>
	<slot />
	{#if hover}
		{#if x > innerWidth / 2}
			<span class="z-10 absolute left-1/2 -translate-x-full -translate-y-1/2 w-fit p-4 border-2">
				<slot name="info" />
			</span>
		{:else}
			<span class="z-10 absolute -translate-y-1/2 w-fit p-4 border-2">
				<slot name="info" />
			</span>
		{/if}
	{/if}
</div>

<style>
	div {
		background: rgba(0, 0, 0, 0);
	}
</style>
