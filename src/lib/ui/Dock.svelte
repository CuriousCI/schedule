<script lang="ts">
	export let open: boolean = true;
	// fullpage
	// transulcent background maybe?
	// white line to drag or arrow up
</script>

{#if open}
	<div
		class="w-full h-full absolute top-0 left-0 bg-bg1 dark:bg-dbg1 blur-sm rounded-none opacity-50"
		on:click={() => (open = false)}
	/>
	<div
		class="w-full h-1/2 rounded-t-[50px] absolute bottom-0 left-0 grid place-items-center bg-bg dark:bg-dbg text-fg dark:text-dfg blur-none"
	>
		<span
			class="material-symbols-filled text-xl absolute top-[35px] right-[35px] cursor-pointer"
			on:click={() => (open = false)}
		>
			close
		</span>
		Hi, I'm just testing the dock
	</div>
{/if}

<style>
</style>
