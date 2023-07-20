<script>
    import Footer from "../../global/Footer.svelte";
import Navbar from "../../global/Navbar.svelte";
</script>

<div class="container">
    <!-- NAVBAR -->
    <Navbar />

    <!-- HEAD -->
    <div class="head">
        <h2>About</h2>
    </div>

    <!-- CONTENT -->
    <div class="content">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </div>

    <!-- FOOTER -->
    <div class="footer-contaner-for-about">
        <Footer/>
    </div>
</div>

<style lang="scss">
    .container{
        .content{
            margin-top: 8px;
            padding: 0 40px;
            text-align: justify;
            line-height: 28px;
            color: gray;
            font-weight: 500;
            font-style: italic;
            text-decoration: underline;
        }

        .footer-contaner-for-about{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
        }
    }
</style>