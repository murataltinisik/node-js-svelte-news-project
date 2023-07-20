<script>
    import { onMount } from "svelte";

    // COMPONENTS
    import Footer from "../../global/Footer.svelte";
    import Navbar from "../../global/Navbar.svelte";

    // YUP
    import * as yup from 'yup';
    import { Form, Message } from 'svelte-yup';

    // AXIOS
    import axios from 'axios';

    // URL
    import { API_URL } from "$lib/env.js";

    // DATA
    let message;
    let isShowMessage = false;
    let isLoading = false;
    let isSubmittedAccount = false;
    let isSubmittedPassword = false;
    let isValidAccount = false;
    let isValidPassword = false;
    const otherDetail = {
        name: '',
        surname: '',
        email: '',
        last_login: '',
        created_at: '',
        role: ''
    };
    const fields = {
        name: '',
        surname: '',
        email: ''
    };
    const fieldsPass = {
        old_pass: '',
        new_pass: '',
        confirm_pass: ''
    }

    // SCHEMA ACCOUNT
    const schemaAccount = yup.object().shape({
        name: yup.string().required().min(4),
        surname: yup.string().required().min(4),
        email: yup.string().required().min(4),
    });

    // SCHEMA PASSWORD
    const schemaPassword = yup.object().shape({
        old_pass: yup.string().required().min(6),
        new_pass: yup.string().required().min(6),
        confirm_pass: yup.string().oneOf([yup.ref('new_pass'), null], 'Passwords not match!')
    });

    const takeUserIdAndToken = () => {
        return JSON.parse(sessionStorage.getItem('user_data'));;
    }

    // GET PROFILE DATA
    const getProfileData = async () => {
        isLoading = true;

        const { user_id, token } = takeUserIdAndToken();

        // HEADERS
        const config = {
            headers: {
                'x-access-token': token
            }
        }

        // AXIOS
        await axios.get(`${API_URL}/profile/${user_id}`, config)
            .then(response => {
                if(response.data){
                    const { name, surname, email, last_login, created_at, role } = response.data;

                    // FIELDS
                    fields.name = name;
                    fields.surname = surname;
                    fields.email = email;

                    // DETAIL
                    otherDetail.name = name;
                    otherDetail.surname = surname;
                    otherDetail.email = email;
                    otherDetail.last_login = new Date(last_login);
                    otherDetail.created_at = new Date(created_at);

                    switch (role){
                        case 0:
                            otherDetail.role = "Member";
                            break;
                        case 1:
                            otherDetail.role = "Author";
                            break;
                        case 2:
                            otherDetail.role = "Admin";
                            break;
                        default:
                            otherDetail.role = "Member";
                    }
                }
            }).catch(err => {
                console.log(err);
            });

        isLoading = false;
    }

    // CHANGE ACCOUNT INFORMATION
    const onChangeAccountInformation = async () => {
        isShowMessage = true;
        isSubmittedAccount = true;
        isValidAccount = schemaAccount.isValidSync(fields);

        const { user_id, token } = takeUserIdAndToken();

        // HEADERS
        const config = {
            headers: {
                'x-access-token': token
            }
        }

        if(isValidAccount){
            await axios.put(`${API_URL}/profile/${user_id}/change-account-information`, {
                name: fields.name,
                surname: fields.surname,
                email: fields.email
            }, config)
                .then(response => {
                    if(response.data.message){
                        message = response.data;
                    }

                    getProfileData(user_id, token);
                }).catch(error => {
                    console.log(error);
                });
            setTimeout(() => {
                isShowMessage = false;
            }, 2000);
        }
    }

    // CHANGE PASSWORD
    const onChangePassword = async () => {
        isShowMessage = true;
        isSubmittedPassword = true;
        isValidPassword = schemaPassword.isValidSync(fieldsPass);

        const { user_id, token } = takeUserIdAndToken();
        const config = {
            headers: {
                'x-access-token': token
            }
        }

        if(isValidPassword){
            await axios.put(`${API_URL}/profile/${user_id}/change-password`, {
                old_pass: fieldsPass.old_pass,
                new_pass: fieldsPass.new_pass,
                confirm_pass: fieldsPass.confirm_pass
            }, config)
                .then(response => {
                    if(response.data.message){
                        message = response.data;
                    }

                    setTimeout(() => {
                        isShowMessage = false;

                        if(response.data.code === 200){
                            isLoading = true;
                            setTimeout(() => {
                                sessionStorage.removeItem('user_data');
                                return window.location.href = "/auth/signin";
                            });
                        }
                    }, 1500);
                }).catch(error => {
                    console.log(error);
                });
        }
    }

    // ON DELETE ACCOUNT
    const onDeleteAccount = async () => {
        isShowMessage = true;
        const { user_id, token } = takeUserIdAndToken();
        await axios.delete(`${API_URL}/profile/${user_id}`, { headers: {'x-access-token': token} })
            .then(response => {
                if(response.data.message){
                    message = response.data;
                }

                setTimeout(() => {
                    isShowMessage = false;

                    sessionStorage.removeItem('user_data');
                    return window.location.href = "/auth/signup";
                }, 2000);
            }).catch(error => {
                console.log(error);
            });
    }

    onMount(async () => {
        if(!sessionStorage.getItem('user_data')){
            window.location.href = "/";
        }
        await getProfileData();
    });
