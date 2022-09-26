<script lang="ts">
	export let open: boolean = true,
		fullPage = false;
</script>

{#if open}
	<div
		class="w-full h-full absolute top-0 left-0 bg-bg1 dark:bg-dbg1 blur-sm rounded-none opacity-50"
		on:click={() => (open = false)}
	/>
	<div
		style="height: {fullPage ? '100%' : '50%'};"
		class="w-full rounded-t-[50px] absolute bottom-0 left-0 grid place-items-center bg-bg dark:bg-dbg text-fg dark:text-dfg blur-none"
	>
		<span
			class="material-symbols-filled absolute left-1/2 top-[35px] text-3xl"
			on:click={() => (fullPage = !fullPage)}
		>
			{#if fullPage}
				expand_more
			{:else}
				expand_less
			{/if}
		</span>
		<span
			class="material-symbols-filled text-xl absolute top-[35px] right-[35px] cursor-pointer"
			on:click={() => (open = false)}
		>
			close
		</span>
		<div class="w-full max-h-full box-border absolute top-24 pl-5 overflow-y-scroll">
			<slot />
		</div>
	</div>
{/if}

<style>
</style>
