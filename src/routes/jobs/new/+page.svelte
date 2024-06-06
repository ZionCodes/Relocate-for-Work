<script>
    import {Editor} from '@tadashi/svelte-editor-quill';
    import { onMount } from 'svelte';
    import SvelteSeo from "svelte-seo";

    const options = {
        theme: 'snow',
        placeholder: 'Job Description',
        plainclipboard: true,
    }

    let htmlContent;
    let amount = 9900; // Starting amount ($99.00)
    let buttonText = `Post - $${(amount / 100).toFixed(2)}`; // Initialize button text

    function onTextChange(event) {
        htmlContent = event.detail.html;
    }

    function updateAmount(event) {
    if (event.target.checked) {
        amount += 9900; // Add $99.00
    } else {
        amount -= 9900; // Subtract $99.00
    }
    buttonText = `Post - $${(amount / 100).toFixed(2)}`; // Update button text
    }

    async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    formData.append('description', htmlContent);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
        });

        if (response.ok) {
            showAlert();
        } else {
            console.error('Form submission failed.');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
    }
    }

    // Function to show the alert and redirect
    function showAlert() {
    const alertBox = document.getElementById('info-popup');
    alertBox.classList.remove('hidden');
    setTimeout(() => {
        alertBox.classList.add('hidden');
        window.location.href = '/';
    }, 2000);
    }

    // Listen for successful payment events
    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('success')) {
            showAlert();
        }
    });
</script>
  
<svelte:head>
    <link rel="preconnect" href="https://cdn.quilljs.com" crossorigin>
    <link rel="stylesheet" href="https://cdn.quilljs.com/1.3.7/quill.snow.css">
</svelte:head>

<SvelteSeo
  title='Post Jobs | Find Top Talent - Relocate for Work'
  description='Fill Visa Sponsorship & Relocation Support Roles Faster. Hire the best, wherever they are!'
  keywords="visa sponsorship jobs, relocation support jobs, relocation support, visa sponsorship, work abroad, relocate for work, relocate, move abroad"
  openGraph={{
  title: "Post Job | Find Top Talent anywhere in the World",
  description:
    "Fill Visa Sponsorship & Relocation Support Roles Faster. Hire the best, wherever they are!",
  image: "https://res.cloudinary.com/dbvvslwpj/image/upload/f_auto,q_auto/c1ng5xtxmksgjwenulzv",
  url: "https://www.relocateforwork.com/jobs/new",
  type: "website",
  site_name: "Relocate for Work",
  }}
  twitter={{
  card: "summary_large_image",
  site: "@RelocateforWork",
  title: "Post Job | Find Top Talent anywhere in the World",
  description:
    "Fill Visa Sponsorship & Relocation Support Roles Faster. Hire the best, wherever they are!",
  image: "https://res.cloudinary.com/dbvvslwpj/image/upload/f_auto,q_auto/c1ng5xtxmksgjwenulzv",
  }}
/>


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
                <div>
                    <label for="tag" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Type</label>
                    <select name="tag" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option selected="">Select Job Type</option>
                        <option value="Visa Sponsorship">Visa Sponsorship</option>
                        <option value="Relocation Support">Relocation Support</option>
                        <option value="Visa & Relocation Support">Visa & Relocation Support</option>
                    </select>
                </div>
                <div class="w-full">
                    <label for="country" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                    <input type="text" name="country" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Country" required="">
                </div>
                <!-- <div class="w-full">
                    <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                    <input type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="">
                </div> -->
                <div class="sm:col-span-2">
                    <label for="applylink" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Application Link or Email </label>
                    <input type="text" name="apply-link" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Link to Application page or Email address." required="">
                </div>
                
                
                <div class="sm:col-span-2">
                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <Editor {options} on:text-change={onTextChange} data='' />
                    </div>
                </div>
                <div>
                    <label for="item-weight" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Name</label>
                    <input type="text" name="company-name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required>
                </div> 
                <div>
                    <label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                    <input type="text" name="city" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required>
                </div> 
                <div class="sm:col-span-2">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="thumbnail">Logo</label>
                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="thumbnail" name="logo" type="file">
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                </div>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" name="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required>
                </div> 
                <div>
                    <label for="item-weight" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company's Website URL</label>
                    <input type="url" name="url" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required>
                </div> 
                <fieldset class='sm:col-span-2'>
                    <legend class="sr-only">Checkbox variants</legend>
                    <div class="flex items-center mb-4">
                        <input checked id="checkbox-1" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" disabled>
                        <label for="checkbox-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Post Job Opening on Relocate for Work ($99)</label>
                    </div>
                  
                    <div class="flex items-center mb-4">
                        <input id="checkbox-2" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" on:change={updateAmount}>
                        <label for="checkbox-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Highlight Job Opening for 1 month (+$99)</label>
                    </div>
                  
                    <div class="flex items-center mb-4">
                        <input id="checkbox-3" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" on:change={updateAmount}>
                        <label for="checkbox-3" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sticky Job Opening to the top of front page for 1 month (+$99)</label>
                    </div>
                    <div class="flex items-center mb-4">
                        <input id="checkbox-4" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" on:change={updateAmount}>
                        <label for="checkbox-4" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Feature Job Opening in Newsletter (+$99)</label>
                    </div>
                </fieldset>


  
            </div>
            <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                {buttonText}
            </button>
        </form>
    </div>
</section>

<div id="info-popup" class="hidden fixed top-0 left-0 right-0 p-4 bg-green-500 text-white text-center z-50">
    Your job has been posted successfully!
</div>
  

    
        

