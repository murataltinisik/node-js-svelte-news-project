<script>
  import Title from "./Title.svelte";
</script>

<!-- FOOTER -->
<footer class="dark:bg-gray-900">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">

        <!-- CONTENT -->
        <div class="sm:flex sm:items-center sm:justify-between">
            <a href="/" class="flex items-center mb-4 sm:mb-0">
                <Title />
            </a>

            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="/" class="mr-4 hover:underline md:mr-6 ">Home</a>
                </li>

                <li>
                    <a href="/news" class="mr-4 hover:underline md:mr-6 ">News</a>
                </li>

                <li>
                    <a href="/about" class="mr-4 hover:underline md:mr-6 ">About</a>
                </li>
            </ul>
        </div>

        <!-- COPYRIGHT -->
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {new Date().getFullYear()} <a href="/" class="hover:underline">The News™</a>. All Rights Reserved.</span>
    </div>
</footer>

