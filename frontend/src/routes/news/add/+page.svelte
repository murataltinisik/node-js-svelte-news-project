<script>
    import {onMount} from "svelte";

    // GLOBAL
    import Navbar from '../../../global/Navbar.svelte';

    // FORM
    import * as yup from 'yup'
    import { Form, Message } from 'svelte-yup';

    // FOR REQUEST
    import axios from "axios";
    import { API_URL } from "$lib/env.js";

    // FORM VARIABLES
    let message;
    let isFinish = false;
    let submitted = false;
    const fields = { image: '', title: '', tag: '', content: '' };
    const schema = yup.object().shape({
        image: yup.string().required().min(20),
        title: yup.string().required().min(20).max(160),
        tag: yup.string().required().min(1),
        content: yup.string().required().min(10).max(1000)
    });

    //
    let isAccess = false;
    let author;

    onMount(() => {
        if(sessionStorage.getItem('user_data')){
            const { role, token, user_id } = JSON.parse(sessionStorage.getItem('user_data'));

            if(role === 1){
                author = { token, user_id };
                isAccess = true;
            }else{
                return window.location.href = "/"
            }
        }
    });

    const submitHandler = async () => {
        isFinish = true;
        submitted = true;
        const isValid = schema.isValidSync(fields);

        const config = {
            headers: {
                'x-access-token': author.token
            }
        }

        if(isValid){
            await axios.post(`${API_URL}/news`,
                {
                    title: fields.title,
                    content: fields.content,
                    tag: fields.tag,
                    image: fields.image,
                    author_id: author.user_id
                }, config)
            .then(response => {
                if(response.data.code === 200){
                    message = response.data
                    isFinish = false;

                    setTimeout(() => {
                        window.location.reload();
                    }, 700);
                }
            }).catch(error => {
                console.log(error);
            });
        }
        isFinish = false;
    }
</script>

<div class="container">
    <!-- NAVBAR -->
    <Navbar/>

    {#if isAccess}
    <!-- HEAD -->
    <div class="head">
        <h2>Add News</h2>
    </div>

    <!-- CONTENT -->
    <div class="content m-auto">
        <div class="m-auto" style="width: 32rem;">
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

                <div class="mt-5 bg-white rounded-lg shadow">
                    <div class="flex">
                        <div class="flex-1 py-5 pl-5 overflow-hidden">
                            <h1 class="inline text-2xl font-semibold leading-none">Add News</h1>
                        </div>
                    </div>

                    <Form {fields} {schema} {submitHandler} {submitted}>
                        <div class="px-5 pb-5">
                            <input name="image" bind:value={fields.image} type="text" placeholder="Image" class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400">
                            <Message name="image" />
                            <input name="title" bind:value={fields.title} placeholder="Title" class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400">
                            <Message name="title" />
                            <input name="tag" bind:value={fields.tag} placeholder="Tag" class=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400">
                            <Message name="tag" />
                            <textarea name="content" bind:value={fields.content} placeholder="Content" style="max-height: 150px; min-height: 150px;" class=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"></textarea>
                            <Message name="content" />
                        </div>

                        <hr class="mt-4">
                        <div class="flex flex-row-reverse p-3">
                            <div class="flex-initial pl-3">
                                <button type="submit" disabled="{isFinish ? true:false}" class="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out">
                                    {#if !isFinish}
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
                                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                                        <path d="M5 5v14h14V7.83L16.17 5H5zm7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H6V6h9v4z" opacity=".3"></path>
                                        <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"></path>
                                    </svg>
                                    <span class="pl-2 mx-1">Save</span>
                                    {:else}
                                        <div role="status">
                                            <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    {/if}
                                </button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
    {/if}
</div>