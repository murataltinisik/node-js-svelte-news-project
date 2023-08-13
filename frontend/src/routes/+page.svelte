<script>
	// onmount
	import { onMount } from "svelte";

	import News from '../components/cards/news/News.svelte';
  	import Carousel from '../components/carousel/Carousel.svelte';
  	import Footer from '../global/Footer.svelte';
	import Navbar from '../global/Navbar.svelte';

	// AXIOS
	import axios from "axios";

	// API URL
	import { API_URL } from "$lib/env.js";
	import {data} from "autoprefixer";

	// VARIABLES
	let dataLimit4;
	let dataLimit7;

	onMount(async () => {
		// FOR DATA LIMIT (4)
		await axios.get(`${API_URL}/news/4/get`)
				.then(data => {
					dataLimit4 = data.data
				}).catch(err => {
					console.log(err);
				});

		// FOR DATA LIMIT (7)
		await axios.get(`${API_URL}/news/7/get`)
				.then(data => {
					dataLimit7 = data.data
				}).catch(err => {
					console.log(err);
				});
	});

</script>

<!-- CONTAINER -->
<div class="container">
	<!-- NAVBAR -->
	<Navbar />

	<!-- HEAD -->
	<div class="head">
		<h2>Welcome, The News</h2>
	</div>

	<!-- CONTENT -->
	<div class="content">
		<!-- NEWS CONTAINER -->
		<div class="news-container">
			<!-- LEFT -->
			<div class="left">
				{#if dataLimit4 && dataLimit4[0]}
					<div class="box">
						<News
							title={dataLimit4[0].title}
							description={dataLimit4[0].content}
							image={{ src: dataLimit4[0].image, alt:'', title:''}}
							tag={dataLimit4[0].tag}
							link={`/news/${dataLimit4[0]._id}`}
						/>
					</div>
				{/if}
			</div>

			<!-- RIGHT -->
			<div class="right">
				{#if dataLimit4 && dataLimit4[1] && dataLimit4[2]}
				<!-- BOX -->
				<div class="box">
					<div>
						<News
								title={dataLimit4[1].title}
								description={dataLimit4[1].content}
								image={{ src: dataLimit4[1].image, alt:'', title:''}}
								tag={dataLimit4[1].tag}
								link={`/news/${dataLimit4[1]._id}`}
						/>
					</div>

					<div>
						<News
								title={dataLimit4[2].title}
								description={dataLimit4[2].content}
								image={{ src: dataLimit4[2].image, alt:'', title:''}}
								tag={dataLimit4[2].tag}
								link={`/news/${dataLimit4[2]._id}`}
						/>
					</div>
				</div>
				{/if}

				{#if dataLimit4 && dataLimit4[3]}
				<!-- BOX -->
				<div class="box">
					<div>
						<News
								title={dataLimit4[3].title}
								description={dataLimit4[3].content}
								image={{ src: dataLimit4[3].image, alt:'', title:''}}
								tag={dataLimit4[3].tag}
								link={`/news/${dataLimit4[3]._id}`}
						/>
					</div>
				</div>
				{/if}
			</div>
		</div>

		{#if dataLimit7}
		<!-- CAROUSEL -->
		<div class="carousel-container">
			<Carousel items={dataLimit7}/>
		</div>
		{/if}
	</div>

	<!-- FOOTER -->
	<Footer/>
</div>

<style lang="scss">
	.container{
		// CONTENT
		.content{
			width: 100%;
			margin: 0 auto;

			// NEWS CONTAINER
			.news-container{
				display: flex;
				align-items: flex-start;
				justify-content: space-between;

				// LEFT & RIGHT
				.left, .right{
					width: 50%;

					// BOX
					.box{
						width: 100%;
						padding: 10px;
					}
				}

				// LEFT
				.left{
					// BOX
					.box{
						height: 24rem;
					}
				}

				// RIGHT
				.right{
					// BOX
					.box{
						height: 12rem;
						display: flex;
						align-items: flex-start;
						justify-content: space-between;

						> div{
							width: 100%;
							height: 100%;
							padding-right: 20px;

							&:last-child{
								padding-right: 0;
							}
						}
					}
				}
			}

			// CAROUSEL
			.carousel-container{
				margin-top: 10px;
				padding: 0 5px;
			}
		}
	}
</style>