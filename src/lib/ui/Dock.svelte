<script lang="ts">
	export let open: boolean = false,
		fullPage: boolean = false;

	$: if (!open) fullPage = false;
</script>

{#if open}
	<div
		class="w-full h-full absolute z-40  top-0 left-0 bg-bg1 dark:bg-dbg1 rounded-none opacity-60"
		on:click={() => (open = false)}
		on:keyup={() => {}}
	/>
	<div
		style="height: {fullPage ? '100%' : '50%'};"
		class="w-full rounded-t-3xl absolute z-50 bottom-0 left-0 grid place-items-center bg-bg dark:bg-dbg text-fg dark:text-dfg duration-300"
	>
		<button
			class="material-symbols-filled absolute left-1/2 top-[35px] text-3xl"
			on:click={() => (fullPage = !fullPage)}
		>
			{#if fullPage}
				expand_more
			{:else}
				expand_less
			{/if}
		</button>
		<button
			class="material-symbols-filled text-xl absolute top-[35px] right-[35px]"
			on:click={() => (open = false)}
		>
			close
		</button>
		<div class="w-full max-h-[calc(100%-96px)] box-border absolute top-24 pl-5 overflow-y-scroll">
			<slot />
		</div>
	</div>
{/if}

<style>
</style>