</script>

<div class="container">
    <!-- NAVBAR -->
    <Navbar />

    <!-- HEAD -->
	<div class="head">
		<h2>Profile</h2>
	</div>

    <!-- CONTENT -->
    <div class="content">
        <!-- ACCOUNT INFORMATION -->
        <div class="relative bg-white shadow account-information my-5">
            {#if !isLoading}
                <div class="p-3">
                    <h1 class="font-bold text-center text-3xl text-gray-900">{`${otherDetail.name} ${otherDetail.surname}`}</h1>
                    <p class="text-center text-sm text-gray-400 font-medium">Type: {otherDetail.role}</p>

                    <br>
                    <div class="w-full">
                        <h3 class="font-medium text-gray-900 text-left px-6">Recent activites</h3>
                        <div class="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                            <a href="#" class="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                Last Login: <b>{otherDetail.last_login}</b>
                            </a>

                            <a href="#" class="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                Date Joined: <b>{otherDetail.created_at}</b>
                            </a>
                        </div>
                    </div>
                </div>
            {:else}
                <div role="status" class="loading">
                    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                    <b>Loading</b>
                </div>
            {/if}
        </div>

        <!-- PROFILE FORM -->
        <div class="profile-form">
            {#if isShowMessage}
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
            {/if}

            {#if !isLoading}
                <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                        <div class="lg:col-span-3">
                            <Form fields={fields} schema={schemaAccount} submitHandler={onChangeAccountInformation} submitted={isSubmittedAccount} class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                <div class="md:col-span-5">
                                    <label for="name">Name</label>
                                    <input type="text" bind:value={fields.name} name="name" id="name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                    <Message name="name"/>
                                </div>

                                <div class="md:col-span-5">
                                    <label for="surname">Surname</label>
                                    <input type="text" bind:value={fields.surname} name="surname" id="surname" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                    <Message name="surname"/>
                                </div>

                                <div class="md:col-span-5">
                                    <label for="email">Email Address</label>
                                    <input type="text" bind:value={fields.email} name="email" id="email" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="email@domain.com" />
                                    <Message name="email"/>
                                </div>

                                <div class="md:col-span-5 text-right">
                                    <div class="inline-flex items-end">
                                        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                                    </div>
                                </div>
                            </Form>

                            <br>
                            <hr>
                            <br>

                            <Form fields={fieldsPass} schema={schemaPassword} submitHandler={onChangePassword} submitted={isSubmittedPassword} class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                <div class="md:col-span-2">
                                    <label for="old_pass">Old Password</label>
                                    <input type="text" bind:value={fieldsPass.old_pass} name="old_pass" id="old_pass" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="" />
                                    <Message name="old_pass"/>
                                </div>

                                <div class="md:col-span-2">
                                    <label for="new_pass">New Password</label>
                                    <input type="text" bind:value={fieldsPass.new_pass} name="new_pass" id="new_pass" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                                    <Message name="new_pass"/>
                                </div>

                                <div class="md:col-span-2">
                                    <label for="confirm_pass">New Password Confirm</label>
                                    <input type="text" bind:value={fieldsPass.confirm_pass} name="confirm_pass" id="confirm_pass" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                                    <Message name="confirm_pass"/>
                                </div>

                                <div class="md:col-span-5 text-right">
                                    <div class="inline-flex items-end">
                                        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>

                <button type="button" on:click={onDeleteAccount} class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    Delete Account
                </button>
            {:else}
                <div role="status" class="loading">
                    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                    <b>Loading</b>
                </div>
            {/if}

        </div>
    </div>

    <!-- FOOTER -->
    <Footer/>
</div>

<style lang="scss">
    @import url('../../app.css');

    .container{
        .content{
            display: flex;
            align-items: flex-start;
            justify-content: space-between;

            .account-information{
                width: 30%;   
            }

            .profile-form{
                width: 65%;
            }
        }

        .loading{
          width: 100%;
          height: 26rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
    }
</style>