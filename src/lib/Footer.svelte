<script>
    import logo from '$lib/logo.svg'
  </script>

<footer class="p-4 bg-white sm:p-6 dark:bg-gray-800 mt-12">
    <div class="mx-auto max-w-screen-lg">
        <div class="md:flex md:justify-between">
            <div class="mb-6 md:mb-0">
                <a href="/" class="flex items-center">
                    <img src={logo} class="mr-3 h-8" alt="Relocate for Work Logo" />
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Relocate for Work</span>
                </a>
            </div>
            <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                <div>
                    <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                    <ul class="text-gray-600 dark:text-gray-400">
                        <li class="mb-4">
                            <a href="/blog" class="hover:underline">Blog</a>
                        </li>
                        <!-- <li>
                            <a href="https://worldwidetalentpool.com/" class="hover:underline">Submit CV</a>
                        </li> -->
                    </ul>
                </div>
                <div>
                    <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                    <ul class="text-gray-600 dark:text-gray-400">
                        <li class="mb-4">
                            <a href="https://twitter.com/RelocateforWork" class="hover:underline ">Twitter</a>
                        </li>
                        <!-- <li>
                            <a href="https://discord.gg/4eeurUVvTy" class="hover:underline">Discord</a>
                        </li> -->
                    </ul>
                </div>
                <!-- <div>
                    <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                    <ul class="text-gray-600 dark:text-gray-400">
                        <li class="mb-4">
                            <a href="#" class="hover:underline">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" class="hover:underline">Terms &amp; Conditions</a>
                        </li>
                    </ul>
                </div> -->
            </div>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div class="sm:flex sm:items-center sm:justify-between">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="/" class="hover:underline">Relocate for Work™</a>. All Rights Reserved.
            </span>
        </div>
    </div>
</footer>