<script lang="ts">
	let hover: boolean = false;
</script>

<div
	on:focus={() => {}}
	on:blur={() => {}}
	on:mouseover={() => (hover = true)}
	on:mouseleave={() => (hover = false)}
	class="relative whitespace-nowrap"
>
	<slot />
	{#if hover}
		<!-- <span class="z-10 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit p-4 border-2 bg-bg">
			<slot name="info" />
		</span> -->
		<span class="z-10 absolute  -translate-y-1/2 w-fit p-4 border-2 bg-bg">
			<slot name="info" />
		</span>
	{/if}
</div>
