<script>
    import { onMount } from "svelte";
  import NormalCard from "../cards/normal/NormalCard.svelte";
    export let items=[];

    // VARIABLES
    let carouselItem, carouselNavigations, navigations=0;

    onMount(() => {
        navigations = items.length - 4;
    })

    // HANDLE NEXT ITEM
    const handleNextItem = (id) => {
        const items = carouselNavigations.children;
        carouselItem.style.left = `-${315 * id}px`
        
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('active')
        }
        items[id].classList.add('active')
    }
</script>

<div class="carousel">
    <!-- ITEMS -->
    <div class="carousel-items" bind:this={carouselItem}>
        {#each items as item}
            <div class="carousel-item">
                <NormalCard title="Lorem ipsum dolor." description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." />
            </div>
        {/each}
    </div>

    <!-- NAVIGATION -->
    <ul class="carousel-navigation" bind:this={carouselNavigations}>
        {#each Array(navigations) as _, i (i)}
            <li on:click={() => handleNextItem(i)} class={`${i===0 && 'active'}`}></li>
        {/each}
    </ul>
</div>

<style lang="scss">
    // CAROUSEL
    .carousel{
        width: 100%;
        overflow: hidden;
        
        // ITEMS CONTAINER
        .carousel-items{
            width: fit-content;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            transition: left .2s ease;
            position: relative;
            left: 0;

            // ITEM
            .carousel-item{
                width: 315px;
                padding: 5px;
            }
        }

        // CAROUSEL
        .carousel-navigation{
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: center;

            li{
                width: 10px;
                height: 10px;
                transition: all .2s ease;
                border-radius: 50%;
                background-color: #eee;
                margin: 0 2px;
                cursor: pointer;
                border: 2px solid #fff;

                &.active{
                    width: 12px;
                    height: 12px;
                    background-color: red;
                }

                &:not(.active):hover{
                    border: 2px solid #000;
                }
            }
        }
    }
</style>