<script>
    import {onMount} from "svelte";

    // COMPONENTS
	import NormalCard from './../../../components/cards/normal/NormalCard.svelte';
    import Navbar from "../../../global/Navbar.svelte";
    import Footer from "../../../global/Footer.svelte";

    // EDIT DATE
    import { DateEditing } from "$lib/edit_date.js";

    // FOR REQUEST
    import axios from 'axios';
    import { API_URL } from "$lib/env.js";
    import { page } from '$app/stores'

    // VARIABLES
    let isLoading = false;
    let isLoading2 = false;
    let news;
    let comments;
    let author;
    let endFivePostOfAuthor;

    const getDatas = async (news_id) => {
        isLoading = true;
        isLoading2 = true;

        await axios.get(`${API_URL}/news/${news_id}`)
            .then(response => {
                setTimeout(() => {
                    isLoading = false;
                }, 500);

                if(response.data && typeof response.data === "object"){
                    news = response.data.news._id;
                    comments = response.data.comments;
                    author = response.data.news.author;
                }
            }).catch(error => {
                console.log("A POST OF AUTHOR", error);
            });

        await axios.get(`${API_URL}/users/${author._id}`)
            .then(response => {
                isLoading2 = false;

                if(response.data[0].news.length > 0){
                    endFivePostOfAuthor = response.data[0].news;
                }
            }).catch(error => {
                console.log("END FIVE POST OF AUTHOR", error);
            });
    }

    onMount(async () => {
        await getDatas($page.params.detail)
    });
</script>

<div class="container">
    <!-- NAVBAR -->
    <Navbar />

    <!-- CONTENT -->
    <div class="content">
        <!-- LEFT -->
        <div class="left">
            {#if isLoading}
                <div class="loading flex justify-center items-center">
                    <div role="status">
                        <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>

                    <strong>LOADING...</strong>
                </div>
            {:else}
                {#if news}
                    <!-- HEAD -->
                    <div class="head">
                        <!-- TITLE -->
                        <p class="title">{news.title}</p>
                        <!-- IMAGE -->
                        <img src={news.image} alt="" title=""/>
                    </div>

                    <!-- BODY -->
                    <div class="body">{news.content}</div>

                    {#if comments.length > 0}
                    <!-- FOOT -->
                    <div class="foot">
                        {#each comments as comment}
                        <div class="comment">
                            <!-- HEAD -->
                            <div class="head">{`${comment.user.name} ${comment.user.surname}`}</div>

                            <!-- BODY -->
                            <p class="body">{comment.comment}</p>
                        </div>
                        {/each}
                    </div>
                    {:else}
                        <br/>
                        <div class="p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300" role="alert">
                            <span class="font-medium">Any comments not found!!!</span>
                        </div>
                    {/if}
                {/if}
            {/if}
        </div>

        <!-- RIGHT -->
        <div class="right">
            {#if author}
            <div class="top">
                Yazar: <b>{author.name} {author.surname}</b>
                <br/>
                Gönderim Tarihi: <b>{DateEditing(news.created_at)}</b>
            </div>


                {#if !isLoading2}
                    <h3>The others news of the author</h3>

                    <div class="bottom">
                        {#each endFivePostOfAuthor as other}
                        <NormalCard handleClick={async () => {
                            await getDatas(other._id)
                        }} title={other.title} description={other.content.substring(0, 35) + '...'} link={`/news/${other._id}`} />
                        <br>
                        {/each}
                    </div>
                {/if}
            {/if}
        </div>
    </div>

    <!-- FOOTER -->
    <Footer/>
</div>


<style lang="scss">
    .container{
        // CONTENT
        .content{
           padding: 0 40px;
           display: flex;
           align-items: flex-start;
           justify-content: space-between;

            // LEFT
           .left{
                width: 70%;
                padding: 20px;
                border-radius: 5px;
                background-color: #fff;
                box-shadow: 0 0 6px #eee;
                border: 1px solid #eee;

                // HEAD
                .head{
                    // TITLE
                    .title{
                        font-size: 24px;
                        font-weight: 500;
                    }

                    // IMAGE
                    img{
                        width: 100%;
                        height: 25rem;
                        margin: 10px 0;
                        border-radius: 3px;
                        box-shadow: 0 2px 6px #ccc;
                    }
                }

                // BODY
                .body{
                    text-align: justify;
                    color: gray;
                    font-weight: 500;
                }

                // FOOT
                .foot{
                    border-top: 1px solid #ccc;
                    padding-top: 10px;
                    margin-top: 10px;
                    
                    .comment{
                        padding: 10px;
                        border-radius: 3px;
                        margin-bottom: 10px;
                        border: 1px solid #ccc;
                        background-color: #eee;

                        // HEAD
                        .head{
                            font-weight: 900;
                        }

                        // BODY
                        .body{
                            color: gray;
                            font-weight: 500;
                            font-style: italic;
                            text-align: justify;
                        }

                        &:last-child{
                            margin-bottom: 0;
                        }
                    }
                }
           }
           
           // RIGHT
           .right{
                width: 25%;

                // TOP
                .top{
                    padding: 20px;
                    border-radius: 5px;
                    background-color: #fff;
                    box-shadow: 0 0 3px #eee;
                    margin-bottom: 20px;
                    border: 1px solid #eee;
                }

                // H3
                h3{
                    color: gray;
                    font-weight: 600;
                    font-style: italic;
                    margin-bottom: 7px;
                    text-decoration: underline;
                }
           }
        }
    }
</style>