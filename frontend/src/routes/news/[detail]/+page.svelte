<script>
	import NormalCard from './../../../components/cards/normal/NormalCard.svelte';
    import Navbar from "../../../global/Navbar.svelte";
    import Footer from "../../../global/Footer.svelte";
</script>

<div class="container">
    <!-- NAVBAR -->
    <Navbar />

    <!-- CONTENT -->
    <div class="content">
        <!-- LEFT -->
        <div class="left">
            <!-- HEAD -->
            <div class="head">
                <!-- TITLE -->
                <p class="title">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
        
                <!-- IMAGE -->
                <img src="https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg" alt="" title=""/>
            </div>  
            
            <!-- BODY -->
            <div class="body">
                ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
            </div> 

            <!-- FOOT -->
            <div class="foot">
                <div class="comment">
                    <!-- HEAD -->
                    <div class="head">Unknown Unknown</div>

                    <!-- BODY -->
                    <p class="body">
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page e
                    </p>
                </div>

                <div class="comment">
                    <!-- HEAD -->
                    <div class="head">Unknown Unknown</div>

                    <!-- BODY -->
                    <p class="body">
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page e
                    </p>
                </div>

                <div class="comment">
                    <!-- HEAD -->
                    <div class="head">Unknown Unknown</div>

                    <!-- BODY -->
                    <p class="body">
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page e
                    </p>
                </div>
            </div> 
        </div>    
        
        <!-- RIGHT -->
        <div class="right">
            <div class="top">
                Yazar: <b>Unknown Unknown</b>
                <br/>
                Gönderim Tarihi: <b>09 Haziran, 2023</b>
            </div>

            <h3>Yazarın Diğer Paylaşımları</h3>

            <div class="bottom">
                <NormalCard title="Lorem ipsum dolor" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ip" />
                <br>
                <NormalCard title="Lorem ipsum dolor" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ip" />
                <br>
                <NormalCard title="Lorem ipsum dolor" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ip" />
            </div>
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