<script>
	import { onMount } from "svelte";

	onMount(() => {
		if(sessionStorage.getItem('user_data')){
			window.location.href = "/"
		}

		remember = true;
		fields.email = localStorage.getItem('user_cookies') ? JSON.parse(localStorage.getItem('user_cookies')).email : '';
	});

	// TITLE
  	import Title from "../../../global/Title.svelte";

	// AXIOS
	import axios from 'axios';

	// YUP
	import * as yup from 'yup';
	import { Form, Message } from 'svelte-yup';

	// URL
	import {PLAIN_URL} from "$lib/env.js";

	const schema = yup.object().shape({
		email: yup.string().required(),
		password: yup.string().required().max(24).min(8),
	});

	// DATA
	let message;
	let remember = false;
	let submitted = false;
	let isValid = false;
	let isLoading = false;
	let isLogin = false;
	const fields = { email: '', password: '' };

	$: if(isLogin){
		window.location.href = "/"
	}

	const onSignIn = async () => {
		isLoading = true;
		submitted = true;
		isValid = schema.isValidSync(fields);

		if(isValid){
			await axios.post(`${PLAIN_URL}/signin`, {
				email: fields.email,
				password: fields.password
			}).then(response => {
				if(response.data.message){
					message = response.data
				}

				if(response.data.token){
					sessionStorage.setItem('user_data', JSON.stringify({
						email: fields.email,
						token: response.data.token,
						user_id: response.data.user_id
					}));

					if(remember){
						localStorage.setItem('user_cookies', JSON.stringify({
							email: fields.email,
						}));
					}else{
						localStorage.removeItem('user_cookies');
					}

					setTimeout(() => {
						isLogin = true;
						remember = true;
					}, 1000);
				}

				isLoading = false;
			}).catch(error => {
				console.log(error);
			});
		}

		isLoading = false;
	}
</script>

<style>
    @import url('../../../app.css');

    .title{
        font-size: 32px;
        text-align: center;
        margin-bottom: 40px;
    }
</style>

<!-- component -->
<div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <span class="title">
        <Title />
    </span>

	<div class="relative py-3 sm:mx-auto" style="width: 28rem;">
		<div
			class="absolute inset-0 bg-gradient-to-r from-red-300 to-red-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
		</div>

		<div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
			<div class="max-w-md mx-auto">

				<div>
					{#if message && message.code}
						{#if message.code === -1}
							<div class="bg-red-100 border border-red-400 mb-7 text-red-700 px-4 py-3 rounded relative" role="alert">
								<span class="block sm:inline">{message.message}</span>
							</div>
						{:else if message.code === 200}
							<div class="bg-green-100 border border-green-400 mb-7 text-green-700 px-4 py-3 rounded relative" role="alert">
								<span class="block sm:inline">{message.message}</span>
							</div>
						{/if}
					{/if}
					<h1 class="text-2xl font-semibold">Sign In</h1>
				</div>

				<div class="divide-y divide-gray-200">
					<div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
						<Form class="form" {fields} {schema} submitHandler={onSignIn} {submitted}>
							<div class="relative">
								<input autocomplete="off" disabled="{isLoading ? true : false }" bind:value={fields.email} id="email" name="email" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
								<label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
								<Message name="email" />
							</div>
							<div class="relative my-4">
								<input autocomplete="off" disabled="{isLoading ? true : false }" bind:value={fields.password} id="password" name="password" type="password" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
								<label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
								<Message name="password" />
							</div>

							<div class="flex items-center mb-4">
								<input id="default-checkbox" disabled="{isLoading ? true : false }" bind:checked={remember} type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
								<label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
							</div>

							<div class="relative">
								<button type="submit" disabled="{isLoading ? true : false }" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
									{#if isLoading}
										<div role="status">
											<svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
												<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
											</svg>
											<span class="sr-only">Loading...</span>
										</div>
									{:else}
										Sign In
									{/if}
								</button>
							</div>
						</Form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>