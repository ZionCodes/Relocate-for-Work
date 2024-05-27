<script>
    import {Editor} from '@tadashi/svelte-editor-quill';
    import SvelteSeo from "svelte-seo";

    const options = {
        theme: 'snow',
        placeholder: 'Job Description',
        plainclipboard: true,
    }

    let htmlContent;

    function onTextChange(event) {
        htmlContent = event.detail.html;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const form = new FormData(event.target);
        form.set('article', htmlContent);

        await fetch(event.target.action, {
            method: 'POST',
            body: form
        });
    }
</script>
  
<svelte:head>
    <link rel="preconnect" href="https://cdn.quilljs.com" crossorigin>
    <link rel="stylesheet" href="https://cdn.quilljs.com/1.3.7/quill.snow.css">

    <SvelteSeo
    title='Post Jobs | Find Top Talent - Relocate for Work'
    description='Fill Visa Sponsorship & Relocation Support Roles Faster. Reach Top Talent Seeking Relocation Assistance on Relocate for Work'
  />

</svelte:head>


<section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <div class="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Post Job</h2>
            <p class="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">Best fit, not location: Hire the best, wherever they are!</p>
        </div> 
        <!-- <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2> -->
        <form method="post" action="?/create" on:submit={handleSubmit}>
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div class="sm:col-span-2">
                    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Title</label>
                    <input type="text" name="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Job Title" required>
                </div>
                <div class="sm:col-span-2">
                    <label for="introduction" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Introduction</label>
                    <textarea id="introduction" name="introduction" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                </div>
                <div class="sm:col-span-2">
                    <label for="article" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Article</label>
                    <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <Editor {options} on:text-change={onTextChange} data='' />
                    </div>
                </div>
                <div class="sm:col-span-2">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="thumbnail">Logo</label>
                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="thumbnail" name="thumbnail" type="file">
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="thumbnail">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                </div>
            </div>
            <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                Submit
            </button>
        </form>
    </div>
</section>


  

    
        

