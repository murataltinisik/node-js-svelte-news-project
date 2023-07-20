<script>
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
        <!-- SEARCH -->
        <div class="search">
            <Input name="search-news" placeholder="Search News..." icon={faSearch} button="Search"/>
        </div>

        <!-- BODY -->
        <div class="body">
            <!-- LEFT -->
            <div class="left">
                <div class="w-full max-w-screen-xl mx-auto">
                    <div class="flex justify-center ">
                        <div class="w-full max-w-md">
                            <div class="bg-white shadow-md rounded-lg px-3 py-2 mb-4">
                                <div class="block text-gray-700 text-lg font-semibold py-2 px-2">
                                    News Category List
                                </div>

                                <div class="text-sm">
                                    <div class="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                                        <div class="flex-grow font-medium px-2">War</div>
                                        <div class="text-sm font-normal text-gray-500 tracking-wide">10</div>
                                    </div>

                                    <div class="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                                        <div class="flex-grow font-medium px-2">Europe</div>
                                        <div class="text-sm font-normal text-gray-500 tracking-wide">10</div>
                                    </div>

                                    <div class="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                                        <div class="flex-grow font-medium px-2">Sport</div>
                                        <div class="text-sm font-normal text-gray-500 tracking-wide">10</div>
                                    </div>

                                    <div class="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                                        <div class="flex-grow font-medium px-2">Lesson</div>
                                        <div class="text-sm font-normal text-gray-500 tracking-wide">10</div>
                                    </div>

                                    <div class="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                                        <div class="flex-grow font-medium px-2">Covid-19</div>
                                        <div class="text-sm font-normal text-gray-500 tracking-wide">10</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- RIGHT -->
            <div class="right">
                <!-- CARD -->
                <div class="card bg-white shadow-md flex border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img class="h-full" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="">
                    </a>

                    <div class="p-5">
                        <a href="#">
                            <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                        </a>
                        <p class="font-normal text-gray-700 mb-3 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read more
                            <svg class="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </a>
                    </div>
                </div>

                 <!-- CARD -->
                 <div class="card bg-white shadow-md flex border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img class="h-full" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="">
                    </a>

                    <div class="p-5">
                        <a href="#">
                            <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                        </a>
                        <p class="font-normal text-gray-700 mb-3 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read more
                            <svg class="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </a>
                    </div>
                </div>

                 <!-- CARD -->
                 <div class="card bg-white shadow-md flex border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img class="h-full" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="">
                    </a>

                    <div class="p-5">
                        <a href="#">
                            <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                        </a>
                        <p class="font-normal text-gray-700 mb-3 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read more
                            <svg class="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </a>
                    </div>
                </div>

                 <!-- CARD -->
                 <div class="card bg-white shadow-md flex border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img class="h-full" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="">
                    </a>

                    <div class="p-5">
                        <a href="#">
                            <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                        </a>
                        <p class="font-normal text-gray-700 mb-3 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read more
                            <svg class="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </a>
                    </div>
                </div>

                 <!-- CARD -->
                 <div class="card bg-white shadow-md flex border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img class="h-full" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="">
                    </a>

                    <div class="p-5">
                        <a href="#">
                            <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                        </a>
                        <p class="font-normal text-gray-700 mb-3 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read more
                            <svg class="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </a>
                    </div>
                </div>

                <div class="mt-3">
                    <nav aria-label="Page navigation example">
                        <ul class="inline-flex items-center -space-x-px">
                        <li>
                            <a href="#" class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span class="sr-only">Previous</span>
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                        </li>
                        <li>
                            <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                        </li>
                        <li>
                            <a href="#" aria-current="page" class="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                        </li>
                        <li>
                            <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                        </li>
                        <li>
                            <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                        </li>
                        <li>
                            <a href="#" class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span class="sr-only">Next</span>
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                            </a>
                        </li>
                        </ul>
                    </nav>
                </div>
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

                // LEFT
                .left{
                    width: 30%;
                }

                // RIGHT
                .right{
                    width: 68%;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;

                    // CARD
                    .card{
                        height: 12rem;
                        margin: 10px 0;
                    }
                }                
            }
        }
    }
</style>