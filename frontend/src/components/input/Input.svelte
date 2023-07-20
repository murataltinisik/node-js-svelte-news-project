<script>
    import Fa from 'svelte-fa'
    export let icon="", type="text", name="", placeholder="", button="";
</script>


<!-- INPUT GROUP -->
<div class="relative">
    {#if icon}
        <!-- ICON -->
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Fa icon={icon}/>
        </div>
    {/if}

    <!-- INPUT -->
	<input
		type={type}
        name={name}
		placeholder={placeholder}
		class={`${icon && "pl-10"} outline-none block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500`}
	/>

    {#if button}
        <!-- BUTTON -->
        <button
            type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
            {button}
        </button>
    {/if}
</div>