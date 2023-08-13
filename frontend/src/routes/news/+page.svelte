<script>
    import {onMount} from "svelte";

    // GLOBAL
    import Navbar from "../../global/Navbar.svelte";
    import Input from "../../components/input/Input.svelte";
    import Footer from "../../global/Footer.svelte";

    // ICON
    import { faSearch } from "@fortawesome/free-solid-svg-icons";

    // AXIOS
    import axios from 'axios';

    // URL
    import { API_URL } from "$lib/env.js";

    // VARIABLES
    let data = [];
    onMount(async () => {
        await axios.get(`${API_URL}/news`)
            .then(response => {
                if(response.data.length >= 0){
                    data = response.data;
                }
            }).catch(error => {
                console.log(error);
            });
    });
</script>

<div class="container">
    <!-- NAVBAR -->
    <Navbar />

    <!-- HEAD -->
    <div class="head">
        <h2>Search News</h2>
    </div>

    <!-- CONTENT -->
    <div class="content">
        <!-- BODY -->
        <div class="body">
            <!-- RIGHT -->
            <div class="right">
                {#each data as item}
                    <!-- CARD -->
                    <div class="card bg-white shadow-md flex border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700">

                        <a href={`/news/${item._id}`}>
                            <img class="h-full" src={item.image} alt="">
                        </a>

                        <div class="p-5">
                            <a href={`/news/${item._id}`}>
                                <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">{item.title}</h5>
                            </a>
                            <p class="font-normal text-gray-700 mb-3 dark:text-gray-400">{item.content.substring(0, 70) + "..."}</p>
                            <a href={`/news/${item._id}`} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Read more
                                <svg class="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </a>
                        </div>

                    </div>
                {/each}
            </div>
        </div>
    </div>

    <br/>

    <!-- FOOTER -->
    <Footer/>
</div>


<style lang="scss">
    .container{
        // CONTENT
        .content{
            margin-top: 10px;
            padding: 0 40px;
            
            // BODY
            .body{
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                margin-top: 20px;

                // RIGHT
                .right{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;

                    // CARD
                    .card{
                        width: 100%;
                        height: 12rem;
                        margin: 10px 0;
                    }
                }                
            }
        }
    }
</style>