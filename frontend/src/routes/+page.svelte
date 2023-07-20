<script>
	import News from '../components/cards/news/News.svelte';
  import Carousel from '../components/carousel/Carousel.svelte';
  import Footer from '../global/Footer.svelte';
	import Navbar from '../global/Navbar.svelte';
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
				<div class="box">
					<News
						title="Lorem Ipsum is simply dummy"
						description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
						image={{ src:'https://ichef.bbc.co.uk/wwhp/624/cpsprodpb/0D70/production/_130004430_4c788ce24db4609f6e8a55354db4c8b1a91ecdd7.jpg', alt:'', title:''}}
						tag="Europe"
					/>
				</div>
			</div>

			<!-- RIGHT -->
			<div class="right">
				<!-- BOX -->
				<div class="box">
					<div>
						<News
							title="Lorem ipsum dolor"
							image={{ src:'https://ichef.bbc.co.uk/wwhp/304/cpsprodpb/7211/production/_130010292_dam.jpg', alt:'', title:''}}
							description="ry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled"
							size="sm"
							tag="Holiday"
						/>
					</div>

					<div>
						<News
							title="Lorem ipsum dolor"
							image={{ src:'https://ichef.bbc.co.uk/wwhp/304/cpsprodpb/1555D/production/_126898378_gettyimages-1423195630.jpg', alt:'', title:'' }}
							description="ry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled"
							size="sm"
							tag="Sport"
						/>
					</div>
				</div>

				<!-- BOX -->
				<div class="box">
					<div>
						<News
							title="Lorem Ipsum dummy text of the printing"
							description="ers, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and w"
							image={{ src:'https://ichef.bbci.co.uk/news/976/cpsprodpb/E359/production/_130010285_prigozhin.jpg.webp', alt:'', title:''}}
							size="md"
							tag="War"
						/>
					</div>
				</div>
			</div>
		</div>

		<!-- CAROUSEL -->
		<div class="carousel-container">
			<Carousel items={[0,1,2,3,4,5,6,7]}/>
		</div>
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