<script>
	import {onMount} from "svelte";

	import '../app.css'
	import { page } from '$app/stores'
  	import Fa from 'svelte-fa';
	import { faSearch } from '@fortawesome/free-solid-svg-icons'
  	import Title from './Title.svelte';

	// FOR REQUEST
	import axios from "axios";
	import { API_URL } from "$lib/env.js";

	// OPEN MENU
	let isOpenMenu = false;

	// VARIABLES
	let userdata;
	let isLoading = false;
	let isAuthenticate = false;

	onMount(() => {
		if(sessionStorage.getItem('user_data')){
			isAuthenticate = true
			userdata = JSON.parse(sessionStorage.getItem('user_data'));
		}
		isLoading = true;
	});

	// SIGN OUT
	const onSignOut = () => {
		// SESSION STORAGE
		sessionStorage.removeItem('user_data');
		window.location.reload();
	}

	// ON BE WRITER
	const onBeWriter = async () => {
		const { user_id, token } = userdata;

		await axios.put(`${API_URL}/users/be-writer/${user_id}?token=${token}`).then(response => {
			if(response.data.code === 200){
				userdata.role = 1;
				sessionStorage.setItem('user_data', JSON.stringify(userdata));
				window.location.reload();
			}
		}).catch(error => {
			console.log(error);
		});
	}

	// ACTIVE LINKS
	const activeLink = "md:bg-transparent md:text-red-500 dark:text-white md:dark:text-red-500";
</script>

<!-- NAVBAR -->
<nav class="bg-white border-gray-200 dark:bg-gray-900">
	<div class="loading" style={isLoading ? 'opacity: 0; display: none;': ''}>
		<div role="status">
			<svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
				<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
			</svg>
			<span class="sr-only">Loading...</span>
		</div>

		<strong>LOADING...</strong>
	</div>
	<div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
		<a href="/" class="flex items-center">
			<h1 class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
				<Title />
			</h1>
		</a>

		<button
			data-collapse-toggle="navbar-default"
			type="button"
			class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
			aria-controls="navbar-default"
			aria-expanded="false"
		>
			<span class="sr-only">Open main menu</span>
			<svg
				class="w-6 h-6"
				aria-hidden="true"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
					clip-rule="evenodd"
				></path>
			</svg>
		</button>

		<div class="hidden w-full md:block md:w-auto" id="navbar-default">
			<ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
				<li>
					<a
						href="/"
						class={`${$page.url.pathname === "/" && activeLink} block py-2 pl-3 pr-4 rounded md:p-0`}
					>
						Home
					</a>
				</li>
				<li>
					<a
						href="/news"
						class={`${$page.url.pathname.indexOf('news') === 1 && activeLink} block py-2 pl-3 pr-4 rounded md:p-0`}
					>
						News
					</a>
				</li>
				<li>
					<a
						href="/about"
						class={`${$page.url.pathname.indexOf('about') === 1 && activeLink} block py-2 pl-3 pr-4 rounded md:p-0`}
					>
						About
					</a>
				</li>
			</ul>
		</div>

		<div class="flex items-center relative">
			<a href="/news">
				<Fa icon={faSearch}/>
			</a>

			{#if !isAuthenticate}
				<a href="/auth/signin">
					<button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 mx-3 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
						Sign In
					</button>
				</a>

				<a href="/auth/signup">
					<button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
						Sign Up
					</button>
				</a>
			{:else}
				<button on:click={() => isOpenMenu = !isOpenMenu} data-dropdown-toggle="dropdown" class="ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">{userdata.email} <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
				<!-- Dropdown menu -->
				<div class={`${isOpenMenu ? "":'hidden'} absolute top-16 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
					<ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
						<li>
							<a href="/profile" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</a>
						</li>
						<li>
							<a href="/" on:click={onSignOut} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
						</li>
					</ul>
				</div>
			{/if}
		</div>
	</div>

	{#if isAuthenticate && userdata.role === 0}
		<button type="button" on:click={onBeWriter} class="text-gray-900 fixed bottom-8 left-8 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
			Be a Writer
		</button>
	{:else}
		<a href="/news/add" class="text-gray-900 fixed bottom-8 left-8 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">New add</a>
	{/if}
</nav>

<style lang="scss">
	.loading{
		transition: all .2s ease;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #fff;
		z-index: 999;
		opacity: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>