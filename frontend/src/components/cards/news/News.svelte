<script>
    export let image={src:'', alt:'', title:''}, title="", description="", tag="", link="", size="lg";
</script>

<!-- NEWS CARD -->
<a href={link} class={`news-card ${size}`}>
    <!-- HEAD -->
    <div class="head">
        {#if image}
            <!-- IMAGE -->
            <div class="image"><img {...image}></div>
        {/if}    
    </div>

    <!-- BODY -->
    <div class="body">
        {#if title}
            <!-- TITLE -->
            <p class="title">{title}</p>
        {/if}

        {#if description}
            <!-- DESCRIPTION -->
            <p class="description">{description}</p>
        {/if}

        {#if tag}
            <!-- TAG -->
            <span class="tag">{tag}</span>
        {/if}
    </div>
</a>

<style lang="scss">
    .news-card{
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 2px 6px 2px #eee;
        position: relative;
        display: block;
        transition: filter .2s ease;

        // SIZE
        &.sm{
            .body{
                .title{
                    font-size: 18px;
                }
            }
        }

        &.md{
            .body{
                .title{
                    font-size: 24px;
                }
            }
        }
    
        // HEAD
        .head{
            width: 100%;
            height: 100%;
            overflow: hidden;
            position: absolute;
            top: 0;
            left: 0;
            
            // IMAGE
            .image{
                width: 100%;
                height: 100%;
                opacity: .95;

                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }

        // BODY
        .body{
            padding: 10px 16px;
            position: absolute;
            bottom: 0;

            // TITLE
            .title{
                width: 100%;
                color: #fff;
                font-size: 32px;
                font-weight: 600;
                text-align: justify;
            }

            // DESCRIPTION
            .description{
                text-align: justify;
                color: #eee;
                font-size: 14px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
            }

            // TAG
            .tag{
                color: #fff;
                margin-top: 10px;
                padding: 4px 28px;
                border-radius: 3px;
                display: inline-block;
                border-left: 3px solid red;
                background-color: #00000050;
                box-shadow: 0 0 6px 0 #000;
            }
        }

        &:hover{
            .head{
                filter: blur(1px);
            }
        }
    }
</style>